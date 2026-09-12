import React from "react";
import Image from "next/image";

export default function AppLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full px-4 py-16">
      <div className="relative max-w-sm w-full">
        {/* Bleeding Edge Guide Lines */}
        <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
        <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
        <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
        <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

        <div className="border border-border/60 bg-card/60 p-8 sm:p-10 relative z-0 flex flex-col items-center text-center space-y-6">
          {/* SEDS SL Icon with Breathing Pulse Animation */}
          <div className="relative size-16 flex items-center justify-center animate-pulse">
            <Image
              src="/sedsl-l-icon.png"
              alt="SEDS Sri Lanka"
              width={64}
              height={64}
              priority
              className="size-16 object-contain"
            />
          </div>

          {/* Simple, Humanized Status Text */}
          <div className="space-y-1.5">
            <h3 className="text-base font-mono font-bold text-foreground">
              Loading...
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              Please wait a moment while the page loads.
            </p>
          </div>

          {/* Clean Progress Bar */}
          <div className="w-full bg-muted/40 border border-border/60 h-1 overflow-hidden relative">
            <div className="h-full bg-primary animate-indeterminate" />
          </div>
        </div>
      </div>
    </div>
  );
}
