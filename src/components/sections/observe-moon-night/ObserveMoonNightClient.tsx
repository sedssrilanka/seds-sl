"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { ObserveMoonHero } from "./ObserveMoonHero";
import { SriLankaDarkMap } from "./SriLankaDarkMap";
import { EventCountdownTimer } from "./EventCountdownTimer";
import { openMoonNightPopup } from "@/utilities/openMoonNightPopup";

import {
  Moon,
  Telescope,
  Camera,
  BookOpen,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Handshake,
  CloudSun,
  Wind,
  Eye,
  MessageSquareHeart,
  MapPin,
} from "lucide-react";

import { motion } from "motion/react";
import type { ObserveMoonEventResult } from "@/utilities/getObserveMoonNightProject";
import { formatEventStartAndEnd } from "@/utilities/generateRegistrationEmail";

interface ObserveMoonNightClientProps {
  slug: string;
  year?: string;
  eventData?: ObserveMoonEventResult;
}

export function ObserveMoonNightClient({
  slug,
  year = "2026",
  eventData,
}: ObserveMoonNightClientProps) {
  useEffect(() => {
    // Load Tally embed script
    const scriptSrc = "https://tally.so/widgets/embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    // Auto open popup only if explicitly requested via ?register=1 query parameter
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("register") === "1" || params.get("register") === "true") {
        setTimeout(() => {
          openMoonNightPopup();
        }, 500);
      }
    }
  }, []);

  const title =
    eventData?.title || `International Observe the Moon Night ${year}`;
  const eventDate = eventData?.eventDate || "Monday, September 21, 2026";
  const location = eventData?.location || "Virtual Event (Online Live Stream)";
  const description =
    eventData?.description ||
    "Join SEDS Sri Lanka and SEDS India for an interactive virtual celebration of International Observe the Moon Night 2026. Experience live high-definition lunar telescopic streaming provided by SEDS Celestia, guided scientific sessions, and interactive discussions.";

  const eventTimeFormatting = formatEventStartAndEnd(
    eventData?.startTime || "2026-09-21T19:00:00.000+05:30",
    eventData?.endTime || "2026-09-21T23:00:00.000+05:30",
    eventDate,
  );
  const formattedDateDisplay = eventTimeFormatting.fullDisplay;

  // Dynamic locations list from Payload CMS collection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locationsList =
    (eventData as any)?.locations && (eventData as any).locations.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).locations
      : [];

  const showMap =
    locationsList.length > 0 &&
    locationsList.some((l: any) => l.latitude && l.longitude);

  const highlights = [
    {
      icon: <Telescope className="size-8 text-primary" />,
      title: "Live Telescopic Stream (SEDS Celestia)",
      tag: "HD TELESCOPE FEED",
      description:
        "Watch live, high-resolution optical telescope feeds of the lunar surface broadcast by SEDS Celestia, highlighting craters, lunar maria, and the day-night terminator line.",
    },
    {
      icon: <Handshake className="size-8 text-primary" />,
      title: "SEDS Sri Lanka × SEDS India Panel",
      tag: "JOINT COLLABORATION",
      description:
        "A joint cross-border initiative featuring student space leaders, astronomy researchers, and guest speakers from both SEDS Sri Lanka and SEDS India.",
    },
    {
      icon: <BookOpen className="size-8 text-primary" />,
      title: "Lunar Science Keynotes & Geology",
      tag: "SCIENTIFIC SESSIONS",
      description:
        "Explore lunar topography, Apollo and Artemis landing sites, water ice discoveries at the lunar South Pole, and future human space exploration.",
    },
    {
      icon: <Trophy className="size-8 text-primary" />,
      title: "Live Moon Trivia & Certificates",
      tag: "INTERACTIVE QUIZ",
      description:
        "Participate in a live real-time lunar science quiz, interact during the stream Q&A, and receive an official verified digital participation certificate.",
    },
  ];

  // Dynamic agenda from Payload CMS collection (Rendered ONLY if populated in database)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawAgenda =
    (eventData as any)?.agenda && (eventData as any).agenda.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).agenda.map((item: any) => ({
          time: item.time,
          stage: item.stage || "SESSION",
          title: item.title,
          desc: item.description,
        }))
      : [];

  // Multi-day agenda days (with tabs) or single-day fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const agendaDays =
    (eventData as any)?.agendaDays && (eventData as any).agendaDays.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).agendaDays.map((day: any) => ({
          dayId: day.dayId,
          dayLabel: day.dayLabel,
          date: day.date,
          shortDate: day.shortDate,
          partnerBadge: day.partnerBadge,
          items: (day.items || []).map((item: any) => ({
            time: item.time,
            stage: item.stage || "SESSION",
            title: item.title,
            desc: item.description,
          })),
        }))
      : rawAgenda.length > 0
        ? [
            {
              dayId: "day-1",
              dayLabel: "Day 01",
              date: eventData?.eventDate || "Monday, September 21, 2026",
              shortDate: "Mon, Sep 21",
              partnerBadge: "Streamed via SEDS Celestia",
              items: rawAgenda,
            },
          ]
        : [];

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const currentDay = agendaDays[activeDayIdx] || agendaDays[0];
  const activeDayItems = currentDay?.items || rawAgenda;

  // Dynamic partners list from Payload CMS collection (Rendered ONLY if populated in database)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const partnersList =
    (eventData as any)?.partners && (eventData as any).partners.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).partners
      : [];

  const guidelines = [
    {
      title: "Virtual Stream Details",
      items: [
        "Live high-definition telescope broadcast hosted online",
        "Official stream link shared with all registered attendees",
        "Interactive live chat for real-time questions & speaker interaction",
        "Digital Certificate of Participation for registered attendees",
      ],
    },
    {
      title: "What You Need",
      items: [
        "Stable broadband internet connection (laptop, phone, or tablet)",
        "Headphones or speakers for keynote audio clarity",
        "Notebook or sketchpad for lunar mapping & notes",
        "Enthusiasm for lunar science and stargazing!",
      ],
    },
    {
      title: "Stream Guidelines",
      items: [
        "Join 5–10 minutes prior to 07:00 PM IST kickoff",
        "Submit your questions during live Q&A via chat",
        "Participate in the live interactive Moon trivia round",
        "Fill out the post-event feedback to claim your certificate",
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="w-full relative z-40">
        {/* CUSTOM 3D MOON LANDING HERO */}
        <ObserveMoonHero
          title={title}
          year={year}
          eventDate={eventDate}
          startTime={eventData?.startTime}
          endTime={eventData?.endTime}
          locations={eventData?.locations}
          agenda={eventData?.agenda}
          description={description}
          slug={slug}
          feedbackUrl={eventData?.feedbackUrl}
          isFeedbackActive={eventData?.isFeedbackActive}
        />

        {/* LOGO RUNNER STRIP NEXT TO / BELOW HERO */}
        {partnersList.length > 0 && (
          <div className="w-full border-b border-border/60 bg-background/80 backdrop-blur-md py-4 overflow-hidden relative z-30">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <Marquee
                pauseOnHover={true}
                fade={true}
                numberOfCopies={3}
                className="py-1 [--duration:24s] [--gap:4.5rem]"
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {partnersList.map((partner: any, idx: number) => (
                  <a
                    key={idx}
                    href={partner.websiteUrl || "#"}
                    target={partner.websiteUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-center gap-1.5 group opacity-85 hover:opacity-100 transition-all shrink-0 px-4"
                  >
                    <div className="h-10 md:h-12 flex items-center justify-center">
                      {partner.logo?.url ? (
                        <img
                          src={partner.logo.url}
                          alt={partner.name}
                          className="max-h-9 md:max-h-11 w-auto max-w-[170px] object-contain filter brightness-100 group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <span className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                          {partner.name}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] md:text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                      {partner.partnershipType || "Partner"}
                    </span>
                  </a>
                ))}
              </Marquee>
            </div>
          </div>
        )}

        {/* DEDICATED FULL-WIDTH LIVE COUNTDOWN SECTION WITH EVENT DATE & TIME */}
        <EventCountdownTimer
          targetDate={eventData?.startTime || "2026-09-21T19:00:00+05:30"}
          formattedDateDisplay={formattedDateDisplay}
        />

        {/* SECTION 1: ABOUT THE INITIATIVE & VIRTUAL COLLABORATION */}
        <div
          id="dark-map-section"
          className="w-full border-b border-border/60 py-16 bg-background scroll-mt-16"
        >
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  <span>VIRTUAL LUNAR OBSERVATION INITIATIVE</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                  SEDS Sri Lanka × SEDS India Collaboration
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  International Observe the Moon Night is a worldwide public
                  engagement initiative sanctioned by NASA. In 2026,{" "}
                  <strong>SEDS Sri Lanka</strong> has partnered with{" "}
                  <strong>SEDS India</strong> to deliver a joint cross-border
                  virtual observation experience across South Asia and beyond.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Live optical telescope feeds will be streamed directly to your
                  screens powered by <strong>SEDS Celestia</strong> (Day 1) and{" "}
                  <strong>SEDS Kumaraguru</strong> (Day 2) as streaming partners.
                  Tune in on{" "}
                  <strong>
                    September 21 & 22, 2026 from 7:00 PM to 11:00 PM IST daily
                  </strong>{" "}
                  for in-depth lunar geology keynotes, live telescopic terminator
                  sweeps starting at 8:00 PM onward, and interactive trivia.
                </p>
              </div>

              {/* Collaboration & Stream Advisory Note */}
              <div className="p-6 border border-border/80 bg-card/40 backdrop-blur-md space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  <CloudSun className="size-4 text-primary" />
                  <span>ASTRONOMICAL OBSERVATION & BROADCAST ADVISORY</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-mono leading-relaxed">
                  Real-time telescopic imaging across both <strong>Day 01</strong> and{" "}
                  <strong>Day 02</strong> is inherently subject to local atmospheric seeing,
                  cloud cover, and celestial visibility at our respective partner observatory
                  stations. To ensure a seamless and continuous learning experience, the
                  broadcast may dynamically transition between real-time telescope feeds,
                  secondary observatory angles, and curated high-resolution lunar archival
                  footage should weather variations or technical calibrations arise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: EVENT HIGHLIGHTS & EXPERIENCE (2x2 SEGMENTED GRID) */}
        <div className="w-full border-b border-border/60 py-16 bg-background/60">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                PROGRAM HIGHLIGHTS
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                What You Will Experience
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Designed for observers and space enthusiasts across Sri Lanka,
                India, and the world.
              </p>
            </div>

            {/* 2x2 Segmented Grid */}
            <div className="relative">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60 border border-border/60 bg-background relative z-0">
                {highlights.map((h, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                    className="p-8 bg-background flex flex-col space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-primary/10 border border-primary/20">
                        {h.icon}
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase text-primary tracking-wider border border-primary/20 px-2.5 py-1">
                        {h.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">
                      {h.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {h.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: DYNAMIC EVENT TIMELINE & AGENDA (WITH STICKY TABS & MOBILE OPTIMIZATION) */}
        {agendaDays.length > 0 && (
          <div
            id="agenda-section"
            className="w-full border-b border-border/60 py-16 bg-background scroll-mt-16 relative"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  CHRONOLOGICAL TIMELINE
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                  Event Agenda & Schedule
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Follow our 2-day live broadcast schedule from initial setup to guided observations
                  and trivia awards.
                </p>
              </div>

              {/* Sticky Day Selection Tabs for Desktop & Mobile */}
              {agendaDays.length > 1 && (
                <div className="sticky top-14 md:top-16 z-30 py-3 bg-background/95 backdrop-blur-md -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="max-w-md mx-auto grid grid-cols-2 gap-2 bg-card/60 p-1.5 border border-border/80 shadow-md">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {agendaDays.map((day: any, idx: number) => {
                      const isActive = activeDayIdx === idx;
                      return (
                        <button
                          key={day.dayId || idx}
                          type="button"
                          onClick={() => {
                            setActiveDayIdx(idx);
                          }}
                          className={`py-2.5 px-3 md:px-4 font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center select-none ${
                            isActive
                              ? "bg-primary/15 text-primary border border-primary/50 shadow-xs"
                              : "text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`inline-block size-1.5 rounded-full ${
                                isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/40"
                              }`}
                            />
                            <span className="font-extrabold">{day.dayLabel}</span>
                          </div>
                          <span className="text-[11px] font-medium opacity-90">{day.shortDate}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Day Header Info Pill */}
              {currentDay && (
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 border border-primary/25 bg-primary/5 text-xs font-mono text-primary">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-center sm:text-left">
                    <span>{currentDay.dayLabel} TIMELINE</span>
                    {currentDay.partnerBadge && (
                      <span className="text-muted-foreground font-normal hidden sm:inline">
                        — {currentDay.partnerBadge}
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground font-medium text-center sm:text-right">
                    {currentDay.date}
                  </div>
                </div>
              )}

              {/* Dynamic Vertical Hairline Agenda Timeline */}
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

                <div
                  key={currentDay?.dayId || activeDayIdx}
                  className="border border-border/60 divide-y divide-border/60 bg-background relative z-0"
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {activeDayItems.map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 md:p-8 bg-background flex flex-col md:flex-row md:items-start gap-3.5 md:gap-6 hover:bg-card/25 transition-colors"
                    >
                      {/* Mobile Header: Stage + Time */}
                      <div className="shrink-0 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 w-full md:w-44 border-b md:border-b-0 pb-2.5 md:pb-0 border-border/40">
                        <span className="text-[11px] font-mono font-bold uppercase text-primary tracking-wider border border-primary/25 bg-primary/10 px-2 py-0.5">
                          {item.stage}
                        </span>
                        <span className="text-base md:text-lg font-bold font-mono text-foreground">
                          {item.time}
                        </span>
                      </div>

                      {/* Content: Title + Description */}
                      <div className="flex-1 space-y-1.5 pt-0.5 md:pt-0 md:border-l border-border/60 md:pl-6">
                        <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC PARTNERS & SPONSORS SECTION (MINIMAL APPLE-LIKE & ADAPTIVE GRID) */}
        {partnersList.length > 0 && (
          <div className="w-full border-b border-border/60 py-20 bg-background/80">
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
                  <span>COLLABORATION & BROADCAST PARTNERS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                  In Collaboration With
                </h2>
              </div>

              {/* Adaptive Grid Container based on partners count */}
              <div
                className={`grid ${
                  partnersList.length === 1
                    ? "grid-cols-1 max-w-md mx-auto"
                    : partnersList.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                      : partnersList.length === 3
                        ? "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto"
                } gap-6`}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {partnersList.map((partner: any, idx: number) => (
                  <div key={idx} className="relative group">
                    {/* Bleeding Hairline Outlines for Card */}
                    <div className="absolute -left-3 -right-3 top-0 border-t border-border/60 pointer-events-none" />
                    <div className="absolute -left-3 -right-3 bottom-0 border-b border-border/60 pointer-events-none" />
                    <div className="absolute -top-3 -bottom-3 left-0 border-l border-border/60 pointer-events-none" />
                    <div className="absolute -top-3 -bottom-3 right-0 border-r border-border/60 pointer-events-none" />

                    <div className="p-8 border border-border/60 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4 relative z-10 group-hover:border-primary/40 transition-all duration-300">
                      {partner.logo?.url ? (
                        <div className="h-16 flex items-center justify-center">
                          <img
                            src={partner.logo.url}
                            alt={partner.logo.alt || partner.name}
                            className="max-h-14 w-auto max-w-[180px] object-contain filter brightness-100 opacity-90 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      ) : (
                        <div className="text-base font-bold font-mono text-foreground uppercase tracking-wider">
                          {partner.name}
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="text-xs font-mono font-semibold text-foreground">
                          {partner.name}
                        </div>
                        <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
                          {partner.partnershipType || "Sponsor"}
                        </div>
                      </div>

                      {partner.websiteUrl && (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 pt-1"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: OBSERVATION GUIDELINES & EQUIPMENT (3-COLUMN SPLIT) */}
        <div className="w-full border-b border-border/60 py-16 bg-background/60">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                ATTENDEE INFORMATION
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                Guidelines & Equipment Details
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Important information for participants to ensure a seamless
                observation experience.
              </p>
            </div>

            {/* 3-Column Segmented Box */}
            <div className="relative">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 border border-border/60 bg-background relative z-0">
                {guidelines.map((g, idx) => (
                  <div key={idx} className="p-6 md:p-8 bg-background space-y-4">
                    <h3 className="text-lg font-bold text-foreground font-mono uppercase tracking-wider border-b border-border/60 pb-3 text-primary">
                      {g.title}
                    </h3>
                    <ul className="space-y-3">
                      {g.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4.5: EVENT FEEDBACK BANNER SECTION (IF FEEDBACK ACTIVE AND URL CONFIGURED) */}
        {eventData?.isFeedbackActive && eventData?.feedbackUrl && (
          <div className="w-full border-t border-b border-border/60 py-16 bg-blue-950/30">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 border border-blue-800/40 bg-blue-950/50 backdrop-blur-sm">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">
                    <MessageSquareHeart className="size-4 text-blue-400" />
                    <span>EVENT FEEDBACK & SURVEY</span>
                  </div>
                  <h3 className="text-2xl font-bold font-mono text-white">
                    Attended Observe the Moon Night {year}?
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl">
                    Your feedback helps us refine future observation camps,
                    telescope stations, and scientific lectures across Sri
                    Lanka.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href="/projects/observe-the-moon-night/feedback"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-bold uppercase tracking-wider transition-colors shrink-0"
                  >
                    <MessageSquareHeart className="size-4" />
                    <span>Give Feedback Now</span>
                  </Link>
                  <a
                    href={eventData.feedbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 border border-blue-700 hover:bg-blue-900/50 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>External Form</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: DEDICATED REGISTRATION CALL-TO-ACTION SECTION */}
        <div
          id="register-section"
          className="w-full py-20 bg-white text-slate-900 border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="max-w-4xl mx-auto text-center space-y-6 bg-slate-50 border border-slate-300 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -left-4 -right-4 top-0 border-t border-slate-300 pointer-events-none" />
              <div className="absolute -left-4 -right-4 bottom-0 border-b border-slate-300 pointer-events-none" />

              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                Reserve Your Spot for Moon Night {year}
              </h2>

              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Registration is officially open to all students, astronomy
                enthusiasts, and researchers across the globe. Complete our
                registration form to secure your virtual stream link and access
                details.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={openMoonNightPopup}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm font-bold uppercase tracking-widest px-8 py-4 border border-blue-700 shadow-md transition-all cursor-pointer"
                >
                  <span>Open Registration Form →</span>
                </button>
                <a
                  href="https://tally.so/r/vGl0pX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-mono text-sm font-bold uppercase tracking-wider px-6 py-4 border border-slate-300 transition-all cursor-pointer"
                >
                  <span>Direct Tally Link</span>
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
