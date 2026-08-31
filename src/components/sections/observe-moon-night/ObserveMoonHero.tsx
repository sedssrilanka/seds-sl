"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageSquareHeart } from "lucide-react";
import { motion } from "motion/react";

import { SpaceScenePlaceholder } from "./moon-scene";

const MoonScene = dynamic(() => import("./moon-scene"), {
  ssr: false,
  loading: () => <SpaceScenePlaceholder />,
});

interface ObserveMoonHeroProps {
  title?: string;
  year?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locations?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agenda?: any[];
  description?: string;
  slug?: string;
  feedbackUrl?: string;
  isFeedbackActive?: boolean;
}

import { formatEventStartAndEnd } from "@/utilities/generateRegistrationEmail";

export function ObserveMoonHero({
  title = "International Observe the Moon Night",
  year = "2026",
  eventDate,
  startTime,
  endTime,
  locations,
  agenda,
  description = "Join SEDS Sri Lanka for an annual global celebration of lunar science, telescopic observation, and space exploration. Connect with observers worldwide as we look up at the Moon together.",
  slug,
  feedbackUrl,
  isFeedbackActive = true,
}: ObserveMoonHeroProps) {
  const startDateObj = startTime
    ? new Date(startTime)
    : eventDate
      ? new Date(eventDate)
      : null;

  const heroDateDisplay =
    startDateObj && !isNaN(startDateObj.getTime())
      ? startDateObj.toLocaleDateString("en-US", {
          timeZone: "Asia/Colombo",
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : "Sat, Sep 19";

  // Derive location string from locations array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primaryLoc = locations?.find((l: any) => l.isPrimary) || locations?.[0];
  const locationName = primaryLoc
    ? `${primaryLoc.name}${primaryLoc.city ? `, ${primaryLoc.city}` : ""}`
    : undefined;

  const hasAgenda = Boolean(agenda && agenda.length > 0);

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden border-b border-border/60 bg-background">
      {/* 3D Moon & Star Field Canvas Background */}
      <MoonScene />

      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      {/* Hero Content Overlay */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-40 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Card Container */}
          <div className="lg:col-span-8 space-y-6">
            {/* Clean Event Title Tag (No outline, No icon) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono font-bold uppercase text-primary tracking-widest"
            >
              <span>{title.includes(year) ? title : `${title} ${year}`}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-foreground leading-[1.08] font-mono drop-shadow-sm"
            >
              Look Up at the <br />
              <span className="text-primary">Moon Together</span>
            </motion.h1>

            {/* Subtitle Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-sans"
              >
                {description}
              </motion.p>
            )}

            {/* Always Visible Short Event Date Pill (e.g. Sat, Sep 19) */}
            {heroDateDisplay && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2"
              >
                <div className="inline-flex items-center gap-2.5 border border-border/80 bg-background/95 backdrop-blur-md px-3.5 py-2 text-xs font-mono font-bold uppercase text-foreground tracking-wider shadow-xs">
                  <Calendar className="size-3.5 text-primary shrink-0" />
                  <span>{heroDateDisplay}</span>
                </div>
              </motion.div>
            )}

            {/* Hero Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Button asChild variant="default" size="lg" bleed={true}>
                <Link
                  href={
                    slug
                      ? `/projects/${slug}/register`
                      : "/projects/observe-the-moon-night/register"
                  }
                >
                  Register for Event
                </Link>
              </Button>

              {hasAgenda && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  bleed={true}
                  onClick={() => {
                    document
                      .getElementById("agenda-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Event Agenda
                </Button>
              )}
              {isFeedbackActive && feedbackUrl && (
                <Button asChild variant="outline" size="lg" bleed={true}>
                  <Link
                    href={`/projects/${slug || `observe-the-moon-night/${year}`}/feedback`}
                  >
                    <MessageSquareHeart className="size-4 mr-2 text-primary" />
                    Give Event Feedback
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
