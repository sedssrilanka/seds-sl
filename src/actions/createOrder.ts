"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Cart, Address, User } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";

export async function createOrder(formData: FormData) {
  const payload = await getPayload({ config: configPromise });

  const cartRaw = formData.get("cart") as string;
  const userRaw = formData.get("user") as string;
  const email = (formData.get("email") as string) || "";
  const shippingAddressRaw = formData.get("shippingAddress") as string;
  const billingAddressRaw = formData.get("billingAddress") as string;
  const paymentMethod = (formData.get("paymentMethod") as "bank_transfer" | "cod") || "bank_transfer";
  const total = Number(formData.get("total") || 0);
  const proofFile = formData.get("paymentProofFile") as File | null;

  const cart: Cart = cartRaw ? JSON.parse(cartRaw) : null;
  const user: User | null = userRaw ? JSON.parse(userRaw) : null;
  const shippingAddress: Partial<Address> = shippingAddressRaw ? JSON.parse(shippingAddressRaw) : {};
  const billingAddress: Partial<Address> = billingAddressRaw ? JSON.parse(billingAddressRaw) : {};

  const customerEmail = email || user?.email;
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
    // 1. Create Order with status 'pending'
    const order = await payload.create({
      collection: "orders",
      data: {
        items,
        amount: total,
        currency: "LKR",
        status: "pending",
        paymentMethod: paymentMethod || "bank_transfer",
        customer: user?.id || null,
        customerEmail: customerEmail,
        shippingAddress: (shippingAddress || billingAddress) as any,
      },
    });

    // 2. Create Transaction record linked to order
    let transactionId: number | null = null;
    try {
      const transaction = await payload.create({
        collection: "transactions",
        data: {
          order: order.id,
          cart: cart.id,
          amount: total,
          currency: "LKR",
          status: "pending",
          customer: user?.id || null,
          customerEmail: customerEmail,
          billingAddress: (billingAddress || shippingAddress) as any,
          items,
        },
      });
      transactionId = transaction.id;

      // Update Order with transaction reference
      await payload.update({
        collection: "orders",
        id: order.id,
        data: {
          transactions: [transaction.id],
        },
      });
    } catch (txnError) {
      console.warn("Failed to create transaction record:", txnError);
    }

    // 3. Clear cart
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

    // 4. Prepare email attachment directly from memory buffer
    const adminAttachments: any[] = [];
    if (proofFile && proofFile.size > 0) {
      try {
        const arrayBuffer = await proofFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        adminAttachments.push({
          filename: proofFile.name || `payment-proof-order-${order.id}.png`,
          content: buffer,
        });
      } catch (fileErr) {
        console.warn("Failed to buffer payment proof attachment:", fileErr);
      }
    }

    // 5. Send Admin Notification Email with bank slip attachment
    const siteUrl = getServerSideURL();
    const adminEmail =
      process.env.ADMIN_EMAIL ||
      process.env.CONTACT_EMAIL ||
      process.env.FROM_EMAIL ||
      "admin@seds-sl.org";

    const itemsSummary = cart.items
      .map((i) => {
        const title = typeof i.product === "object" ? i.product?.title : "Product";
        return `• ${title} x ${i.quantity}`;
      })
      .join("<br/>");

    try {
      await payload.sendEmail({
        to: adminEmail,
        subject: `[Action Required] New Order #${order.id} - Payment Proof Attached`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #111; margin-top: 0;">New Bank Transfer Order Received</h2>
            <p>A new order has been placed with a bank transfer slip attached to this email.</p>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <p style="margin: 4px 0;"><strong>Order ID:</strong> #${order.id}</p>
              <p style="margin: 4px 0;"><strong>Transaction ID:</strong> ${transactionId ? `#${transactionId}` : "N/A"}</p>
              <p style="margin: 4px 0;"><strong>Customer Email:</strong> ${customerEmail}</p>
              <p style="margin: 4px 0;"><strong>Total Amount:</strong> Rs. ${total.toLocaleString()}</p>
              <p style="margin: 4px 0;"><strong>Payment Method:</strong> Bank Transfer</p>
            </div>

            <h3>Order Items</h3>
            <p>${itemsSummary}</p>

            <p style="margin-top: 15px; color: #555;">📎 <em>Bank Transfer Receipt proof is attached directly to this email.</em></p>

            <div style="margin-top: 25px;">
              <a href="${siteUrl}/admin/collections/orders/${order.id}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Review & Approve Order in Admin Panel</a>
            </div>
          </div>
        `,
        attachments: adminAttachments.length > 0 ? adminAttachments : undefined,
      });
    } catch (adminEmailError) {
      console.error("Failed to send admin notification email:", adminEmailError);
    }

    // 6. Send Customer Confirmation Email
    if (customerEmail) {
      try {
        await payload.sendEmail({
          to: customerEmail,
          subject: `Payment Proof Received - Order #${order.id} Under Review`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #111; margin-top: 0;">We've Received Your Order & Payment Proof!</h2>
              <p>Hi,</p>
              <p>Thank you for shopping with SEDS Sri Lanka! We have received your order <strong>#${order.id}</strong> along with your bank transfer receipt.</p>
              <p>Our verification team is reviewing your payment. You will receive an automated email notification as soon as your order is approved and marked for processing.</p>

              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 4px 0;"><strong>Order ID:</strong> #${order.id}</p>
                <p style="margin: 4px 0;"><strong>Total Amount:</strong> Rs. ${total.toLocaleString()}</p>
                <p style="margin: 4px 0;"><strong>Status:</strong> Pending Review</p>
              </div>

              <h3>Order Items</h3>
              <p>${itemsSummary}</p>

              <div style="margin-top: 25px;">
                <a href="${siteUrl}/orders/${order.id}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Check Order Status</a>
              </div>
            </div>
          `,
        });
      } catch (customerEmailError) {
        console.error("Failed to send customer confirmation email:", customerEmailError);
      }
    }

    return { success: true, orderID: order.id, transactionID: transactionId };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
