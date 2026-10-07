import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObserveMoonNightClient } from "@/components/sections/observe-moon-night/ObserveMoonNightClient";
import {
  getObserveMoonNightProject,
  getAllObserveMoonNightYears,
  getObserveMoonNightEdition,
} from "@/utilities/getObserveMoonNightProject";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

interface Props {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAllObserveMoonNightYears();
  return years.map((year) => ({
    year,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const edition = getObserveMoonNightEdition(year);

  if (!edition) {
    return {
      title: "Archive Not Found | Observe the Moon Night | SEDS Sri Lanka",
    };
  }

  const title = `Event Archive | International Observe the Moon Night ${year} | SEDS Sri Lanka`;
  const description =
    edition.shortDescription ||
    edition.description ||
    `Archive of International Observe the Moon Night ${year} organized by SEDS Sri Lanka.`;
  const canonicalUrl = `/projects/observe-the-moon-night/${year}/archive`;
  const image = edition.heroImage?.url || "/images/projects/iotm-day-2026.png";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - SEDS Sri Lanka`,
          type: "image/png",
        },
      ],
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: "@sedssl",
      creator: "@sedssl",
    },
  };
}

export default async function ObserveMoonNightArchivePage({ params }: Props) {
  const { year } = await params;
  const eventData = await getObserveMoonNightProject(year);
  const allYears = getAllObserveMoonNightYears();

  if (!eventData) {
    notFound();
  }

  return (
    <ObserveMoonNightClient
      slug={eventData.slug || `observe-the-moon-night-${year}`}
      year={eventData.year || year}
      eventData={eventData}
      allYears={allYears}
    />
  );
}
