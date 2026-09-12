import { NextResponse } from "next/server";
import { sendEmail } from "@/utilities/sendEmail";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let fullName = "";
    let email = "";
    let phone = "";
    let chapterOrUniversity = "";
    let observationLocation = "";
    let notes = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "";
      chapterOrUniversity = (formData.get("institution") as string) || "";
      observationLocation = (formData.get("selectedLocation") as string) || "";
      notes = (formData.get("notes") as string) || "";
    } else {
      const body = await req.json();
      fullName = body.fullName || "";
      email = body.email || "";
      phone = body.phone || "";
      chapterOrUniversity = body.institution || body.chapterOrUniversity || "";
      observationLocation = body.selectedLocation || body.observationLocation || "";
      notes = body.notes || "";
    }

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 },
      );
    }

    const registrationCode = `MOON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Send confirmation email to attendee via Resend
    await sendEmail({
      to: email,
      subject: "Registration Confirmed: International Observe the Moon Night | SEDS Sri Lanka",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4f46e5;">Welcome to International Observe the Moon Night!</h2>
          <p>Hi ${fullName},</p>
          <p>Your registration for the upcoming SEDS Sri Lanka Observe the Moon Night observation has been received and confirmed.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Registration Code:</strong> <span style="font-family: monospace; font-weight: bold; color: #4f46e5;">${registrationCode}</span></p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Institution / Chapter:</strong> ${chapterOrUniversity || "General Public"}</p>
            <p><strong>Location:</strong> ${observationLocation || "Main Center"}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
          </div>
          <p>We look forward to observing the lunar surface together!</p>
          <p>Clear skies,<br><strong>SEDS Sri Lanka Team</strong></p>
        </div>
      `,
    });

    // Notify team via Resend
    const contactEmail = process.env.CONTACT_EMAIL || "contact@sedssl.org";
    await sendEmail({
      to: contactEmail,
      subject: `New Moon Night Registration: ${fullName} (${registrationCode})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h3 style="color: #1e1b4b;">New Event Registration</h3>
          <p><strong>Registration Code:</strong> ${registrationCode}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "None"}</p>
          <p><strong>Institution:</strong> ${chapterOrUniversity || "None"}</p>
          <p><strong>Location:</strong> ${observationLocation || "Main Center"}</p>
          <p><strong>Notes:</strong> ${notes || "None"}</p>
        </div>
      `,
    }).catch((err) => console.warn("Admin notification email error:", err));

    return NextResponse.json({
      success: true,
      message: "Registration successful!",
      registrationCode,
      registration: {
        code: registrationCode,
        fullName,
        email,
        observationLocation,
      },
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process registration" },
      { status: 500 },
    );
  }
}
