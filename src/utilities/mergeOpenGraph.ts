import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  locale: "en_LK",
  description:
    "SEDS Sri Lanka is the national student-led organization advancing space exploration, astronomy, rocketry, robotics, and aerospace engineering in Sri Lanka.",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "SEDS Sri Lanka",
      type: "image/png",
    },
  ],
  siteName: "SEDS Sri Lanka",
  title: "SEDS Sri Lanka | Students for the Exploration & Development of Space",
};

export const mergeOpenGraph = (
  og?: Partial<Metadata["openGraph"]>,
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
