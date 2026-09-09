import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/keystatic";
import type { Metadata } from "next";

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
  if (!project) return { title: "Project Not Found | SEDS Sri Lanka" };

  return {
    title: `${project.name} | SEDS Sri Lanka`,
    description: project.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const Content = await project.content();

  return (
    <div className="flex flex-col w-full min-h-screen py-12">
      <div className="grid-container section-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="border-b border-border/60 pb-8 mb-8">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              {project.chapter || "SEDS Sri Lanka Initiative"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              {project.name}
            </h1>
            <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-indigo-400 prose-p:text-zinc-300">
            {typeof Content === "string" ? (
              <p className="whitespace-pre-line">{Content}</p>
            ) : (
              <p className="text-zinc-300">{project.description}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
