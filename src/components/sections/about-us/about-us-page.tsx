"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="w-full bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-12 md:space-y-16">
        {/* HERO TITLE HEADER ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Hero Title */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono font-semibold tracking-wider text-primary uppercase">
              About SEDS Sri Lanka
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground leading-none font-mono">
              IMAGINATION &amp; SPACE ENGINEERING
            </h1>
            <div className="space-y-1 text-xs font-mono text-muted-foreground pt-2">
              <p>+ SOUNDING ROCKETRY &amp; PROPULSION</p>
              <p>+ CUBESAT &amp; SATELLITE SYSTEMS</p>
              <p>+ ASTROPHYSICS &amp; SPACE RESEARCH</p>
              <p>+ EDUCATION &amp; STEM OUTREACH</p>
            </div>
          </div>

          {/* Right Subtitle Description */}
          <div className="lg:col-span-6 space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed lg:pl-6 border-l-0 lg:border-l border-border/60">
            <p>
              SEDS Sri Lanka is a student-driven space and technology organization dedicated to inspiring the next generation of innovators, engineers, and researchers in Sri Lanka. Founded with the vision of strengthening space education, research collaboration, and technological innovation, we work to create opportunities for students who are passionate about aerospace, science, and emerging technologies.
            </p>
            <p className="text-xs font-mono text-primary font-semibold uppercase">
              BUILDING A STRONG ECOSYSTEM FOR YOUNG MINDS TO EXPLORE SPACE SCIENCE &amp; ADVANCED ENGINEERING.
            </p>
          </div>
        </div>

        {/* FULL-WIDTH HERO IMAGE 1 */}
        <div className="w-full relative group overflow-hidden border border-border/60">
          <img
            src="/about/hero.jpg"
            alt="SEDS Sri Lanka Space Facility"
            className="w-full h-[260px] sm:h-[380px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* SECTION 1: INTEGRATED SPACE DEVELOPMENT */}
        <div className="border-t border-border/60 pt-8 md:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column Title */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono font-semibold tracking-wider text-primary uppercase">
                Core Initiatives
              </div>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground font-mono">
                INTEGRATED SPACE DEVELOPMENT
              </h2>
              <div className="text-xs font-mono text-muted-foreground space-y-1">
                <p>+ High-Altitude Sounding Rockets</p>
                <p>+ CanSat &amp; Satellite Payloads</p>
                <p>+ Observational Astronomy</p>
                <p>+ National STEM Outreach</p>
              </div>
            </div>

            {/* Right Columns Grid (3 Sub-Columns) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Column 1: OUR STORY */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-primary tracking-wider border-b border-border/60 pb-2">
                    OUR STORY
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Founded to bridge Sri Lanka&apos;s youth with global aerospace advancements, SEDS Sri Lanka nurtures student researchers, developers, and visionaries across nationwide university chapters.
                  </p>
                </div>

                {/* Column 2: OUR MISSION */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-primary tracking-wider border-b border-border/60 pb-2">
                    OUR MISSION
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Empowering students through hands-on technical learning, practical satellite and rocketry design, mentorship, and participation in international space initiatives.
                  </p>
                </div>

                {/* Column 3: OUR VISION */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-primary tracking-wider border-b border-border/60 pb-2">
                    OUR VISION
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    To establish Sri Lanka as an emerging hub for scientific discovery and advanced engineering talent by driving student-led space research to global standards.
                  </p>
                </div>
              </div>

              {/* Section Link CTA */}
              <div className="pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-foreground uppercase hover:text-primary transition-colors"
                >
                  <span>VIEW OUR PROJECTS &amp; RESEARCH</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH HERO IMAGE 2 */}
        <div className="w-full relative group overflow-hidden border border-border/60">
          <img
            src="/about/rocket-tech.jpg"
            alt="Rocket Propulsion Technology"
            className="w-full h-[240px] sm:h-[340px] md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* SECTION 2: INDEPENDENT & DEDICATED */}
        <div className="border-t border-border/60 pt-8 md:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column Title */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono font-semibold tracking-wider text-primary uppercase">
                Principles &amp; Values
              </div>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground font-mono">
                INDEPENDENT &amp; DEDICATED
              </h2>
            </div>

            {/* Right Columns Grid (3 Sub-Columns) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Column 1 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-primary tracking-wider border-b border-border/60 pb-2">
                    DRIVEN BY PASSION
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Student-led initiative driving high-level technical challenges, workshops, space hacks, and collaborative research teams across Sri Lanka.
                  </p>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-primary tracking-wider border-b border-border/60 pb-2">
                    GLOBAL NETWORKS
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Connecting Sri Lankan students directly with SEDS Earth, international space agencies, academic research partners, and global industry mentors.
                  </p>
                </div>

                {/* Column 3 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-primary tracking-wider border-b border-border/60 pb-2">
                    TECHNICAL EXCELLENCE
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Upholding rigor, precision, and high engineering standards in every propulsion simulation, CubeSat hardware test, and astrophysical study.
                  </p>
                </div>
              </div>

              {/* Section Link CTA */}
              <div className="pt-2">
                <Link
                  href="/join-us"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-foreground uppercase hover:text-primary transition-colors"
                >
                  <span>JOIN OUR COMMUNITY NETWORK</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH HERO IMAGE 3 */}
        <div className="w-full relative group overflow-hidden border border-border/60">
          <img
            src="/about/team-labs.jpg"
            alt="Space Research Laboratory"
            className="w-full h-[240px] sm:h-[340px] md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        </div>


      </div>
    </div>
  );
}
