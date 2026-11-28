// Builds the product pieces that float around the hero portrait.
//
// Inputs:  /tmp/heroport/*.png   from scripts/capture-hero-pieces.mjs
//          /tmp/bts/rankdat.png  from scripts/capture-product-screen.mjs
//          the DoNotStay case-study video in public/
// Outputs: public/images/hero/*.avif and public/videos/hero-donotstay.mp4
//
// Usage: node scripts/build-hero-pieces.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const OUT = "public/images/hero";
const FFMPEG = "/opt/homebrew/bin/ffmpeg";
mkdirSync(OUT, { recursive: true });

const stills = [
  { src: "/tmp/heroport/rankdat.png", out: "rankdat", width: 960 },
  { src: "/tmp/heroport/stylespin.png", out: "stylespin", width: 960 },
  { src: "/tmp/heroport/beamy-phone.png", out: "beamy-phone", width: 468 },
  // One card from Rankdat's Top Insights row.
  {
    src: "/tmp/bts/rankdat.png",
    out: "rankdat-insight",
    width: 420,
    crop: { left: 850, top: 752, width: 716, height: 728 },
  },
];

for (const s of stills) {
  let img = sharp(s.src);
  if (s.crop) img = img.extract(s.crop);
  const info = await img
    .resize({ width: s.width })
    .avif({ quality: 60 })
    .toFile(`${OUT}/${s.out}.avif`);
  console.log(s.out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}K`);
}

// The extension's sidebar, cut out of the case-study video while the camera
// holds still on it, played forward then backward so the loop has no seam.
const PANEL = "crop=1436:2100:1352:58,scale=360:-2,fps=24";
execFileSync(FFMPEG, [
  "-v", "error", "-y",
  "-ss", "15.3", "-t", "3.5",
  "-i", "public/images/portfolio/donotstay/donotstay.mp4",
  "-filter_complex", `[0:v]${PANEL},split[f][b];[b]reverse[r];[f][r]concat=n=2:v=1`,
  "-an", "-c:v", "libx264", "-crf", "27", "-preset", "slow",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  "public/videos/hero-donotstay.mp4",
]);
execFileSync(FFMPEG, [
  "-v", "error", "-y",
  "-i", "public/videos/hero-donotstay.mp4",
  "-frames:v", "1", "/tmp/heroport/donotstay-poster.png",
]);
const poster = await sharp("/tmp/heroport/donotstay-poster.png")
  .avif({ quality: 60 })
  .toFile(`${OUT}/donotstay-panel.avif`);
console.log("donotstay-panel", `${poster.width}x${poster.height}`, `${Math.round(poster.size / 1024)}K`);
