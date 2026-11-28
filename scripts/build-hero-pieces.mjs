// Builds the product pieces that float around the hero portrait. Every
// piece is a short silent loop with a poster of its first frame.
//
// Inputs:  /tmp/heroport/rec/<id>/  from scripts/record-hero-pieces.mjs
//          /tmp/bts/rankdat.png     from scripts/capture-product-screen.mjs
//          the DoNotStay case-study video in public/
// Outputs: public/videos/hero-<id>.mp4 and public/images/hero/<id>.avif
//
// Usage: node scripts/build-hero-pieces.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const IMAGES = "public/images/hero";
const VIDEOS = "public/videos";
const TMP = "/tmp/heroport";
const FFMPEG = "/opt/homebrew/bin/ffmpeg";
mkdirSync(IMAGES, { recursive: true });

const ffmpeg = (...args) => execFileSync(FFMPEG, ["-v", "error", "-y", ...args]);
const ENCODE = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
// Forward then backward, so the loop has no seam.
const PING_PONG = "split[f][b];[b]reverse[r];[f][r]concat=n=2:v=1";

async function poster(id) {
  ffmpeg("-i", `${VIDEOS}/hero-${id}.mp4`, "-frames:v", "1", `${TMP}/${id}-poster.png`);
  const info = await sharp(`${TMP}/${id}-poster.png`).avif({ quality: 60 }).toFile(`${IMAGES}/${id}.avif`);
  console.log(id, `${info.width}x${info.height}`);
}

// Recorded pages: retime the screencast to a steady frame rate.
const recorded = [
  { id: "rankdat", width: 960, crf: 30 },
  { id: "stylespin", width: 960, crf: 30 },
  { id: "beamy-phone", width: 390, crf: 28 },
];
for (const r of recorded) {
  ffmpeg(
    "-f", "concat", "-safe", "0", "-i", `${TMP}/rec/${r.id}/list.txt`,
    "-filter_complex", `[0:v]fps=24,scale=${r.width}:-2:flags=lanczos,${PING_PONG}`,
    ...ENCODE, "-crf", String(r.crf),
    `${VIDEOS}/hero-${r.id}.mp4`
  );
  await poster(r.id);
}

// The extension's sidebar, cut out of the case-study video while the camera
// holds still on it.
ffmpeg(
  "-ss", "15.3", "-t", "3.5",
  "-i", "public/images/portfolio/donotstay/donotstay.mp4",
  "-filter_complex", `[0:v]crop=1436:2100:1352:58,scale=360:-2,fps=24,${PING_PONG}`,
  ...ENCODE, "-crf", "27",
  `${VIDEOS}/hero-donotstay-panel.mp4`
);
await poster("donotstay-panel");

// Two cards from Rankdat's Top Insights row, dissolving into each other.
const CARD = { top: 752, width: 716, height: 728 };
const cards = [90, 1610];
for (const [i, left] of cards.entries()) {
  await sharp("/tmp/bts/rankdat.png")
    .extract({ left, ...CARD })
    .resize({ width: 420, height: 428 })
    .png()
    .toFile(`${TMP}/insight-${i}.png`);
}
const HOLD = 3.4;
const FADE = 0.6;
ffmpeg(
  "-loop", "1", "-t", String(HOLD + FADE), "-i", `${TMP}/insight-0.png`,
  "-loop", "1", "-t", String(HOLD + FADE), "-i", `${TMP}/insight-1.png`,
  "-filter_complex",
  `[0:v]fps=24[a];[1:v]fps=24[b];[a][b]xfade=transition=fade:duration=${FADE}:offset=${HOLD},${PING_PONG}`,
  ...ENCODE, "-crf", "27",
  `${VIDEOS}/hero-rankdat-insight.mp4`
);
await poster("rankdat-insight");
