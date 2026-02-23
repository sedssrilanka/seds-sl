"use client";

import type { Chapter } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { Search, X, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { fetchChapters } from "@/actions/chapters";

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        const result = await fetchChapters(searchQuery);
        setChapters(result);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    getChapters();
  }, [searchQuery]);

  return (
    <div className="grid-container section-content">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">SEDS Chapters</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our various SEDS chapters across Sri Lanka. Each chapter
            brings unique perspectives and initiatives to advance space
            exploration and technology.
          </p>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/50 overflow-hidden bg-card/40 animate-pulse"
              >
                <div className="w-full h-48 bg-muted/50" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted/50 rounded w-2/3" />
                  <div className="h-4 bg-muted/50 rounded w-full" />
                  <div className="h-4 bg-muted/50 rounded w-4/5" />
                  <div className="h-4 bg-muted/50 rounded w-5/6" />
                  <div className="mt-4 flex gap-4">
                    <div className="h-4 bg-muted/50 rounded w-1/4" />
                    <div className="h-4 bg-muted/50 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.slug}`}
                className="group block"
              >
                <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 group-hover:bg-card/60">
                  {/* Image Container */}
                  <div className="relative w-full h-48">
                    {chapter.mainImage && (
                      <Image
                        src={getMediaUrl(chapter.mainImage)}
                        alt={chapter.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-bold text-white mb-2">
                        {chapter.name}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {chapter.description}
                    </p>

                    {/* Contact & Social Links Preview */}
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      {chapter.socialLinks &&
                        chapter.socialLinks.length > 0 && (
                          <span>{chapter.socialLinks.length} social links</span>
                        )}
                      {chapter.contactEmail && <span>Contact available</span>}
                    </div>
                  </div>
                </div>
              </Link>
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
  );
}
