"use client";
import type { Product, Variant } from "@/payload-types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
  product: Product;
};

export const StockIndicator: React.FC<Props> = ({ product }) => {
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

  const stockQuantity = useMemo(() => {
    if (product.enableVariants) {
      if (selectedVariant) {
        return selectedVariant.inventory || 0;
      }
    }
    return product.inventory || 0;
  }, [product.enableVariants, selectedVariant, product.inventory]);

  if (product.enableVariants && !selectedVariant) {
    return null;
  }

  const isLowStock = stockQuantity > 0 && stockQuantity < 10;
  const isOutOfStock = stockQuantity <= 0;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border bg-background/80 backdrop-blur-md">
      {isOutOfStock ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-red-600 dark:text-red-400">Out of Stock</span>
        </>
      ) : isLowStock ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-amber-600 dark:text-amber-400">
            Only {stockQuantity} left
          </span>
        </>
      ) : (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            In Stock & Ready
          </span>
        </>
      )}
    </div>
  );
};
