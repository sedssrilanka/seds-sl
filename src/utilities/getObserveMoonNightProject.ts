export interface ObserveMoonEventResult {
  id?: string | number;
  slug?: string;
  title?: string;
  year?: string;
  shortDescription?: string;
  description?: string;
  eventDate?: string;
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
    listingImage: { url: "/section-header/space-projects-bg.jpeg" },
    heroImage: { url: "/section-header/space-projects-bg.jpeg" },
    isFeatured: true,
  };
}
