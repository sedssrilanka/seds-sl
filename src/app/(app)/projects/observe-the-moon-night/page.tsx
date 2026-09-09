import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObserveMoonNightClient } from "@/components/sections/observe-moon-night/ObserveMoonNightClient";
import { getObserveMoonNightProject } from "@/utilities/getObserveMoonNightProject";

export const metadata: Metadata = {
  title: "International Observe the Moon Night | SEDS Sri Lanka",
  description:
    "Join SEDS Sri Lanka for an annual global celebration of lunar science, telescopic observation, and space exploration.",
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
