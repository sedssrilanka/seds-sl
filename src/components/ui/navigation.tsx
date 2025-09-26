"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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
  ],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.isLink && (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={item.href || ""}>{item.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
