// Generates "how it's made" build-up frames for the hero showreel.
//
// Each product's wireframe geometry is measured from the shipped screen, so
// the build-up resolves into the real thing rather than an approximation of
// it. Output: /tmp/bts/<id>/frame####.png, consumed by build-hero-reel.sh.
//
// Usage: node scripts/build-bts-frames.mjs
//
// The same build-up for any other screen (the hero's floating pieces use
// this): the frame takes the photo's size.
//        node scripts/build-bts-frames.mjs <id> <photo> <scene.json> <outDir> [scale]
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const [, , ONE_ID, ONE_PHOTO, ONE_SCENE, ONE_OUT, ONE_SCALE = "1"] = process.argv;

let W = 1280;
let H = 960;
// Line weights, the grid and the handles are drawn for a 1280px frame shown
// near full size. A screen that will be shown much smaller than it was
// captured passes a scale, so they survive the reduction.
const K = Number(ONE_SCALE);
const FPS = 30;
const DUR = 1.6; // seconds of build-up per product
const FRAMES = Math.round(FPS * DUR);

// Vector-tool palette: hairlines, translucent selection fills, snap guides.
const EDGE = "#2D7FF9";
const DOT = "#96A7BD";
const GUIDE = "#FF2E85";

// kind: f = outline, b = filled block, t = text bar, m = media plate
// Scenes come from the capture/trace step, never from eyeballing a frame:
// capture-product-screen.mjs reads real element rects out of a shipped web
// product's DOM, trace-product-frame.mjs recovers them from a video frame
// where there is no DOM to read. Both write /tmp/bts/<id>.scene.json next to
// the <id>.png the build-up resolves into.
const IDS = ["beamy", "donotstay", "rankdat", "stylespin"];
const SCENES = {};
const loadScene = async (path) => {
  const scene = JSON.parse(await readFile(path, "utf8"));
  return { container: scene.container, boxes: scene.boxes };
};
if (ONE_ID) {
  SCENES[ONE_ID] = await loadScene(ONE_SCENE);
  ({ width: W, height: H } = await sharp(ONE_PHOTO).metadata());
} else {
  for (const id of IDS) SCENES[id] = await loadScene(`/tmp/bts/${id}.scene.json`);
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 3);
const range = (t, a, b) => clamp01((t - a) / (b - a));

// Where only part of the frame is ours to build. DoNotStay is an extension
// over someone else's page: the page stays as shot, the panel gets built.
const REGIONS = {
  donotstay: [583, 18, 668, 918],
};

// A pixel dot grid, the way a vector canvas shows one.
function dotGrid() {
  const step = 16 * K;
  let d = "";
  for (let y = step; y < H; y += step)
    for (let x = step; x < W; x += step) d += `M${x} ${y}h${1.5 * K}`;
  return `<path d="${d}" stroke="${DOT}" stroke-width="${1.5 * K}" opacity="0.8" shape-rendering="crispEdges"/>`;
}

// Selection handles, as a vector tool draws them.
function handles(x, y, w, h, a, every = true) {
  const pts = every
    ? [
        [x, y], [x + w / 2, y], [x + w, y],
        [x + w, y + h / 2], [x + w, y + h],
        [x + w / 2, y + h], [x, y + h], [x, y + h / 2],
      ]
    : [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const s = 7 * K;
  return pts
    .map(
      ([px, py]) =>
        `<rect x="${(px - s / 2).toFixed(1)}" y="${(py - s / 2).toFixed(1)}" width="${s}" height="${s}" ` +
        `fill="#fff" stroke="${EDGE}" stroke-width="${1.25 * K}" opacity="${a.toFixed(3)}"/>`
    )
    .join("");
}

function boxLayer(boxes, t) {
  const n = boxes.length;
  const slot = 0.34 / n;
  return boxes
    .map(([x, y, w, h, r, kind], i) => {
      const p = easeOut(range(t, i * slot, i * slot + 0.18));
      if (p <= 0) return "";
      const fillP = easeOut(range(t, 0.3 + i * slot * 0.5, 0.62));
      const cx = x + w / 2;
      const cy = y + h / 2;
      const sw = w * p;
      const sh = h * p;
      const op = kind === "m" ? 0.16 : kind === "b" ? 0.22 : kind === "t" ? 0.14 : 0.07;
      return (
        `<rect x="${(cx - sw / 2).toFixed(1)}" y="${(cy - sh / 2).toFixed(1)}" ` +
        `width="${sw.toFixed(1)}" height="${sh.toFixed(1)}" rx="${r}" ` +
        `fill="${EDGE}" fill-opacity="${(fillP * op).toFixed(3)}" ` +
        `stroke="${EDGE}" stroke-width="${1.25 * K}" stroke-opacity="${(p * 0.85).toFixed(3)}" ` +
        `shape-rendering="crispEdges"/>`
      );
    })
    .join("");
}

// Snap guides and a dimension read-out — the vector-tool/inspector tell.
function guideLayer(container, t) {
  const a = easeOut(range(t, 0.22, 0.4));
  if (a <= 0) return "";
  const [x, y, w, h] = container;
  const g = `stroke="${GUIDE}" stroke-width="${K}" opacity="${(a * 0.8).toFixed(3)}"`;
  const label = `${Math.round(w)} × ${Math.round(h)}`;
  const lw = (label.length * 7.4 + 14) * K;
  const lx = Math.min(W - lw - 6 * K, x + w - lw);
  const ly = Math.min(H - 24 * K, y + h + 8 * K);
  return (
    `<path d="M${x} 0V${H}M${x + w} 0V${H}M0 ${y}H${W}M0 ${y + h}H${W}" ${g} stroke-dasharray="${3 * K} ${4 * K}"/>` +
    `<rect x="${lx}" y="${ly}" width="${lw}" height="${19 * K}" rx="${3 * K}" fill="${GUIDE}" opacity="${a.toFixed(3)}"/>` +
    `<text x="${lx + 7 * K}" y="${ly + 13.5 * K}" font-family="monospace" font-size="${11.5 * K}" ` +
    `fill="#fff" opacity="${a.toFixed(3)}">${label}</text>` +
    handles(x, y, w, h, a)
  );
}

function containerLayer([x, y, w, h, r]) {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ` +
    `fill="none" stroke="${EDGE}" stroke-width="${1.25 * K}" stroke-opacity="0.9" shape-rendering="crispEdges"/>`
  );
}

function buildSvg(scene, t, layerAlpha) {
  const reg = scene.region;
  const clip = reg
    ? `<clipPath id="r"><rect x="${reg[0]}" y="${reg[1]}" width="${reg[2]}" height="${reg[3]}" rx="14"/></clipPath>`
    : "";
  // Inside a region the panel masks the real UI until it resolves; over a
  // whole frame the page itself is the canvas.
  const plate = reg
    ? `<rect x="${reg[0]}" y="${reg[1]}" width="${reg[2]}" height="${reg[3]}" rx="14" fill="#fff"/>`
    : `<rect width="${W}" height="${H}" fill="#fff"/>`;
  const body =
    plate + dotGrid() + containerLayer(scene.container) + boxLayer(scene.boxes, t);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs>${clip}</defs>` +
    `<g opacity="${layerAlpha.toFixed(3)}">` +
    (reg ? `<g clip-path="url(#r)">${body}</g>` : body) +
    guideLayer(scene.container, t) +
    `</g></svg>`
  );
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };

async function renderProduct(id, scene, photoPath = `/tmp/bts/${id}.png`, dir = `/tmp/bts/${id}`) {
  await mkdir(dir, { recursive: true });
  const photo = await sharp(photoPath).resize(W, H).png().toBuffer();
  const reg = scene.region;

  for (let f = 0; f < FRAMES; f++) {
    const t = f / (FRAMES - 1);
    // A region build-up sits over the real page, so the photo is there from
    // the first frame and only the panel resolves.
    const photoAlpha = reg ? 1 : easeOut(range(t, 0.58, 0.84));
    const wireAlpha = 1 - easeOut(range(t, 0.7, 1));

    const layers = [];
    if (photoAlpha > 0.001) {
      layers.push({
        input:
          photoAlpha >= 1
            ? photo
            : await sharp(photo).ensureAlpha(photoAlpha).png().toBuffer(),
      });
    }
    if (wireAlpha > 0.001) {
      layers.push({ input: Buffer.from(buildSvg(scene, t, wireAlpha)) });
    }

    const frame = await sharp({
      create: { width: W, height: H, channels: 4, background: white },
    })
      .composite(layers)
      .png({ compressionLevel: 6 })
      .toBuffer();

    await writeFile(`${dir}/frame${String(f).padStart(4, "0")}.png`, frame);
  }
  console.log(`${id}: ${FRAMES} frames${reg ? " (panel only)" : ""}`);
}

if (ONE_ID) {
  await renderProduct(ONE_ID, SCENES[ONE_ID], ONE_PHOTO, ONE_OUT);
  process.exit(0);
}

for (const [id, scene] of Object.entries(SCENES)) {
  const reg = REGIONS[id];
  if (reg) {
    // Only what we built belongs in the wireframe.
    const inside = ([x, y, w, h]) =>
      x + w / 2 > reg[0] &&
      x + w / 2 < reg[0] + reg[2] &&
      y + h / 2 > reg[1] &&
      y + h / 2 < reg[1] + reg[3];
    scene.region = reg;
    scene.boxes = scene.boxes.filter(inside);
  }
  await renderProduct(id, scene);
}
