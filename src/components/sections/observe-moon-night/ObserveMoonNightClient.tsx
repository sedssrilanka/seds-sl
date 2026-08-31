"use client";

import { ObserveMoonHero } from "./ObserveMoonHero";
import { SriLankaDarkMap } from "./SriLankaDarkMap";
import { EventCountdownTimer } from "./EventCountdownTimer";

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
} from "lucide-react";

import { motion } from "motion/react";
import type { ObserveMoonEventResult } from "@/utilities/getObserveMoonNightProject";

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
  const title =
    eventData?.title || `International Observe the Moon Night ${year}`;
  const eventDate = eventData?.eventDate;
  const eventTime = eventData?.eventTime;
  const location = eventData?.location;
  const description =
    eventData?.description ||
    "Join SEDS Sri Lanka for an annual global celebration of lunar science, telescopic observation, and space exploration. Connect with observers worldwide as we look up at the Moon together.";

  // Dynamic locations list from Payload CMS collection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locationsList =
    (eventData as any)?.locations && (eventData as any).locations.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).locations
      : [];

  const showMap = locationsList.length > 0 || Boolean(location);

  const highlights = [
    {
      icon: <Telescope className="size-8 text-primary" />,
      title: "Lunar Telescopic Observation",
      tag: "OPTICAL OBSERVATION",
      description:
        "Observe lunar craters, mountain ranges, and mare basins in high resolution using high-power optical telescopes guided by astronomy instructors.",
    },
    {
      icon: <Camera className="size-8 text-primary" />,
      title: "Astrophotography Masterclass",
      tag: "HANDS-ON WORKSHOP",
      description:
        "Learn specialized lunar imaging techniques using DSLR cameras, smartphones, and eyepiece mounts to capture high-detail lunar surface photos.",
    },
    {
      icon: <BookOpen className="size-8 text-primary" />,
      title: "Lunar Science Keynote Lectures",
      tag: "RESEARCH & TALKS",
      description:
        "Hear from aerospace researchers and astrophysicists on lunar geology, Artemis mission landing sites, and water ice discovery at the lunar poles.",
    },
    {
      icon: <Trophy className="size-8 text-primary" />,
      title: "Moon Quiz & Award Certificates",
      tag: "COMPETITIONS & REWARDS",
      description:
        "Participate in live astronomy quizzes, win exclusive space merchandise, and receive digital participation certificates from SEDS Sri Lanka.",
    },
  ];

  // Dynamic agenda from Payload CMS collection (Rendered ONLY if populated in database)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeAgenda =
    (eventData as any)?.agenda && (eventData as any).agenda.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).agenda.map((item: any) => ({
          time: item.time,
          stage: item.stage || "SESSION",
          title: item.title,
          desc: item.description,
        }))
      : [];

  // Dynamic partners list from Payload CMS collection (Rendered ONLY if populated in database)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const partnersList =
    (eventData as any)?.partners && (eventData as any).partners.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (eventData as any).partners
      : [];

  const guidelines = [
    {
      title: "What We Provide",
      items: [
        "High-power optical telescopes & binoculars",
        "Astrophotography eyepiece adapters for smartphones",
        "Guided assistance from trained SEDS astronomy staff",
        "Event participation certificates & learning materials",
      ],
    },
    {
      title: "What to Bring",
      items: [
        "Personal camera or smartphone for astrophotography",
        "Personal telescope or binoculars (optional)",
        "Red-light flashlight (to preserve night vision)",
        "Warm clothing & notebook for recording observations",
      ],
    },
    {
      title: "Observation Guidelines",
      items: [
        "Maintain respectful queues at telescope viewing stations",
        "Handle shared optical equipment with extreme care",
        "Avoid using white flashlight beams near telescopes",
        "Follow safety instructions provided by event hosts",
      ],
    },
  ];

  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative overflow-hidden">
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

        {/* DEDICATED FULL-WIDTH LIVE COUNTDOWN SECTION */}
        <EventCountdownTimer targetDate={eventData?.startTime || eventDate} />

        {/* SECTION 1: ABOUT THE INITIATIVE & MAP (MAP RENDERED SAFELY FOR DATABASE LOCATIONS) */}
        <div className="w-full border-b border-border/60 py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div
              className={`grid grid-cols-1 ${showMap ? "lg:grid-cols-12" : ""} gap-12 items-stretch`}
            >
              {/* Left Narrative */}
              <div
                className={`${showMap ? "lg:col-span-7" : "w-full"} space-y-6 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                    <span>LUNAR OBSERVATION INITIATIVE</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                    Uniting Sri Lanka Under the Lunar Sky
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    International Observe the Moon Night is an annual public
                    engagement initiative. Every year, observers, researchers,
                    and space enthusiasts across the planet gather to learn
                    about lunar science, celebrate human spaceflight history,
                    and observe our nearest celestial neighbor.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    SEDS Sri Lanka brings this celebration to high school
                    students, university researchers, and amateur astronomers
                    across Sri Lanka, hosting optical viewing stations, live
                    scientific lectures, and astrophotography sessions.
                  </p>
                </div>

                {/* General Astronomical & Weather Advisory Note */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                    <CloudSun className="size-4 text-primary" />
                    <span>ASTRONOMICAL & WEATHER ADVISORY</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    Target observation window corresponds with the Moon's First
                    Quarter phase (~50% disk illumination), providing optimal
                    long crater shadows along the lunar terminator line. Please
                    note that optical telescopic viewing remains subject to
                    local atmospheric seeing and cloud cover; unexpected weather
                    conditions may adjust session timings or optical clarity.
                  </p>
                </div>
              </div>

              {/* Right Side: Leaflet Dark Map (Rendered safely if location or locations exist in database) */}
              {showMap && (
                <div className="lg:col-span-5 flex items-stretch">
                  <SriLankaDarkMap locations={locationsList} />
                </div>
              )}
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
                Designed for observers of all skill levels, from first-time
                stargazers to advanced astrophotographers.
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

        {/* SECTION 3: DYNAMIC EVENT TIMELINE & AGENDA (ONLY RENDERED IF AGENDA EXISTS IN DATABASE) */}
        {activeAgenda.length > 0 && (
          <div
            id="agenda-section"
            className="w-full border-b border-border/60 py-16 bg-background"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  CHRONOLOGICAL TIMELINE
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                  Event Agenda & Schedule
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Follow our schedule from initial setup to guided observations
                  and trivia awards.
                </p>
              </div>

              {/* Dynamic Vertical Hairline Agenda Timeline */}
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

                <div className="border border-border/60 divide-y divide-border/60 bg-background relative z-0">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {activeAgenda.map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="p-6 md:p-8 bg-background flex flex-col md:flex-row md:items-center gap-6"
                    >
                      <div className="shrink-0 space-y-1 w-36">
                        <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                          {item.stage}
                        </div>
                        <div className="text-lg font-bold font-mono text-foreground">
                          {item.time}
                        </div>
                      </div>

                      <div className="flex-1 space-y-1 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6">
                        <h3 className="text-lg font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
                  <span>EVENT PARTNERS & SPONSORS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                  Supported By
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
                        <img
                          src={partner.logo.url}
                          alt={partner.name}
                          className="max-h-12 w-auto object-contain filter opacity-85 group-hover:opacity-100 transition-all duration-300"
                        />
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
                <a
                  href={`/projects/${slug || `observe-the-moon-night/${year}`}/feedback`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  <MessageSquareHeart className="size-4" />
                  <span>Give Feedback Now</span>
                </a>
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
                enthusiasts, and researchers. Complete our multi-step
                registration form to secure your pass and select your host
                observation site.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`/projects/${slug}/register`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm font-bold uppercase tracking-widest px-8 py-4 border border-blue-700 shadow-md transition-all cursor-pointer"
                >
                  <span>Open Registration Form →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
