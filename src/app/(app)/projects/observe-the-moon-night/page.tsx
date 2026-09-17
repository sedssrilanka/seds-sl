import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObserveMoonNightClient } from "@/components/sections/observe-moon-night/ObserveMoonNightClient";
import { getObserveMoonNightProject } from "@/utilities/getObserveMoonNightProject";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

export const metadata: Metadata = {
  title: "International Observe the Moon Night 2026 | SEDS Sri Lanka",
  description:
    "Join SEDS Sri Lanka and SEDS India on Monday, September 21, 2026 from 7:00 PM IST onwards for an annual virtual celebration of lunar science with live telescope streaming powered by SEDS Celestia.",
  alternates: {
    canonical: "/projects/observe-the-moon-night",
  },
  openGraph: mergeOpenGraph({
    title: "International Observe the Moon Night 2026 | SEDS Sri Lanka",
    description:
      "Join SEDS Sri Lanka and SEDS India on Monday, September 21, 2026 from 7:00 PM IST onwards for an annual virtual celebration of lunar science with live telescope streaming powered by SEDS Celestia.",
    url: "/projects/observe-the-moon-night",
    type: "website",
    images: [
      {
        url: "/images/projects/iotm-day-2026.png",
        width: 1200,
        height: 630,
        alt: "International Observe the Moon Night 2026 - SEDS Sri Lanka",
        type: "image/png",
      },
    ],
  }),
  twitter: {
    card: "summary_large_image",
    title: "International Observe the Moon Night 2026 | SEDS Sri Lanka",
    description:
      "Join SEDS Sri Lanka and SEDS India on Monday, September 21, 2026 for a live virtual lunar observation with stream powered by SEDS Celestia.",
    images: ["/images/projects/iotm-day-2026.png"],
    site: "@sedssl",
    creator: "@sedssl",
  },
};

export default async function ObserveMoonNightDefaultPage() {
  const eventData = await getObserveMoonNightProject();

  if (!eventData) {
    notFound();
  }

  return (
    <ObserveMoonNightClient
      slug={eventData.slug || "observe-the-moon-night-2026"}
      year={eventData.year || "2026"}
      eventData={eventData}
    />
  );
}
