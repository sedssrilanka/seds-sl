import type { Product } from "@/payload-types";
import Link from "next/link";
import type React from "react";
import { Media } from "@/components/Media";
import { Price } from "@/components/Price";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  product: Partial<Product>;
};

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInLKR, title } = product;

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
      : false;

  return (
    <Card className="rounded-none p-4 md:p-6 border shadow-sm dark:shadow-none group overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="w-full aspect-video bg-muted border border-border/50 mb-4 relative overflow-hidden flex items-center justify-center">
        {image ? (
          <Media
            className="absolute inset-0 w-full h-full"
            imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            resource={image}
            fill
          />
        ) : (
          <div className="text-muted-foreground text-sm font-medium">
            No Image
          </div>
        )}
      </div>

      {/* Title */}
      <CardTitle className="text-xl font-bold mb-3 text-foreground transition-colors group-hover:text-primary line-clamp-2">
        {title}
      </CardTitle>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
        {typeof price === "number" && (
          <Price
            amount={price}
            className="text-sm font-semibold text-muted-foreground"
          />
        )}

        <Link href={`/products/${product.slug}`} className="ml-auto">
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm group-hover:border-primary/50 transition-colors"
          >
            View Product
          </Button>
        </Link>
      </div>
    </Card>
  );
};
