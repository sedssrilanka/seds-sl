import type { Metadata } from "next";
import SectionOne from "@/components/sections/home-page/section-one";
import Chapters from "@/components/sections/home-page/chapters";
import DivisionsSection from "@/components/sections/home-page/division/divisionsection";
import ProjectsSection from "@/components/sections/home-page/projects/projectssection";
import FAQSection from "@/components/sections/home-page/faqs/faqsection";
import WhoWeAreSection from "@/components/sections/home-page/who-we-are/whowearesection";
import ContactSection from "@/components/sections/home-page/contact/contact-section";
import { fetchChapters } from "@/actions/chapters";
import { fetchProjects, type UnifiedProjectItem } from "@/actions/projects";
import { getAllDivisions } from "@/lib/keystatic";
import { getServerSideURL } from "@/utilities/getURL";

export const revalidate = 86400; // Revalidate every 24 hours

export const metadata: Metadata = {
  title: "SEDS Sri Lanka | Official Space Exploration & Development Portal",
  description:
    "Welcome to SEDS Sri Lanka. Discover our student chapters, aerospace initiatives, satellite projects, rocketry developments, and nationwide astronomy events.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SEDS Sri Lanka | Official Space Exploration & Development Portal",
    description:
      "Empowering students across Sri Lankan universities to design satellites, build rockets, and advance space science.",
    url: "/",
    images: [{ url: "/section-header/space-projects-bg.jpeg", width: 1200, height: 630 }],
  },
};

export default async function Home() {
  let divisions: any[] = [];
  let chapters: any[] = [];
  let projects: UnifiedProjectItem[] = [];

  try {
    const rawDivisions = await getAllDivisions();
    divisions = rawDivisions.slice(0, 3).map((div) => ({
      id: div.slug,
      name: div.name,
      slug: div.slug,
      lead: div.lead,
      description: div.description,
      createdAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Error loading divisions for homepage:", err);
  }

  try {
    chapters = await fetchChapters();
  } catch (err) {
    console.error("Error loading chapters for homepage:", err);
  }

  try {
    const fetchedProjects = await fetchProjects();
    projects = fetchedProjects.slice(0, 3);
  } catch (err) {
    console.error("Error loading projects for homepage:", err);
  }

  const siteURL = getServerSideURL();
  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SEDS Sri Lanka",
    url: siteURL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteURL}/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <div className="w-full divide-y divide-border/60">
        <SectionOne />
        <Chapters initialChapters={chapters} />
        <DivisionsSection initialDivisions={divisions} />
        <ProjectsSection initialProjects={projects} />
        <FAQSection />
        <WhoWeAreSection />
        <ContactSection />
      </div>
    </>
  );
}
