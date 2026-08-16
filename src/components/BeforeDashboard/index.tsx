import { Banner } from "@payloadcms/ui";
import type React from "react";

export const BeforeDashboard: React.FC = () => {
  return (
    <div style={{ marginBottom: "2rem" }}>
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
    </div>
  );
};
