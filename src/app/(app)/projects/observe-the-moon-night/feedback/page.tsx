import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  MessageSquareHeart,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TallyEmbed } from "@/components/ui/TallyEmbed";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

export const metadata: Metadata = {
  title:
    "Event Feedback | International Observe the Moon Night 2026 | SEDS Sri Lanka",
  description:
    "Share your feedback for International Observe the Moon Night 2026 (Virtual Edition) organized by SEDS Sri Lanka and SEDS India, with live streaming by SEDS Celestia.",
  alternates: {
    canonical: "/projects/observe-the-moon-night/feedback",
  },
  openGraph: mergeOpenGraph({
    title:
      "Event Feedback - International Observe the Moon Night 2026 | SEDS Sri Lanka",
    description:
      "Share your feedback for International Observe the Moon Night 2026 (Virtual Edition) organized by SEDS Sri Lanka and SEDS India, with live streaming by SEDS Celestia.",
    url: "/projects/observe-the-moon-night/feedback",
    type: "website",
    images: [
      {
        url: "/images/projects/iotm-day-2026.png",
        width: 1200,
        height: 630,
        alt: "International Observe the Moon Night 2026 Feedback - SEDS Sri Lanka",
        type: "image/png",
      },
    ],
  }),
  twitter: {
    card: "summary_large_image",
    title:
      "Event Feedback - International Observe the Moon Night 2026 | SEDS Sri Lanka",
    description:
      "Share your feedback for International Observe the Moon Night 2026 (Virtual Edition) organized by SEDS Sri Lanka and SEDS India.",
    images: ["/images/projects/iotm-day-2026.png"],
    site: "@sedssl",
    creator: "@sedssl",
  },
};

export default function ObserveMoonFeedbackPage() {
  const tallyFeedbackEmbedUrl = "https://tally.so/embed/gD604M?dynamicHeight=1";
  const tallyFeedbackDirectUrl = "https://tally.so/r/gD604M";

  return (
    <div className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-24 md:pb-32 bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
      {/* Continuous visible vertical margin guide lines & grid guides */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-40 space-y-8">
        {/* BREADCRUMB NAVIGATION */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-card/60 p-4 flex flex-wrap items-center justify-between gap-4 relative z-0">
            <nav className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Link
                href="/"
                prefetch={false}
                className="hover:text-primary transition-colors"
              >
                HOME
              </Link>
              <ChevronRight className="size-3.5 opacity-60" />
              <Link
                href="/projects"
                prefetch={false}
                className="hover:text-primary transition-colors"
              >
                PROJECTS
              </Link>
              <ChevronRight className="size-3.5 opacity-60" />
              <Link
                href="/projects/observe-the-moon-night"
                prefetch={false}
                className="hover:text-primary transition-colors"
              >
                OBSERVE THE MOON NIGHT 2026
              </Link>
              <ChevronRight className="size-3.5 opacity-60" />
              <span className="text-primary font-bold uppercase">FEEDBACK</span>
            </nav>

            <Link href="/projects/observe-the-moon-night" prefetch={false}>
              <Button
                variant="outline"
                size="sm"
                bleed={true}
                className="gap-1.5 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <ChevronLeft className="size-3.5" />
                <span>Event Overview</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* HEADER HERO BANNER */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-card/60 p-6 sm:p-8 lg:p-10 relative z-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
                <MessageSquareHeart className="size-4 text-primary" />
                <span>PARTICIPANT EXPERIENCE & FEEDBACK</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs font-bold uppercase">
                <ShieldCheck className="size-3.5" />
                <span>SEDS SRI LANKA</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-foreground leading-tight">
              Observe the Moon Night{" "}
              <span className="text-primary">Feedback Survey</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-mono leading-relaxed max-w-3xl">
              Thank you for being part of International Observe the Moon Night
              2026. Your insights and suggestions help us make our future
              observation camps, telescopic sessions, and educational workshops
              even better.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={tallyFeedbackDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-border/80 bg-background hover:bg-accent text-foreground font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Open in Fullscreen Form</span>
                <ExternalLink className="size-3.5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* TALLY EMBEDDED FORM CONTAINER */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-card/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 relative z-0">
            <TallyEmbed
              tallyUrl={tallyFeedbackEmbedUrl}
              title="Moon Observation Camp - Feedback"
              height="1766"
              transparentBackground={false}
              className="w-full"
            />
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="pt-4 flex items-center justify-between">
          <Link href="/projects/observe-the-moon-night" prefetch={false}>
            <Button
              variant="outline"
              size="sm"
              bleed={true}
              className="gap-2 font-mono text-xs font-bold uppercase tracking-wider"
            >
              <ChevronLeft className="size-3.5" />
              <span>Back to Observe the Moon Night</span>
            </Button>
          </Link>
          <a
            href={tallyFeedbackDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>Direct Form Link</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
