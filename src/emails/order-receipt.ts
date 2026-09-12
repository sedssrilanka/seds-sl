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
    <p style="margin-top: 0; font-size: 15px; color: #ffffff;">
      Hello <strong>${customerName}</strong>,
    </p>
    <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 24px;">
      Thank you for your order! We have received your purchase details and our merchandising team is currently reviewing your payment verification slip.
    </p>

    <!-- Order Summary Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 12px;">
        Order Details
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 6px 0; color: #a1a1aa; font-size: 13px;">Item Ordered:</td>
          <td style="padding: 6px 0; color: #ffffff; font-weight: 600; font-size: 14px; text-align: right;">${productName}</td>
        </tr>
        ${
          totalAmount > 0
            ? `<tr>
          <td style="padding: 6px 0; color: #a1a1aa; font-size: 13px;">Total Amount:</td>
          <td style="padding: 6px 0; color: #34d399; font-weight: 700; font-size: 15px; text-align: right;">Rs. ${totalAmount.toLocaleString()}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 6px 0; color: #a1a1aa; font-size: 13px;">Delivery Address:</td>
          <td style="padding: 6px 0; color: #ffffff; font-size: 13px; text-align: right;">${shippingAddress}, ${city}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #a1a1aa; font-size: 13px;">Fulfillment Status:</td>
          <td style="padding: 6px 0; text-align: right;">
            <span style="display: inline-block; background-color: #451a03; color: #fbbf24; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; border: 1px solid #d97706;">
              Pending Verification
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Info Box -->
    <div style="border-left: 3px solid #3b82f6; background-color: #18181b; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 13px; color: #d4d4d8; line-height: 1.5;">
        You will receive another update with courier tracking information as soon as your package has been packed and dispatched.
      </p>
    </div>
  `;

  return renderBaseEmail({
    title: `Order Received: ${productName} | SEDS Sri Lanka`,
    preheader: `Thank you for your order of ${productName}.`,
    badge: { text: "Store Order", variant: "warning" },
    heading: "Order Received & In Review",
    subheading: "Thank you for supporting student space initiatives and student-led space research.",
    contentHtml,
    footerNote: "All merchandise proceeds directly support SEDS Sri Lanka student projects.",
  });
}
