import type { Project } from "@/payload-types";
import { PayloadSDK } from "@payloadcms/sdk";
import { notFound } from "next/navigation";
import { ProjectContent } from "@/components/rich-text/project-content";

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
  return (
    <div className="grid-container section-content py-8">
      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
        <div className="text-muted-foreground mb-8">
          Published on {new Date(project.createdAt).toLocaleDateString()}
        </div>
        <ProjectContent content={project.content} />
      </div>
    </div>
  );
}
