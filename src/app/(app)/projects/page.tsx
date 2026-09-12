import type { Metadata } from "next";
import { fetchProjects, type UnifiedProjectItem } from "@/actions/projects";
import { ProjectsClient } from "./ProjectsClient";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Our Projects & Flagship Events | SEDS Sri Lanka",
  description:
    "Discover the innovative projects developed by our student chapters alongside flagship space exploration initiatives.",
  openGraph: {
    title: "Our Projects & Flagship Events | SEDS Sri Lanka",
    description:
      "Discover the innovative projects developed by our student chapters alongside flagship space exploration initiatives.",
    images: [
      { url: "/images/projects/nsa-cover.png", width: 1200, height: 630 },
    ],
  },
};

export default async function ProjectsPage() {
  let initialProjects: UnifiedProjectItem[] = [];
  try {
    initialProjects = await fetchProjects();
  } catch (error) {
    console.error("Error pre-fetching projects:", error);
  }

  return <ProjectsClient initialProjects={initialProjects} />;
}
