"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Building2,
  Lightbulb,
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "nominees" | "highlights">("overview");

  return (
    <div className="relative min-h-screen bg-background">
      <div className="w-[calc(100%-2rem)] md:w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content relative z-10 pt-8 sm:pt-12 pb-20">
        {/* BREADCRUMB & HEADER BADGE */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/60 pb-4">
          <nav className="flex items-center gap-2 font-mono text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link
              href="/nasa-space-apps-challenge"
              className="hover:text-foreground transition-colors"
            >
              NASA SPACE APPS
            </Link>
            {!isBaseHub && (
              <>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                <span className="text-primary font-bold">{currentEdition.year}</span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
              OFFICIAL NASA HACKATHON
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-muted text-muted-foreground border border-border">
              2019 - 2025 ARCHIVE
            </span>
          </div>
        </div>

        {/* MULTI-YEAR TIMELINE SWITCHER BAR */}
        <div className="mb-10 bg-card/60 backdrop-blur border border-border p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Select Edition / Year (2019 - 2025):
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              7 Consecutive Years of Space Innovation in Sri Lanka
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {allYears.map((yr) => {
              const isSelected = yr === currentEdition.year;
              return (
                <Link
                  key={yr}
                  href={`/nasa-space-apps-challenge/${yr}`}
                  className={`px-4 py-2 text-xs sm:text-sm font-mono font-bold transition-all shrink-0 border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                      : "bg-background/80 hover:bg-muted text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {yr}
                </Link>
              );
            })}
          </div>
        </div>

        {/* HERO BANNER FOR THE SELECTED EDITION */}
        <div className="border border-border bg-card/80 backdrop-blur p-6 sm:p-8 lg:p-10 mb-10 relative overflow-hidden">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/30">
                NASA SPACE APPS {currentEdition.year}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Theme: <strong className="text-foreground">{currentEdition.theme}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-foreground mb-4">
              {currentEdition.title}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-mono leading-relaxed mb-6">
              {currentEdition.tagline}
            </p>

            {/* EVENT METADATA STRIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-border/80 pt-5 mt-6">
              <div className="flex items-start gap-3 p-3 bg-background/60 border border-border/70">
                <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5 font-semibold">
                    Date
                  </div>
                  <div className="text-xs font-mono font-bold text-foreground break-words">
                    {currentEdition.date}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-background/60 border border-border/70">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5 font-semibold">
                    Format & Venue
                  </div>
                  <div className="text-xs font-mono font-bold text-foreground break-words">
                    {currentEdition.format}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-background/60 border border-border/70">
                <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5 font-semibold">
                    Local Organizer
                  </div>
                  <div className="text-xs font-mono font-bold text-foreground break-words">
                    SEDS Sri Lanka National Lead
                  </div>
                </div>
              </div>
            </div>

            {currentEdition.registrationStatus === "upcoming" && (
              <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center gap-4">
                <a
                  href={currentEdition.registrationUrl || "https://www.spaceappschallenge.org"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <Rocket className="w-4 h-4" />
                  Official Space Apps Registration
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-xs font-mono text-muted-foreground">
                  Open to all school and university students across Sri Lanka.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* KEY STATS COUNTERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="border border-border bg-card/60 p-5 text-center">
            <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl sm:text-2xl font-mono font-black text-foreground">
              {currentEdition.participantsCount}
            </div>
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">
              Participants
            </div>
          </div>

          <div className="border border-border bg-card/60 p-5 text-center">
            <Layers className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl sm:text-2xl font-mono font-black text-foreground">
              {currentEdition.teamsCount}
            </div>
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">
              Hackathon Teams
            </div>
          </div>

          <div className="border border-border bg-card/60 p-5 text-center">
            <Lightbulb className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl sm:text-2xl font-mono font-black text-foreground">
              {currentEdition.projectsSubmitted}
            </div>
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">
              Projects Built
            </div>
          </div>

          <div className="border border-border bg-card/60 p-5 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-2 text-amber-400" />
            <div className="text-xl sm:text-2xl font-mono font-black text-foreground">
              {currentEdition.globalNomineesCount}
            </div>
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-1">
              Global & National Awards
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-border mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors shrink-0 ${
              activeTab === "overview"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Edition Overview & Focus Areas
          </button>
          <button
            onClick={() => setActiveTab("nominees")}
            className={`px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors shrink-0 ${
              activeTab === "nominees"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Winning Teams & Nominees ({currentEdition.nominees.length})
          </button>
          <button
            onClick={() => setActiveTab("highlights")}
            className={`px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors shrink-0 ${
              activeTab === "highlights"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Highlights & Partners
          </button>
        </div>

        {/* TAB CONTENTS */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border bg-card/60 p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-mono font-bold text-foreground mb-4 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  About NASA Space Apps {currentEdition.year} in Sri Lanka
                </h2>
                <div className="space-y-4 text-sm font-mono text-muted-foreground leading-relaxed">
                  {currentEdition.overview.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card/60 p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Challenge Focus Areas & NASA Open Data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentEdition.focusAreas.map((area, i) => (
                    <div
                      key={i}
                      className="p-3.5 border border-border/70 bg-background/60 flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-xs font-mono text-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR: PARTNERS & INFO */}
            <div className="space-y-6">
              <div className="border border-border bg-card/60 p-6">
                <h3 className="text-sm font-mono font-bold uppercase text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Partnering Institutions
                </h3>
                <ul className="space-y-2.5">
                  {currentEdition.partnerInstitutions.map((inst, i) => (
                    <li
                      key={i}
                      className="text-xs font-mono text-muted-foreground flex items-center gap-2 pb-2 border-b border-border/40 last:border-0 last:pb-0"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {inst}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-border bg-primary/5 p-6">
                <h3 className="text-sm font-mono font-bold uppercase text-foreground mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Why SEDS Sri Lanka Hosts Space Apps
                </h3>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  As Sri Lanka&apos;s apex student space organization, SEDS SL bridges local
                  engineering talent with NASA, open science APIs, and international aerospace
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "nominees" && (
          <div className="space-y-6">
            <div className="border border-border bg-card/60 p-6">
              <h2 className="text-lg font-mono font-bold text-foreground mb-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Featured Awardees & Global Nominees ({currentEdition.year})
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                These student innovations were selected by academic and industry judges to represent Sri Lanka in the global NASA judging rounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentEdition.nominees.map((nominee, i) => (
                <div
                  key={i}
                  className="border border-border bg-card/80 p-6 flex flex-col justify-between hover:border-primary/60 transition-colors"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {nominee.award || "Global Nominee"}
                      </span>
                      <span className="text-[11px] font-mono text-primary font-bold">
                        {nominee.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-mono font-bold text-foreground mb-1">
                      {nominee.projectName}
                    </h3>
                    <div className="text-xs font-mono text-muted-foreground mb-3">
                      Team: <strong className="text-foreground">{nominee.teamName}</strong>
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
        )}

        {activeTab === "highlights" && (
          <div className="space-y-6">
            <div className="border border-border bg-card/60 p-6 sm:p-8">
              <h2 className="text-lg font-mono font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Key Highlights of {currentEdition.year}
              </h2>
              <ul className="space-y-4">
                {currentEdition.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="p-4 border border-border/70 bg-background/50 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* BOTTOM QUICK-JUMP ARCHIVE BAR */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-foreground uppercase">
              Explore Other Editions of NASA Space Apps Sri Lanka:
            </div>
            <div className="text-[11px] font-mono text-muted-foreground">
              Every edition represents hundreds of hours of student aerospace innovation.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allYears.map((yr) => (
              <Link
                key={yr}
                href={`/nasa-space-apps-challenge/${yr}`}
                className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                  yr === currentEdition.year
                    ? "bg-primary text-primary-foreground border-primary font-bold"
                    : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                }`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
