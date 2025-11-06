"use client";

import { Chapter } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchChapters } from "./search";
import { useEffect, useState } from "react";
import { PayloadSDK } from "@payloadcms/sdk";

const payload = new PayloadSDK({
  baseURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000/api",
});

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const getMediaUrl = (media: any) => {
    if (typeof media === "object" && media !== null && "url" in media) {
      return media.url;
    }
    return "";
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const result = await payload.find({
          collection: "chapters",
          sort: "-createdAt",
          where: searchQuery
            ? {
                name: {
                  like: searchQuery,
                },
              }
            : {},
          depth: 1,
        });
        setChapters(result.docs as Chapter[]);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12">
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search chapters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Chapters Grid */}
      {loading ? (
        <div className="text-center text-muted-foreground">
          Loading chapters...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.slug}`}
              className="group block"
            >
              <div className="bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                    {chapter.socialLinks && chapter.socialLinks.length > 0 && (
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
        <div className="text-center text-muted-foreground mt-8">
          No chapters found{searchQuery ? ` for "${searchQuery}"` : ""}
        </div>
      )}
    </div>
  );
}
