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

export const revalidate = 86400; // Revalidate every 24 hours

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

  return (
    <div className="w-full divide-y divide-border/60">
      <SectionOne />
      <Chapters initialChapters={chapters} />
      <DivisionsSection initialDivisions={divisions} />
      <ProjectsSection initialProjects={projects} />
      <FAQSection />
      <WhoWeAreSection />
      <ContactSection />
    </div>
  );
}
