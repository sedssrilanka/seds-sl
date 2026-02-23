"use client";

import type { Project, Chapter } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/actions/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        const result = await fetchProjects(searchQuery);
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12">
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center text-muted-foreground">
          Loading projects...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="bg-muted/30 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative w-full h-48">
                  {project.image && (
                    <Image
                      src={getMediaUrl(project.image)}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {project.name}
                    </h2>
                    {project.chapter && (
                      <p className="text-xs text-white/80 font-medium">
                        {getChapterName(project.chapter)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && projects.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No projects found{searchQuery ? ` for "${searchQuery}"` : ""}
        </div>
      )}
    </div>
  );
}
