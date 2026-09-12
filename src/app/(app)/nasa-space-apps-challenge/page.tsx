import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NasaSpaceAppsClient } from "@/components/sections/nasa-space-apps/NasaSpaceAppsClient";
import {
  getLatestSpaceAppsEdition,
  getAllSpaceAppsYears,
} from "@/utilities/getNasaSpaceAppsData";
import { getServerSideURL } from "@/utilities/getURL";

export const metadata: Metadata = {
  title: "NASA Space Apps Challenge Sri Lanka | Official SEDS Sri Lanka Portal",
  description:
    "Explore the official multi-year archive of the NASA International Space Apps Challenge in Sri Lanka organized nationwide by SEDS Sri Lanka since 2019.",
  alternates: {
    canonical: "/nasa-space-apps-challenge",
  },
  openGraph: {
    title: "NASA Space Apps Challenge Sri Lanka | SEDS Sri Lanka",
    description:
      "Empowering Sri Lankan students and developers to solve real-world challenges on Earth and in space with NASA open data.",
    url: "/nasa-space-apps-challenge",
    siteName: "SEDS Sri Lanka",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "/images/projects/nsa-cover.png",
        width: 1200,
        height: 630,
        alt: "NASA Space Apps Challenge Sri Lanka - SEDS Sri Lanka",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NASA Space Apps Challenge Sri Lanka | SEDS Sri Lanka",
    description:
      "Official multi-year portal for NASA Space Apps Challenge in Sri Lanka organized by SEDS Sri Lanka since 2019.",
    images: ["/images/projects/nsa-cover.png"],
    site: "@sedssl",
    creator: "@sedssl",
  },
};

export default function NasaSpaceAppsBasePage() {
  const currentEdition = getLatestSpaceAppsEdition();
  const allYears = getAllSpaceAppsYears();
  const baseUrl = getServerSideURL();

  if (!currentEdition) {
    notFound();
  }

  const jsonLdEventSeries = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: "NASA Space Apps Challenge Sri Lanka",
    description:
      "Annual national hackathon organized by SEDS Sri Lanka as part of the global NASA International Space Apps Challenge.",
    url: `${baseUrl}/nasa-space-apps-challenge`,
    organizer: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
      url: baseUrl,
    },
    location: {
      "@type": "Place",
      name: "Sri Lanka (Colombo & Virtual)",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LK",
      },
    },
    subEvents: allYears.map((yr) => ({
      "@type": "Hackathon",
      name: `NASA Space Apps Challenge Sri Lanka ${yr}`,
      url: `${baseUrl}/nasa-space-apps-challenge/${yr}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEventSeries) }}
      />
      <NasaSpaceAppsClient
        currentEdition={currentEdition}
        allYears={allYears}
        isBaseHub={true}
      />
    </>
  );
}
