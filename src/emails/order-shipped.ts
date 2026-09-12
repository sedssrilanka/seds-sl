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
    <p style="margin: 0 0 24px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">
      Hi <strong style="color: #ffffff;">${customerName}</strong>, your payment for <strong style="color: #ffffff;">${productName}</strong> has been verified and your package has been handed over to our courier partner.
    </p>

    <!-- Lineless Dispatch Summary List -->
    <div style="margin-bottom: 28px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Item
      </div>
      <div style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 16px;">
        ${productName}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Status
      </div>
      <div style="color: #34d399; font-size: 14px; font-weight: 600; margin-bottom: 16px;">
        Dispatched / In Transit
      </div>

      ${
        trackingNumber
          ? `
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Courier Tracking Number
      </div>
      <div style="color: #ffffff; font-family: monospace; font-size: 16px; font-weight: 700; letter-spacing: 0.04em;">
        ${trackingNumber}
      </div>
      `
          : ""
      }
    </div>

    <p style="margin: 0 0 20px 0; font-size: 13px; color: #82828c; line-height: 1.6;">
      If you have questions about your delivery, reply directly to this email or reach out to us at <a href="mailto:contact@sedssl.org" style="color: #60a5fa; text-decoration: none;">contact@sedssl.org</a>.
    </p>
  `;

  return renderBaseEmail({
    title: `Order Dispatched: ${productName} | SEDS Sri Lanka`,
    preheader: `Your order for ${productName} is on the way!`,
    badge: "Delivery Update",
    heading: "Order Dispatched",
    subheading: "Your package is on its way to your delivery address.",
    contentHtml,
    cta: {
      text: "Contact Support",
      url: "mailto:contact@sedssl.org?subject=Inquiry regarding order delivery",
    },
    footerText: "SEDS Sri Lanka · Official Merchandise",
  });
}
