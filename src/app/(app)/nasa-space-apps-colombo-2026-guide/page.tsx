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
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSideURL } from "@/utilities/getURL";

export const metadata: Metadata = {
  title:
    "NASA Space Apps Colombo & Sri Lanka 2026: Community Guidebook | SEDS Sri Lanka",
  description:
    "An independent community guidebook by SEDS Sri Lanka on participating in NASA Space Apps 2026. Official timeline dates, Universal Event registration, finding/forming teams, exploring challenges, and submission guidelines.",
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
      "An independent community guidebook by SEDS Sri Lanka with timeline dates, Universal Event guide, team formation, and challenge submission for NASA Space Apps 2026.",
    url: "/nasa-space-apps-colombo-2026-guide",
    siteName: "SEDS Sri Lanka",
    locale: "en_LK",
    type: "article",
    images: [
      {
        url: "/images/projects/nsa-cover.png",
        width: 1200,
        height: 630,
        alt: "NASA Space Apps Colombo 2026 Guide - SEDS Sri Lanka",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NASA Space Apps Colombo & Sri Lanka 2026: Community Guidebook",
    description:
      "An independent community guidebook on how to register, assemble teams, and compete in NASA Space Apps 2026.",
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
      "Independent community guide by SEDS Sri Lanka detailing the official 2026 timeline dates, registration process, Universal Event track, challenges, team formation best practices, and project submission guidelines.",
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
    dateModified: "2026-09-21",
  };

  const officialRoadmap = [
    {
      step: "01",
      title: "CREATE ACCOUNT",
      date: "August 26, 2026",
      desc: "The first step in your hackathon journey is to create a NASA Space Apps account or log in to your existing account.",
      link: "https://www.spaceappschallenge.org",
      linkText: "Create / Log In",
    },
    {
      step: "02",
      title: "REGISTER FOR THE HACKATHON",
      date: "August 26, 2026 (Open until Nov 15)",
      desc: "To participate and be eligible for Global Judging, you must first register for the 2026 NASA Space Apps Challenge. You can register up until the hackathon closes on November 15.",
      link: "https://www.spaceappschallenge.org",
      linkText: "Register on Portal",
    },
    {
      step: "03",
      title: "CHOOSE AN EVENT (LOCAL OR UNIVERSAL)",
      date: "August 26, 2026 (Open until Nov 15)",
      desc: "Connect with the NASA Space Apps community by choosing an in-person or virtual Local Event near you. If you don’t have a Local Event near you, choose the virtual Universal Event. You can choose or change your event up until November 15.",
      link: "https://www.spaceappschallenge.org/2026/local-events/universal-event/",
      linkText: "Universal Event Track",
      secondaryLink: "https://www.spaceappschallenge.org/2026/local-events/",
      secondaryLinkText: "Browse All Local Events",
    },
    {
      step: "04",
      title: "JOIN OR FORM A TEAM",
      date: "September 17, 2026 (Open until Nov 15)",
      desc: "Collaborate with participants by forming or joining a team according to your chosen challenge. Teams should have no more than six participants (1 to 6 members). You can choose or change your team up until the hackathon closes on November 15.",
      link: "https://www.spaceappschallenge.org/2026/find-a-team/",
      linkText: "Find / Browse Teams",
    },
    {
      step: "05",
      title: "SUBMIT A PROJECT",
      date: "Nov 14 (9:00 AM) – Nov 15 (11:59 PM Local Time)",
      desc: "To edit and submit your project, go to the Project Tab on your Team’s page. Project submission opens Saturday, November 14 at 9:00 AM and closes Sunday, November 15 at 11:59 PM local time. Submit your project to receive an official participant certificate and to be eligible for Global Judging.",
      link: "https://www.spaceappschallenge.org/2026/challenges/",
      linkText: "Explore 2026 Challenges",
    },
    {
      step: "06",
      title: "COMPLETE THE PARTICIPANT SURVEY",
      date: "December 1, 2026",
      desc: "Share your feedback about your hackathon journey to help improve future events and celebrate the global community.",
      link: "https://www.spaceappschallenge.org",
      linkText: "Space Apps Feedback",
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
                    COMMUNITY &bull; COLOMBO & NATIONWIDE
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] break-words">
                  NASA Space Apps Colombo &{" "}
                  <span className="whitespace-nowrap">Sri&nbsp;Lanka</span>{" "}
                  2026: The Complete Participation & Universal Event Guide
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  An independent, comprehensive community guidebook for{" "}
                  <span className="whitespace-nowrap">Sri&nbsp;Lankan</span>{" "}
                  students, developers, designers, and space enthusiasts
                  detailing the official 2026 roadmap, team formation,
                  challenges, and global submission guidelines.
                </p>
              </div>

              {/* METADATA BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-border/60 text-xs font-mono text-muted-foreground">
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

                <div className="flex items-center gap-1.5 font-sans pt-2 sm:pt-0 border-t sm:border-t-0 border-border/30">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold text-foreground">
                    Colombo & Universal Event
                  </span>
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
              to assist students and creators in participating in the hackathon.{" "}
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
            {/* OPENING ESSAY */}
            <p className="text-lg sm:text-xl text-foreground leading-relaxed font-normal">
              For more than half a decade, the{" "}
              <strong>NASA International Space Apps Challenge</strong> has been
              the highlight of{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lanka’s</span>{" "}
              student innovation calendar. From energetic university auditoriums
              across Colombo and Moratuwa to campus computer labs and late-night
              study lounges throughout the country, thousands of{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lankan</span> youth
              have come together to transform raw open data from NASA into
              solutions for urgent challenges on Earth and in space.
            </p>

            <p className="text-muted-foreground">
              Having organized and nurtured this initiative nationwide from 2019
              through 2025,{" "}
              <strong>
                <span className="whitespace-nowrap">
                  SEDS&nbsp;Sri&nbsp;Lanka
                </span>
              </strong>{" "}
              is proud to see how deeply the space innovation spirit has taken
              root across our universities and schools. Our core mission remains
              steadfast: empowering students, fostering collaboration, and
              helping <span className="whitespace-nowrap">Sri&nbsp;Lankan</span>{" "}
              talent thrive on the global stage.
            </p>

            {/* HIGHLIGHT MESSAGE */}
            <div className="my-8 sm:my-10 p-6 sm:p-8 border-l-4 border-l-primary bg-primary/5 border-y border-r border-border/60 not-prose space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="size-4 shrink-0" />
                <span>
                  Empowering Every{" "}
                  <span className="whitespace-nowrap">Sri&nbsp;Lankan</span>{" "}
                  Innovator in 2026
                </span>
              </div>
              <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-sans">
                Whether you are collaborating virtually with university peers,
                joining through an in-person track, or registering under the
                global <strong>Universal Event</strong>, this open guidebook
                provides the official links, timeline dates, and team strategies
                you need to build an exceptional project for NASA Space Apps
                2026.
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
              , participants have multiple paths to take part:
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground pt-2">
              The NASA Space Apps Universal Event (Global Virtual Track)
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
              is the official global track hosted directly by NASA’s Global
              Organizing Team. It is designed to ensure that every creator,
              regardless of location, has direct and equal access to the
              hackathon.
            </p>

            <ul className="space-y-3 my-6 list-disc pl-5 sm:pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Full Dataset & Prompt Access:
                </strong>{" "}
                You receive the exact same official NASA challenge statements,
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
                  Total Team Flexibility:
                </strong>{" "}
                You can form interdisciplinary teams with friends in Colombo,
                across other{" "}
                <span className="whitespace-nowrap">Sri&nbsp;Lankan</span>{" "}
                universities (Peradeniya, Moratuwa, SLIIT, Ruhuna, Jaffna, KDU),
                or with international collaborators.
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

            {/* OFFICIAL ROADMAP TIMELINE */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6">
              Official NASA Space Apps 2026 Roadmap & Key Dates
            </h2>

            <p>
              Participation is 100% <strong>free</strong> and open to all skill
              levels. Here is the official timeline and key steps from account
              creation through project submission:
            </p>

            <ol className="space-y-6 my-6 sm:my-8 list-none pl-0 not-prose">
              {officialRoadmap.map((item, idx) => (
                <li
                  key={idx}
                  className="p-6 sm:p-7 md:p-8 border border-border/60 bg-card/30 space-y-3 relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-primary">
                        STEP {item.step}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        &bull; {item.date}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
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
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline"
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

                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>

            {/* TEAM FORMATION */}
            <h2
              id="team-strategy"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6"
            >
              Assembling a Winning Multidisciplinary Team
            </h2>

            <p>
              A common myth about NASA Space Apps is that it is solely a coding
              competition. Looking back at{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lanka’s</span> past
              global nominees, the highest-ranking solutions were created by
              diverse teams (up to 6 participants) that combined technical
              engineering with scientific context, intuitive design, and clear
              storytelling.
            </p>

            <blockquote className="border-l-4 border-l-primary pl-4 sm:pl-6 my-6 sm:my-8 italic text-muted-foreground text-base sm:text-lg leading-relaxed">
              "Great hackathon solutions bridge technology and human impact.
              When coders, designers, researchers, and communicators
              collaborate, truly remarkable ideas come alive."
            </blockquote>

            <p>
              When building your team, consider including members with strengths
              in:
            </p>

            <ul className="space-y-4 my-6 list-disc pl-5 sm:pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Software Developers & AI Coders:
                </strong>{" "}
                Prototyping interactive web dashboards, mobile apps, telemetry
                decoders, and machine learning models (Python, JavaScript,
                React, GIS, GDAL).
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
                Crafting intuitive user interfaces, clear infographics, 3D
                orbits, and presentation visuals (Figma, Blender, Three.js).
              </li>
              <li>
                <strong className="text-foreground">
                  Storytellers & Presenters:
                </strong>{" "}
                Writing the project narrative, highlighting the societal impact,
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
              Ensure your team has prepared:
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

            {/* CLOSING */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-6">
              Inspiring{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lanka’s</span> Space
              Pioneers
            </h2>

            <p>
              <span className="whitespace-nowrap">Sri&nbsp;Lanka’s</span> space
              community thrives on curiosity, ingenuity, and collaboration. We
              wish every participating team the very best as you dive into
              NASA’s open data, build creative prototypes, and represent the
              talent and ambition of{" "}
              <span className="whitespace-nowrap">Sri&nbsp;Lanka</span> on the
              international stage.
            </p>

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
                  as a free educational resource. SEDS Sri Lanka is not
                  affiliated with, authorized, sponsored, or endorsed by NASA or
                  the NASA International Space Apps Challenge.
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
