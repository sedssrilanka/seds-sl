"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/payload-types";

import { createUrl } from "@/utilities/createUrl";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variants = product.variants?.docs;
  const variantTypes = product.variantTypes;
  const hasVariants = Boolean(
    product.enableVariants && variants?.length && variantTypes?.length,
  );

  if (!hasVariants) {
    return null;
  }

  return variantTypes?.map((type) => {
    if (!type || typeof type !== "object") {
      return <React.Fragment key={Math.random()} />;
    }

    const options = type.options?.docs;

    if (!options || !Array.isArray(options) || !options.length) {
      return <React.Fragment key={type.id} />;
    }

    return (
      <div className="flex flex-col gap-3" key={type.id}>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Select {type.label}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {options?.map((option) => {
            if (!option || typeof option !== "object") {
              return <React.Fragment key={Math.random()} />;
            }

            const optionID = option.id;
            const optionKeyLowerCase = type.name;

            const optionSearchParams = new URLSearchParams(
              searchParams.toString(),
            );

            optionSearchParams.delete("variant");
            optionSearchParams.delete("image");
            optionSearchParams.set(optionKeyLowerCase, String(optionID));

            const currentOptions = Array.from(optionSearchParams.values());
            let isAvailableForSale = true;

            if (variants) {
              const matchingVariant = variants
                .filter((variant) => typeof variant === "object")
                .find((variant) => {
                  if (!variant.options || !Array.isArray(variant.options))
                    return false;

                  return variant.options.every((variantOption) => {
                    if (typeof variantOption !== "object")
                      return currentOptions.includes(String(variantOption));

                    return currentOptions.includes(String(variantOption.id));
                  });
                });

              if (matchingVariant) {
                optionSearchParams.set("variant", String(matchingVariant.id));
                isAvailableForSale = Boolean(
                  matchingVariant.inventory && matchingVariant.inventory > 0,
                );
              }
            }

            const optionUrl = createUrl(pathname, optionSearchParams);
            const isActive =
              Boolean(isAvailableForSale) &&
              searchParams.get(optionKeyLowerCase) === String(optionID);

            return (
              <button
                type="button"
                aria-disabled={!isAvailableForSale}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer",
                  {
                    "bg-primary text-primary-foreground border-primary shadow-xs":
                      isActive,
                    "bg-card hover:border-foreground/30 text-foreground border-border/60":
                      !isActive && isAvailableForSale,
                    "opacity-40 line-through cursor-not-allowed bg-muted border-border/40 text-muted-foreground":
                      !isAvailableForSale,
                  },
                )}
                disabled={!isAvailableForSale}
                key={option.id}
                onClick={() => {
                  router.replace(`${optionUrl}`, {
                    scroll: false,
                  });
                }}
                title={`${option.label} ${!isAvailableForSale ? " (Out of Stock)" : ""}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  });
}
