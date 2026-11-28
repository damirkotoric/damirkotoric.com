// Builds the product pieces that float around the hero portrait. Every
// piece is a silent loop: its layout draws in as a wireframe and resolves
// into the real product, the product runs for a few seconds, and then the
// whole thing plays backward to an empty canvas, so no loop has a seam.
// Products with a dark mode get a second loop, <id>-dark, for the site's own
// dark mode.
//
// Inputs:  /tmp/heroport/rec/<id>/     from scripts/record-hero-pieces.mjs
//          /tmp/bts/hero-<id>.scene.json, /tmp/bts/rankdat.*
//                                      from scripts/capture-product-screen.mjs
//                                      (see the commands at the end of this file)
//          the DoNotStay site's screenshot of a recommended hotel
// Outputs: public/videos/hero-<id>.mp4, and public/images/hero/<id>.avif —
//          the finished screen, for visitors who prefer reduced motion.
//
// Usage: node scripts/build-hero-pieces.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const IMAGES = "public/images/hero";
const VIDEOS = "public/videos";
const TMP = "/tmp/heroport";
const FFMPEG = "/opt/homebrew/bin/ffmpeg";
const FPS = 24;
mkdirSync(IMAGES, { recursive: true });

const ffmpeg = (...args) => execFileSync(FFMPEG, ["-v", "error", "-y", ...args]);
const ENCODE = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

// A scene is the measured layout of a screen: a container and its boxes.
// This takes the part of one that falls inside a crop and rescales it.
function cropScene(path, crop, width) {
  const scene = JSON.parse(readFileSync(path, "utf8"));
  const k = width / crop.w;
  const overlaps = (a, b) =>
    a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3];
  const holds = (a, b) =>
    b[0] >= a[0] - 4 && b[1] >= a[1] - 4 && b[0] + b[2] <= a[0] + a[2] + 4 && b[1] + b[3] <= a[1] + a[3] + 4;
  const text = scene.boxes.filter((b) => b[5] === "t");
  const boxes = scene.boxes
    .filter(([x, y, w, h]) => {
      const cx = x + w / 2;
      const cy = y + h / 2;
      return cx > crop.x && cx < crop.x + crop.w && cy > crop.y && cy < crop.y + crop.h;
    })
    // A traced scene can hold lines the UI does not have. A frame that cuts
    // through lines of text is not a frame, and a "text run" this short is
    // a stray mark.
    .filter((b) => b[5] === "t" || text.filter((t) => overlaps(b, t) && !holds(b, t)).length < 2)
    .filter((b) => b[5] !== "t" || b[2] >= 50)
    .map(([x, y, w, h, r, kind]) => {
      const x0 = Math.max(crop.x, x);
      const y0 = Math.max(crop.y, y);
      const x1 = Math.min(crop.x + crop.w, x + w);
      const y1 = Math.min(crop.y + crop.h, y + h);
      return [(x0 - crop.x) * k, (y0 - crop.y) * k, (x1 - x0) * k, (y1 - y0) * k, r * k, kind].map(
        (v) => (typeof v === "number" ? Math.round(v) : v)
      );
    });
  const inset = 2;
  return {
    container: [inset, inset, width - inset * 2, Math.round(crop.h * k) - inset * 2, 10],
    boxes,
  };
}

// The wireframe build-up for one piece, resolving into `photo` (the first
// frame of its clip). `scale` thickens the linework for pieces shown much
// smaller than they were captured.
function buildUp(id, photo, scenePath, scale) {
  const dir = `${TMP}/buildup/${id}`;
  const theme = id.endsWith("-dark") ? ["dark"] : [];
  execFileSync(process.execPath, [
    "scripts/build-bts-frames.mjs", id, photo, scenePath, dir, String(scale), ...theme,
  ]);
  return ["-framerate", "30", "-i", `${dir}/frame%04d.png`];
}

// Build-up, then the clip, then all of it in reverse.
async function assemble(id, buildUpInput, clipInput, width, crf) {
  ffmpeg(
    ...buildUpInput,
    ...clipInput,
    "-filter_complex",
    `[0:v]fps=${FPS},scale=${width}:-2:flags=lanczos,setsar=1[a];` +
      `[1:v]fps=${FPS},scale=${width}:-2:flags=lanczos,setsar=1[b];` +
      `[a][b]concat=n=2:v=1,split[f][r0];[r0]reverse[r];[f][r]concat=n=2:v=1`,
    ...ENCODE, "-crf", String(crf),
    `${VIDEOS}/hero-${id}.mp4`
  );
  const still = await sharp(`${TMP}/${id}-first.png`)
    .resize({ width })
    .avif({ quality: 60 })
    .toFile(`${IMAGES}/${id}.avif`);
  console.log(id, `${still.width}x${still.height}`);
}

// Recorded pages. The screencast's frames carry their real timing.
const recorded = [
  { id: "rankdat", width: 960, crf: 30, scale: 2 },
  { id: "stylespin", width: 960, crf: 30, scale: 2 },
  { id: "beamy-phone", width: 390, crf: 28, scale: 1.8 },
];
for (const r of recorded) {
  // The layout is the same in both colour schemes, so one measured scene
  // serves both.
  for (const id of [r.id, `${r.id}-dark`]) {
    const first = `${TMP}/${id}-first.png`;
    await sharp(`${TMP}/rec/${id}/f0000.jpg`).png().toFile(first);
    await assemble(
      id,
      buildUp(id, first, `/tmp/bts/hero-${r.id}.scene.json`, r.scale),
      ["-f", "concat", "-safe", "0", "-i", `${TMP}/rec/${id}/list.txt`],
      r.width,
      r.crf
    );
  }
}

// The extension's sidebar on a hotel it recommends, from the product site's
// own screenshot. There is no DOM to measure, so the layout is traced from
// the image: the panel is set on a 1280x960 frame, which is what the tracer
// reads, and the result is cropped back to the panel.
{
  const id = "donotstay-panel";
  const SHOT = `${process.env.HOME}/src/donotstay/apps/web/public/2.jpg`;
  const panel = { x: 1604, y: 30, w: 920, h: 1344 };
  const placed = { x: 311, y: 0, w: 658, h: 960 };
  ffmpeg(
    "-i", SHOT,
    "-vf",
    `crop=${panel.w}:${panel.h}:${panel.x}:${panel.y},scale=${placed.w}:${placed.h},pad=1280:960:${placed.x}:0:white`,
    "-frames:v", "1", "/tmp/bts/dns-stay.png"
  );
  execFileSync(process.execPath, ["scripts/trace-product-frame.mjs", "dns-stay"]);

  const first = `${TMP}/${id}-first.png`;
  ffmpeg(
    "-i", SHOT,
    "-vf", `crop=${panel.w}:${panel.h}:${panel.x}:${panel.y},scale=360:526:flags=lanczos`,
    "-frames:v", "1", first
  );
  const scenePath = `${TMP}/${id}.scene.json`;
  writeFileSync(scenePath, JSON.stringify(cropScene("/tmp/bts/dns-stay.scene.json", placed, 360)));
  // It is a still, so the product part of the loop simply holds.
  await assemble(id, buildUp(id, first, scenePath, 1), ["-loop", "1", "-t", "4", "-i", first], 360, 27);
}

// Two cards from Rankdat's Top Insights row, dissolving into each other.
// The captures are 2560px wide for a 1280px layout.
for (const [id, capture] of [
  ["rankdat-insight", "/tmp/bts/rankdat.png"],
  ["rankdat-insight-dark", "/tmp/bts/rankdat-dark.png"],
]) {
  const card = { top: 752, width: 716, height: 728 };
  const lefts = [90, 1610];
  const stills = lefts.map((_, i) => `${TMP}/${id}-${i}.png`);
  for (const [i, left] of lefts.entries()) {
    await sharp(capture)
      .extract({ left, ...card })
      .resize({ width: 420, height: 428 })
      .png()
      .toFile(stills[i]);
  }
  const HOLD = 3.4;
  const FADE = 0.6;
  const clip = `${TMP}/${id}-clip.mp4`;
  ffmpeg(
    "-loop", "1", "-t", String(HOLD + FADE), "-i", stills[0],
    "-loop", "1", "-t", String(HOLD + FADE), "-i", stills[1],
    "-filter_complex",
    `[0:v]fps=${FPS}[a];[1:v]fps=${FPS}[b];[a][b]xfade=transition=fade:duration=${FADE}:offset=${HOLD}`,
    ...ENCODE, "-crf", "12",
    clip
  );
  const first = `${TMP}/${id}-first.png`;
  await sharp(stills[0]).toFile(first);
  const scenePath = `${TMP}/${id}.scene.json`;
  const inLayout = { x: lefts[0] / 2, y: card.top / 2, w: card.width / 2, h: card.height / 2 };
  writeFileSync(scenePath, JSON.stringify(cropScene("/tmp/bts/rankdat.scene.json", inLayout, 420)));
  await assemble(id, buildUp(id, first, scenePath, 1.7), ["-i", clip], 420, 27);
}

// To refresh the measured layouts (Node 22+):
//   VIEW=1200x800 node scripts/capture-product-screen.mjs hero-rankdat https://rankdat.io
//   VIEW=1200x800 node scripts/capture-product-screen.mjs hero-stylespin https://stylespin.vercel.app
//   VIEW=390x844 MOBILE=1 node scripts/capture-product-screen.mjs hero-beamy-phone https://getbeamy.app
//   node scripts/capture-product-screen.mjs rankdat https://rankdat.io 3500 "Top Insights"
//   SCHEME=dark node scripts/capture-product-screen.mjs rankdat-dark https://rankdat.io 3500 "Top Insights"
