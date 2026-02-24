"use client";

import type { Project } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { Search, X, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchProjects } from "@/actions/projects";

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
    <div className="grid-container section-content">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the innovative projects developed by our student chapters,
            ranging from rocketry to rovers and satellite technology.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/50 overflow-hidden bg-card/40 animate-pulse h-full flex flex-col"
              >
                <div className="w-full h-48 bg-muted/50" />
                <div className="p-4 grow space-y-3">
                  <div className="h-6 bg-muted/50 rounded w-2/3" />
                  <div className="h-4 bg-muted/50 rounded w-full" />
                  <div className="h-4 bg-muted/50 rounded w-4/5" />
                  <div className="h-4 bg-muted/50 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-muted/20">
                  {project.image ? (
                    <Image
                      src={getMediaUrl(project.image)}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                      <Image
                        src="/placeholder.svg"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-50"
                      />
                    </div>
                  )}
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-80" />

                  {/* Chapter badge overlay */}
                  {project.chapter && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-sm">
                        {getChapterName(project.chapter)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h2 className="text-xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 grow">
                    {project.description}
                  </p>

                  {/* Footer area inside card */}
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                    <span className="text-primary font-medium flex items-center gap-1">
                      Read more
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        role="img"
                        aria-label="Arrow Right"
                      >
                        <title>Arrow Right</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
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
  );
}
