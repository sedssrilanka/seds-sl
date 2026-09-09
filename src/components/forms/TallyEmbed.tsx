"use client";

import { useEffect } from "react";

interface TallyEmbedProps {
  formId: string; // e.g. "mZxqW9"
  width?: string;
  height?: number | string;
  title?: string;
  hideTitle?: boolean;
}

export function TallyEmbed({
  formId,
  width = "100%",
  height = 500,
  title = "Form",
  hideTitle = true,
}: TallyEmbedProps) {
  useEffect(() => {
    // Load Tally embed script dynamically if not already loaded
    const scriptSrc = "https://tally.so/widgets/embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6">
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=${hideTitle ? 1 : 0}&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width={width}
        height={height}
        title={title}
        className="w-full max-w-2xl border-0 rounded-xl"
      />
    </div>
  );
}
