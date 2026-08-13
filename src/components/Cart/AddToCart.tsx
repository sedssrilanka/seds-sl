"use client";

import { Button } from "@/components/ui/button";
import type { Product, Variant } from "@/payload-types";

import { useCart } from "@payloadcms/plugin-ecommerce/client/react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { ShoppingBag, Loader2 } from "lucide-react";

type Props = {
  product: Product;
};

export function AddToCart({ product }: Props) {
  const { addItem, cart, isLoading } = useCart();
  const searchParams = useSearchParams();

  const variants = product.variants?.docs || [];

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get("variant");

      const validVariant = variants.find((variant) => {
        if (typeof variant === "object") {
          return String(variant.id) === variantId;
        }
        return String(variant) === variantId;
      });

      if (validVariant && typeof validVariant === "object") {
        return validVariant;
      }
    }

    return undefined;
  }, [product.enableVariants, searchParams, variants]);

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      addItem({
        product: product.id,
        variant: selectedVariant?.id ?? undefined,
      }).then(() => {
        toast.success("Item added to your cart.");
      });
    },
    [addItem, product, selectedVariant],
  );

  const disabled = useMemo<boolean>(() => {
    const existingItem = cart?.items?.find((item) => {
      const productID =
        typeof item.product === "object" ? item.product?.id : item.product;
      const variantID = item.variant
        ? typeof item.variant === "object"
          ? item.variant?.id
          : item.variant
        : undefined;

      if (productID === product.id) {
        if (product.enableVariants) {
          return variantID === selectedVariant?.id;
        }
        return true;
      }
      return false;
    });

    if (existingItem) {
      const existingQuantity = existingItem.quantity;

      if (product.enableVariants) {
        return existingQuantity >= (selectedVariant?.inventory || 0);
      }
      return existingQuantity >= (product.inventory || 0);
    }

    if (product.enableVariants) {
      if (!selectedVariant) {
        return true;
      }

      if (selectedVariant.inventory === 0) {
        return true;
      }
    } else {
      if (product.inventory === 0) {
        return true;
      }
    }

    return false;
  }, [selectedVariant, cart?.items, product]);

  return (
    <Button
      aria-label="Add to cart"
      className={clsx(
        "w-full py-6 text-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer",
        {
          "bg-primary text-primary-foreground hover:opacity-95": !disabled && !isLoading,
          "opacity-60 cursor-not-allowed": disabled || isLoading,
        },
      )}
      disabled={disabled || isLoading}
      onClick={addToCart}
      type="submit"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Adding to Cart...</span>
        </>
      ) : disabled ? (
        <span>Unavailable</span>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  );
}
