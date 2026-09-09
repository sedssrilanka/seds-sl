import type { MetadataRoute } from "next";
import { getServerSideURL } from "@/utilities/getURL";
import {
  getAllProjects,
  getAllChapters,
  getAllDivisions,
  getAllProducts,
} from "@/lib/keystatic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL();

  try {
    const [projects, chapters, divisions, products] = await Promise.all([
      getAllProjects(),
      getAllChapters(),
      getAllDivisions(),
      getAllProducts(),
    ]);

    const projectUrls = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const chapterUrls = chapters.map((c) => ({
      url: `${baseUrl}/chapters/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const divisionUrls = divisions.map((d) => ({
      url: `${baseUrl}/divisions/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const productUrls = products.map((pr) => ({
      url: `${baseUrl}/products/${pr.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/chapters`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/divisions`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about-us`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/join-us`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
    ];

    return [
      ...staticUrls,
      ...projectUrls,
      ...chapterUrls,
      ...divisionUrls,
      ...productUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
