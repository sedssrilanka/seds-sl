import type { Metadata } from "next";
import { JoinUsFormCodeBased } from "@/components/forms/JoinUsFormCodeBased";
import { SectionHeader } from "@/components/sections/section-header";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Join Us | SEDS Sri Lanka",
  description:
    "Apply to become a member of SEDS Sri Lanka and contribute to the global space exploration community.",
};

export default function JoinUsPage() {
  return (
    <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <SectionHeader
          title="Join SEDS Sri Lanka"
          description={
            <>
              Become part of Sri Lanka's largest student-driven space exploration and research organization. Fill out the membership form below to get started.
            </>
          }
          image="/section-header/join-us-bg.jpg"
        />

        <div className="py-8 md:py-12 max-w-3xl mx-auto">
          <Card className="rounded-none light-mode-card p-6 md:p-8 shadow-sm dark:shadow-none bg-background border border-border/60">
            <JoinUsFormCodeBased />
          </Card>
        </div>
      </div>
    </main>
  );
}
