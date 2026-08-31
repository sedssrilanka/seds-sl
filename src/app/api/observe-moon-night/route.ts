import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { generateRegistrationEmail } from "@/utilities/generateRegistrationEmail";
import { verifyTurnstileToken } from "@/utilities/verifyTurnstile";
import { Resend } from "resend";

function generateRegistrationCode(year: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomStr = "";
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `IOTMN-${year}-${randomStr}`;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let fullName = "";
    let email = "";
    let phone = "";
    let institution = "";
    let year = "2026";
    let eventSlug = "observe-the-moon-night-2026";
    let attendanceMode: "in-person" | "virtual" | "watch-party" = "in-person";
    let equipment: "bringing-equipment" | "observer" | "astrophotography" =
      "observer";
    let selectedLocation = "";
    let emergencyContactName = "";
    let emergencyContactPhone = "";
    let emergencyContactRelation = "";
    let mealPreference = "no-meal";
    let dietaryRestrictions = "";
    let notes = "";
    let paymentSlipMediaId: string | number | null = null;
    let isPaidEvent = false;

    const payload = await getPayload({ config: configPromise });

    let turnstileToken: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "";
      institution = (formData.get("institution") as string) || "";
      year = (formData.get("year") as string) || "2026";
      eventSlug =
        (formData.get("eventSlug") as string) || "observe-the-moon-night-2026";
      attendanceMode = ((formData.get("attendanceMode") as string) ||
        "in-person") as "in-person" | "virtual" | "watch-party";
      equipment = ((formData.get("equipment") as string) || "observer") as
        | "bringing-equipment"
        | "observer"
        | "astrophotography";
      selectedLocation = (formData.get("selectedLocation") as string) || "";
      emergencyContactName =
        (formData.get("emergencyContactName") as string) || "";
      emergencyContactPhone =
        (formData.get("emergencyContactPhone") as string) || "";
      emergencyContactRelation =
        (formData.get("emergencyContactRelation") as string) || "";
      mealPreference = (formData.get("mealPreference") as string) || "no-meal";
      dietaryRestrictions =
        (formData.get("dietaryRestrictions") as string) || "";
      notes = (formData.get("notes") as string) || "";
      isPaidEvent = formData.get("isPaid") === "true";
      turnstileToken = (formData.get("turnstileToken") as string) || null;

      const file = formData.get("paymentSlip") as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadedMedia = await payload.create({
          collection: "media",
          data: {
            alt: `Payment receipt from ${fullName}`,
          },
          file: {
            data: buffer,
            name: file.name,
            mimetype: file.type,
            size: file.size,
          },
        });
        paymentSlipMediaId = uploadedMedia.id;
      }
    } else {
      const body = await req.json();
      fullName = body.fullName || "";
      email = body.email || "";
      phone = body.phone || "";
      institution = body.institution || "";
      year = body.year || "2026";
      eventSlug = body.eventSlug || "observe-the-moon-night-2026";
      attendanceMode = (body.attendanceMode || "in-person") as
        | "in-person"
        | "virtual"
        | "watch-party";
      equipment = (body.equipment || "observer") as
        | "bringing-equipment"
        | "observer"
        | "astrophotography";
      selectedLocation = body.selectedLocation || "";
      emergencyContactName = body.emergencyContactName || "";
      emergencyContactPhone = body.emergencyContactPhone || "";
      emergencyContactRelation = body.emergencyContactRelation || "";
      mealPreference = body.mealPreference || "no-meal";
      dietaryRestrictions = body.dietaryRestrictions || "";
      notes = body.notes || "";
      isPaidEvent = Boolean(body.isPaid);
      turnstileToken = body.turnstileToken || null;
    }

    if (turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(turnstileToken);
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: turnstileResult.error || "Bot verification failed" },
          { status: 400 },
        );
      }
    }

    if (
      !fullName ||
      !email ||
      !institution ||
      !emergencyContactName ||
      !emergencyContactPhone
    ) {
      return NextResponse.json(
        {
          error:
            "Full Name, Email, Institution, and Emergency Contact details are required.",
        },
        { status: 400 },
      );
    }

    const registrationCode = generateRegistrationCode(year);

    const createdDoc = await payload.create({
      collection: "moon-registrations",
      data: {
        registrationCode,
        fullName,
        email,
        phone,
        institution,
        selectedLocation,
        year,
        eventSlug,
        attendanceMode,
        equipment,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelation,
        mealPreference: mealPreference as
          | "vegetarian"
          | "non-vegetarian"
          | "vegan"
          | "no-meal"
          | null,
        dietaryRestrictions,
        paymentSlip: paymentSlipMediaId || undefined,
        paymentStatus: isPaidEvent
          ? paymentSlipMediaId
            ? "pending"
            : "n/a"
          : "n/a",
        notes,
        status: "pending",
      },
    });

    // Fetch CMS settings for email details
    let cmsSubject: string | undefined;
    let cmsCustomMessage: string | undefined;
    let eventDate: string | undefined;
    let eventTime: string | undefined;
    let ticketPrice: string | undefined;
    let paymentDetails: string | undefined;
    let agenda: any[] | undefined;

    try {
      const eventQueryResult = await payload.find({
        collection: "observe-moon-events",
        where: {
          slug: {
            equals: eventSlug || "observe-the-moon-night-2026",
          },
        },
        limit: 1,
      });

      if (eventQueryResult.docs && eventQueryResult.docs.length > 0) {
        const eventDoc: any = eventQueryResult.docs[0];
        cmsSubject = eventDoc.confirmationEmailSubject || undefined;
        cmsCustomMessage = eventDoc.confirmationEmailBody || undefined;
        eventDate = eventDoc.eventDate || undefined;
        eventTime = eventDoc.startTime
          ? `${eventDoc.startTime}${eventDoc.endTime ? ` - ${eventDoc.endTime}` : ""}`
          : undefined;
        ticketPrice = eventDoc.isPaid
          ? eventDoc.ticketPrice || undefined
          : undefined;
        paymentDetails = eventDoc.paymentDetails || undefined;
        agenda = eventDoc.agenda || undefined;
      }
    } catch (cmsErr) {
      console.warn(
        "Could not fetch event CMS email template settings:",
        cmsErr,
      );
    }

    // 1. Send Pending Verification Email to Participant (using Resend template observe-moon-night-registration-received)
    try {
      const fromAddress = process.env.FROM_EMAIL || "info@seds-sl.org";
      const orgName = process.env.ORG_NAME || "SEDS Sri Lanka";

      let sentWithResendTemplate = false;

      if (
        process.env.RESEND_API_KEY &&
        process.env.RESEND_API_KEY !== "dummy_key_for_build"
      ) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const resendResult: any = await resend.emails.send({
            from: `${orgName} <${fromAddress}>`,
            to: email,
            subject: `We received your registration — Observe the Moon Night ${year}`,
            // @ts-ignore Resend SDK supports template parameter
            template: {
              id: "observe-moon-night-registration-received",
              variables: {
                fullName,
                year,
                registrationCode,
              },
            },
          });

          if (resendResult.data && !resendResult.error) {
            sentWithResendTemplate = true;
          } else if (resendResult.error) {
            console.warn(
              "Resend participant template send error, falling back to payload email:",
              resendResult.error,
            );
          }
        } catch (resendErr) {
          console.warn(
            "Resend participant template API send failed, falling back to HTML email:",
            resendErr,
          );
        }
      }

      if (!sentWithResendTemplate) {
        const participantEmail = generateRegistrationEmail({
          fullName,
          email,
          phone,
          institution,
          selectedLocation,
          attendanceMode,
          equipment,
          emergencyContactName,
          emergencyContactPhone,
          emergencyContactRelation,
          mealPreference,
          dietaryRestrictions,
          year,
          isPaidEvent,
          registrationId: registrationCode,
          cmsSubject,
          cmsCustomMessage,
          eventDate,
          eventTime,
          ticketPrice,
          paymentDetails,
          agenda,
          isPendingVerification: true,
        });

        await payload.sendEmail({
          to: email,
          subject: participantEmail.subject,
          html: participantEmail.html,
          text: participantEmail.text,
        });
      }
    } catch (emailErr) {
      console.error("Failed to send participant pending email:", emailErr);
    }

    // 2. Send Notification Email to Finance / Admin (using Resend template observe-the-moon-registration-amin)
    try {
      const financeAddress =
        process.env.FINANCE_EMAIL ||
        process.env.ADMIN_EMAIL ||
        "finance@sedssl.org";
      const fromAddress = process.env.FROM_EMAIL || "info@seds-sl.org";
      const orgName = process.env.ORG_NAME || "SEDS Sri Lanka";
      const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        process.env.WEBSITE_URL ||
        "https://seds-sl.org";
      const attachmentLink = `${baseUrl}/admin/verify-payments`;

      let sentWithResendTemplate = false;

      if (
        process.env.RESEND_API_KEY &&
        process.env.RESEND_API_KEY !== "dummy_key_for_build"
      ) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const resendResult: any = await resend.emails.send({
            from: `${orgName} <${fromAddress}>`,
            to: financeAddress,
            subject: `[NEW REGISTRATION] ${fullName} (${registrationCode}) - Moon Night ${year}`,
            // @ts-ignore Resend SDK supports template parameter
            template: {
              id: "observe-the-moon-registration-amin",
              variables: {
                registrationCode,
                fullName,
                email,
                phone: phone || "N/A",
                institution: institution || "N/A",
                selectedLocation: selectedLocation || "N/A",
                mealPreference: mealPreference || "None",
                emergencyContactName: emergencyContactName || "N/A",
                emergencyContactPhone: emergencyContactPhone || "N/A",
                emergencyContactRelation: emergencyContactRelation || "N/A",
                paymentStatus: isPaidEvent
                  ? paymentSlipMediaId
                    ? "Pending Verification"
                    : "Payment Required"
                  : "Free Event",
                attachmentLink,
              },
            },
          });

          if (resendResult.data && !resendResult.error) {
            sentWithResendTemplate = true;
          } else if (resendResult.error) {
            console.warn(
              "Resend template send error, falling back to payload email:",
              resendResult.error,
            );
          }
        } catch (resendErr) {
          console.warn(
            "Resend template API send failed, falling back to HTML email:",
            resendErr,
          );
        }
      }

      if (!sentWithResendTemplate) {
        const adminEmailData = generateRegistrationEmail({
          fullName,
          email,
          phone,
          institution,
          selectedLocation,
          attendanceMode,
          equipment,
          emergencyContactName,
          emergencyContactPhone,
          emergencyContactRelation,
          mealPreference,
          dietaryRestrictions,
          year,
          isPaidEvent,
          registrationId: registrationCode,
          cmsSubject,
          cmsCustomMessage,
          eventDate,
          eventTime,
          ticketPrice,
          paymentDetails,
          agenda,
          isAdminAlert: true,
        });

        await payload.sendEmail({
          to: financeAddress,
          subject: adminEmailData.subject,
          html: adminEmailData.html,
          text: adminEmailData.text,
        });
      }
    } catch (adminEmailErr) {
      console.error("Failed to send admin notification email:", adminEmailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration submitted successfully! Your submission is pending verification.",
        registrationId: registrationCode,
        registrationCode,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating Moon Night registration:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process registration" },
      { status: 500 },
    );
  }
}
