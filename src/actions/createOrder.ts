"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Cart, Address, User } from "@/payload-types";

export async function createOrder(data: {
  cart: Cart;
  user?: User | null;
  email?: string;
  shippingAddress?: Partial<Address>;
  paymentMethod: "bank_transfer" | "cod";
  total: number;
}) {
  const payload = await getPayload({ config: configPromise });
  const { cart, user, email, shippingAddress, paymentMethod, total } = data;

  if (!cart || !cart.items || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Prepare items
  const items = cart.items.map((item) => ({
    product: typeof item.product === "object" ? item.product?.id : item.product,
    quantity: item.quantity,
    variant: typeof item.variant === "object" ? item.variant?.id : item.variant,
  }));

  try {
    const order = await payload.create({
      collection: "orders",
      data: {
        items,
        amount: total,
        currency: "USD",
        status: "processing", // Default status
        customer: user?.id || null,
        customerEmail: email || user?.email,
        shippingAddress: shippingAddress as any,
        // Using transactions to store payment method metadata if possible, but Transaction requires stricter types.
        // We'll skip creating a transaction record for now as it's complex without the plugin helpers.
      },
    });

    // Clear cart
    if (cart.id) {
      await payload.update({
        collection: "carts",
        id: cart.id,
        data: {
          items: [],
          subtotal: 0,
        },
      });
    }

    return { success: true, orderID: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
