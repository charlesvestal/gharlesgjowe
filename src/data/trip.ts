export interface Stop {
  time?: string;
  title: string;
  kind: 'transport' | 'food' | 'sight' | 'drink' | 'gig' | 'note';
  blurb: string;
  transport?: string;
  booking?: { label: string; url: string };
  maps?: string;
  pairing?: string;
  swap?: string;
}

export interface Day {
  date: string;
  code: string;
  theme: string;
  weather: string;
  stops: Stop[];
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface Flight {
  date: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
}

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} Glasgow`)}`;

const weather =
  'Glasgow in early July: highs ~18–19°C, lows ~11°C, genuinely changeable — sun and showers in one afternoon. Daylight until ~22:00. Pack a light waterproof shell.';

const weatherShort =
  'Highs ~18–19°C, lows ~11°C. Sun and showers in one afternoon. Daylight to ~22:00 — pack a shell.';

export const trip = {
  title: 'Glasgow',
  travellers: ['Charles', 'Joe'] as const,
  dates: '02–06 Jul 2026',
  tagline: 'Four nights of dive bars, galleries, gigs and rain shells.',
  flights: {
    out: { date: 'Thu 2 Jul', from: 'BER', to: 'GLA', depart: '09:05', arrive: '12:55' } satisfies Flight,
    back: { date: 'Mon 6 Jul', from: 'GLA', to: 'BER', depart: '17:00', arrive: '22:10' } satisfies Flight,
  },
  weatherCaveat:
    'Seasonal averages, not a forecast — check before you fly.',
  checklist: [
    { id: 'tix-southpaw', label: "Buy Southpaw tickets — Thu 2 Jul, King Tut's (the one show)" },
    { id: 'book-mother-india', label: 'Book Mother India — Fri 3 Jul' },
    { id: 'book-stirling-castle', label: 'Book Stirling Castle entry online — cheaper than gate price' },
    { id: 'check-sunday-trains', label: 'Check Sunday Stirling ↔ Glasgow trains — last train back matters' },
    { id: 'klm-checkin', label: 'KLM online check-in — 24h before each leg' },
    { id: 'backpack', label: 'Backpack only — no checked bag' },
    { id: 'cash', label: 'Bring some cash — Laurieston & the Barras lean cash-only' },
    { id: 'stage-time', label: 'Check Southpaw stage time nearer the date' },
    { id: 'home-screen', label: 'Add this site to home screen / save offline' },
  ] satisfies ChecklistItem[],
  footer: {
    items: [
      {
        label: 'Airport ↔ city',
        body: '500 Airport Express to Buchanan St (~£9 return) or cab (~£20, 15 min).',
      },
      {
        label: 'Getting around',
        body: 'Compact and walkable; the Subway ("Clockwork Orange") links centre ↔ West End in minutes.',
      },
      {
        label: 'Delays',
        body: 'KLM flights are covered by EU/UK air passenger rights (EU261) — care, rebooking, sometimes compensation.',
      },
      {
        label: 'Tickets',
        body: 'Light fare = carry-on only, non-refundable. Do online check-in 24h out.',
      },
      {
        label: 'Daylight',
        body: 'Sun up till ~22:00 in July — long evenings.',
      },
    ],
  },
  days: [
    {
      date: 'Thu 2 Jul',
      code: 'DAY 01',
      theme: "Touchdown & Tut's",
      weather: weather,
      stops: [
        {
          time: '12:55',
          title: 'Land at Glasgow Airport (GLA)',
          kind: 'transport',
          blurb: 'Carry-on only = walk straight out.',
          transport:
            '500 Airport Express bus → Buchanan St, ~£9 return, every 10 min, 15–25 min. Or cab ~£20, ~15 min.',
        },
        {
          time: '~14:00',
          title: 'Drop bags at hotel',
          kind: 'note',
          blurb: "Check-in won't be ready — just stash and go.",
        },
        {
          time: '14:30',
          title: 'Paesano Pizza',
          kind: 'food',
          blurb: 'Wood-fired, fast, cheap — the no-faff landing lunch. Miller St, Merchant City.',
          maps: mapsUrl('Paesano Pizza Miller Street'),
          pairing: 'Birra Moretti, or a Negroni sbagliato to mark the start.',
        },
        {
          time: '15:30',
          title: 'Gallery of Modern Art (GoMA)',
          kind: 'sight',
          blurb:
            'Free. The traffic-coned Duke of Wellington statue out front = peak Glasgow. Royal Exchange Sq.',
          maps: mapsUrl('Gallery of Modern Art GoMA'),
          pairing: 'Espresso in the basement café — fuel before the beer.',
        },
        {
          time: '16:15',
          title: 'Monorail Music',
          kind: 'sight',
          blurb:
            'First record dig of the trip, inside Mono on King St. Strong Scottish/leftfield selection.',
          maps: mapsUrl('Monorail Music King Street'),
          pairing: 'A pint next door at Mono (vegan bar) — try a Gamma Ray.',
        },
        {
          time: '17:30',
          title: 'The Pot Still',
          kind: 'drink',
          blurb:
            "Proper first pint. Whisky temple on Hope St, hundreds of drams, zero pretension. 4 min from King Tut's.",
          maps: mapsUrl('The Pot Still Hope Street'),
          pairing: 'A Lowland single malt + a Tempest four-grain stout.',
        },
        {
          time: '18:45',
          title: 'Horseshoe Bar (optional second)',
          kind: 'drink',
          blurb: "One of the UK's longest bars. Cheap and classic, on Drury St.",
          maps: mapsUrl('Horseshoe Bar Drury Street'),
          pairing: "A pint of Tennent's — the Glasgow rite of passage.",
        },
        {
          time: '19:30',
          title: 'DOORS: Southpaw + The Misprints + The Citrines',
          kind: 'gig',
          blurb:
            "King Tut's Wah Wah Hut, St Vincent St. ~300 cap; Southpaw's first Glasgow show in 14 years. Headline likely ~21:30–22:00, so no need to be glued to the door.",
          booking: { label: "Tickets (King Tut's)", url: 'https://www.kingtuts.co.uk/whats-on' },
          maps: mapsUrl("King Tut's Wah Wah Hut"),
          pairing: "Drygate Gladeye IPA, or a can of Tennent's.",
        },
      ],
    },
    {
      date: 'Fri 3 Jul',
      code: 'DAY 02',
      theme: 'West End Wander',
      weather: weatherShort,
      stops: [
        {
          time: '~10:30',
          title: 'Breakfast, West End',
          kind: 'food',
          blurb: 'Easy start — Singl-end or a Byres Rd café.',
        },
        {
          time: '11:00',
          title: 'Kelvingrove Art Gallery & Museum',
          kind: 'sight',
          blurb:
            "Free and superb — Dalí's Christ of St John of the Cross, a real Spitfire. Free organ recital at 1pm. (Fri opens 11:00.)",
          transport: 'Subway to Kelvinhall/Hillhead, or 15-min cab from centre.',
          maps: mapsUrl('Kelvingrove Art Gallery and Museum'),
        },
        {
          time: '13:00',
          title: 'University of Glasgow + Hunterian',
          kind: 'sight',
          blurb:
            'Walk the Gilbert Scott cloisters (proper Hogwarts). Free Hunterian Museum is the nerdy highlight.',
          maps: mapsUrl('University of Glasgow Hunterian Museum'),
        },
        {
          time: '15:00',
          title: 'Ashton Lane',
          kind: 'drink',
          blurb: 'Cobbled lane strung with fairy lights — afternoon pint and a wander.',
          maps: mapsUrl('Ashton Lane'),
          pairing: 'Innis & Gunn oak-aged.',
        },
        {
          time: '18:30',
          title: 'Mother India',
          kind: 'food',
          blurb:
            'Glasgow is a UK curry capital and this is the institution. Finnieston. BOOK AHEAD.',
          booking: { label: 'Book a table', url: 'https://www.motherindia.co.uk/' },
          maps: mapsUrl('Mother India Finnieston'),
          pairing: 'Cobra, or a whisky sour.',
        },
        {
          time: '20:30',
          title: 'Finnieston strip drinks',
          kind: 'drink',
          blurb: 'The Ben Nevis (whisky & trad folk) or BrewDog along Argyle St.',
          maps: mapsUrl('Ben Nevis bar Argyle Street'),
          pairing: 'Williams Bros Joker IPA.',
        },
        {
          time: '21:30',
          title: 'West-end dive route',
          kind: 'drink',
          blurb:
            "Mother India should land you back on Argyle St around now — work your way west: Brel on Ashton Lane (Belgian beer garden, fairy-lit), then The Park Bar on Argyle St for a trad folk session in the corner. Cap it back at the Finnieston strip.",
          maps: mapsUrl('Brel Ashton Lane'),
          pairing: 'Drygate Bearface lager at Brel; a Highland malt at the Park.',
          swap: 'Knackered after dinner? Just settle into the Finnieston strip — Ben Nevis to close.',
        },
      ],
    },
    {
      date: 'Sat 4 Jul',
      code: 'DAY 03',
      theme: 'East End & The Barras',
      weather: weatherShort,
      stops: [
        {
          time: '10:00',
          title: 'Glasgow Cathedral',
          kind: 'sight',
          blurb:
            '800-year-old Gothic, free. The atmospheric lower church is the bit people miss. Castle St.',
          transport: '~20-min walk east of centre, or short cab.',
          maps: mapsUrl('Glasgow Cathedral'),
        },
        {
          time: '11:00',
          title: 'Glasgow Necropolis',
          kind: 'sight',
          blurb:
            'Victorian hilltop cemetery — 3,500 monuments, big city views, filming spot for The Batman. Pure Rick Steves.',
          maps: mapsUrl('Glasgow Necropolis'),
        },
        {
          time: '13:00',
          title: 'The Barras Market',
          kind: 'sight',
          blurb:
            'Weekends only (10–4). Ramshackle flea market — vinyl, vintage, junk, characters, street food. Gallowgate.',
          maps: mapsUrl('The Barras Market Gallowgate'),
          pairing: 'WEST St Mungo lager.',
        },
        {
          time: '15:00',
          title: 'WEST Brewery, Glasgow Green (optional)',
          kind: 'drink',
          blurb:
            'German-style brewery in the old Templeton carpet factory, 5 min from the Barras.',
          maps: mapsUrl('WEST Brewery Glasgow Green'),
          pairing: 'St Mungo, or the Munich Red.',
        },
        {
          time: '18:00',
          title: 'Dinner',
          kind: 'food',
          blurb: 'Ox and Finch (Finnieston small plates — book) or stick east.',
          booking: { label: 'Ox and Finch', url: 'https://oxandfinch.com/' },
          maps: mapsUrl('Ox and Finch Finnieston'),
        },
        {
          time: '20:00',
          title: 'Walk past Barrowland → late drinks',
          kind: 'drink',
          blurb:
            "No second show this trip — but walk Gallowgate to clock the Barrowland sign lit up (it's a thing), then head west. Either: (a) Sub Club's Subculture for an hour — Saturday house institution since '94, Jamaica St, DJs not a gig — or (b) a Sauchiehall dive crawl: Stereo (basement of a Mackintosh building) → The Variety Bar → Nice N Sleazy.",
          maps: mapsUrl('Barrowland Ballroom'),
          pairing: "Tennent's plastic pint at Sub Club; whatever's cheapest at Sleazy's.",
          swap: "Wiped from the Barras? Cab west, dinner late, and pick up at Finnieston for a quieter pint.",
        },
      ],
    },
    {
      date: 'Sun 5 Jul',
      code: 'DAY 04',
      theme: 'Stirling Day Trip',
      weather: weatherShort,
      stops: [
        {
          time: '~9:30',
          title: 'Train: Queen St → Stirling',
          kind: 'transport',
          blurb:
            "ScotRail direct, ~30 min, usually 2–4 per hour. Buy a return — cheaper than two singles.",
          transport:
            'From Glasgow Queen Street (high level). Sunday service is thinner than weekdays — confirm the last train back before you head out.',
          booking: { label: 'ScotRail journey planner', url: 'https://www.scotrail.co.uk/' },
        },
        {
          time: '10:30',
          title: 'Stirling Castle',
          kind: 'sight',
          blurb:
            "The day's anchor — one of Scotland's great castles. Great Hall, Royal Palace, views over the Forth valley. Allow 2.5–3 hrs; last entry well before close; cheaper booked online.",
          booking: {
            label: 'Book entry (Historic Environment Scotland)',
            url: 'https://www.historicenvironment.scot/visit-a-place/places/stirling-castle/',
          },
          maps: 'https://www.google.com/maps/search/?api=1&query=Stirling+Castle',
          pairing: 'A coffee in the castle tearoom — pubs come later.',
          swap:
            "Rather stay in Glasgow? Riverside Museum (Zaha Hadid + a DeLorean), the Burrell Collection in Pollok Park, or a Loch Lomond run (Queen St → Balloch, ~45 min).",
        },
        {
          time: '13:00',
          title: 'Old Town wander + pub lunch',
          kind: 'food',
          blurb:
            "Walk the wynds down from the castle — Church of the Holy Rude is the bit people miss (the only church besides Westminster Abbey to have hosted a still-reigning monarch's coronation). Pub lunch at The Portcullis or Settle Inn.",
          maps: 'https://www.google.com/maps/search/?api=1&query=The+Portcullis+Stirling',
          pairing: 'A pint of Williams Bros Caesar Augustus at the Portcullis.',
        },
        {
          time: '14:30',
          title: 'Wallace Monument (optional)',
          kind: 'sight',
          blurb:
            'Across town on the Abbey Craig — steep climb up the tower, big payoff view. Separate ticket; allow ~2 hrs door-to-door from the castle.',
          booking: { label: 'Tickets + hours', url: 'https://www.nationalwallacemonument.com/' },
          maps: 'https://www.google.com/maps/search/?api=1&query=National+Wallace+Monument+Stirling',
          swap: 'Knackered or raining? Skip Wallace — second pint in the Old Town and an earlier train back.',
        },
        {
          time: '~16:30',
          title: 'Train: Stirling → Queen St',
          kind: 'transport',
          blurb:
            'Aim to be back in Glasgow by ~17:30 so the evening plan stays intact. Sunday service is thinner — do NOT wing the last train.',
          booking: { label: 'ScotRail journey planner', url: 'https://www.scotrail.co.uk/' },
        },
        {
          time: '18:30',
          title: 'Glasgow Film Theatre (GFT)',
          kind: 'sight',
          blurb:
            "Beautiful indie cinema on Rose St — arthouse & rep. Grab an early-evening screening to reset after the day out.",
          booking: { label: "What's on", url: 'https://www.glasgowfilm.org/' },
          maps: mapsUrl('Glasgow Film Theatre Rose Street'),
          pairing: 'A glass of something at the GFT café-bar.',
        },
        {
          time: '21:00',
          title: 'Nice N Sleazy',
          kind: 'drink',
          blurb:
            "Grungy Sauchiehall St institution — cheap drinks, jukebox, the dive bar of the trip. 4-min walk from the GFT.",
          maps: mapsUrl('Nice N Sleazy Sauchiehall Street'),
          pairing: 'Cheap house lager, or a boilermaker.',
          swap: 'Prefer something quieter? The Pot Still is two streets away for a final dram.',
        },
        {
          time: '22:30',
          title: 'The Clutha',
          kind: 'drink',
          blurb:
            "Riverside pub steeped in history, live music in the corner most nights, cheap pizza. A fitting last-night pint. Bridgegate.",
          maps: mapsUrl('The Clutha Bridgegate'),
          pairing: 'A pint of Guinness + a dram.',
        },
      ],
    },
    {
      date: 'Mon 6 Jul',
      code: 'DAY 05',
      theme: 'Last Call',
      weather: weatherShort,
      stops: [
        {
          time: '~9:30',
          title: 'Slow breakfast',
          kind: 'food',
          blurb: "No rush — the flight's not till evening.",
        },
        {
          time: '10:30',
          title: 'Final wander / anything missed',
          kind: 'drink',
          blurb:
            'The Laurieston Bar (south side, cash-only 1960s time-warp) for a cheeky half, a last record shop, or a late-morning GFT film.',
          maps: mapsUrl('The Laurieston Bar Bridge Street'),
          pairing: 'Fyne Ales Jarl at the Laurieston.',
          swap: 'Rainy? Duck into a museum you skipped.',
        },
        {
          time: '12:30',
          title: 'Lunch + collect bags',
          kind: 'food',
          blurb: 'Eat central, grab the backpacks.',
        },
        {
          time: '14:30',
          title: 'Leave for the airport',
          kind: 'transport',
          blurb: '500 bus or cab. Allow ~2h before a connecting international flight.',
        },
        {
          time: '17:00',
          title: 'Fly GLA → AMS → BER',
          kind: 'transport',
          blurb:
            'Land Berlin 22:10. (55-min AMS connection on the way in is fine; just don\'t dawdle through the non-Schengen check.)',
          pairing: "A final airport Tennent's or BrewDog at the gate.",
        },
      ],
    },
  ] satisfies Day[],
};

export type Trip = typeof trip;
