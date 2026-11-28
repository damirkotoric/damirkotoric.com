#!/usr/bin/env bash
# Builds the About section's loop: Damir teaching at General Assembly and
# running a design sprint at Envato, cut from the footage his old site used.
#
# Four short shots, cropped from 16:9 to the 4:3 panel they play in, silent.
#
# Usage: ./scripts/build-about-loop.sh [folder holding the source videos]
set -euo pipefail

SRC="${1:-$HOME/My Drive/Projects/Damir Kotoric/google cloud files backup}"
OUT="public/videos"
GA="$SRC/UXDi7_1080.mp4"
SPRINT="$SRC/layers-project-design-sprint.mp4"
export PATH="/opt/homebrew/bin:$PATH"

SHOT="scale=960:540:flags=lanczos,crop=720:540,fps=25,setsar=1"

# Teaching the class, a sticky note being written, walking the sprint wall,
# the team at the whiteboard.
ffmpeg -loglevel error -y \
  -ss 31.3 -t 3.2 -i "$GA" \
  -ss 104.2 -t 2.6 -i "$GA" \
  -ss 46.2 -t 3.0 -i "$SPRINT" \
  -ss 50.2 -t 2.8 -i "$SPRINT" \
  -filter_complex "[0:v]$SHOT[a];[1:v]$SHOT[b];[2:v]$SHOT[c];[3:v]$SHOT[d];[a][b][c][d]concat=n=4:v=1" \
  -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart \
  "$OUT/about-loop.mp4"

ffmpeg -loglevel error -y -i "$OUT/about-loop.mp4" -frames:v 1 -q:v 4 "$OUT/about-loop-poster.jpg"

ls -lh "$OUT"/about-loop*
