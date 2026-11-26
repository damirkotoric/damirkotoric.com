#!/usr/bin/env bash
# Builds the hero showreel: a "how it's made" build-up into live product
# footage, four times over.
#
# Each entry in CLIPS is:
#   "<id>|<path relative to public/>|<start seconds>|<live seconds>"
#
# <id> must match a scene key in scripts/build-bts-frames.mjs — that file
# holds the wireframe geometry traced from the shipped screen. To add a
# product, add it in both places. To use real screen-recorded BTS footage
# instead, drop the clip in as its own CLIPS entry and give it no scene.
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

CLIPS=(
  "stylespin|images/portfolio/stylespin/stylespin.mp4|5|1.2"
  "donotstay|images/portfolio/donotstay/donotstay.mp4|16|1.2"
  "rankdat|images/portfolio/rankdat/rankdat.mp4|9|1.2"
  "nametag|images/portfolio/nametag/nametag.mp4|12|1.2"
)

mkdir -p "$OUT" "$BTS"

SCALE="scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},setsar=1"

# 1. Grab the exact frame each live segment opens on — the build-up resolves
#    into it, so the handover is seamless.
for clip in "${CLIPS[@]}"; do
  IFS='|' read -r id src start dur <<< "$clip"
  ffmpeg -loglevel error -y -ss "$start" -i "$PUBLIC/$src" \
    -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}" \
    -frames:v 1 "$BTS/$id.png"
done

# 2. Render the wireframe build-up frames.
node scripts/build-bts-frames.mjs

# 3. Encode build-up + live for each product, back to back.
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

# Poster — taken from the first finished screen, not the empty grid the reel
# opens on. It is what loads first and what reduced-motion visitors see.
ffmpeg -loglevel error -y -ss 2.7 -i "$TMP/reel.mp4" -frames:v 1 -q:v 2 "$TMP/poster.jpg"
node -e "
const sharp = require('sharp');
sharp(process.argv[1])
  .avif({ quality: 55 })
  .toFile(process.argv[2])
  .catch((e) => { console.error(e); process.exit(1); });
" "$TMP/poster.jpg" "$OUT/hero-reel-poster.avif"

ls -lh "$OUT"
