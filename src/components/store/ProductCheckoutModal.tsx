"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingBag,
  CreditCard,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

interface ProductCheckoutModalProps {
  productTitle: string;
  priceInLKR: number;
  slug: string;
  image?: string | null;
  sizes?: readonly string[] | null;
  formId?: string | null;
  children?: React.ReactNode;
}

export function ProductCheckoutModal({
  productTitle,
  priceInLKR,
  slug,
  image,
  sizes = [],
  formId = "rj4eVo",
  children,
}: ProductCheckoutModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [selectedSize, setSelectedSize] = useState<string>(
    sizes && sizes.length > 0 ? sizes[0] : "N/A"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [copied, setCopied] = useState(false);

  const activeFormId = formId || "rj4eVo";
  const totalAmount = priceInLKR * quantity;

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
    const text = `SEDS Sri Lanka Bank Details:\nBank: Commercial Bank\nAccount Name: Students for the Exploration and Development of Space Sri Lanka\nAccount Number: 1000889944\nBranch: Colombo\nRef: ${name || "Order"} - ${productTitle}`;
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
      product_name: productTitle,
      product: productTitle,
      price: String(totalAmount),
      amount: String(totalAmount),
      slug: slug,
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            size="lg"
            className="w-full sm:flex-1 h-12 text-sm font-semibold cursor-pointer"
          >
            Order Merchandise Now <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-background border border-border/80 text-foreground p-0 overflow-hidden shadow-2xl rounded-none max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-6 border-b border-border/60 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground">
                  {step === 1 ? "Delivery Information" : "Bank Transfer & Slip Upload"}
                </DialogTitle>
                <DialogDescription className="text-xs font-mono text-muted-foreground mt-0.5">
                  Step {step} of 2 • {productTitle}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 ? (
            <>
              {/* Product Preview Bar */}
              <div className="flex items-center gap-4 p-4 border border-border/60 bg-muted/10">
                <div className="relative w-16 h-16 bg-muted/20 border border-border/40 shrink-0 overflow-hidden">
                  <Image
                    src={image || "/images/products/seds-tshirt.jpg"}
                    alt={productTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate">{productTitle}</h4>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Rs. {priceInLKR.toLocaleString()} each
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-background border border-border/60 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono font-bold px-1">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground font-mono font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Sizes Selection */}
              {sizes && sizes.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Select Size
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
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

              {/* Delivery Inputs */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Your Full Name *</Label>
                    <Input
                      placeholder="e.g. Nimal Perera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background border-border/80 text-foreground text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-foreground">Email (for Confirmation) *</Label>
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
                      placeholder="e.g. Colombo 03, Kandy, Galle"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-background border-border/80 text-foreground text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-foreground">Full Street Address *</Label>
                  <Input
                    placeholder="No. 123, Main Street, Apartment 4B..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-background border-border/80 text-foreground text-sm"
                  />
                </div>
              </div>

              {/* Step 1 Action */}
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
                    Please fill all required delivery details to continue.
                  </p>
                )}
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
                    <span className="text-foreground font-semibold">Commercial Bank / BOC</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Account No.</span>
                    <span className="text-primary font-bold">1000889944</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Name</span>
                    <span className="text-foreground">SEDS Sri Lanka</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Total Due</span>
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

              {/* Back Button */}
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
