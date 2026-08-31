import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MoonNightRegistrationForm } from "@/components/forms/MoonNightRegistrationForm";
import { getObserveMoonNightProject } from "@/utilities/getObserveMoonNightProject";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const eventData = await getObserveMoonNightProject(slug);

  if (!eventData) {
    return {
      title: "Event Registration | SEDS Sri Lanka",
    };
  }

  return {
    title: `Event Registration | International Observe the Moon Night ${eventData.year} | SEDS Sri Lanka`,
    description: `Register for International Observe the Moon Night ${eventData.year} with SEDS Sri Lanka.`,
  };
}

export default async function ObserveMoonNightAnnualRegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const eventData = await getObserveMoonNightProject(slug);

  if (!eventData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden pt-24 pb-20">
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8 relative z-40">
        {/* Navigation / Back link */}
        <div>
          <Link
            href={`/projects/${eventData.slug}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Observe the Moon Night {eventData.year}</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-3 text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-mono">
            Observe the Moon Night {eventData.year} Registration
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Please complete the multi-step registration form below to reserve
            your spot for International Observe the Moon Night {eventData.year}.
          </p>
        </div>

        {/* Multi-Step Registration Form Container */}
        <div>
          <MoonNightRegistrationForm
            year={eventData.year}
            eventSlug={eventData.slug}
            eventData={eventData}
          />
        </div>
      </div>
    </main>
  );
}
