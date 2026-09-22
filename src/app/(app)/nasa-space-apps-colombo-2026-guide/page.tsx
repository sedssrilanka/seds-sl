import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  ExternalLink,
  Clock,
  Calendar,
  User,
  Globe,
  CheckCircle2,
  HeartHandshake,
  Terminal,
  FileCode,
  ArrowRight,
  Users,
  Info,
  Compass,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSideURL } from "@/utilities/getURL";

export const metadata: Metadata = {
  title:
    "NASA Space Apps Colombo & Sri Lanka 2026: Community Guidebook | SEDS Sri Lanka",
  description:
    "An open, welcoming community guide by SEDS Sri Lanka on participating in the NASA International Space Apps Challenge 2026. Explore key dates, Universal Event registration, finding teammates, and submitting projects with NASA open data.",
  keywords: [
    "NASA Space Apps Colombo",
    "NASA Space Apps Colombo 2026",
    "Space Apps Colombo",
    "NASA Space Apps Challenge 2026 Sri Lanka",
    "NASA Space Apps Sri Lanka",
    "NASA Space Apps Universal Event",
    "NASA Space Apps 2026 challenges",
    "NASA Space Apps 2026 dates timeline",
    "Space Apps 2026 registration guide",
    "How to register for NASA Space Apps Colombo",
    "Space Apps team formation Colombo",
    "NASA hackathon Colombo Sri Lanka",
    "SEDS Sri Lanka Space Apps Colombo",
  ],
  alternates: {
    canonical: "/nasa-space-apps-colombo-2026-guide",
  },
  openGraph: {
    title: "NASA Space Apps Colombo & Sri Lanka 2026: Community Guidebook",
    description:
      "An open community guide by SEDS Sri Lanka for students, developers, and space enthusiasts participating in NASA Space Apps 2026.",
    url: "/nasa-space-apps-colombo-2026-guide",
    siteName: "SEDS Sri Lanka",
    locale: "en_LK",
    type: "article",
    publishedTime: "2026-09-21T00:00:00.000Z",
    authors: ["SEDS Sri Lanka"],
    images: [
      {
        url: "/images/projects/nsa-cover.png",
        width: 1200,
        height: 630,
        alt: "NASA Space Apps Colombo & Sri Lanka 2026 Guide - SEDS Sri Lanka",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NASA Space Apps Colombo & Sri Lanka 2026: Community Guidebook",
    description:
      "An open guide on how to register, assemble multidisciplinary teams, and compete in NASA Space Apps 2026.",
    images: ["/images/projects/nsa-cover.png"],
    site: "@sedssl",
    creator: "@sedssl",
  },
};

export default function NasaSpaceAppsColombo2026GuidePage() {
  const baseUrl = getServerSideURL();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline:
      "NASA Space Apps Colombo & Sri Lanka 2026: Independent Community Participation Guidebook",
    description:
      "Community guidebook by SEDS Sri Lanka detailing the official 2026 timeline dates, registration process, Universal Event track, challenges, team formation best practices, and project submission guidelines.",
    image: `${baseUrl}/images/projects/nsa-cover.png`,
    author: {
      "@type": "Organization",
      name: "SEDS Sri Lanka Community",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon-32x32.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/nasa-space-apps-colombo-2026-guide`,
    },
    datePublished: "2026-09-21",
    dateModified: "2026-09-22",
  };

  const officialRoadmap = [
    {
      step: "01",
      title: "Create Your Account",
      date: "August 26, 2026",
      desc: "Begin your journey by creating a free account on the NASA Space Apps platform, or log in with your existing profile from previous hackathons.",
      link: "https://www.spaceappschallenge.org",
      linkText: "Create Account / Sign In",
    },
    {
      step: "02",
      title: "Register for the 2026 Hackathon",
      date: "August 26 – November 15, 2026",
      desc: "Register your profile for the 2026 challenge season. Registration is open until the hackathon submission window closes on November 15.",
      link: "https://www.spaceappschallenge.org",
      linkText: "Register for 2026",
    },
    {
      step: "03",
      title: "Choose Your Participation Track",
      date: "August 26 – November 15, 2026",
      desc: "Connect with the global community by selecting the virtual Universal Event, or choose any in-person local event listed near you. You can adjust your event selection anytime before November 15.",
      link: "https://www.spaceappschallenge.org/2026/local-events/universal-event/",
      linkText: "Universal Event Track",
      secondaryLink: "https://www.spaceappschallenge.org/2026/local-events/",
      secondaryLinkText: "Browse Local Events",
    },
    {
      step: "04",
      title: "Form or Join a Team",
      date: "September 17 – November 15, 2026",
      desc: "Team up with peers based on your mutual interests and challenge preferences. Teams can have between 1 and 6 members. You can find teammates or change teams up until November 15.",
      link: "https://www.spaceappschallenge.org/2026/find-a-team/",
      linkText: "Find Teammates",
    },
    {
      step: "05",
      title: "Build & Submit Your Project",
      date: "Nov 14 (9:00 AM) – Nov 15 (11:59 PM Local Time)",
      desc: "Project submission opens on Saturday, November 14 at 9:00 AM and closes Sunday, November 15 at 11:59 PM local time. Complete your Project Tab with dataset references, code, and your 240-second video demo to earn a Certificate of Participation and enter Global Judging.",
      link: "https://www.spaceappschallenge.org/2026/challenges/",
      linkText: "Explore 2026 Challenges",
    },
    {
      step: "06",
      title: "Complete the Participant Survey",
      date: "December 1, 2026",
      desc: "Share your reflections and feedback with the NASA Global Organizing Team to help celebrate the community and shape future hackathons.",
      link: "https://www.spaceappschallenge.org",
      linkText: "Community Feedback",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="min-h-screen bg-background py-8 sm:py-12 md:py-16 overflow-x-hidden">
        <main className="w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
          {/* BREADCRUMB & HEADER BADGES — BLEEDING EDGE */}
          <div className="relative">
            <div className="hidden sm:block absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-0">
              <nav className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  HOME
                </Link>
                <span className="opacity-40">/</span>
                <Link
                  href="/nasa-space-apps-challenge"
                  className="hover:text-primary transition-colors"
                >
                  NASA SPACE APPS
                </Link>
                <span className="opacity-40">/</span>
                <span className="text-primary font-bold">2026 GUIDEBOOK</span>
              </nav>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 rounded-none">
                  COMMUNITY GUIDEBOOK
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground border border-border/60 rounded-none">
                  2026 EDITION
                </span>
              </div>
            </div>
          </div>

          {/* ARTICLE HEADER — BLEEDING EDGE FRAME */}
          <header className="relative">
            <div className="hidden sm:block absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 p-6 sm:p-8 md:p-10 space-y-6 relative z-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  <Terminal className="size-4 text-primary shrink-0" />
                  <span className="break-words">
                    <span className="whitespace-nowrap">
                      SEDS&nbsp;Sri&nbsp;Lanka
                    </span>{" "}
                    COMMUNITY &bull; OPEN HACKATHON GUIDE
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] break-words">
                  NASA Space Apps Colombo &{" "}
                  <span className="whitespace-nowrap">Sri&nbsp;Lanka</span>{" "}
                  2026: The Complete Participation & Universal Event Guide
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  A warm, open handbook for students, coders, designers,
                  scientists, and dreamers across{" "}
                  <span className="whitespace-nowrap">Sri&nbsp;Lanka</span> on
                  how to participate, find teammates, explore NASA open
                  datasets, and build solutions that matter.
                </p>
              </div>

              {/* METADATA BAR (CLEAN, NO REDUNDANT LOCATION TAG) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border/60 text-xs font-mono text-muted-foreground">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5 text-primary shrink-0" />
                    <span className="whitespace-nowrap">
                      SEDS&nbsp;Sri&nbsp;Lanka
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 shrink-0" />
                    <span>September 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 shrink-0" />
                    <span>5 min read</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-primary font-medium">
                  <Sparkles className="size-3.5" />
                  <span>Free & Open to Everyone</span>
                </div>
              </div>
            </div>
          </header>

          {/* OFFICIAL NON-AFFILIATION DISCLAIMER CALLOUT */}
          <div className="p-5 sm:p-6 border border-border/80 bg-muted/30 not-prose space-y-2 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
            <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold uppercase tracking-wider">
              <Info className="size-4 text-primary shrink-0" />
              <span>Independent Community Resource & Disclaimer</span>
            </div>
            <p>
              This publication is an independent educational guidebook created
              by{" "}
              <span className="whitespace-nowrap font-medium text-foreground">
                SEDS&nbsp;Sri&nbsp;Lanka
              </span>{" "}
              to help participants navigate the hackathon.{" "}
              <span className="whitespace-nowrap font-medium text-foreground">
                SEDS&nbsp;Sri&nbsp;Lanka
              </span>{" "}
              is an independent non-profit student space organization and is{" "}
              <strong>
                not affiliated with, sponsored by, or endorsed by the National
                Aeronautics and Space Administration (NASA) or the NASA
                International Space Apps Challenge
              </strong>
              . All NASA trademarks and event names belong to their respective
              owners.
            </p>
          </div>

          {/* MAIN EDITORIAL ARTICLE CONTENT */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed sm:leading-loose text-foreground/90 space-y-8 font-sans px-2 sm:px-4 md:px-6 break-words">
            {/* WARM, NATURAL OPENING STORY */}
            <p className="text-lg sm:text-xl text-foreground leading-relaxed font-normal">
              There is a special kind of magic in hackathon weekends. It starts
              with an open prompt, a few curious minds gathered around a screen,
              and the realization that NASA’s satellite observations, planetary
              missions, and climate records are free for anyone in the world to
              explore.
            </p>

            <p className="text-muted-foreground">
              For seven consecutive years (2019 through 2025),{" "}
              <strong>
                <span className="whitespace-nowrap">
                  SEDS&nbsp;Sri&nbsp;Lanka
                </span>
              </strong>{" "}
              had the privilege of organizing and growing the{" "}
              <strong>NASA International Space Apps Challenge</strong> across
              our island. What started as small gatherings in university lecture
              halls grew into a national movement, where students from every
              corner of Sri Lanka proved time and again that innovation knows no
              boundaries.
            </p>

            <p className="text-muted-foreground">
              Whether you are an experienced software developer, a curious high
              schooler, a graphic designer, or someone who simply looks up at
              the stars and wonders what lies beyond, this guide is written for
              you. Space exploration belongs to everyone, and your ideas are
              welcome here.
            </p>

            {/* LEGACY METAPHOR BLOCKQUOTE */}
            <blockquote className="my-8 border-l-4 border-l-primary bg-primary/5 py-5 px-6 sm:px-8 not-prose space-y-2 border-y border-r border-border/60">
              <p className="text-base sm:text-lg italic text-foreground leading-relaxed font-sans font-normal">
                &ldquo;The true flame of an expedition does not belong to the
                one who carries the lantern, but to every explorer who steps
                forward into the night. While we are not coordinating the stages
                this season, the legacy of ambition, grit, and late-night
                breakthroughs lives in every team across{" "}
                <span className="whitespace-nowrap">Sri&nbsp;Lanka</span>. Keep
                building, keep competing, and let us see our nation shine once
                again on the global podium.&rdquo;
              </p>
              <div className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                &mdash;{" "}
                <span className="whitespace-nowrap">
                  SEDS&nbsp;Sri&nbsp;Lanka
                </span>{" "}
                Legacy Note
              </div>
            </blockquote>

            {/* HIGHLIGHT MESSAGE */}
            <div className="my-8 sm:my-10 p-6 sm:p-8 border-l-4 border-l-primary bg-primary/5 border-y border-r border-border/60 not-prose space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="size-4 shrink-0" />
                <span>
                  Empowering Every{" "}
                  <span className="whitespace-nowrap">Sri&nbsp;Lankan</span>{" "}
                  Participant in 2026
                </span>
              </div>
              <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-sans">
                You can participate in NASA Space Apps 2026 through multiple
                paths: collaborate with campus peers, join an in-person local
                event, or register under the global{" "}
                <strong>Universal Event</strong>. This open guidebook brings
                together the key dates, links, and strategies to make your
                hackathon journey smooth and memorable.
              </p>
            </div>

            {/* PARTICIPATION TRACKS */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-4">
              Exploring Your Participation Tracks in 2026
            </h2>

            <p>
              When joining the{" "}
              <a
                href="https://www.spaceappschallenge.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 font-semibold hover:text-primary/80 break-words"
              >
                NASA International Space Apps Challenge
              </a>
              , you have two primary ways to take part:
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground pt-2">
              1. The NASA Space Apps Universal Event (Global Virtual Track)
            </h3>

            <p>
              The{" "}
              <a
                href="https://www.spaceappschallenge.org/2026/local-events/universal-event/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 font-semibold hover:text-primary/80 break-words"
              >
                Universal Event
              </a>{" "}
              is the official global virtual location managed directly by NASA’s
              Global Organizing Team. It ensures that anyone, anywhere in the
              world, can participate without geographic limits.
            </p>

            <ul className="space-y-3 my-6 list-disc pl-5 sm:pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Identical Datasets & Challenges:
                </strong>{" "}
                You work with the exact same NASA challenge statements,
                satellite telemetry, and open APIs as every participant
                worldwide.
              </li>
              <li>
                <strong className="text-foreground">
                  Direct NASA Global Judging:
                </strong>{" "}
                Projects submitted to the Universal Event are evaluated directly
                by NASA's Global Judging Committee for global awards and
                international recognition.
              </li>
              <li>
                <strong className="text-foreground">
                  Collaborate Without Borders:
                </strong>{" "}
                You can form teams with friends in Colombo, across other{" "}
                <span className="whitespace-nowrap">Sri&nbsp;Lankan</span>{" "}
                universities (Peradeniya, Moratuwa, SLIIT, Ruhuna, Jaffna, KDU),
                or with international teammates.
              </li>
            </ul>

            <div className="not-prose my-6 sm:my-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="https://www.spaceappschallenge.org/2026/local-events/universal-event/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-mono font-bold text-xs uppercase tracking-wider gap-2 cursor-pointer rounded-none"
                >
                  <Globe className="size-4 shrink-0" />
                  Universal Event Registration Portal
                  <ExternalLink className="size-3.5 shrink-0" />
                </Button>
              </a>

              <a
                href="https://www.spaceappschallenge.org/2026/challenges/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-mono font-bold text-xs uppercase tracking-wider gap-2 cursor-pointer rounded-none border-border/80 hover:border-primary"
                >
                  <FileCode className="size-4 text-primary shrink-0" />
                  Explore 2026 Challenges
                  <ExternalLink className="size-3.5 shrink-0" />
                </Button>
              </a>

              <a
                href="https://www.spaceappschallenge.org/2026/find-a-team/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-mono font-bold text-xs uppercase tracking-wider gap-2 cursor-pointer rounded-none border-border/80 hover:border-primary"
                >
                  <Users className="size-4 text-primary shrink-0" />
                  Find / Browse Teams
                  <ExternalLink className="size-3.5 shrink-0" />
                </Button>
              </a>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground pt-2">
              2. Local Events & In-Person Venues
            </h3>
            <p className="text-muted-foreground">
              If a local organizing group or campus club hosts an approved
              in-person local event near you, you can also choose to register
              under that specific location on the NASA portal. Both local and
              Universal Event tracks follow the exact same global timeline and
              judging standards.
            </p>

            {/* OFFICIAL ROADMAP TIMELINE (SPACIOUS & MOBILE-ADAPTIVE WITH CLEAN ROW WRAPPERS) */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6">
              Official NASA Space Apps 2026 Roadmap & Key Dates
            </h2>

            <p>
              Participation is 100% <strong>free</strong> and open to all
              experience levels. Here is the step-by-step roadmap from account
              creation to project submission:
            </p>

            <div className="space-y-6 my-6 sm:my-8 not-prose">
              {officialRoadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 md:p-8 border border-border/60 bg-card/30 space-y-4 relative"
                >
                  {/* STEP NUMBER & DATE IN SEPARATE, CLEAR ROW */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-primary uppercase tracking-wider">
                        STEP {item.step}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-primary/90 bg-primary/10 border border-primary/20 px-2.5 py-1 self-start sm:self-auto">
                      <Calendar className="size-3 shrink-0" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  {/* ACTION LINKS IN DEDICATED BOTTOM ROW */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/30">
                    {item.secondaryLink && (
                      <a
                        href={item.secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {item.secondaryLinkText}
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                    <a
                      href={item.link}
                      target={
                        item.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline"
                    >
                      {item.linkText}
                      {item.link.startsWith("http") ? (
                        <ExternalLink className="size-3" />
                      ) : (
                        <ArrowRight className="size-3" />
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* TEAM FORMATION */}
            <h2
              id="team-strategy"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6"
            >
              Assembling a Multidisciplinary Team
            </h2>

            <p>
              A common misconception about NASA Space Apps is that only software
              programmers can join. In reality, the most impactful solutions
              combine technical coding with scientific context, intuitive
              design, and clear storytelling.
            </p>

            <blockquote className="border-l-4 border-l-primary pl-4 sm:pl-6 my-6 sm:my-8 italic text-muted-foreground text-base sm:text-lg leading-relaxed">
              "Great hackathon solutions bridge technology and human impact.
              When coders, designers, researchers, and communicators
              collaborate, truly remarkable ideas come alive."
            </blockquote>

            <p>
              When assembling your team (up to 6 members), look for a balanced
              blend of strengths:
            </p>

            <ul className="space-y-4 my-6 list-disc pl-5 sm:pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Developers & Data Engineers:
                </strong>{" "}
                Building interactive web tools, mobile apps, telemetry decoders,
                and machine learning models (Python, JavaScript, React, GIS,
                GDAL).
              </li>
              <li>
                <strong className="text-foreground">
                  Domain Researchers & Scientists:
                </strong>{" "}
                Analyzing satellite datasets, climate parameters, and planetary
                records using{" "}
                <a
                  href="https://earthdata.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 break-words"
                >
                  NASA Earthdata
                </a>{" "}
                and the{" "}
                <a
                  href="https://pds.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 break-words"
                >
                  Planetary Data System (PDS)
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">
                  UI/UX Designers & Visual Artists:
                </strong>{" "}
                Crafting clean user interfaces, infographics, 3D orbits, and
                presentation visuals (Figma, Blender, Three.js).
              </li>
              <li>
                <strong className="text-foreground">
                  Storytellers & Presenters:
                </strong>{" "}
                Writing the project narrative, highlighting real-world benefits,
                and producing the mandatory 240-second demo video.
              </li>
            </ul>

            {/* SUBMISSION CHECKLIST */}
            <h2
              id="submission-checklist"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6"
            >
              Submission Checklist: What Judges Look For
            </h2>

            <p>
              Project submission opens on{" "}
              <strong>Saturday, November 14 at 9:00 AM</strong> and closes
              strictly on{" "}
              <strong>Sunday, November 15 at 11:59 PM local time</strong>.
              Before the clock runs out, make sure your team has prepared:
            </p>

            <div className="not-prose my-6 sm:my-8 p-6 sm:p-8 border border-border/60 bg-muted/20 space-y-4">
              {[
                "Explicit references and citations for all NASA & partner space agency open datasets utilized.",
                "A public, open-source code repository (GitHub / GitLab) with setup instructions and architecture documentation.",
                "A working live demonstration link or interactive prototype.",
                "A concise, high-quality demonstration video under 240 seconds (4 minutes maximum).",
                "A well-structured project summary detailing the problem, solution, methodology, and future vision.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-1" />
                  <span className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* FAQ SECTION */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 sm:space-y-5 not-prose my-6 sm:my-8">
              {[
                {
                  q: "Who is eligible to participate from Sri Lanka?",
                  a: "Anyone! NASA Space Apps is open to school students, university undergraduates, professionals, and space enthusiasts of all experience levels.",
                },
                {
                  q: "Is there any registration or entry fee?",
                  a: "No. NASA Space Apps is 100% free and open-access worldwide.",
                },
                {
                  q: "What is the team size limit?",
                  a: "Teams can have between 1 and 6 members. You can join, create, or change teams up until November 15.",
                },
                {
                  q: "Can team members be in different cities or universities?",
                  a: "Yes. Remote collaboration is fully supported, allowing you to team up with peers across Colombo, Kandy, Jaffna, Galle, or abroad.",
                },
                {
                  q: "Do all participants receive a certificate?",
                  a: "Yes! Submitting a valid project before the November 15 deadline grants an official NASA Space Apps Certificate of Participation and eligibility for Global Judging.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 border border-border/60 bg-card/30 space-y-2"
                >
                  <h4 className="font-bold text-base sm:text-lg text-foreground">
                    {faq.q}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* CLOSING ESSAY */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6">
              Inspiring{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lanka’s</span> Space
              Pioneers
            </h2>

            <p>
              Sri Lanka’s space community thrives on curiosity, ingenuity, and
              collaboration. We wish every participating team the very best as
              you dive into NASA’s open data, build creative prototypes, and
              represent the talent and ambition of{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lanka</span> on the
              international stage. Nothing would bring us greater pride than
              seeing Sri Lankan teams nominated globally and taking home the top
              awards once again.
            </p>

            {/* SPECIAL NOTE FOR LOCAL IN-PERSON EVENTS */}
            <div className="my-8 p-6 border border-border/60 bg-card/40 not-prose space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary uppercase tracking-wider">
                <Compass className="size-4" />
                <span>Looking for a Local In-Person Event?</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                If you wish to participate in an in-person or community-hosted
                local event, kindly visit the official NASA Space Apps local
                events directory at{" "}
                <a
                  href="https://www.spaceappschallenge.org/2026/local-events/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 break-words"
                >
                  spaceappschallenge.org/2026/local-events/
                </a>{" "}
                and choose any listed event near you.
              </p>
            </div>

            <p className="text-muted-foreground">
              To discover more student projects, workshops, observation nights,
              and chapter activities, visit{" "}
              <Link
                href="/"
                className="text-primary underline underline-offset-4 font-semibold hover:text-primary/80"
              >
                <span className="whitespace-nowrap">sedssl.org</span>
              </Link>{" "}
              or explore our multi-year journey at{" "}
              <Link
                href="/nasa-space-apps-challenge"
                className="text-primary underline underline-offset-4 font-semibold hover:text-primary/80"
              >
                /nasa-space-apps-challenge
              </Link>
              .
            </p>
          </article>

          {/* ARTICLE FOOTER / CTA — BLEEDING EDGE */}
          <footer className="relative">
            <div className="hidden sm:block absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
            <div className="hidden sm:block absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 p-6 sm:p-8 md:p-10 space-y-6 relative z-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    Ready to Start Building for Space Apps 2026?
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                    Registration is free on NASA's official Space Apps Challenge
                    platform.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href="https://www.spaceappschallenge.org/2026/local-events/universal-event/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="default"
                      className="w-full sm:w-auto font-mono font-bold text-xs uppercase tracking-wider gap-2 cursor-pointer rounded-none"
                    >
                      Universal Event
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </a>
                  <a
                    href="https://www.spaceappschallenge.org/2026/challenges/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      size="default"
                      className="w-full sm:w-auto font-mono font-bold text-xs uppercase tracking-wider gap-2 cursor-pointer rounded-none border-border/80 hover:border-primary"
                    >
                      2026 Challenges
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* FOOTER DISCLAIMER */}
              <div className="border-t border-border/60 pt-5 space-y-3 text-xs font-mono text-muted-foreground">
                <p className="leading-relaxed font-sans text-muted-foreground">
                  <strong>Notice:</strong> This website and guide are published
                  independently by{" "}
                  <span className="whitespace-nowrap">
                    SEDS&nbsp;Sri&nbsp;Lanka
                  </span>{" "}
                  as a free educational community resource. SEDS Sri Lanka is
                  not affiliated with, authorized, sponsored, or endorsed by
                  NASA or the NASA International Space Apps Challenge.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span>
                    Published by{" "}
                    <span className="whitespace-nowrap">
                      SEDS&nbsp;Sri&nbsp;Lanka
                    </span>
                  </span>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                    <a
                      href="https://www.spaceappschallenge.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      spaceappschallenge.org <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
