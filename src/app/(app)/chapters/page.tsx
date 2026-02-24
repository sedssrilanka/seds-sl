"use client";

import type { Chapter } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { fetchChapters } from "@/actions/chapters";
import { SectionHeader } from "@/components/sections/section-header";
import { Search, SearchX, X } from "lucide-react";

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [loading, setLoading] = useState(true);

  const getMediaUrl = (media: Chapter["mainImage"]): string => {
    if (typeof media === "object" && media !== null && "url" in media) {
      if (media.url) return media.url;
    }
    return "";
  };

  useEffect(() => {
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
  }, [debouncedSearchQuery]);

  return (
    <div className="flex flex-col w-full">
      <SectionHeader
        title="SEDS Chapters"
        description="Explore our various SEDS chapters across Sri Lanka. Each chapter brings unique perspectives and initiatives to advance space exploration and technology."
        image="/section-header/who-we-are-bg.jpg"
      />
      <div className="grid-container section-content mt-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary" />
              <Input
                type="text"
                placeholder="Search chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 w-full bg-background/50 backdrop-blur-md border-muted-foreground/20 rounded-2xl shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Chapters Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-border/60 dark:border-border/50">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="rounded-none p-4 md:p-6 border shadow-sm dark:shadow-none animate-pulse overflow-hidden flex flex-col h-full"
                >
                  <div className="w-full aspect-video bg-muted/50 border border-border/50 mb-4 relative overflow-hidden flex items-center justify-center" />
                  <div className="space-y-3 flex-1 w-full">
                    <div className="h-6 bg-muted/50 rounded w-2/3" />
                    <div className="h-4 bg-muted/50 rounded w-1/4" />
                    <div className="h-4 bg-muted/50 rounded w-full mt-4" />
                    <div className="h-4 bg-muted/50 rounded w-4/5" />
                    <div className="mt-4 flex gap-4 border-t border-border/50 pt-4">
                      <div className="h-4 bg-muted/50 rounded w-1/4" />
                      <div className="h-4 bg-muted/50 rounded w-1/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-border/60 dark:border-border/50">
              {chapters.map((chapter) => (
                <Card
                  key={chapter.id}
                  className="rounded-none p-4 md:p-6 border shadow-sm dark:shadow-none group overflow-hidden flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="w-full aspect-video bg-muted border border-border/50 mb-4 relative overflow-hidden flex items-center justify-center">
                    {chapter.mainImage ? (
                      <Image
                        src={getMediaUrl(chapter.mainImage)}
                        alt={chapter.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-muted-foreground text-sm font-medium">
                        No Image
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-xl font-bold mb-3 text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {chapter.name}
                  </CardTitle>

                  <CardDescription className="text-sm leading-relaxed mb-4 text-muted-foreground flex-1 line-clamp-3">
                    {chapter.description}
                  </CardDescription>

                  {/* Footer & Meta Info */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      {chapter.socialLinks &&
                        chapter.socialLinks.length > 0 && (
                          <span className="flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              role="img"
                              aria-label="Link Icon"
                            >
                              <title>Link Icon</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                            <span>{chapter.socialLinks.length} Links</span>
                          </span>
                        )}
                      {chapter.contactEmail && (
                        <span className="flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            role="img"
                            aria-label="Email Icon"
                          >
                            <title>Email Icon</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Email</span>
                        </span>
                      )}
                    </div>

                    <Link href={`/chapters/${chapter.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-sm group-hover:border-primary/50 transition-colors"
                      >
                        Know More
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && chapters.length === 0 && (
            <div className="text-center mt-16 py-12 px-4 rounded-3xl bg-muted/20 border border-border/50 border-dashed max-w-2xl mx-auto backdrop-blur-sm">
              <div className="bg-background/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50">
                <SearchX className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
              <p className="text-muted-foreground">
                We couldn't find any chapters matching "{searchQuery}". Try
                adjusting your search terms.
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
