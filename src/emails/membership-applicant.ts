import { renderBaseEmail } from "./base";

export interface MembershipApplicantEmailProps {
  fullName: string;
  email: string;
  institution: string;
  chapter?: string;
}

export function renderMembershipApplicantEmail({
  fullName,
  institution,
  chapter,
}: MembershipApplicantEmailProps): string {
  const contentHtml = `
    <p style="margin: 0 0 24px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">
      Hi <strong style="color: #ffffff;">${fullName}</strong>, thank you for your interest in joining SEDS Sri Lanka! We have received your membership application and statement of purpose.
    </p>

    <!-- Lineless Application Details Summary -->
    <div style="margin-bottom: 28px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Applicant
      </div>
      <div style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 16px;">
        ${fullName}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Institution / University
      </div>
      <div style="color: #f4f4f5; font-size: 14px; margin-bottom: 16px;">
        ${institution}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Chapter Selection
      </div>
      <div style="color: #f4f4f5; font-size: 14px; margin-bottom: 16px;">
        ${chapter || "Independent / General Member"}
      </div>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; font-family: monospace; margin-bottom: 4px;">
        Application Status
      </div>
      <div style="color: #fbbf24; font-size: 14px; font-weight: 500;">
        Under Committee Review
      </div>
    </div>

    <p style="margin: 0 0 20px 0; font-size: 13px; color: #82828c; line-height: 1.6;">
      Our executive committee and chapter leads will review your application details and contact you via email regarding the induction process and upcoming division projects.
    </p>
  `;

  return renderBaseEmail({
    title: "Membership Application Received | SEDS Sri Lanka",
    preheader: `Thank you for applying to SEDS Sri Lanka, ${fullName}`,
    badge: "Membership Application",
    heading: "Application Received",
    subheading: "Thank you for taking the first step into space exploration.",
    contentHtml,
    cta: {
      text: "Explore SEDS Projects",
      url: "https://sedssl.org/projects",
    },
    footerText: "SEDS Sri Lanka · Students for the Exploration and Development of Space",
  });
}
