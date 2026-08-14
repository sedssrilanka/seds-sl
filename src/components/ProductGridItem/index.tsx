import type { Product } from "@/payload-types";
import Link from "next/link";
import type React from "react";
import { Media } from "@/components/Media";
import { Price } from "@/components/Price";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";

type Props = {
  product: Partial<Product>;
};

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInLKR, title, categories, slug } = product;

  let price = priceInLKR;

  const variants = product.variants?.docs;
  if (variants && variants.length > 0) {
    const variant = variants[0];
    if (
      variant &&
      typeof variant === "object" &&
      variant?.priceInLKR &&
      typeof variant.priceInLKR === "number"
    ) {
      price = variant.priceInLKR;
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== "string"
      ? gallery[0]?.image
      : typeof product.meta?.image === "object"
        ? product.meta?.image
        : false;

  const categoryName =
    categories && categories.length > 0 && typeof categories[0] === "object"
      ? categories[0]?.title
      : null;

  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <div className="relative flex flex-col h-full rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-1">
        {/* Image Container - Full Edge-to-Edge Fill */}
        <div className="relative w-full aspect-square bg-muted border-b border-border/40 overflow-hidden flex items-center justify-center">
          {/* Category Badge */}
          {categoryName && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-background/90 text-foreground border border-border/60 backdrop-blur-md">
                {categoryName}
              </span>
            </div>
          )}

          {/* Product Image - Full Cover */}
          {image ? (
            <Media
              className="w-full h-full relative"
              imgClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              resource={image}
              fill
            />
          ) : (
            <div className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
              No Preview
            </div>
          )}

          {/* Hover Action Overlay */}
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="w-full py-2 px-3 rounded-lg bg-background/95 text-foreground border border-border/80 backdrop-blur-md shadow-sm flex items-center justify-between text-xs font-medium">
              <span>View Product</span>
              <ArrowUpRight className="w-4 h-4 text-foreground" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-4 md:p-5">
          {/* Title */}
          <h3 className="text-base font-bold text-foreground tracking-tight line-clamp-2 transition-colors group-hover:text-primary mb-3">
            {title}
          </h3>

          {/* Footer / Price */}
          <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">
                Price
              </span>
              {typeof price === "number" ? (
                <Price
                  amount={price}
                  className="text-base font-bold text-foreground"
                />
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">
                  Contact for Price
                </span>
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 group-hover:border-foreground/40 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
