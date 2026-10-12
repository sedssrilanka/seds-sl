import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    unoptimized: true,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/conduct",
        destination: "/code-of-conduct",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/projects/savedino",
        destination: "/projects/seds-sri-lanka-asteroid-search-campaign",
        permanent: true,
      },
      {
        source: "/observe-the-moon-night",
        destination: "/projects/observe-the-moon-night/2026",
        permanent: false,
      },
      {
        source: "/observe-the-moon-night/story",
        destination: "/projects/observe-the-moon-night/2026/story",
        permanent: false,
      },
      {
        source: "/observe-the-moon-night/recap",
        destination: "/projects/observe-the-moon-night/2026/story",
        permanent: false,
      },
      {
        source: "/projects/observe-the-moon-night/story",
        destination: "/projects/observe-the-moon-night/2026/story",
        permanent: false,
      },
      {
        source: "/projects/observe-the-moon-night/recap",
        destination: "/projects/observe-the-moon-night/2026/story",
        permanent: false,
      },
      {
        source: "/observe-the-moon-night/:year",
        destination: "/projects/observe-the-moon-night/:year",
        permanent: true,
      },
      {
        source: "/observe-the-moon-night/:year/story",
        destination: "/projects/observe-the-moon-night/:year/story",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/**": ["./src/content/**/*"],
  },
  async headers() {
    return [
      {
        // Cache static media and assets in the public directory (images, icons, fonts)
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        // Static public asset folders
        source: "/(images|about|chapters|logo|section-header|docs|emails)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        // Search crawler files (robots.txt, sitemap.xml)
        source: "/(robots.txt|sitemap.xml)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Homepage caching (browser: 15 min, edge/CDN: 24h, stale-while-revalidate: 24h)
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=900, s-maxage=86400, stale-while-revalidate=86400",
          },
          {
            key: "CDN-Cache-Control",
            value: "max-age=86400, stale-while-revalidate=86400",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=86400, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
