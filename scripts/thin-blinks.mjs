// Removes chosen blinks from a portrait clip without touching anything else.
//
// Image-to-video models blink too often, and asking for fewer gets eyes held
// shut instead. So take the clip that is otherwise right and paint over the
// blinks that should go: across each one, the eye region is replaced by a
// blend from the open eyes just before it to the open eyes just after. Only a
// feathered patch around the eyes changes, so breathing and the rest of the
// face keep their real motion.
//
// Usage: node scripts/thin-blinks.mjs in.mp4 out.mp4 14-18,77-84
//        (frame ranges of the blinks to remove, inclusive)
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [, , SRC, OUT, RANGES] = process.argv;
if (!SRC || !OUT || !RANGES) {
  console.error("usage: thin-blinks.mjs in.mp4 out.mp4 14-18,77-84");
  process.exit(1);
}

// The eye region in the source frame, and how softly the patch blends in.
const BOX = { x: 500, y: 610, w: 420, h: 180 };
const FEATHER = 28;
const PAD = 2; // frames either side of a blink that are safely open-eyed

const tmp = mkdtempSync(join(tmpdir(), "blinks-"));
const ff = (args) => execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...args]);

ff(["-i", SRC, "-vf", `crop=${BOX.w}:${BOX.h}:${BOX.x}:${BOX.y}`, join(tmp, "eye%04d.png")]);
const frames = readdirSync(tmp).filter((f) => f.startsWith("eye")).sort();
const raw = (i) => sharp(join(tmp, frames[i])).removeAlpha().raw().toBuffer();

// Feathered alpha: opaque in the middle, fading to nothing at the box edge.
const alpha = Buffer.alloc(BOX.w * BOX.h);
for (let y = 0; y < BOX.h; y++) {
  for (let x = 0; x < BOX.w; x++) {
    const edge = Math.min(x, y, BOX.w - 1 - x, BOX.h - 1 - y);
    const t = Math.min(1, edge / FEATHER);
    alpha[y * BOX.w + x] = Math.round(255 * t * t * (3 - 2 * t));
  }
}

const clear = await sharp({
  create: { width: BOX.w, height: BOX.h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
}).png().toBuffer();

const patches = new Map();
for (const range of RANGES.split(",")) {
  const [s, e] = range.split("-").map(Number);
  const a = Math.max(0, s - PAD);
  const b = Math.min(frames.length - 1, e + PAD);
  const [from, to] = [await raw(a), await raw(b)];
  for (let f = a + 1; f < b; f++) {
    const u = (f - a) / (b - a);
    const t = u * u * (3 - 2 * u);
    const rgba = Buffer.alloc(BOX.w * BOX.h * 4);
    for (let p = 0; p < BOX.w * BOX.h; p++) {
      for (let c = 0; c < 3; c++) {
        rgba[p * 4 + c] = Math.round(from[p * 3 + c] * (1 - t) + to[p * 3 + c] * t);
      }
      rgba[p * 4 + 3] = alpha[p];
    }
    patches.set(f, await sharp(rgba, { raw: { width: BOX.w, height: BOX.h, channels: 4 } }).png().toBuffer());
  }
}

for (let f = 0; f < frames.length; f++) {
  await sharp(patches.get(f) ?? clear).toFile(join(tmp, `patch${String(f + 1).padStart(4, "0")}.png`));
}

const fps = execFileSync("ffprobe", [
  "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", SRC,
]).toString().trim();

ff([
  "-i", SRC, "-framerate", fps, "-i", join(tmp, "patch%04d.png"),
  "-filter_complex", `[0:v][1:v]overlay=${BOX.x}:${BOX.y}:shortest=1,format=yuv420p`,
  "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "10", OUT,
]);

rmSync(tmp, { recursive: true, force: true });
console.log(`${OUT}: painted over ${patches.size} frames across ${RANGES.split(",").length} blinks`);
