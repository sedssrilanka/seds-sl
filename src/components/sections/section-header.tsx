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
    <div className="relative w-full min-h-[200px] md:min-h-[250px] lg:min-h-[300px] overflow-hidden">
      {/* Background image with black and white filter */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          filter: "grayscale(100%)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-6 lg:p-8 min-h-[200px] md:min-h-[250px] lg:min-h-[300px] w-full text-foreground">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
          {title}
        </h2>
        <div className="text-sm md:text-base lg:text-lg mt-3 md:mt-4 px-4 max-w-4xl">
          {description}
        </div>
        {children && <div className="mt-4 md:mt-6 px-4">{children}</div>}
      </div>
    </div>
  );
};
