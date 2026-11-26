#!/usr/bin/env bash
# Builds the hero showreel: a "how it's made" build-up into live product
# footage, once per product.
#
# Geometry is measured, never eyeballed. Where a product ships on the web its
# wireframe comes from the real DOM (capture-product-screen.mjs); where it
# does not, it is recovered from the frame itself (trace-product-frame.mjs).
# Run scripts/verify-product-trace.mjs <id> to see the boxes drawn over the
# source and check the fit.
#
# Usage: ./scripts/build-hero-reel.sh
set -euo pipefail

cd "$(dirname "$0")/.."
PUBLIC="public"
OUT="$PUBLIC/videos"
BTS="/tmp/bts"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

W=1280
H=960
FPS=30
SCALE="scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},setsar=1"

# Products in reel order. "<id>|<live clip>|<start s>|<live s>"
CLIPS=(
  "beamy|images/portfolio/beamy/beamy.mp4|9|1.3"
  "donotstay|images/portfolio/donotstay/donotstay.mp4|16|1.3"
  "rankdat|images/portfolio/rankdat/rankdat.mp4|9|1.3"
  "stylespin|images/portfolio/stylespin/stylespin.mp4|5|1.3"
)

# Shipped on the web: geometry read straight out of the live DOM.
# "<id>|<url>|<settle ms>|<scroll px>"
WEB=(
  "beamy|https://getbeamy.app|5500|0"
  "rankdat|https://rankdat.io|5500|900"
  "stylespin|https://stylespin.vercel.app|5500|0"
)

mkdir -p "$OUT" "$BTS"

# 1. Capture the web products and measure their real element boxes.
for entry in "${WEB[@]}"; do
  IFS='|' read -r id url settle scroll <<< "$entry"
  node scripts/capture-product-screen.mjs "$id" "$url" "$settle" "$scroll"
done

# 2. DoNotStay runs as a browser extension over someone else's page, so there
#    is no DOM of ours to read — recover its boxes from the frame instead.
ffmpeg -loglevel error -y -ss 16 -i "$PUBLIC/images/portfolio/donotstay/donotstay.mp4" \
  -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}" \
  -frames:v 1 "$BTS/donotstay.png"
node scripts/trace-product-frame.mjs donotstay

# 3. Render the wireframe build-up frames.
node scripts/build-bts-frames.mjs

# 4. Encode build-up + live footage for each product, back to back.
i=0
for clip in "${CLIPS[@]}"; do
  IFS='|' read -r id src start dur <<< "$clip"
  i=$((i + 1))

  ffmpeg -loglevel error -y -framerate "$FPS" -i "$BTS/$id/frame%04d.png" \
    -an -vf "setsar=1" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    "$TMP/bts$i.mp4"

  ffmpeg -loglevel error -y -ss "$start" -t "$dur" -i "$PUBLIC/$src" \
    -an -vf "$SCALE" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    "$TMP/live$i.mp4"

  printf "file '%s'\nfile '%s'\n" "$TMP/bts$i.mp4" "$TMP/live$i.mp4" >> "$TMP/list.txt"
done

ffmpeg -loglevel error -y -f concat -safe 0 -i "$TMP/list.txt" -c copy "$TMP/reel.mp4"

# H.264 — broadest support, used as the fallback source.
ffmpeg -loglevel error -y -i "$TMP/reel.mp4" \
  -an -c:v libx264 -preset veryslow -crf 31 -profile:v main -pix_fmt yuv420p \
  -movflags +faststart "$OUT/hero-reel.mp4"

# VP9 — smaller, served first to browsers that take it.
ffmpeg -loglevel error -y -i "$TMP/reel.mp4" \
  -an -c:v libvpx-vp9 -crf 42 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  "$OUT/hero-reel.webm"

# Poster — a finished screen, not the empty grid the reel opens on. It is
# what loads first and what reduced-motion visitors see.
ffmpeg -loglevel error -y -ss 1.55 -i "$TMP/reel.mp4" -frames:v 1 -q:v 2 "$TMP/poster.jpg"
node -e "
const sharp = require('sharp');
sharp(process.argv[1]).avif({ quality: 55 }).toFile(process.argv[2])
  .catch((e) => { console.error(e); process.exit(1); });
" "$TMP/poster.jpg" "$OUT/hero-reel-poster.avif"

ls -lh "$OUT"
