"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

import { User, MapPin, Package, LogOut } from "lucide-react";

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();

  const navItems = [
    { label: "Account settings", href: "/account", icon: User },
    { label: "Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Orders", href: "/orders", icon: Package },
  ];

  return (
    <nav
      className={clsx(
        "flex flex-col p-5 bg-card border rounded-2xl shadow-sm space-y-6",
        className,
      )}
    >
      <div className="px-2">
        <h2 className="text-xl font-bold tracking-tight">My Account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your settings and orders
        </p>
      </div>

      <div className="space-y-1">
        <ul className="flex flex-col gap-1 w-full">
          {navItems.map((item) => {
            const isActive =
              item.href === "/orders"
                ? pathname === "/orders" || pathname.includes("/orders")
                : pathname === item.href;

            return (
              <li key={item.href} className="w-full">
                <Button
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={clsx(
                    "w-full justify-start gap-3 transition-colors duration-200 h-11",
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>

        <div className="pt-4 pb-2">
          <hr className="border-border" />
        </div>

        <Button
          asChild
          variant="ghost"
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors duration-200 h-11"
        >
          <Link href="/logout">
            <LogOut className="w-4 h-4" />
            Log out
          </Link>
        </Button>
      </div>
    </nav>
  );
};
