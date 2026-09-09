"use client";
import type { Product } from "@/payload-types";
import { Badge } from "@/components/ui/badge";

export function StockIndicator({ product }: { product: Product }) {
  const inStock = product.inStock !== false;

  return (
    <Badge variant={inStock ? "default" : "secondary"}>
      {inStock ? "In Stock" : "Out of Stock"}
    </Badge>
  );
}
