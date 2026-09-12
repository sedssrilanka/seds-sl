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
    <!-- Applicant Information Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 12px;">
        Applicant Profile
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px; width: 120px;">Full Name:</td>
          <td style="padding: 5px 0; color: #ffffff; font-weight: 600; font-size: 14px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Email:</td>
          <td style="padding: 5px 0; font-size: 14px;">
            <a href="mailto:${email}" style="color: #c084fc; text-decoration: none; font-weight: 500;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Phone Number:</td>
          <td style="padding: 5px 0; color: #ffffff; font-size: 14px;">${phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Institution:</td>
          <td style="padding: 5px 0; color: #ffffff; font-size: 14px;">${institution}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #a1a1aa; font-size: 13px;">Preferred Chapter:</td>
          <td style="padding: 5px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${chapter || "Independent"}</td>
        </tr>
      </table>
    </div>

    <!-- Statement of Purpose -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;">
      <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px;">
        Statement of Purpose
      </div>
      <div style="color: #f4f4f5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${statement}
      </div>
    </div>
  `;

  return renderBaseEmail({
    title: `New Membership Application: ${fullName}`,
    preheader: `Membership application from ${fullName} (${institution})`,
    badge: { text: "Membership", variant: "purple" },
    heading: "New Membership Application",
    subheading: "A student or researcher has applied to join SEDS Sri Lanka.",
    contentHtml,
    footerNote: "Review applicant profile and follow up via email.",
  });
}
