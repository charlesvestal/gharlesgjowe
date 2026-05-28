#!/usr/bin/env bash
# Mirror the venue-owned images (Squarespace/Wix/self-hosted) for full
# local-host consistency. These were originally left as hot-links but
# folding them into public/images/ keeps everything one-stop.

set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
out="public/images"
mkdir -p "$out"

UA="GlasgowWeekend/1.0 (https://github.com/charlesvestal/gharlesgjowe; personal travel reference site)"

pairs=$(cat <<'EOF'
paesano.jpg	https://images.squarespace-cdn.com/content/v1/66f276e6a3e81068b13d74f9/6f081b26-f9b8-4d09-a924-9fd82f5f99ff/MILLER+ST+2.jpg
pot-still.jpg	https://thepotstill.co.uk/wp-content/uploads/2024/08/PotStill-OM-1-2-copy-1440px.jpg
mother-india.jpg	https://www.motherindia.co.uk/wp-content/uploads/2021/03/MotherIndia_restaurant1.jpg
ox-and-finch.jpg	https://www.oxandfinch.com/wp-content/uploads/2025/03/0O1A2365.jpg
sub-club.png	https://subclub.co.uk/images/SUBCLUB_REOPENING_DIGITAL_V10_NORMAL_WEB_SPLASH_IMAGE_MED.png
crabshakk.jpg	https://images.squarespace-cdn.com/content/v1/61f6af2eda35940165dc0042/1655217624126-WKXHXWEZQL8O52VB6ABI/crabshakk+finnieston+exterior+photo.jpg
corner-shop.jpg	https://images.squarespace-cdn.com/content/v1/680670ffb73d9b098169783b/43822534-dc09-4a8a-9a0d-5a6069952066/SpouseCornerShopFullSize57.jpg
brett.jpg	https://images.squarespace-cdn.com/content/v1/61d46209ed2d3d6235044f82/292bd6db-8331-4b76-b314-e3731c399c13/annim578.jpg
gaga.jpg	https://static.wixstatic.com/media/3c31ef_f6d7650646c64cbd89c42531d4702375~mv2.jpg
franks-pizza.png	https://www.frankspizza.uk/wp-content/uploads/2021/10/Franks1.png
EOF
)

failed=()
while IFS=$'\t' read -r filename url; do
  [[ -z "$filename" ]] && continue
  target="$out/$filename"
  if [[ -s "$target" ]]; then
    echo "skip  $filename"
    continue
  fi
  if curl -sS --fail --max-time 60 -L \
      -A "$UA" \
      -H "Accept: image/avif,image/webp,image/png,image/jpeg,*/*" \
      -o "$target" "$url"; then
    size=$(stat -f%z "$target" 2>/dev/null || stat -c%s "$target")
    echo "OK    $filename ($size bytes)"
  else
    echo "FAIL  $filename"
    rm -f "$target"
    failed+=("$filename")
  fi
done <<< "$pairs"

if (( ${#failed[@]} > 0 )); then
  echo ""
  echo "Failed:"
  printf '  %s\n' "${failed[@]}"
  exit 1
fi

echo ""
echo "Done. $(ls -1 "$out" | wc -l | tr -d ' ') files in $out"
