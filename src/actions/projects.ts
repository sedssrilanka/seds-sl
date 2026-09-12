"use server";

import { getAllProjects } from "@/lib/keystatic";

export interface UnifiedProjectItem {
  id: string | number;
  name: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  chapterName?: string;
  createdAt: string;
  slug: string;
  customLink?: string;
  platformLink?: string;
  storyLink?: string;
  isFeatured?: boolean;
  isFlagship?: boolean;
  badgeLabel?: string;
}

export const fetchProjects = async (
  searchQuery = "",
): Promise<UnifiedProjectItem[]> => {
  try {
    const rawProjects = await getAllProjects();

    const standardProjects: UnifiedProjectItem[] = rawProjects
      .filter((proj) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          proj.name.toLowerCase().includes(q) ||
          proj.description.toLowerCase().includes(q)
        );
      })
      .map((proj) => ({
        id: proj.slug,
        name: proj.name,
        description: proj.description,
        image: proj.image ? { url: proj.image } : null,
        chapterName: proj.chapter || "",
        createdAt: new Date().toISOString(),
        slug: proj.slug,
        customLink: proj.customLink || undefined,
        isFeatured: Boolean(proj.isFeatured),
        isFlagship: false,
        badgeLabel: proj.isFeatured ? "FEATURED PROJECT" : undefined,
      }));

    // Add flagship events & major initiatives
    const flagshipEvents: UnifiedProjectItem[] = [
      {
        id: "seds-sri-lanka-asteroid-search-campaign",
        name: "SEDS Sri Lanka Asteroid Search Campaign (SaveDino 2026)",
        description:
          "National citizen science campaign organized by SEDS Sri Lanka in partnership with IASC, featuring 'SaveDino'—the 2026 interactive planetary defense portal and retro arcade experience.",
        image: { url: "/images/projects/savedino-cover.png" },
        chapterName: "SEDS Sri Lanka & IASC Collaboration",
        createdAt: "2026-09-11T00:00:00.000Z",
        slug: "seds-sri-lanka-asteroid-search-campaign",
        customLink: "/projects/seds-sri-lanka-asteroid-search-campaign",
        platformLink: "https://savedino.sedssl.org/",
        storyLink: "https://www.thawshi.com/posts/savedino",
        isFeatured: true,
        isFlagship: true,
        badgeLabel: "CITIZEN SCIENCE",
      },
      {
        id: "moon-2026",
        name: "International Observe the Moon Night 2026",
        description:
          "Join SEDS Sri Lanka for an annual global celebration of lunar science, telescopic observations, and planetary exploration.",
        image: { url: "/images/projects/iotm-day-2026.png" },
        chapterName: "SEDS Sri Lanka Flagship Event",
        createdAt: "2026-09-01T00:00:00.000Z",
        slug: "observe-the-moon-night/2026",
        customLink: "/projects/observe-the-moon-night",
        isFeatured: true,
        isFlagship: true,
        badgeLabel: "FLAGSHIP EVENT",
      },
      {
        id: "nasa-space-apps",
        name: "NASA Space Apps Challenge Sri Lanka",
        description:
          "The official national hackathon organized across Sri Lanka by SEDS Sri Lanka across 7 consecutive editions (2019 - 2025).",
        image: { url: "/images/projects/nsa-cover.png" },
        chapterName: "SEDS Sri Lanka Flagship Hackathon",
        createdAt: "2025-10-04T00:00:00.000Z",
        slug: "nasa-space-apps-challenge",
        customLink: "/nasa-space-apps-challenge",
        isFeatured: false,
        isFlagship: true,
        badgeLabel: "GLOBAL HACKATHON",
      },
    ].filter((event) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q)
      );
    });

    const flagshipSlugs = new Set(flagshipEvents.map((e) => e.slug));
    const deduplicatedStandard = standardProjects.filter(
      (proj) => !flagshipSlugs.has(proj.slug),
    );

    return [...flagshipEvents, ...deduplicatedStandard];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
