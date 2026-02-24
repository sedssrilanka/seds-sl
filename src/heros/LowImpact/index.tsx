import type React from "react";

import type { Page } from "@/payload-types";

import { RichText } from "@/components/RichText";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      richText?: never;
    }
  | (Omit<Page["hero"], "richText"> & {
      children?: never;
      richText?: Page["hero"]["richText"];
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-6 lg:p-8 min-h-[200px] md:min-h-[250px] lg:min-h-[300px] w-full text-foreground">
        <div className="max-w-[48rem] md:text-center flex flex-col items-center">
          {children ||
            (richText && (
              <RichText
                className="drop-shadow-sm prose-h1:text-primary prose-h1:font-bold prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h2:text-primary prose-h2:font-bold prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-p:text-sm md:prose-p:text-base lg:prose-p:text-lg prose-p:max-w-4xl"
                data={richText}
                enableGutter={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
