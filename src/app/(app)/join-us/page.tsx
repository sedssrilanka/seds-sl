import type { Metadata } from "next";
import { JoinUsFormCodeBased } from "@/components/forms/JoinUsFormCodeBased";
import { SectionHeader } from "@/components/sections/section-header";
import { getAllChapters } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Join Us | SEDS Sri Lanka",
  description:
    "Apply to become a member of SEDS Sri Lanka and contribute to the global space exploration community.",
};

export const revalidate = 3600;

export default async function JoinUsPage() {
  let chapters: { slug: string; name: string; university?: string | null }[] =
    [];
  try {
    const rawChapters = await getAllChapters();
    chapters = rawChapters.map((ch) => ({
      slug: ch.slug,
      name: ch.name,
      university: ch.university,
    }));
  } catch (error) {
    console.error("Error loading chapters for Join Us page:", error);
  }

  return (
    <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-20">
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Hero Header */}
          <SectionHeader
            title="Join SEDS Sri Lanka"
            description={
              <>
                Become part of Sri Lanka&apos;s largest student-driven space
                exploration and research organization. Apply below to shape the
                future of space technology.
              </>
            }
            image="/section-header/join-us-bg.jpg"
          />

          {/* Form Container */}
          <div className="mt-10 lg:mt-14 max-w-4xl mx-auto space-y-4">
            <div className="space-y-1 px-4 md:px-0">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Apply for National or Chapter Membership
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Select your university chapter or apply as an independent
                national member.
              </p>
            </div>

            <JoinUsFormCodeBased chapters={chapters} />
          </div>
        </div>
      </div>
    </main>
  );
}
