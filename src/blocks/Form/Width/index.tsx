import type * as React from "react";

export const Width: React.FC<{
  children: React.ReactNode;
  className?: string;
  width?: number | string;
}> = ({ children, className, width }) => {
  const parsedWidth = typeof width === "string" ? parseFloat(width) : width;

  return (
    <div
      className={["px-2 w-full", className].filter(Boolean).join(" ")}
      style={{
        maxWidth: parsedWidth && parsedWidth < 100 ? `${parsedWidth}%` : "100%",
        flex: `0 0 ${parsedWidth && parsedWidth < 100 ? parsedWidth : 100}%`,
      }}
    >
      {children}
    </div>
  );
};
