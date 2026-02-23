import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Bot,
  Rocket,
  Laptop,
  Plane,
  Microscope,
  Telescope,
  Briefcase,
  Camera,
  type LucideIcon,
} from "lucide-react";

export const dynamic = "force-dynamic";

// Map string icon names to actual Lucide components
const IconMap: Record<string, LucideIcon> = {
  Bot,
  Rocket,
  Laptop,
  Plane,
  Microscope,
  Telescope,
  Briefcase,
  Camera,
};

export default async function DivisionsPage() {
  const payload = await getPayload({ config: configPromise });

  const { docs: divisions } = await payload.find({
    collection: "divisions",
    depth: 1,
    limit: 100,
  });

  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Our Divisions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the cutting edge of space exploration and technology through
          our specialized divisions at SEDS Sri Lanka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {divisions.map((division) => {
          const IconComponent =
            IconMap[division.icon as keyof typeof IconMap] || Rocket;

          return (
            <Card
              key={division.id}
              className="group flex flex-col h-full overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5 hover:-translate-y-1 bg-background/50 backdrop-blur-sm border-primary/10"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{division.name}</h3>
                <p className="text-muted-foreground text-sm flex-grow">
                  {division.description}
                </p>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <Link
                    href={`/divisions/${division.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    View More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
