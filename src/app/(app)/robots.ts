import { getServerSideURL } from "@/utilities/getURL";

export default function robots() {
  const baseUrl = getServerSideURL();

  return {
    host: baseUrl,
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
