import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/keystatic";
import type { Metadata } from "next";
import { getServerSideURL } from "@/utilities/getURL";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Rocket,
  Globe,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Markdoc from "@markdoc/markdoc";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const baseUrl = getServerSideURL();
  const url = `${baseUrl}/projects/${slug}`;
  const image = project.image
    ? `${baseUrl}${project.image}`
    : `${baseUrl}/images/projects/savedino-cover.png`;

  const keywords = [
    project.name,
    project.chapter || "SEDS Sri Lanka",
    "SEDS Sri Lanka",
    "SEDS",
    "Asteroid Search Campaign",
    "IASC",
    "Planetary Defense",
    "SaveDino",
    "Pan-STARRS",
    "Minor Planet Center",
    "NASA Citizen Science",
    "Space Exploration Sri Lanka",
    "Astronomy Sri Lanka",
  ];

  return {
    title: `${project.name} | SEDS Sri Lanka`,
    description: project.description,
    keywords,
    authors: [{ name: "SEDS Sri Lanka", url: "https://sedssl.org" }],
    creator: "SEDS Sri Lanka",
    publisher: "SEDS Sri Lanka",
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${project.name} | SEDS Sri Lanka`,
      description: project.description,
      url,
      siteName: "SEDS Sri Lanka",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [image],
      creator: "@sedssl",
      site: "@sedssl",
    },
  };
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const Content = await project.content();
  const baseUrl = getServerSideURL();

  const image = project.image
    ? `${baseUrl}${project.image}`
    : `${baseUrl}/images/projects/savedino-cover.png`;

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/projects/${slug}`,
    },
    headline: project.name,
    description: project.description,
    image: [image],
    url: `${baseUrl}/projects/${slug}`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
      url: "https://sedssl.org",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/seds-white.png`,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
      url: "https://sedssl.org",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/seds-white.png`,
      },
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
      <p className="text-muted-foreground">{project.description}</p>
    );
  }

  const otherProjects = allProjects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />
      <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-24 md:pb-32 bg-background">
        <div className="grid-container section-content">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 space-y-10">
            {/* BREADCRUMB & BACK NAVIGATION — BLEEDING EDGE */}
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
                    href="/projects"
                    prefetch={false}
                    className="hover:text-primary transition-colors"
                  >
                    PROJECTS
                  </Link>
                  <ChevronRight className="size-3.5 opacity-60" />
                  <span className="text-primary font-bold uppercase truncate max-w-[280px] sm:max-w-none">
                    {project.name}
                  </span>
                </nav>
              </div>
            </div>{" "}
            {/* ARTICLE & SIDEBAR — 2-COLUMN BLEEDING EDGE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* MAIN CONTENT COLUMN (8 COLS) */}
              <div className="lg:col-span-8 space-y-8">
                {/* PROJECT HEADER & COVER CARD */}
                <div className="relative">
                  <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                  <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                  <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                  <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                  <div className="border border-border/60 bg-card/60 p-6 sm:p-8 lg:p-10 relative z-0 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
                        <Rocket className="size-4 text-primary" />
                        <span>
                          {project.chapter || "SEDS Sri Lanka Initiative"}
                        </span>
                      </div>

                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-foreground leading-tight">
                        {project.name}
                      </h1>

                      <p className="text-sm sm:text-base text-muted-foreground font-mono leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Cover Image */}
                    {project.image && (
                      <div className="relative w-full aspect-video md:aspect-[16/9] border border-border/60 bg-muted overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    {project.customLink && (
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <a
                          href={project.customLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button
                            variant="default"
                            size="lg"
                            bleed={true}
                            className="gap-2 font-mono text-xs font-bold uppercase tracking-wider"
                          >
                            <Globe className="size-4" />
                            <span>Launch Project Platform</span>
                            <ExternalLink className="size-3.5" />
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* ARTICLE BODY */}
                <div className="relative">
                  <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                  <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                  <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                  <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                  <div className="border border-border/60 bg-card/60 p-6 sm:p-8 lg:p-10 relative z-0">
                    <div className="prose prose-invert max-w-none prose-headings:font-mono prose-headings:font-bold prose-headings:text-foreground prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:border-b prose-h3:border-border/60 prose-h3:pb-3 prose-h3:mt-8 first:prose-h3:mt-0 prose-h4:text-lg prose-h4:font-bold prose-h4:text-foreground prose-a:text-primary prose-a:underline underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-primary/75 prose-p:text-sm sm:prose-p:text-base prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-sm sm:prose-li:text-base prose-li:text-muted-foreground prose-strong:text-foreground prose-hr:border-border/60">
                      {renderedContent}
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR (4 COLS) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* Project Links Card */}
                {project.customLink && (
                  <div className="relative">
                    <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                    <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
                    <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                    <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                    <div className="border border-border/60 bg-card/60 p-6 relative z-0 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                        <Sparkles className="size-4" />
                        <span>Platform Access</span>
                      </div>
                      <h3 className="text-base font-mono font-bold uppercase text-foreground">
                        Explore Live Platform
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                        Access the interactive live portal and documentation for{" "}
                        {project.name}.
                      </p>
                      <a
                        href={project.customLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full pt-1"
                      >
                        <Button
                          variant="default"
                          size="sm"
                          bleed={true}
                          className="w-full gap-1.5 font-mono text-xs font-bold uppercase tracking-wider"
                        >
                          <span>Open Platform</span>
                          <ExternalLink className="size-3.5" />
                        </Button>
                      </a>
                    </div>
                  </div>
                )}

                {/* Join SEDS Sri Lanka Card */}
                <div className="relative">
                  <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                  <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
                  <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                  <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                  <div className="border border-border/60 bg-card/60 p-6 relative z-0 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                      <Rocket className="size-4" />
                      <span>Get Involved</span>
                    </div>
                    <h3 className="text-base font-mono font-bold uppercase text-foreground">
                      Join Our Space Missions
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                      Collaborate on high-altitude balloon experiments, CanSats,
                      asteroid searches, and astrophysics research.
                    </p>
                    <Link
                      href="/join-us"
                      prefetch={false}
                      className="block w-full pt-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        bleed={true}
                        className="w-full gap-1.5 font-mono text-xs font-bold uppercase tracking-wider"
                      >
                        <span>Join SEDS Sri Lanka</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Other Projects List */}
                {otherProjects.length > 0 && (
                  <div className="relative">
                    <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                    <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
                    <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                    <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                    <div className="border border-border/60 bg-card/60 p-5 relative z-0 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider">
                        <Layers className="size-4" />
                        <span>Other Chapter Initiatives</span>
                      </div>

                      <div className="border border-border/60 divide-y divide-border/60 bg-background">
                        {otherProjects.slice(0, 4).map((p) => (
                          <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            prefetch={false}
                            className="p-3 block bg-card/30 hover:bg-card/70 transition-colors space-y-1 group"
                          >
                            <div className="text-xs font-mono font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {p.name}
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground truncate">
                              {p.chapter || "SEDS Chapter Project"}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </aside>
            </div>
            {/* BOTTOM NAV */}
            <div className="pt-8 border-t border-border/60 flex items-center justify-between">
              <Link href="/projects" prefetch={false}>
                <Button
                  variant="outline"
                  size="sm"
                  bleed={true}
                  className="gap-2 font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="size-3.5" />
                  <span>Back to Projects Directory</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
