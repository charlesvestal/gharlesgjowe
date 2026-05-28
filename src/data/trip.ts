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
          blurb: 'Carry-on only = walk straight out. Realistically in the city ~14:00 after the bus.',
          transport:
            '500 Airport Express → Buchanan St, ~£9 return, every 10 min, 15–25 min depending on traffic. Or cab ~£20, ~15 min.',
        },
        {
          time: '~14:15',
          title: 'Drop bags at hotel',
          kind: 'note',
          blurb: "Check-in won't be ready — stash, freshen up, head straight back out. Everything from here is within 10 min walk of the centre.",
        },
        {
          time: '14:45',
          title: 'Paesano Pizza',
          kind: 'food',
          blurb: 'Wood-fired, fast, cheap — the no-faff landing lunch. Miller St, Merchant City, ~5 min from Buchanan St.',
          maps: mapsUrl('Paesano Pizza Miller Street'),
          pairing: 'Birra Moretti, or a Negroni sbagliato to mark the start.',
        },
        {
          time: '16:00',
          title: 'Merchant City wander — GoMA + Monorail',
          kind: 'sight',
          blurb:
            "Three-minute stroll from Paesano. Duck into the Gallery of Modern Art (Royal Exchange Sq — free, the traffic-coned Duke of Wellington statue out front = peak Glasgow), then poke through Monorail Music inside Mono on King St (records + a vegan bar in one room, 4 min away). Both small, both free to walk in — skip one if you fancy a slower pace.",
          maps: mapsUrl('Gallery of Modern Art GoMA'),
          pairing: 'Espresso at GoMA, or a Gamma Ray at Mono on the way out.',
          swap: 'Wiped from the flight? Drop both and go straight to the Pot Still for a long pre-gig sit.',
        },
        {
          time: '17:30',
          title: 'The Pot Still',
          kind: 'drink',
          blurb:
            "First proper pint. Whisky temple on Hope St, hundreds of drams, zero pretension. ~10 min walk from Monorail, 3 min from King Tut's — so you can settle in.",
          maps: mapsUrl('The Pot Still Hope Street'),
          pairing: 'A Lowland single malt + a Tempest four-grain stout.',
          swap: "Want a second pre-show pint? The Horseshoe (Drury St, 5 min away) — one of the UK's longest bars, cheap Tennent's.",
        },
        {
          time: '19:30',
          title: 'DOORS: Southpaw + The Misprints + The Citrines',
          kind: 'gig',
          blurb:
            "King Tut's Wah Wah Hut, St Vincent St — 3-min walk from the Pot Still. ~300 cap; Southpaw's first Glasgow show in 14 years. Headline likely ~21:30–22:00, so no need to be glued to the door.",
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
          blurb: 'Subway from centre to Hillhead (~10 min, the Clockwork Orange loop). Singl-end (Garnethill) or any Byres Rd café once you\'re out.',
        },
        {
          time: '11:00',
          title: 'Kelvingrove Art Gallery & Museum',
          kind: 'sight',
          blurb:
            "Free and superb — Dalí's Christ of St John of the Cross, a real Spitfire. The free 1pm organ recital is a Glasgow institution; time the visit around it. Plan ~2 hrs. (Fri opens 11:00.) Subway: Kelvinhall, 5-min walk.",
          maps: mapsUrl('Kelvingrove Art Gallery and Museum'),
        },
        {
          time: '13:30',
          title: 'Quick lunch on Byres Rd',
          kind: 'food',
          blurb: '10-min walk north from Kelvingrove. The University Café (1918 art-deco caff, fish & chips) or the Curlers Rest for pub grub — both right by the Uni.',
          maps: mapsUrl('University Cafe Byres Road'),
        },
        {
          time: '14:30',
          title: 'University of Glasgow + Hunterian',
          kind: 'sight',
          blurb:
            'Walk the Gilbert Scott cloisters (proper Hogwarts) — 5 min from the Uni Café. Free Hunterian Museum is the nerdy highlight.',
          maps: mapsUrl('University of Glasgow Hunterian Museum'),
        },
        {
          time: '16:00',
          title: 'Ashton Lane',
          kind: 'drink',
          blurb: 'Cobbled lane strung with fairy lights, 3 min from the Uni — afternoon pint and a wander. Brel for a beer garden, or Òran Mór across Byres Rd.',
          maps: mapsUrl('Ashton Lane'),
          pairing: 'Innis & Gunn oak-aged.',
        },
        {
          time: '18:30',
          title: 'Mother India',
          kind: 'food',
          blurb:
            'Glasgow is a UK curry capital and this is the institution. Finnieston — 15-min walk south down Byres Rd, or 5-min cab. BOOK AHEAD.',
          booking: { label: 'Book a table', url: 'https://www.motherindia.co.uk/' },
          maps: mapsUrl('Mother India Finnieston'),
          pairing: 'Cobra, or a whisky sour.',
        },
        {
          time: '20:30',
          title: 'Finnieston strip — final pints',
          kind: 'drink',
          blurb: "Mother India spills you onto Argyle St where all the bars are — stay put. The Ben Nevis (whisky bar, trad folk in the corner) is the keeper; BrewDog two doors down for a craft pint; Lebowskis if you want a White Russian. One more, maybe two, then walk back.",
          maps: mapsUrl('Ben Nevis bar Argyle Street'),
          pairing: 'A Highland malt at the Ben Nevis; Joker IPA at BrewDog.',
          swap: 'Knackered after the curry? End at Mother India, walk back along Argyle.',
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
          transport: '~20-min walk east of Buchanan St, or a £6 cab.',
          maps: mapsUrl('Glasgow Cathedral'),
        },
        {
          time: '11:00',
          title: 'Glasgow Necropolis',
          kind: 'sight',
          blurb:
            'Victorian hilltop cemetery directly behind the Cathedral — 3,500 monuments, big city views, filming spot for The Batman. Pure Rick Steves.',
          maps: mapsUrl('Glasgow Necropolis'),
        },
        {
          time: '12:30',
          title: "Lunch east-side — Saint Luke's",
          kind: 'food',
          blurb:
            "10-min walk south down High St. Converted church on Bain St, right next to the Barras — bar/restaurant in one. Sets you up for the afternoon without backtracking.",
          maps: mapsUrl("Saint Luke's Bain Street"),
          pairing: 'A WEST St Mungo lager.',
        },
        {
          time: '13:30',
          title: 'The Barras Market',
          kind: 'sight',
          blurb:
            "Right next door — weekends only, **closes at 16:00 sharp**. Ramshackle flea market: vinyl, vintage, junk, characters, street food. ~2.5 hrs to dig before traders pack up. Push lunch earlier (12:00) if you want longer here.",
          maps: mapsUrl('The Barras Market Gallowgate'),
        },
        {
          time: '15:30',
          title: 'WEST Brewery, Glasgow Green',
          kind: 'drink',
          blurb:
            '10-min walk south from the Barras across Glasgow Green. German-style brewery in the old Templeton carpet factory — afternoon pint with seating outside in good weather.',
          maps: mapsUrl('WEST Brewery Glasgow Green'),
          pairing: 'St Mungo, or the Munich Red.',
          swap: 'Barras still pulling you in? Skip WEST and keep digging — it\'ll be there next trip.',
        },
        {
          time: '17:30',
          title: 'Cab back, reset at hotel',
          kind: 'note',
          blurb:
            "10-min cab from Glasgow Green to the centre. Half-hour sit-down before dinner — Sunday is Stirling, you'll want some battery. Important: from here the rest of the night is all central (no more east-end runs).",
        },
        {
          time: '19:30',
          title: 'Dinner — central',
          kind: 'food',
          blurb:
            "Pick something walkable from the hotel — Ox and Finch in Finnieston (Mediterranean-ish small plates, ~15 min cab; book) is the move if you fancy a destination. Otherwise stay closer: Buchanan / Sauchiehall has plenty.",
          booking: { label: 'Ox and Finch', url: 'https://oxandfinch.com/' },
          maps: mapsUrl('Ox and Finch Finnieston'),
        },
        {
          time: '21:30',
          title: 'Central late-night',
          kind: 'drink',
          blurb:
            "All within 10 min of each other in the centre, pick one and stick: Sub Club on Jamaica St (Subculture, Saturday house institution since '94 — DJs in a basement, NOT a gig); Stereo on Renfield Lane (bar/club in a Mackintosh building); or a Sauchiehall dive crawl — Nice N Sleazy → The Variety Bar.",
          maps: mapsUrl('Sub Club Jamaica Street'),
          pairing: "Tennent's plastic pint at Sub Club; cheap house lager at Sleazy's.",
          swap: 'Wiped from the day? Quiet pint at the Pot Still and call it.',
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
            "Walk the wynds down from the castle. Lunch at **The Portcullis** (Sun food from 11:30, pub right by the castle esplanade — Settle Inn doesn't open till 15:00 on Sundays so skip it). Church of the Holy Rude is across the road — gorgeous Gothic exterior, but interior is **Sunday tours only at 14:00 / 16:30** if you want in.",
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
          time: '~18:00',
          title: 'Dinner before the GFT',
          kind: 'food',
          blurb:
            "Eat central before the 20:00 screening — Sauchiehall / Rose St has plenty (Singl-end Garnethill 5 min away, or anywhere on the way). GFT café-bar can do a light bite if you'd rather drink first.",
        },
        {
          time: '20:00',
          title: 'GFT — film or just a drink',
          kind: 'sight',
          blurb:
            "Glasgow Film Theatre, Rose St — beautiful indie cinema, 5-min walk from Sauchiehall. Either pick an early-evening screening (~2 hrs) or just have a drink at the GFT café-bar without committing to a film. Low-stakes.",
          booking: { label: "What's on", url: 'https://www.glasgowfilm.org/' },
          maps: mapsUrl('Glasgow Film Theatre Rose Street'),
          pairing: 'A glass of red at the café-bar.',
          swap: "Not feeling a film? Skip straight to the Clutha for the last pint.",
        },
        {
          time: '22:30',
          title: 'The Clutha — last pint',
          kind: 'drink',
          blurb:
            "Riverside pub steeped in Glasgow history, live music in the corner most nights, cheap pizza. The fitting last-night pint. 167–169 Stockwell St — 10-min walk south from the GFT, or a £5 cab.",
          maps: mapsUrl('The Clutha Stockwell Street'),
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
