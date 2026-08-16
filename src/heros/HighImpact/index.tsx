"use client";
import type React from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  return (
    <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
      {/* Background Media with Filter */}
      {media && typeof media === "object" && (
        <div
          className="absolute inset-0 z-0 bg-transparent"
          style={{
            filter: "grayscale(100%) brightness(0.8)",
          }}
        >
          <Media
            fill
            imgClassName="object-cover absolute inset-0"
            priority
            resource={media}
          />
        </div>
      )}

      {/* Adaptive overlay - lighter in light mode, darker in dark mode */}
      <div className="absolute inset-0 z-[1] bg-white/95 dark:bg-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-6 lg:p-8 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full text-foreground">
        <div className="max-w-[48rem] md:text-center flex flex-col items-center">
          {richText && (
            <RichText
              className="mb-6 drop-shadow-sm prose-h1:text-primary prose-h1:font-bold prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h2:text-primary prose-h2:font-bold prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-p:text-sm md:prose-p:text-base lg:prose-p:text-lg prose-p:max-w-4xl"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4 mt-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
