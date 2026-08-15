"use client";

import type { CartItem } from "@/components/Cart";
import { useCart } from "@payloadcms/plugin-ecommerce/client/react";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import posthog from "posthog-js";

export function EditItemQuantityButton({
  type,
  item,
}: {
  item: CartItem;
  type: "minus" | "plus";
}) {
  const { decrementItem, incrementItem, isLoading } = useCart();

  const disabled = useMemo(() => {
    if (!item.id) return true;

    const target =
      item.variant && typeof item.variant === "object"
        ? item.variant
        : item.product && typeof item.product === "object"
          ? item.product
          : null;

    if (
      target &&
      typeof target === "object" &&
      target.inventory !== undefined &&
      target.inventory !== null
    ) {
      if (
        type === "plus" &&
        item.quantity !== undefined &&
        item.quantity !== null
      ) {
        return item.quantity >= target.inventory;
      }
    }

    return false;
  }, [item, type]);

  return (
    <form>
      <button
        disabled={disabled || isLoading}
        aria-label={
          type === "plus" ? "Increase item quantity" : "Reduce item quantity"
        }
        className={clsx(
          "flex h-full w-7 items-center justify-center transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-md cursor-pointer",
          {
            "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-muted-foreground": disabled || isLoading,
          },
        )}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault();

          if (item.id) {
            if (type === "plus") {
              incrementItem(item.id as unknown as number);
            } else {
              decrementItem(item.id as unknown as number);
            }
            posthog.capture("cart_item_quantity_changed", {
              cart_item_id: item.id,
              change: type,
              quantity: item.quantity,
            });
          }
        }}
        type="button"
      >
        {type === "plus" ? (
          <PlusIcon className="h-3.5 w-3.5" />
        ) : (
          <MinusIcon className="h-3.5 w-3.5" />
        )}
      </button>
    </form>
  );
}
