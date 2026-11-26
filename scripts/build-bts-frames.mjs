// Generates "how it's made" build-up frames for the hero showreel.
//
// Each product's wireframe geometry is measured from the shipped screen, so
// the build-up resolves into the real thing rather than an approximation of
// it. Output: /tmp/bts/<id>/frame####.png, consumed by build-hero-reel.sh.
//
// Usage: node scripts/build-bts-frames.mjs
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const W = 1280;
const H = 960;
const FPS = 30;
const DUR = 1.6; // seconds of build-up per product
const FRAMES = Math.round(FPS * DUR);

const INK = "#11161C";
const LINE = "#5A6470";
const FILL = "#E4E8EB";
const GRID = "#CBD2D9";
const ACCENT = "#FFDD33";

// kind: f = outline, b = filled block, t = text bar, m = media plate
// Scenes come from the capture/trace step, never from eyeballing a frame:
// capture-product-screen.mjs reads real element rects out of a shipped web
// product's DOM, trace-product-frame.mjs recovers them from a video frame
// where there is no DOM to read. Both write /tmp/bts/<id>.scene.json next to
// the <id>.png the build-up resolves into.
const IDS = ["beamy", "donotstay", "rankdat", "stylespin"];
const SCENES = {};
for (const id of IDS) {
  const scene = JSON.parse(
    await readFile(`/tmp/bts/${id}.scene.json`, "utf8")
  );
  SCENES[id] = { container: scene.container, boxes: scene.boxes };
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 3);
const range = (t, a, b) => clamp01((t - a) / (b - a));

function gridLayer(a) {
  if (a <= 0) return "";
  const step = 40;
  let d = "";
  for (let x = step; x < W; x += step) d += `M${x} 0V${H}`;
  for (let y = step; y < H; y += step) d += `M0 ${y}H${W}`;
  return `<path d="${d}" stroke="${GRID}" stroke-width="1" opacity="${a.toFixed(3)}"/>`;
}

function boxLayer(boxes, t) {
  // Boxes draw in on a stagger, then fill.
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
      const fill =
        kind === "f" ? "none" : kind === "m" ? "#E2E5E8" : kind === "b" ? INK : FILL;
      const fillOpacity = kind === "f" ? 0 : fillP * (kind === "b" ? 0.85 : 1);
      const inner =
        kind === "m" && fillP > 0.3
          ? `<path d="M${cx - sw / 2} ${cy - sh / 2}l${sw} ${sh}M${cx + sw / 2} ${cy - sh / 2}l${-sw} ${sh}" stroke="${LINE}" stroke-width="1.5" opacity="${(fillP * 0.5).toFixed(3)}"/>`
          : "";
      return (
        `<rect x="${(cx - sw / 2).toFixed(1)}" y="${(cy - sh / 2).toFixed(1)}" ` +
        `width="${sw.toFixed(1)}" height="${sh.toFixed(1)}" rx="${r}" ` +
        `fill="${fill}" fill-opacity="${fillOpacity.toFixed(3)}" ` +
        `stroke="${LINE}" stroke-width="2.4" stroke-opacity="${p.toFixed(3)}"/>` +
        inner
      );
    })
    .join("");
}

function guideLayer(container, t) {
  const a = easeOut(range(t, 0.36, 0.56));
  if (a <= 0) return "";
  const [x, y, w, h, r] = container;
  const dash = `stroke="${INK}" stroke-width="1.25" stroke-dasharray="7 6" opacity="${(a * 0.7).toFixed(3)}"`;
  const ticks = [
    [x, y],
    [x + w, y],
    [x, y + h],
    [x + w, y + h],
  ]
    .map(
      ([px, py]) =>
        `<circle cx="${px}" cy="${py}" r="${(4 * a).toFixed(1)}" fill="${ACCENT}" stroke="${INK}" stroke-width="1" opacity="${a.toFixed(3)}"/>`
    )
    .join("");
  const radius = r
    ? `<circle cx="${x + r}" cy="${y + r}" r="${r}" fill="none" stroke="${ACCENT}" stroke-width="2" opacity="${(a * 0.9).toFixed(3)}"/>`
    : "";
  return (
    `<path d="M${x} 0V${H}M${x + w} 0V${H}M0 ${y}H${W}M0 ${y + h}H${W}" ${dash}/>` +
    radius +
    ticks
  );
}

// The container outline is present from the first frame so the panel never
// reads as blank white at the start of a build-up.
function containerLayer([x, y, w, h, r]) {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ` +
    `fill="none" stroke="${LINE}" stroke-width="2.4" stroke-opacity="0.75"/>`
  );
}

function buildSvg(scene, t, layerAlpha) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<g opacity="${layerAlpha.toFixed(3)}">` +
    gridLayer(1) +
    containerLayer(scene.container) +
    boxLayer(scene.boxes, t) +
    guideLayer(scene.container, t) +
    `</g></svg>`
  );
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };

async function renderProduct(id, scene) {
  const dir = `/tmp/bts/${id}`;
  await mkdir(dir, { recursive: true });
  const photo = await sharp(`/tmp/bts/${id}.png`).resize(W, H).toBuffer();

  for (let f = 0; f < FRAMES; f++) {
    const t = f / (FRAMES - 1);
    // Wireframe holds, then hands over to the shipped screen.
    const photoAlpha = easeOut(range(t, 0.58, 0.84));
    const wireAlpha = 1 - easeOut(range(t, 0.7, 1));

    const layers = [];
    if (photoAlpha > 0.001) {
      layers.push({
        input: await sharp(photo).ensureAlpha(photoAlpha).png().toBuffer(),
      });
    }
    if (wireAlpha > 0.001) {
      layers.push({
        input: Buffer.from(buildSvg(scene, t, wireAlpha)),
      });
    }

    const frame = await sharp({
      create: { width: W, height: H, channels: 4, background: white },
    })
      .composite(layers)
      .png({ compressionLevel: 6 })
      .toBuffer();

    await writeFile(`${dir}/frame${String(f).padStart(4, "0")}.png`, frame);
  }
  console.log(`${id}: ${FRAMES} frames`);
}

for (const [id, scene] of Object.entries(SCENES)) {
  await renderProduct(id, scene);
}
