import type { Metadata } from "next";
import { SectionHeader } from "@/components/sections/section-header";
import { DivisionsClient } from "./DivisionsClient";

export const metadata: Metadata = {
  title: "Our Divisions | SEDS Sri Lanka",
  description:
    "Explore the cutting edge of space exploration and technology through our specialized divisions at SEDS Sri Lanka.",
  openGraph: {
    title: "Our Divisions | SEDS Sri Lanka",
    description:
      "Explore the cutting edge of space exploration and technology through our specialized divisions at SEDS Sri Lanka.",
    images: [{ url: "/section-header/division.png" }],
  },
};

export default function DivisionsPage() {
  return (
    <div className="flex flex-col w-full pt-8 md:pt-12 lg:pt-16">
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Our Divisions"
            description="Explore the cutting edge of space exploration and technology through our specialized divisions at SEDS Sri Lanka."
            image="/section-header/division.png"
          />
          <DivisionsClient />
        </div>
      </div>
    </div>
  );
}
