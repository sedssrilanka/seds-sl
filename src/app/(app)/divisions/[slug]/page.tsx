import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { RenderHero } from "@/heros/RenderHero";
import { RichText } from "@/components/RichText";
import type { Division, Media } from "@/payload-types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeftIcon,
  Bot,
  Rocket,
  Laptop,
  Plane,
  Microscope,
  Telescope,
  Briefcase,
  Camera,
  Users,
  Link2,
  type LucideIcon,
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import type { Metadata } from "next";
import { getServerSideURL } from "@/utilities/getURL";

export const dynamic = "force-dynamic";

const IconMap: Record<string, LucideIcon> = {
  Bot,
  Rocket,
  Laptop,
  Plane,
  Microscope,
  Telescope,
  Briefcase,
  Camera,
  Users,
};

interface PageParams {
  params: Promise<{ slug: string }>;
}

async function queryDivision(slug: string): Promise<Division | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "divisions",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    return docs[0] ?? null;
  } catch (error) {
    console.error("Error fetching division:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const division = await queryDivision(slug);

  if (!division) return { title: "Division Not Found | SEDS Sri Lanka" };

  const siteURL = getServerSideURL();
  const metaImage =
    typeof division.meta?.image === "object" && division.meta?.image !== null
      ? (division.meta.image as Media)
      : null;

  return {
    title: division.meta?.title || `${division.name} | SEDS Sri Lanka`,
    description:
      division.meta?.description || division.description || undefined,
    openGraph: {
      title: division.meta?.title || division.name,
      description:
        division.meta?.description || division.description || undefined,
      url: `${siteURL}/divisions/${slug}`,
      ...(metaImage?.url
        ? {
            images: [
              {
                url: metaImage.url,
                width: metaImage.width ?? undefined,
                height: metaImage.height ?? undefined,
                alt: metaImage.alt,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function DivisionDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const division = await queryDivision(slug);

  if (!division) return notFound();

  const IconComponent =
    IconMap[division.icon as keyof typeof IconMap] || Rocket;

  // Pull hero image for the banner if available
  const heroImage =
    division.hero?.media && typeof division.hero.media === "object"
      ? (division.hero.media as Media)
      : null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero */}
      {division.hero ? (
        <RenderHero {...division.hero} />
      ) : (
        /* Fallback banner when no hero is configured */
        <div className="relative w-full h-[45vh] min-h-[320px] overflow-hidden bg-linear-to-br from-background via-muted/40 to-background border-b border-border/50">
          {heroImage?.url && (
            <>
              <Image
                src={heroImage.url}
                alt={division.name}
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
            </>
          )}
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-6 pb-10">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-primary/15 border border-primary/30 backdrop-blur-sm">
                  <IconComponent className="size-10 text-primary" />
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className="mb-2 text-xs font-mono tracking-widest uppercase border-primary/30 text-primary"
                  >
                    Division
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {division.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 py-10">
          {/* Back nav */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-8 -ml-2 hover:bg-muted/50 rounded-full text-muted-foreground hover:text-foreground"
          >
            <Link href="/divisions" className="flex items-center gap-1.5">
              <ChevronLeftIcon className="w-4 h-4" />
              All Divisions
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ── Content column ── */}
            <main className="lg:col-span-8 order-2 lg:order-1">
              {/* Short description */}
              {division.description && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-5 font-light">
                  {division.description}
                </p>
              )}

              {/* Rich text body */}
              {division.content && (
                <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-blockquote:border-primary">
                  <RichText data={division.content} />
                </div>
              )}
            </main>

            {/* ── Sticky sidebar ── */}
            <aside className="lg:col-span-4 order-1 lg:order-2">
              <div className="sticky top-8 space-y-6">
                {/* Icon card */}
                <div className="flex items-center gap-4 bg-muted/30 backdrop-blur-sm border border-border/50 p-5">
                  <div className="p-3 bg-primary/10 border border-primary/20 shrink-0">
                    <IconComponent className="size-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      Division
                    </p>
                    <p className="text-lg font-bold">{division.name}</p>
                  </div>
                </div>

                {/* Share links */}
                {(() => {
                  const pageURL = `${getServerSideURL()}/divisions/${division.slug}`;
                  const encodedURL = encodeURIComponent(pageURL);
                  const encodedTitle = encodeURIComponent(division.name);
                  return (
                    <div className="bg-muted/30 backdrop-blur-sm border border-border/50 p-5 space-y-3">
                      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        Share
                      </h2>
                      <div className="flex flex-col gap-2">
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium"
                        >
                          <FaTwitter className="size-4 text-[#1DA1F2]" />
                          Share on Twitter
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium"
                        >
                          <FaLinkedin className="size-4 text-[#0A66C2]" />
                          Share on LinkedIn
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium"
                        >
                          <FaFacebook className="size-4 text-[#1877F2]" />
                          Share on Facebook
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodedTitle}%20${encodedURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium"
                        >
                          <FaWhatsapp className="size-4 text-[#25D366]" />
                          Share on WhatsApp
                        </a>
                        <div className="flex items-center gap-2 px-4 py-2.5 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium">
                          <Link2 className="size-4 text-muted-foreground shrink-0" />
                          <span className="truncate text-muted-foreground text-xs">
                            {pageURL}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Browse all */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-sm gap-2"
                >
                  <Link href="/divisions">
                    <ChevronLeftIcon className="size-4" />
                    Browse All Divisions
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
