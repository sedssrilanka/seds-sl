import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  direction?: "left" | "up";
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  innerClassName?: string;
  numberOfCopies?: number;
};

export function Marquee({
  children,
  direction = "left",
  pauseOnHover = false,
  reverse = false,
  fade = false,
  className,
  innerClassName,
  numberOfCopies = 2,
  ...rest
}: MarqueeProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  return (
    <div
      {...rest}
      className={cn(
        "relative group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": direction === "left",
          "flex-col": direction === "up",
        },
        className,
      )}
    >
      {Array(numberOfCopies)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)] cursor-pointer",
              {
                "animate-marquee": direction === "left",
                "animate-marquee-vertical": direction === "up",
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              },
              innerClassName,
            )}
          >
            {children}
          </div>
        ))}
      {fade && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r ${
              isLight
                ? "from-white/95 to-transparent"
                : "from-black/95 to-transparent"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l ${
              isLight
                ? "from-white/95 to-transparent"
                : "from-black/95 to-transparent"
            }`}
          />
        </>
      )}
    </div>
  );
}
