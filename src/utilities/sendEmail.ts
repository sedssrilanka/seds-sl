import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from,
}: SendEmailOptions) {
  const fromAddress =
    from || process.env.FROM_EMAIL || "SEDS Sri Lanka <noreply@sedssl.org>";

  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY not configured. Email skipped in development.",
      );
      return { success: false, message: "No API key configured" };
    }

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html: html || text || "",
      text: text,
    });

    if (error) {
      console.error("Resend error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}
