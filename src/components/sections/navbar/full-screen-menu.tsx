"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  homeUrl?: string;
}

export default function FullScreenMenu({
  isOpen,
  onClose,
  homeUrl = "/",
}: FullScreenMenuProps) {
  const pathname = usePathname();

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const col1Links = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    { text: "Chapters", href: "/chapters" },
    { text: "Divisions", href: "/divisions" },
    { text: "Projects", href: "/projects" },
  ];

  const col2Links = [
    { text: "Shop", href: "/shop" },
    { text: "Contact Us", href: "/contact-us" },
    { text: "Join Us", href: "/join-us" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.45,
            delay: 0,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] w-screen h-screen max-h-screen overflow-hidden bg-background flex flex-col justify-between pt-16 sm:pt-20 selection:bg-foreground/20 selection:text-foreground border-b border-border/60 shadow-2xl"
        >
          {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

          <div className="w-full relative z-40 flex flex-col h-full max-h-screen justify-between overflow-hidden">
            {/* MAIN NAVIGATION ITEMS (REVEAL SEQUENTIALLY ON OPEN, DISAPPEAR FIRST ON CLOSE) */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col justify-center py-4 sm:py-6 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60 border-y border-border/60 bg-background/60">
                {/* COLUMN 1 */}
                <div className="divide-y divide-border/60">
                  {col1Links.map((link, idx) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname?.startsWith(link.href));

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.35,
                          delay: 0.38 + idx * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "group flex items-center justify-between py-3.5 sm:py-4 md:py-5 px-4 md:px-6 transition-all duration-200 border-x border-y-0 font-mono text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight",
                            isActive
                              ? "text-foreground border-foreground/60 bg-foreground/5"
                              : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/15",
                          )}
                        >
                          <span>{link.text}</span>
                          <ArrowRight className="size-5 sm:size-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-foreground" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* COLUMN 2 */}
                <div className="divide-y divide-border/60">
                  {col2Links.map((link, idx) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname?.startsWith(link.href));

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.35,
                          delay: 0.62 + idx * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "group flex items-center justify-between py-3.5 sm:py-4 md:py-5 px-4 md:px-6 transition-all duration-200 border-x border-y-0 font-mono text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight",
                            isActive
                              ? "text-foreground border-foreground/60 bg-foreground/5"
                              : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/15",
                          )}
                        >
                          <span>{link.text}</span>
                          <ArrowRight className="size-5 sm:size-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-foreground" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BOTTOM STATUS BAR */}
            <div className="w-full py-3 border-t border-border/60 bg-background text-xs font-mono text-muted-foreground shrink-0">
              <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
                <motion.span
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.82,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  SEDS SRI LANKA
                </motion.span>
                <motion.span
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.88,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  AD ASTRA PER ASPERA
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
