import type * as React from "react";

export const Width: React.FC<{
  children: React.ReactNode;
  className?: string;
  width?: number | string;
}> = ({ children, className, width }) => {
  const parsedWidth = typeof width === "string" ? parseFloat(width) : width;
  const desktopWidth = parsedWidth && parsedWidth < 100 ? parsedWidth : 100;

  return (
    <div
      className={["px-2 form-field-width", className].filter(Boolean).join(" ")}
      style={
        {
          "--field-width": `${desktopWidth}%`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
