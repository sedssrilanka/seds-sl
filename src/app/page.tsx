import SectionOne from "@/components/sections/home-page/section-one";
import Chapters from "@/components/sections/home-page/chapters";
import DivisionsSection from "@/components/sections/home-page/division/divisionsection";
import WhoWeAreSection from "@/components/sections/home-page/who-we-are/whowearesection";
import ContactSection from "@/components/sections/home-page/contact/contact-section";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SectionOne />
      <Chapters />
      <DivisionsSection />
      <WhoWeAreSection />
      <ContactSection />
    </div>
  );
}
