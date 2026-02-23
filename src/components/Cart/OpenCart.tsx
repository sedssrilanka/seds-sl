import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className={clsx(
        "navLink relative flex items-center gap-2 hover:cursor-pointer p-2",
        className,
      )}
      {...rest}
    >
      <ShoppingCart className="size-5" />

      {quantity ? (
        <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {quantity}
        </span>
      ) : null}
    </Button>
  );
}
