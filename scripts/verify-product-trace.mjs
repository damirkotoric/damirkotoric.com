// Draws traced boxes over the source frame so the fit can be checked.
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const ID = process.argv[2];
const s = JSON.parse(await readFile(`/tmp/bts/${ID}.scene.json`, "utf8"));
const C = { f: "#0066FF", m: "#00B341", t: "#FF2D55", b: "#FF9500" };

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960">` +
  `<rect x="${s.container[0]}" y="${s.container[1]}" width="${s.container[2]}" height="${s.container[3]}" fill="none" stroke="#FFDD33" stroke-width="5"/>` +
  s.boxes
    .map(
      ([x, y, w, h, r, k]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="${C[k]}" stroke-width="2.5"/>`
    )
    .join("") +
  `</svg>`;

await sharp(`/tmp/bts/${ID}.png`)
  .resize(1280, 960, { fit: "fill" })
  .composite([{ input: Buffer.from(svg) }])
  .jpeg({ quality: 82 })
  .toFile(`/tmp/bts/${ID}.verify.jpg`);
console.log(`${ID} ok`);
