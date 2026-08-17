import type { Metadata } from "next";
import AboutUsPage from "@/components/sections/about-us/about-us-page";

export const metadata: Metadata = {
  title: "About Us | SEDS Sri Lanka",
  description:
    "SEDS Sri Lanka is a student-driven space and technology organization dedicated to inspiring the next generation of innovators, engineers, and researchers in Sri Lanka.",
  keywords: [
    "SEDS Sri Lanka",
    "Space Education",
    "Aerospace Sri Lanka",
    "Student Rocketry",
    "Space Science",
    "Technology Organization",
  ],
  openGraph: {
    title: "About Us | SEDS Sri Lanka",
    description:
      "SEDS Sri Lanka is a student-driven space and technology organization dedicated to inspiring the next generation of innovators, engineers, and researchers in Sri Lanka.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <AboutUsPage />
    </main>
  );
}
