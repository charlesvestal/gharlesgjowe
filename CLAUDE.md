# CLAUDE.md

Guidance for Claude Code (and anyone else) working in this repo.

## What this is

A small, fast **Astro static site** — a day-by-day itinerary for a long weekend
in **Glasgow** (Charles × Joe, 2–6 Jul 2026), plus a **"coda"** for Joe's solo
Newcastle → Edinburgh overnight after Charles flies home. Gig-poster styling,
opinionated-concierge voice, maps + booking links, a drinks plan, a checklist,
and food/near-the-flat reference sections.

It's meant to be **edited live, on the trip**. Changes are cheap; ship them.

## The one rule: edit the data, not the markup

**Almost everything lives in [`src/data/trip.ts`](src/data/trip.ts).** Days,
stops, the checklist, drinks plan, food lists, near-the-flat picks, and Joe's
coda are all typed data in that one file. To change the plan, edit the data —
you rarely need to touch a component.

The interfaces at the top of `trip.ts` (`Stop`, `Day`, `CodaDay`, etc.) are the
source of truth for what fields exist. `satisfies` clauses will fail the build
if you get a shape wrong — lean on that.

### Common edits

- **Change / add a stop:** edit or copy a `Stop` object inside a day's `stops`
  array. `kind` (`transport|food|sight|drink|gig|note`) drives the styling;
  `optional: true` renders an "Optional" tag; `swap` renders a dashed callout.
- **Add a day:** add a `Day` to the `days` array — it needs `date`, **`iso`**
  (`YYYY-MM-DD`), `code`, `theme`, `weather`, `stops`.
- **Maps links:** use the `mapsUrl('Venue Name')` helper for **Glasgow** places
  (it appends "Glasgow"). Use **`placeUrl('Full Query')`** for anywhere else
  (Joe's coda is in Newcastle/Edinburgh — don't use `mapsUrl` there).
- **Images:** local mirror under `public/images/`, referenced via
  `localImg('file.jpg')`. See `.scripts/mirror-images*.sh` for how they're
  fetched. Missing image = the component just omits the figure, which is fine.

### Gotcha: apostrophes in strings

`trip.ts` is full of prose. If a **single-quoted** string contains an apostrophe
(`Pumphrey's`, `pint's`), it breaks the parse. Use **double quotes** for any
string with an apostrophe, or escape it. `npx astro check` catches this.

## Architecture

```
src/
  data/trip.ts          # ALL content (edit this) + a `Trip` type export
  pages/index.astro     # page composition + the "what day is it" client script
  components/
    Hero, DayCard, StopRow, WeatherStrip, Checklist, DrinksPlan,
    FoodAlternates, NearTheFlat, Footer
    JoeCoda.astro       # Joe's solo Newcastle→Edinburgh coda (reuses StopRow)
  layouts/Base.astro
  styles/tokens.css     # colours + fonts (design tokens)
public/images/          # halftone-treated venue photos
```

### The "what day is it" feature

Each `Day` carries an `iso` date. A small client script at the bottom of
`index.astro` compares `new Date()` to those dates **in the browser** (so it's
always live, no rebuild needed) and:

- flags today's card `.is-today`, dims past days `.is-past`, marks the nav pill,
- fills the green **"today" banner** (handles before / during / after the trip).

**Joe's coda is deliberately excluded** from this logic — it uses `.coda`
classes, not `.day[data-date]`, so it never gets today/past styling.

## Commands

```bash
npm install
npm run dev       # local dev server (~http://localhost:4321)
npx astro check   # typecheck — run this after editing trip.ts
npm run build     # static build → ./dist
npm run preview   # preview the production build
```

Node 18+.

## Verify before you ship

1. `npx astro check` — must be **0 errors**.
2. `npm run build` — must complete.
3. For anything date-aware or interactive, drive the built `dist/index.html` in
   a headless browser and mock the date to confirm behaviour (Chromium is at
   `/opt/pw-browsers/chromium`; use `page.addInitScript` to freeze `Date`).
   This is how the "today" logic was verified for Sat/Mon/before/after.

## Deploy

**Push to `main` → GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) → GitHub Pages.**
Nothing goes live until it's on `main`. Live at:

> https://charlesvestal.github.io/gharlesgjowe/

`astro.config.mjs` sets `base: '/gharlesgjowe/'` (project-pages path) — keep it
in sync with the repo name or assets 404.

## Voice

Opinionated local-friend concierge: concrete, a little wry, honest about
trade-offs ("skip this", "book ahead", "one dram then the train"). Give a
recommendation, not a menu of every option. Keep accessibility intact
(semantic landmarks, focus states, contrast, `prefers-reduced-motion`).
