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
  FaInstagram,
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
  const image = chapter.mainImage
    ? `${baseUrl}${chapter.mainImage}`
    : `${baseUrl}/section-header/who-we-are-bg.jpg`;

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
    renderedContent = (
      <p className="text-muted-foreground">{chapter.description}</p>
    );
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

            {/* Sticky Chapter Info & Quick Nav Sidebar (4 Columns on desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
              {/* Chapter Information & Contact Card */}
              <div className="border border-border/60 bg-background p-6 sm:p-7 space-y-6 relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Chapter Directory</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Chapter Information
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Official student chapter details, affiliated institution,
                    and contact channels.
                  </p>
                </div>

                {/* Base University & Contact Details */}
                <div className="space-y-4 text-xs border-y border-border/60 py-4">
                  {/* University / Institution */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                      Base University / Institution
                    </span>
                    <div className="flex items-start gap-2.5 text-foreground font-medium pt-0.5">
                      <School className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        {chapter.university || "SEDS Sri Lanka Chapter"}
                      </span>
                    </div>
                  </div>

                  {/* Contact Email */}
                  {chapter.contactEmail && (
                    <div className="space-y-1 pt-2 border-t border-border/30">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Official Contact Email
                      </span>
                      <div className="flex items-center gap-2.5 text-primary pt-0.5">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <a
                          href={`mailto:${chapter.contactEmail}`}
                          className="hover:underline font-mono text-xs font-semibold truncate"
                        >
                          {chapter.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Social Media Links */}
                  <div className="space-y-2 pt-2 border-t border-border/30">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                      Connect & Follow
                    </span>
                    {chapter.socialLinks && chapter.socialLinks.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {chapter.socialLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border/60 bg-muted/20 hover:bg-primary/10 hover:border-primary/50 text-foreground hover:text-primary transition-all text-xs font-mono capitalize"
                          >
                            {link.platform === "facebook" && (
                              <FaFacebook className="w-3.5 h-3.5 text-primary" />
                            )}
                            {link.platform === "twitter" && (
                              <FaTwitter className="w-3.5 h-3.5 text-primary" />
                            )}
                            {link.platform === "linkedin" && (
                              <FaLinkedin className="w-3.5 h-3.5 text-primary" />
                            )}
                            {link.platform === "instagram" && (
                              <FaInstagram className="w-3.5 h-3.5 text-primary" />
                            )}
                            <span>{link.platform}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href="https://www.facebook.com/sedssl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-border/60 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
                          aria-label="SEDS Facebook"
                        >
                          <FaFacebook className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/seds-sri-lanka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-border/60 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
                          aria-label="SEDS LinkedIn"
                        >
                          <FaLinkedin className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="https://www.instagram.com/sedssl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-border/60 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
                          aria-label="SEDS Instagram"
                        >
                          <FaInstagram className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Join CTA */}
                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full font-semibold cursor-pointer"
                  >
                    <Link href="/join-us">
                      Join SEDS Sri Lanka{" "}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <div className="text-center">
                    <p className="text-[11px] text-muted-foreground font-mono">
                      General inquiries?{" "}
                      <Link
                        href="/contact-us"
                        className="text-primary hover:underline font-semibold"
                      >
                        Contact Us
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Chapters Navigation Card */}
              {otherChapters.length > 0 && (
                <div className="border border-border/60 bg-background p-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Explore Other Chapters
                  </h4>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {otherChapters.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/chapters/${c.slug}`}
                        className="block text-xs text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1.5 border-b border-border/30 last:border-0"
                      >
                        <span className="font-semibold text-foreground block">
                          {c.name}
                        </span>
                        {c.university && (
                          <span className="text-[10px] text-muted-foreground font-mono block truncate">
                            {c.university}
                          </span>
                        )}
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
