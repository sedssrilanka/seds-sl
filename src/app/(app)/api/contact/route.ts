import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactFormSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_for_build");

// Email configuration from environment variables
const EMAIL_CONFIG = {
  from: `${process.env.ORG_NAME || "SEDS Sri Lanka"} <${process.env.FROM_EMAIL || "noreply@seds-sl.org"}>`,
  to: process.env.CONTACT_EMAIL || "contact@seds-sl.org",
  orgName: process.env.ORG_NAME || "SEDS Sri Lanka",
  websiteUrl: process.env.WEBSITE_URL || "https://seds-sl.org",
};

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "dummy_key_for_build"
    ) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 },
      );
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    const { fullName, email, reasons, message } = validatedData;

    // Create text version for better email client compatibility
    const textContent = `
New Contact Form Submission - ${EMAIL_CONFIG.orgName}

Contact Information:
Name: ${fullName}
Email: ${email}

Reason for Contact:
${reasons.map((reason) => `• ${reason}`).join("\n")}

Message:
${message}

---
This message was sent from the ${EMAIL_CONFIG.orgName} contact form.
Website: ${EMAIL_CONFIG.websiteUrl}
Submitted on: ${new Date().toLocaleString()}

Students for the Exploration & Development of Space
Sri Lanka Chapter
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [EMAIL_CONFIG.to],
      subject: `New Contact Form Submission from ${fullName}`,
      text: textContent,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #000000;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="text-align: center; padding: 30px 0 40px 0;">
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
                        New Contact Form Submission
                      </h1>
                      <p style="color: #f97316; font-size: 16px; margin: 8px 0 0 0; font-weight: 600;">
                        ${EMAIL_CONFIG.orgName}
                      </p>
                    </td>
                  </tr>

                  <!-- Contact Information Card -->
                  <tr>
                    <td style="background-color: #111111; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Contact Information</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="color: #f97316; font-weight: 600; width: 60px; padding: 6px 0;">Name:</td>
                                <td style="color: #ffffff; font-weight: 600; padding: 6px 0;">${fullName}</td>
                              </tr>
                              <tr>
                                <td style="color: #f97316; font-weight: 600; width: 60px; padding: 6px 0;">Email:</td>
                                <td style="padding: 6px 0;">
                                  <a href="mailto:${email}" style="color: #f97316; text-decoration: none; font-weight: 600;">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Reason for Contact Card -->
                  <tr>
                    <td style="background-color: #111111; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Reason for Contact</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="8">
                              <tr>
                                ${reasons
                                  .map(
                                    (reason) => `
                                  <td style="background-color: #f97316; color: #000000; padding: 8px 16px; border-radius: 24px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 8px;">
                                    ${reason}
                                  </td>
                                `,
                                  )
                                  .join("")}
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Message Card -->
                  <tr>
                    <td style="background-color: #111111; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Message</h2>
                          </td>
                        </tr>
                        <tr>
                          <td style="background-color: #000000; border-radius: 12px; padding: 20px;">
                            <p style="color: #ffffff; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 15px; font-weight: 500;">${message}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="text-align: center; padding: 24px 0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="text-align: center; margin-bottom: 16px;">
                            <a href="${EMAIL_CONFIG.websiteUrl}" style="display: inline-block; background-color: #f97316; color: #000000; text-decoration: none; padding: 14px 28px; border-radius: 24px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                              Visit Our Website
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align: center;">
                            <p style="color: #f97316; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                              This message was sent from the ${EMAIL_CONFIG.orgName} contact form
                            </p>
                            <p style="color: #f97316; font-size: 12px; margin: 0; font-weight: 500;">
                              Submitted on ${new Date().toLocaleString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  timeZoneName: "short",
                                },
                              )}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- SEDS Branding -->
                  <tr>
                    <td style="text-align: center; margin-top: 32px; padding: 24px; background-color: #111111; border-radius: 16px;">
                      <p style="color: #f97316; font-size: 14px; margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                        Students for the Exploration & Development of Space
                      </p>
                      <p style="color: #f97316; font-size: 12px; margin: 4px 0 0 0; font-weight: 600;">
                        Sri Lanka Chapter
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
