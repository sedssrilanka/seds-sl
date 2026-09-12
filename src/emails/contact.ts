import { renderBaseEmail } from "./base";

export interface ContactEmailProps {
  fullName: string;
  email: string;
  reasons: string[];
  message: string;
}

export function renderContactEmail({
  fullName,
  email,
  reasons,
  message,
}: ContactEmailProps): string {
  const contentHtml = `
    <!-- Contact Info Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 12px;">
        Sender Details
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 4px 0; color: #a1a1aa; font-size: 13px; width: 100px;">Full Name:</td>
          <td style="padding: 4px 0; color: #ffffff; font-weight: 600; font-size: 14px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #a1a1aa; font-size: 13px;">Email Address:</td>
          <td style="padding: 4px 0; font-size: 14px;">
            <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; font-weight: 500;">${email}</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Reason Badges -->
    <div style="margin-bottom: 20px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px;">
        Inquiry Category
      </div>
      <div>
        ${reasons
          .map(
            (r) => `
          <span style="display: inline-block; background-color: #27272a; color: #f4f4f5; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 6px; margin-right: 6px; margin-bottom: 6px; border: 1px solid #3f3f46;">
            ${r}
          </span>
        `,
          )
          .join("")}
      </div>
    </div>

    <!-- Message Block -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px;">
        Message Body
      </div>
      <div style="color: #f4f4f5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${message}
      </div>
    </div>
  `;

  return renderBaseEmail({
    title: `New Contact Submission: ${fullName}`,
    preheader: `New message from ${fullName} (${reasons.join(", ")})`,
    badge: { text: "Contact Form", variant: "primary" },
    heading: "New Contact Submission",
    subheading: "A new message was submitted via the SEDS Sri Lanka contact portal.",
    contentHtml,
    footerNote: "You can reply directly to this email to contact the sender.",
  });
}
