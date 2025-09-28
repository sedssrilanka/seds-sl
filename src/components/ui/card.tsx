import { ArrowUpRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "glass-1 hover:glass-2 group text-card-foreground relative flex flex-col gap-6 overflow-hidden rounded-xl p-6 shadow-xl transition-all",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-2xl leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-md text-muted-foreground flex flex-col gap-2 text-balance",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function CardVisual({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-visual"
      className={cn("flex grow items-end justify-center", className)}
      {...props}
    />
  );
}

function CardLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="card-link"
      className={cn(
        "bg-accent/50 absolute top-4 right-4 block rounded-full p-4 opacity-0 transition-opacity group-hover:opacity-100",
        className,
      )}
      {...props}
    >
      <ArrowUpRight className="size-4" />
    </a>
  );
}

export { Card, CardContent, CardDescription, CardLink, CardTitle, CardVisual };
