import React from "react";
import { cn } from "@/utilities/cn";

type Props = {
  data?: any;
  content?: any;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText: React.FC<Props> = ({
  className,
  data,
  content,
  children,
  ...rest
}) => {
  const textContent =
    typeof data === "string"
      ? data
      : typeof content === "string"
        ? content
        : "";

  return (
    <div className={cn("prose prose-invert max-w-none", className)} {...rest}>
      {textContent ? (
        <p className="whitespace-pre-line">{textContent}</p>
      ) : (
        children
      )}
    </div>
  );
};
