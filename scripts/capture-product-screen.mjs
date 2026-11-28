// Extracts real layout geometry from a shipped web product via CDP.
// Captures a 1280x960 screenshot and the bounding boxes of the elements
// actually rendered in it — no eyeballing.
//
// Usage: node extract.mjs <id> <url> [settleMs] [scrollY]
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const [, , ID, URL_, SETTLE = "3500", SCROLL = "0"] = process.argv;
const W = 1280;
const H = 960;
const PORT = 9222 + Math.floor(Math.random() * 500);
const OUT = "/tmp/bts";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--window-size=${W},${H}`,
  "--hide-scrollbars",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=/tmp/scrape/profile-${PORT}`,
]);
chrome.stderr.on("data", () => {});

let wsUrl;
for (let i = 0; i < 40; i++) {
  await sleep(250);
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
    if (wsUrl) break;
  } catch {}
}
if (!wsUrl) {
  chrome.kill();
  throw new Error("Chrome did not expose a debugging socket");
}

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let msgId = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => {
    const id = ++msgId;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", {
  targetId,
  flatten: true,
});
const S = (m, p) => send(m, p, sessionId);

await S("Page.enable");
await S("Runtime.enable");
await S("Emulation.setDeviceMetricsOverride", {
  width: W,
  height: H,
  deviceScaleFactor: 2,
  mobile: false,
});
// Headless defaults to a dark colour scheme; the footage these build-ups
// resolve into is light, so pin it.
await S("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-color-scheme", value: "light" }],
});
await S("Page.navigate", { url: URL_ });
await sleep(Number(SETTLE));

// Scroll by pixels, or to the section named by a text anchor — the latter
// survives layout changes and lands on the screen the live clip shows.
if (SCROLL && SCROLL !== "0") {
  const expr = /^\d+$/.test(SCROLL)
    ? `window.scrollTo(0, ${Number(SCROLL)});`
    : `(() => {
        const needle = ${JSON.stringify(SCROLL)}.toLowerCase();
        const el = [...document.querySelectorAll('h1,h2,h3,h4,section,div')]
          .find((n) => n.textContent.trim().toLowerCase().startsWith(needle)
            && n.getBoundingClientRect().height < 400);
        if (!el) return 'anchor not found';
        window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 48);
        return 'ok';
      })()`;
  const r = await S("Runtime.evaluate", { expression: expr, returnByValue: true });
  if (r.result?.value === "anchor not found") {
    console.warn(`${ID}: anchor "${SCROLL}" not found — captured unscrolled`);
  }
  await sleep(1500);
}

// Freeze the page before measuring. A carousel that keeps advancing between
// the measurement and the screenshot puts the boxes where the UI used to be,
// which is exactly the misalignment this whole approach is meant to avoid.
await S("Runtime.evaluate", {
  expression: `(() => {
    const css = document.createElement('style');
    css.textContent =
      '*,*::before,*::after{animation-play-state:paused !important;' +
      'animation-duration:0s !important;animation-delay:0s !important;' +
      'transition:none !important;scroll-behavior:auto !important}';
    document.head.appendChild(css);
    document.getAnimations?.().forEach((a) => { try { a.pause(); } catch {} });
    return true;
  })()`,
});
await sleep(600);

// Collect the boxes that are actually painted in the viewport, classified by
// what they are, straight from the live DOM.
const COLLECT = `(() => {
  const W = ${W}, H = ${H};
  const out = [];
  const seen = new Set();
  const els = document.querySelectorAll('body *');
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.height < 10) continue;
    if (r.bottom < 4 || r.top > H - 4 || r.right < 4 || r.left > W - 4) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.08) continue;

    const x = Math.max(0, r.left), y = Math.max(0, r.top);
    const w = Math.min(W, r.right) - x, h = Math.min(H, r.bottom) - y;
    if (w < 24 || h < 10) continue;
    if (w * h > W * H * 0.92) continue;

    const key = [x, y, w, h].map(v => Math.round(v / 6)).join(',');
    if (seen.has(key)) continue;

    const tag = el.tagName.toLowerCase();
    const bg = cs.backgroundColor;
    const hasBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    const hasBorder = parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderBottomWidth) > 0;
    const hasImg = cs.backgroundImage && cs.backgroundImage !== 'none';
    const media = ['img','svg','video','canvas','picture'].includes(tag) || hasImg;
    const interactive = ['button','a'].includes(tag) || el.getAttribute('role') === 'button';

    // A text run: holds its own text and has no element children of substance.
    const ownText = Array.from(el.childNodes)
      .filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('').length;
    const childEls = el.children.length;

    let kind = null;
    if (media) kind = 'm';
    else if (interactive && (hasBg || hasBorder) && h < 90) kind = hasBg ? 'b' : 'f';
    else if (ownText > 0 && childEls === 0) kind = 't';
    else if ((hasBg || hasBorder) && childEls > 0) kind = 'f';
    if (!kind) continue;

    seen.add(key);
    out.push({
      x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h),
      r: Math.min(28, Math.round(parseFloat(cs.borderTopLeftRadius) || 0)),
      kind, area: Math.round(w * h), depth: (() => { let d = 0, p = el; while (p = p.parentElement) d++; return d; })(),
    });
  }
  return out;
})()`;

const { result } = await S("Runtime.evaluate", {
  expression: COLLECT,
  returnByValue: true,
});
let boxes = result.value || [];

// Drop a box that is almost exactly another box (wrapper around its only child).
boxes.sort((a, b) => b.area - a.area);
const kept = [];
for (const b of boxes) {
  const dup = kept.find(
    (k) =>
      Math.abs(k.x - b.x) < 8 &&
      Math.abs(k.y - b.y) < 8 &&
      Math.abs(k.w - b.w) < 12 &&
      Math.abs(k.h - b.h) < 12
  );
  if (!dup) kept.push(b);
}

// A carousel slide or grid cell wraps a card and runs past its edges. It is
// a real element but not one you can see, so drawing it puts lines where the
// UI has none. Drop anything that exists only to hold a box we already have.
const contains = (outer, inner) =>
  inner.x >= outer.x - 4 &&
  inner.y >= outer.y - 4 &&
  inner.x + inner.w <= outer.x + outer.w + 4 &&
  inner.y + inner.h <= outer.y + outer.h + 4;

const boxed = kept.filter((b) => b.kind === "f" || b.kind === "m");
const wrappers = new Set(
  boxed.filter((outer) =>
    boxed.some(
      (inner) =>
        inner !== outer &&
        contains(outer, inner) &&
        outer.area < inner.area * 2.6 &&
        outer.area > inner.area * 1.05
    )
  )
);

// Text runs inside a card are the detail that sells it; keep a readable mix.
const frames = boxed.filter((b) => !wrappers.has(b)).slice(0, 8);
const text = kept.filter((b) => b.kind === "t").slice(0, 14);
const btns = kept.filter((b) => b.kind === "b").slice(0, 4);
const final = [...frames, ...btns, ...text]
  .sort((a, b) => a.depth - b.depth || a.y - b.y)
  .slice(0, 22);

// The container is the largest frame — what the guides are drawn against.
const container = frames[0] || { x: 40, y: 40, w: W - 80, h: H - 80, r: 16 };

const { data } = await S("Page.captureScreenshot", { format: "png" });
await writeFile(`${OUT}/${ID}.png`, Buffer.from(data, "base64"));
await writeFile(
  `${OUT}/${ID}.scene.json`,
  JSON.stringify(
    {
      id: ID,
      url: URL_,
      container: [container.x, container.y, container.w, container.h, container.r],
      boxes: final.map((b) => [b.x, b.y, b.w, b.h, b.r, b.kind]),
    },
    null,
    2
  )
);

console.log(`${ID}: ${final.length} boxes (${frames.length}f/m, ${btns.length}b, ${text.length}t)`);
ws.close();
chrome.kill();
process.exit(0);
