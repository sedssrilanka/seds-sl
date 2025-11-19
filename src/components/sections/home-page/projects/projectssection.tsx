import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/sections/section-header";
import { PayloadSDK } from "@payloadcms/sdk";
import Link from "next/link";
import type { Project } from "@/payload-types";

const payload = new PayloadSDK({
  baseURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000/api",
});

async function getProjects(): Promise<Project[]> {
  console.log("Fetching unassigned projects for homepage...");
  try {
    // Fetch projects that are NOT assigned to a chapter (using Payload's OR operator)
    const result = await payload.find({
      collection: "projects",
      limit: 3,
      sort: "-createdAt",
      where: {
        or: [
          {
            chapter: {
              equals: null,
            },
          },
          {
            chapter: {
              exists: false,
            },
          },
        ],
      },
      depth: 1,
    });
    return result.docs as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="rounded-none p-4 md:p-6 border shadow-sm dark:shadow-none">
    <div className=" flex flex-col h-full">
      {/* Project Image Placeholder - Standard 16:9 aspect ratio */}
      <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 mb-4 flex items-center justify-center">
        <div className="text-primary/60 text-sm font-medium">Project Image</div>
      </div>

      <CardTitle className="text-xl font-bold mb-3 text-foreground">
        {project.name}
      </CardTitle>

      {project.chapter && (
        <div className="text-sm text-muted-foreground mb-2">
          Chapter:{" "}
          {typeof project.chapter === "object"
            ? project.chapter.name
            : project.chapter}
        </div>
      )}

      <CardDescription className="text-sm leading-relaxed mb-4 text-muted-foreground flex-1">
        {project.description.length > 120
          ? `${project.description.substring(0, 120)}...`
          : project.description}
      </CardDescription>

      {/* Bottom Section with Date and Button */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4" />
          <span className="text-sm font-medium">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Link href={`/projects/${project.slug}`}>
          <Button variant="outline" size="sm" className="rounded-sm">
            Know More
          </Button>
        </Link>
      </div>
    </div>
  </Card>
);

const ProjectsSection = async () => {
  const projects = await getProjects();

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

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 border-border/60 dark:border-border/50">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              {/* View All Projects Card */}
              <Card className="rounded-none light-mode-card p-8 cursor-pointer transition-colors duration-300 hover:border-primary/30 dark:hover:border-primary/20 shadow-sm dark:shadow-none">
                <div className="flex flex-col items-end justify-start h-full text-right">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    Explore More Projects
                  </h3>
                  <div className="flex items-right gap-2 text-primary">
                    <span className="font-medium">View All Projects</span>
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
