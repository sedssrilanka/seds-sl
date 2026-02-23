import type { Chapter, Media, Project } from "@/payload-types";
import type { Metadata } from "next";
import { PayloadSDK } from "@payloadcms/sdk";
import { notFound } from "next/navigation";
import { ChapterContent } from "@/components/rich-text/chapter-content";
import Image from "next/image";
import {
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaLink,
} from "react-icons/fa";

// Generate metadata for better social media sharing
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const chapter = await getChapter(resolvedParams.slug);
  if (!chapter) return { title: "Chapter Not Found" };

  const getMediaUrl = (media: Media | number | null): string => {
    if (
      typeof media === "object" &&
      media !== null &&
      "url" in media &&
      media.url
    ) {
      return media.url;
    }
    return "";
  };

  return {
    title: chapter.name,
    description: chapter.description,
    openGraph: {
      title: chapter.name,
      description: chapter.description,
      images: chapter.mainImage ? [getMediaUrl(chapter.mainImage)] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.name,
      description: chapter.description,
      images: chapter.mainImage ? [getMediaUrl(chapter.mainImage)] : [],
    },
  };
}

const payload = new PayloadSDK({
  baseURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000/api",
});

async function getChapter(slug: string): Promise<Chapter | null> {
  try {
    const result = await payload.find({
      collection: "chapters",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    return (result.docs[0] as Chapter) || null;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const chapter = await getChapter(slug);

  if (!chapter) {
    notFound();
  }

  const getMediaUrl = (media: Media | number | null): string => {
    if (
      typeof media === "object" &&
      media !== null &&
      "url" in media &&
      media.url
    ) {
      return media.url;
    }
    return "";
  };

  // Function to get social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <FaTwitter className="w-5 h-5" />;
      case "linkedin":
        return <FaLinkedin className="w-5 h-5" />;
      case "facebook":
        return <FaFacebook className="w-5 h-5" />;
      default:
        return <FaLink className="w-5 h-5" />;
    }
  };

  // Fetch projects belonging to this chapter
  let chapterProjects: Project[] = [];
  try {
    const projectsRes = await payload.find({
      collection: "projects",
      where: {
        chapter: {
          equals: chapter.id,
        },
      },
      depth: 1,
      sort: "-createdAt",
      limit: 50,
    });
    chapterProjects = projectsRes.docs as Project[];
  } catch (err) {
    console.error("Error fetching chapter projects", err);
  }

  return (
    <div className="grid-container section-content">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <article>
              {/* Hero Section */}
              {chapter.mainImage && (
                <div className="relative w-full h-[60vh] min-h-[500px]  rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={getMediaUrl(chapter.mainImage)}
                    alt={chapter.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">
                      {chapter.name}
                    </h1>
                    <div className="text-white/80 flex items-center gap-2">
                      <time
                        dateTime={chapter.updatedAt}
                        className="font-medium"
                      >
                        {new Date(chapter.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="prose dark:prose-invert lg:prose-lg p-5">
                <ChapterContent content={chapter.content} />
              </div>

              {/* Image Gallery */}
              {chapter.gallery && chapter.gallery.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {chapter.gallery.map((item, index) => {
                      if (!item.image) return null;
                      return (
                        <div
                          key={index}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                        >
                          <Image
                            src={getMediaUrl(item.image)}
                            alt={item.caption || `Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {item.caption && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <p className="text-lg font-medium">
                                  {item.caption}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Projects in this Chapter */}
              {chapterProjects && chapterProjects.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-6">
                    Projects in this Chapter
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chapterProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="flex gap-4 items-start bg-muted/10 p-4 rounded-lg border border-border/30"
                      >
                        <div className="w-28 h-20 relative rounded-md overflow-hidden bg-slate-100">
                          {proj.image ? (
                            <Image
                              src={getMediaUrl(proj.image)}
                              alt={proj.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            <a
                              href={`/projects/${proj.slug}`}
                              className="hover:underline"
                            >
                              {proj.name}
                            </a>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {proj.description?.substring?.(0, 120) ?? ""}
                            {proj.description && proj.description.length > 120
                              ? "..."
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* About Section */}
              <div className="bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  About This Chapter
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Last updated on{" "}
                    {new Date(chapter.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {/* Contact Info */}
                  {chapter.contactEmail && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <FaEnvelope className="w-5 h-5" />
                      <a
                        href={`mailto:${chapter.contactEmail}`}
                        className="hover:text-primary transition-colors"
                      >
                        {chapter.contactEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {chapter.socialLinks && chapter.socialLinks.length > 0 && (
                <div className="bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Connect With Us
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {chapter.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        {getSocialIcon(link.platform)}
                        <span className="capitalize">{link.platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Share This Chapter
                </h2>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      chapter.name,
                    )}&url=${encodeURIComponent(global.window?.location.href || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      global.window?.location.href || "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      global.window?.location.href || "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
