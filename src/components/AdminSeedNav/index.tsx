"use client";

import type React from "react";
import { SeedButton } from "@/components/BeforeDashboard/SeedButton";

export const AdminSeedNav: React.FC = () => {
  return (
    <div
      style={{
        margin: "0.75rem 0",
        padding: "0.75rem",
        borderRadius: "6px",
        background: "var(--theme-elevation-50)",
        border: "1px solid var(--theme-elevation-150)",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.5rem",
          opacity: 0.7,
        }}
      >
        Database Utility
      </div>
      <SeedButton />
    </div>
  );
};
