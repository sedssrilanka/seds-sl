"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingBag,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ChevronLeft,
  ChevronDown,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

interface CheckoutPageClientProps {
  product: {
    title: string;
    priceInLKR: number;
    slug: string;
    image?: string | null;
    sizes?: readonly string[] | null;
    isPreOrder?: boolean;
    formId?: string | null;
    description: string;
  };
}

export function CheckoutPageClient({ product }: CheckoutPageClientProps) {
  const searchParams = useSearchParams();
  const initialSize =
    searchParams.get("size") ||
    (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "N/A");
  const initialQuantity =
    parseInt(searchParams.get("quantity") || "1", 10) || 1;

  // 3-Step State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSize] = useState<string>(initialSize);
  const quantity = initialQuantity;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    address?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    city?: boolean;
    address?: boolean;
  }>({});

  const validateField = (field: string, val: string) => {
    let err = "";
    if (field === "name") {
      if (!val.trim()) err = "Full name is required";
      else if (val.trim().length < 2) err = "Please enter at least 2 characters";
    } else if (field === "email") {
      if (!val.trim()) err = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) err = "Please enter a valid email address";
    } else if (field === "phone") {
      if (!val.trim()) err = "Phone number is required";
      else if (val.trim().replace(/\D/g, "").length < 9) err = "Enter a valid phone number (min 9 digits)";
    } else if (field === "city") {
      if (!val.trim()) err = "City / District is required";
      else if (val.trim().length < 2) err = "Please enter your city/town";
    } else if (field === "address") {
      if (!val.trim()) err = "Delivery address is required";
      else if (val.trim().length < 5) err = "Please enter your full street delivery address";
    }
    return err;
  };

  const handleFieldChange = (field: "name" | "email" | "phone" | "city" | "address", val: string) => {
    if (field === "name") setName(val);
    if (field === "email") setEmail(val);
    if (field === "phone") setPhone(val);
    if (field === "city") setCity(val);
    if (field === "address") setAddress(val);

    if (touched[field]) {
      const err = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleFieldBlur = (field: "name" | "email" | "phone" | "city" | "address", val: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateAll = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      city?: string;
      address?: string;
    } = {};

    const nameErr = validateField("name", name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField("email", email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField("phone", phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const cityErr = validateField("city", city);
    if (cityErr) newErrors.city = cityErr;

    const addressErr = validateField("address", address);
    if (addressErr) newErrors.address = addressErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phone.trim().replace(/\D/g, "").length >= 9 &&
    city.trim().length >= 2 &&
    address.trim().length >= 5;

  const handleContinueToStep2 = () => {
    setTouched({ name: true, email: true, phone: true, city: true, address: true });
    if (validateAll()) {
      setStep(2);
    }
  };

  const activeFormId = product.formId || "rj4eVo";
  const isBuy4Get1 =
    product.slug.includes("band") ||
    product.title.toLowerCase().includes("band") ||
    (product.description && product.description.toLowerCase().includes("buy 4"));

  const freeItems = isBuy4Get1 ? Math.floor(quantity / 5) : 0;
  const billableUnits = isBuy4Get1 ? Math.max(1, quantity - freeItems) : quantity;
  const deliveryFee = 200;
  const subtotal = product.priceInLKR * billableUnits;
  const totalAmount = subtotal + deliveryFee;
  const paymentReference = `${name || "Order"} - ${phone || product.title}`.trim();

  // Load Tally embed script & trigger loadEmbeds
  useEffect(() => {
    const w = "https://tally.so/widgets/embed.js";
    const v = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
          e.src = e.dataset.tallySrc;
        });
      }
    };

    if (typeof (window as any).Tally !== "undefined") {
      v();
    } else if (!document.querySelector(`script[src="${w}"]`)) {
      const s = document.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      document.body.appendChild(s);
    } else {
      v();
    }
  }, [step]);

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const buildTallyUrl = () => {
    const defaultStatus = product.isPreOrder
      ? "PRE_ORDER_PENDING"
      : "PENDING_VERIFICATION";

    let itemDetails = product.title;
    if (isBuy4Get1 && freeItems > 0) {
      itemDetails = `${product.title} (Qty: ${quantity}, ${freeItems} FREE Band(s) Applied)`;
    } else if (isBuy4Get1 && quantity === 4) {
      itemDetails = `${product.title} (Qty: 4 + 1 FREE Bonus Band)`;
    } else if (selectedSize !== "N/A") {
      itemDetails = `${product.title} (Size: ${selectedSize}, Qty: ${quantity})`;
    } else {
      itemDetails = `${product.title} (Qty: ${quantity})`;
    }

    const params = new URLSearchParams({
      hideTitle: "1",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      size: selectedSize,
      quantity: String(quantity),
      product_name: product.isPreOrder ? `[PRE-ORDER] ${product.title}` : product.title,
      item_details: itemDetails,
      price: String(totalAmount),
      slug: product.slug,
      order_status: defaultStatus,
      status: defaultStatus,
    });

    return `https://tally.so/embed/${activeFormId}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen py-10 md:py-16">
      <div className="grid-container section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Breadcrumb */}
          <div className="mb-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
            {/* Left Column: Sticky Order Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-6">
              <div className="border border-border/60 bg-background p-6 sm:p-8 space-y-6">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2 pb-4 border-b border-border/60">
                  <ShoppingBag className="w-4 h-4 text-primary" />{" "}
                  {product.isPreOrder ? "Pre-Order Summary" : "Order Summary"}
                </h3>

                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-muted/20 border border-border/40 shrink-0 overflow-hidden">
                    <Image
                      src={product.image || "/images/products/tshit-2026-front.png"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-sm truncate">{product.title}</h4>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      Rs. {product.priceInLKR.toLocaleString()} LKR each
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                      {product.isPreOrder && (
                        <span className="inline-block text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/40 px-2 py-0.5">
                          PRE-ORDER
                        </span>
                      )}
                      {selectedSize !== "N/A" && (
                        <span className="inline-block text-[10px] font-mono font-bold bg-muted text-foreground border border-border/60 px-2 py-0.5">
                          SIZE: {selectedSize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Read-Only Quantity Display */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs font-mono">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-bold text-foreground bg-muted/40 border border-border/60 px-2.5 py-0.5">
                    {quantity} {quantity === 1 ? "unit" : "units"}
                  </span>
                </div>

                {/* Calculation */}
                <div className="pt-4 border-t border-border/60 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      Item Subtotal ({quantity} {quantity === 1 ? "unit" : "units"}
                      {isBuy4Get1 && freeItems > 0 ? ` • ${freeItems} free` : ""})
                    </span>
                    <span>Rs. {subtotal.toLocaleString()} LKR</span>
                  </div>
                  {isBuy4Get1 && quantity === 4 && (
                    <div className="text-[11px] text-primary font-bold">
                      🎁 +1 FREE Bonus Band included with your package!
                    </div>
                  )}
                  {isBuy4Get1 && freeItems > 0 && (
                    <div className="text-[11px] text-primary font-bold">
                      🎁 Deal applied: {freeItems} free band{freeItems > 1 ? "s" : ""} included!
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Island-Wide Courier Delivery</span>
                    <span className="text-foreground font-semibold">Rs. {deliveryFee.toLocaleString()} LKR</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-foreground pt-3 border-t border-border/40">
                    <span>{product.isPreOrder ? "Total Pre-Order Amount" : "Total Amount Due"}</span>
                    <span className="text-primary font-bold text-base">
                      Rs. {totalAmount.toLocaleString()} LKR
                    </span>
                  </div>
                </div>

                <div className="p-3.5 border border-primary/20 bg-primary/5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground block uppercase font-mono text-[11px] mb-1">
                    Non-Profit Student Club
                  </span>
                  <p>100% of merchandise proceeds directly fund university space rocketry & CanSat engineering in Sri Lanka.</p>
                </div>
              </div>
            </div>

            {/* Right Column: 3-Step Checkout Flow */}
            <div className="lg:col-span-7">
              {/* Step Indicator Header */}
              <div className="grid grid-cols-3 border border-border/60 mb-6 sm:mb-8 text-[11px] sm:text-xs font-mono">
                <div
                  className={`py-2.5 px-1.5 sm:p-3 text-center border-r border-border/60 transition-colors flex items-center justify-center truncate ${
                    step === 1
                      ? "bg-primary text-primary-foreground font-bold"
                      : step > 1
                      ? "bg-muted/30 text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="sm:hidden">1. Details</span>
                  <span className="hidden sm:inline">1. Delivery Details</span>
                </div>
                <div
                  className={`py-2.5 px-1.5 sm:p-3 text-center border-r border-border/60 transition-colors flex items-center justify-center truncate ${
                    step === 2
                      ? "bg-primary text-primary-foreground font-bold"
                      : step > 2
                      ? "bg-muted/30 text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="sm:hidden">2. Bank Pay</span>
                  <span className="hidden sm:inline">2. Bank Instructions</span>
                </div>
                <div
                  className={`py-2.5 px-1.5 sm:p-3 text-center transition-colors flex items-center justify-center truncate ${
                    step === 3
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="sm:hidden">3. Slip</span>
                  <span className="hidden sm:inline">3. Upload Slip</span>
                </div>
              </div>

              {/* Main Step Content Container */}
              <div className="border border-border/60 bg-background p-4 sm:p-6 md:p-8">
                {/* ── STEP 1: Delivery Information ── */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">1. Delivery Information</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Where should our merchandising team dispatch your package?
                      </p>
                    </div>

                    {/* Shipping Inputs */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-foreground">Full Name *</Label>
                          <Input
                            placeholder="e.g. Nimal Perera"
                            value={name}
                            onChange={(e) => handleFieldChange("name", e.target.value)}
                            onBlur={(e) => handleFieldBlur("name", e.target.value)}
                            className={`bg-background text-foreground text-sm transition-colors ${
                              touched.name && errors.name
                                ? "border-destructive focus-visible:ring-destructive"
                                : "border-border/80"
                            }`}
                          />
                          {touched.name && errors.name ? (
                            <p className="text-[11px] text-destructive font-mono flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                            </p>
                          ) : (
                            <p className="text-[10px] text-muted-foreground font-mono">Recipient legal/official name</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-foreground">Email Address (for Receipt) *</Label>
                          <Input
                            type="email"
                            placeholder="nimal@gmail.com"
                            value={email}
                            onChange={(e) => handleFieldChange("email", e.target.value)}
                            onBlur={(e) => handleFieldBlur("email", e.target.value)}
                            className={`bg-background text-foreground text-sm transition-colors ${
                              touched.email && errors.email
                                ? "border-destructive focus-visible:ring-destructive"
                                : "border-border/80"
                            }`}
                          />
                          {touched.email && errors.email ? (
                            <p className="text-[11px] text-destructive font-mono flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                            </p>
                          ) : (
                            <p className="text-[10px] text-muted-foreground font-mono">For payment confirmation receipt</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-foreground">Phone / WhatsApp Number *</Label>
                          <Input
                            placeholder="077 123 4567"
                            value={phone}
                            onChange={(e) => handleFieldChange("phone", e.target.value)}
                            onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                            className={`bg-background text-foreground text-sm transition-colors ${
                              touched.phone && errors.phone
                                ? "border-destructive focus-visible:ring-destructive"
                                : "border-border/80"
                            }`}
                          />
                          {touched.phone && errors.phone ? (
                            <p className="text-[11px] text-destructive font-mono flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                            </p>
                          ) : (
                            <p className="text-[10px] text-muted-foreground font-mono">Courier delivery contact</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-foreground">City / Town / District *</Label>
                          <Input
                            placeholder="e.g. Colombo 03, Kandy, Galle"
                            value={city}
                            onChange={(e) => handleFieldChange("city", e.target.value)}
                            onBlur={(e) => handleFieldBlur("city", e.target.value)}
                            className={`bg-background text-foreground text-sm transition-colors ${
                              touched.city && errors.city
                                ? "border-destructive focus-visible:ring-destructive"
                                : "border-border/80"
                            }`}
                          />
                          {touched.city && errors.city ? (
                            <p className="text-[11px] text-destructive font-mono flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" /> {errors.city}
                            </p>
                          ) : (
                            <p className="text-[10px] text-muted-foreground font-mono">Destination city / district</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">Street Delivery Address *</Label>
                        <Input
                          placeholder="No. 123, Main Street, Apartment 4B..."
                          value={address}
                          onChange={(e) => handleFieldChange("address", e.target.value)}
                          onBlur={(e) => handleFieldBlur("address", e.target.value)}
                          className={`bg-background text-foreground text-sm transition-colors ${
                            touched.address && errors.address
                              ? "border-destructive focus-visible:ring-destructive"
                              : "border-border/80"
                          }`}
                        />
                        {touched.address && errors.address ? (
                          <p className="text-[11px] text-destructive font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.address}
                          </p>
                        ) : (
                          <p className="text-[10px] text-muted-foreground font-mono">House / building number & street</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/60">
                      <Button
                        disabled={!isFormValid}
                        onClick={handleContinueToStep2}
                        className="w-full h-12 text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Bank Instructions <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      {!isFormValid && (
                        <p className="text-center text-[11px] text-muted-foreground mt-2 font-mono">
                          Please fill all required fields above to proceed to bank details.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Bank Account Details & Transfer Instructions ── */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">2. Bank Transfer Instructions</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Transfer the order amount directly to our official student club bank account.
                      </p>
                    </div>

                    {/* Official Bank Account Card with Large Bank Name & Individual Copy Buttons */}
                    <div className="border border-border/60 bg-muted/10 p-5 sm:p-6 space-y-5">
                      {/* Prominent Bank Header */}
                      <div className="flex items-center gap-4 pb-4 border-b border-border/60">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white border border-border/60 shrink-0 flex items-center justify-center rounded-sm overflow-hidden shadow-xs">
                          <Image
                            src="/logo/com-bank.png"
                            alt="Commercial Bank of Ceylon Logo"
                            width={60}
                            height={60}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                            Deposit Bank
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                            Commercial Bank of Ceylon
                          </h3>
                          <p className="text-xs font-mono text-muted-foreground mt-0.5">
                            Branch: Colombo Branch • Account Name: SEDS Sri Lanka
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs font-mono">
                        {/* Account Number Row */}
                        <div className="flex items-center justify-between p-3.5 bg-background border border-border/40 gap-2">
                          <div className="min-w-0">
                            <span className="text-muted-foreground block text-[10px] uppercase">Account Number</span>
                            <span className="text-primary font-bold text-base sm:text-lg">1000889944</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard("1000889944", "accountNumber")}
                            className="h-8 px-2.5 sm:px-3 text-xs border-border/60 cursor-pointer shrink-0"
                            title="Copy Account Number"
                          >
                            {copiedField === "accountNumber" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-primary sm:mr-1.5" />
                                <span className="hidden sm:inline">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 sm:mr-1.5" />
                                <span className="hidden sm:inline">Copy Account No</span>
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Amount Row */}
                        <div className="flex items-center justify-between p-3.5 bg-background border border-border/40 gap-2">
                          <div className="min-w-0">
                            <span className="text-muted-foreground block text-[10px] uppercase">Exact Transfer Amount</span>
                            <span className="text-foreground font-bold text-base sm:text-lg">Rs. {totalAmount.toLocaleString()} LKR</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(String(totalAmount), "amount")}
                            className="h-8 px-2.5 sm:px-3 text-xs border-border/60 cursor-pointer shrink-0"
                            title="Copy Amount"
                          >
                            {copiedField === "amount" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-primary sm:mr-1.5" />
                                <span className="hidden sm:inline">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 sm:mr-1.5" />
                                <span className="hidden sm:inline">Copy Amount</span>
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Remarks / Reference Row */}
                        <div className="flex items-center justify-between p-3.5 bg-background border border-border/40 gap-2">
                          <div className="min-w-0 flex-1 mr-2">
                            <span className="text-muted-foreground block text-[10px] uppercase">Payment Remarks / Reference</span>
                            <span className="text-foreground font-semibold text-xs truncate block">{paymentReference}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(paymentReference, "reference")}
                            className="h-8 px-2.5 sm:px-3 text-xs border-border/60 cursor-pointer shrink-0"
                            title="Copy Reference"
                          >
                            {copiedField === "reference" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-primary sm:mr-1.5" />
                                <span className="hidden sm:inline">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 sm:mr-1.5" />
                                <span className="hidden sm:inline">Copy Ref</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable FAQ Transfer Instructions */}
                    <div className="border border-border/60 bg-background overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsFaqOpen(!isFaqOpen)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/10 transition-colors cursor-pointer"
                      >
                        <span className="font-mono uppercase font-bold text-xs text-foreground flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-primary" /> Step-by-Step Payment Instructions & FAQs
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                            isFaqOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isFaqOpen && (
                        <div className="p-4 pt-2 border-t border-border/40 text-xs space-y-3 bg-muted/5 text-muted-foreground leading-relaxed">
                          <ol className="list-decimal list-inside space-y-2">
                            <li>
                              <strong>Online Banking / App:</strong> Open your banking app (e.g. ComBank Q+, Flash, BOC Smart, HNB Digital, FriMi, or any bank app).
                            </li>
                            <li>
                              <strong>Transfer Details:</strong> Enter Account No. <code className="text-primary font-bold">1000889944</code> (Commercial Bank).
                            </li>
                            <li>
                              <strong>Amount:</strong> Enter the exact amount <code className="text-foreground font-bold">Rs. {totalAmount.toLocaleString()}</code>.
                            </li>
                            <li>
                              <strong>Payment Remarks:</strong> Add your name and phone: <code className="text-foreground">{paymentReference}</code>.
                            </li>
                            <li>
                              <strong>Save Proof:</strong> Download the PDF receipt or take a clear screenshot of the successful transfer.
                            </li>
                            <li>
                              <strong>CDM / Cash Deposit:</strong> You can also deposit directly at any Commercial Bank CDM machine island-wide.
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>

                    {/* Step 2 Actions */}
                    <div className="pt-4 border-t border-border/60 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="text-muted-foreground hover:text-foreground text-xs cursor-pointer w-full sm:w-auto"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Delivery Details
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        className="h-11 px-6 text-sm font-semibold cursor-pointer w-full sm:w-auto"
                      >
                        Proceed to Upload Slip <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Upload Slip & Finalize Order ── */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">3. Upload Transfer Slip</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Attach your deposit slip screenshot or photo to finalize your order.
                      </p>
                    </div>

                    {/* Confirmation Summary Pill */}
                    <div className="p-3.5 bg-muted/20 border border-border/60 text-xs font-mono flex items-center justify-between">
                      <div>
                        <span className="text-muted-foreground">Order for: </span>
                        <span className="text-foreground font-bold">{name}</span> ({email})
                      </div>
                      <div className="text-primary font-bold">
                        Rs. {totalAmount.toLocaleString()} LKR
                      </div>
                    </div>

                    {/* Tally Embedded Slip Upload (Auto pre-filled) */}
                    <div className="border border-border/60 bg-[#09090b] overflow-hidden">
                      <iframe
                        data-tally-src={buildTallyUrl()}
                        src={buildTallyUrl()}
                        loading="lazy"
                        width="100%"
                        height="500"
                        title="SEDS Sri Lanka Web Orders"
                        className="w-full border-0 h-[500px]"
                      />
                    </div>

                    {/* Step 3 Actions */}
                    <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(2)}
                        className="text-muted-foreground hover:text-foreground text-xs cursor-pointer w-full sm:w-auto"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Bank Details
                      </Button>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span>SEDS Verified Order Submission</span>
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
