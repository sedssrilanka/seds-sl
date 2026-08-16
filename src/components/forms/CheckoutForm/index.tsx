"use client";

import { Message } from "@/components/Message";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useCart } from "@payloadcms/plugin-ecommerce/client/react";
import type { Address, Cart, User } from "@/payload-types";
import { createOrder } from "@/actions/createOrder";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import posthog from "posthog-js";
import {
  Landmark,
  Banknote,
  ShieldCheck,
  Loader2,
  Upload,
  FileCheck,
  X,
  Building,
} from "lucide-react";

type Props = {
  cart: Cart;
  user?: User | null;
  customerEmail?: string;
  billingAddress?: Partial<Address>;
  shippingAddress?: Partial<Address>;
  billingAddressSameAsShipping: boolean;
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckoutForm: React.FC<Props> = ({
  cart,
  user,
  customerEmail,
  billingAddress,
  shippingAddress,
  billingAddressSameAsShipping,
  setProcessingPayment,
}) => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "cod">(
    "bank_transfer",
  );
  const [proofFile, setProofFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (paymentMethod === "bank_transfer" && !proofFile) {
        setError("Please upload your bank transfer slip or payment proof.");
        toast.error("Please attach your bank transfer payment proof.");
        return;
      }

      setIsLoading(true);
      setProcessingPayment(true);

      try {
        setLoadingStep("Submitting order & attaching payment receipt...");
        const formData = new FormData();
        formData.append("cart", JSON.stringify(cart));
        if (user) formData.append("user", JSON.stringify(user));
        if (customerEmail || user?.email)
          formData.append("email", customerEmail || user?.email || "");

        const activeShipping = billingAddressSameAsShipping
          ? billingAddress
          : shippingAddress;
        if (activeShipping)
          formData.append("shippingAddress", JSON.stringify(activeShipping));
        if (billingAddress)
          formData.append("billingAddress", JSON.stringify(billingAddress));

        formData.append("paymentMethod", paymentMethod);
        formData.append("total", String(cart.subtotal || 0));

        if (proofFile) {
          formData.append("paymentProofFile", proofFile);
        }

        const result = await createOrder(formData);

        if (result.success && result.orderID) {
          posthog.capture("order_placed", {
            order_id: result.orderID,
            payment_method: paymentMethod,
            item_count: cart.items?.length ?? 0,
            order_total: cart.subtotal ?? 0,
          });
          toast.success("Order & Payment Proof submitted successfully!");
          router.push(`/orders/${result.orderID}`);
        } else {
          throw new Error("Failed to create order");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
        setProcessingPayment(false);
      }
    },
    [
      cart,
      user,
      customerEmail,
      billingAddress,
      shippingAddress,
      billingAddressSameAsShipping,
      paymentMethod,
      proofFile,
      setProcessingPayment,
      router,
    ],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 pt-4 border-t border-border"
    >
      <div>
        <h3 className="text-xl font-semibold mb-1 text-foreground">
          Payment Method
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred payment method and attach transfer proof to
          submit your order.
        </p>

        <RadioGroup
          value={paymentMethod}
          onValueChange={(v: "bank_transfer" | "cod") => setPaymentMethod(v)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        >
          {/* biome-ignore lint/a11y/useSemanticElements: card container for radio selection */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setPaymentMethod("bank_transfer")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPaymentMethod("bank_transfer");
              }
            }}
            className={`relative rounded-xl border p-4 cursor-pointer transition-all flex items-start gap-3 bg-card ${
              paymentMethod === "bank_transfer"
                ? "border-primary ring-1 ring-primary/20 bg-primary/5 dark:bg-primary/10"
                : "border-border hover:border-border/80"
            }`}
          >
            <RadioGroupItem
              value="bank_transfer"
              id="bank_transfer"
              className="mt-1"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Landmark className="size-4 text-muted-foreground" />
                <Label
                  htmlFor="bank_transfer"
                  className="cursor-pointer font-medium"
                >
                  Bank Transfer
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Deposit or online transfer with payment slip attachment required
                for verification.
              </p>
            </div>
          </div>
          <div className="relative rounded-xl border border-border/60 p-4 opacity-60 cursor-not-allowed flex items-start gap-3 bg-muted/20">
            <RadioGroupItem value="cod" id="cod" disabled className="mt-1" />
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-2 font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Banknote className="size-4 text-muted-foreground/70" />
                  <Label
                    htmlFor="cod"
                    className="cursor-not-allowed font-medium text-muted-foreground"
                  >
                    Cash on Delivery
                  </Label>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
                  Unavailable
                </span>
              </div>
              <p className="text-xs text-muted-foreground/80">
                Cash on delivery is currently disabled. Please use Bank
                Transfer.
              </p>
            </div>
          </div>
        </RadioGroup>

        {/* Bank Transfer Details & Deposit Slip Upload Box */}
        {paymentMethod === "bank_transfer" && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border pb-3">
              <Building className="size-4 text-muted-foreground" />
              <span>Bank Account Deposit Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/40 p-3 rounded-lg border border-border">
              <div>
                <span className="text-muted-foreground block">Bank Name</span>
                <span className="font-semibold text-foreground">
                  Commercial Bank of Ceylon
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">
                  Account Name
                </span>
                <span className="font-semibold text-foreground">
                  SEDS Sri Lanka
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">
                  Account Number
                </span>
                <span className="font-mono font-semibold text-foreground">
                  1000 8945 2214
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Branch</span>
                <span className="font-semibold text-foreground">
                  Colombo Main Branch
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-sm font-medium text-foreground flex items-center justify-between">
                <span>Upload Payment Slip / Receipt Proof*</span>
                <span className="text-xs text-muted-foreground font-normal">
                  (JPG, PNG, PDF max 10MB)
                </span>
              </Label>

              {proofFile ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-primary/30 bg-primary/5 dark:bg-primary/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileCheck className="size-5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {proofFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(proofFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setProofFile(null)}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ) : (
                <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
                  <Upload className="size-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-foreground mb-0.5">
                    Click to upload payment slip
                  </span>
                  <span className="text-xs text-muted-foreground">
                    or drag and drop your receipt file here
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <Message error={error} />}

      <div className="pt-2">
        <Button
          disabled={
            isLoading || (paymentMethod === "bank_transfer" && !proofFile)
          }
          type="submit"
          size="lg"
          className="w-full sm:w-auto h-12 px-8 text-base gap-2 font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>{loadingStep || "Processing Order..."}</span>
            </>
          ) : (
            <>
              <ShieldCheck className="size-5" />
              <span>Submit Order & Payment Proof</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
