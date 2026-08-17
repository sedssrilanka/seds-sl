"use client";

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
import type { Division } from "@/payload-types";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

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

const DivisionsSection = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);

  useEffect(() => {
    fetch("/api/divisions?limit=3&depth=1")
      .then((res) => res.json())
      .then((data) => setDivisions(data.docs || []))
      .catch(console.error);
  }, []);

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

          <div className="mt-12 relative">
            {/* Extended Horizontal Bleed Lines */}
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

            {/* Extended Vertical Bleed Lines */}
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />
            <div className="hidden md:block absolute -top-6 -bottom-6 left-1/2 border-l border-border/40 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 border border-border/60 divide-y divide-border/60 md:divide-y-0 md:divide-x bg-background relative z-0">
              {divisions.map((division, idx) => {
                const IconComponent =
                  IconMap[division.icon as keyof typeof IconMap] || Rocket;

                return (
                  <motion.div
                    key={division.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                    className="p-6 md:p-8 bg-background flex flex-col h-full"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="shrink-0 p-3 bg-primary/10 border border-primary/20">
                          <IconComponent className="size-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3 text-foreground">
                            {division.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-6 text-muted-foreground flex-1">
                        {division.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          bleed={true}
                          asChild
                        >
                          <Link href={`/divisions/${division.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* View All Divisions Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Link
                  href="/divisions"
                  className="block h-full group bg-background p-8 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Discover All Divisions
                    </h3>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium text-lg">View All</span>
                      <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
