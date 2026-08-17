import { ShoppingCart, ChevronLeft } from "lucide-react";
import clsx from "clsx";

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <button
      type="button"
      className={clsx(
        "fixed right-0 top-1/2 -translate-y-1/2 z-[90]",
        "flex items-center justify-center gap-1.5",
        "py-3.5 px-3 bg-background/90 backdrop-blur-md text-foreground",
        "border-l border-y border-border/80 rounded-l-xl shadow-2xl",
        "hover:-translate-x-1.5 transition-all duration-300 cursor-pointer group select-none",
        className,
      )}
      aria-label="Open Shopping Cart"
      {...rest}
    >
      {/* Pull Notch Chevron */}
      <ChevronLeft className="size-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all" />

      {/* Cart Icon & Quantity Badge */}
      <div className="relative flex items-center justify-center">
        <ShoppingCart className="size-5 text-foreground group-hover:text-primary transition-colors" />
        {quantity ? (
          <span className="absolute -right-2.5 -top-2.5 flex min-w-4 h-4 px-1 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-xs font-mono">
            {quantity}
          </span>
        ) : null}
      </div>
    </button>
  );
}
