import { notFound } from "next/navigation";
import { getDivisionBySlug, getAllDivisions } from "@/lib/keystatic";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

export async function generateStaticParams() {
  const divisions = await getAllDivisions();
  return divisions.map((div) => ({ slug: div.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) return { title: "Division Not Found | SEDS Sri Lanka" };

  return {
    title: `${division.name} | SEDS Sri Lanka`,
    description: division.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);

  if (!division) {
    notFound();
  }

  const Content = await division.content();

  return (
    <div className="flex flex-col w-full min-h-screen py-12">
      <div className="grid-container section-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/divisions">
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white">
              <ChevronLeftIcon className="w-4 h-4" /> Back to Divisions
            </Button>
          </Link>
        </div>

        <article className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="border-b border-border/60 pb-8 mb-8">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              SEDS Sri Lanka Division
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              {division.name}
            </h1>
            {division.lead && (
              <p className="text-sm text-zinc-400 mt-2 font-mono">
                Lead: <span className="text-indigo-300">{division.lead}</span>
              </p>
            )}
            <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
              {division.description}
            </p>
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-indigo-400 prose-p:text-zinc-300">
            {typeof Content === "string" ? (
              <p className="whitespace-pre-line">{Content}</p>
            ) : (
              <p className="text-zinc-300">{division.description}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
