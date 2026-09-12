"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Chapter } from "@/types";
import { fetchChapters } from "@/actions/chapters";

export default function Component({
  initialChapters = [],
}: {
  initialChapters?: Chapter[];
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);

  useEffect(() => {
    setMounted(true);
    if (initialChapters.length > 0) return;
    const loadChapters = async () => {
      try {
        const fetchedChapters = await fetchChapters();
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Failed to load chapters:", error);
      }
    };
    loadChapters();
  }, [initialChapters]);

  const getMediaUrl = (media: any): string => {
    if (typeof media === "object" && media !== null && "url" in media) {
      if (media.url) return media.url;
    }
    if (typeof media === "string") return media;
    return "";
  };

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section className="light-mode-section relative w-full pt-8 md:pt-12 lg:pt-16">
      <div className="section-background bg-background dark:bg-black"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <Card className="w-full shadow-sm dark:shadow-none light-mode-card rounded-none">
            <CardContent className="p-4 sm:p-6">
              <Marquee fade={true} pauseOnHover={true}>
                {chapters.map((chapter) => {
                  const logoSrc =
                    resolvedTheme === "dark" && chapter.logoLight
                      ? getMediaUrl(chapter.logoLight)
                      : getMediaUrl(chapter.logoDark) ||
                        getMediaUrl(chapter.logoLight);

                  const identifier = chapter.slug || chapter.name;
                  const hasImageError = Boolean(imageErrors[identifier]);
                  const hasValidLogo = Boolean(logoSrc && !hasImageError);

                  return (
                    <div
                      key={chapter.slug || chapter.name}
                      className="mx-3 sm:mx-4 flex items-center"
                    >
                      {mounted ? (
                        <div>
                          <Link
                            href={`/chapters/${chapter.slug}`}
                            prefetch={false}
                            className="group/item block"
                          >
                            {hasValidLogo ? (
                              <Image
                                src={logoSrc}
                                alt={chapter.name}
                                width={120}
                                height={60}
                                onError={() =>
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [identifier]: true,
                                  }))
                                }
                                className="mr-4 transition-all duration-300 group-hover/item:scale-105 object-contain max-h-12 w-auto"
                              />
                            ) : (
                              <div className="flex items-center px-4 py-2 border border-border/80 bg-background/90 dark:bg-card/90 group-hover/item:bg-primary/10 group-hover/item:border-primary/60 transition-all cursor-pointer group-hover/item:scale-105">
                                <span className="text-xs sm:text-sm font-mono font-bold text-foreground group-hover/item:text-primary tracking-tight whitespace-nowrap transition-colors">
                                  {chapter.name}
                                </span>
                              </div>
                            )}
                          </Link>
                        </div>
                      ) : (
                        <div className="h-10 w-32 animate-pulse bg-muted/30 dark:bg-muted/20 border border-border/40" />
                      )}
                    </div>
                  );
                })}
              </Marquee>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
