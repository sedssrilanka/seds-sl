"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Award,
  Calendar,
  ExternalLink,
  MessageSquareHeart,
} from "lucide-react";
import { motion } from "motion/react";

import { SpaceScenePlaceholder } from "./moon-scene";
import { openMoonNightPopup } from "@/utilities/openMoonNightPopup";

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
  certificateUrl?: string;
  isCertificateActive?: boolean;
  isRegistrationActive?: boolean;
  isCompleted?: boolean;
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
  description = "Join SEDS Sri Lanka and SEDS India for a live virtual celebration of International Observe the Moon Night 2026. Experience live telescopic streaming powered by SEDS Celestia, guided scientific sessions, and interactive discussions.",
  slug,
  feedbackUrl,
  isFeedbackActive = true,
  certificateUrl = "https://cert.sedssl.org/imot",
  isCertificateActive = true,
  isRegistrationActive = false,
  isCompleted = false,
}: ObserveMoonHeroProps) {
  const startDateObj = startTime ? new Date(startTime) : null;
  const endDateObj = endTime ? new Date(endTime) : null;

  let heroDateDisplay = eventDate || "Sep 21 – 22, 2026";
  if (!eventDate && startDateObj && !isNaN(startDateObj.getTime())) {
    if (
      endDateObj &&
      !isNaN(endDateObj.getTime()) &&
      startDateObj.getDate() !== endDateObj.getDate()
    ) {
      heroDateDisplay = `${startDateObj.toLocaleDateString("en-US", {
        timeZone: "Asia/Colombo",
        month: "short",
        day: "numeric",
      })} – ${endDateObj.toLocaleDateString("en-US", {
        timeZone: "Asia/Colombo",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      heroDateDisplay = startDateObj.toLocaleDateString("en-US", {
        timeZone: "Asia/Colombo",
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  }

  // Derive location string from locations array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primaryLoc = locations?.find((l: any) => l.isPrimary) || locations?.[0];
  const locationName = primaryLoc
    ? `${primaryLoc.name}${primaryLoc.city ? `, ${primaryLoc.city}` : ""}`
    : undefined;

  const hasAgenda = Boolean(agenda && agenda.length > 0);

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-x-clip border-b border-border/60 bg-background">
      {/* 3D Moon & Star Field Canvas Background */}
      <MoonScene />

      {/* Hero Content Overlay */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-40 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Card Container */}
          <div className="lg:col-span-8 space-y-6">
            {/* Official InOMN & Event Tag Lockup */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3.5"
            >
              <img
                src="/images/projects/iotm-logo.png"
                alt="International Observe the Moon Night Official Logo"
                className="h-10 md:h-12 w-auto object-contain filter brightness-100 drop-shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-mono font-bold uppercase text-primary tracking-widest">
                  {title.includes(year) ? title : `${title} ${year}`}
                </span>
                <span className="text-[10px] md:text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  Global Initiative Sanctioned by NASA
                </span>
              </div>
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

            {/* Always Visible Short Event Date Pill (e.g. Sep 21 – 22, 2026) */}
            {heroDateDisplay && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-1"
              >
                <div className="inline-flex items-center gap-2.5 border border-border/80 bg-background/95 backdrop-blur-md px-3.5 py-2 text-xs font-mono font-bold uppercase text-foreground tracking-wider shadow-xs">
                  <Calendar className="size-3.5 text-primary shrink-0" />
                  <span>{heroDateDisplay}</span>
                  {isCompleted && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-primary/20 text-primary uppercase font-bold tracking-wider">
                      CONCLUDED
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Hero Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              {isRegistrationActive ? (
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  bleed={true}
                  onClick={openMoonNightPopup}
                  className="cursor-pointer"
                >
                  Register for Moon Night
                </Button>
              ) : (
                <>
                  {isCertificateActive && certificateUrl && (
                    <a
                      href={certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        type="button"
                        variant="default"
                        size="lg"
                        bleed={true}
                        className="cursor-pointer gap-2"
                      >
                        <Award className="size-4" />
                        <span>Claim Certificate</span>
                        <ExternalLink className="size-3.5 opacity-80" />
                      </Button>
                    </a>
                  )}
                  {isFeedbackActive && (
                    <Link href="/projects/observe-the-moon-night/feedback">
                      <Button
                        type="button"
                        variant={isCertificateActive ? "outline" : "default"}
                        size="lg"
                        bleed={true}
                        className="cursor-pointer gap-2"
                      >
                        <MessageSquareHeart className="size-4 text-primary" />
                        <span>Give Event Feedback</span>
                      </Button>
                    </Link>
                  )}
                </>
              )}

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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
