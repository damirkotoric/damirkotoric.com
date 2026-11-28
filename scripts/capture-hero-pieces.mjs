// Screenshots of shipped products for the pieces that float around the hero
// portrait. Plain captures at a given viewport — no geometry extraction.
//
// Usage: node scripts/capture-hero-pieces.mjs   (Node 22+, writes /tmp/heroport)
//        node scripts/capture-hero-pieces.mjs <id> <url> <width> <height> [mobile|desktop] [settleMs]
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "/tmp/heroport";
// With arguments, take that one shot instead.
const [, , ID, URL_, W, H, MOBILE, SETTLE = "5000"] = process.argv;
const DEFAULT_SHOTS = [
  { id: "rankdat", url: "https://rankdat.io", w: 1200, h: 800 },
  { id: "stylespin", url: "https://stylespin.vercel.app", w: 1200, h: 800 },
  { id: "beamy-phone", url: "https://getbeamy.app", w: 390, h: 844, mobile: true },
];
const SHOTS = ID
  ? [{ id: ID, url: URL_, w: Number(W), h: Number(H), mobile: MOBILE === "mobile" }]
  : DEFAULT_SHOTS;

const PORT = 9222 + Math.floor(Math.random() * 500);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await mkdir(OUT, { recursive: true });
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--hide-scrollbars",
  "--disable-gpu",
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

for (const shot of SHOTS) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S("Page.enable");
  await S("Emulation.setDeviceMetricsOverride", {
    width: shot.w,
    height: shot.h,
    deviceScaleFactor: 2,
    mobile: !!shot.mobile,
  });
  await S("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: "light" }],
  });
  await S("Page.navigate", { url: shot.url });
  await sleep(Number(SETTLE));
  const { data } = await S("Page.captureScreenshot", { format: "png" });
  await writeFile(`${OUT}/${shot.id}.png`, Buffer.from(data, "base64"));
  await send("Target.closeTarget", { targetId });
  console.log("captured", shot.id);
}

ws.close();
chrome.kill();
