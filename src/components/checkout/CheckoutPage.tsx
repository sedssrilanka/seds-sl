"use client";

import { Media } from "@/components/Media";
import { Price } from "@/components/Price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/Auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  useAddresses,
  useCart,
} from "@payloadcms/plugin-ecommerce/client/react";
import { CheckoutAddresses } from "@/components/checkout/CheckoutAddresses";
import { CreateAddressModal } from "@/components/addresses/CreateAddressModal";
import type { Address } from "@/payload-types";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressItem } from "@/components/addresses/AddressItem";
import { FormItem } from "@/components/forms/FormItem";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CheckoutForm } from "@/components/forms/CheckoutForm";

import {
  UserCheck,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  /**
   * State to manage the email input for guest checkout.
   */
  const [email, setEmail] = useState("");
  const [emailEditable, setEmailEditable] = useState(true);

  const { addresses } = useAddresses();
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>();
  const [billingAddress, setBillingAddress] = useState<Partial<Address>>();
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] =
    useState(true);
  const [isProcessingPayment, setProcessingPayment] = useState(false);

  const cartIsEmpty = !cart || !cart.items || !cart.items.length;

  const canGoToPayment = Boolean(
    (email || user) &&
      billingAddress &&
      (billingAddressSameAsShipping || shippingAddress) &&
      !cartIsEmpty,
  );

  // On initial load wait for addresses to be loaded and check to see if we can prefill a default one
  // biome-ignore lint/correctness/useExhaustiveDependencies(shippingAddress): suppress shippingAddress
  useEffect(() => {
    if (!shippingAddress) {
      if (addresses && addresses.length > 0) {
        const defaultAddress = addresses[0];
        if (defaultAddress) {
          setBillingAddress(defaultAddress);
        }
      }
    }
  }, [addresses]);

  useEffect(() => {
    return () => {
      setShippingAddress(undefined);
      setBillingAddress(undefined);
      setBillingAddressSameAsShipping(true);
      setEmail("");
      setEmailEditable(true);
    };
  }, []);

  if (cartIsEmpty && isProcessingPayment) {
    return (
      <div className="py-20 w-full flex flex-col items-center justify-center gap-4 min-h-[50vh]">
        <LoadingSpinner />
        <p className="text-muted-foreground text-lg animate-pulse">
          Processing your order securely...
        </p>
      </div>
    );
  }

  if (cartIsEmpty) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center flex flex-col items-center gap-4">
        <div className="p-4 rounded-full bg-muted text-muted-foreground">
          <ShoppingBag className="size-10" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground text-sm">
            Looks like you haven't added any items to your cart yet.
          </p>
        </div>
        <Button asChild className="mt-2 gap-2">
          <Link href="/search">
            <span>Explore Products</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="text-muted-foreground text-sm">
          Complete your contact, shipping, and payment information below.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Form Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {/* Step 1: Contact Information */}
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <UserCheck className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  1. Contact Information
                </h2>
                <p className="text-xs text-muted-foreground">
                  Provide contact details for order updates and receipt.
                </p>
              </div>
            </div>

            {user ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Logged in as
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {user.email}
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link href="/logout">Log out</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                  <span className="text-sm text-muted-foreground">
                    Already have an account?
                  </span>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/create-account">Create Account</Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <FormItem>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      disabled={!emailEditable}
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                      className="h-11"
                    />
                  </FormItem>

                  {emailEditable && (
                    <Button
                      disabled={!email}
                      onClick={(e) => {
                        e.preventDefault();
                        setEmailEditable(false);
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      Continue as guest
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Address Section */}
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  2. Address Details
                </h2>
                <p className="text-xs text-muted-foreground">
                  Provide billing and shipping destination addresses.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Billing Address
                </h3>
                {billingAddress ? (
                  <AddressItem
                    actions={
                      <Button
                        variant={"outline"}
                        size="sm"
                        disabled={isProcessingPayment}
                        onClick={(e) => {
                          e.preventDefault();
                          setBillingAddress(undefined);
                        }}
                      >
                        Change
                      </Button>
                    }
                    address={billingAddress}
                  />
                ) : user ? (
                  <CheckoutAddresses
                    heading="Billing Address"
                    setAddress={setBillingAddress}
                  />
                ) : (
                  <CreateAddressModal
                    disabled={!email || Boolean(emailEditable)}
                    buttonText="Add Billing Address"
                    callback={(address) => {
                      setBillingAddress(address);
                    }}
                    skipSubmission={true}
                  />
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Checkbox
                  id="shippingTheSameAsBilling"
                  checked={billingAddressSameAsShipping}
                  disabled={
                    (!user && (!email || Boolean(emailEditable))) ||
                    isProcessingPayment
                  }
                  onCheckedChange={(state) => {
                    setBillingAddressSameAsShipping(state as boolean);
                  }}
                />
                <Label
                  htmlFor="shippingTheSameAsBilling"
                  className="cursor-pointer text-sm font-medium"
                >
                  Shipping address is the same as billing address
                </Label>
              </div>

              {!billingAddressSameAsShipping && (
                <div className="pt-2 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                    Shipping Address
                  </h3>
                  {shippingAddress ? (
                    <AddressItem
                      actions={
                        <Button
                          variant={"outline"}
                          size="sm"
                          disabled={isProcessingPayment}
                          onClick={(e) => {
                            e.preventDefault();
                            setShippingAddress(undefined);
                          }}
                        >
                          Change
                        </Button>
                      }
                      address={shippingAddress}
                    />
                  ) : user ? (
                    <CheckoutAddresses
                      heading="Shipping Address"
                      description="Select shipping destination."
                      setAddress={setShippingAddress}
                    />
                  ) : (
                    <CreateAddressModal
                      buttonText="Add Shipping Address"
                      callback={(address) => {
                        setShippingAddress(address);
                      }}
                      disabled={!email || Boolean(emailEditable)}
                      skipSubmission={true}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Payment Section */}
          {canGoToPayment && (
            <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs">
              <CheckoutForm
                cart={cart}
                user={user}
                customerEmail={email}
                billingAddress={billingAddress}
                shippingAddress={shippingAddress}
                billingAddressSameAsShipping={billingAddressSameAsShipping}
                setProcessingPayment={setProcessingPayment}
              />
            </div>
          )}
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="w-full lg:w-[380px] shrink-0 sticky top-24">
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="size-5 text-muted-foreground" />
                <span>Order Summary</span>
              </h2>
              <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-full">
                {cart?.items?.length || 0}{" "}
                {cart?.items?.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              {cart?.items?.map((item, index) => {
                if (typeof item.product === "object" && item.product) {
                  const {
                    product,
                    product: { meta, title, gallery },
                    quantity,
                    variant,
                  } = item;

                  if (!quantity) return null;

                  let image = gallery?.[0]?.image || meta?.image;
                  let price = product?.priceInLKR;

                  const isVariant =
                    Boolean(variant) && typeof variant === "object";

                  if (isVariant) {
                    price = variant?.priceInLKR;

                    const imageVariant = product.gallery?.find((item) => {
                      if (!item.variantOption) return false;
                      const variantOptionID =
                        typeof item.variantOption === "object"
                          ? item.variantOption.id
                          : item.variantOption;

                      const hasMatch = variant?.options?.some((option) => {
                        if (typeof option === "object")
                          return option.id === variantOptionID;
                        else return option === variantOptionID;
                      });

                      return hasMatch;
                    });

                    if (
                      imageVariant &&
                      typeof imageVariant.image !== "string"
                    ) {
                      image = imageVariant.image;
                    }
                  }

                  return (
                    <div
                      className="flex items-center gap-3 text-sm py-1"
                      key={index}
                    >
                      <div className="relative h-14 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
                        {image && typeof image !== "string" && (
                          <Media
                            fill
                            imgClassName="object-cover"
                            resource={image}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {title}
                        </p>
                        {variant && typeof variant === "object" && (
                          <p className="text-xs text-muted-foreground truncate">
                            {variant.options
                              ?.map((option) =>
                                typeof option === "object"
                                  ? option.label
                                  : null,
                              )
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty: {quantity}
                        </p>
                      </div>

                      {typeof price === "number" && (
                        <Price
                          amount={price * quantity}
                          className="font-semibold text-foreground text-sm shrink-0"
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="space-y-3 pt-4 border-t border-border text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <Price
                  amount={cart.subtotal || 0}
                  className="font-medium text-foreground"
                />
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Calculated next step
                </span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-baseline">
                <span className="text-base font-bold text-foreground">
                  Total
                </span>
                <Price
                  amount={cart.subtotal || 0}
                  className="text-2xl font-bold text-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
