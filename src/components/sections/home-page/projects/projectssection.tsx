"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import Link from "next/link";
import type { Project } from "@/payload-types";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="p-6 md:p-8 bg-background group flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold mb-3 text-foreground transition-colors group-hover:text-primary">
          {project.name}
        </h3>

        {project.chapter && (
          <div className="text-sm text-muted-foreground mb-2 font-mono">
            Chapter:{" "}
            {typeof project.chapter === "object"
              ? project.chapter.name
              : project.chapter}
          </div>
        )}

        <p className="text-sm leading-relaxed mb-4 text-muted-foreground flex-1">
          {project?.description?.length > 120
            ? `${project.description.substring(0, 120)}...`
            : project.description}
        </p>

        {/* Bottom Section with Date and Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
            <Calendar className="size-3.5" />
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>

          <Link href={`/projects/${project.slug}`}>
            <Button variant="outline" size="sm" bleed={true}>
              Know More
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects?limit=3&depth=1&sort=-createdAt")
      .then((res) => res.json())
      .then((data) => setProjects(data.docs || []))
      .catch(console.error);
  }, []);

  return (
    <section className="light-mode-section relative w-full pt-8 md:pt-12 lg:pt-16">
      <div className="section-background bg-background dark:bg-black"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Ongoing Local Projects"
            description={
              <>
                Here are our ongoing local projects by SEDS Sri Lanka that
                showcase the organization's commitment to advancing space <br />
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
                  className="block h-full group bg-background p-8 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      Explore More Projects
                    </h3>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium">View All Projects</span>
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
