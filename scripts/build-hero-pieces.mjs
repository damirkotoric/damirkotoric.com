// Builds the product pieces that float around the hero portrait. Every
// piece is a silent loop: its layout draws in as a wireframe and resolves
// into the real product, the product runs for a few seconds, and then the
// whole thing plays backward to an empty canvas, so no loop has a seam.
//
// Inputs:  /tmp/heroport/rec/<id>/     from scripts/record-hero-pieces.mjs
//          /tmp/bts/hero-<id>.scene.json, /tmp/bts/{rankdat,donotstay}.*
//                                      from scripts/capture-product-screen.mjs
//                                      (see the commands at the end of this file)
//          the DoNotStay case-study video in public/
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
  const boxes = scene.boxes
    .filter(([x, y, w, h]) => {
      const cx = x + w / 2;
      const cy = y + h / 2;
      return cx > crop.x && cx < crop.x + crop.w && cy > crop.y && cy < crop.y + crop.h;
    })
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
  execFileSync(process.execPath, ["scripts/build-bts-frames.mjs", id, photo, scenePath, dir, String(scale)]);
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
  const first = `${TMP}/${r.id}-first.png`;
  await sharp(`${TMP}/rec/${r.id}/f0000.jpg`).png().toFile(first);
  await assemble(
    r.id,
    buildUp(r.id, first, `/tmp/bts/hero-${r.id}.scene.json`, r.scale),
    ["-f", "concat", "-safe", "0", "-i", `${TMP}/rec/${r.id}/list.txt`],
    r.width,
    r.crf
  );
}

// The extension's sidebar, cut out of the case-study video while the camera
// holds still on it. The crop is in the video's own pixels; the measured
// scene is in the showreel's 1280px frame, 2.25 times smaller.
{
  const id = "donotstay-panel";
  const crop = { x: 1352, y: 58, w: 1436, h: 2100 };
  const clip = `${TMP}/${id}-clip.mp4`;
  ffmpeg(
    "-ss", "15.3", "-t", "3.5",
    "-i", "public/images/portfolio/donotstay/donotstay.mp4",
    "-vf", `crop=${crop.w}:${crop.h}:${crop.x}:${crop.y},scale=360:-2,fps=${FPS}`,
    ...ENCODE, "-crf", "12",
    clip
  );
  const first = `${TMP}/${id}-first.png`;
  ffmpeg("-i", clip, "-frames:v", "1", first);
  const scenePath = `${TMP}/${id}.scene.json`;
  const inFrame = { x: crop.x / 2.25, y: crop.y / 2.25, w: crop.w / 2.25, h: crop.h / 2.25 };
  writeFileSync(scenePath, JSON.stringify(cropScene("/tmp/bts/donotstay.scene.json", inFrame, 360)));
  await assemble(id, buildUp(id, first, scenePath, 1), ["-i", clip], 360, 27);
}

// Two cards from Rankdat's Top Insights row, dissolving into each other.
// The capture is 2560px wide for a 1280px layout.
{
  const id = "rankdat-insight";
  const card = { top: 752, width: 716, height: 728 };
  const lefts = [90, 1610];
  for (const [i, left] of lefts.entries()) {
    await sharp("/tmp/bts/rankdat.png")
      .extract({ left, ...card })
      .resize({ width: 420, height: 428 })
      .png()
      .toFile(`${TMP}/insight-${i}.png`);
  }
  const HOLD = 3.4;
  const FADE = 0.6;
  const clip = `${TMP}/${id}-clip.mp4`;
  ffmpeg(
    "-loop", "1", "-t", String(HOLD + FADE), "-i", `${TMP}/insight-0.png`,
    "-loop", "1", "-t", String(HOLD + FADE), "-i", `${TMP}/insight-1.png`,
    "-filter_complex",
    `[0:v]fps=${FPS}[a];[1:v]fps=${FPS}[b];[a][b]xfade=transition=fade:duration=${FADE}:offset=${HOLD}`,
    ...ENCODE, "-crf", "12",
    clip
  );
  const first = `${TMP}/${id}-first.png`;
  await sharp(`${TMP}/insight-0.png`).toFile(first);
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
//   node scripts/trace-product-frame.mjs   (DoNotStay, from a frame of its video)
