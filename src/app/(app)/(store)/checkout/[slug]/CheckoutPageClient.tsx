"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/sections/section-header";
import {
  ShoppingBag,
  CreditCard,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

interface CheckoutPageClientProps {
  product: {
    title: string;
    priceInLKR: number;
    slug: string;
    image?: string | null;
    sizes?: readonly string[] | null;
    formId?: string | null;
    description: string;
  };
}

export function CheckoutPageClient({ product }: CheckoutPageClientProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "N/A"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [copied, setCopied] = useState(false);

  const activeFormId = product.formId || "rj4eVo";
  const totalAmount = product.priceInLKR * quantity;

  // Load Tally embed script
  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const copyBankDetails = () => {
    const text = `SEDS Sri Lanka Bank Details:\nBank: Commercial Bank\nAccount Name: Students for the Exploration and Development of Space Sri Lanka\nAccount Number: 1000889944\nBranch: Colombo\nRef: ${name || "Order"} - ${product.title}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const buildTallyUrl = () => {
    const params = new URLSearchParams({
      name: name.trim(),
      "full name": name.trim(),
      email: email.trim(),
      "email address": email.trim(),
      phone: phone.trim(),
      "phone number": phone.trim(),
      address: address.trim(),
      "delivery address": address.trim(),
      city: city.trim(),
      district: city.trim(),
      size: selectedSize,
      quantity: String(quantity),
      product_name: product.title,
      product: product.title,
      price: String(totalAmount),
      amount: String(totalAmount),
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
    address.trim().length > 3;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Parallax SectionHeader */}
      <SectionHeader
        title="Checkout & Order"
        description={
          <span>
            {product.title} • Official SEDS Sri Lanka Merch Order
          </span>
        }
        image={product.image || "/section-header/who-we-are-bg.jpg"}
      />

      <div className="grid-container section-content py-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Back button */}
          <div className="mb-6">
            <Link href={`/products/${product.slug}`}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4" /> BACK TO PRODUCT
              </Button>
            </Link>
          </div>

          {/* Bleeding Edge Container */}
          <div className="relative">
            {/* Extended Horizontal Bleed Lines */}
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

            {/* Extended Vertical Bleed Lines */}
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 border border-border/60 divide-y lg:divide-y-0 lg:divide-x divide-border/60 bg-background relative z-0">
              {/* Left Column: Order Summary Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-6">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" /> Order Summary
                </h3>

                <div className="flex gap-4 items-center p-4 border border-border/60 bg-muted/10">
                  <div className="relative w-16 h-16 bg-muted/20 border border-border/40 shrink-0 overflow-hidden">
                    <Image
                      src={product.image || "/images/products/seds-tshirt.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-sm truncate">{product.title}</h4>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      Rs. {product.priceInLKR.toLocaleString()} LKR
                    </p>
                    {selectedSize !== "N/A" && (
                      <span className="inline-block mt-1 text-[10px] font-mono font-bold bg-muted text-foreground border border-border/60 px-2 py-0.5">
                        SIZE: {selectedSize}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <span className="text-xs font-mono text-muted-foreground">Quantity</span>
                  <div className="flex items-center gap-2 bg-background border border-border/60 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold px-1.5">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal Calculation */}
                <div className="pt-4 border-t border-border/60 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Courier Delivery</span>
                    <span className="text-primary font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border/40">
                    <span>Total Amount</span>
                    <span className="text-primary font-bold">Rs. {totalAmount.toLocaleString()} LKR</span>
                  </div>
                </div>

                <div className="p-3.5 border border-primary/20 bg-primary/5 text-xs text-muted-foreground space-y-1">
                  <span className="font-semibold text-foreground block uppercase font-mono text-[11px]">
                    Non-Profit Student Initiative
                  </span>
                  <p>100% of proceeds fund student rocketry and space engineering in Sri Lanka.</p>
                </div>
              </div>

              {/* Right Column: Multi-Step Checkout Flow */}
              <div className="lg:col-span-7 p-6 sm:p-8">
                {step === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Delivery Details</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Where should our merchandising team dispatch your package?
                      </p>
                    </div>

                    {/* Size Selector */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          Choose Size
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSelectedSize(s)}
                              className={`px-3.5 py-1.5 text-xs font-mono font-bold border transition-colors ${
                                selectedSize === s
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-muted-foreground border-border/60 hover:border-foreground"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Shipping Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-foreground">Full Name *</Label>
                          <Input
                            placeholder="e.g. Nimal Perera"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-background border-border/80 text-foreground text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-foreground">Email Address *</Label>
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
                          <Label className="text-xs font-medium text-foreground">City / District *</Label>
                          <Input
                            placeholder="e.g. Colombo 03, Kandy, Galle"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-background border-border/80 text-foreground text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">Delivery Street Address *</Label>
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
                        className="w-full h-11 text-sm font-semibold"
                      >
                        Proceed to Bank Slip & Confirm <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      {!isStep1Valid && (
                        <p className="text-center text-xs text-muted-foreground mt-2">
                          Please enter your full name, email, phone number, and address.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Payment & Slip Upload</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Transfer Rs. {totalAmount.toLocaleString()} LKR to the account below and attach proof.
                      </p>
                    </div>

                    {/* Bank Details */}
                    <div className="p-4 border border-border/60 bg-muted/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4" /> Official Bank Account
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
                              <Copy className="w-3.5 h-3.5 mr-1" /> Copy Details
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs bg-background p-3 border border-border/40 font-mono">
                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase">Bank</span>
                          <span className="text-foreground font-semibold">Commercial Bank / BOC</span>
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

                    {/* Prefilled Tally Iframe */}
                    <div className="border border-border/60 bg-background overflow-hidden">
                      <div className="p-3 bg-muted/20 border-b border-border/40 text-xs font-mono text-muted-foreground flex items-center justify-between">
                        <span>Attach Transfer Slip:</span>
                        <span className="text-[11px]">Auto-fills for {name}</span>
                      </div>
                      <iframe
                        src={buildTallyUrl()}
                        width="100%"
                        height="360"
                        title="SEDS Order Form"
                        className="w-full border-0"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="text-muted-foreground hover:text-foreground text-xs"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Edit Delivery Info
                      </Button>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span>SEDS Verified Checkout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
