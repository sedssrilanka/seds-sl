export interface ObserveMoonLocation {
  id?: string;
  name: string;
  address?: string;
  isMainLocation?: boolean;
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
  feedbackUrl?: string;
  isFeedbackActive?: boolean;
  isPaid?: boolean;
  ticketPrice?: string;
  bankAccountNumber?: string;
  paymentDetails?: string;
  listingImage?: any;
  heroImage?: any;
  isFeatured?: boolean;
}

export async function getObserveMoonNightProject(year = "2026"): Promise<ObserveMoonEventResult | null> {
  return {
    id: `moon-${year}`,
    slug: `observe-the-moon-night-${year}`,
    title: `International Observe the Moon Night ${year}`,
    year,
    shortDescription: "Annual global celebration of lunar science and exploration with SEDS Sri Lanka.",
    description: "Join telescopes across Sri Lanka to view the craters, maria, and mountains of the Moon.",
    eventDate: "Saturday, September 19, 2026",
    startTime: "2026-09-19T17:30:00.000Z",
    endTime: "2026-09-19T22:30:00.000Z",
    location: "Galle Face Green, Colombo 03",
    locations: [
      { id: "colombo", name: "Colombo - Galle Face Green", address: "Galle Face, Colombo 03", isMainLocation: true },
      { id: "kandy", name: "Kandy - University of Peradeniya", address: "Peradeniya, Kandy" },
      { id: "moratuwa", name: "Moratuwa - University of Moratuwa", address: "Katubedda, Moratuwa" },
    ],
    listingImage: { url: "/section-header/space-projects-bg.jpeg" },
    heroImage: { url: "/section-header/space-projects-bg.jpeg" },
    isFeatured: true,
  };
}
