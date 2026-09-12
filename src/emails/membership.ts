import { renderBaseEmail } from "./base";

export interface MembershipEmailProps {
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  chapter?: string;
  statement: string;
}

export function renderMembershipEmail({
  fullName,
  email,
  phone,
  institution,
  chapter,
  statement,
}: MembershipEmailProps): string {
  const contentHtml = `
    <p style="margin: 0 0 24px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">
      A new student membership application has been submitted for review.
    </p>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Applicant
      </div>
      <div style="color: #ffffff; font-size: 14px; font-weight: 500; margin-bottom: 16px;">
        ${fullName} &bull; <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a> ${phone ? `&bull; ${phone}` : ""}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Institution & Chapter
      </div>
      <div style="color: #f4f4f5; font-size: 14px; margin-bottom: 16px;">
        ${institution} · <span style="color: #a1a1aa;">${chapter || "Independent / General"}</span>
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 6px;">
        Statement of Purpose
      </div>
      <div style="color: #ededed; font-size: 14px; line-height: 1.65; white-space: pre-wrap; padding-left: 12px; border-left: 2px solid #27272a;">${statement}</div>
    </div>
  `;

  return renderBaseEmail({
    title: `Membership Application: ${fullName}`,
    preheader: `New membership application from ${fullName} (${institution})`,
    badge: "Membership",
    heading: "Membership Application",
    subheading: `${fullName} · ${institution}`,
    contentHtml,
    cta: {
      text: "Contact Applicant",
      url: `mailto:${email}?subject=SEDS Sri Lanka Membership Application - ${fullName}`,
    },
    footerText: "SEDS Sri Lanka · Executive Committee",
  });
}
