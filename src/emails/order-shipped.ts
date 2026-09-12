import { renderBaseEmail } from "./base";

export interface OrderShippedEmailProps {
  customerName: string;
  productName: string;
  trackingNumber?: string;
}

export function renderOrderShippedEmail({
  customerName,
  productName,
  trackingNumber,
}: OrderShippedEmailProps): string {
  const contentHtml = `
    <p style="margin-top: 0; font-size: 15px; color: #ffffff;">
      Hello <strong>${customerName}</strong>,
    </p>
    <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 24px;">
      Great news! We have verified your payment for <strong>${productName}</strong> and your package is now dispatched.
    </p>

    <!-- Shipping Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 6px 0; color: #a1a1aa; font-size: 13px;">Item:</td>
          <td style="padding: 6px 0; color: #ffffff; font-weight: 600; font-size: 14px; text-align: right;">${productName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #a1a1aa; font-size: 13px;">Delivery Status:</td>
          <td style="padding: 6px 0; text-align: right;">
            <span style="display: inline-block; background-color: #064e3b; color: #34d399; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; border: 1px solid #059669;">
              Dispatched / Shipped
            </span>
          </td>
        </tr>
        ${trackingNumber
      ? `
        <tr>
          <td style="padding: 10px 0 6px 0; color: #a1a1aa; font-size: 13px;">Tracking Number:</td>
          <td style="padding: 10px 0 6px 0; text-align: right;">
            <span style="font-family: monospace; font-size: 15px; font-weight: 700; color: #60a5fa; background-color: #172554; padding: 4px 10px; border-radius: 6px; border: 1px solid #2563eb;">
              ${trackingNumber}
            </span>
          </td>
        </tr>
        `
      : ""
    }
      </table>
    </div>

    <p style="font-size: 13px; color: #a1a1aa; line-height: 1.6;">
      Thank you once again for supporting space exploration in Sri Lanka. All profits directly fund student satellite, robotics, and rocketry programs.
    </p>
  `;

  return renderBaseEmail({
    title: `Order Shipped: ${productName} | SEDS Sri Lanka`,
    preheader: `Your order for ${productName} is on the way!`,
    badge: { text: "Dispatched", variant: "success" },
    heading: "Payment Verified & Package Shipped",
    subheading: "Your SEDS Sri Lanka official merchandise has been handed to the courier.",
    contentHtml,
    footerNote: "Reach out to contact@sedssl.org if you have any questions regarding your delivery.",
  });
}
