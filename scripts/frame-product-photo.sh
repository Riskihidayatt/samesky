#!/usr/bin/env bash
# Turn a side-by-side mockup (front on the left, back on the right) into two product photos
# framed exactly like the rest of the catalogue:
#   - finds the garment and scales it into the same 520x610 box
#   - centres it on a 600x750 (4:5) canvas
#   - colour-corrects so the backdrop is the shared card grey #E7E5E1 (Tailwind `bg-photo`)
#   - feathers the crop edge so no box is visible
#
# Usage: scripts/frame-product-photo.sh <mockup-image> <front-name> <back-name>
#   e.g. scripts/frame-product-photo.sh ~/Downloads/polo.webp everyday-polo-front everyday-polo-back
# Output: public/images/products/<name>.webp   Requires ImageMagick 6+ (`convert`).
set -euo pipefail

[[ $# -eq 3 ]] || { sed -n '2,12p' "$0"; exit 1; }
SRC=$1
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images/products"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

BOX_W=520; BOX_H=610; MARGIN=60
read -r IMG_W IMG_H < <(convert "$SRC" -format '%w %h\n' info:)
HALF=$((IMG_W / 2))

frame() { # x-offset output-name
  local off=$1 name=$2 h=$TMP/h.png c=$TMP/c.png g=$TMP/g.png
  convert "$SRC" -crop ${HALF}x${IMG_H}+$off+0 +repage "$h"

  # Backdrop colour sampled from a strip at the top centre, used only to find the garment.
  local r gg b
  read -r r gg b < <(convert "$h" -crop 40x20+$((HALF / 2 - 20))+4 +repage -resize 1x1! -format '%[fx:int(255*r)] %[fx:int(255*g)] %[fx:int(255*b)]\n' info:)
  local w hh x y
  read -r w hh x y < <(convert "$h" -bordercolor "rgb($r,$gg,$b)" -border 2 -fuzz 9% -trim -format '%w %h %X %Y\n' info:)
  x=$(( ${x#+} - 2 - MARGIN )); y=$(( ${y#+} - 2 - MARGIN ))
  (( x < 0 )) && x=0; (( y < 0 )) && y=0
  convert "$h" -crop $((w + 2 * MARGIN))x$((hh + 2 * MARGIN))+$x+$y +repage "$c"

  # Colour-correct with the mean of the crop's own border so its edge lands on #E7E5E1.
  local sr=0 sg=0 sb=0 side dims tr tg tb
  for side in north south east west; do
    dims=0x8+0+0; [[ $side == east || $side == west ]] && dims=8x0+0+0
    read -r tr tg tb < <(convert "$c" -gravity $side -crop $dims +repage -resize 1x1! -format '%[fx:255*r] %[fx:255*g] %[fx:255*b]\n' info:)
    sr=$(awk -v a="$sr" -v b="$tr" 'BEGIN{print a+b}'); sg=$(awk -v a="$sg" -v b="$tg" 'BEGIN{print a+b}'); sb=$(awk -v a="$sb" -v b="$tb" 'BEGIN{print a+b}')
  done
  local matrix
  matrix=$(awk -v r="$sr" -v g="$sg" -v b="$sb" 'BEGIN{printf "%.4f 0 0 0 %.4f 0 0 0 %.4f", 231*4/r, 229*4/g, 225*4/b}')

  convert "$c" -resize ${BOX_W}x${BOX_H} -color-matrix "$matrix" \
    -alpha set -virtual-pixel transparent -channel A -blur 0x22 -level 50%,100% +channel "$g"
  convert -size 600x750 xc:"rgb(231,229,225)" "$g" -gravity center -composite -quality 82 "$OUT_DIR/$name.webp"
  echo "wrote public/images/products/$name.webp"
}

frame 0 "$2"
frame "$HALF" "$3"
