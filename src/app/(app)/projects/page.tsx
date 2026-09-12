import type { Metadata } from "next";
import { fetchProjects, type UnifiedProjectItem } from "@/actions/projects";
import { ProjectsClient } from "./ProjectsClient";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Our Projects & Flagship Events | SEDS Sri Lanka",
  description:
    "Discover the innovative projects developed by our student chapters alongside flagship space exploration initiatives.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Our Projects & Flagship Events | SEDS Sri Lanka",
    description:
      "Discover the innovative projects developed by our student chapters alongside flagship space exploration initiatives.",
    url: "/projects",
    siteName: "SEDS Sri Lanka",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "/images/projects/nsa-cover.png",
        width: 1200,
        height: 630,
        alt: "SEDS Sri Lanka Projects and Flagship Initiatives",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects & Flagship Events | SEDS Sri Lanka",
    description:
      "Discover the innovative projects developed by our student chapters alongside flagship space exploration initiatives.",
    images: ["/images/projects/nsa-cover.png"],
    site: "@sedssl",
    creator: "@sedssl",
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
