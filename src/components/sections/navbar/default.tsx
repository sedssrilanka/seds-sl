import { Menu } from "lucide-react";
import { Suspense, type ReactNode } from "react";

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
import { ThemeSwitcher } from "../../ui/theme-switcher";
import { Cart } from "@/components/Cart";
import { OpenCartButton } from "@/components/Cart/OpenCart";

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
      <div className="fade-bottom bg-background/80 dark:bg-background/15 absolute left-0 h-24 flex flex-col items-center justify-center w-full backdrop-blur-lg border-b border-border/20 dark:border-border/10"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <NavbarComponent>
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
              <div className="hidden md:block">
                <ThemeSwitcher defaultValue="system" />
              </div>
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
                    className="hidden text-sm md:block text-foreground hover:text-primary transition-colors"
                  >
                    {action.text}
                  </a>
                ),
              )}

              <Suspense fallback={<OpenCartButton />}>
                <Cart />
              </Suspense>
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
                      className="flex items-center gap-2 text-xl font-bold text-foreground"
                    >
                      <div className="invert dark:invert-0">{logo}</div>
                      <span>{name}</span>
                    </a>
                    {mobileLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.text}
                      </a>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Theme
                        </span>
                        <ThemeSwitcher defaultValue="system" />
                      </div>
                    </div>
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
