import { Menu } from "lucide-react";
import type { ReactNode } from "react";

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
  ],
  actions = [
    {
      text: "Contact Us",
      href: "/contact-us",
      isButton: false,
    },
    {
      text: "Join Us",
      href: "/joisn-us",
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 flex flex-col items-center justify-center w-full backdrop-blur-lg"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <NavbarComponent>
            <NavbarLeft>
              <a
                href={homeUrl}
                className="flex items-center gap-2 text-xl font-bold"
              >
                {logo}
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
                    className="hidden text-sm md:block"
                  >
                    {action.text}
                  </a>
                ),
              )}
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
                  <nav className="grid gap-6 text-lg font-medium">
                    <a
                      href={homeUrl}
                      className="flex items-center gap-2 text-xl font-bold"
                    >
                      <span>{name}</span>
                    </a>
                    {mobileLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.text}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </NavbarRight>
          </NavbarComponent>
        </div>
      </div>
    </header>
  );
}
