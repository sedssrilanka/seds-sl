import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getServerSideURL } from "@/utilities/getURL";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL();

  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch published pages
    const pages = await payload.find({
      collection: "pages",
      draft: false,
      limit: 1000,
      overrideAccess: true,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    // Fetch published projects
    const projects = await payload.find({
      collection: "projects",
      draft: false,
      limit: 1000,
      overrideAccess: true,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    // Fetch published chapters
    const chapters = await payload.find({
      collection: "chapters",
      draft: false,
      limit: 1000,
      overrideAccess: true,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    // Fetch published divisions
    const divisions = await payload.find({
      collection: "divisions",
      draft: false,
      limit: 1000,
      overrideAccess: true,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const pageUrls =
      pages.docs
        ?.filter((doc) => doc.slug && doc.slug !== "home")
        .map((doc) => ({
          url: `${baseUrl}/${doc.slug}`,
          lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        })) || [];

    const projectUrls =
      projects.docs
        ?.filter((doc) => doc.slug)
        .map((doc) => ({
          url: `${baseUrl}/projects/${doc.slug}`,
          lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })) || [];

    const chapterUrls =
      chapters.docs
        ?.filter((doc) => doc.slug)
        .map((doc) => ({
          url: `${baseUrl}/chapters/${doc.slug}`,
          lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })) || [];

    const divisionUrls =
      divisions.docs
        ?.filter((doc) => doc.slug)
        .map((doc) => ({
          url: `${baseUrl}/divisions/${doc.slug}`,
          lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })) || [];

    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ];

    return [
      ...staticUrls,
      ...pageUrls,
      ...projectUrls,
      ...chapterUrls,
      ...divisionUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}
