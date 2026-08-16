"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/Auth";
import { Button } from "@/components/ui/button";
import { User, Package, MapPin, Shield, LogOut, LogIn } from "lucide-react";

export function UserNav() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAdmin =
    user?.roles && Array.isArray(user.roles) && user.roles.includes("admin");

  if (!user) {
    return (
      <Button
        asChild
        variant="outline"
        size="sm"
        className="gap-2 rounded-full border-border/80 text-foreground hover:bg-muted/80 text-xs px-3.5 h-9"
      >
        <Link href="/login">
          <User className="size-3.5 text-muted-foreground" />
          <span className="font-medium">Sign In</span>
        </Link>
      </Button>
    );
  }

  // Get user initial or fallback
  const userInitial = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.email
      ? user.email.charAt(0).toUpperCase()
      : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative size-9 rounded-full border border-border/80 bg-card hover:bg-muted focus-visible:ring-1 focus-visible:ring-primary/30"
        title="User Account Menu"
      >
        <span className="flex size-full items-center justify-center font-bold text-xs text-foreground uppercase">
          {userInitial}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg p-1.5 text-foreground z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="text-xs font-semibold truncate text-foreground">
              {user.name || "My Account"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          <div className="space-y-0.5">
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <User className="size-3.5 text-muted-foreground" />
              <span>Account Profile</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <Package className="size-3.5 text-muted-foreground" />
              <span>My Orders</span>
            </Link>

            <Link
              href="/account/addresses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <MapPin className="size-3.5 text-muted-foreground" />
              <span>Saved Addresses</span>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-primary hover:bg-primary/10 transition-colors"
              >
                <Shield className="size-3.5 text-primary" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          <div className="border-t border-border my-1" />

          <Link
            href="/logout"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="size-3.5" />
            <span>Log Out</span>
          </Link>
        </div>
      )}
    </div>
  );
}
