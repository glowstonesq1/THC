const DEFAULT_TRIPS = [
  {
    id: 'bali-2025',
    title: 'Bali Soul Immersion',
    destination: 'Bali, Indonesia',
    tagline: 'Where the island breathes you in',
    description: 'Rice terraces, temple ceremonies, volcano sunrises and family dinners in the heart of Ubud. A journey inward disguised as a trip outward.',
    dates: 'September 12–22, 2025',
    duration: '10 nights',
    spotsTotal: 16, spotsAvailable: 4, spotsRequired: 8,
    price: '₹1,20,000', status: 'upcoming',
    highlights: ['Ubud jungle stay', 'Mount Batur sunrise hike', 'Cooking class', 'Waterfall day', 'Balinese healing ritual'],
    category: 'young-wild',
  },
  {
    id: 'rajasthan-2025',
    title: 'Royal Rajasthan',
    destination: 'Rajasthan, India',
    tagline: 'Palaces, dunes & the magic of the desert',
    description: "Forts that tell stories, camels that carry your soul, and sunsets that make you forget your name. Rajasthan is not a place — it's a feeling.",
    dates: 'October 3–10, 2025',
    duration: '7 nights',
    spotsTotal: 20, spotsAvailable: 11, spotsRequired: 10,
    price: '₹55,000', status: 'upcoming',
    highlights: ['Jaisalmer desert camp', 'Mehrangarh Fort', 'Blue City walk', 'Camel safari', 'Heritage hotel stay'],
    category: 'old-wise',
  },
  {
    id: 'greece-2025',
    title: 'Greek Island Hopping',
    destination: 'Athens · Santorini · Mykonos',
    tagline: 'Gods, cliffs & infinite blue',
    description: 'Three islands. Twelve strangers. One soul tribe by the end. The Aegean will do that to you.',
    dates: 'November 8–18, 2025',
    duration: '10 nights',
    spotsTotal: 14, spotsAvailable: 14, spotsRequired: 8,
    price: '₹2,10,000', status: 'open',
    highlights: ['Santorini caldera views', 'Acropolis sunset', 'Mykonos beach clubs', 'Sailing day', 'Local taverna dinners'],
    category: 'all',
  },
  {
    id: 'spiti-2024',
    title: 'Spiti Valley Expedition',
    destination: 'Himachal Pradesh, India',
    tagline: 'Cold desert, warm hearts',
    description: 'At 4,000 metres, the air is thin but the connections are thick. Spiti strips you bare and gives you back something real.',
    dates: 'August 2024',
    duration: '8 nights',
    spotsTotal: 12, spotsAvailable: 0, spotsRequired: 6,
    price: '₹45,000', status: 'past',
    highlights: ['Key Monastery', 'Chandratal Lake', 'Village homestay', 'Stargazing camp', 'Pin Valley trek'],
    category: 'young-wild',
  },
  {
    id: 'vietnam-2024',
    title: 'Vietnam North to South',
    destination: 'Hanoi · Hoi An · Ho Chi Minh',
    tagline: 'Pho, lanterns & million watt smiles',
    description: 'Three cities that each have their own heartbeat. We moved slow, ate everything, and fell in love with Vietnam at every turn.',
    dates: 'October 2024',
    duration: '12 nights',
    spotsTotal: 16, spotsAvailable: 0, spotsRequired: 8,
    price: '₹95,000', status: 'past',
    highlights: ['Halong Bay cruise', 'Hoi An lantern festival', 'Street food tours', 'Mekong Delta', 'Cu Chi Tunnels'],
    category: 'all',
  },
  {
    id: 'portugal-2024',
    title: 'Portugal & The Atlantic',
    destination: 'Lisbon · Porto · Sintra · Algarve',
    tagline: 'Fado, tiles & ocean wind',
    description: 'Portugal moves at its own gentle pace. Slow mornings with pastel de nata, long evenings with Vinho Verde, and sunsets over the Atlantic that end conversations with silence.',
    dates: 'June 2024',
    duration: '9 nights',
    spotsTotal: 14, spotsAvailable: 0, spotsRequired: 8,
    price: '₹1,40,000', status: 'past',
    highlights: ['Sintra palace trail', 'Porto wine cave visit', 'Algarve sea caves', 'Fado evening', 'Tram 28 Lisbon'],
    category: 'old-wise',
  },
];

function getTrips() {
  try {
    const stored = localStorage.getItem('thc_trips');
    return stored ? JSON.parse(stored) : DEFAULT_TRIPS;
  } catch { return DEFAULT_TRIPS; }
}

function saveTrips(trips) {
  localStorage.setItem('thc_trips', JSON.stringify(trips));
}
