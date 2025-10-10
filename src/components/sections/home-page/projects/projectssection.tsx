import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

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
  <Card className="bg-background border-input rounded-lg px-8 py-8 min-h-[320px] flex flex-col justify-between h-full w-full">
    <div>
      <CardTitle className="text-xl font-bold mb-4 text-foreground">{project.title}</CardTitle>
      <CardDescription className="text-sm leading-relaxed mb-6 text-muted-foreground">{project.description}</CardDescription>
    </div>
    <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2 text-primary">
        <Calendar className="size-4" />
        <span className="text-sm font-medium">{project.date}</span>
      </div>
      <Button
        variant="outline"
        className="bg-primary text-primary-foreground font-medium text-sm rounded-xl px-4 py-2 border-none hover:bg-primary/90 transition-colors shadow-sm"
      >
        Project details
      </Button>
    </div>
  </Card>
);

const ProjectsSection = () => {
  return (
    <section className="relative w-full py-16 text-foreground">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 mx-auto w-full px-6 max-w-7xl">
        <Card
          className="text-center mb-12 p-8 w-full"
          style={{
            backgroundImage: `url(/projectsimg/space-projects-bg.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <CardTitle className="text-4xl font-bold mb-4">
            Ongoing Local Projects
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Here are four ongoing local projects by SEDS Sri Lanka that showcase the organization's commitment to advancing space <br />exploration and technology:
          </CardDescription>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;