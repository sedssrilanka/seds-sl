import React from "react";
import { notFound } from "next/navigation";
import { getDivisionBySlug, getAllDivisions } from "@/lib/keystatic";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeftIcon,
  Bot,
  Rocket,
  Laptop,
  Telescope,
  Plane,
  Microscope,
  Users,
  Camera,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Markdoc from "@markdoc/markdoc";

const IconMap: Record<string, LucideIcon> = {
  Bot,
  Rocket,
  Laptop,
  Plane,
  Microscope,
  Telescope,
  Briefcase,
  Camera,
  Users,
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const divisions = await getAllDivisions();
  return divisions.map((div) => ({ slug: div.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) return { title: "Division Not Found | SEDS Sri Lanka" };

  return {
    title: `${division.name} | SEDS Sri Lanka Divisions`,
    description: division.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [division, allDivisions] = await Promise.all([
    getDivisionBySlug(slug),
    getAllDivisions(),
  ]);

  if (!division) {
    notFound();
  }

  const Content = await division.content();
  const IconComponent = IconMap[division.icon as keyof typeof IconMap] || Rocket;

  let renderedContent: React.ReactNode = null;
  if (Content?.node) {
    const transformed = Markdoc.transform(Content.node);
    renderedContent = Markdoc.renderers.react(transformed, React);
  } else if (typeof Content === "string") {
    renderedContent = <p className="whitespace-pre-line">{Content}</p>;
  } else {
    renderedContent = <p className="text-muted-foreground">{division.description}</p>;
  }

  const otherDivisions = allDivisions.filter((d) => d.slug !== division.slug);

  return (
    <div className="flex flex-col w-full min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Back Breadcrumb */}
        <div className="mb-8">
          <Link href="/divisions">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ChevronLeftIcon className="w-4 h-4" /> BACK TO DIVISIONS
            </Button>
          </Link>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
          {/* Main Article Content (8 Columns on desktop) */}
          <article className="lg:col-span-8 space-y-8 min-w-0">
            {/* Division Header Banner */}
            <div className="border-b border-border/60 pb-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary">
                  <IconComponent className="size-6 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                  SEDS Sri Lanka Student Division
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {division.name}
              </h1>

              {division.lead && (
                <p className="text-xs text-muted-foreground font-mono">
                  Coordination: <span className="text-foreground font-semibold">{division.lead}</span>
                </p>
              )}

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {division.description}
              </p>
            </div>

            {/* Rich Content Body */}
            <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:tracking-tight prose-a:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
              {renderedContent}
            </div>
          </article>

          {/* Sticky Join Now & Quick Nav Sidebar (4 Columns on desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
            {/* Join Division Card */}
            <div className="border border-border/60 bg-background p-6 sm:p-7 space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Get Involved</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Join This Division
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join fellow student space enthusiasts in Sri Lanka. Attend hands-on workshops, participate in study circles, and work on fun team projects.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground border-y border-border/60 py-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Open to all university & school students</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Beginner friendly: no prior experience required</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>100% Free student community membership</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Hands-on workshops, field days & mentorship</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full font-semibold cursor-pointer">
                <Link href="/join-us">
                  Join SEDS Sri Lanka <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <div className="text-center pt-1">
                <p className="text-[11px] text-muted-foreground font-mono">
                  Have questions?{" "}
                  <Link href="/contact-us" className="text-primary hover:underline font-semibold">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>

            {/* Other Divisions Navigation Card */}
            {otherDivisions.length > 0 && (
              <div className="border border-border/60 bg-background p-6 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                  Explore Other Divisions
                </h4>
                <div className="space-y-2.5">
                  {otherDivisions.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/divisions/${d.slug}`}
                      className="block text-xs text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1.5 border-b border-border/30 last:border-0"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/divisions"
                  className="text-xs font-mono text-primary hover:underline flex items-center gap-1 pt-2 block font-semibold"
                >
                  <span>View all divisions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
