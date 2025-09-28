import SectionOne from "@/components/sections/home-page/section-one";
import Chapters from "@/components/sections/home-page/chapters";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SectionOne />
      <Chapters />
    </div>
  );
}
