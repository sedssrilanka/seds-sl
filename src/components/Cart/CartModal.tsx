"use client";

import { Price } from "@/components/Price";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@payloadcms/plugin-ecommerce/client/react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { DeleteItemButton } from "./DeleteItemButton";
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import { OpenCartButton } from "./OpenCart";
import { Button } from "@/components/ui/button";
import type { Product } from "@/payload-types";

export function CartModal() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies(pathname): suppress pathname
  useEffect(() => {
    // Close the cart modal when the pathname changes.
    setIsOpen(false);
  }, [pathname]);

  const totalQuantity = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return undefined;
    return cart.items.reduce(
      (quantity, item) => (item.quantity || 0) + quantity,
      0,
    );
  }, [cart]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-6 flex flex-col h-full bg-background text-foreground"
      >
        <SheetHeader className="pb-4 border-b border-border text-left shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="size-5 text-muted-foreground" />
              <span>My Cart</span>
            </SheetTitle>
            {totalQuantity !== undefined && (
              <span className="text-xs font-semibold bg-muted text-foreground px-2.5 py-1 rounded-full">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <SheetDescription className="text-xs text-muted-foreground mt-1">
            Review items in your cart before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4">
            <div className="p-4 rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground">
                Add products to your cart to start shopping.
              </p>
            </div>
            <Button asChild className="mt-2" onClick={() => setIsOpen(false)}>
              <Link href="/search">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between overflow-hidden pt-4 gap-4">
            {/* Scrollable item list */}
            <ul className="flex-1 overflow-y-auto space-y-3 pr-1">
              {cart.items.map((item, i) => {
                const product = item.product;
                const variant = item.variant;

                if (
                  typeof product !== "object" ||
                  !item ||
                  !product ||
                  !product.slug
                )
                  return <React.Fragment key={i} />;

                const metaImage =
                  product.meta?.image && typeof product.meta?.image === "object"
                    ? product.meta.image
                    : undefined;

                const firstGalleryImage =
                  typeof product.gallery?.[0]?.image === "object"
                    ? product.gallery?.[0]?.image
                    : undefined;

                let image = firstGalleryImage || metaImage;
                let price = product.priceInLKR;

                const isVariant =
                  Boolean(variant) && typeof variant === "object";

                if (isVariant) {
                  price = variant?.priceInLKR;

                  const imageVariant = product.gallery?.find((gItem) => {
                    if (!gItem.variantOption) return false;
                    const variantOptionID =
                      typeof gItem.variantOption === "object"
                        ? gItem.variantOption.id
                        : gItem.variantOption;

                    const hasMatch = variant?.options?.some((option) => {
                      if (typeof option === "object")
                        return option.id === variantOptionID;
                      else return option === variantOptionID;
                    });

                    return hasMatch;
                  });

                  if (imageVariant && typeof imageVariant.image === "object") {
                    image = imageVariant.image || undefined;
                  }
                }

                return (
                  <li
                    key={i}
                    className="rounded-xl border border-border bg-card p-3 shadow-2xs transition-all hover:border-border/80"
                  >
                    <div className="flex items-start gap-3">
                      <Link
                        className="relative h-16 w-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0 block"
                        href={`/products/${(item.product as Product)?.slug}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {image?.url && (
                          <Image
                            alt={image?.alt || product?.title || ""}
                            className="h-full w-full object-cover"
                            height={64}
                            src={image.url}
                            width={64}
                          />
                        )}
                      </Link>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/products/${(item.product as Product)?.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-sm text-foreground hover:underline line-clamp-1"
                          >
                            {product?.title}
                          </Link>
                          <DeleteItemButton item={item} />
                        </div>

                        {isVariant && variant ? (
                          <p className="text-xs text-muted-foreground capitalize">
                            {variant.options
                              ?.map((option) => {
                                if (typeof option === "object")
                                  return option.label;
                                return null;
                              })
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        ) : null}

                        <div className="flex items-center justify-between pt-1">
                          {typeof price === "number" && (
                            <Price
                              amount={price}
                              className="text-sm font-semibold text-foreground"
                            />
                          )}

                          <div className="flex items-center h-8 rounded-md border border-border bg-background">
                            <EditItemQuantityButton item={item} type="minus" />
                            <span className="w-6 text-center text-xs font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Bottom sticky summary */}
            <div className="pt-4 border-t border-border space-y-3 shrink-0 bg-background">
              {typeof cart?.subtotal === "number" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">
                    Subtotal
                  </span>
                  <Price
                    amount={cart.subtotal}
                    className="text-lg font-bold text-foreground"
                  />
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>

              <Button
                asChild
                size="lg"
                className="w-full gap-2 text-base h-12 font-medium"
              >
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
