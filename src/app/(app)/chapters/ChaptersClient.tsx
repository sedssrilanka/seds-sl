"use client";

import type { Chapter } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchChapters } from "@/actions/chapters";
import { SectionHeader } from "@/components/sections/section-header";
import { Search, SearchX, X } from "lucide-react";

export function ChaptersClient({
  initialChapters = [],
}: {
  initialChapters?: Chapter[];
}) {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [loading, setLoading] = useState(initialChapters.length === 0);

  const getMediaUrl = (media: Chapter["mainImage"]): string => {
    if (typeof media === "object" && media !== null && "url" in media) {
      if (media.url) return media.url;
    }
    return "";
  };

  useEffect(() => {
    if (!debouncedSearchQuery && initialChapters.length > 0) {
      setChapters(initialChapters);
      setLoading(false);
      return;
    }

    const getChapters = async () => {
      setLoading(true);
      try {
        const result = await fetchChapters(debouncedSearchQuery);
        setChapters(result);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    getChapters();
  }, [debouncedSearchQuery, initialChapters]);

  return (
    <div className="flex flex-col w-full pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-24 lg:pb-32">
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="SEDS Chapters"
            description="Explore our student-led university chapters across Sri Lanka. Each chapter brings together students from different disciplines to collaborate on space science, robotics, rocketry, and astronomy."
            image="/section-header/who-we-are-bg.jpg"
          />

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
                placeholder="Search chapters by name or university..."
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
          <div className="relative my-6 mb-12 sm:mb-16">
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
                    <div className="w-full aspect-video bg-muted/50 border border-border/50" />
                    <div className="h-6 bg-muted/50 rounded w-2/3" />
                    <div className="h-4 bg-muted/50 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y divide-border/60 bg-background relative z-0">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="p-6 bg-background group flex flex-col h-full border-r border-border/60 last:border-r-0 hover:bg-muted/5 transition-colors"
                  >
                    {/* University Badge */}
                    {chapter.university && (
                      <span className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider mb-2 line-clamp-1">
                        {chapter.university}
                      </span>
                    )}

                    <h3 className="text-xl font-bold mb-2 text-foreground transition-colors group-hover:text-primary line-clamp-2">
                      {chapter.name}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed mb-4 text-muted-foreground flex-1 line-clamp-3">
                      {chapter.description}
                    </p>

                    {/* Footer & Meta Info */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        {chapter.contactEmail && (
                          <span className="text-primary font-medium">Active Chapter</span>
                        )}
                      </div>

                      <Link href={`/chapters/${chapter.slug}`} prefetch={false}>
                        <Button variant="outline" size="sm" bleed={true} className="cursor-pointer text-xs font-mono">
                          View Chapter →
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* No Results */}
          {!loading && chapters.length === 0 && (
            <div className="text-center mt-12 py-12 px-4 bg-background border border-border/60 border-dashed max-w-2xl mx-auto">
              <div className="bg-muted/30 w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-border/60">
                <SearchX className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                No chapters found
              </h3>
              <p className="text-muted-foreground text-sm">
                We couldn't find any chapters matching "{searchQuery}". Try
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
        </div>
      </div>
    </div>
  );
}
