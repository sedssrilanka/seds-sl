import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { keystaticReader } from "@/lib/keystatic";
import Markdoc from "@markdoc/markdoc";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const pages = await keystaticReader.collections.pages.all();
    return pages.map((p) => ({ slug: p.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await keystaticReader.collections.pages.read(slug);
    if (!page) return { title: "Page Not Found | SEDS Sri Lanka" };

    return {
      title: `${page.title} | SEDS Sri Lanka`,
      description: page.description || "",
    };
  } catch {
    return { title: "SEDS Sri Lanka" };
  }
}

export default async function SubPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug = "home" } = await params;

  let pageData: any = null;
  try {
    pageData = await keystaticReader.collections.pages.read(slug);
  } catch (err) {
    console.error(`Error reading page ${slug}:`, err);
  }

  if (!pageData) {
    return notFound();
  }

  const Content = await pageData.content();
  let renderedContent: React.ReactNode = null;
  if (Content?.node) {
    const transformed = Markdoc.transform(Content.node);
    renderedContent = Markdoc.renderers.react(transformed, React);
  } else if (typeof Content === "string") {
    renderedContent = <p className="whitespace-pre-line">{Content}</p>;
  } else if (pageData.description) {
    renderedContent = <p className="text-muted-foreground">{pageData.description}</p>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen py-10 md:py-16">
      <div className="w-[calc(100%-2rem)] md:w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 section-content relative z-10">
        {/* Top Back Breadcrumb */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ChevronLeftIcon className="w-4 h-4" /> BACK TO HOME
            </Button>
          </Link>
        </div>

        <article className="space-y-8">
          <div className="border-b border-border/60 pb-8 space-y-3">
            <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
              SEDS Sri Lanka Legal & Information
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {pageData.title}
            </h1>
            {pageData.description && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {pageData.description}
              </p>
            )}
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
            {renderedContent}
          </div>
        </article>
      </div>
    </div>
  );
}


