// Records short clips of shipped products for the pieces that float around
// the hero portrait: the real page doing what it does, via Chrome's
// screencast. Frames land in /tmp/heroport/rec/<id>/ with a concat list that
// carries their real timing; scripts/build-hero-pieces.mjs turns them into
// loops.
//
// Usage: node scripts/record-hero-pieces.mjs   (Node 22+)
import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";

const OUT = "/tmp/heroport/rec";
// Rankdat's hero grid ripples outward from wherever it is clicked.
const RIPPLE = `(() => {
  const click = (x, y) =>
    [...document.querySelectorAll(".cell")]
      .find((cell) => {
        const r = cell.getBoundingClientRect();
        return x >= r.left && x < r.right && y >= r.top && y < r.bottom;
      })
      ?.click();
  setTimeout(() => click(380, 170), 250);
  setTimeout(() => click(860, 260), 2300);
})()`;

const SHOTS = [
  // `run` is a script started as the recording begins.
  { id: "rankdat", url: "https://rankdat.io", w: 1200, h: 800, ms: 4500, run: RIPPLE },
  // The landing page cycles its models by itself.
  { id: "stylespin", url: "https://stylespin.vercel.app", w: 1200, h: 800, ms: 5000 },
  // The page's own promo video plays inside it.
  { id: "beamy-phone", url: "https://getbeamy.app", w: 390, h: 844, mobile: true, ms: 6000 },
];

const PORT = 9222 + Math.floor(Math.random() * 500);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--hide-scrollbars",
  "--autoplay-policy=no-user-gesture-required",
  "--no-first-run",
  `--user-data-dir=/tmp/scrape/profile-${PORT}`,
]);
chrome.stderr.on("data", () => {});

let wsUrl;
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(250);
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
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
let onFrame = null;
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
  } else if (m.method === "Page.screencastFrame" && onFrame) {
    onFrame(m.params, m.sessionId);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => {
    const id = ++msgId;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

for (const shot of SHOTS) {
  const dir = `${OUT}/${shot.id}`;
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S("Page.enable");
  await S("Runtime.enable");
  await S("Emulation.setDeviceMetricsOverride", {
    width: shot.w,
    height: shot.h,
    deviceScaleFactor: 1,
    mobile: !!shot.mobile,
  });
  await S("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: "light" }],
  });
  await S("Page.navigate", { url: shot.url });
  await sleep(4500);

  const frames = [];
  onFrame = (params, sid) => {
    frames.push({ data: params.data, t: params.metadata.timestamp });
    send("Page.screencastFrameAck", { sessionId: params.sessionId }, sid).catch(() => {});
  };
  await S("Page.startScreencast", { format: "jpeg", quality: 90, everyNthFrame: 1 });
  if (shot.run) await S("Runtime.evaluate", { expression: shot.run });
  await sleep(shot.ms);
  await S("Page.stopScreencast");
  onFrame = null;

  // The concat list gives each frame the time it was really on screen.
  const end = frames[0].t + shot.ms / 1000;
  let list = "";
  for (let i = 0; i < frames.length; i++) {
    const name = `f${String(i).padStart(4, "0")}.jpg`;
    await writeFile(`${dir}/${name}`, Buffer.from(frames[i].data, "base64"));
    const next = i + 1 < frames.length ? frames[i + 1].t : end;
    list += `file '${name}'\nduration ${Math.max(0.001, next - frames[i].t).toFixed(4)}\n`;
  }
  list += `file 'f${String(frames.length - 1).padStart(4, "0")}.jpg'\n`;
  await writeFile(`${dir}/list.txt`, list);
  await send("Target.closeTarget", { targetId });
  console.log("recorded", shot.id, `${frames.length} frames`);
}

ws.close();
chrome.kill();
