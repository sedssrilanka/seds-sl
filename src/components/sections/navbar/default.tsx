"use client";

import { Menu } from "lucide-react";
import { Suspense, type ReactNode } from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
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

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md", className)}>
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-40">
        <NavbarComponent className="py-4">
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold text-foreground"
            >
              <div className="invert dark:invert-0">{logo}</div>
              {name}
            </a>
          </NavbarLeft>
          <NavbarCenter>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarCenter>
          <NavbarRight>
            {actions.map((action) =>
              action.isButton ? (
                <Button
                  key={action.href}
                  variant={action.variant || "default"}
                  asChild
                >
                  <a href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : (
                <a
                  key={action.href}
                  href={action.href}
                  className="hidden text-sm md:block text-foreground hover:text-primary transition-colors font-mono"
                >
                  {action.text}
                </a>
              ),
            )}

            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
            <UserNav />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-3 text-lg font-medium pt-6">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold text-foreground mb-4"
                  >
                    <div className="invert dark:invert-0">{logo}</div>
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname?.startsWith(link.href));

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors border-x border-y-0",
                          isActive
                            ? "text-primary border-primary bg-primary/5"
                            : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/20"
                        )}
                      >
                        <span>{link.text}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </a>

                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}



