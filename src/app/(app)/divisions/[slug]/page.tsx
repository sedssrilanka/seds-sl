import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { RenderHero } from "@/heros/RenderHero";
import { RichText } from "@/components/RichText";

export const dynamic = "force-dynamic";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export default async function DivisionDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs: divisions } = await payload.find({
    collection: "divisions",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  });

  if (!divisions || divisions.length === 0) {
    return notFound();
  }

  const division = divisions[0];

  return (
    <div className="grid-container section-content">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 pt-24 pb-24">
        {/* Dynamic Hero Section */}
        {division.hero && <RenderHero {...division.hero} />}

        {/* Main Content */}
        <div className="container mt-12 md:max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            {division.content && <RichText data={division.content} />}
          </div>
        </div>
      </div>
    </div>
  );
}
