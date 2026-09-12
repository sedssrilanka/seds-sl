import type React from "react";

export const RenderHero: React.FC<any> = ({ title, description }) => {
  if (!title && !description) return null;

  return (
    <div className="w-full py-12 border-b border-border/40">
      {title && <h1 className="text-4xl font-bold text-white">{title}</h1>}
      {description && <p className="text-zinc-400 mt-2">{description}</p>}
    </div>
  );
};
