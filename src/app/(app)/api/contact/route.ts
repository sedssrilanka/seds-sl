import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactFormSchema } from "@/lib/schemas/contact";
import { verifyTurnstileToken } from "@/utilities/verifyTurnstile";
import { sendEmail } from "@/utilities/sendEmail";
import { renderContactEmail, renderMembershipEmail } from "@/emails";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(body.turnstileToken);
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: turnstileResult.error || "Bot verification failed" },
          { status: 400 },
        );
      }
    }

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    const { fullName, email, reasons, message } = validatedData;

    const contactEmail = process.env.CONTACT_EMAIL || "contact@sedssl.org";
    const isMembership = reasons.some((r) =>
      r.toLowerCase().includes("membership"),
    );

    let html: string;
    let subject: string;

    if (isMembership) {
      subject = `New Membership Application: ${fullName}`;
      html = renderMembershipEmail({
        fullName,
        email,
        institution:
          reasons.find((r) => r.startsWith("Institution:"))?.replace("Institution:", "").trim() || "General",
        chapter:
          reasons.find((r) => r.startsWith("Chapter:"))?.replace("Chapter:", "").trim() || "Independent",
        statement: message,
      });
    } else {
      subject = `New Contact Form Submission: ${fullName}`;
      html = renderContactEmail({
        fullName,
        email,
        reasons,
        message,
      });
    }

    const { data, error } = await sendEmail({
      to: contactEmail,
      subject,
      html,
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
