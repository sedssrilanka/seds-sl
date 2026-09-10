import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChapterBySlug, getAllChapters } from "@/lib/keystatic";
import { getServerSideURL } from "@/utilities/getURL";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  School,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Markdoc from "@markdoc/markdoc";
import {
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

export const revalidate = 3600;

export async function generateStaticParams() {
  const chapters = await getAllChapters();
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);
  if (!chapter) return { title: "Chapter Not Found" };

  const baseUrl = getServerSideURL();
  const url = `${baseUrl}/chapters/${slug}`;
  const image = chapter.mainImage ? `${baseUrl}${chapter.mainImage}` : `${baseUrl}/section-header/who-we-are-bg.jpg`;

  return {
    title: `${chapter.name} | SEDS Sri Lanka Chapters`,
    description: chapter.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${chapter.name} | SEDS Sri Lanka Chapters`,
      description: chapter.description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.name,
      description: chapter.description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [chapter, allChapters] = await Promise.all([
    getChapterBySlug(slug),
    getAllChapters(),
  ]);

  if (!chapter) {
    notFound();
  }

  const Content = await chapter.content();
  const baseUrl = getServerSideURL();

  const jsonLdChapter = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: chapter.name,
    description: chapter.description,
    url: `${baseUrl}/chapters/${slug}`,
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "SEDS Sri Lanka",
      url: baseUrl,
    },
  };

  let renderedContent: React.ReactNode = null;
  if (Content?.node) {
    const transformed = Markdoc.transform(Content.node);
    renderedContent = Markdoc.renderers.react(transformed, React);
  } else if (typeof Content === "string") {
    renderedContent = <p className="whitespace-pre-line">{Content}</p>;
  } else {
    renderedContent = <p className="text-muted-foreground">{chapter.description}</p>;
  }

  const otherChapters = allChapters.filter((c) => c.slug !== chapter.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdChapter) }}
      />
      <div className="flex flex-col w-full min-h-screen py-10 md:py-16">
        <div className="w-[calc(100%-2rem)] md:w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 section-content relative z-10">
          {/* Top Back Breadcrumb */}
          <div className="mb-8">
            <Link href="/chapters">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ChevronLeftIcon className="w-4 h-4" /> BACK TO CHAPTERS
              </Button>
            </Link>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
            {/* Main Article Content (8 Columns on desktop) */}
            <article className="lg:col-span-8 space-y-8 min-w-0">
              {/* Chapter Header Banner */}
              <div className="border-b border-border/60 pb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary">
                    <School className="size-6 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                    {chapter.university || "SEDS Sri Lanka University Chapter"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {chapter.name}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {chapter.description}
                </p>

                {chapter.contactEmail && (
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-1">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Contact:</span>
                    <a
                      href={`mailto:${chapter.contactEmail}`}
                      className="hover:underline text-primary font-semibold"
                    >
                      {chapter.contactEmail}
                    </a>
                  </div>
                )}
              </div>

              {/* Rich Content Body */}
              <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:tracking-tight prose-a:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
                {renderedContent}
              </div>
            </article>

            {/* Sticky Join Now & Quick Nav Sidebar (4 Columns on desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
              {/* Join Chapter Card */}
              <div className="border border-border/60 bg-background p-6 sm:p-7 space-y-6 relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Get Involved</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Join This Chapter
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Connect with fellow students at {chapter.university || "your university"} who share a passion for space exploration and STEM.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-muted-foreground border-y border-border/60 py-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>On-campus workshops, stargazing and study circles</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Direct collaboration with national SEDS divisions</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Leadership opportunities and project grants</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>100% Free student community membership</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full font-semibold cursor-pointer">
                  <Link href="/join-us">
                    Join SEDS Sri Lanka <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <div className="text-center pt-1">
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Have questions?{" "}
                    <Link href="/contact-us" className="text-primary hover:underline font-semibold">
                      Contact us
                    </Link>
                  </p>
                </div>
              </div>

              {/* Other Chapters Navigation Card */}
              {otherChapters.length > 0 && (
                <div className="border border-border/60 bg-background p-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Explore Other Chapters
                  </h4>
                  <div className="space-y-2.5">
                    {otherChapters.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/chapters/${c.slug}`}
                        className="block text-xs text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1.5 border-b border-border/30 last:border-0"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/chapters"
                    className="text-xs font-mono text-primary hover:underline flex items-center gap-1 pt-2 block font-semibold"
                  >
                    <span>View all chapters</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

