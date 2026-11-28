#!/usr/bin/env bash
# Builds the live portrait loop for the hero from a generated clip.
#
# The source clip is a 10s image-to-video render of public/images/damir.avif
# with the same still as its first, middle and last keyframe, so it returns
# to where it began and loops without a seam. It comes on a flat backdrop;
# this script cuts the backdrop out so the portrait sits on the section's own
# background in light and dark themes alike.
#
# The cut-out does not key the backdrop colour. The photo's lit side has blown
# highlights on the temple and hair that are exactly the backdrop's colour, so
# any key eats into the face. The head moves less than 4px at 1080 across the
# whole loop, so the still's own alpha channel is the matte: pulled in a few
# pixels and feathered, it covers the motion and leaves no fringe on dark.
#
# Usage: ./scripts/build-portrait-loop.sh /path/to/source.mp4
set -euo pipefail

SRC="${1:?usage: build-portrait-loop.sh /path/to/source.mp4}"
cd "$(dirname "$0")/.."
OUT="public/videos"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
S=1080

mkdir -p "$OUT"

# The still's alpha, choked ~3px and feathered: blur, then stretch so the
# half-way point of the blur becomes fully transparent.
node -e "
const sharp = require('sharp');
(async () => {
  const a = await sharp('public/images/damir.avif').resize($S, $S).extractChannel('alpha').png().toBuffer();
  const soft = await sharp(a).blur(3).png().toBuffer();
  await sharp(soft).linear(2, -255).toFile('$TMP/matte.png');
})();
"

# Drop the final frame: it repeats the first, and a doubled frame at the loop
# point reads as a hitch.
FRAMES=$(($(ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 "$SRC") - 1))

MATTE="[0:v]scale=$S:$S,format=rgba[rgb];[1:v]format=gray[a];[rgb][a]alphamerge"

# VP9 with alpha — Chrome, Firefox, Edge.
ffmpeg -loglevel error -y -i "$SRC" -loop 1 -i "$TMP/matte.png" \
  -filter_complex "$MATTE,format=yuva420p[v]" -map "[v]" -frames:v "$FRAMES" -an \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  "$OUT/portrait-loop.webm"

# HEVC with alpha — Safari, which decodes alpha from nothing else.
ffmpeg -loglevel error -y -i "$SRC" -loop 1 -i "$TMP/matte.png" \
  -filter_complex "$MATTE,format=bgra[v]" -map "[v]" -frames:v "$FRAMES" -an \
  -c:v hevc_videotoolbox -alpha_quality 0.8 -q:v 52 -tag:v hvc1 \
  "$OUT/portrait-loop.mov"

ls -lh "$OUT"/portrait-loop.*
