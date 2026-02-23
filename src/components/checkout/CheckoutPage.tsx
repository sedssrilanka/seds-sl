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
      <div className="py-12 w-full items-center justify-center">
        <div className="prose dark:prose-invert text-center max-w-none self-center mb-8">
          <p>Processing your order...</p>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (cartIsEmpty) {
    return (
      <div className="prose dark:prose-invert py-12 w-full items-center">
        <p>Your cart is empty.</p>
        <Link href="/search">Continue shopping?</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch justify-stretch my-8 md:flex-row grow gap-10 md:gap-6 lg:gap-8">
      <div className="basis-full lg:basis-2/3 flex flex-col gap-8 justify-stretch">
        <h2 className="font-medium text-3xl">Contact</h2>
        {!user && (
          <div className=" bg-accent dark:bg-black rounded-lg p-4 w-full flex items-center">
            <div className="prose dark:prose-invert">
              <Button
                asChild
                className="no-underline text-inherit"
                variant="outline"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <p className="mt-0">
                <span className="mx-2">or</span>
                <Link href="/create-account">create an account</Link>
              </p>
            </div>
          </div>
        )}
        {user ? (
          <div className="bg-accent dark:bg-card rounded-lg p-4 ">
            <div>
              <p>{user.email}</p>{" "}
              <p>
                Not you?{" "}
                <Link className="underline" href="/logout">
                  Log out
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-accent dark:bg-black rounded-lg p-4 ">
            <div>
              <p className="mb-4">Enter your email to checkout as a guest.</p>

              <FormItem className="mb-6">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  disabled={!emailEditable}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
              </FormItem>

              <Button
                disabled={!email || !emailEditable}
                onClick={(e) => {
                  e.preventDefault();
                  setEmailEditable(false);
                }}
                variant="default"
              >
                Continue as guest
              </Button>
            </div>
          </div>
        )}

        <h2 className="font-medium text-3xl">Address</h2>

        {billingAddress ? (
          <div>
            <AddressItem
              actions={
                <Button
                  variant={"outline"}
                  disabled={isProcessingPayment}
                  onClick={(e) => {
                    e.preventDefault();
                    setBillingAddress(undefined);
                  }}
                >
                  Remove
                </Button>
              }
              address={billingAddress}
            />
          </div>
        ) : user ? (
          <CheckoutAddresses
            heading="Billing address"
            setAddress={setBillingAddress}
          />
        ) : (
          <CreateAddressModal
            disabled={!email || Boolean(emailEditable)}
            callback={(address) => {
              setBillingAddress(address);
            }}
            skipSubmission={true}
          />
        )}

        <div className="flex gap-4 items-center">
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
          <Label htmlFor="shippingTheSameAsBilling">
            Shipping is the same as billing
          </Label>
        </div>

        {!billingAddressSameAsShipping && (
          <>
            {shippingAddress ? (
              <div>
                <AddressItem
                  actions={
                    <Button
                      variant={"outline"}
                      disabled={isProcessingPayment}
                      onClick={(e) => {
                        e.preventDefault();
                        setShippingAddress(undefined);
                      }}
                    >
                      Remove
                    </Button>
                  }
                  address={shippingAddress}
                />
              </div>
            ) : user ? (
              <CheckoutAddresses
                heading="Shipping address"
                description="Please select a shipping address."
                setAddress={setShippingAddress}
              />
            ) : (
              <CreateAddressModal
                callback={(address) => {
                  setShippingAddress(address);
                }}
                disabled={!email || Boolean(emailEditable)}
                skipSubmission={true}
              />
            )}
          </>
        )}

        {canGoToPayment && (
          <CheckoutForm
            cart={cart}
            user={user}
            customerEmail={email}
            billingAddress={billingAddress}
            shippingAddress={shippingAddress}
            billingAddressSameAsShipping={billingAddressSameAsShipping}
            setProcessingPayment={setProcessingPayment}
          />
        )}
      </div>

      {!cartIsEmpty && (
        <div className="basis-full lg:basis-1/3 lg:pl-8 p-8 border-none bg-primary/5 flex flex-col gap-8 rounded-lg">
          <h2 className="text-3xl font-medium">Your cart</h2>
          {cart?.items?.map((item, index) => {
            if (typeof item.product === "object" && item.product) {
              const {
                product,
                product: { id, meta, title, gallery },
                quantity,
                variant,
              } = item;

              if (!quantity) return null;

              let image = gallery?.[0]?.image || meta?.image;
              let price = product?.priceInUSD;

              const isVariant = Boolean(variant) && typeof variant === "object";

              if (isVariant) {
                price = variant?.priceInUSD;

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

                if (imageVariant && typeof imageVariant.image !== "string") {
                  image = imageVariant.image;
                }
              }

              return (
                <div className="flex items-start gap-4" key={index}>
                  <div className="flex items-stretch justify-stretch h-20 w-20 p-2 rounded-lg border">
                    <div className="relative w-full h-full">
                      {image && typeof image !== "string" && (
                        <Media
                          className=""
                          fill
                          imgClassName="rounded-lg"
                          resource={image}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex grow justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-lg">{title}</p>
                      {variant && typeof variant === "object" && (
                        <p className="text-sm font-mono text-primary/50 tracking-[0.1em]">
                          {variant.options
                            ?.map((option) => {
                              if (typeof option === "object")
                                return option.label;
                              return null;
                            })
                            .join(", ")}
                        </p>
                      )}
                      <div>
                        {"x"}
                        {quantity}
                      </div>
                    </div>

                    {typeof price === "number" && <Price amount={price} />}
                  </div>
                </div>
              );
            }
            return null;
          })}
          <hr />
          <div className="flex justify-between items-center gap-2">
            <span className="uppercase">Total</span>{" "}
            <Price
              className="text-3xl font-medium"
              amount={cart.subtotal || 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};
