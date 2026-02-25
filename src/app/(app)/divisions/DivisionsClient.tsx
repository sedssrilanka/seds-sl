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
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
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
      {/* Search Bar */}
      <div className="max-w-lg mx-auto my-12">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary z-10" />
          <Input
            type="text"
            placeholder="Search divisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 py-6 w-full bg-background/50 backdrop-blur-md border-muted-foreground/20 rounded-2xl shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-lg"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-border/60 dark:border-border/50">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="rounded-none p-6 border shadow-sm animate-pulse flex flex-col gap-4"
            >
              <div className="h-12 w-12 bg-muted/50 rounded-lg" />
              <div className="h-5 bg-muted/50 rounded w-1/2" />
              <div className="h-4 bg-muted/50 rounded w-full" />
              <div className="h-4 bg-muted/50 rounded w-4/5" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-border/60 dark:border-border/50">
          {divisions.map((division) => {
            const IconComponent =
              IconMap[division.icon as keyof typeof IconMap] || Rocket;
            return (
              <Card
                key={division.id}
                className="rounded-none p-6 border shadow-sm dark:shadow-none group overflow-hidden flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 p-3 bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                    <IconComponent className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {division.name}
                  </CardTitle>
                </div>

                <CardDescription className="text-sm leading-relaxed flex-1 line-clamp-3">
                  {division?.description}
                </CardDescription>

                <div className="mt-auto pt-4 border-t border-border/50 flex justify-end">
                  <Link href={`/divisions/${division.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-sm group-hover:border-primary/50 transition-colors gap-1"
                    >
                      Learn More
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {!loading && divisions.length === 0 && (
        <div className="text-center mt-16 py-12 px-4 rounded-3xl bg-muted/20 border border-border/50 border-dashed max-w-2xl mx-auto">
          <div className="bg-background/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50">
            <SearchX className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No divisions found</h3>
          <p className="text-muted-foreground">
            We couldn&apos;t find any divisions matching &quot;{searchQuery}
            &quot;. Try adjusting your search.
          </p>
          {searchQuery && (
            <Button
              variant="link"
              onClick={() => setSearchQuery("")}
              className="mt-6 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </>
  );
}
