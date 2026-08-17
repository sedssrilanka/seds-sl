import SectionOne from "@/components/sections/home-page/section-one";
import Chapters from "@/components/sections/home-page/chapters";
import DivisionsSection from "@/components/sections/home-page/division/divisionsection";
import ProjectsSection from "@/components/sections/home-page/projects/projectssection";
import FAQSection from "@/components/sections/home-page/faqs/faqsection";
import WhoWeAreSection from "@/components/sections/home-page/who-we-are/whowearesection";
import ContactSection from "@/components/sections/home-page/contact/contact-section";

export const revalidate = 60; // Revalidate every 60 seconds

export default function Home() {
  return (
    <div className="w-full divide-y divide-border/60">
      <SectionOne />
      <Chapters />
      <DivisionsSection />
      <ProjectsSection />
      <FAQSection />
      <WhoWeAreSection />
      <ContactSection />
    </div>
  );
}
