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
    <!-- Order Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 12px;">
        Order Details
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px; width: 130px;">Item:</td>
          <td style="padding: 5px 0; color: #ffffff; font-weight: 600; font-size: 14px;">${productName}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Total Amount:</td>
          <td style="padding: 5px 0; color: #34d399; font-weight: 700; font-size: 15px;">Rs. ${totalAmount.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Customer:</td>
          <td style="padding: 5px 0; color: #ffffff; font-size: 14px;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Email:</td>
          <td style="padding: 5px 0; font-size: 14px;">
            <a href="mailto:${customerEmail}" style="color: #60a5fa; text-decoration: none;">${customerEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Phone:</td>
          <td style="padding: 5px 0; color: #ffffff; font-size: 14px;">${customerPhone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Shipping Address:</td>
          <td style="padding: 5px 0; color: #ffffff; font-size: 14px;">${shippingAddress}, ${city}</td>
        </tr>
      </table>
    </div>

    ${
      slipUrl
        ? `
    <!-- Slip Button -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 18px; text-align: center;">
      <div style="font-size: 12px; color: #a1a1aa; margin-bottom: 10px;">Payment Slip Uploaded</div>
      <a href="${slipUrl}" target="_blank" style="display: inline-block; padding: 8px 18px; background-color: #3b82f6; color: #ffffff; font-size: 13px; font-weight: 600; border-radius: 6px; text-decoration: none;">
        View Bank Slip Image &rarr;
      </a>
    </div>
    `
        : `
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 14px; color: #71717a; font-size: 13px; text-align: center;">
      No payment slip was uploaded during submission.
    </div>
    `
    }
  `;

  return renderBaseEmail({
    title: `New Store Order: ${productName} (${customerName})`,
    preheader: `New order for ${productName} from ${customerName}`,
    badge: { text: "Store Alert", variant: "primary" },
    heading: "New Store Order Received",
    subheading: "A new customer has submitted an order form via Tally.",
    contentHtml,
    cta: {
      text: "Open Tally Dashboard",
      url: "https://tally.so/forms",
    },
    footerNote: "Verify payment slip against bank statement before dispatching.",
  });
}
