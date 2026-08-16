import type { MetadataRoute } from "next";
import { getServerSideURL } from "@/utilities/getURL";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getServerSideURL();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
