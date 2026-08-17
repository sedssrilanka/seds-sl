"use client";

import type { Division } from "@/payload-types";
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
import { useEffect, useState } from "react";
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

async function fetchDivisions(query: string): Promise<Division[]> {
  const params = new URLSearchParams({
    limit: "100",
    depth: "1",
    ...(query ? { "where[name][like]": query } : {}),
  });
  const res = await fetch(`/api/divisions?${params}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.docs ?? [];
}

export function DivisionsClient() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDivisions(debouncedQuery)
      .then(setDivisions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <>
      {/* High-Tech Hairline Bleeding Search Bar */}
      <div className="max-w-xl mx-auto my-10 relative">
        <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
        <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

        <div className="border border-border/60 bg-background relative z-0 flex items-center px-4 py-1.5 gap-3">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <Input
            type="text"
            placeholder="Search divisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              bleed={true}
              onClick={() => setSearchQuery("")}
              className="shrink-0 h-7 px-2.5 text-xs cursor-pointer"
            >
              <X className="size-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* High-Tech Bleeding Grid Layout */}
      <div className="relative my-6">
        {/* Extended Horizontal Bleed Lines */}
        <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
        <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

        {/* Extended Vertical Bleed Lines */}
        <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
        <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y divide-border/60 md:divide-y-0 bg-background relative z-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 border-r border-border/60 animate-pulse space-y-4"
              >
                <div className="h-12 w-12 bg-muted/50 rounded-md" />
                <div className="h-5 bg-muted/50 rounded w-1/2" />
                <div className="h-4 bg-muted/50 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y divide-border/60 bg-background relative z-0">
            {divisions.map((division) => {
              const IconComponent =
                IconMap[division.icon as keyof typeof IconMap] || Rocket;

              return (
                <div
                  key={division.id}
                  className="p-6 bg-background group flex flex-col h-full border-r border-border/60 last:border-r-0"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 p-3 bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                      <IconComponent className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {division.name}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed mb-4 text-muted-foreground flex-1 line-clamp-3">
                    {division.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border/50 flex justify-end">
                    <Link href={`/divisions/${division.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        bleed={true}
                        className="gap-1 cursor-pointer"
                      >
                        Learn More
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* No Results */}
      {!loading && divisions.length === 0 && (
        <div className="text-center mt-12 py-12 px-4 bg-background border border-border/60 border-dashed max-w-2xl mx-auto">
          <div className="bg-muted/30 w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-border/60">
            <SearchX className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            No divisions found
          </h3>
          <p className="text-muted-foreground text-sm">
            We couldn't find any divisions matching "{searchQuery}". Try
            adjusting your search terms.
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              bleed={true}
              onClick={() => setSearchQuery("")}
              className="mt-6 cursor-pointer"
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </>
  );
}
