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
      <Link
        href="/login"
        className="h-full px-5 sm:px-8 border-l border-border/60 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors cursor-pointer group"
      >
        <span>Sign In</span>
        <User className="size-4 group-hover:scale-110 transition-transform shrink-0" />
      </Link>
    );
  }

  // Get user initial or fallback
  const userInitial = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.email
      ? user.email.charAt(0).toUpperCase()
      : "U";

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-full px-5 sm:px-8 border-l border-border/60 flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors cursor-pointer group"
        title="User Account Menu"
      >
        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center font-mono border border-primary/40">
          {userInitial}
        </span>
        <span className="hidden md:inline font-mono text-xs">
          {user.name || "Account"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 border border-border/60 bg-background/95 backdrop-blur-md shadow-lg p-1.5 text-foreground z-50 font-mono">
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
