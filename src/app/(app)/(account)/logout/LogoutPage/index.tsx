"use client";

import { useAuth } from "@/providers/Auth";
import Link from "next/link";
import type React from "react";
import { Fragment, useEffect, useState } from "react";

export const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        setSuccess("Logged out successfully.");
      } catch (_) {
        setError("You are already logged out.");
      }
    };

    void performLogout();
  }, [logout]);

  return (
    <Fragment>
      {(error || success) && (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-3">
            {success ? "You're signed out" : "Already signed out"}
          </h1>

          <p className="text-muted-foreground mb-8">
            Thank you for visiting. What would you like to do next?
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 w-full rounded-xl"
            >
              Sign back in
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 w-full rounded-xl"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};
