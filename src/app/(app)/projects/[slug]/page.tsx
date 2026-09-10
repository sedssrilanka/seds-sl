import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/keystatic";
import type { Metadata } from "next";
import { getServerSideURL } from "@/utilities/getURL";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
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
  const image = project.image ? `${baseUrl}${project.image}` : `${baseUrl}/section-header/space-projects-bg.jpeg`;

  return {
    title: `${project.name} | SEDS Sri Lanka Projects`,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.name} | SEDS Sri Lanka Projects`,
      description: project.description,
      url,
      images: [{ url: image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
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
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const Content = await project.content();
  const baseUrl = getServerSideURL();

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: project.description,
    url: `${baseUrl}/projects/${slug}`,
    author: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
    },
    publisher: {
      "@type": "Organization",
      name: "SEDS Sri Lanka",
    },
  };

  let renderedContent: React.ReactNode = null;
  if (Content?.node) {
    const transformed = Markdoc.transform(Content.node);
    renderedContent = Markdoc.renderers.react(transformed, React);
  } else if (typeof Content === "string") {
    renderedContent = <p className="whitespace-pre-line">{Content}</p>;
  } else {
    renderedContent = <p className="text-muted-foreground">{project.description}</p>;
  }

  const otherProjects = allProjects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />
      <div className="flex flex-col w-full min-h-screen py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top Back Breadcrumb */}
          <div className="mb-8">
            <Link href="/projects">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ChevronLeftIcon className="w-4 h-4" /> BACK TO PROJECTS
              </Button>
            </Link>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
            {/* Main Article Content (8 Columns on desktop) */}
            <article className="lg:col-span-8 space-y-8 min-w-0">
              {/* Project Header Banner */}
              <div className="border-b border-border/60 pb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary">
                    <Rocket className="size-6 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                    {project.chapter || "SEDS Sri Lanka Project"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {project.name}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Rich Content Body */}
              <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:tracking-tight prose-a:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
                {renderedContent}
              </div>
            </article>

            {/* Sticky Join Now & Quick Nav Sidebar (4 Columns on desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
              {/* Join Project Team Card */}
              <div className="border border-border/60 bg-background p-6 sm:p-7 space-y-6 relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Get Involved</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Work on Projects
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Want to build hands-on space hardware, software, or science experiments? Join student project teams across Sri Lanka.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-muted-foreground border-y border-border/60 py-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Open to all undergraduate and school students</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Hands-on skills in robotics, rocketry, avionics and IoT</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Mentorship from senior students and alumni</span>
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

              {/* Other Projects Navigation Card */}
              {otherProjects.length > 0 && (
                <div className="border border-border/60 bg-background p-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Explore Other Projects
                  </h4>
                  <div className="space-y-2.5">
                    {otherProjects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="block text-xs text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1.5 border-b border-border/30 last:border-0"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/projects"
                    className="text-xs font-mono text-primary hover:underline flex items-center gap-1 pt-2 block font-semibold"
                  >
                    <span>View all projects</span>
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

