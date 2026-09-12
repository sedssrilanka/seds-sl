"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import Link from "next/link";
import Image from "next/image";
import { fetchProjects, type UnifiedProjectItem } from "@/actions/projects";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const getMediaUrl = (imageObj: any) => {
  if (!imageObj) return null;
  if (typeof imageObj === "string") return imageObj;
  if (typeof imageObj === "object" && imageObj.url) return imageObj.url;
  return null;
};

const ProjectCard = ({
  project,
  index,
}: {
  project: UnifiedProjectItem;
  index: number;
}) => {
  const targetLink = project.customLink || `/projects/${project.slug}`;
  const mediaUrl = getMediaUrl(project.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="p-6 md:p-8 bg-background group flex flex-col h-full justify-between space-y-6"
    >
      <div className="flex flex-col space-y-4">
        {/* Cover Image Preview */}
        {mediaUrl && (
          <Link
            href={targetLink}
            prefetch={false}
            className="block overflow-hidden"
          >
            <div className="w-full aspect-video bg-muted border border-border/60 relative overflow-hidden">
              <Image
                src={mediaUrl}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Link>
        )}

        {project.badgeLabel && (
          <div className="text-[10px] font-mono font-bold uppercase text-primary tracking-wider">
            {project.badgeLabel}
          </div>
        )}

        <Link href={targetLink} prefetch={false}>
          <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary font-mono leading-snug">
            {project.name}
          </h3>
        </Link>

        {project.chapterName && (
          <div className="text-xs text-muted-foreground font-mono">
            {project.chapterName}
          </div>
        )}

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project?.description?.length > 140
            ? `${project.description.substring(0, 140)}...`
            : project.description}
        </p>
      </div>

      {/* Bottom Section with Date and Button */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
          <Calendar className="size-3.5" />
          <span>
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <Link href={targetLink} prefetch={false}>
          <Button variant="outline" size="sm" bleed={true}>
            Know More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export function ProjectsSection({
  initialProjects = [],
}: {
  initialProjects?: UnifiedProjectItem[];
}) {
  const [projects, setProjects] =
    useState<UnifiedProjectItem[]>(initialProjects);

  useEffect(() => {
    if (initialProjects.length > 0) return;
    fetchProjects()
      .then((data) => setProjects(data.slice(0, 3)))
      .catch(console.error);
  }, [initialProjects]);

  return (
    <section className="light-mode-section relative w-full pt-8 md:pt-12 lg:pt-16">
      <div className="section-background bg-background dark:bg-black" />
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Ongoing Local Projects & Flagship Initiatives"
            description={
              <>
                Here are our ongoing local projects and flagship space
                initiatives by SEDS Sri Lanka that showcase the organization's
                commitment to advancing space <br />
                exploration and technology:
              </>
            }
            image="/section-header/space-projects-bg.jpeg"
          />

          <div className="mt-12 relative">
            {/* Extended Horizontal Bleed Lines */}
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

            {/* Extended Vertical Bleed Lines */}
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />
            <div className="hidden md:block absolute -top-6 -bottom-6 left-1/2 border-l border-border/40 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 border border-border/60 divide-y divide-border/60 md:divide-y-0 md:divide-x bg-background relative z-0">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}

              {/* View All Projects Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Link
                  href="/projects"
                  prefetch={false}
                  className="block h-full group bg-background p-8 flex items-center justify-center min-h-[320px]"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold mb-4 text-foreground font-mono">
                      Explore More Projects
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                      Discover all student chapter projects, rovers, and
                      flagship space missions across Sri Lanka.
                    </p>
                    <Button variant="default" size="sm" bleed={true}>
                      View All Projects
                    </Button>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
