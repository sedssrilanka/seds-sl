import type React from "react";

export const BeforeLogin: React.FC = () => {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#a1a1aa" }}>
        Welcome to the <strong style={{ color: "#ffffff" }}>SEDS Sri Lanka Administration Portal</strong>.
      </p>
      <p style={{ marginTop: "0.4rem", fontSize: "0.825rem", color: "#71717a" }}>
        Authorized administrator access only. To access your customer account or store orders, please visit the{" "}
        <a href="/" style={{ color: "#3b82f6", textDecoration: "underline" }}>
          main website
        </a>.
      </p>
    </div>
  );
};
