# Glasgow Weekend 🏴 Charles × Joe

A small, fast itinerary site for a long weekend in Glasgow (**2–6 Jul 2026**). Gig-poster styling, day-by-day plan, drink pairings, maps + ticket links, and a packing/booking checklist. Built to be edited on the fly and hosted free.

Built with [Astro](https://astro.build/) (static output). All trip content lives in one typed data file, so changing the plan never means touching markup.

---

## Quick start

```bash
npm install
npm run dev      # local dev server, usually http://localhost:4321
npm run build    # static build → ./dist
npm run preview  # preview the production build locally
```

Requires Node 18+.

---

## Editing the trip ✏️

**Everything lives in [`src/data/trip.ts`](src/data/trip.ts).** To change the plan, edit the data — not the components.

- **Change a stop** (time, blurb, pairing, etc.): find it under its day and edit the fields.
- **Add a stop:** copy an existing stop object into the day's `stops` array. Fields:

  | field | required | notes |
  |---|---|---|
  | `time` | no | e.g. `"19:30"` |
  | `title` | yes | venue / activity name |
  | `kind` | yes | `transport` · `food` · `sight` · `drink` · `gig` · `note` (drives the styling) |
  | `blurb` | yes | the one-liner |
  | `transport` | no | how to get there |
  | `booking` | no | `{ label, url }` for a tickets/booking link |
  | `maps` | no | Google Maps link — use `https://www.google.com/maps/search/?api=1&query=<URL-encoded "Name Glasgow">` |
  | `pairing` | no | beer / whisky / cocktail |
  | `swap` | no | alternative option callout |

- **Add a day:** add a `Day` object to the `trip` array (`date`, `code`, `theme`, `weather`, `stops`).
- **Checklist / footer:** edit their arrays/blocks in `trip.ts` too.

Design tokens (colours, fonts) live in [`src/styles/tokens.css`](src/styles/tokens.css).

After any edit: commit and push — the live site rebuilds automatically (see below).

---

## Deploy: GitHub Pages (free) 🚀

This repo ships with a GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**One-time setup:**

1. Set the base path in [`astro.config.mjs`](astro.config.mjs) — project pages serve from `/<repo>/`, so assets break without it:
   ```js
   export default defineConfig({
     site: 'https://<your-username>.github.io',
     base: '/<your-repo-name>/',   // ← must match the repo name
   });
   ```
2. Push to `main`.
3. On GitHub: **Settings → Pages → Source: GitHub Actions**.

Every push to `main` then rebuilds and redeploys. Live at:
```
https://<your-username>.github.io/<your-repo-name>/
```

### Prefer zero base-path faff? Use Cloudflare Pages or Netlify

Both are free and serve at the domain **root**, so you can delete the `base` line entirely:

- **Cloudflare Pages:** connect the repo → build command `npm run build`, output dir `dist`.
- **Netlify:** same — `npm run build`, publish dir `dist`.

Both auto-deploy on push, same as Pages.

---

## Project structure

```
src/
  data/trip.ts          # ALL itinerary content (edit this)
  components/           # Hero, DayCard, StopRow, WeatherStrip, Checklist, Footer
  layouts/Base.astro
  pages/index.astro
  styles/tokens.css     # colours + fonts
public/                 # favicon, fonts (if self-hosted), og image
.github/workflows/      # Pages deploy
astro.config.mjs        # set `base` here
PROMPT.md               # original build spec (kept for reference)
```

---

## Notes

- **Accessibility** is intended to stay first-class: semantic landmarks, logical heading order, visible focus states, good contrast, and `prefers-reduced-motion` respected. Keep it that way when adding things.
- The per-day **weather** lines hold a real **Met Office forecast snapshot** (date stamped in the `weather*` consts in `trip.ts`). Refresh them the night before flying — the far end of any forecast (here, the weekend) is the least certain.
- Checklist state persists in the browser via `localStorage` (per device).
