import type React from "react";

interface SectionHeaderProps {
  title: string;
  description: React.ReactNode;
  image: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  image,
  children,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-8 h-65 w-full bg-center bg-cover bg-no-repeat text-foreground border"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <div className="text-lg mt-4">{description}</div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
