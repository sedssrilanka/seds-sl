import type React from "react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  description: React.ReactNode;
  image: string;
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?:
      | "default"
      | "secondary"
      | "outline"
      | "ghost"
      | "link"
      | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
  };
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  image,
  button,
  children,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-8 h-65 w-full bg-center bg-cover bg-no-repeat text-foreground border"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <div className="text-lg mt-4">{description}</div>
      {button && (
        <div className="mt-6">
          {button.href ? (
            <Button
              asChild
              variant={button.variant || "default"}
              size={button.size || "lg"}
              className="px-8 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href={button.href}>{button.text}</a>
            </Button>
          ) : (
            <Button
              variant={button.variant || "default"}
              size={button.size || "lg"}
              onClick={button.onClick}
              className="px-8 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {button.text}
            </Button>
          )}
        </div>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
