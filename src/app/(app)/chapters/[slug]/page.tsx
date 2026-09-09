import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChapterBySlug, getAllChapters } from "@/lib/keystatic";
import Image from "next/image";
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
  if (!chapter) return { title: "Chapter Not Found | SEDS Sri Lanka" };

  return {
    title: `${chapter.name} | SEDS Sri Lanka`,
    description: chapter.description,
    openGraph: {
      title: chapter.name,
      description: chapter.description,
      images: chapter.mainImage ? [{ url: chapter.mainImage }] : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const Content = await chapter.content();

  return (
    <div className="flex flex-col w-full min-h-screen py-12">
      <div className="grid-container section-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="border-b border-border/60 pb-8 mb-8">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              {chapter.university || "SEDS Sri Lanka Chapter"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              {chapter.name}
            </h1>
            <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
              {chapter.description}
            </p>

            {chapter.contactEmail && (
              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
                <FaEnvelope className="text-indigo-400" />
                <a
                  href={`mailto:${chapter.contactEmail}`}
                  className="hover:underline text-indigo-300"
                >
                  {chapter.contactEmail}
                </a>
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-indigo-400 prose-p:text-zinc-300">
            {typeof Content === "string" ? (
              <p className="whitespace-pre-line">{Content}</p>
            ) : (
              <p className="text-zinc-300">{chapter.description}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
