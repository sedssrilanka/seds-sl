import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObserveMoonStoryClient } from "@/components/sections/observe-moon-night/ObserveMoonStoryClient";
import {
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
      title: "Story Not Found | Observe the Moon Night | SEDS Sri Lanka",
    };
  }

  const title = `Observe the Moon Night ${year} | Behind the Scenes & Event Story | SEDS Sri Lanka`;
  const description =
    edition.shortDescription ||
    `When rain threatened Sri Lanka's skies, SEDS Sri Lanka and SEDS India built a telescope bridge across the sea for over 500 observers.`;
  const canonicalUrl = `/projects/observe-the-moon-night/${year}`;
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
      type: "article",
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

export default async function ObserveMoonNightYearPage({ params }: Props) {
  const { year } = await params;
  const edition = getObserveMoonNightEdition(year);

  if (!edition) {
    notFound();
  }

  return <ObserveMoonStoryClient year={year} />;
}

