import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { keystaticReader } from "@/lib/keystatic";

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

  return (
    <div className="flex flex-col w-full min-h-screen py-12">
      <div className="grid-container section-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="border-b border-border/60 pb-8 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {pageData.title}
            </h1>
            {pageData.description && (
              <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
                {pageData.description}
              </p>
            )}
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-indigo-400 prose-p:text-zinc-300">
            {typeof Content === "string" ? (
              <p className="whitespace-pre-line">{Content}</p>
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
}
