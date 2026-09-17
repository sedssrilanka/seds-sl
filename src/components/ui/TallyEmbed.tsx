"use client";

import * as React from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";

interface TallyEmbedProps {
  tallyUrl: string;
  title?: string;
  className?: string;
  height?: string | number;
  transparentBackground?: boolean;
  hideTitle?: boolean;
  formEventsForwarding?: boolean;
}

export function TallyEmbed({
  tallyUrl,
  title = "International Observe the Moon Night",
  className,
  height = "937",
  transparentBackground = false,
  hideTitle = true,
  formEventsForwarding = true,
}: TallyEmbedProps) {
  // Ensure the URL uses the official Tally embed format with required query parameters
  const embedUrl = React.useMemo(() => {
    if (!tallyUrl) return "";
    try {
      // Auto-convert standard share links (tally.so/r/...) to embed links (tally.so/embed/...)
      const processedUrl = tallyUrl.replace("tally.so/r/", "tally.so/embed/");
      const url = new URL(processedUrl);

      if (!url.searchParams.has("dynamicHeight")) {
        url.searchParams.set("dynamicHeight", "1");
      }
      if (hideTitle && !url.searchParams.has("hideTitle")) {
        url.searchParams.set("hideTitle", "1");
      }
      if (
        formEventsForwarding &&
        !url.searchParams.has("formEventsForwarding")
      ) {
        url.searchParams.set("formEventsForwarding", "1");
      }
      if (transparentBackground) {
        url.searchParams.set("transparentBackground", "1");
      }

      return url.toString();
    } catch {
      // Fallback formatting if raw URL string is passed
      const raw = tallyUrl.replace("tally.so/r/", "tally.so/embed/");
      const glue = raw.includes("?") ? "&" : "?";
      let params = "dynamicHeight=1";
      if (hideTitle) params += "&hideTitle=1";
      if (formEventsForwarding) params += "&formEventsForwarding=1";
      if (transparentBackground) params += "&transparentBackground=1";
      return `${raw}${glue}${params}`;
    }
  }, [tallyUrl, transparentBackground, hideTitle, formEventsForwarding]);

  React.useEffect(() => {
    const loadEmbeds = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (window as any).Tally !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Tally.loadEmbeds();
      } else {
        document
          .querySelectorAll("iframe[data-tally-src]:not([src])")
          .forEach((elem) => {
            const iframe = elem as HTMLIFrameElement;
            if (iframe.dataset.tallySrc) {
              iframe.src = iframe.dataset.tallySrc;
            }
          });
      }
    };

    loadEmbeds();
  }, [embedUrl]);

  if (!tallyUrl) {
    return (
      <div className="p-8 text-center border border-dashed border-slate-300 rounded-none bg-slate-50 text-slate-500 font-mono text-sm">
        No form URL configured for this event.
      </div>
    );
  }

  return (
    <div
      className={cn("w-full relative overflow-visible rounded-none", className)}
      style={{ minHeight: typeof height === "number" ? `${height}px` : height }}
    >
      <iframe
        data-tally-src={embedUrl}
        src={embedUrl}
        loading="lazy"
        width="100%"
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={title}
        scrolling="no"
        style={{
          overflow: "hidden",
          minHeight: typeof height === "number" ? `${height}px` : height,
        }}
        className="w-full border-0"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof (window as any).Tally !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).Tally.loadEmbeds();
          }
        }}
      />
    </div>
  );
}
