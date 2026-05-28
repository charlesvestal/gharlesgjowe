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
          image: 'https://img02.restaurantguru.com/c174-Restaurant-Cashel-Coffee-and-Dry-Goods-food.jpg',
          imageAlt: 'Cashel Coffee food spread',
        },
        {
          name: "Gizzi's Espresso Bar",
          area: 'Shawlands',
          meal: 'breakfast',
          blurb: 'Steak lorne roll with nduja crumb — the cult Southside breakfast.',
          note: 'Wed–Sun only, closed Mon & Tue.',
          maps: mapsUrl("Gizzi's Espresso Bar Shawlands"),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/bd/2a/c4/photo0jpg.jpg',
          imageAlt: "Gizzi's Espresso Bar, Shawlands",
        },
        {
          name: "Ranjit's Kitchen",
          area: 'Pollokshields',
          meal: 'lunch',
          blurb: 'Punjabi home cooking, vegetarian only — dhal, saag, samosas locals fight over. The non-Mother India curry.',
          note: 'Cash only · Closed Mon · no bookings.',
          maps: mapsUrl("Ranjit's Kitchen Pollokshaws Road"),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/4a/21/36/the-thali-is-a-great.jpg',
          imageAlt: "Ranjit's Kitchen thali",
        },
        {
          name: 'Philadelphia',
          area: 'Kelvinbridge',
          meal: 'snack / dinner',
          blurb: 'The chippy locals actually go to — same family 40 years. Skip the touristy Blue Lagoon.',
          maps: mapsUrl('Philadelphia chippy Great Western Road'),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/d8/a0/31/front-of-shop.jpg',
          imageAlt: 'Philadelphia Fish & Chicken Bar, Great Western Road',
        },
        {
          name: 'Tantrum Doughnuts',
          area: 'Centre / Old Dumbarton Rd',
          meal: 'snack',
          blurb: 'Proper yeast-raised doughnuts. The local sweet stop.',
          note: 'Old Dumbarton branch closed Mon; Gordon St branch closed Sun.',
          maps: mapsUrl('Tantrum Doughnuts'),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/56/f4/98/tantrum-doughnuts.jpg',
          imageAlt: 'Tantrum Doughnuts display',
        },
        {
          name: 'Boca',
          area: 'Strathbungo',
          meal: 'lunch',
          blurb: 'Overstuffed artisan sandwiches. Quiet Southside hero.',
          maps: mapsUrl('Boca Strathbungo'),
          image: 'https://shupxpgnxvmicfkbcsru.supabase.co/storage/v1/object/public/venue-photos/48b67f72-3b58-4877-b2ac-0bc2a2edb824/1.jpg',
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
          image: 'https://www.foodieexplorers.co.uk/wp-content/uploads/2019/04/A4E0C4CB-2EF1-418D-913C-E84EEE66AFFE.jpeg',
          imageAlt: "Errol's Hot Pizza, Govanhill",
        },
        {
          name: "Frank's Pizza",
          area: 'Dennistoun',
          meal: 'snack / dinner',
          blurb: 'NY slices, stand-up vibe. Pairs with a Mesa walk.',
          note: 'Wed–Sun only.',
          maps: mapsUrl("Frank's Pizza Duke Street Dennistoun"),
          image: 'https://www.frankspizza.uk/wp-content/uploads/2021/10/Franks1.png',
          imageAlt: "Frank's Pizza, Dennistoun",
        },
        {
          name: 'Bar Vini',
          area: 'Govanhill',
          meal: 'dinner',
          blurb: 'Neighbourhood Italian wine bar, weekly-changing pasta specials.',
          maps: mapsUrl('Bar Vini Victoria Road'),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/62/03/30/bar-vini.jpg',
          imageAlt: 'Bar Vini, Victoria Road, Govanhill',
        },
        {
          name: "Celino's",
          area: 'Dennistoun',
          meal: 'lunch / dinner',
          blurb: 'Italian deli + trattoria, 40+ years. Pasta and a pint, very East End.',
          maps: mapsUrl("Celino's Alexandra Parade"),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/df/c1/0e/img-20190122-232852-142.jpg',
          imageAlt: "Celino's, Alexandra Parade, Dennistoun",
        },
        {
          name: 'Corner Shop',
          area: 'West End',
          meal: 'lunch / dinner',
          blurb: 'Scots-Spanish small plates. Named Scotland\'s best wine bar 2025.',
          maps: mapsUrl('Corner Shop Old Dumbarton Road'),
          image: 'https://images.squarespace-cdn.com/content/v1/680670ffb73d9b098169783b/43822534-dc09-4a8a-9a0d-5a6069952066/SpouseCornerShopFullSize57.jpg',
          imageAlt: 'Corner Shop wine bar, Old Dumbarton Road',
        },
        {
          name: 'Brett',
          area: 'West End',
          meal: 'dinner',
          blurb: "Cail Bruich's cooler sibling — Michelin-recommended, counter seats. Hits at the top of £40.",
          note: 'Book ahead.',
          maps: mapsUrl('Brett Great Western Road'),
          image: 'https://images.squarespace-cdn.com/content/v1/61d46209ed2d3d6235044f82/292bd6db-8331-4b76-b314-e3731c399c13/annim578.jpg',
          imageAlt: 'Brett restaurant interior, West End Glasgow',
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
          image: 'https://static.wixstatic.com/media/3c31ef_f6d7650646c64cbd89c42531d4702375~mv2.jpg',
          imageAlt: 'GaGa restaurant dish, Partick',
        },
        {
          name: 'Kimchi Cult',
          area: 'West End',
          meal: 'lunch / snack',
          blurb: 'Korean street food — banh-mi-meets-bibimbap energy. Fills the Hanoi Bike Shop hole (RIP).',
          note: 'Closed Mon.',
          maps: mapsUrl('Kimchi Cult Chancellor Street'),
          image: 'https://www.foodieexplorers.co.uk/wp-content/uploads/2016/04/Kimchi_cult_bibimbap-1.jpg',
          imageAlt: 'Kimchi Cult bibimbap bowl',
        },
        {
          name: 'Sylvan',
          area: 'Woodlands',
          meal: 'lunch / dinner',
          blurb: 'Vegan/veg wine bar near Park Circus. Easy West End drop-in.',
          note: 'Closed Sun.',
          maps: mapsUrl('Sylvan Woodlands'),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/46/34/ce/caption.jpg',
          imageAlt: 'Sylvan vegan wine bar dish, Woodlands',
        },
      ],
    },
  ] satisfies FoodGroup[],
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
          image:
            'https://upload.wikimedia.org/wikipedia/commons/1/14/Glasgow_Airport_-_terminal_building_-_geograph.org.uk_-_2922025.jpg',
          imageAlt: 'Glasgow Airport terminal building exterior',
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
          image:
            'https://images.squarespace-cdn.com/content/v1/66f276e6a3e81068b13d74f9/6f081b26-f9b8-4d09-a924-9fd82f5f99ff/MILLER+ST+2.jpg',
          imageAlt: 'Paesano Pizza Miller Street wood-fired oven and counter',
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
          image:
            'https://upload.wikimedia.org/wikipedia/commons/a/a4/Gallery_of_Modern_Art%2C_Glasgow%2C_front_view%2C_2018-06-27.jpg',
          imageAlt: 'Gallery of Modern Art Glasgow front facade with Duke of Wellington statue',
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
          image: 'https://thepotstill.co.uk/wp-content/uploads/2024/08/PotStill-OM-1-2-copy-1440px.jpg',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/King_Tut%27s_Wah_Wah_Hut_1.jpg',
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
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f4/a4/7e/dark-chocolate-and-raspberry.jpg',
          imageAlt: 'Cottonrake Bakery pastry — dark chocolate and raspberry tart',
        },
        {
          time: '11:00',
          title: 'Kelvingrove Art Gallery & Museum',
          kind: 'sight',
          blurb:
            "Free and superb — Dalí's Christ of St John of the Cross, a real Spitfire. The free 1pm organ recital is a Glasgow institution; time the visit around it. Plan ~2 hrs. (Fri opens 11:00.) Subway: Kelvinhall, 5-min walk.",
          maps: mapsUrl('Kelvingrove Art Gallery and Museum'),
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Kelvingrove_Art_Gallery_and_Museum_1.jpg',
          imageAlt: 'Kelvingrove Art Gallery and Museum red sandstone exterior',
        },
        {
          time: '13:30',
          title: 'Quick lunch on Byres Rd',
          kind: 'food',
          blurb: '10-min walk north from Kelvingrove. The University Café (1918 art-deco caff, fish & chips) or the Curlers Rest for pub grub — both right by the Uni.',
          maps: mapsUrl('University Cafe Byres Road'),
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/83/f5/df/caption.jpg',
          imageAlt: 'University Café art-deco interior, Byres Road',
        },
        {
          time: '14:30',
          title: 'University of Glasgow + Hunterian',
          kind: 'sight',
          blurb:
            'Walk the Gilbert Scott cloisters (proper Hogwarts) — 5 min from the Uni Café. Free Hunterian Museum is the nerdy highlight.',
          maps: mapsUrl('University of Glasgow Hunterian Museum'),
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/University_of_Glasgow_Main_Building_-_rear_aspect.jpg',
          imageAlt: 'University of Glasgow Gilbert Scott main building',
        },
        {
          time: '16:00',
          title: 'Ashton Lane',
          kind: 'drink',
          blurb: 'Cobbled lane strung with fairy lights, 3 min from the Uni — afternoon pint and a wander. Brel for a beer garden, or Òran Mór across Byres Rd.',
          maps: mapsUrl('Ashton Lane'),
          pairing: 'Innis & Gunn oak-aged.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Ashton_Lane_%28geograph_7708250%29.jpg',
          imageAlt: 'Ashton Lane cobbled street with fairy lights, West End Glasgow',
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
          image: 'https://www.motherindia.co.uk/wp-content/uploads/2021/03/MotherIndia_restaurant1.jpg',
          imageAlt: 'Mother India restaurant dining room, Finnieston',
        },
        {
          time: '20:30',
          title: 'Finnieston strip — final pints',
          kind: 'drink',
          blurb: "Mother India spills you onto Argyle St where all the bars are — stay put. The Ben Nevis (whisky bar, trad folk in the corner) is the keeper; BrewDog two doors down for a craft pint; Lebowskis if you want a White Russian. One more, maybe two, then walk back.",
          maps: mapsUrl('Ben Nevis bar Argyle Street'),
          pairing: 'A Highland malt at the Ben Nevis; Joker IPA at BrewDog.',
          swap: 'Knackered after the curry? End at Mother India, walk back along Argyle.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/The_Ben_Nevis_bar_%28geograph_6000023%29.jpg',
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
          time: '10:00',
          title: 'Glasgow Cathedral',
          kind: 'sight',
          blurb:
            '800-year-old Gothic, free. The atmospheric lower church is the bit people miss. Castle St.',
          transport: '~20-min walk east of Buchanan St, or a £6 cab.',
          maps: mapsUrl('Glasgow Cathedral'),
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Glasgow-cathedral-may-2007.jpg',
          imageAlt: 'Glasgow Cathedral exterior, Castle Street',
        },
        {
          time: '11:00',
          title: 'Glasgow Necropolis',
          kind: 'sight',
          blurb:
            'Victorian hilltop cemetery directly behind the Cathedral — 3,500 monuments, big city views, filming spot for The Batman. Pure Rick Steves.',
          maps: mapsUrl('Glasgow Necropolis'),
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Glasgow_Necropolis_-_aerial_-_2025-04-17_01.jpg/3840px-Glasgow_Necropolis_-_aerial_-_2025-04-17_01.jpg',
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
          image: 'https://dennistoun.co.uk/uploads/576_mesa_m.jpg',
          imageAlt: 'Mesa café interior, Duke Street, Dennistoun',
        },
        {
          time: '13:30',
          title: 'The Barras Market',
          kind: 'sight',
          blurb:
            "Right next door — weekends only, **closes at 16:00 sharp**. Ramshackle flea market: vinyl, vintage, junk, characters, street food. ~2.5 hrs to dig before traders pack up. Push lunch earlier (12:00) if you want longer here.",
          maps: mapsUrl('The Barras Market Gallowgate'),
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Barras_Market%2C_Glasgow.jpg',
          imageAlt: 'The Barras Market, Gallowgate, Glasgow',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Templeton_Business_Centre%2C_Glasgow_Green_%286059112448%29.jpg',
          imageAlt: 'Templeton Building (WEST Brewery), Glasgow Green',
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
          title: 'Dinner — Ox and Finch',
          kind: 'food',
          blurb:
            "Finnieston's reliably-great Mediterranean small plates — ~15-min cab from centre. The default after a long Barras day. BOOK AHEAD.",
          booking: { label: 'Book a table', url: 'https://oxandfinch.com/' },
          maps: mapsUrl('Ox and Finch Finnieston'),
          pairing: 'Whatever\'s on the wine list.',
          swap:
            "Celentano's (Italian small plates, Michelin-guide) was the move but their Cathedral House site closed Dec 2025; they're targeting an April 2026 reopen at Arthouse Glasgow on Bath St — worth checking closer to the date if you'd rather it.",
          image: 'https://www.oxandfinch.com/wp-content/uploads/2025/03/0O1A2365.jpg',
          imageAlt: 'Ox and Finch small plates, Finnieston',
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
          image: 'https://subclub.co.uk/images/SUBCLUB_REOPENING_DIGITAL_V10_NORMAL_WEB_SPLASH_IMAGE_MED.png',
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
          time: '~9:30',
          title: 'Train: Queen St → Stirling',
          kind: 'transport',
          blurb:
            "ScotRail direct, ~30 min, usually 2–4 per hour. Buy a return — cheaper than two singles.",
          transport:
            'From Glasgow Queen Street (high level). Sunday service is thinner than weekdays — confirm the last train back before you head out.',
          booking: { label: 'ScotRail journey planner', url: 'https://www.scotrail.co.uk/' },
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/2025_at_Glasgow_Queen_Street_station_-_exterior.JPG',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Stirling_Castle_Aerial_Photo.jpg',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/The_Portcullis_Hotel%2C_Stirling_-_geograph.org.uk_-_4236356.jpg',
          imageAlt: 'The Portcullis Hotel pub, Stirling, near the castle',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/The_Wallace_Monument%2C_Stirling.JPG',
          imageAlt: 'National Wallace Monument on Abbey Craig, Stirling',
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
          title: 'Crabshakk, Finnieston',
          kind: 'food',
          blurb:
            "Proper last-night dinner — the Finnieston seafood institution. Counter seating, no-frills, exceptional. Book ahead, it's small. 15-min cab from the centre. Order the langoustines.",
          booking: { label: 'Book a table', url: 'https://www.crabshakk.com/' },
          maps: mapsUrl('Crabshakk Argyle Street'),
          pairing: 'A glass of Muscadet, or a cold lager.',
          swap: "Booked out? Six by Nico (Finnieston, tasting menu) or Ox and Finch next door.",
          image: 'https://images.squarespace-cdn.com/content/v1/61f6af2eda35940165dc0042/1655217624126-WKXHXWEZQL8O52VB6ABI/crabshakk+finnieston+exterior+photo.jpg',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Stephen_Lawrie_of_The_Telescopes_getting_ready_to_go_on_stage_at_Nice_N_Sleazy%2C_Glasgow._October_2023.jpg',
          imageAlt: "Nice N Sleazy basement stage, Sauchiehall Street",
        },
        {
          time: '23:00',
          title: 'The Clutha — last pint',
          kind: 'drink',
          blurb:
            "Riverside pub steeped in Glasgow history, live music in the corner most nights, cheap pizza. The fitting last-night pint. 167–169 Stockwell St — 10-min walk south from Sleazy's. Energy flagging? Order a Red Bull & Jäger, not a yawn.",
          maps: mapsUrl('The Clutha Stockwell Street'),
          pairing: 'A pint of Guinness + a dram.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/The_Clutha_in_Glasgow_%2817833190138%29.jpg',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Glasgow_City_-_The_Laurieston_Bar%2C_58_Bridge_Street_And_2_And_4_Nelson_Street_-_20231202154311.jpg',
          imageAlt: 'The Laurieston Bar, Bridge Street, Glasgow',
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/16-11-15-Glasgow_Airport-RR2_7002.jpg',
          imageAlt: 'Glasgow Airport check-in hall, departures',
        },
      ],
    },
  ] satisfies Day[],
};

export type Trip = typeof trip;
