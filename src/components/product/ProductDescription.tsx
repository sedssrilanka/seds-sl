"use client";
import type { Product, Variant } from "@/payload-types";

import { RichText } from "@/components/RichText";
import { AddToCart } from "@/components/Cart/AddToCart";
import { Price } from "@/components/Price";
import React, { Suspense } from "react";

import { VariantSelector } from "./VariantSelector";
import { StockIndicator } from "@/components/product/StockIndicator";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";

export function ProductDescription({ product }: { product: Product }) {
  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0;
  const priceField = `priceInLKR` as keyof Product;
  const hasVariants =
    product.enableVariants && Boolean(product.variants?.docs?.length);

  if (hasVariants) {
    const priceField = `priceInLKR` as keyof Variant;
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === "object")
      .sort((a, b) => {
        if (
          typeof a === "object" &&
          typeof b === "object" &&
          priceField in a &&
          priceField in b &&
          typeof a[priceField] === "number" &&
          typeof b[priceField] === "number"
        ) {
          return a[priceField] - b[priceField];
        }

        return 0;
      }) as Variant[];

    if (variantsOrderedByPrice?.length) {
      const lowestVariant = variantsOrderedByPrice[0][priceField];
      const highestVariant =
        variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceField];
      if (
        typeof lowestVariant === "number" &&
        typeof highestVariant === "number"
      ) {
        lowestAmount = lowestVariant;
        highestAmount = highestVariant;
      }
    }
  } else if (product[priceField] && typeof product[priceField] === "number") {
    amount = product[priceField];
  }

  const categoryName =
    product.categories &&
    product.categories.length > 0 &&
    typeof product.categories[0] === "object"
      ? product.categories[0]?.title
      : "Official Gear";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            {categoryName}
          </span>
          <Suspense fallback={null}>
            <StockIndicator product={product} />
          </Suspense>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
          {product.title}
        </h1>

        {/* Price Display */}
        <div className="mt-2 flex items-baseline gap-3">
          {hasVariants ? (
            <Price
              highestAmount={highestAmount}
              lowestAmount={lowestAmount}
              className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
            />
          ) : (
            <Price
              amount={amount}
              className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
            />
          )}
        </div>
      </div>

      <div className="h-px w-full bg-border/60" />

      {/* Variant Selector */}
      {hasVariants && (
        <div className="flex flex-col gap-4">
          <Suspense fallback={null}>
            <VariantSelector product={product} />
          </Suspense>
          <div className="h-px w-full bg-border/60" />
        </div>
      )}

      {/* Add To Cart CTA */}
      <div className="flex flex-col gap-3">
        <Suspense fallback={null}>
          <AddToCart product={product} />
        </Suspense>
      </div>

      {/* Trust Badges / Guarantees */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-medium py-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>Official Verified Quality</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-primary shrink-0" />
          <span>Islandwide Fast Shipping</span>
        </div>
      </div>

      {/* Rich Text Description */}
      {product.description && (
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Product Overview
          </h3>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-sm">
            <RichText data={product.description} enableGutter={false} />
          </div>
        </div>
      )}
    </div>
  );
}
