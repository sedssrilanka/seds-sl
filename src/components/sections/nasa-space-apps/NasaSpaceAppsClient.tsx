"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SpaceAppsEdition,
  getAllSpaceAppsYears,
} from "@/utilities/getNasaSpaceAppsData";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Award,
  Globe,
  Rocket,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Lightbulb,
  Terminal,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  currentEdition: SpaceAppsEdition;
  allYears: string[];
  isBaseHub?: boolean;
}

export function NasaSpaceAppsClient({
  currentEdition,
  allYears,
  isBaseHub = false,
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "nominees" | "highlights"
  >("overview");

  return (
    <div className="relative min-h-screen bg-background">
      <div className="w-[calc(100%-2rem)] md:w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content relative z-10 pt-8 sm:pt-12 pb-24 space-y-10">
        {/* BREADCRUMB & HEADER BADGES — BLEEDING EDGE */}
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
                href="/nasa-space-apps-challenge"
                prefetch={false}
                className="hover:text-primary transition-colors"
              >
                NASA SPACE APPS
              </Link>
              {!isBaseHub && (
                <>
                  <ChevronRight className="size-3.5 opacity-60" />
                  <span className="text-primary font-bold">
                    {currentEdition.year}
                  </span>
                </>
              )}
            </nav>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                OFFICIAL NASA HACKATHON
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground border border-border/60">
                2019 – 2025 ARCHIVE
              </span>
            </div>
          </div>
        </div>

        {/* MULTI-YEAR TIMELINE SWITCHER BAR — BLEEDING EDGE SEGMENTED */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-card/40 p-4 sm:p-5 relative z-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  Select Edition / Year (2019 – 2025)
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                7 Consecutive Years of National Space Leadership
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 border border-border/60 divide-x divide-y sm:divide-y-0 divide-border/60 bg-background">
              {allYears.map((yr) => {
                const isSelected = yr === currentEdition.year;
                return (
                  <Link
                    key={yr}
                    href={`/nasa-space-apps-challenge/${yr}`}
                    prefetch={false}
                    className={`py-3 px-2 text-center text-xs font-mono font-bold transition-all relative ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-black shadow-inner"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                    }`}
                  >
                    {yr}
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground/80" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* HERO BANNER FOR SELECTED EDITION — BLEEDING EDGE GRID */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-card/60 p-6 sm:p-8 lg:p-10 relative z-0 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/30">
                NASA SPACE APPS {currentEdition.year}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Theme:{" "}
                <strong className="text-foreground">
                  {currentEdition.theme}
                </strong>
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-foreground">
                {currentEdition.title}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground font-mono leading-relaxed max-w-4xl">
                {currentEdition.tagline}
              </p>
            </div>

            {/* EVENT METADATA STRIP — CONNECTED SEGMENTED CELLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-background/60">
              <div className="p-4 flex items-start gap-3">
                <Calendar className="size-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5 font-semibold">
                    Date
                  </div>
                  <div className="text-xs font-mono font-bold text-foreground">
                    {currentEdition.date}
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-start gap-3">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5 font-semibold">
                    Format &amp; Venue
                  </div>
                  <div className="text-xs font-mono font-bold text-foreground">
                    {currentEdition.format}
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-start gap-3">
                <Globe className="size-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5 font-semibold">
                    Local Organizer
                  </div>
                  <div className="text-xs font-mono font-bold text-foreground">
                    SEDS Sri Lanka National Lead
                  </div>
                </div>
              </div>
            </div>

            {currentEdition.registrationStatus === "upcoming" && (
              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-4">
                <a
                  href={
                    currentEdition.registrationUrl ||
                    "https://www.spaceappschallenge.org"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <Rocket className="size-4" />
                  Official Space Apps Registration
                  <ExternalLink className="size-3.5" />
                </a>
                <span className="text-xs font-mono text-muted-foreground">
                  Open to all school and university students across Sri Lanka.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* KEY STATS COUNTERS — BLEEDING EDGE CONNECTED SEGMENTED GRID */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card/40 relative z-0">
            <div className="p-6 text-center space-y-1">
              <Users className="size-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                {currentEdition.participantsCount}
              </div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Participants
              </div>
            </div>

            <div className="p-6 text-center space-y-1">
              <Layers className="size-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                {currentEdition.teamsCount}
              </div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Hackathon Teams
              </div>
            </div>

            <div className="p-6 text-center space-y-1">
              <Lightbulb className="size-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                {currentEdition.projectsSubmitted}
              </div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Projects Built
              </div>
            </div>

            <div className="p-6 text-center space-y-1">
              <Trophy className="size-5 mx-auto mb-2 text-amber-400" />
              <div className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                {currentEdition.globalNomineesCount}
              </div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Global &amp; National Awards
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS SELECTOR — SEGMENTED BAR */}
        <div className="border border-border/60 bg-card/60 divide-x divide-border/60 grid grid-cols-1 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`p-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Compass className="size-4" />
            <span>Overview &amp; Focus</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("nominees")}
            className={`p-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              activeTab === "nominees"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Trophy className="size-4" />
            <span>Winning Teams ({currentEdition.nominees.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("highlights")}
            className={`p-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              activeTab === "highlights"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Award className="size-4" />
            <span>Key Highlights</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & FOCUS */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Edition Box — Bleeding Edge */}
              <div className="relative">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                <div className="border border-border/60 bg-card/60 p-6 sm:p-8 relative z-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                    <Rocket className="size-4" />
                    <span>Historical Archive</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                    About NASA Space Apps {currentEdition.year} in Sri Lanka
                  </h2>
                  <div className="space-y-4 text-sm font-mono text-muted-foreground leading-relaxed">
                    {currentEdition.overview.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenge Focus Areas — Bleeding Edge Segmented Grid */}
              <div className="relative">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                <div className="border border-border/60 bg-card/60 p-6 sm:p-8 relative z-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                    <Sparkles className="size-4" />
                    <span>NASA Open Datasets</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-mono font-bold text-foreground">
                    Challenge Focus Areas &amp; Scientific Domains
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 border border-border/60 divide-y sm:divide-y-0 sm:divide-x divide-border/60 bg-background">
                    {currentEdition.focusAreas.map((area, i) => (
                      <div
                        key={i}
                        className="p-4 bg-card/40 hover:bg-card/70 transition-colors flex items-start gap-3"
                      >
                        <div className="size-5 bg-primary/15 text-primary flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border border-primary/30">
                          {i + 1}
                        </div>
                        <span className="text-xs font-mono text-foreground leading-relaxed">
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR: MISSION STATEMENT */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                <div className="border border-border/60 bg-card/60 p-6 relative z-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                    <Globe className="size-4" />
                    <span>Apex Space Chapter</span>
                  </div>
                  <h3 className="text-base font-mono font-bold uppercase text-foreground">
                    Why SEDS Sri Lanka Hosts Space Apps
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                    As Sri Lanka&apos;s apex student space organization, SEDS SL
                    bridges local engineering talent with NASA open science
                    APIs, planetary datasets, and global aerospace
                    opportunities.
                  </p>
                  <div className="pt-2 border-t border-border/60">
                    <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">
                      7 Consecutive Editions • 2019 – 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WINNING TEAMS & NOMINEES — BLEEDING EDGE CONNECTED GRID */}
        {activeTab === "nominees" && (
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

              <div className="border border-border/60 bg-card/60 p-6 relative z-0 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                  <Trophy className="size-4" />
                  <span>National &amp; Global Honors</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                  Featured Awardees &amp; Global Nominees ({currentEdition.year}
                  )
                </h2>
                <p className="text-xs font-mono text-muted-foreground">
                  These student innovations were selected by academic and
                  aerospace judges to represent Sri Lanka in global NASA judging
                  rounds.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-background relative z-0">
                {currentEdition.nominees.map((nominee, i) => (
                  <div
                    key={i}
                    className="p-6 bg-card/40 hover:bg-card/70 transition-colors flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {nominee.award || "Global Nominee"}
                        </span>
                        <span className="text-[11px] font-mono text-primary font-bold">
                          {nominee.category}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-mono font-bold text-foreground">
                        {nominee.projectName}
                      </h3>

                      <div className="text-xs font-mono text-muted-foreground">
                        Team:{" "}
                        <strong className="text-foreground">
                          {nominee.teamName}
                        </strong>
                        {nominee.university && ` • ${nominee.university}`}
                      </div>

                      <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                        {nominee.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KEY HIGHLIGHTS — BLEEDING EDGE NUMBERED LIST */}
        {activeTab === "highlights" && (
          <div className="relative">
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 p-6 sm:p-8 relative z-0 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                <Award className="size-4" />
                <span>Milestones &amp; Records</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                Key Highlights of NASA Space Apps {currentEdition.year}
              </h2>

              <div className="border border-border/60 divide-y divide-border/60 bg-background">
                {currentEdition.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 bg-card/30 hover:bg-card/60 transition-colors flex items-start gap-4"
                  >
                    <span className="size-6 bg-primary/15 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-primary/30">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-foreground leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM QUICK-JUMP ARCHIVE BAR — BLEEDING EDGE */}
        <div className="relative">
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

          <div className="border border-border/60 bg-card/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-0">
            <div>
              <div className="text-xs font-mono font-bold text-foreground uppercase">
                Explore Other Editions of NASA Space Apps Sri Lanka
              </div>
              <div className="text-[11px] font-mono text-muted-foreground">
                Seven years of student space innovation, CanSat telemetry, and
                Earth science APIs.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {allYears.map((yr) => (
                <Link
                  key={yr}
                  href={`/nasa-space-apps-challenge/${yr}`}
                  prefetch={false}
                  className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                    yr === currentEdition.year
                      ? "bg-primary text-primary-foreground border-primary font-bold"
                      : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border/60"
                  }`}
                >
                  {yr}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
