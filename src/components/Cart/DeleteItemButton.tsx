"use client";

import type { CartItem } from "@/components/Cart";
import { useCart } from "@payloadcms/plugin-ecommerce/client/react";
import clsx from "clsx";
import { XIcon } from "lucide-react";
import type React from "react";
import posthog from "posthog-js";

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { isLoading, removeItem } = useCart();
  const itemId = item.id;

  return (
    <form>
      <button
        aria-label="Remove cart item"
        className={clsx(
          "flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer",
          {
            "cursor-not-allowed opacity-50": !itemId || isLoading,
          },
        )}
        disabled={!itemId || isLoading}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (itemId) {
            removeItem(itemId as unknown as number);
            posthog.capture("cart_item_removed", {
              cart_item_id: itemId,
              quantity: item.quantity,
            });
          }
        }}
        type="button"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
