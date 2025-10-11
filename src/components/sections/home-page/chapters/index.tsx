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
    <section className="bg-black relative w-full p-6">
      <Card className="w-full shadow-none bg-black border-border rounded-none">
        <CardContent className="p-6">
        <Marquee fade={true}>
          {chapters.map((chapter) => (
            <div key={chapter.name} className="group mx-4 flex items-center">
              {mounted ? (
                <div className="hover:pause-marquee">
                  <Image
                    src={
                      resolvedTheme === "dark"
                        ? chapter.logo.dark
                        : chapter.logo.light
                    }
                    alt={chapter.name}
                    width={120}
                    height={120}
                    className="mr-4 invert transition-all duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  style={{ width: 120, height: 120 }}
                  className="mr-4 animate-pulse bg-gray-200 dark:bg-gray-700"
                />
              )}
            </div>
          ))}
        </Marquee>
        </CardContent>
      </Card>
    </section>
  );
}
