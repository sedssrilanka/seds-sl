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
    <p style="margin: 0 0 24px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">
      You received a new message from <strong style="color: #ffffff;">${fullName}</strong>.
    </p>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Sender
      </div>
      <div style="color: #ffffff; font-size: 14px; font-weight: 500; margin-bottom: 16px;">
        ${fullName} &bull; <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Category
      </div>
      <div style="color: #f4f4f5; font-size: 14px; margin-bottom: 16px;">
        ${reasons.join(", ")}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 6px;">
        Message
      </div>
      <div style="color: #ededed; font-size: 14px; line-height: 1.65; white-space: pre-wrap; padding-left: 12px; border-left: 2px solid #27272a;">${message}</div>
    </div>
  `;

  return renderBaseEmail({
    title: `Contact Submission: ${fullName}`,
    preheader: `New message from ${fullName} (${reasons.join(", ")})`,
    badge: "Contact Form",
    heading: "New Contact Message",
    contentHtml,
    cta: {
      text: "Reply via Email",
      url: `mailto:${email}?subject=Re: SEDS Sri Lanka Contact Form Inquiry`,
    },
    footerText: "SEDS Sri Lanka · General Inquiries",
  });
}
