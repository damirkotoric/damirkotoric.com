// Traces real UI geometry out of a frame.
//
// UI boxes are delimited by edges (hairline borders, shadows, fill changes),
// and text sits in horizontal runs of ink. So: find the strong vertical and
// horizontal lines, build rectangles from the pairs that have edge support on
// all four sides, then find text bars by ink projection inside them. The
// result lines up with the frame it was traced from, whatever the product was
// built in — web, native or otherwise.
//
// Usage: node trace.mjs <id>   (reads /tmp/bts/<id>.png)
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const ID = process.argv[2];
const W = 1280;
const H = 960;

const base = sharp(`/tmp/bts/${ID}.png`).resize(W, H, { fit: "fill" });
const { data: g } = await base.clone().greyscale().raw().toBuffer({
  resolveWithObject: true,
});
const at = (x, y) => g[y * W + x];

// --- edge maps -------------------------------------------------------------
// Dark or low-contrast UI (a player on near-black) needs a lower threshold
// than a white dashboard, so pick one that actually finds edges here.
const vEdge = new Uint8Array(W * H); // vertical edges (left/right sides)
const hEdge = new Uint8Array(W * H); // horizontal edges (top/bottom sides)
let EDGE = 11;
for (const t of [11, 7, 4]) {
  EDGE = t;
  vEdge.fill(0);
  hEdge.fill(0);
  let n = 0;
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (Math.abs(at(x + 1, y) - at(x - 1, y)) > EDGE) {
        vEdge[y * W + x] = 1;
        n++;
      }
      if (Math.abs(at(x, y + 1) - at(x, y - 1)) > EDGE) hEdge[y * W + x] = 1;
    }
  }
  if (n > W * H * 0.012) break; // enough structure to work with
}

// Columns and rows carrying long straight runs are candidate box sides.
function lines(map, along, across, isColumn) {
  const score = new Int32Array(along);
  for (let a = 0; a < along; a++) {
    let n = 0;
    for (let b = 0; b < across; b++) n += isColumn ? map[b * W + a] : map[a * W + b];
    score[a] = n;
  }
  const order = [...score.keys()].sort((p, q) => score[q] - score[p]);
  // Soft-edged UI yields shorter runs, so relax until there is enough to
  // build rectangles from rather than returning almost nothing.
  for (const frac of [0.12, 0.07, 0.04]) {
    const min = Math.floor(across * frac);
    const picked = [];
    const taken = new Uint8Array(along);
    for (const a of order) {
      if (score[a] < min) break;
      let near = false;
      for (let d = -6; d <= 6; d++) if (taken[a + d]) near = true;
      if (near) continue;
      taken[a] = 1;
      picked.push(a);
      if (picked.length > 46) break;
    }
    if (picked.length >= 14 || frac === 0.04) return picked.sort((p, q) => p - q);
  }
  return [];
}

const vs = lines(vEdge, W, H, true);
const hs = lines(hEdge, H, W, false);

// How much of a side is actually drawn.
function support(map, fixed, from, to, isColumn) {
  if (to - from < 12) return 0;
  let n = 0;
  for (let b = from; b <= to; b++) {
    let hit = 0;
    for (let d = -2; d <= 2; d++) {
      const i = isColumn ? b * W + (fixed + d) : (fixed + d) * W + b;
      if (i >= 0 && i < W * H && map[i]) hit = 1;
    }
    n += hit;
  }
  return n / (to - from + 1);
}

// --- rectangles ------------------------------------------------------------
let MIN_SIDE = 0.62;
let rects = [];
for (const thresh of [0.62, 0.45, 0.32]) {
  MIN_SIDE = thresh;
  rects = collectRects(MIN_SIDE);
  if (rects.length >= 3) break;
}

function collectRects(MIN_SIDE) {
const rects = [];
for (let i = 0; i < vs.length; i++) {
  for (let j = i + 1; j < vs.length; j++) {
    const x0 = vs[i], x1 = vs[j];
    const w = x1 - x0;
    if (w < 70 || w > W * 0.97) continue;
    for (let k = 0; k < hs.length; k++) {
      for (let l = k + 1; l < hs.length; l++) {
        const y0 = hs[k], y1 = hs[l];
        const h = y1 - y0;
        if (h < 46 || h > H * 0.97) continue;
        if (w * h < 14000) continue;

        const top = support(hEdge, y0, x0, x1, false);
        const bot = support(hEdge, y1, x0, x1, false);
        const lef = support(vEdge, x0, y0, y1, true);
        const rig = support(vEdge, x1, y0, y1, true);
        const sides = [top, bot, lef, rig];
        if (Math.min(...sides) < MIN_SIDE) continue;
        const score = (top + bot + lef + rig) / 4;
        rects.push({ x: x0, y: y0, w, h, score, area: w * h });
      }
    }
  }
}
return rects;
}

// Prefer well-drawn, larger boxes; drop ones that mostly repeat another.
rects.sort((a, b) => b.score * Math.sqrt(b.area) - a.score * Math.sqrt(a.area));
const cards = [];
for (const r of rects) {
  const overlapping = cards.some((c) => {
    const ox = Math.max(0, Math.min(c.x + c.w, r.x + r.w) - Math.max(c.x, r.x));
    const oy = Math.max(0, Math.min(c.y + c.h, r.y + r.h) - Math.max(c.y, r.y));
    const inter = ox * oy;
    return inter > 0.62 * Math.min(c.area, r.area);
  });
  if (!overlapping) cards.push(r);
  if (cards.length >= 9) break;
}

// --- detail: busy regions are imagery, flat ones are chrome ---------------
function detail(x, y, w, h) {
  let s = 0, s2 = 0, n = 0;
  const step = Math.max(1, Math.floor(Math.min(w, h) / 22));
  for (let yy = y + 2; yy < y + h - 2; yy += step)
    for (let xx = x + 2; xx < x + w - 2; xx += step) {
      const v = at(xx, yy);
      s += v; s2 += v * v; n++;
    }
  return n ? Math.sqrt(Math.max(0, s2 / n - (s / n) ** 2)) : 0;
}

// --- text bars: runs of ink, measured where the ink actually is -----------
function textBars(x0, y0, x1, y1) {
  // Background is whatever most of the region is, not whatever the corner
  // happens to be — corners are often rounded or sit on a border.
  const hist = new Int32Array(256);
  for (let y = y0; y < y1; y += 2)
    for (let x = x0; x < x1; x += 2) hist[at(x, y)]++;
  let bg = 0;
  for (let v = 1; v < 256; v++) if (hist[v] > hist[bg]) bg = v;

  const INK = 38;
  // A column inked on nearly every row is furniture — a sidebar, a rule, a
  // panel edge. Counting it would merge every text run into one block.
  const rows = y1 - y0;
  const colHits = new Int32Array(x1 - x0);
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++)
      if (Math.abs(at(x, y) - bg) > INK) colHits[x - x0]++;
  const furniture = new Uint8Array(x1 - x0);
  for (let i = 0; i < colHits.length; i++)
    if (colHits[i] > rows * 0.7) furniture[i] = 1;

  const ink = new Int32Array(rows);
  for (let y = y0; y < y1; y++) {
    let n = 0;
    for (let x = x0; x < x1; x++)
      if (!furniture[x - x0] && Math.abs(at(x, y) - bg) > INK) n++;
    ink[y - y0] = n;
  }
  const minInk = Math.max(4, Math.floor((x1 - x0) * 0.018));
  const bars = [];
  let start = -1;
  for (let i = 0; i < ink.length; i++) {
    const on = ink[i] >= minInk;
    if (on && start < 0) start = i;
    if ((!on || i === ink.length - 1) && start >= 0) {
      const h = i - start;
      if (h >= 7 && h <= 64) {
        let lo = x1, hi = x0;
        for (let y = y0 + start; y < y0 + i; y++)
          for (let x = x0; x < x1; x++)
            if (!furniture[x - x0] && Math.abs(at(x, y) - bg) > INK) {
              if (x < lo) lo = x;
              if (x > hi) hi = x;
            }
        if (hi - lo > 34) bars.push({ x: lo, y: y0 + start, w: hi - lo, h });
      }
      start = -1;
    }
  }
  return bars;
}

// --- assemble --------------------------------------------------------------
const boxes = [];
for (const c of cards) {
  const d = detail(c.x, c.y, c.w, c.h);
  boxes.push({ ...c, kind: d > 36 ? "m" : "f" });
}

// Text inside the two or three biggest flat cards, plus the page itself.
const hosts = [
  ...boxes.filter((b) => b.kind === "f").slice(0, 4),
  { x: 0, y: 0, w: W, h: H },
];
const bars = [];
for (const hbox of hosts) {
  for (const t of textBars(
    hbox.x + 6,
    hbox.y + 6,
    Math.min(W, hbox.x + hbox.w - 6),
    Math.min(H, hbox.y + hbox.h - 6)
  )) {
    const dup = bars.some(
      (b) => Math.abs(b.y - t.y) < 10 && Math.abs(b.x - t.x) < 30
    );
    const insideMedia = boxes.some(
      (b) =>
        b.kind === "m" &&
        t.x > b.x - 4 && t.y > b.y - 4 &&
        t.x + t.w < b.x + b.w + 4 && t.y + t.h < b.y + b.h + 4
    );
    if (!dup && !insideMedia) bars.push(t);
  }
}
bars.sort((a, b) => b.w * b.h - a.w * a.h);

const final = [
  ...boxes.map((b) => [b.x, b.y, b.w, b.h, 12, b.kind]),
  ...bars.slice(0, 13).map((b) => [b.x, b.y, b.w, b.h, 3, "t"]),
];

// The container is the biggest flat card that is not the whole frame.
const flat = boxes.filter((b) => b.kind === "f");
const c0 =
  flat.sort((a, b) => b.area - a.area)[0] ||
  boxes[0] || { x: 40, y: 40, w: W - 80, h: H - 80 };

await writeFile(
  `/tmp/bts/${ID}.scene.json`,
  JSON.stringify(
    { id: ID, container: [c0.x, c0.y, c0.w, c0.h, 14], boxes: final },
    null,
    2
  )
);
console.log(
  `${ID}: ${boxes.length} cards + ${Math.min(13, bars.length)} text bars  (v${vs.length}/h${hs.length} lines)`
);
