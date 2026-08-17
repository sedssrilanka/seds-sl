"use client";

import { Menu, X } from "lucide-react";

import { useState, Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import SEDSSL from "../../logos/seds-sl";
import { Button, type ButtonProps } from "../../ui/button";
import {
  NavbarCenter,
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import FullScreenMenu from "./full-screen-menu";
import { Cart } from "@/components/Cart";
import { OpenCartButton } from "@/components/Cart/OpenCart";
import { UserNav } from "@/components/UserNav";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <SEDSSL />,
  name = "",
  homeUrl = "/",
  mobileLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Chapters", href: "/chapters" },
    { text: "Divisions", href: "/divisions" },
    { text: "Projects", href: "/projects" },
    { text: "Docs", href: "/docs/introduction" },
    { text: "Shop", href: "/shop" },
    { text: "Contact Us", href: "/contact-us" },
  ],

  actions = [
    {
      text: "Contact Us",
      href: "/contact-us",
      isButton: false,
    },
    {
      text: "Join Us",
      href: "/join-us",
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[110] w-full border-b border-border/60 bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-[140]" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-[140] opacity-80" />

      {/* NAVBAR CONTAINER ALIGNED FLUSH WITH MARGIN LINES */}
      <div className="w-[calc(100%-2rem)] md:w-full max-w-7xl mx-auto relative z-[150]">
        <NavbarComponent className="py-0 h-16 sm:h-20 flex items-stretch justify-between">
          <NavbarLeft className="my-auto pl-4 md:pl-8">
            <a
              href={homeUrl}
              className="flex items-center text-foreground font-mono"
              aria-label="SEDS SL Home"
            >
              <div className="h-6 sm:h-7 md:h-8 w-auto relative shrink-0 flex items-center justify-center invert dark:invert-0">
                {logo}
              </div>
            </a>
          </NavbarLeft>

          <NavbarRight className="h-full items-stretch flex items-stretch gap-0">
            {/* Profile / Sign In Boxed Button (Hidden on Mobile) */}
            <div className="hidden sm:flex h-full items-stretch">
              <UserNav />
            </div>

            {/* Large Full-Height Boxed Menu/Close Button sitting flush on vertical margin line */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-full w-28 sm:w-36 border-x border-border/60 flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors cursor-pointer group"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              <span className="w-12 text-center inline-block">
                {isMenuOpen ? "CLOSE" : "MENU"}
              </span>
              {isMenuOpen ? (
                <X className="size-5 group-hover:rotate-90 transition-transform duration-300 shrink-0" />
              ) : (
                <Menu className="size-5 group-hover:scale-110 transition-transform shrink-0" />
              )}
            </button>
          </NavbarRight>
        </NavbarComponent>
      </div>

      {/* FULL SCREEN ARCHITECTURAL OVERLAY MENU */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        homeUrl={homeUrl}
      />
    </header>
  );
}
