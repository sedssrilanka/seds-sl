import type { Metadata } from "next";
import { fetchChapters } from "@/actions/chapters";
import { ChaptersClient } from "./ChaptersClient";
import type { Chapter } from "@/types";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "SEDS Chapters | SEDS Sri Lanka",
  description:
    "Explore our various SEDS chapters across Sri Lanka. Each chapter brings unique perspectives and initiatives to advance space exploration and technology.",
  openGraph: {
    title: "SEDS Chapters | SEDS Sri Lanka",
    description:
      "Explore our various SEDS chapters across Sri Lanka. Each chapter brings unique perspectives and initiatives to advance space exploration and technology.",
    images: [{ url: "/section-header/who-we-are-bg.jpg" }],
  },
};

export default async function ChaptersPage() {
  let initialChapters: Chapter[] = [];
  try {
    initialChapters = await fetchChapters();
  } catch (error) {
    console.error("Error pre-fetching chapters:", error);
  }

  return <ChaptersClient initialChapters={initialChapters} />;
}
