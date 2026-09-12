"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  SearchX,
  Calendar,
  Sparkles,
  ArrowRight,
  FolderGit2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchProjects, type UnifiedProjectItem } from "@/actions/projects";
import { SectionHeader } from "@/components/sections/section-header";

export function ProjectsClient({
  initialProjects = [],
}: {
  initialProjects?: UnifiedProjectItem[];
}) {
  const [projects, setProjects] =
    useState<UnifiedProjectItem[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMediaUrl = (media: any): string => {
    if (typeof media === "object" && media !== null && "url" in media) {
      if (media.url) return media.url;
    }
    return "";
  };

  useEffect(() => {
    if (!debouncedSearchQuery && initialProjects.length > 0) {
      setProjects(initialProjects);
      setLoading(false);
      return;
    }

    const getProjects = async () => {
      setLoading(true);
      try {
        const result = await fetchProjects(debouncedSearchQuery);
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [debouncedSearchQuery, initialProjects]);

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const regularProjects = projects.filter((p) => !p.isFeatured);

  return (
    <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-24 md:pb-32">
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 space-y-12">
          <SectionHeader
            title="Our Projects & Flagship Events"
            description="Discover the innovative projects developed by our student chapters alongside flagship space exploration initiatives."
            image="/section-header/space-projects-bg.jpeg"
          />

          {/* High-Tech Bleeding Search Bar */}
          <div className="max-w-xl mx-auto my-6 relative">
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 relative z-0 flex items-center px-4 py-1.5 gap-3">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <Input
                type="text"
                placeholder="Search projects, hackathons, and missions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9 font-mono text-xs focus-visible:ring-0 shadow-none"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  bleed={true}
                  onClick={() => setSearchQuery("")}
                  className="shrink-0 h-7 px-2.5 text-xs font-mono cursor-pointer"
                >
                  <X className="size-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* FEATURED PROJECTS & FLAGSHIP EVENTS SPOTLIGHT */}
          {!loading && featuredProjects.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
                <Sparkles className="size-4 text-primary animate-pulse" />
                <span>Featured Projects &amp; Flagship Initiatives</span>
              </div>

              {/* Bleeding Edge Container for Featured Projects */}
              <div className="relative">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 border border-border/60 divide-y lg:divide-y-0 lg:divide-x divide-border/60 bg-background relative z-0">
                  {featuredProjects.map((item) => {
                    const mediaUrl = getMediaUrl(item.image);
                    const targetLink =
                      item.customLink || `/projects/${item.slug}`;

                    return (
                      <div
                        key={item.id}
                        className="group p-6 md:p-8 bg-card/40 hover:bg-card/70 transition-colors flex flex-col justify-between space-y-6"
                      >
                        <div className="space-y-4">
                          {/* Image Preview Container */}
                          <div className="w-full aspect-video bg-muted border border-border/60 relative overflow-hidden flex items-center justify-center">
                            {mediaUrl ? (
                              <Image
                                src={mediaUrl}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="text-muted-foreground text-xs font-mono">
                                SEDS Sri Lanka Initiative
                              </div>
                            )}
                            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md border border-border/60 px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-primary tracking-wider">
                              {item.badgeLabel || "FLAGSHIP EVENT"}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-mono">
                              {item.name}
                            </h3>
                            {item.chapterName && (
                              <div className="text-xs font-mono text-muted-foreground">
                                {item.chapterName}
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
                            <Calendar className="size-3.5 text-primary" />
                            <span>
                              {new Date(item.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>

                          <Link href={targetLink} prefetch={false}>
                            <Button variant="default" size="sm" bleed={true} className="gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
                              <span>View Initiative</span>
                              <ArrowRight className="size-3.5 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ALL PROJECTS GRID SECTION */}
          <div className="space-y-4 pt-6">
            {!loading &&
              featuredProjects.length > 0 &&
              regularProjects.length > 0 && (
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-muted-foreground tracking-widest">
                  <FolderGit2 className="size-4 text-muted-foreground" />
                  <span>All Chapter Projects &amp; Missions</span>
                </div>
              )}

            {/* Bleeding Grid Layout for All Projects */}
            <div className="relative">
              {/* Extended Horizontal Bleed Lines */}
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y md:divide-y-0 divide-border/60 bg-background relative z-0">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y md:divide-y-0 divide-border/60 bg-background relative z-0">
                  {(regularProjects.length > 0
                    ? regularProjects
                    : projects
                  ).map((item) => {
                    const mediaUrl = getMediaUrl(item.image);
                    const targetLink =
                      item.customLink || `/projects/${item.slug}`;

                    return (
                      <div
                        key={item.id}
                        className="p-6 bg-card/30 hover:bg-card/60 transition-colors group flex flex-col justify-between h-full border-r border-border/60 last:border-r-0 space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Image Container */}
                          <div className="w-full aspect-video bg-muted border border-border/60 relative overflow-hidden flex items-center justify-center">
                            {mediaUrl ? (
                              <Image
                                src={mediaUrl}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="text-muted-foreground text-xs font-mono">
                                SEDS Chapter Project
                              </div>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2 font-mono">
                            {item.name}
                          </h3>

                          {item.chapterName && (
                            <div className="text-xs text-muted-foreground font-mono">
                              {item.chapterName}
                            </div>
                          )}

                          <p className="text-xs leading-relaxed text-muted-foreground flex-1 line-clamp-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Footer area inside card */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
                            <Calendar className="size-3.5 text-primary" />
                            <span>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <Link href={targetLink} prefetch={false}>
                            <Button variant="outline" size="sm" bleed={true} className="font-mono text-xs">
                              Know More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* No Results */}
          {!loading && projects.length === 0 && (
            <div className="relative my-12">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

              <div className="text-center py-12 px-4 bg-card/40 border border-border/60 max-w-2xl mx-auto space-y-4 relative z-0">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto border border-primary/20 text-primary">
                  <SearchX className="size-8" />
                </div>
                <h3 className="text-xl font-bold font-mono text-foreground">
                  No projects or events found
                </h3>
                <p className="text-muted-foreground text-xs font-mono max-w-md mx-auto">
                  We couldn't find any projects matching &quot;{searchQuery}&quot;. Try adjusting your search keywords.
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    bleed={true}
                    onClick={() => setSearchQuery("")}
                    className="cursor-pointer font-mono text-xs"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
