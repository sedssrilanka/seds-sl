import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground flex min-h-16 w-full rounded-md bg-transparent px-3 py-2 text-base shadow-none transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent focus-visible:border-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
