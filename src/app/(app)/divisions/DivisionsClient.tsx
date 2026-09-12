"use client";

import type { Division } from "@/types";
import Link from "next/link";
import {
  Search,
  X,
  SearchX,
  ArrowRight,
  Bot,
  Rocket,
  Laptop,
  Plane,
  Microscope,
  Telescope,
  Briefcase,
  Camera,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDebounce } from "use-debounce";

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

const DIVISION_METADATA: Record<
  string,
  {
    category: "Engineering" | "Observation" | "Outreach & Ops";
    tags: string[];
  }
> = {
  "robotics-and-rover-division": {
    category: "Engineering",
    tags: ["Rover Building", "Arduino & ROS", "Hands-On Robotics"],
  },
  "rocketry-and-propulsion-division": {
    category: "Engineering",
    tags: ["Model Rockets", "Flight Simulations", "Avionics DIY"],
  },
  "satellite-and-space-systems-division": {
    category: "Engineering",
    tags: ["CanSat Workshops", "Weather Balloons", "Satellite Tracking"],
  },
  "radio-astronomy-and-earth-observation-division": {
    category: "Observation",
    tags: ["Stargazing Nights", "DIY Radio Antennas", "Satellite Maps"],
  },
  "aeronautical-and-flight-systems-division": {
    category: "Engineering",
    tags: ["RC Planes & Drones", "Foam Gliders", "Flight Autopilot"],
  },
  "education-and-outreach-division": {
    category: "Outreach & Ops",
    tags: ["School Visits", "Moon Night Events", "Space Quizzes"],
  },
  "media-and-public-relations-division": {
    category: "Outreach & Ops",
    tags: ["Event Photography", "Poster Design", "Social Media"],
  },
};

const CATEGORIES = [
  "All",
  "Engineering",
  "Observation",
  "Outreach & Ops",
] as const;

export function DivisionsClient({
  initialDivisions = [],
}: {
  initialDivisions?: Division[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [debouncedQuery] = useDebounce(searchQuery, 150);

  const filteredDivisions = initialDivisions.filter((div) => {
    const meta = DIVISION_METADATA[div.slug] || {
      category: "Engineering",
      tags: [],
    };

    if (selectedCategory !== "All" && meta.category !== selectedCategory) {
      return false;
    }

    if (!debouncedQuery.trim()) return true;
    const q = debouncedQuery.toLowerCase();
    return (
      div.name?.toLowerCase().includes(q) ||
      div.description?.toLowerCase().includes(q) ||
      (div.lead && div.lead.toLowerCase().includes(q)) ||
      meta.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full space-y-8">
      {/* Telemetry Control Bar: Search & Category Filters */}
      <div className="space-y-4 pt-4">
        {/* Search Bar with Technical Borders */}
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute -left-3 -right-3 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-3 -right-3 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-3 -bottom-3 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-3 -bottom-3 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-background/80 backdrop-blur-xs relative z-0 flex items-center px-4 py-2 gap-3">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <Input
              type="text"
              placeholder="Search divisions, research domains, leads, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/60 h-9 focus-visible:ring-0 text-sm"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="shrink-0 h-7 px-2.5 text-xs cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? initialDivisions.length
                : initialDivisions.filter(
                    (d) =>
                      (DIVISION_METADATA[d.slug]?.category || "Engineering") ===
                      cat,
                  ).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                    : "bg-background/60 text-muted-foreground border-border/60 hover:border-foreground/60 hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded-xs ${
                    selectedCategory === cat
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Division Grid Layout */}
      <div className="relative mb-12 sm:mb-16">
        {/* Extended Hairline Bleed Frame */}
        <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
        <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 bg-border/40 gap-[1px]">
          {filteredDivisions.map((division) => {
            const IconComponent =
              IconMap[division.icon as keyof typeof IconMap] || Rocket;
            const meta = DIVISION_METADATA[division.slug];

            return (
              <Link
                key={division.id}
                href={`/divisions/${division.slug}`}
                prefetch={false}
                className="group p-6 sm:p-7 bg-background flex flex-col justify-between hover:bg-muted/10 transition-colors relative"
              >
                <div className="space-y-4">
                  {/* Icon & Name */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 p-3 bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                      <IconComponent className="size-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {division.name}
                      </h3>
                      {division.lead && (
                        <p className="text-xs font-mono text-muted-foreground mt-1 flex items-center gap-1.5 truncate">
                          <Users className="w-3 h-3 text-primary shrink-0" />
                          <span>{division.lead}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {division.description}
                  </p>

                  {/* Capability Tags */}
                  {meta?.tags && meta.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {meta.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono bg-muted/40 border border-border/60 text-muted-foreground px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                    Learn More
                  </span>
                  <div className="flex items-center gap-1 text-primary">
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* No Results */}
      {filteredDivisions.length === 0 && (
        <div className="text-center my-12 py-16 px-4 bg-background border border-border/60 border-dashed max-w-xl mx-auto space-y-4">
          <div className="bg-muted/30 w-16 h-16 flex items-center justify-center mx-auto border border-border/60">
            <SearchX className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            No divisions match your filter
          </h3>
          <p className="text-muted-foreground text-xs max-w-md mx-auto">
            We couldn't find any divisions matching &quot;{searchQuery}&quot;
            under &quot;{selectedCategory}&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-2 text-xs font-mono cursor-pointer"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
