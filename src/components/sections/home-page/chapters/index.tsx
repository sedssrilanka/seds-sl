"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const chapters = [
  {
    name: "SEDS OUSL",
    logo: {
      light: "/chapters/ousl-white.png",
      dark: "/chapters/ousl-black.png",
    },
  },
  {
    name: "SEDS Wayamba",
    logo: {
      light: "/chapters/wayamba-white.png",
      dark: "/chapters/wayamba-black.png",
    },
  },
];

export default function Component() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="light-mode-section relative w-full pt-8 md:pt-12 lg:pt-16">
      <div className="section-background bg-background dark:bg-black"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <Card className="w-full shadow-sm dark:shadow-none light-mode-card rounded-none">
            <CardContent className="p-6">
              <Marquee fade={true}>
                {chapters.map((chapter) => (
                  <div
                    key={chapter.name}
                    className="group mx-4 flex items-center"
                  >
                    {mounted ? (
                      <div className="hover:pause-marquee">
                        <Image
                          src={
                            resolvedTheme === "dark"
                              ? chapter.logo.light
                              : chapter.logo.dark
                          }
                          alt={chapter.name}
                          width={120}
                          height={120}
                          className="mr-4 transition-all duration-300 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        style={{ width: 120, height: 120 }}
                        className="mr-4 animate-pulse bg-muted/30 dark:bg-muted/20"
                      />
                    )}
                  </div>
                ))}
              </Marquee>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
