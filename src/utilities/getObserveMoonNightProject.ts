export interface ObserveMoonLocation {
  id?: string;
  name: string;
  address?: string;
  isMainLocation?: boolean;
}

export interface ObserveMoonPartner {
  name: string;
  partnershipType?: string;
  websiteUrl?: string;
  logo?: any;
}

export interface ObserveMoonAgendaItem {
  time: string;
  stage: string;
  title: string;
  description: string;
}

export interface ObserveMoonAgendaDay {
  dayId: string;
  dayLabel: string;
  date: string;
  shortDate: string;
  partnerBadge?: string;
  items: ObserveMoonAgendaItem[];
}

export interface ObserveMoonEventResult {
  id?: string | number;
  slug?: string;
  title?: string;
  year?: string;
  shortDescription?: string;
  description?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locations?: ObserveMoonLocation[];
  agenda?: any[];
  agendaDays?: ObserveMoonAgendaDay[];
  partners?: ObserveMoonPartner[];
  feedbackUrl?: string;
  isFeedbackActive?: boolean;
  registrationUrl?: string;
  isRegistrationActive?: boolean;
  isPaid?: boolean;
  ticketPrice?: string;
  bankAccountNumber?: string;
  paymentDetails?: string;
  listingImage?: any;
  heroImage?: any;
  isFeatured?: boolean;
}

export async function getObserveMoonNightProject(
  year = "2026",
): Promise<ObserveMoonEventResult | null> {
  const day1Items: ObserveMoonAgendaItem[] = [
    {
      time: "07:00 PM",
      stage: "SESSION 01",
      title: "Inauguration & Joint Collaboration Briefing",
      description:
        "Welcome address by SEDS Sri Lanka & SEDS India leadership, live broadcast introduction, and telescope imaging overview powered by SEDS Celestia.",
    },
    {
      time: "07:25 PM",
      stage: "SESSION 02",
      title:
        "Lunar Maria Keynote: Northern & Eastern Basaltic Seas (7 Maria)",
      description:
        "Scientific keynote on lunar basalt maria formation covering Day 1 features: Mare Frigoris (Sea of Cold), Mare Imbrium (Sea of Rains), Mare Nubium (Sea of Clouds), Mare Serenitatis (Sea of Serenity), Mare Tranquillitatis (Sea of Tranquility), Mare Fecunditatis (Sea of Fertility), and Mare Crisium (Sea of Crises).",
    },
    {
      time: "08:00 PM",
      stage: "SESSION 03",
      title:
        "Telescopic Target 01: Plato Crater & Mare Frigoris / Mare Imbrium",
      description:
        "Live high-magnification telescope stream kicks off! High-resolution observation of Plato Crater (Impact Crater #01) with its dark basaltic lava-filled floor situated between Mare Frigoris and Mare Imbrium.",
    },
    {
      time: "08:45 PM",
      stage: "SESSION 04",
      title:
        "Telescopic Target 03: Apennine Mountains (Montes Apenninus)",
      description:
        "Guided telescopic exploration of the towering Apennine Mountains (Montes Apenninus, Mountain Range #03) rising over 5,000 meters along the lunar terminator bordering Mare Imbrium and Mare Serenitatis.",
    },
    {
      time: "09:30 PM",
      stage: "SESSION 05",
      title:
        "Telescopic Target 05 & Apollo Sites: Alphonsus Crater, Apollo 11 & Apollo 12",
      description:
        "Close-up inspection of Alphonsus Crater (Complex Crater #05 with dark pyroclastic volcanic vents), along with historic Apollo landing sites: Apollo 11 at Mare Tranquillitatis (Sea of Tranquility) and Apollo 12 at Oceanus Procellarum (Ocean of Storms).",
    },
    {
      time: "10:15 PM",
      stage: "SESSION 06",
      title: "Live Moon Trivia Quiz, Q&A & Day 1 Wrap-Up",
      description:
        "Interactive live lunar astronomy trivia quiz, Q&A with telescope operators and astrophysicists, Day 2 preview, and digital certificate announcements before concluding at 11:00 PM.",
    },
  ];

  const day2Items: ObserveMoonAgendaItem[] = [
    {
      time: "07:00 PM",
      stage: "SESSION 01",
      title: "Day 2 Inauguration & Streaming Partner Briefing",
      description:
        "Welcome address by SEDS Sri Lanka, SEDS India & SEDS Kumaraguru teams, Day 1 recap, and introduction to the Day 2 live telescopic observation setup.",
    },
    {
      time: "07:25 PM",
      stage: "SESSION 02",
      title:
        "Lunar Maria Keynote: Central, Limb & Serpent Seas (8 Maria)",
      description:
        "Scientific presentation exploring 8 basaltic maria: Mare Vaporum (Sea of Vapors), Mare Insularum (Sea of Isles), Mare Nectaris (Sea of Nectar), Mare Humboldtianum (Humboldt’s Sea), Mare Anguis (Serpent Sea), Mare Undarum (Sea of Waves), Mare Spumans (Sea of Foam), and Mare Marginis (Border Sea).",
    },
    {
      time: "08:00 PM",
      stage: "SESSION 03",
      title:
        "Telescopic Targets 02 & 04: Alpine Valley (Vallis Alpes) & Catena Davy",
      description:
        "Live telescope stream powered by SEDS Kumaraguru! High-resolution observation of Alpine Valley / Vallis Alpes (Lunar Rift Valley #02) slicing through Montes Alpes, and the enigmatic Catena Davy (Craterlet Chain #04).",
    },
    {
      time: "08:45 PM",
      stage: "SESSION 04",
      title:
        "Telescopic Target 06: Straight Wall (Rupes Recta) Fault Escarpment",
      description:
        "Close-up telescopic sweep of the famous Straight Wall (Rupes Recta, Fault Escarpment #06)—a 110-km long tectonic fault in eastern Mare Nubium casting dramatic terminator shadows.",
    },
    {
      time: "09:30 PM",
      stage: "SESSION 05",
      title:
        "Historic Apollo Landing Sites: Apollo 14, 15, 16 & 17 Exploration",
      description:
        "Detailed telescopic sweep of historic lunar landing zones: Apollo 14 (Fra Mauro Formation), Apollo 15 (Hadley-Apennine / Hadley Rille), Apollo 16 (Descartes Highlands), and Apollo 17 (Taurus-Littrow Valley).",
    },
    {
      time: "10:15 PM",
      stage: "SESSION 06",
      title: "Grand Finale Moon Trivia Quiz, Q&A & Certificate Awards",
      description:
        "Interactive grand finale lunar astronomy quiz competition, audience Q&A with regional chapter astronomers, and final certificate distribution announcements before concluding at 11:00 PM.",
    },
  ];

  const agendaDays: ObserveMoonAgendaDay[] = [
    {
      dayId: "day-1",
      dayLabel: "Day 01",
      date: "Monday, September 21, 2026",
      shortDate: "Mon, Sep 21",
      partnerBadge: "Streamed via SEDS Celestia",
      items: day1Items,
    },
    {
      dayId: "day-2",
      dayLabel: "Day 02",
      date: "Tuesday, September 22, 2026",
      shortDate: "Tue, Sep 22",
      partnerBadge: "Streamed with SEDS Kumaraguru",
      items: day2Items,
    },
  ];

  return {
    id: `moon-${year}`,
    slug: `observe-the-moon-night-${year}`,
    title: `International Observe the Moon Night ${year}`,
    year,
    shortDescription:
      "Annual global celebration of lunar science and exploration with SEDS Sri Lanka in collaboration with SEDS India, featuring live 2-day lunar telescope streaming powered by SEDS Celestia and SEDS Kumaraguru.",
    description:
      "Join SEDS Sri Lanka and SEDS India for a 2-day interactive virtual celebration of International Observe the Moon Night 2026. Experience live high-definition lunar telescopic streaming provided by SEDS Celestia (Day 1) and SEDS Kumaraguru (Day 2), guided scientific sessions, and interactive discussions.",
    eventDate: "September 21 – 22, 2026",
    startTime: "2026-09-21T19:00:00.000+05:30",
    endTime: "2026-09-22T23:00:00.000+05:30",
    location: "Virtual Event (Online Live Stream)",
    locations: [
      {
        id: "virtual-stream",
        name: "Virtual Live Stream Hub",
        address: "Online Broadcast via SEDS Celestia & SEDS Kumaraguru",
        isMainLocation: true,
      },
    ],
    agenda: day1Items,
    agendaDays,
    partners: [
      {
        name: "InOMN (NASA)",
        partnershipType: "Global Initiative",
        websiteUrl: "https://moon.nasa.gov/observe-the-moon-night/",
        logo: {
          url: "/images/projects/iotm-logo.png",
          alt: "International Observe the Moon Night Official Logo",
        },
      },
      {
        name: "SEDS India",
        partnershipType: "Collaboration Partner",
        websiteUrl: "https://sedsindia.org",
        logo: {
          url: "/images/projects/seds_india_white_logo.png",
          alt: "SEDS India Logo",
        },
      },
      {
        name: "SEDS Celestia",
        partnershipType: "Streaming Partner",
        websiteUrl: "https://sedscelestia.org/",
        logo: {
          url: "/images/projects/seds-celestia.png",
          alt: "SEDS Celestia Logo",
        },
      },
      {
        name: "SEDS Kumaraguru",
        partnershipType: "Streaming Partner",
        websiteUrl: "https://facebook.com/kctseds/",
        logo: {
          url: "/images/projects/seds-kumraguru.png",
          alt: "SEDS Kumaraguru Logo",
        },
      },
    ],
    feedbackUrl: "https://tally.so/r/gD604M",
    isFeedbackActive: true,
    registrationUrl: "https://tally.so/r/vGl0pX",
    isRegistrationActive: true,
    listingImage: { url: "/images/projects/iotm-day-2026.png" },
    heroImage: { url: "/images/projects/iotm-day-2026.png" },
    isFeatured: true,
  };
}
