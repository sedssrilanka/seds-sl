import { renderBaseEmail } from "./base";

export interface OrderReceiptEmailProps {
  customerName: string;
  customerEmail: string;
  productName: string;
  totalAmount: number;
  shippingAddress: string;
  city: string;
}

export function renderOrderReceiptEmail({
  customerName,
  productName,
  totalAmount,
  shippingAddress,
  city,
}: OrderReceiptEmailProps): string {
  const contentHtml = `
    <p style="margin: 0 0 24px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">
      Hi <strong style="color: #ffffff;">${customerName}</strong>, thank you for supporting student space initiatives in Sri Lanka! We have received your order details and are verifying your payment slip.
    </p>

    <!-- Lineless Order Summary List -->
    <div style="margin-bottom: 28px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Item
      </div>
      <div style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 16px;">
        ${productName}
      </div>

      ${
        totalAmount > 0
          ? `
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Total Amount
      </div>
      <div style="color: #ffffff; font-size: 16px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
        Rs. ${totalAmount.toLocaleString()}
      </div>
      `
          : ""
      }

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Delivery Address
      </div>
      <div style="color: #d4d4d8; font-size: 14px; margin-bottom: 16px;">
        ${shippingAddress}, ${city}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Status
      </div>
      <div style="color: #fbbf24; font-size: 14px; font-weight: 500;">
        Payment Verification Pending
      </div>
    </div>

    <p style="margin: 0 0 20px 0; font-size: 13px; color: #82828c; line-height: 1.6;">
      Once your payment slip is verified, your package will be prepared for delivery and you will receive a follow-up email with courier tracking information.
    </p>
  `;

  return renderBaseEmail({
    title: `Order Received: ${productName} | SEDS Sri Lanka`,
    preheader: `Thank you for your order of ${productName}`,
    badge: "Official Store",
    heading: "Order Acknowledgment",
    subheading: "Your merchandise purchase details have been recorded.",
    contentHtml,
    cta: {
      text: "Visit SEDS Store",
      url: "https://sedssl.org/shop",
    },
    footerText: "SEDS Sri Lanka · All proceeds fund student aerospace programs",
  });
}
