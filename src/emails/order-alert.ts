import { renderBaseEmail } from "./base";

export interface OrderAlertEmailProps {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productName: string;
  totalAmount: number;
  shippingAddress: string;
  city: string;
  slipUrl?: string | null;
}

export function renderOrderAlertEmail({
  customerName,
  customerEmail,
  customerPhone,
  productName,
  totalAmount,
  shippingAddress,
  city,
  slipUrl,
}: OrderAlertEmailProps): string {
  const contentHtml = `
    <p style="margin: 0 0 24px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">
      A customer has submitted a new merchandise order via Tally.
    </p>

    <!-- Lineless Order Alert List -->
    <div style="margin-bottom: 28px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Product
      </div>
      <div style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 16px;">
        ${productName}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Total Amount
      </div>
      <div style="color: #ffffff; font-size: 16px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
        Rs. ${totalAmount.toLocaleString()}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Customer
      </div>
      <div style="color: #ffffff; font-size: 14px; font-weight: 500; margin-bottom: 16px;">
        ${customerName} &bull; <a href="mailto:${customerEmail}" style="color: #60a5fa; text-decoration: none;">${customerEmail}</a> ${customerPhone ? `&bull; ${customerPhone}` : ""}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Shipping Address
      </div>
      <div style="color: #d4d4d8; font-size: 14px; margin-bottom: 16px;">
        ${shippingAddress}, ${city}
      </div>

      ${
        slipUrl
          ? `
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Payment Slip
      </div>
      <div style="margin-bottom: 16px;">
        <a href="${slipUrl}" target="_blank" style="color: #60a5fa; text-decoration: none; font-weight: 500; font-size: 14px;">
          View Uploaded Bank Slip &rarr;
        </a>
      </div>
      `
          : ""
      }
    </div>
  `;

  return renderBaseEmail({
    title: `New Order: ${productName} (${customerName})`,
    preheader: `New order for ${productName} from ${customerName}`,
    badge: "Store Alert",
    heading: "New Store Order",
    subheading: `${productName} · Rs. ${totalAmount.toLocaleString()}`,
    contentHtml,
    cta: {
      text: "Open Tally Dashboard",
      url: "https://tally.so/forms",
    },
    footerText: "SEDS Sri Lanka · Merchandising Operations",
  });
}
