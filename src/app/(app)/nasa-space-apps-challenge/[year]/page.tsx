import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NasaSpaceAppsClient } from "@/components/sections/nasa-space-apps/NasaSpaceAppsClient";
import {
  getSpaceAppsEdition,
  getAllSpaceAppsYears,
} from "@/utilities/getNasaSpaceAppsData";
import { getServerSideURL } from "@/utilities/getURL";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAllSpaceAppsYears();
  return years.map((year) => ({
    year,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  const edition = getSpaceAppsEdition(year);
  const baseUrl = getServerSideURL();

  if (!edition) {
    return {
      title: "Edition Not Found | NASA Space Apps Sri Lanka",
    };
  }

  const url = `${baseUrl}/nasa-space-apps-challenge/${year}`;
  const image = `${baseUrl}/images/projects/nsa-cover.png`;

  return {
    title: `${edition.title} | SEDS Sri Lanka`,
    description: `${edition.theme} - Explore winning teams, projects, and highlights from the ${edition.year} NASA Space Apps Challenge organized in Sri Lanka by SEDS SL.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${edition.title} | SEDS Sri Lanka`,
      description: edition.tagline,
      url,
      siteName: "SEDS Sri Lanka",
      locale: "en_LK",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${edition.title} - SEDS Sri Lanka`,
          type: "image/png",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${edition.title} | SEDS Sri Lanka`,
      description: edition.tagline,
      images: [image],
      site: "@sedssl",
      creator: "@sedssl",
    },
  };
}

export default async function NasaSpaceAppsYearPage({ params }: PageProps) {
  const { year } = await params;
  const edition = getSpaceAppsEdition(year);
  const allYears = getAllSpaceAppsYears();
  const baseUrl = getServerSideURL();

  if (!edition) {
    notFound();
  }

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Hackathon",
    name: edition.title,
    description: `${edition.theme}: ${edition.tagline}`,
    url: `${baseUrl}/nasa-space-apps-challenge/${year}`,
    startDate: edition.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: edition.format.toLowerCase().includes("virtual")
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: edition.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "LK",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/nasa-space-apps-challenge/${year}`,
      price: "0",
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <NasaSpaceAppsClient
        currentEdition={edition}
        allYears={allYears}
        isBaseHub={false}
      />
    </>
  );
}
