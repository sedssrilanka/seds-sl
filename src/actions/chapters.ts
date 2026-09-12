"use server";

import { getAllChapters } from "@/lib/keystatic";

export const fetchChapters = async (searchQuery = ""): Promise<any[]> => {
  try {
    const rawChapters = await getAllChapters();

    const filtered = rawChapters.filter((ch) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        ch.name.toLowerCase().includes(q) ||
        (ch.university && ch.university.toLowerCase().includes(q)) ||
        ch.description.toLowerCase().includes(q)
      );
    });

    return filtered.map((ch) => ({
      id: ch.slug,
      name: ch.name,
      slug: ch.slug,
      university: ch.university,
      description: ch.description,
      logoDark: ch.logoDark ? { url: ch.logoDark } : null,
      logoLight: ch.logoLight ? { url: ch.logoLight } : null,
      mainImage: ch.mainImage
        ? { url: ch.mainImage }
        : { url: "/section-header/who-we-are-bg.jpg" },
      contactEmail: ch.contactEmail,
      socialLinks: ch.socialLinks || [],
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
};
