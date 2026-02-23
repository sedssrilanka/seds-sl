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
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "cod">(
    "bank_transfer",
  );
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setProcessingPayment(true);
      setError(null);

      try {
        const result = await createOrder({
          cart,
          user,
          email: customerEmail || user?.email,
          shippingAddress: billingAddressSameAsShipping
            ? billingAddress
            : shippingAddress,
          paymentMethod,
          total: cart.subtotal || 0,
        });

        if (result.success && result.orderID) {
          toast.success("Order placed successfully!");
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
      setProcessingPayment,
      router,
    ],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="font-medium text-3xl mb-4">Payment Method</h2>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(v: "bank_transfer" | "cod") => setPaymentMethod(v)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank_transfer" id="bank_transfer" />
            <Label htmlFor="bank_transfer">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>
        </RadioGroup>
      </div>

      {error && <Message error={error} />}

      <div className="mt-4 flex gap-4">
        <Button disabled={isLoading} type="submit" variant="default">
          {isLoading ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </form>
  );
};
