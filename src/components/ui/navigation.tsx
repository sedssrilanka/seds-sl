"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: ReactNode;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export default function Navigation({
  menuItems = [
    {
      title: "Home",
      href: "/",
      isLink: true,
    },
    {
      title: "About",
      href: "/about",
      isLink: true,
    },
    {
      title: "Chapters",
      isLink: true,
      href: "/chapters",
    },
    {
      title: "Divisions",
      isLink: true,
      href: "/divisions",
    },
    {
      title: "Projects",
      isLink: true,
      href: "/projects",
    },

    {
      title: "Shop",
      isLink: true,
      href: "/shop",
    },
  ],
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1.5">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && item.href && pathname?.startsWith(item.href));

          return (
            <NavigationMenuItem key={item.href}>
              {item.isLink && (
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href || ""}
                    className={cn(
                      "relative inline-flex items-center justify-center px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border-x border-y-0",
                      isActive
                        ? "text-foreground border-foreground/60 bg-foreground/5"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/20",
                    )}
                  >
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
