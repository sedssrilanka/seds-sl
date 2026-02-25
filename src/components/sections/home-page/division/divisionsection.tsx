import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  Laptop,
  Microscope,
  Plane,
  Rocket,
  Telescope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Division } from "@/payload-types";

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
  Users,
};

const DivisionsSection = async () => {
  let divisions: Division[] = [];
  try {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
      collection: "divisions",
      depth: 1,
      limit: 3, // We'll show 5 + the "Discover All" card to make a nice 6-grid
    });
    divisions = docs;
  } catch (error) {
    console.error("Error fetching divisions:", error);
  }

  return (
    <section className="light-mode-section relative w-full pt-8 md:pt-12 lg:pt-16">
      <div className="section-background bg-background dark:bg-black"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Our Divisions"
            description={
              <>
                Our divisions bring together innovators, researchers, and
                enthusiasts to collaborate on projects that span from
                <br />
                satellites and rovers to education and outreach.
              </>
            }
            image="/section-header/division.png"
          />

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 border-border/60 dark:border-border/50">
              {divisions.map((division) => {
                const IconComponent =
                  IconMap[division.icon as keyof typeof IconMap] || Rocket;

                return (
                  <Card
                    key={division.id}
                    className="rounded-none border p-6 shadow-sm dark:shadow-none"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="shrink-0 p-3 bg-primary/10 border border-primary/20">
                          <IconComponent className="size-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold mb-3">
                            {division.name}
                          </CardTitle>
                        </div>
                      </div>

                      <CardDescription className="text-sm leading-relaxed mb-6 flex-1">
                        {division.description}
                      </CardDescription>

                      <div className="flex items-center justify-between mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-sm border-primary/20 hover:bg-primary/10"
                          asChild
                        >
                          <Link href={`/divisions/${division.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}

              {/* View All Divisions Card */}
              <Link href="/divisions" className="block h-full group">
                <Card className="rounded-none h-full light-mode-card p-12 cursor-pointer transition-colors duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/20 shadow-sm dark:shadow-none min-h-[250px] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Discover All Divisions
                    </h3>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium text-lg">View All</span>
                      <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
