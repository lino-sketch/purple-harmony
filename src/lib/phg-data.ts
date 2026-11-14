export interface Entertainer {
  id: string;
  name: string;
  role: string;
  category: "vocalist" | "instrumentalist" | "variety" | "duo";
  bio: string;
  popularSongs: string[];
  image: string;
  badge?: string;
  experienceYears: number;
  specialties: string[];
}

export const PHG_IMAGES = {
  logo: "https://vibe.filesafe.space/1794618008748425880/attachments/958b368e-8704-419b-a185-cd40b5032e53.webp",
  heroSingingAgedCare:
    "https://vibe.filesafe.space/1794618008748425880/attachments/ca388ac8-5bc3-4419-90f2-2a58d203bc52.webp",
  linoPortrait1:
    "https://vibe.filesafe.space/1794618008748425880/attachments/857ee3a3-47f1-4c52-abf5-76b3c0da49c7.webp",
  linoPortrait2:
    "https://vibe.filesafe.space/1794618008748425880/attachments/43ed98d0-9e1e-405f-940a-27c2030794ad.webp",
  linoPortraitWide:
    "https://vibe.filesafe.space/1794618008748425880/attachments/6cadc18a-00b6-46e8-a41a-0d90782c1386.webp",
  femaleSinger:
    "https://vibe.filesafe.space/1794618008748425880/assets/a89cf793-8209-4198-a984-e18961dafc72.jpg",
  pianist:
    "https://vibe.filesafe.space/1794618008748425880/assets/3c3de53d-abb4-4373-8dcd-5e42eacf86fd.jpg",
  acousticDuo:
    "https://vibe.filesafe.space/1794618008748425880/assets/361acb17-d75d-4427-9f7a-7e77d7978ab7.jpg",
};

export const ENTERTAINERS_DATA: Entertainer[] = [
  {
    id: "lino-ettia",
    name: "Lino Ettia",
    role: "Founder & Master Vocalist / Entertainer",
    category: "vocalist",
    badge: "Founder & Lead Performer",
    experienceYears: 20,
    bio: "With an electric stage presence, natural warmth, and decades of professional vocal performance, Lino has captivated hundreds of aged care communities across Australia. His charismatic sing-alongs, timeless classics, and joyful audience engagement bring nostalgia, dignity, and radiant smiles to residents.",
    popularSongs: [
      "Can't Help Falling in Love (Elvis)",
      "Fly Me to the Moon (Frank Sinatra)",
      "Sweet Caroline (Neil Diamond)",
      "Volare & That's Amore (Dean Martin)",
      "Unchained Melody (Righteous Brothers)",
    ],
    image: PHG_IMAGES.linoPortraitWide,
    specialties: [
      "50s-70s Golden Oldies",
      "Crooner & Ballads",
      "Interactive Sing-alongs",
      "Dementia-Sensitive Engagement",
    ],
  },
  {
    id: "kim-montalto",
    name: "Kim Montalto",
    role: "Acoustic Guitarist & Soulful Vocalist",
    category: "vocalist",
    badge: "Audience Favorite",
    experienceYears: 14,
    bio: "Kim brings gentle acoustic melodies and rich vocals that evoke fond memories. Specialising in folk, country, and retro acoustic classics, her warm temperament creates an inviting, heart-centered atmosphere.",
    popularSongs: [
      "Que Sera, Sera (Doris Day)",
      "You Are My Sunshine",
      "Country Roads (John Denver)",
      "Over the Rainbow (Judy Garland)",
    ],
    image: PHG_IMAGES.femaleSinger,
    specialties: ["Acoustic Folk", "Country & Western", "Memory Care Harmony"],
  },
  {
    id: "marcus-delaney",
    name: "Marcus Delaney",
    role: "Swing & Jazz Pianist / Crooner",
    category: "instrumentalist",
    badge: "Virtuoso",
    experienceYears: 18,
    bio: "Trained in classic jazz and swing traditions, Marcus performs beloved standards from the Great American Songbook, accompanying residents on lively piano swing and soft dinner music.",
    popularSongs: [
      "What a Wonderful World",
      "Moon River (Andy Williams)",
      "Autumn Leaves",
      "Ain't Misbehavin'",
    ],
    image: PHG_IMAGES.pianist,
    specialties: ["Great American Songbook", "Piano Solo & Sing-along", "Jazz Standards"],
  },
  {
    id: "bella-italia-duo",
    name: "Harmony Melodic Duo",
    role: "Accordion & Vocals",
    category: "duo",
    badge: "Themed Shows",
    experienceYears: 15,
    bio: "Celebrated for European heritage shows, Italian, Greek and multicultural festivity sets that have residents clapping, swaying, and singing along in their mother tongue.",
    popularSongs: ["O Sole Mio", "Santa Lucia", "Bella Ciao", "Besame Mucho"],
    image: PHG_IMAGES.acousticDuo,
    specialties: ["European & Multicultural", "Italian Classics", "Festive Celebrations"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Lino and the Purple Harmony Group brought pure magic to our lifestyle lounge. Even residents who normally remain quiet were clapping, humming, and beaming with delight. The energy is unmatched!",
    author: "Sarah Jenkins",
    role: "Lifestyle & Wellbeing Coordinator",
    facility: "Regis Aged Care, Melbourne",
  },
  {
    quote:
      "Booking professional performers who truly understand aged care and dementia communication used to be difficult. Purple Harmony Group makes it effortless, dependable, and deeply therapeutic.",
    author: "David McInerney",
    role: "Facility General Manager",
    facility: "Arcare Aged Care",
  },
  {
    quote:
      "Our residents talk about Lino's performance for days afterward. His warmth, respectful engagement, and magnificent singing make every visit feel like a red-carpet celebration.",
    author: "Elena Vasquez",
    role: "Diversional Therapist",
    facility: "BlueCross Community Care",
  },
];

export const SERVICE_PACKAGES = [
  {
    title: "Regular Lifestyle Sessions",
    description:
      "Consistent weekly or monthly live entertainment sessions that give residents joyful highlights to look forward to on the calendar.",
    features: [
      "Tailored 60-minute live interactive concert",
      "Repertoire customized to your residents' era",
      "Full self-contained sound system provided",
      "Dementia & memory care accredited performers",
    ],
    tag: "Most Popular",
  },
  {
    title: "Special Calendar Celebrations",
    description:
      "Grand performances for Mother's Day, Father's Day, Christmas, St. Patrick's, Italian Day, and milestone resident birthdays.",
    features: [
      "Themed costuming and curated specialty music",
      "Duo or solo options with sing-along lyric cards",
      "Photo opportunities with residents and visiting families",
      "Extended 75-90 minute festival showcase",
    ],
    tag: "High Energy",
  },
  {
    title: "Sensory & High-Care Sessions",
    description:
      "Intimate, gentle acoustic and vocal engagements tailored specifically for high-care, palliative, or calm memory-support wings.",
    features: [
      "Soft acoustic guitar, harp, or gentle piano",
      "Low-stimulation, heart-soothing familiar lullabies",
      "One-on-one eye contact & bedside visits",
      "Proven neurological grounding & anxiety reduction",
    ],
    tag: "Therapeutic",
  },
];
