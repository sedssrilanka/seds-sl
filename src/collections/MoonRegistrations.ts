import type { CollectionConfig } from "payload";
import {
  generateRegistrationEmail,
  formatDateISO,
  formatTimeISO,
} from "../utilities/generateRegistrationEmail";
import { Resend } from "resend";
import { checkRole } from "@/access/utilities";

export const MoonRegistrations: CollectionConfig = {
  slug: "moon-registrations",
  admin: {
    group: "Observe Moon Night",
    useAsTitle: "registrationCode",
    defaultColumns: [
      "registrationCode",
      "fullName",
      "email",
      "phone",
      "selectedLocation",
      "paymentStatus",
      "status",
      "createdAt",
    ],
  },
  access: {
    // Only authenticated admins or finance staff can read or update registrations in CMS/API
    read: ({ req: { user } }) => checkRole(["admin", "finance"], user),
    create: () => true, // Public registrations through form API
    update: ({ req: { user } }) => checkRole(["admin", "finance"], user),
    delete: ({ req: { user } }) => checkRole(["admin"], user),
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (operation === "update") {
          // Send confirmation email when status changes from pending to confirmed (or payment status becomes verified)
          const isNowConfirmed =
            (doc.status === "confirmed" &&
              previousDoc?.status !== "confirmed") ||
            (doc.paymentStatus === "verified" &&
              previousDoc?.paymentStatus !== "verified");

          const isNowRejected =
            (doc.status === "cancelled" &&
              previousDoc?.status !== "cancelled") ||
            (doc.paymentStatus === "rejected" &&
              previousDoc?.paymentStatus !== "rejected");

          if ((isNowConfirmed || isNowRejected) && doc.email) {
            try {
              const year = doc.year || "2026";
              const fromAddress = process.env.FROM_EMAIL || "info@seds-sl.org";
              const orgName = process.env.ORG_NAME || "SEDS Sri Lanka";

              // Fetch custom email subject and message from Observe Moon Event CMS collection for this year
              let cmsSubject: string | undefined;
              let cmsCustomMessage: string | undefined;
              let eventDate: string | undefined;
              let eventTime: string | undefined;
              let ticketPrice: string | undefined;
              let paymentDetails: string | undefined;

              try {
                const eventQuery = await req.payload.find({
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  collection: "observe-moon-events" as any,
                  where: {
                    year: {
                      equals: year,
                    },
                  },
                  limit: 1,
                });

                if (eventQuery.docs[0]) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const eventDoc = eventQuery.docs[0] as any;
                  cmsSubject = eventDoc.confirmationEmailSubject || undefined;
                  cmsCustomMessage =
                    eventDoc.confirmationEmailBody || undefined;
                  eventDate = eventDoc.eventDate || undefined;
                  eventTime = eventDoc.startTime
                    ? `${eventDoc.startTime}${eventDoc.endTime ? ` - ${eventDoc.endTime}` : ""}`
                    : undefined;
                  ticketPrice = eventDoc.ticketPrice || undefined;
                  paymentDetails = eventDoc.paymentDetails || undefined;
                }
              } catch (cmsErr) {
                req.payload.logger.warn(
                  { err: cmsErr },
                  "Could not fetch Observe Moon Event CMS settings for confirmation email:",
                );
              }

              let sentWithResendTemplate = false;

              if (
                process.env.RESEND_API_KEY &&
                process.env.RESEND_API_KEY !== "dummy_key_for_build"
              ) {
                try {
                  const resend = new Resend(process.env.RESEND_API_KEY);
                  const templateId = isNowConfirmed
                    ? "observe-the-moon-confirmed"
                    : "payment-verification-failed";

                  const subject = isNowConfirmed
                    ? cmsSubject ||
                      `You're confirmed — Observe the Moon Night ${year}`
                    : `Registration update — Observe the Moon Night ${year}`;

                  const formattedEventDate = formatDateISO(eventDate);
                  const formattedEventTime = formatTimeISO(eventTime);

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const resendResult: any = await resend.emails.send({
                    from: `${orgName} <${fromAddress}>`,
                    to: doc.email,
                    subject,
                    // @ts-ignore Resend SDK supports template parameter
                    template: {
                      id: templateId,
                      variables: {
                        fullName: doc.fullName,
                        year,
                        registrationCode: doc.registrationCode || doc.id,
                        ...(isNowConfirmed
                          ? {
                              eventDate: formattedEventDate,
                              eventTime: formattedEventTime,
                              selectedLocation:
                                doc.selectedLocation || "In-Person",
                              customMessage: cmsCustomMessage || "",
                            }
                          : {
                              rejectionReason:
                                "We were unable to verify your payment slip. Please check your payment details or contact our support team.",
                            }),
                      },
                    },
                  });

                  if (resendResult.data && !resendResult.error) {
                    sentWithResendTemplate = true;
                  }
                } catch (resendErr) {
                  req.payload.logger.warn(
                    { err: resendErr },
                    "Resend template send failed, falling back to html email:",
                  );
                }
              }

              if (!sentWithResendTemplate) {
                const { subject, html, text } = generateRegistrationEmail({
                  fullName: doc.fullName,
                  email: doc.email,
                  phone: doc.phone,
                  institution: doc.institution,
                  selectedLocation: doc.selectedLocation,
                  attendanceMode: doc.attendanceMode,
                  equipment: doc.equipment,
                  emergencyContactName: doc.emergencyContactName,
                  emergencyContactPhone: doc.emergencyContactPhone,
                  emergencyContactRelation: doc.emergencyContactRelation,
                  mealPreference: doc.mealPreference,
                  dietaryRestrictions: doc.dietaryRestrictions,
                  year,
                  isPaidEvent: doc.paymentStatus !== "n/a",
                  registrationId: doc.registrationCode || doc.id,
                  cmsSubject,
                  cmsCustomMessage,
                  eventDate,
                  eventTime,
                  ticketPrice,
                  paymentDetails,
                  isPendingVerification: false,
                });

                await req.payload.sendEmail({
                  to: doc.email,
                  subject,
                  html,
                  text,
                });
              }

              req.payload.logger.info(
                `Status email sent to ${doc.email} for registration ${doc.registrationCode}`,
              );
            } catch (err) {
              req.payload.logger.error(
                { err },
                `Failed to send registration status email to ${doc.email}`,
              );
            }
          }
        }
      },
    ],
  },

  fields: [
    {
      name: "registrationCode",
      type: "text",
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: "Unique pass registration code e.g., IOTMN-2026-X8F9K",
      },
    },
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "institution",
      type: "text",
      required: true,
      admin: {
        description: "University, school, or organization name",
      },
    },
    {
      name: "selectedLocation",
      type: "text",
      admin: {
        description: "Host observation site selected by participant",
      },
    },
    {
      name: "year",
      type: "text",
      defaultValue: "2026",
      required: true,
    },
    {
      name: "eventSlug",
      type: "text",
      defaultValue: "observe-the-moon-night-2026",
    },
    {
      name: "attendanceMode",
      type: "select",
      options: [
        { label: "In-Person Site", value: "in-person" },
        { label: "Virtual Stream", value: "virtual" },
        { label: "Local Watch Group", value: "watch-party" },
      ],
      defaultValue: "in-person",
    },
    {
      name: "equipment",
      type: "select",
      options: [
        { label: "Observer Only", value: "observer" },
        { label: "Bringing Telescope / Optics", value: "bringing-equipment" },
        { label: "Astrophotography Setup", value: "astrophotography" },
      ],
      defaultValue: "observer",
    },
    {
      name: "emergencyContactName",
      type: "text",
      required: true,
    },
    {
      name: "emergencyContactPhone",
      type: "text",
      required: true,
    },
    {
      name: "emergencyContactRelation",
      type: "text",
    },
    {
      name: "mealPreference",
      type: "select",
      options: [
        { label: "No Meal / None", value: "no-meal" },
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Non-Vegetarian", value: "non-vegetarian" },
        { label: "Vegan", value: "vegan" },
      ],
      defaultValue: "no-meal",
    },
    {
      name: "dietaryRestrictions",
      type: "text",
    },
    {
      name: "paymentSlip",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Uploaded bank receipt or payment confirmation slip",
      },
    },
    {
      name: "paymentStatus",
      type: "select",
      options: [
        { label: "N/A (Free Event)", value: "n/a" },
        { label: "Pending Verification", value: "pending" },
        { label: "Verified & Approved", value: "verified" },
        { label: "Rejected / Invalid", value: "rejected" },
      ],
      defaultValue: "n/a",
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "pending",
    },
  ],
};
