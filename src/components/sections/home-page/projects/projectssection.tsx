import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/sections/section-header";

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Operation: Serendib",
    description:
      "Operation: Serendib is a series of high-altitude balloon missions aimed at near-space exploration. Building upon the success of Serendib 1.0 and 2.0, which tested components for the ORAGAN CubeSat satellite, the upcoming Serendib 3.0 mission is set to launch within the year 2024. These missions provide valuable data for aerospace research and inspire the next generation of scientists and engineers in Sri Lanka.",
    date: "2025.12.25",
  },
  {
    id: 2,
    title: "Sky-Lead Project",
    description:
      "The Sky-Lead project, initiated by the Aeronautical Division of SEDS Sri Lanka, focuses on constructing a short runway system for Unmanned Aerial Vehicles (UAVs). This infrastructure development is significant as it marks the beginning of a new era in Sri Lankan UAV operations, fostering an alliance of students passionate about aeronautics. The goal is to provide essential facilities for UAV testing and development, contributing to advancements in unmanned aviation technology.",
    date: "2025.12.25",
  },
  {
    id: 3,
    title: "ORAGAN CubeSat Project",
    description:
      "The ORAGAN CubeSat project is a collaborative effort involving students from various universities, including Wayamba University of Sri Lanka. The ORAGAN 1.0 CubeSat was successfully launched from Dambulla on December 26, 2021. This satellite conducts near-space and environmental experiments, providing students with hands-on experience in satellite technology and contributing to Sri Lanka's growing capabilities in space science.",
    date: "2025.12.25",
  },
  {
    id: 4,
    title: "Taprobane Mars Rover Project",
    description:
      "The Taprobane project aims to develop Sri Lanka's first analog Mars rover. This initiative provides students with the opportunity to engage in planetary exploration simulations, enhancing their understanding of robotics, space science, and engineering. By participating in this project, students contribute to the global effort of preparing for future Mars missions and gain practical experience in space exploration technologies.",
    date: "2025.12.25",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="rounded-none border">
    <div className="p-6 flex flex-col h-full">
      {/* Project Image Placeholder - Standard 16:9 aspect ratio */}
      <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 mb-4 flex items-center justify-center">
        <div className="text-primary/60 text-sm font-medium">Project Image</div>
      </div>
      
      <CardTitle className="text-xl font-bold mb-3 text-foreground">
        {project.title}
      </CardTitle>
      
      <CardDescription className="text-sm leading-relaxed mb-4 text-muted-foreground flex-1">
        {project.description.length > 120 
          ? `${project.description.substring(0, 120)}...` 
          : project.description
        }
      </CardDescription>
      
      {/* Bottom Section with Date and Button */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4" />
          <span className="text-sm font-medium">{project.date}</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="rounded-sm"
        >
          Know More
        </Button>
      </div>
    </div>
  </Card>
);

const ProjectsSection = () => {
  return (
    <section className="bg-black relative w-full p-6">
      <div className="flex flex-col items-center mx-auto max-w-7xl">
        <SectionHeader
          title="Ongoing Local Projects"
          description={
            <>
              Here are four ongoing local projects by SEDS Sri Lanka that showcase
              the organization's commitment to advancing space <br />
              exploration and technology:
            </>
          }
          image="/projectsimg/space-projects-bg.jpeg"
        />

        <div className="w-full max-w-5xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 border-border dark:border-border/50">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {/* View All Projects Card */}
            <Card className="rounded-none border p-8 cursor-pointer transition-colors duration-300 hover:border-primary/20 ">
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
    </section>
  );
};

export default ProjectsSection;
