import type { Metadata } from "next";
import { JoinUsFormCodeBased } from "@/components/forms/JoinUsFormCodeBased";
import { SectionHeader } from "@/components/sections/section-header";
import {
  Rocket,
  Users,
  Globe,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Join Us | SEDS Sri Lanka",
  description:
    "Apply to become a member of SEDS Sri Lanka and contribute to the global space exploration community.",
};

const perks = [
  {
    icon: <Rocket className="size-6 text-primary" />,
    title: "Hands-on Space Projects",
    description:
      "Build high-altitude balloons, CubeSats, rovers, and astronomy research instruments.",
  },
  {
    icon: <Globe className="size-6 text-primary" />,
    title: "Global SEDS Network",
    description:
      "Connect directly with over 100+ international chapters and SEDS Earth conferences.",
  },
  {
    icon: <Award className="size-6 text-primary" />,
    title: "Competitions & Hackathons",
    description:
      "Participate in global space competitions, design challenges, and hackathons.",
  },
  {
    icon: <Users className="size-6 text-primary" />,
    title: "Mentorship & Career Growth",
    description:
      "Learn directly from aerospace engineers, astrophysicists, and industry mentors.",
  },
];

const stats = [
  { label: "Active Members", value: "500+" },
  { label: "University Chapters", value: "6+" },
  { label: "Projects Completed", value: "15+" },
];

export default function JoinUsPage() {
  return (
    <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-16">
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Hero Header */}
          <SectionHeader
            title="Join SEDS Sri Lanka"
            description={
              <>
                Become part of Sri Lanka's largest student-driven space
                exploration and research organization. Apply below to shape the
                future of space technology.
              </>
            }
            image="/section-header/join-us-bg.jpg"
          />

          {/* 2-Column High-Tech Bleeding Grid Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Perks, Benefits & Stats */}
            <div className="lg:col-span-5 space-y-8">
              {/* Membership Benefits Box */}
              <div className="relative">
                {/* Extended Horizontal Bleed Lines */}
                <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                <div className="border border-border/60 divide-y divide-border/60 bg-background relative z-0">
                  <div className="p-6 bg-background space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                      <Sparkles className="size-4" />
                      <span>Why Join SEDS SL?</span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Empowering the Next Generation of Space Pioneers
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Whether you are an engineer, designer, researcher, or
                      space enthusiast, SEDS Sri Lanka provides the platform to
                      turn passion into real-world impact.
                    </p>
                  </div>

                  {perks.map((perk, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-background flex items-start gap-4"
                    >
                      <div className="p-2.5 bg-primary/10 border border-primary/20 shrink-0">
                        {perk.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-base text-foreground">
                          {perk.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {perk.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="relative">
                <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />

                <div className="grid grid-cols-3 divide-x divide-border/60 border border-border/60 bg-background relative z-0">
                  {stats.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-4 text-center space-y-1 bg-background"
                    >
                      <div className="text-2xl md:text-3xl font-bold font-mono text-primary">
                        {st.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-7">
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  <CheckCircle2 className="size-4" />
                  <span>Membership Application</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Fill Out Your Application Form
                </h2>
              </div>

              <div className="bg-background">
                <JoinUsFormCodeBased />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
