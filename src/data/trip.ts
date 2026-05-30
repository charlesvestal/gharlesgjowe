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
  optional?: boolean;   // droppable — rendered with an "Optional" tag
  image?: string;       // any URL — halftone-treated in the component
  imageAlt?: string;
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
  done?: boolean;   // pre-checked for everyone (already sorted)
}

export interface Flight {
  date: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
}

export interface FoodPick {
  name: string;
  area: string;       // neighbourhood
  meal: string;       // breakfast / lunch / snack / dinner
  blurb: string;      // one-line "what + why"
  note?: string;      // booking / cash / opening quirk
  maps?: string;
  image?: string;     // any URL — halftone-treated in the component
  imageAlt?: string;
}

export interface FoodGroup {
  label: string;
  intro: string;
  picks: FoodPick[];
}

export interface NearbyPlace {
  name: string;
  walk: string;        // approx walk from the flat, e.g. '3 min'
  blurb: string;       // one-line what + why
  maps?: string;
}

export interface NearbyGroup {
  label: string;       // 'Pubs', 'Food & coffee', 'Culture & curios'
  picks: NearbyPlace[];
}

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} Glasgow`)}`;

// Local mirror of remote photos. Files live in public/images/ and are
// served at <base>/images/<filename>. See .scripts/mirror-images.sh.
const localImg = (filename: string) =>
  `${import.meta.env.BASE_URL}images/${filename}`;

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
    { id: 'book-sharmanka', label: 'Book Sharmanka Kinetic Theatre — pick a Thu/Fri/Sat show time via ticketsource.co.uk/sharmanka' },
    { id: 'book-tenement-house', label: 'Book Tenement House timed entry for Mon 6 Jul ~10:30 (nts.org.uk)' },
    { id: 'book-mother-india', label: 'Book Mother India — Fri 3 Jul', done: true },
    { id: 'book-crabshakk', label: 'Book Crabshakk — Sun 5 Jul (small room, often fills)', done: true },
    { id: 'book-margo', label: 'Book Margo — Sat 4 Jul (Merchant City small plates)', done: true },
    { id: 'book-stirling-castle', label: 'Book Stirling Castle entry online — cheaper than gate price' },
    { id: 'check-sunday-trains', label: 'Check Sunday Stirling ↔ Glasgow trains — last train back matters' },
    { id: 'backpack', label: 'Backpack only — no checked bag' },
    { id: 'cash', label: 'Bring some cash — Laurieston & the Barras lean cash-only' },
    { id: 'spires-deposit', label: 'Photo ID + the booking card for check-in — The Spires holds a £250 deposit' },
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
        label: 'Daylight',
        body: 'Sun up till ~22:00 in July — long evenings.',
      },
    ],
  },
  foodAlternates: [
    {
      label: 'Cheap & cheerful',
      intro: 'Under £15 a head — the "I\'d go out of my way for this" tier.',
      picks: [
        {
          name: 'Cashel Coffee',
          area: 'Woodlands',
          meal: 'breakfast',
          blurb: 'Square sausage + tattie scone on a Morton\'s crispy roll. The local breakfast pick between centre and West End.',
          maps: mapsUrl('Cashel Coffee Woodlands'),
          image: localImg('cashel-coffee.jpg'),
          imageAlt: 'Cashel Coffee food spread',
        },
        {
          name: "Gizzi's Espresso Bar",
          area: 'Shawlands',
          meal: 'breakfast',
          blurb: 'Steak lorne roll with nduja crumb — the cult Southside breakfast.',
          note: 'Wed–Sun only, closed Mon & Tue.',
          maps: mapsUrl("Gizzi's Espresso Bar Shawlands"),
          image: localImg('gizzis.jpg'),
          imageAlt: "Gizzi's Espresso Bar, Shawlands",
        },
        {
          name: "Ranjit's Kitchen",
          area: 'Pollokshields',
          meal: 'lunch',
          blurb: 'Punjabi home cooking, vegetarian only — dhal, saag, samosas locals fight over. The non-Mother India curry.',
          note: 'Cash only · Closed Mon · no bookings.',
          maps: mapsUrl("Ranjit's Kitchen Pollokshaws Road"),
          image: localImg('ranjits.jpg'),
          imageAlt: "Ranjit's Kitchen thali",
        },
        {
          name: 'Philadelphia',
          area: 'Kelvinbridge',
          meal: 'snack / dinner',
          blurb: 'The chippy locals actually go to — same family 40 years. Skip the touristy Blue Lagoon.',
          maps: mapsUrl('Philadelphia chippy Great Western Road'),
          image: localImg('philadelphia-chippy.jpg'),
          imageAlt: 'Philadelphia Fish & Chicken Bar, Great Western Road',
        },
        {
          name: 'Tantrum Doughnuts',
          area: 'Centre / Old Dumbarton Rd',
          meal: 'snack',
          blurb: 'Proper yeast-raised doughnuts. The local sweet stop.',
          note: 'Old Dumbarton branch closed Mon; Gordon St branch closed Sun.',
          maps: mapsUrl('Tantrum Doughnuts'),
          image: localImg('tantrum-doughnuts.jpg'),
          imageAlt: 'Tantrum Doughnuts display',
        },
        {
          name: 'Boca',
          area: 'Strathbungo',
          meal: 'lunch',
          blurb: 'Overstuffed artisan sandwiches. Quiet Southside hero.',
          maps: mapsUrl('Boca Strathbungo'),
          image: localImg('boca-strathbungo.jpg'),
          imageAlt: 'Boca sandwich shop, Strathbungo',
        },
      ],
    },
    {
      label: 'Mid-range neighbourhood',
      intro: 'Under £40 a head — neighbourhood spots locals book regularly.',
      picks: [
        {
          name: "Errol's Hot Pizza",
          area: 'Govanhill',
          meal: 'dinner',
          blurb: 'Detroit-style + NY from ex-Alchemilla chefs. The non-Paesano pizza Glaswegians actually argue about.',
          note: 'Tiny, BYOB, hard to book. Thu–Sun from 5pm only — fits Thu 2 Jul or Sun 5 Jul.',
          maps: mapsUrl("Errol's Hot Pizza Govanhill"),
          image: localImg('errols-pizza.jpg'),
          imageAlt: "Errol's Hot Pizza, Govanhill",
        },
        {
          name: "Frank's Pizza",
          area: 'Dennistoun',
          meal: 'snack / dinner',
          blurb: 'NY slices, stand-up vibe. Pairs with a Mesa walk.',
          note: 'Wed–Sun only.',
          maps: mapsUrl("Frank's Pizza Duke Street Dennistoun"),
          image: localImg('franks-pizza.png'),
          imageAlt: "Frank's Pizza, Dennistoun",
        },
        {
          name: 'Bar Vini',
          area: 'Govanhill',
          meal: 'dinner',
          blurb: 'Neighbourhood Italian wine bar, weekly-changing pasta specials.',
          maps: mapsUrl('Bar Vini Victoria Road'),
          image: localImg('bar-vini.jpg'),
          imageAlt: 'Bar Vini, Victoria Road, Govanhill',
        },
        {
          name: "Celino's",
          area: 'Dennistoun',
          meal: 'lunch / dinner',
          blurb: 'Italian deli + trattoria, 40+ years. Pasta and a pint, very East End.',
          maps: mapsUrl("Celino's Alexandra Parade"),
          image: localImg('celinos.jpg'),
          imageAlt: "Celino's, Alexandra Parade, Dennistoun",
        },
        {
          name: 'Corner Shop',
          area: 'West End',
          meal: 'lunch / dinner',
          blurb: 'Scots-Spanish small plates. Named Scotland\'s best wine bar 2025.',
          maps: mapsUrl('Corner Shop Old Dumbarton Road'),
          image: localImg('corner-shop.jpg'),
          imageAlt: 'Corner Shop wine bar, Old Dumbarton Road',
        },
        {
          name: 'Brett',
          area: 'West End',
          meal: 'dinner',
          blurb: "Cail Bruich's cooler sibling — Michelin-recommended, counter seats. Hits at the top of £40.",
          note: 'Book ahead.',
          maps: mapsUrl('Brett Great Western Road'),
          image: localImg('brett.jpg'),
          imageAlt: 'Brett restaurant interior, West End Glasgow',
        },
        {
          name: 'Ka Pao',
          area: 'West End (Botanics)',
          meal: 'dinner',
          blurb: "Thai/SE Asian small plates by the Ox and Finch / Margo team. In the old Botanic Gardens Garage on Vinicombe St — handsome high-ceiling room.",
          note: 'Book ahead.',
          maps: mapsUrl('Ka Pao Vinicombe Street Glasgow'),
        },
      ],
    },
    {
      label: 'Specific gap-fillers',
      intro: 'Standouts when you want non-curry Asian, vegan, or just a great wine bar.',
      picks: [
        {
          name: 'GaGa',
          area: 'Partick',
          meal: 'lunch / dinner',
          blurb: "Julie Lin's follow-up to Julie's Kopitiam (closed 2023). Bib Gourmand Malaysian/SE Asian small plates on Dumbarton Rd. The non-curry Asian pick.",
          note: 'Book ahead. (Julie stepped back as head chef in 2025; team continues.)',
          maps: mapsUrl('GaGa Dumbarton Road Partick'),
          image: localImg('gaga.jpg'),
          imageAlt: 'GaGa restaurant dish, Partick',
        },
        {
          name: 'Kimchi Cult',
          area: 'West End',
          meal: 'lunch / snack',
          blurb: 'Korean street food — banh-mi-meets-bibimbap energy. Fills the Hanoi Bike Shop hole (RIP).',
          note: 'Closed Mon.',
          maps: mapsUrl('Kimchi Cult Chancellor Street'),
          image: localImg('kimchi-cult.jpg'),
          imageAlt: 'Kimchi Cult bibimbap bowl',
        },
        {
          name: 'Sylvan',
          area: 'Woodlands',
          meal: 'lunch / dinner',
          blurb: 'Vegan/veg wine bar near Park Circus. Easy West End drop-in.',
          note: 'Closed Sun.',
          maps: mapsUrl('Sylvan Woodlands'),
          image: localImg('sylvan.jpg'),
          imageAlt: 'Sylvan vegan wine bar dish, Woodlands',
        },
      ],
    },
  ] satisfies FoodGroup[],
  nearTheFlat: {
    intro:
      "You're in the dead centre of Merchant City — pubs, breakfast and galleries are mostly a 2–10 min walk from the Spires door. Everything here was checked open as of mid-2026.",
    groups: [
      {
        label: 'Pubs & bars',
        picks: [
          { name: 'The Blane Valley', walk: '30 sec', blurb: 'Honest traditional pub literally across the street — pints and homecooked food. Your default first and last stop.', maps: mapsUrl('The Blane Valley 76 Glassford Street') },
          { name: 'Blackfriars', walk: '4 min', blurb: 'Merchant City stalwart: five rotating cask ales and a basement live-music & comedy room. The dive-ish gig pick.', maps: mapsUrl('Blackfriars Bell Street') },
          { name: 'Babbity Bowster', walk: '5 min', blurb: '18th-century pub with folk-music heritage, good beer and a sunny courtyard. (The one that was full for rooms.)', maps: mapsUrl('Babbity Bowster Blackfriars Street') },
          { name: "Anderson's", walk: '6 min', blurb: "New pub on the old 13th Note site on King St — tank-fresh Tennent's, an ex-Michelin kitchen, and gigs downstairs.", maps: mapsUrl("Andersons King Street Glasgow") },
          { name: 'The Scotia Bar', walk: '8 min', blurb: "Claims the city's oldest pub (1792); low ceilings, trad/folk sessions, a proper musicians' and writers' den.", maps: mapsUrl('The Scotia Bar Stockwell Street') },
          { name: 'The Clutha & Victoria', walk: '9 min', blurb: 'Joined-up riverside live-music bars with free gigs most nights, murals and a beer garden.', maps: mapsUrl('The Clutha Stockwell Street') },
          { name: 'Shilling Brewing Co.', walk: '8 min', blurb: 'Brewpub in a marble-and-copper former bank — 30+ taps including their own beers. Top spot for craft.', maps: mapsUrl('Shilling Brewing Co West George Street') },
          { name: 'The Horseshoe Bar', walk: '9 min', blurb: "1870 Victorian institution with one of the UK's longest bars — cheap pints, listed interior, karaoke upstairs.", maps: mapsUrl('The Horseshoe Bar Drury Street') },
        ],
      },
      {
        label: 'Breakfast & coffee',
        picks: [
          { name: 'Café Gandolfi', walk: '4 min', blurb: 'Merchant City institution since 1979 — the proper sit-down Scottish breakfast/brunch pick. Get there before it fills.', maps: mapsUrl('Cafe Gandolfi Albion Street') },
          { name: 'Bar 91', walk: '3 min', blurb: 'Laid-back Merchant City bar doing a solid brunch and good coffee — the easy morning-after landing.', maps: mapsUrl('Bar 91 Candleriggs') },
          { name: 'Spitfire Espresso', walk: '6 min', blurb: 'Specialty coffee and breakfast rolls at 55 High Street — a quick caffeine-and-roll start to the day.', maps: mapsUrl('Spitfire Espresso High Street Glasgow') },
          { name: 'Mono', walk: '6 min', blurb: 'All-day vegan café-bar sharing space with Monorail records — brunch, good beer, and gigs later on.', maps: mapsUrl('Mono Kings Court King Street') },
        ],
      },
      {
        label: 'Casual eats',
        picks: [
          { name: 'Paesano Pizza', walk: '5 min', blurb: 'Walk-in-only wood-fired Neapolitan pizza — cheap and excellent. Already your day-one lunch; worth a repeat.', maps: mapsUrl('Paesano Pizza Miller Street') },
          { name: 'Sugo Pasta', walk: '8 min', blurb: 'No-bookings fresh-pasta canteen — fast, affordable, buzzy. The no-faff dinner.', maps: mapsUrl('Sugo Pasta Mitchell Street') },
          { name: 'Hutchesons Bar & Brasserie', walk: '2 min', blurb: 'Grand listed building round the corner on Ingram St — steaks and a Scottish menu if you want a proper sit-down.', maps: mapsUrl('Hutchesons Ingram Street Glasgow') },
          { name: 'Alston Bar & Beef', walk: '9 min', blurb: 'Atmospheric steakhouse and a big gin list hidden in the vaults under Central Station.', maps: mapsUrl('Alston Bar and Beef Gordon Street') },
        ],
      },
      {
        label: 'Culture & curios',
        picks: [
          { name: 'GoMA + the cone', walk: '3 min', blurb: "Free contemporary-art gallery on Royal Exchange Sq — and the traffic-cone-on-Wellington statue out front, the city's unofficial mascot.", maps: mapsUrl('Gallery of Modern Art Royal Exchange Square') },
          { name: 'Sharmanka Kinetic Theatre', walk: '6 min', blurb: 'Mesmerising kinetic-sculpture theatre at Trongate 103 — utterly unique; book a timed show. (Already on your plan.)', maps: mapsUrl('Sharmanka Kinetic Theatre Trongate') },
          { name: 'Britannia Panopticon', walk: '6 min', blurb: "World's oldest surviving music hall (Stan Laurel's debut), hidden above a Trongate shop — open Thu–Sat, atmospheric and free to look round.", maps: mapsUrl('Britannia Panopticon Trongate') },
          { name: 'City Halls & Old Fruitmarket', walk: '3 min', blurb: "Candleriggs concert venues — trad, folk, jazz and classical. Worth checking what's on for the nights you're in town.", maps: mapsUrl('City Halls Candleriggs Glasgow') },
          { name: 'Argyll Arcade', walk: '7 min', blurb: 'Victorian covered jewellery arcade off Buchanan St — a quick atmospheric cut-through with 30+ jewellers.', maps: mapsUrl('Argyll Arcade Glasgow') },
          { name: 'Glasgow Cross & Tolbooth Steeple', walk: '7 min', blurb: '1634 steeple marooned on the Trongate, last survivor of the old Tolbooth — a two-minute photo stop en route to the Barras.', maps: mapsUrl('Tolbooth Steeple Glasgow Cross') },
        ],
      },
    ] satisfies NearbyGroup[],
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
          pairing: 'Coffee at the gate before the bus — save the pints.',
          image: localImg('glasgow-airport-terminal.jpg'),
          imageAlt: 'Glasgow Airport terminal building exterior',
        },
        {
          time: '~14:15',
          title: 'Drop bags — The Spires',
          kind: 'note',
          blurb:
            "**The Spires Serviced Apartments**, 77 Glassford St — bang in the Merchant City with bars on the doorstep, ~10 min walk to King Tut's. Two-bed apartment: a bedroom each, plus a living room + kitchen to flop in. Keys at reception (open till 17:00 on a weekday, so fine on a Thursday arrival); proper check-in from 15:00 — stash, freshen up, head straight back out. Bring **photo ID + the card you booked with**: they hold a £250 deposit (refunded after checkout).",
          booking: { label: 'The Spires', url: 'https://www.booking.com/hotel/gb/thespiresglasgow.html' },
          maps: mapsUrl('The Spires Serviced Apartments Glassford Street'),
          pairing: 'Tap water. The night is long.',
        },
        {
          time: '14:45',
          title: 'Paesano Pizza',
          kind: 'food',
          blurb: 'Wood-fired, fast, cheap — the no-faff landing lunch. Miller St, Merchant City, ~5 min from Buchanan St.',
          maps: mapsUrl('Paesano Pizza Miller Street'),
          pairing: 'Birra Moretti, or a Negroni sbagliato to mark the start.',
          image:
            localImg('paesano.jpg'),
          imageAlt: 'Paesano Pizza Miller Street wood-fired oven and counter',
        },
        {
          time: '16:00',
          title: 'Merchant City wander — GoMA + Monorail',
          kind: 'sight',
          optional: true,
          blurb:
            "Three-minute stroll from Paesano. Duck into the Gallery of Modern Art (Royal Exchange Sq — free, the traffic-coned Duke of Wellington statue out front = peak Glasgow), then poke through Monorail Music inside Mono on King St (records + a vegan bar in one room, 4 min away). Both small, both free to walk in. If you want a second dig: Rubadub on Howard St (electronic/dance records, DJ gear) is 8 min south.",
          maps: mapsUrl('Gallery of Modern Art GoMA'),
          pairing: 'Espresso at GoMA, or a Gamma Ray at Mono on the way out.',
          swap: 'Wiped from the flight? Drop both and go straight to the Pot Still for a long pre-gig sit.',
          image: localImg('goma-glasgow.jpg'),
          imageAlt: 'Gallery of Modern Art Glasgow front facade with Duke of Wellington statue',
        },
        {
          time: 'Show TBD',
          title: 'Sharmanka Kinetic Theatre',
          kind: 'sight',
          blurb:
            "Basement of mechanical sculptures by Russian artist Eduard Bersudsky — figures, scrap, lights, and music orchestrated into 45-min performances. Two shows in rotation: 'Journey' (lighter, all-ages) and 'Wheels of Life' (darker, 12+). Trongate 103 — 2 min from Monorail. Check show times before the trip and book ahead; the room only seats ~50.",
          booking: { label: 'Book via TicketSource', url: 'https://www.ticketsource.co.uk/sharmanka' },
          maps: mapsUrl('Sharmanka Kinetic Theatre Trongate 103'),
          pairing: 'Skip the pint — concentrate. Then straight to the Pot Still.',
          swap: "Nothing on at a workable Thursday time? Could shift to Friday or Saturday afternoon — they run Wed–Sun most weeks.",
          image: localImg('sharmanka.jpg'),
          imageAlt: 'Sharmanka Kinetic Theatre mechanical sculpture',
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
          image: localImg('pot-still.jpg'),
          imageAlt: 'The Pot Still whisky bar, Hope Street, Glasgow',
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
          image: localImg('king-tuts.jpg'),
          imageAlt: "King Tut's Wah Wah Hut frontage, St Vincent Street, Glasgow",
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
          title: 'Breakfast — Cottonrake Bakery',
          kind: 'food',
          blurb:
            "Slow-ferment sourdough + almond croissant locals queue for, on Great Western Rd. On La Liste's world bakeries 2024. Subway to Kelvinbridge (Clockwork Orange loop, ~10 min from centre), 5-min walk. Cashel Coffee in Woodlands is the back-up if Cottonrake's queue is silly.",
          maps: mapsUrl('Cottonrake Bakery Great Western Road'),
          pairing: 'Flat white from the counter.',
          swap: "Fancy a proper sit-down brunch instead? Kember & Jones on Byres Rd (deli-café, big plates) is the locals' pick — handy if you'd rather start further south near the Uni.",
          image: localImg('cottonrake-bakery.jpg'),
          imageAlt: 'Cottonrake Bakery pastry — dark chocolate and raspberry tart',
        },
        {
          time: '11:00',
          title: 'Kelvingrove Art Gallery & Museum',
          kind: 'sight',
          blurb:
            "Free and superb — Dalí's Christ of St John of the Cross, a real Spitfire. The free 1pm organ recital is a Glasgow institution; time the visit around it. Plan ~2 hrs. (Fri opens 11:00.) Subway: Kelvinhall, 5-min walk.",
          maps: mapsUrl('Kelvingrove Art Gallery and Museum'),
          pairing: 'Espresso in the museum café.',
          image: localImg('kelvingrove.jpg'),
          imageAlt: 'Kelvingrove Art Gallery and Museum red sandstone exterior',
        },
        {
          time: '13:30',
          title: 'Quick lunch on Byres Rd',
          kind: 'food',
          blurb: '10-min walk north from Kelvingrove. The University Café (1918 art-deco caff, fish & chips) or the Curlers Rest for pub grub — both right by the Uni.',
          maps: mapsUrl('University Cafe Byres Road'),
          pairing: 'A pot of tea at the Uni Café, or a half of Tennent\'s at the Curlers.',
          image: localImg('university-cafe.jpg'),
          imageAlt: 'University Café art-deco interior, Byres Road',
        },
        {
          time: '14:30',
          title: 'University of Glasgow + Hunterian',
          kind: 'sight',
          blurb:
            'Walk the Gilbert Scott cloisters (proper Hogwarts) — 5 min from the Uni Café. Free Hunterian Museum is the nerdy highlight.',
          maps: mapsUrl('University of Glasgow Hunterian Museum'),
          pairing: 'Coffee from the Hunterian café between exhibits.',
          image: localImg('glasgow-university.jpg'),
          imageAlt: 'University of Glasgow Gilbert Scott main building',
        },
        {
          time: '16:00',
          title: 'Botanic Gardens + River Kelvin walk',
          kind: 'sight',
          optional: true,
          blurb:
            "Jesse's West End tip, and a good one: from the Uni, head up Byres Rd to the Botanic Gardens — free, with the Victorian Kibble Palace glasshouse, and you can drop onto the leafy River Kelvin walkway for a riverside loop. ~40 min of green before the pint, and Ashton Lane's on the way back down.",
          maps: mapsUrl('Glasgow Botanic Gardens Kibble Palace'),
          pairing: 'Save it for Ashton Lane.',
        },
        {
          time: '16:45',
          title: 'Ashton Lane',
          kind: 'drink',
          blurb: "Cobbled lane strung with fairy lights, a few minutes back down from the Botanics — afternoon pint and a wander. Brel for a beer garden, Òran Mór across Byres Rd, or the Ubiquitous Chip for the lane's famous Scottish institution (the Wee Chip bar upstairs if you just want a pint).",
          maps: mapsUrl('Ashton Lane'),
          pairing: 'Innis & Gunn oak-aged.',
          image: localImg('ashton-lane.jpg'),
          imageAlt: 'Ashton Lane cobbled street with fairy lights, West End Glasgow',
        },
        {
          time: '18:30',
          title: 'Mother India',
          kind: 'food',
          blurb:
            "Glasgow is a UK curry capital and this is the institution. Finnieston — 15-min walk south down Byres Rd, or 5-min cab. **Booked 18:30.**",
          booking: { label: 'Booking', url: 'https://www.motherindia.co.uk/' },
          maps: mapsUrl('Mother India Finnieston'),
          pairing: 'Cobra, or a whisky sour.',
          image: localImg('mother-india.jpg'),
          imageAlt: 'Mother India restaurant dining room, Finnieston',
        },
        {
          time: '20:30',
          title: 'Finnieston strip — final pints',
          kind: 'drink',
          blurb: "Mother India spills you onto Argyle St where all the bars are — stay put. The Ben Nevis (whisky bar, trad folk in the corner) is the keeper; Eighty Eight (88 Argyle, independent craft beer) for a proper pint; Lebowskis if you want a White Russian or a comfy booth. One more, maybe two, then walk back. (Skip BrewDog — bad employer.)",
          maps: mapsUrl('Ben Nevis bar Argyle Street'),
          pairing: 'A Highland malt at the Ben Nevis; whatever\'s on at Eighty Eight; a White Russian at Lebowskis.',
          swap: 'Knackered after the curry? End at Mother India, walk back along Argyle.',
          image: localImg('ben-nevis-bar.jpg'),
          imageAlt: 'The Ben Nevis whisky bar on Argyle Street, Finnieston',
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
          time: '9:00',
          title: 'Breakfast — Café Gandolfi',
          kind: 'food',
          blurb:
            "Merchant City classic since 1979, ~4 min from the flat — eggs, smoked haddock, proper coffee. A hearty sit-down (opens 8am) to fuel the Cathedral–Necropolis–Barras walking day.",
          maps: mapsUrl('Cafe Gandolfi Albion Street'),
          pairing: 'Coffee and a kipper if you\'re feeling Scottish.',
        },
        {
          time: '10:00',
          title: 'Glasgow Cathedral',
          kind: 'sight',
          blurb:
            '800-year-old Gothic, free. The atmospheric lower church is the bit people miss. Castle St.',
          transport: '~20-min walk east of Buchanan St, or a £6 cab.',
          maps: mapsUrl('Glasgow Cathedral'),
          pairing: 'Tea at Cathedral House across the road.',
          swap: "Rough morning after Friday? This cluster is pick-and-choose — Cathedral + Necropolis are the keepers, Provand's is an optional 2-min add. Roll in later if you need to; just leave ~2 hrs for the Barras before it shuts at 16:00.",
          image: localImg('glasgow-cathedral.jpg'),
          imageAlt: 'Glasgow Cathedral exterior, Castle Street',
        },
        {
          time: '10:45',
          title: "Provand's Lordship",
          kind: 'sight',
          optional: true,
          blurb:
            "Directly across Castle St from the Cathedral. Oldest house in Glasgow (1471) — one of only four medieval buildings to survive in the city. Free, tiny, 15-min visit. Easy add on the walk to the Necropolis.",
          maps: mapsUrl("Provand's Lordship Castle Street"),
          pairing: 'Nothing — save it for the climb up the hill.',
          image: localImg('provands-lordship.jpg'),
          imageAlt: "Provand's Lordship medieval stone house, Castle Street, Glasgow",
        },
        {
          time: '11:15',
          title: 'Glasgow Necropolis',
          kind: 'sight',
          blurb:
            'Victorian hilltop cemetery directly behind the Cathedral — 3,500 monuments, big city views, filming spot for The Batman. Pure Rick Steves.',
          maps: mapsUrl('Glasgow Necropolis'),
          pairing: 'Water — bring your own, it\'s a climb.',
          image: localImg('glasgow-necropolis.jpg'),
          imageAlt: 'Glasgow Necropolis Victorian hilltop cemetery, aerial view',
        },
        {
          time: '12:30',
          title: 'Lunch — Mesa, Dennistoun',
          kind: 'food',
          blurb:
            "~15-min walk east from the Necropolis up Duke St — Dennistoun's breakfast/lunch hero. Towering pastrami sandwiches, bread from a local baker, fluffy pancakes. From Mesa, ~15 min south to the Barras. Saint Luke's (Bain St, right next to the Barras) is the closer fallback if you'd rather skip the Dennistoun detour.",
          maps: mapsUrl('Mesa Duke Street Dennistoun'),
          pairing: 'A flat white before the Barras dig.',
          image: localImg('mesa-dennistoun.jpg'),
          imageAlt: 'Mesa café interior, Duke Street, Dennistoun',
        },
        {
          time: '13:30',
          title: 'The Barras Market',
          kind: 'sight',
          blurb:
            "Right next door — weekends only, **closes at 16:00 sharp**. Ramshackle flea market: vinyl, vintage, junk, characters, street food. ~2.5 hrs to dig before traders pack up. Push lunch earlier (12:00) if you want longer here.",
          maps: mapsUrl('The Barras Market Gallowgate'),
          pairing: 'Can of Tennent\'s from a stall if it\'s warm; hot toddy if it\'s not.',
          image: localImg('barras-market.jpg'),
          imageAlt: 'The Barras Market, Gallowgate, Glasgow',
        },
        {
          time: '15:30',
          title: 'WEST Brewery, Glasgow Green',
          kind: 'drink',
          optional: true,
          blurb:
            '10-min walk south from the Barras across Glasgow Green. German-style brewery in the old Templeton carpet factory — afternoon pint with seating outside in good weather.',
          maps: mapsUrl('WEST Brewery Glasgow Green'),
          pairing: 'St Mungo, or the Munich Red.',
          swap: 'Barras still pulling you in? Skip WEST and keep digging — it\'ll be there next trip.',
          image: localImg('west-brewery-templeton.jpg'),
          imageAlt: 'Templeton Building (WEST Brewery), Glasgow Green',
        },
        {
          time: '17:30',
          title: 'Cab back, reset at the flat',
          kind: 'note',
          blurb:
            "10-min cab from Glasgow Green back to the Spires. Half-hour in the living room before dinner — Sunday is Stirling, you'll want some battery. Important: from here the rest of the night is all central (no more east-end runs).",
          pairing: 'Glass of water and a coffee — the long evening is coming.',
        },
        {
          time: '19:30',
          title: 'Dinner — Margo',
          kind: 'food',
          blurb:
            "Scottish small plates by the Ox and Finch / Ka Pao team — at 66 Trongate in the Merchant City, so genuinely walkable from any central hotel. The right pick for staying central after the Barras day. **Booked 19:30.**",
          booking: { label: 'Booking', url: 'https://www.margorestaurant.co.uk/' },
          maps: mapsUrl('Margo Restaurant Trongate Glasgow'),
          pairing: 'Whatever\'s on the wine list.',
          swap:
            "Booked out? Ox and Finch in Finnieston (sister restaurant, ~15-min cab) is the small-plates fallback.",
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
          image: localImg('sub-club.png'),
          imageAlt: 'Sub Club, Jamaica Street, Glasgow',
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
          time: '~8:45',
          title: 'Breakfast — grab on the way to the train',
          kind: 'food',
          blurb:
            "Keep the early start simple. There's a Greggs at 100 George St, basically on the line to Queen St and open from ~8am Sundays — cheap roll, done. Queen Street station itself has coffee carts (92 Degrees, Tinderbox, Costa) for a coffee and a pastry, but no Greggs/M&S inside (that's Central). Want proper coffee? Spitfire (55 High St, opens 8am daily) is a short detour east.",
          maps: mapsUrl('Greggs 100 George Street Glasgow'),
          pairing: 'Coffee for the platform. Pints come in Stirling.',
        },
        {
          time: '~9:30',
          title: 'Train: Queen St → Stirling',
          kind: 'transport',
          blurb:
            "ScotRail direct, ~30 min, usually 2–4 per hour. Buy a return — cheaper than two singles.",
          transport:
            'From Glasgow Queen Street (high level). Sunday service is thinner than weekdays — confirm the last train back before you head out.',
          booking: { label: 'ScotRail journey planner', url: 'https://www.scotrail.co.uk/' },
          pairing: 'Take-out coffee from the station Pret. Pubs come later.',
          image: localImg('queen-street-station.jpg'),
          imageAlt: 'Glasgow Queen Street station exterior',
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
          image: localImg('stirling-castle.jpg'),
          imageAlt: 'Stirling Castle on its rock, aerial view',
        },
        {
          time: '13:00',
          title: 'Old Town wander + pub lunch',
          kind: 'food',
          blurb:
            "Walk the wynds down from the castle. Lunch at **The Portcullis** (Sun food from 11:30, pub right by the castle esplanade — Settle Inn doesn't open till 15:00 on Sundays so skip it). Church of the Holy Rude is across the road — gorgeous Gothic exterior, but interior is **Sunday tours only at 14:00 / 16:30** if you want in.",
          maps: 'https://www.google.com/maps/search/?api=1&query=The+Portcullis+Stirling',
          pairing: 'A pint of Williams Bros Caesar Augustus at the Portcullis.',
          swap: "Tempted by the Wallace Monument? It's ~2 hrs door-to-door across town and won't fit with the 16:30 train and the Crabshakk booking — left out on purpose. Castle + a relaxed Old Town afternoon is the better play.",
          image: localImg('portcullis-stirling.jpg'),
          imageAlt: 'The Portcullis Hotel pub, Stirling, near the castle',
        },
        {
          time: '~16:30',
          title: 'Train: Stirling → Queen St',
          kind: 'transport',
          blurb:
            'Aim to be back in Glasgow by ~17:30 so the evening plan stays intact. Sunday service is thinner — do NOT wing the last train.',
          booking: { label: 'ScotRail journey planner', url: 'https://www.scotrail.co.uk/' },
          pairing: 'Can of Tennent\'s from a corner shop for the ride.',
        },
        {
          time: '18:30',
          title: 'Crabshakk, Finnieston',
          kind: 'food',
          blurb:
            "Proper last-night dinner — the Finnieston seafood institution. Counter seating, no-frills, exceptional. 15-min cab from the centre. Order the langoustines. **Booked 18:30.**",
          booking: { label: 'Booking', url: 'https://www.crabshakk.com/' },
          maps: mapsUrl('Crabshakk Argyle Street'),
          pairing: 'A glass of Muscadet, or a cold lager.',
          swap: "Booked out? Six by Nico (Finnieston, tasting menu) or Ox and Finch next door.",
          image: localImg('crabshakk.jpg'),
          imageAlt: 'Crabshakk seafood bar, Argyle Street, Finnieston',
        },
        {
          time: '21:00',
          title: 'Nice N Sleazy',
          kind: 'drink',
          blurb:
            "Grungy Sauchiehall St institution — cheap drinks, jukebox, basement gigs if anything's on (you can stay upstairs). The dive bar of the trip. 10-min cab from Crabshakk, then walk to the Clutha after.",
          maps: mapsUrl('Nice N Sleazy Sauchiehall Street'),
          pairing: 'Cheap house lager, or a boilermaker. Red Bull & vodka if the day catches up.',
          image: localImg('nice-n-sleazy.jpg'),
          imageAlt: "Nice N Sleazy basement stage, Sauchiehall Street",
        },
        {
          time: '23:00',
          title: 'The Clutha — last pint',
          kind: 'drink',
          optional: true,
          blurb:
            "Riverside pub steeped in Glasgow history, live music in the corner most nights, cheap pizza. The fitting last-night pint. 167–169 Stockwell St — 10-min walk south from Sleazy's. Energy flagging? Order a Red Bull & Jäger, not a yawn.",
          maps: mapsUrl('The Clutha Stockwell Street'),
          pairing: 'A pint of Guinness + a dram.',
          image: localImg('the-clutha.jpg'),
          imageAlt: 'The Clutha bar, Stockwell Street, Glasgow',
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
          title: 'Slow breakfast — Café Gandolfi',
          kind: 'food',
          blurb: "No rush — the flight's not till evening. Back to Café Gandolfi (Albion St, ~4 min) for a proper sit-down send-off — the Merchant City classic since 1979, big pot of tea and all.",
          maps: mapsUrl('Cafe Gandolfi Albion Street'),
          pairing: 'Big pot of tea. Or a Bloody Mary if you\'re already in goodbye mode.',
        },
        {
          time: '10:30',
          title: 'Tenement House',
          kind: 'sight',
          blurb:
            "NTS-preserved Edwardian working-class tenement flat at 145 Buccleuch Street, Garnethill — exactly as the last tenant Agnes Toward left it in 1965, gas lights and all. 30–45 min visit, central (10-min walk north from Sauchiehall), £9. The quiet weird-small-museum slot of the trip.",
          booking: { label: 'Book timed entry (NTS)', url: 'https://www.nts.org.uk/visit/places/tenement-house' },
          maps: mapsUrl('Tenement House 145 Buccleuch Street Garnethill'),
          pairing: 'Coffee at the GFT café on the walk down to the Laurieston.',
          swap: 'Sold out for your slot? Skip straight to the Laurieston for a longer half.',
          image: localImg('tenement-house.jpg'),
          imageAlt: 'The Tenement House, 145 Buccleuch Street, Garnethill',
        },
        {
          time: '~12:00',
          title: 'The Laurieston — last half',
          kind: 'drink',
          blurb:
            "Walk south through town and over the Bridge St footbridge — 15 min from the Tenement House. Cash-only 1960s time-warp pub: formica, mirrored bar, vinyl seats, regulars. A pint, 30 minutes, you're done. The most Glasgow goodbye.",
          maps: mapsUrl('The Laurieston Bar Bridge Street'),
          pairing: 'Fyne Ales Jarl, or a half-and-half (half-pint + whisky chaser).',
          image: localImg('laurieston-bar.jpg'),
          imageAlt: 'The Laurieston Bar, Bridge Street, Glasgow',
        },
        {
          time: '~13:00',
          title: 'Lunch + collect bags',
          kind: 'food',
          blurb: 'Back from the Laurieston — eat central and grab the backpacks. Plenty of buffer before the airport run.',
          pairing: 'A pint with the bags — last one in Glasgow.',
        },
        {
          time: '14:30',
          title: 'Leave for the airport',
          kind: 'transport',
          blurb: '500 bus or cab. Allow ~2h before a connecting international flight.',
          pairing: 'Take-out coffee for the bus.',
        },
        {
          time: '17:00',
          title: 'Fly GLA → AMS → BER',
          kind: 'transport',
          blurb:
            'Land Berlin 22:10. (55-min AMS connection on the way in is fine; just don\'t dawdle through the non-Schengen check.)',
          pairing: "A final airport Tennent's or BrewDog at the gate.",
          image: localImg('glasgow-airport-departures.jpg'),
          imageAlt: 'Glasgow Airport check-in hall, departures',
        },
      ],
    },
  ] satisfies Day[],
};

export type Trip = typeof trip;
