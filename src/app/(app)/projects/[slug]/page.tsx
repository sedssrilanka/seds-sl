import type { Project } from "@/payload-types";
import { PayloadSDK } from "@payloadcms/sdk";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";

const payload = new PayloadSDK({
  baseURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://127.0.0.1:3000/api",
});

async function getProject(slug: string): Promise<Project | null> {
  try {
    const result = await payload.find({
      collection: "projects",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    return (result.docs[0] as Project) || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    notFound();
  }

  const { hero, layout } = project;

  return (
    <div className="flex flex-col w-full">
      {/* Render the Hero block if one exists */}
      {hero && <RenderHero {...hero} />}

      <div className="grid-container section-content">
        <article className="col-span-4 md:col-span-8 lg:col-span-12 py-12">
          {/* Render the layout blocks if they exist */}
          {layout && <RenderBlocks blocks={layout} />}
        </article>
      </div>
    </div>
  );
}
