#!/usr/bin/env bash
# Mirror remote venue images locally into public/images/.
# Run once to seed; idempotent — skips files that already exist.
# Wikimedia requires a real-ish User-Agent or returns 403.

set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
out="public/images"
mkdir -p "$out"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"

# Format: filename<TAB>url
pairs=$(cat <<'EOF'
glasgow-airport-terminal.jpg	https://upload.wikimedia.org/wikipedia/commons/1/14/Glasgow_Airport_-_terminal_building_-_geograph.org.uk_-_2922025.jpg
goma-glasgow.jpg	https://upload.wikimedia.org/wikipedia/commons/a/a4/Gallery_of_Modern_Art%2C_Glasgow%2C_front_view%2C_2018-06-27.jpg
king-tuts.jpg	https://upload.wikimedia.org/wikipedia/commons/a/ac/King_Tut%27s_Wah_Wah_Hut_1.jpg
kelvingrove.jpg	https://upload.wikimedia.org/wikipedia/commons/8/89/Kelvingrove_Art_Gallery_and_Museum_1.jpg
glasgow-university.jpg	https://upload.wikimedia.org/wikipedia/commons/d/d9/University_of_Glasgow_Main_Building_-_rear_aspect.jpg
ashton-lane.jpg	https://upload.wikimedia.org/wikipedia/commons/d/db/Ashton_Lane_%28geograph_7708250%29.jpg
ben-nevis-bar.jpg	https://upload.wikimedia.org/wikipedia/commons/3/3a/The_Ben_Nevis_bar_%28geograph_6000023%29.jpg
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
mono-monorail.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/f7/cf/6b/mono-restaurant.jpg
cottonrake-bakery.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f4/a4/7e/dark-chocolate-and-raspberry.jpg
university-cafe.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/83/f5/df/caption.jpg
mesa-dennistoun.jpg	https://dennistoun.co.uk/uploads/576_mesa_m.jpg
cashel-coffee.jpg	https://img02.restaurantguru.com/c174-Restaurant-Cashel-Coffee-and-Dry-Goods-food.jpg
gizzis.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/bd/2a/c4/photo0jpg.jpg
ranjits.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/4a/21/36/the-thali-is-a-great.jpg
philadelphia-chippy.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/d8/a0/31/front-of-shop.jpg
tantrum-doughnuts.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/56/f4/98/tantrum-doughnuts.jpg
boca-strathbungo.jpg	https://shupxpgnxvmicfkbcsru.supabase.co/storage/v1/object/public/venue-photos/48b67f72-3b58-4877-b2ac-0bc2a2edb824/1.jpg
errols-pizza.jpg	https://www.foodieexplorers.co.uk/wp-content/uploads/2019/04/A4E0C4CB-2EF1-418D-913C-E84EEE66AFFE.jpeg
bar-vini.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/62/03/30/bar-vini.jpg
celinos.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/df/c1/0e/img-20190122-232852-142.jpg
kimchi-cult.jpg	https://www.foodieexplorers.co.uk/wp-content/uploads/2016/04/Kimchi_cult_bibimbap-1.jpg
sylvan.jpg	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/46/34/ce/caption.jpg
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
  if curl -sS --fail --max-time 30 -L \
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
  echo "Failed downloads:"
  printf '  %s\n' "${failed[@]}"
  exit 1
fi

echo ""
echo "All done. $(ls -1 "$out" | wc -l | tr -d ' ') files in $out"
