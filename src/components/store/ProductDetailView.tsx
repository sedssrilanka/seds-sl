"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  Rocket,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetailViewProps {
  product: {
    slug: string;
    title: string;
    priceInLKR: number;
    inStock?: boolean;
    isPreOrder?: boolean;
    category?: string | null;
    badge?: string | null;
    image?: string | null;
    gallery?: readonly string[] | null;
    sizes?: readonly string[] | null;
    features?: readonly string[] | null;
    description: string;
    tallyFormId?: string | null;
  };
  content?: React.ReactNode;
  relatedProducts?: Array<{
    slug: string;
    title: string;
    priceInLKR: number;
    image?: string | null;
    description: string;
  }>;
}

export function ProductDetailView({
  product,
  content,
  relatedProducts = [],
}: ProductDetailViewProps) {
  // Gallery Carousel State
  const images = Array.from(
    new Set([product.image, ...(product.gallery || [])].filter(Boolean) as string[])
  );
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const selectedImage =
    images[currentIdx] || images[0] || "/images/products/tshit-2026-front.png";

  const nextImage = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Selection State
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "N/A"
  );
  const [quantity, setQuantity] = useState<number>(1);

  const isBuy4Get1 =
    (product.badge && product.badge.toLowerCase().includes("buy 4")) ||
    (product.description && product.description.toLowerCase().includes("buy 4")) ||
    product.slug.includes("band");

  const freeItems = isBuy4Get1 ? Math.floor(quantity / 5) : 0;
  const billableUnits = isBuy4Get1 ? Math.max(1, quantity - freeItems) : quantity;
  const subtotal = product.priceInLKR * billableUnits;

  return (
    <div className="w-full">
      {/* Top Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link
          href="/shop"
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> STORE
        </Link>
        <span>/</span>
        {product.category && (
          <>
            <span className="uppercase">{product.category}</span>
            <span>/</span>
          </>
        )}
        <span className="text-foreground uppercase font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </div>

      {/* Main Two-Column E-Commerce Layout with Sticky Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
        {/* Left Column: Sticky Image Carousel */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 self-start space-y-4">
          <div className="relative aspect-square w-full bg-muted/10 border border-border/60 overflow-hidden group">
            <Image
              src={selectedImage}
              alt={`${product.title} - View ${currentIdx + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-2 object-center transition-all duration-300"
            />

            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border/80 text-foreground text-xs font-mono font-semibold uppercase tracking-wider">
                {product.badge}
              </div>
            )}

            {/* Carousel Navigation Arrows (If Multiple Images) */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-background border border-border/80 text-foreground backdrop-blur-xs transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-background border border-border/80 text-foreground backdrop-blur-xs transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Counter & View Badge */}
                <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 bg-background/90 backdrop-blur-xs border border-border/80 text-foreground text-[10px] font-mono flex items-center gap-1.5">
                  <span className="font-bold text-primary">
                    {currentIdx === 0 ? "FRONT" : currentIdx === 1 ? "BACK" : `VIEW ${currentIdx + 1}`}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span>
                    {currentIdx + 1} / {images.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Interactive Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`relative w-20 h-20 bg-muted/10 border transition-all shrink-0 cursor-pointer overflow-hidden ${
                    currentIdx === idx
                      ? "border-primary ring-1 ring-primary opacity-100"
                      : "border-border/60 hover:border-muted-foreground opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumb ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-background/90 text-[9px] font-mono text-center py-0.5 border-t border-border/40">
                    {idx === 0 ? "FRONT" : idx === 1 ? "BACK" : `VIEW ${idx + 1}`}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Non-profit badge */}
          <div className="p-3.5 border border-primary/20 bg-primary/5 text-xs text-muted-foreground flex items-center gap-3">
            <Rocket className="w-4 h-4 text-primary shrink-0" />
            <span>100% of merchandise proceeds directly fund SEDS Sri Lanka student rocketry & outreach projects.</span>
          </div>
        </div>

        {/* Right Column: Information, Size Picker, Quantity, Direct Checkout CTA */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category & Status */}
          <div className="flex items-center gap-3">
            {product.category && (
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                {product.category}
              </span>
            )}
            <span className="text-xs font-mono text-muted-foreground">
              {product.isPreOrder
                ? "• Pre-Order"
                : product.inStock
                ? "• In Stock"
                : "• Out of Stock"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-border/60">
            <span className="text-3xl font-bold text-foreground">
              Rs. {Number(product.priceInLKR || 0).toLocaleString()}
            </span>
            <span className="text-xs font-mono text-muted-foreground">LKR per unit</span>
          </div>

          {/* Promo Callout (if Buy 4 Get 1 Free) */}
          {isBuy4Get1 && (
            <div className="p-3 bg-primary/10 border border-primary/30 text-xs text-foreground space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-primary">
                <span>🔥 Special Deal: Buy 4, Get 1 FREE!</span>
              </div>
              <p className="text-muted-foreground">
                For every 4 wristbands purchased, 1 extra wristband is added completely free to your delivery.
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Inline Size Selector (If Apparel) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-foreground font-semibold">
                  Select Size: <span className="text-primary">{selectedSize}</span>
                </span>
                <span className="text-muted-foreground text-[11px]">Unisex Regular Fit</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-mono font-bold border transition-colors cursor-pointer ${
                      selectedSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border/60 hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold block">
              Quantity
            </span>
            <div className="flex items-center gap-3 w-fit border border-border/60 bg-background p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold cursor-pointer"
              >
                -
              </button>
              <span className="text-sm font-mono font-bold px-3">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold cursor-pointer"
              >
                +
              </button>
            </div>
            {isBuy4Get1 && quantity === 4 && (
              <p className="text-[11px] font-mono text-primary font-medium">
                🎁 Awesome! +1 FREE wristband will be included with your 4 bands!
              </p>
            )}
            {isBuy4Get1 && freeItems > 0 && (
              <p className="text-[11px] font-mono text-primary font-medium">
                🎁 Deal applied! {freeItems} free wristband{freeItems > 1 ? "s" : ""} included ({quantity} total bands for the price of {billableUnits})!
              </p>
            )}
          </div>

          {/* Total Preview & Direct Checkout Navigation (NO POPUPS) */}
          <div className="pt-4 space-y-3">
            <div className="space-y-1 text-xs font-mono pb-2 border-b border-border/40">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>
                  Item Subtotal ({quantity} {quantity === 1 ? "unit" : "units"}
                  {isBuy4Get1 && freeItems > 0 ? ` • ${freeItems} free` : ""}):
                </span>
                <span>Rs. {subtotal.toLocaleString()} LKR</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Island-Wide Delivery:</span>
                <span className="text-foreground">Rs. 200 LKR</span>
              </div>
              <div className="flex items-baseline justify-between pt-2 text-sm font-bold text-foreground">
                <span>{product.isPreOrder ? "Total Pre-Order Amount:" : "Total Order Amount:"}</span>
                <span className="text-xl font-bold text-primary">
                  Rs. {(subtotal + 200).toLocaleString()} LKR
                </span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full h-13 text-sm font-semibold cursor-pointer"
            >
              <Link
                href={`/checkout/${product.slug}?size=${encodeURIComponent(selectedSize)}&quantity=${quantity}`}
              >
                {product.isPreOrder ? "Pre-Order Now" : "Proceed to Checkout"}{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Features Highlights */}
          {product.features && product.features.length > 0 && (
            <div className="pt-6 border-t border-border/60 space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                Specifications & Highlights
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trust Row */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60 text-xs">
            <div className="p-3 border border-border/60 bg-muted/10 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Island-Wide</p>
                <p className="text-muted-foreground text-[11px]">2-3 Business Days</p>
              </div>
            </div>
            <div className="p-3 border border-border/60 bg-muted/10 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Bank Slip Proof</p>
                <p className="text-muted-foreground text-[11px]">Manual Verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Overview Story Section */}
      <div className="mt-20 pt-12 border-t border-border/60">
        <div className="border border-border/60 p-6 sm:p-10 bg-background">
          <h3 className="text-xl font-bold text-foreground mb-4">Complete Product Information</h3>
          <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm">
            {content || <div>{product.description}</div>}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">More Merchandise</h3>
              <p className="text-xs text-muted-foreground mt-1">Official space exploration gear</p>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono font-semibold text-primary hover:underline"
            >
              VIEW ALL STORE →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-border/60 divide-y sm:divide-y-0 sm:divide-x divide-border/60 bg-background">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/products/${rel.slug}`}
                className="p-6 flex flex-col justify-between hover:bg-muted/10 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square w-full bg-muted/20 border border-border/40 overflow-hidden">
                    <Image
                      src={rel.image || "/images/products/tshit-2026-front.png"}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {rel.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">
                    Rs. {Number(rel.priceInLKR || 0).toLocaleString()} LKR
                  </span>
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
