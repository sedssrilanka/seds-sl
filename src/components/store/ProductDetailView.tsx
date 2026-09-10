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
  CreditCard,
  Copy,
  Check,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProductDetailViewProps {
  product: {
    slug: string;
    title: string;
    priceInLKR: number;
    inStock?: boolean;
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
  // Gallery State
  const images = Array.from(
    new Set([product.image, ...(product.gallery || [])].filter(Boolean) as string[])
  );
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "/images/products/seds-tshirt.jpg"
  );

  // Selection State
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "N/A"
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Checkout Dialog State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [copied, setCopied] = useState(false);

  const totalAmount = product.priceInLKR * quantity;
  const activeFormId = product.tallyFormId || "rj4eVo";

  const copyBankDetails = () => {
    const text = `SEDS Sri Lanka Bank Details:\nBank: Commercial Bank\nAccount Name: Students for the Exploration and Development of Space Sri Lanka\nAccount Number: 1000889944\nBranch: Colombo\nRef: ${name || "Order"} - ${product.title}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const buildTallyUrl = () => {
    const params = new URLSearchParams({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      size: selectedSize,
      quantity: String(quantity),
      product_name: product.title,
      price: String(totalAmount),
      slug: product.slug,
      order_status: "PENDING_VERIFICATION",
      status: "PENDING_VERIFICATION",
      transparentBackground: "1",
    });

    return `https://tally.so/embed/${activeFormId}?${params.toString()}`;
  };

  const isStep1Valid =
    name.trim().length > 1 &&
    email.includes("@") &&
    phone.trim().length >= 9 &&
    address.trim().length > 3 &&
    city.trim().length > 1;

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

      {/* Main Two-Column E-Commerce Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full bg-background border border-border/60 overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border/80 text-foreground text-xs font-mono font-semibold uppercase tracking-wider">
                {product.badge}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 bg-background border transition-colors shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? "border-primary ring-1 ring-primary"
                      : "border-border/60 hover:border-muted-foreground opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumb ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Size Picker, Quantity, Single CTA */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category & Status */}
          <div className="flex items-center gap-3">
            {product.category && (
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                {product.category}
              </span>
            )}
            <span className="text-xs font-mono text-muted-foreground">
              {product.inStock ? "• In Stock" : "• Out of Stock"}
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
            <span className="text-xs font-mono text-muted-foreground">LKR</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Inline Size Selector (If Apparel) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-foreground font-semibold">
                  Size: <span className="text-primary">{selectedSize}</span>
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
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold"
              >
                -
              </button>
              <span className="text-sm font-mono font-bold px-3">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Preview & Single Buy CTA */}
          <div className="pt-4 space-y-4">
            <div className="flex items-baseline justify-between text-xs font-mono pb-2">
              <span className="text-muted-foreground">Order Subtotal:</span>
              <span className="text-base font-bold text-foreground">
                Rs. {totalAmount.toLocaleString()} LKR
              </span>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setStep(1);
                setIsCheckoutOpen(true);
              }}
              className="w-full h-13 text-sm font-semibold cursor-pointer"
            >
              Order Merchandise <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Features Highlights */}
          {product.features && product.features.length > 0 && (
            <div className="pt-6 border-t border-border/60 space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                Specifications
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

      {/* Product Overview Section */}
      <div className="mt-16 pt-12 border-t border-border/60">
        <div className="border border-border/60 p-6 sm:p-10 bg-background">
          <h3 className="text-xl font-bold text-foreground mb-4">Product Details & Story</h3>
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
                      src={rel.image || "/images/products/seds-stickers.jpg"}
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

      {/* Streamlined Checkout Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-xl bg-background border border-border/80 text-foreground p-0 overflow-hidden shadow-2xl rounded-none max-h-[90vh] flex flex-col">
          <div className="p-6 border-b border-border/60 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold text-foreground">
                    {step === 1 ? "Delivery Address" : "Bank Transfer & Slip"}
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono text-muted-foreground mt-0.5">
                    Step {step} of 2 • {quantity}x {product.title} ({selectedSize !== "N/A" ? `Size: ${selectedSize}` : "Regular"})
                  </DialogDescription>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">Total</span>
                <span className="text-sm font-bold font-mono text-primary">
                  Rs. {totalAmount.toLocaleString()} LKR
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {step === 1 ? (
              <>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground">Full Name *</Label>
                      <Input
                        placeholder="Nimal Perera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background border-border/80 text-foreground text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground">Email (for Receipt) *</Label>
                      <Input
                        type="email"
                        placeholder="nimal@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background border-border/80 text-foreground text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground">Phone / WhatsApp *</Label>
                      <Input
                        placeholder="077 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-background border-border/80 text-foreground text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground">City / Town *</Label>
                      <Input
                        placeholder="Colombo 03, Kandy, Galle..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-background border-border/80 text-foreground text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Street Delivery Address *</Label>
                    <Input
                      placeholder="No. 123, Main Street, Apartment 4B..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-background border-border/80 text-foreground text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <Button
                    disabled={!isStep1Valid}
                    onClick={() => setStep(2)}
                    className="w-full h-11 text-sm font-semibold cursor-pointer"
                  >
                    Proceed to Bank Slip & Confirm <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Bank Details */}
                <div className="p-4 border border-border/60 bg-muted/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" /> Bank Account Details
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyBankDetails}
                      className="h-7 text-xs border-border/60"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-primary" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-background p-3 border border-border/40 font-mono">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Bank</span>
                      <span className="text-foreground font-semibold">Commercial Bank</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Account No.</span>
                      <span className="text-primary font-bold">1000889944</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Account Name</span>
                      <span className="text-foreground">SEDS Sri Lanka</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Amount Due</span>
                      <span className="text-primary font-bold">Rs. {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Tally Embedded File Upload */}
                <div className="border border-border/60 bg-background overflow-hidden">
                  <div className="p-3 bg-muted/20 border-b border-border/40 text-xs font-mono text-muted-foreground flex items-center justify-between">
                    <span>Attach Transfer Proof:</span>
                    <span className="text-[11px]">Auto-fills for {name}</span>
                  </div>
                  <iframe
                    src={buildTallyUrl()}
                    width="100%"
                    height="340"
                    title="SEDS Order Form"
                    className="w-full border-0"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="text-muted-foreground hover:text-foreground text-xs cursor-pointer"
                  >
                    ← Edit Delivery Info
                  </Button>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>SEDS Verified Checkout</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
