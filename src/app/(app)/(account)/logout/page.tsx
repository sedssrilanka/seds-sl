import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import React from "react";

import { LogoutPage } from "./LogoutPage";

export default async function Logout() {
  return (
    <div className="container min-h-[80vh] flex flex-col items-center justify-center py-12 md:py-20">
      <div className="w-full max-w-md bg-card border shadow-lg rounded-3xl p-8 md:p-10 relative overflow-hidden text-center">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl z-0 pointer-events-none" />

        <div className="relative z-10">
          <LogoutPage />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  description: "You have been logged out.",
  openGraph: mergeOpenGraph({
    title: "Logout",
    url: "/logout",
  }),
  title: "Logout",
};
