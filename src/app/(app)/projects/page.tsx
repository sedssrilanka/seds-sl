"use client";

import type { Project } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { Search, X, SearchX, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchProjects } from "@/actions/projects";
import { SectionHeader } from "@/components/sections/section-header";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [loading, setLoading] = useState(true);

  const getMediaUrl = (media: Project["image"]): string => {
    if (typeof media === "object" && media !== null && "url" in media) {
      if (media.url) return media.url;
    }
    return "";
  };

  const getChapterName = (chapter: Project["chapter"]): string => {
    if (typeof chapter === "object" && chapter !== null && "name" in chapter) {
      return chapter.name || "";
    }
    return "";
  };

  useEffect(() => {
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
  }, [debouncedSearchQuery]);

  return (
    <div className="flex flex-col w-full">
      <SectionHeader
        title="Our Projects"
        description="Discover the innovative projects developed by our student chapters, ranging from rocketry to rovers and satellite technology."
        image="/section-header/space-projects-bg.jpeg"
      />
      <div className="grid-container section-content mt-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Search Bar */}
          <div className="max-w-lg mx-auto my-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary z-10" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 w-full bg-background/50 backdrop-blur-md border-muted-foreground/20 rounded-2xl shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
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
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-border/60 dark:border-border/50">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="rounded-none p-4 md:p-6 border shadow-sm dark:shadow-none group overflow-hidden flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="w-full aspect-video bg-muted border border-border/50 mb-4 relative overflow-hidden flex items-center justify-center">
                    {project.image ? (
                      <Image
                        src={getMediaUrl(project.image)}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-muted-foreground text-sm font-medium">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardTitle className="text-xl font-bold mb-3 text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {project.name}
                  </CardTitle>

                  {project.chapter && (
                    <div className="text-sm text-muted-foreground mb-2">
                      Chapter: {getChapterName(project.chapter)}
                    </div>
                  )}

                  <CardDescription className="text-sm leading-relaxed mb-4 text-muted-foreground flex-1 line-clamp-3">
                    {project.description}
                  </CardDescription>

                  {/* Footer area inside card */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      <span className="text-sm font-medium">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Link href={`/projects/${project.slug}`}>
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
          {!loading && projects.length === 0 && (
            <div className="text-center mt-16 py-12 px-4 rounded-3xl bg-muted/20 border border-border/50 border-dashed max-w-2xl mx-auto backdrop-blur-sm">
              <div className="bg-background/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50">
                <SearchX className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                We couldn't find any projects matching "{searchQuery}". Try
                adjusting your search terms.
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
        </div>
      </div>
    </div>
  );
}
