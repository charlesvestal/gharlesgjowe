#!/usr/bin/env bash
# Retry just the Wikimedia images, spaced to avoid rate-limit (429).
# Wikimedia prefers a UA with project + contact per their UA policy.

set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
out="public/images"

UA="GlasgowWeekend/1.0 (https://github.com/charlesvestal/gharlesgjowe; personal travel reference site)"

pairs=$(cat <<'EOF'
ashton-lane.jpg	https://upload.wikimedia.org/wikipedia/commons/d/db/Ashton_Lane_%28geograph_7708250%29.jpg
glasgow-cathedral.jpg	https://upload.wikimedia.org/wikipedia/commons/c/c7/Glasgow-cathedral-may-2007.jpg
glasgow-necropolis.jpg	https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Glasgow_Necropolis_-_aerial_-_2025-04-17_01.jpg/3840px-Glasgow_Necropolis_-_aerial_-_2025-04-17_01.jpg
saint-lukes.jpg	https://upload.wikimedia.org/wikipedia/commons/d/dc/Bain_Square%2C_Calton_New_Parish_Church.jpg
barras-market.jpg	https://upload.wikimedia.org/wikipedia/commons/0/0d/Barras_Market%2C_Glasgow.jpg
west-brewery-templeton.jpg	https://upload.wikimedia.org/wikipedia/commons/e/e2/Templeton_Business_Centre%2C_Glasgow_Green_%286059112448%29.jpg
queen-street-station.jpg	https://upload.wikimedia.org/wikipedia/commons/f/fa/2025_at_Glasgow_Queen_Street_station_-_exterior.JPG
stirling-castle.jpg	https://upload.wikimedia.org/wikipedia/commons/5/5c/Stirling_Castle_Aerial_Photo.jpg
portcullis-stirling.jpg	https://upload.wikimedia.org/wikipedia/commons/4/43/The_Portcullis_Hotel%2C_Stirling_-_geograph.org.uk_-_4236356.jpg
wallace-monument.jpg	https://upload.wikimedia.org/wikipedia/commons/2/27/The_Wallace_Monument%2C_Stirling.JPG
nice-n-sleazy.jpg	https://upload.wikimedia.org/wikipedia/commons/a/a6/Stephen_Lawrie_of_The_Telescopes_getting_ready_to_go_on_stage_at_Nice_N_Sleazy%2C_Glasgow._October_2023.jpg
the-clutha.jpg	https://upload.wikimedia.org/wikipedia/commons/0/03/The_Clutha_in_Glasgow_%2817833190138%29.jpg
laurieston-bar.jpg	https://upload.wikimedia.org/wikipedia/commons/e/e8/Glasgow_City_-_The_Laurieston_Bar%2C_58_Bridge_Street_And_2_And_4_Nelson_Street_-_20231202154311.jpg
glasgow-airport-departures.jpg	https://upload.wikimedia.org/wikipedia/commons/4/45/16-11-15-Glasgow_Airport-RR2_7002.jpg
EOF
)

failed=()
while IFS=$'\t' read -r filename url; do
  [[ -z "$filename" ]] && continue
  target="$out/$filename"
  if [[ -s "$target" ]]; then
    echo "skip  $filename (already exists)"
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
  sleep 2
done <<< "$pairs"

if (( ${#failed[@]} > 0 )); then
  echo ""
  echo "Still failing:"
  printf '  %s\n' "${failed[@]}"
  exit 1
fi

echo ""
echo "Done. $(ls -1 "$out" | wc -l | tr -d ' ') files in $out"
