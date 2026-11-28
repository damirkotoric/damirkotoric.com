#!/usr/bin/env bash
# Builds the About section's loop: Damir teaching at General Assembly and
# running a design sprint at Envato, cut from his old showreel and the hero
# video his old site used.
#
# Four short shots, cropped from 16:9 to the 4:3 panel they play in, silent.
#
# Usage: ./scripts/build-about-loop.sh [folder holding the hero-video project]
set -euo pipefail

SRC="${1:-$HOME/My Drive/Projects/Damir Kotoric/hero-video}"
OUT="public/videos"
MASTER="$SRC/hero-video-master.mp4"
SHOWREEL="$SRC/media/damir-showreel.mp4"
export PATH="/opt/homebrew/bin:$PATH"

SHOT="scale=-2:600:flags=lanczos,crop=800:600,fps=25,setsar=1"

# Teaching the class, the sprint wall, walking the team through it, and
# wireframes sketched by hand.
ffmpeg -loglevel error -y \
  -ss 12.2 -t 3.4 -i "$MASTER" \
  -ss 2.5 -t 2.5 -i "$SHOWREEL" \
  -ss 43.6 -t 3.0 -i "$SHOWREEL" \
  -ss 33.0 -t 2.5 -i "$SHOWREEL" \
  -filter_complex "[0:v]$SHOT[a];[1:v]$SHOT[b];[2:v]$SHOT[c];[3:v]$SHOT[d];[a][b][c][d]concat=n=4:v=1" \
  -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart \
  "$OUT/about-loop.mp4"

ffmpeg -loglevel error -y -i "$OUT/about-loop.mp4" -frames:v 1 -q:v 4 "$OUT/about-loop-poster.jpg"

ls -lh "$OUT"/about-loop*
