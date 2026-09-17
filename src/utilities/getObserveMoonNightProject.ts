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
  return {
    id: `moon-${year}`,
    slug: `observe-the-moon-night-${year}`,
    title: `International Observe the Moon Night ${year}`,
    year,
    shortDescription:
      "Annual global celebration of lunar science and exploration with SEDS Sri Lanka in collaboration with SEDS India, featuring live lunar telescope streaming powered by SEDS Celestia.",
    description:
      "Join SEDS Sri Lanka and SEDS India for an interactive virtual celebration of International Observe the Moon Night 2026. Experience live high-definition lunar telescopic streaming provided by SEDS Celestia, guided scientific sessions, and interactive discussions.",
    eventDate: "Monday, September 21, 2026",
    startTime: "2026-09-21T19:00:00.000+05:30",
    endTime: "2026-09-21T23:00:00.000+05:30",
    location: "Virtual Event (Online Live Stream)",
    locations: [
      {
        id: "virtual-stream",
        name: "Virtual Live Stream Hub",
        address: "Online Broadcast via SEDS Celestia",
        isMainLocation: true,
      },
    ],
    agenda: [
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
          "Lunar Science Keynote: Maria Formation & Historic Landing Sites",
        description:
          "Scientific presentation on lunar basalt maria (Sea of Rains & Sea of Tranquility), impact cratering, and geology of Apollo 11 & Apollo 15 landing sites.",
      },
      {
        time: "08:00 PM",
        stage: "SESSION 03",
        title:
          "Live Telescopic Observation Kickoff (Visible Sights: Plato Crater & Alpine Valley)",
        description:
          "Live telescope feed goes live! High-resolution observation of the dark lava-filled floor of Plato Crater and the dramatic lunar rift of the Alpine Valley (Vallis Alpes) slicing through the northern highlands.",
      },
      {
        time: "08:45 PM",
        stage: "SESSION 04",
        title:
          "Highland Peaks & Apollo Sites (Visible Sights: Apennine Mountains & Apollo 15)",
        description:
          "Close-up inspection of the towering Apennine Mountains (Montes Apenninus) rising over 5,000 meters along the terminator, plus the Hadley Rille canyon and Apollo 15 landing region.",
      },
      {
        time: "09:30 PM",
        stage: "SESSION 05",
        title:
          "Lunar Faults & Volcanic Vents (Visible Sights: Straight Wall & Alphonsus Crater)",
        description:
          "Telescopic exploration of the Straight Wall (Rupes Recta)—a famous 110-km lunar fault escarpment casting sharp shadows—along with Alphonsus Crater's central peak and the Catena Davy craterlet chain.",
      },
      {
        time: "10:15 PM",
        stage: "SESSION 06",
        title: "Live Moon Trivia Quiz, Q&A & Certificate Wrap-Up",
        description:
          "Interactive live astronomy trivia quiz, audience Q&A with telescope operators and astrophysicists, and digital participation certificate announcements before concluding at 11:00 PM.",
      },
    ],
    partners: [
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
        partnershipType: "Official Stream Provider",
        websiteUrl: "https://sedscelestia.org/",
        logo: {
          url: "/images/projects/seds-celestia.png",
          alt: "SEDS Celestia Logo",
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
