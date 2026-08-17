import { Banner } from "@payloadcms/ui";
import type React from "react";
import { SeedButton } from "./SeedButton";

export const BeforeDashboard: React.FC = () => {
  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Banner type="info">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>
            SEDS Sri Lanka Administration Center
          </h3>
          <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.85 }}>
            Manage store orders, bank transfer approvals, product catalog,
            student chapters, projects, and site content.
          </p>
        </div>
      </Banner>

      <div
        style={{
          padding: "1.25rem",
          background: "var(--theme-elevation-50)",
          border: "1px solid var(--theme-elevation-150)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
            Database Seeding Tool
          </h4>
          <p
            style={{
              margin: "0.25rem 0 0 0",
              fontSize: "0.85rem",
              opacity: 0.75,
            }}
          >
            Populate collections with default data (Media, Forms, Pages,
            Divisions, Chapters, Projects).
          </p>
        </div>
        <div>
          <SeedButton />
        </div>
      </div>
    </div>
  );
};
