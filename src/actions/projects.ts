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

    // Add flagship events
    const flagshipEvents: UnifiedProjectItem[] = [
      {
        id: "moon-2025",
        name: "International Observe the Moon Night 2025",
        description:
          "Join SEDS Sri Lanka for an annual global celebration of lunar science and observation.",
        image: { url: "/section-header/space-projects-bg.jpeg" },
        chapterName: "SEDS Sri Lanka Flagship Event",
        createdAt: new Date().toISOString(),
        slug: "observe-the-moon-night/2025",
        customLink: "/projects/observe-the-moon-night",
        isFeatured: true,
        isFlagship: true,
        badgeLabel: "FEATURED EVENT",
      },
    ].filter((event) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q)
      );
    });

    return [...flagshipEvents, ...standardProjects];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
