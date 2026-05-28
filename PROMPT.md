# Glasgow Weekend — Itinerary Site (Claude Code build spec)

Build a small, fast, **statically-hosted itinerary website** for a long weekend in Glasgow. It must be easy to **iterate on over time** (plans will keep changing) and deploy **free to GitHub Pages**.

This file is the single source of truth. Read it fully, scaffold the project, drop in the content from the **TRIP DATA** section, implement the design, and wire up deployment. Then tell me how to run it locally and push it live.

---

## 1. Who / what / when

- Two travellers: **Charles** and **Joe** (old college roommates; travel well together).
- **Trip:** Berlin → Glasgow, **Thu 2 Jul → Mon 6 Jul 2026** (4 nights).
- **Vibe:** dive bars, cool galleries, live music, nerdy museums, Rick-Steves-style walking, beer & whisky.
- **Centrepiece, already booked-worthy:** Southpaw + The Misprints + The Citrines at **King Tut's Wah Wah Hut, Thu 2 Jul, doors 19:30** — lands on arrival day. (Songkick: https://www.songkick.com/concerts/43222238-southpaw-at-king-tuts-wah-wah-hut)
- **Flights (KLM, via Amsterdam, carry-on only, non-refundable Light fare):**
  - Out: Thu 2 Jul — BER 09:05 → AMS → **GLA 12:55**
  - Back: Mon 6 Jul — **GLA 17:00** → AMS → BER 22:10

---

## 2. Tech stack & hosting (non-negotiables)

- **Astro** (latest), TypeScript, **static output** (`output: 'static'`). No SSR, no server runtime — must work as flat files on GitHub Pages.
- Minimal client JS. Astro components for structure; vanilla JS only where needed (checklist toggle).
- **Content lives in ONE typed data file** (`src/data/trip.ts`) so editing the trip = editing data, not markup. This is the most important architectural requirement — keep all itinerary content out of the components.
- **Accessibility is a first-class requirement** (Charles cares): semantic landmarks, proper heading order, visible focus states, sufficient contrast, `prefers-reduced-motion` honoured, all interactive elements keyboard-operable, `alt`/`aria` where relevant.
- **Deploy target: GitHub Pages via GitHub Actions** (workflow below). Project page served at `/<repo>/`, so set `site` and `base` in `astro.config.mjs` — leave a clear `// TODO: set to your repo name` comment.
- Note in the README that **Cloudflare Pages / Netlify** are drop-in free alternatives that serve at root (no `base` needed) if Pages base-path is annoying.

### Suggested structure
```
src/
  data/trip.ts          # ALL content (typed) — see TRIP DATA
  components/
    Hero.astro
    DayCard.astro
    StopRow.astro
    WeatherStrip.astro
    Checklist.astro
    Footer.astro
  layouts/Base.astro
  pages/index.astro
  styles/tokens.css
public/                  # fonts if self-hosting, favicon, og image
.github/workflows/deploy.yml
astro.config.mjs
README.md
```

### GitHub Pages workflow (`.github/workflows/deploy.yml`)
Use the official Astro + Pages action. Enable **Settings → Pages → Source: GitHub Actions** after first push.
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 3. Design direction — GIG-POSTER / SCREENPRINT BOLD

Think Glasgow gig flyer / DIY risograph poster stapled to a King Tut's wall. Loud, printed, tactile. **Not** a clean SaaS template.

- **Palette (CSS variables):**
  - `--ink: #121110` (near-black background)
  - `--bone: #f3e9d8` (cream/paper text)
  - `--riso-red: #ff3a20` (hot screenprint accent)
  - `--acid: #ffd400` (acid yellow second ink)
  - Use two-ink logic: cream on ink, with red + yellow as punchy accents (misregistered/overprint feel encouraged).
- **Type (distinctive — avoid Inter/Roboto/Arial):**
  - Display / headlines / venue names: **Anton** (huge, condensed, uppercase).
  - Meta / times / labels / ticket-stub text: **Space Mono**.
  - Body copy: a clean characterful grotesque — **Archivo** (or Barlow Condensed for sub-labels). Pick one and be consistent.
  - Load via Google Fonts or self-host in `/public/fonts`.
- **Texture & detail:** subtle SVG grain/noise overlay; halftone dot patterns; **ticket-stub cards with perforated (dashed/punched) edges**; rotated rubber-stamp elements ("SOLD OUT-style" stamps, day numbers as big stamped figures); heavy rules and borders; slight rotations for a pasted-up feel.
- **Motion (CSS-first, respect reduced-motion):** one well-orchestrated staggered load reveal; hover lift/tilt on cards; maybe a marquee strip in the header. Nothing janky.
- **Mobile-first** — this is a phone-in-pocket reference. Single column on mobile, comfortable tap targets, sticky day-nav optional.

---

## 4. Features

1. **Hero:** "GLASGOW", "CHARLES × JOE", "02–06 JUL 2026", flight bookends (BER 09:05 → GLA 12:55 / GLA 17:00 → BER 22:10), one-line tagline. Poster treatment.
2. **Trip checklist** (interactive; persist with `localStorage` — fine here, this is a real site not a sandboxed artifact). Items in TRIP DATA.
3. **Five day sections** (Thu–Mon). Each: date + day code/theme, a **weather strip** (seasonal July note — see data; make clear it's seasonal, not a forecast, with a "check nearer the time" line), then **stops**.
4. **Each stop** renders: `time` · `title` · `blurb` · `transport` (if present) · `booking` link (if present) · `maps` link (every stop with a venue) · `pairing` (drink) · `swap` callout (if present). Use the `kind` field to vary the visual treatment (gig/drink/food/sight/transport/note).
5. **Footer:** practical info block (airport transfer, subway, EU261 delay rights, Light-fare = carry-on/non-refundable, ~22:00 daylight, pack a rain shell).
6. **"How to edit" note** in README: to change the trip, edit `src/data/trip.ts`; design tokens live in `styles/tokens.css`.

---

## 5. TRIP DATA

Implement this as `src/data/trip.ts`. Types first, then the populated `trip` object. Fill maps links as `https://www.google.com/maps/search/?api=1&query=<URL-encoded "Name Glasgow">`.

```ts
export interface Stop {
  time?: string;
  title: string;
  kind: 'transport' | 'food' | 'sight' | 'drink' | 'gig' | 'note';
  blurb: string;
  transport?: string;
  booking?: { label: string; url: string };
  maps?: string;
  pairing?: string;   // beer / whisky / cocktail
  swap?: string;      // alternative option
}
export interface Day {
  date: string;       // "Thu 2 Jul"
  code: string;       // poster title
  theme: string;
  weather: string;    // seasonal July note
  stops: Stop[];
}
```

Seasonal weather note to reuse/vary per day (make the "not a forecast" caveat visible once):
> Glasgow in early July: highs ~18–19°C, lows ~11°C, genuinely changeable — sun and showers in one afternoon. Daylight until ~22:00. Pack a light waterproof shell. (Seasonal averages, not a forecast — check before you fly.)

### THURSDAY 2 JUL — "TOUCHDOWN & TUT'S"
- 12:55 · **Land at Glasgow Airport (GLA)** · transport · "Carry-on only = walk straight out." · transport: "500 Airport Express bus → Buchanan St, ~£9 return, every 10 min, 15–25 min. Or cab ~£20, ~15 min."
- ~14:00 · **Drop bags at hotel** · note · "Check-in won't be ready — just stash and go."
- 14:30 · **Paesano Pizza** · food · "Wood-fired, fast, cheap — the no-faff landing lunch. Miller St, Merchant City." · maps · pairing: "Birra Moretti, or a Negroni sbagliato to mark the start."
- 15:30 · **Gallery of Modern Art (GoMA)** · sight · "Free. The traffic-coned Duke of Wellington statue out front = peak Glasgow. Royal Exchange Sq." · maps · pairing: "Espresso in the basement café — fuel before the beer."
- 16:15 · **Monorail Music** · sight · "First record dig of the trip, inside Mono on King St. Strong Scottish/leftfield selection." · maps · pairing: "A pint next door at Mono (vegan bar) — try a Gamma Ray."
- 17:30 · **The Pot Still** · drink · "Proper first pint. Whisky temple on Hope St, hundreds of drams, zero pretension. 4 min from King Tut's." · maps · pairing: "A Lowland single malt + a Tempest four-grain stout."
- 18:45 · **Horseshoe Bar** *(optional second)* · drink · "One of the UK's longest bars. Cheap and classic, on Drury St." · maps · pairing: "A pint of Tennent's — the Glasgow rite of passage."
- 19:30 · **DOORS: Southpaw + The Misprints + The Citrines** · gig · "King Tut's Wah Wah Hut, St Vincent St. ~300 cap; Southpaw's first Glasgow show in 14 years. Headline likely ~21:30–22:00, so no need to be glued to the door." · booking: {label:"Tickets (King Tut's)", url:"https://www.kingtuts.co.uk/whats-on"} · maps · pairing: "Drygate Gladeye IPA, or a can of Tennent's."

### FRIDAY 3 JUL — "WEST END WANDER"
- ~10:30 · **Breakfast, West End** · food · "Easy start — Singl-end or a Byres Rd café." 
- 11:00 · **Kelvingrove Art Gallery & Museum** · sight · "Free and superb — Dalí's Christ of St John of the Cross, a real Spitfire. Free organ recital at 1pm. (Fri opens 11:00.)" · transport: "Subway to Kelvinhall/Hillhead, or 15-min cab from centre." · maps
- 13:00 · **University of Glasgow + Hunterian** · sight · "Walk the Gilbert Scott cloisters (proper Hogwarts). Free Hunterian Museum is the nerdy highlight." · maps
- 15:00 · **Ashton Lane** · drink · "Cobbled lane strung with fairy lights — afternoon pint and a wander." · maps · pairing: "Innis & Gunn oak-aged."
- 18:30 · **Mother India** · food · "Glasgow is a UK curry capital and this is the institution. Finnieston. BOOK AHEAD." · booking: {label:"Book a table", url:"https://www.motherindia.co.uk/"} · maps · pairing: "Cobra, or a whisky sour."
- 20:30 · **Finnieston strip drinks** · drink · "The Ben Nevis (whisky & trad folk) or BrewDog along Argyle St." · maps · pairing: "Williams Bros Joker IPA."
- 21:30 · **Night, your call** · note · "Check King Tut's / SWG3 / Òran Mór listings, or head back to the centre for dive bars." · swap: "Knackered? Just settle into the Finnieston strip."

### SATURDAY 4 JUL — "EAST END & THE BARRAS"
- 10:00 · **Glasgow Cathedral** · sight · "800-year-old Gothic, free. The atmospheric lower church is the bit people miss. Castle St." · transport: "~20-min walk east of centre, or short cab." · maps
- 11:00 · **Glasgow Necropolis** · sight · "Victorian hilltop cemetery — 3,500 monuments, big city views, filming spot for The Batman. Pure Rick Steves." · maps
- 13:00 · **The Barras Market** · sight · "Weekends only (10–4). Ramshackle flea market — vinyl, vintage, junk, characters, street food. Gallowgate." · maps · pairing: "WEST St Mungo lager."
- 15:00 · **WEST Brewery, Glasgow Green** *(optional)* · drink · "German-style brewery in the old Templeton carpet factory, 5 min from the Barras." · maps · pairing: "St Mungo, or the Munich Red."
- 18:00 · **Dinner** · food · "Ox and Finch (Finnieston small plates — book) or stick east." · booking: {label:"Ox and Finch", url:"https://oxandfinch.com/"}
- 20:00 · **Big night** · gig · "Barrowland Ballroom if a gig's on (sprung floor, starry ceiling, legendary). Else Sub Club (Subculture techno) or a dive crawl." · booking: {label:"Barrowland listings", url:"https://barrowland.co.uk/"} · maps · pairing: "Tennent's in a plastic pint — part of the Barras experience." · swap: "No Barrowland gig that night → Sub Club, Stereo, or Nice N Sleazy."

### SUNDAY 5 JUL — "RIVERSIDE & ARTHOUSE"
- 11:00 · **Riverside Museum** · sight · "Zaha Hadid building stuffed with trains, trams, cars (a DeLorean), with the Tall Ship Glenlee moored outside. Free." · transport: "Cab/bus ~15 min, or walk the Clyde from Finnieston." · maps · swap: "Glorious weather? Swap for Loch Lomond — Balloch is ~45 min by train from Queen St. Or the Burrell Collection in Pollok Park (world-class, recently refurbished)."
- 16:30 · **Glasgow Film Theatre (GFT)** · sight · "Beautiful independent cinema, Rose St — arthouse & rep. Grab an afternoon/early screening." · booking: {label:"What's on", url:"https://www.glasgowfilm.org/"} · maps · pairing: "A glass of something at the GFT café-bar."
- 20:00 · **Live option: The Dirty Nil @ King Tut's** · gig · "Canadian punk-rock, loud and fun — and it's on this very night." · booking: {label:"Tickets", url:"https://www.songkick.com/concerts/42872666-dirty-nil-at-king-tuts-wah-wah-hut"} · swap: "Or skip the gig for Nice N Sleazy below."
- 20:00 · **Nice N Sleazy** *(alt)* · drink · "Grungy Sauchiehall St institution — cheap drinks, basement gigs, jukebox. The dive bar of the trip." · maps · pairing: "Cheap house lager, or a boilermaker."
- 22:00 · **The Clutha** · drink · "Riverside pub steeped in history, live music most nights, cheap pizza. A fitting last-night pint. Bridgegate." · maps · pairing: "A pint of Guinness + a dram."

### MONDAY 6 JUL — "LAST CALL"
- ~9:30 · **Slow breakfast** · food · "No rush — the flight's not till evening."
- 10:30 · **Final wander / anything missed** · drink · "The Laurieston Bar (south side, cash-only 1960s time-warp) for a cheeky half, a last record shop, or a late-morning GFT film." · maps · pairing: "Fyne Ales Jarl at the Laurieston." · swap: "Rainy? Duck into a museum you skipped."
- 12:30 · **Lunch + collect bags** · food · "Eat central, grab the backpacks."
- 14:30 · **Leave for the airport** · transport · "500 bus or cab. Allow ~2h before a connecting international flight." 
- 17:00 · **Fly GLA → AMS → BER** · transport · "Land Berlin 22:10. (55-min AMS connection on the way in is fine; just don't dawdle through the non-Schengen check.)" · pairing: "A final airport Tennent's or BrewDog at the gate."

### Checklist items (for the interactive checklist)
- Buy Southpaw tickets — Thu 2 Jul, King Tut's
- Book Mother India — Fri 3 Jul
- Check Barrowland listings — Sat 4 Jul
- Decide Sunday gig: The Dirty Nil @ King Tut's vs Nice N Sleazy
- KLM online check-in — 24h before each leg
- Backpack only — no checked bag
- Bring some cash — Laurieston & the Barras lean cash-only
- Check Southpaw stage time nearer the date
- Add this site to home screen / save offline

### Footer practical block
- **Airport ↔ city:** 500 Airport Express to Buchanan St (~£9 return) or cab (~£20, 15 min).
- **Getting around:** compact and walkable; the Subway ("Clockwork Orange") links centre ↔ West End in minutes.
- **Delays:** KLM flights are covered by EU/UK air passenger rights (EU261) — care, rebooking, sometimes compensation.
- **Tickets:** Light fare = carry-on only, non-refundable. Do online check-in 24h out.
- **Daylight:** sun up till ~22:00 in July — long evenings.

---

## 6. After building
- Run `npm run dev` and confirm it renders.
- Print the local URL and the steps to: create the GitHub repo, set `base` in `astro.config.mjs`, push to `main`, enable Pages (Source: GitHub Actions), and the resulting live URL pattern (`https://<user>.github.io/<repo>/`).
- Keep the data/components split clean so future edits are one-file changes.
