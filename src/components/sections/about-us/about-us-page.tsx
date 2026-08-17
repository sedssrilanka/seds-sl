"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "motion/react";

function AnimatedScrollImage({
  src,
  alt,
  heightClass = "h-[240px] sm:h-[360px] md:h-[500px]",
}: {
  src: string;
  alt: string;
  heightClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of image section as it moves into the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Mobile-adapted padding transform:
  // Starts at 0px (edge-to-edge full width on mobile)
  // Animates down to 16px on mobile (px-4) and 32px on desktop (md:px-8)
  const paddingX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "clamp(16px, 3.5vw, 32px)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 0.95, 1]);

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden">
      <motion.div
        style={{
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
        className="w-full max-w-7xl mx-auto will-change-transform"
      >
        <div className="w-full relative group overflow-hidden border border-border/60 bg-background/60">
          <motion.img
            src={src}
            alt={alt}
            style={{ scale, opacity }}
            className={`w-full ${heightClass} object-cover will-change-transform`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutUsPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ email: "", name: "", message: "" });
    }
  };

  return (
    <div className="w-full bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />

      {/* BACKGROUND VERTICAL COLUMN LINES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="w-full relative z-20">
        {/* HERO TITLE HEADER SECTION */}
        <div className="w-full border-b border-border/60 bg-background/80 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Hero Title */}
              <div className="lg:col-span-6 p-5 sm:p-6 md:py-16 md:px-0 lg:pr-8 space-y-4 flex flex-col justify-center">
                <div className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-primary uppercase">
                  About SEDS Sri Lanka
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-tight font-mono">
                  IMAGINATION &amp; SPACE ENGINEERING
                </h1>
              </div>

              {/* Right Subtitle Description */}
              <div className="lg:col-span-6 p-5 sm:p-6 md:py-16 md:px-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-border/60 space-y-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed flex flex-col justify-between">
                <p>
                  SEDS Sri Lanka is a student-driven space and technology
                  organization dedicated to inspiring the next generation of
                  innovators, engineers, and researchers in Sri Lanka. Founded
                  with the vision of strengthening space education, research
                  collaboration, and technological innovation, we work to create
                  opportunities for students who are passionate about aerospace,
                  science, and emerging technologies.
                </p>
                <p className="text-xs sm:text-sm font-mono text-primary font-semibold uppercase tracking-wide">
                  BUILDING A STRONG ECOSYSTEM FOR YOUNG MINDS TO EXPLORE SPACE
                  SCIENCE &amp; ADVANCED ENGINEERING.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH HERO IMAGE 1 WITH MOBILE-ADAPTED SCROLL ANIMATION */}
        <div className="w-full border-b border-border/60 py-4 sm:py-6 md:py-10 bg-background/60">
          <AnimatedScrollImage
            src="/about/hero.jpg"
            alt="SEDS Sri Lanka Space Facility"
            heightClass="h-[240px] sm:h-[360px] md:h-[500px]"
          />
        </div>

        {/* SECTION 1: INTEGRATED SPACE DEVELOPMENT */}
        <div className="w-full border-b border-border/60 bg-background/80 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column Title & CTA */}
              <div className="lg:col-span-4 p-5 sm:p-6 md:py-16 md:px-0 lg:pr-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-primary uppercase">
                    Core Initiatives
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                    INTEGRATED SPACE DEVELOPMENT
                  </h2>
                </div>

                {/* Section Link CTA Moved Below Left Title */}
                <div className="pt-2">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-foreground uppercase hover:text-primary transition-colors py-1"
                  >
                    <span>VIEW OUR PROJECTS &amp; RESEARCH</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Right Side: 3 Side-By-Side Full Height Segmented Columns with Vertical Dividers */}
              <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-border/60 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 items-stretch">
                {/* Column 1: OUR STORY */}
                <div className="p-5 sm:p-6 md:py-16 md:px-6 space-y-2 flex flex-col justify-start">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-primary tracking-wider">
                    OUR STORY
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Founded to bridge Sri Lanka&apos;s youth with global
                    aerospace advancements, SEDS Sri Lanka nurtures student
                    researchers, developers, and visionaries across nationwide
                    university chapters.
                  </p>
                </div>

                {/* Column 2: OUR MISSION */}
                <div className="p-5 sm:p-6 md:py-16 md:px-6 space-y-2 flex flex-col justify-start">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-primary tracking-wider">
                    OUR MISSION
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Empowering students through hands-on technical learning,
                    practical satellite and rocketry design, mentorship, and
                    participation in international space initiatives.
                  </p>
                </div>

                {/* Column 3: OUR VISION */}
                <div className="p-5 sm:p-6 md:py-16 md:pl-6 space-y-2 flex flex-col justify-start">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-primary tracking-wider">
                    OUR VISION
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    To establish Sri Lanka as an emerging hub for scientific
                    discovery and advanced engineering talent by driving
                    student-led space research to global standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH HERO IMAGE 2 WITH MOBILE-ADAPTED SCROLL ANIMATION */}
        <div className="w-full border-b border-border/60 py-4 sm:py-6 md:py-10 bg-background/60">
          <AnimatedScrollImage
            src="/about/rocket-tech.jpg"
            alt="Rocket Propulsion Technology"
            heightClass="h-[220px] sm:h-[320px] md:h-[460px]"
          />
        </div>

        {/* SECTION 2: INDEPENDENT & DEDICATED */}
        <div className="w-full border-b border-border/60 bg-background/80 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column Title & CTA */}
              <div className="lg:col-span-4 p-5 sm:p-6 md:py-16 md:px-0 lg:pr-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-primary uppercase">
                    Principles &amp; Values
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                    INDEPENDENT &amp; DEDICATED
                  </h2>
                </div>

                {/* Section Link CTA Moved Below Left Title */}
                <div className="pt-2">
                  <Link
                    href="/join-us"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-foreground uppercase hover:text-primary transition-colors py-1"
                  >
                    <span>JOIN OUR COMMUNITY NETWORK</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Right Side: 3 Side-By-Side Full Height Segmented Columns with Vertical Dividers */}
              <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-border/60 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 items-stretch">
                {/* Column 1 */}
                <div className="p-5 sm:p-6 md:py-16 md:px-6 space-y-2 flex flex-col justify-start">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-primary tracking-wider">
                    DRIVEN BY PASSION
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Student-led initiative driving high-level technical
                    challenges, workshops, space hacks, and collaborative
                    research teams across Sri Lanka.
                  </p>
                </div>

                {/* Column 2 */}
                <div className="p-5 sm:p-6 md:py-16 md:px-6 space-y-2 flex flex-col justify-start">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-primary tracking-wider">
                    GLOBAL NETWORKS
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Connecting Sri Lankan students directly with SEDS Earth,
                    international space agencies, academic research partners,
                    and global industry mentors.
                  </p>
                </div>

                {/* Column 3 */}
                <div className="p-5 sm:p-6 md:py-16 md:pl-6 space-y-2 flex flex-col justify-start">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-primary tracking-wider">
                    TECHNICAL EXCELLENCE
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Upholding rigor, precision, and high engineering standards
                    in every propulsion simulation, CubeSat hardware test, and
                    astrophysical study.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH HERO IMAGE 3 WITH MOBILE-ADAPTED SCROLL ANIMATION */}
        <div className="w-full border-b border-border/60 py-4 sm:py-6 md:py-10 bg-background/60">
          <AnimatedScrollImage
            src="/about/team-labs.jpg"
            alt="Space Research Laboratory"
            heightClass="h-[220px] sm:h-[320px] md:h-[460px]"
          />
        </div>
      </div>
    </div>
  );
}
