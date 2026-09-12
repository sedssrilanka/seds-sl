"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export function UserNav() {
  return (
    <Link
      href="/keystatic"
      prefetch={false}
      className="h-full px-4 sm:px-6 border-l border-border/60 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors cursor-pointer group"
      title="Admin Portal"
    >
      <Shield className="size-4 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
      <span className="hidden sm:inline">Admin</span>
    </Link>
  );
}
