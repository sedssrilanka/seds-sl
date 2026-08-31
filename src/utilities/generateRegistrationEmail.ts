export interface RegistrationEmailParams {
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  selectedLocation?: string;
  attendanceMode?: string;
  equipment?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  mealPreference?: string;
  dietaryRestrictions?: string;
  year?: string;
  isPaidEvent?: boolean;
  registrationId: string | number;
  cmsSubject?: string;
  cmsCustomMessage?: string;
  eventDate?: string;
  eventTime?: string;
  ticketPrice?: string;
  paymentDetails?: string;
  isPendingVerification?: boolean;
  isAdminAlert?: boolean;
  paymentSlipUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agenda?: any[];
}

export function formatDateISO(dateStr?: string | null): string {
  if (!dateStr) return "Saturday, September 19, 2026";
  if (dateStr.includes("T") || !isNaN(Date.parse(dateStr))) {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        timeZone: "Asia/Colombo",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  }
  return dateStr;
}

export function formatTimeISO(timeStr?: string | null): string {
  if (!timeStr) return "Evening";
  if (timeStr.includes(" - ")) {
    const [start, end] = timeStr.split(" - ");
    const formattedStart = formatTimeISO(start.trim());
    const formattedEnd = formatTimeISO(end.trim());
    return `${formattedStart} - ${formattedEnd}`;
  }
  if (timeStr.includes("T") || !isNaN(Date.parse(timeStr))) {
    const d = new Date(timeStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString("en-US", {
        timeZone: "Asia/Colombo",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  }
  return timeStr;
}

export function generateRegistrationEmail(params: RegistrationEmailParams): {
  subject: string;
  html: string;
  text: string;
} {
  const {
    fullName,
    email,
    phone,
    institution,
    selectedLocation,
    attendanceMode = "in-person",
    equipment = "observer",
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation,
    mealPreference = "no-meal",
    dietaryRestrictions,
    year = "2026",
    isPaidEvent = false,
    registrationId,
    cmsSubject,
    cmsCustomMessage,
    eventDate,
    eventTime,
    ticketPrice,
    paymentDetails,
    isPendingVerification = false,
    isAdminAlert = false,
    paymentSlipUrl,
  } = params;

  const displayPassCode = String(registrationId).startsWith("IOTMN")
    ? String(registrationId)
    : `IOTMN-${year}-${registrationId}`;

  const attendanceLabel =
    attendanceMode === "virtual"
      ? "Virtual Stream"
      : attendanceMode === "watch-party"
        ? "Local Watch Group"
        : "In-Person Site";

  const equipmentLabel =
    equipment === "bringing-equipment"
      ? "Bringing Optics"
      : equipment === "astrophotography"
        ? "Astrophotography"
        : "Observer";

  const mealLabel =
    mealPreference === "vegetarian"
      ? "Vegetarian"
      : mealPreference === "non-vegetarian"
        ? "Non-Vegetarian"
        : mealPreference === "vegan"
          ? "Vegan"
          : "None / No Meal Required";

  const formattedDate = formatDateISO(eventDate);
  const formattedTimeDisplay = formatTimeISO(eventTime);

  const formattedTime = formattedTimeDisplay.includes("SLST")
    ? formattedTimeDisplay
    : `${formattedTimeDisplay} (SLST)`;

  // Determine Email Subject
  let subject = `Observe the Moon Night ${year} Registration`;
  if (isAdminAlert) {
    subject = `[NEW REGISTRATION] ${fullName} (${displayPassCode}) - Moon Night ${year}`;
  } else if (isPendingVerification) {
    subject = `Registration Received - Pending Verification | Moon Night ${year}`;
  } else {
    subject =
      cmsSubject || `Registration Confirmed: Observe the Moon Night ${year}`;
  }

  // Determine status display
  const statusText = isAdminAlert
    ? "NEW SUBMISSION"
    : isPendingVerification
      ? "PENDING VERIFICATION"
      : "CONFIRMED PASS";

  const statusColor = isAdminAlert
    ? "#3b82f6"
    : isPendingVerification
      ? "#f97316"
      : "#22c55e";

  // Message body text
  let messageText = "";
  if (isAdminAlert) {
    messageText = `A new participant registration has been submitted for Observe the Moon Night ${year}. Please review the payment receipt (if applicable) and approve/verify the registration in the Payload Admin Panel.`;
  } else if (isPendingVerification) {
    messageText = `Thank you for registering for International Observe the Moon Night ${year}. Your registration details and payment slip are currently pending verification by our team. You will receive an official confirmation email once verified.`;
  } else {
    messageText =
      cmsCustomMessage ||
      `Your registration for International Observe the Moon Night ${year} is officially confirmed! We look forward to seeing you under the lunar sky.`;
  }

  const paymentSectionHtml =
    isPaidEvent && paymentDetails
      ? `<div style="border: 1px solid #7c2d12; background-color: #000000; padding: 16px 20px; margin-bottom: 24px;">
          <div style="color: #f97316; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
            PAYMENT INSTRUCTIONS
          </div>
          <div style="color: #cbd5e1; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; white-space: pre-line;">
            ${paymentDetails}
          </div>
          ${ticketPrice ? `<div style="margin-top: 8px; color: #fdba74; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;">TICKET FEE: LKR ${ticketPrice}</div>` : ""}
         </div>`
      : "";

  const emergencyContactHtml = emergencyContactName
    ? `<tr>
        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">EMERGENCY CONTACT:</td>
        <td style="color: #ffffff; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;">${emergencyContactName} (${emergencyContactPhone || "N/A"}) - ${emergencyContactRelation || "Contact"}</td>
      </tr>`
    : "";

  const mealHtml = `<tr>
      <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">MEAL PREFERENCE:</td>
      <td style="color: #ffffff; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;">${mealLabel}${dietaryRestrictions ? ` (${dietaryRestrictions})` : ""}</td>
    </tr>`;

  const adminSlipHtml =
    isAdminAlert && paymentSlipUrl
      ? `<div style="border: 1px solid #1e293b; background-color: #0f172a; padding: 16px; margin-bottom: 24px; text-align: center;">
        <span style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 8px;">ATTACHED PAYMENT RECEIPT</span>
        <a href="${paymentSlipUrl}" style="color: #3b82f6; font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; text-decoration: underline;">View Payment Receipt File →</a>
       </div>`
      : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #f8fafc;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 12px;">
    <tr>
      <td align="center">
        
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #000000; border: 1px solid #1e293b; border-collapse: separate;">
          
          <tr>
            <td style="height: 2px; background: linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #1e293b 100%);"></td>
          </tr>

          <tr>
            <td style="padding: 32px 28px 24px 28px; border-bottom: 1px solid #1e293b; background-color: #000000;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="color: #2563eb; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                      SEDS SRI LANKA
                    </div>
                    <h1 style="color: #ffffff; font-family: 'Barlow', sans-serif; font-size: 22px; font-weight: 800; text-transform: uppercase; margin: 0; letter-spacing: -0.5px; line-height: 1.1;">
                      Observe the Moon Night ${year}
                    </h1>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="color: ${statusColor}; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 800; border: 1px solid #1e293b; padding: 4px 10px; background-color: #000000; text-transform: uppercase; letter-spacing: 1px;">
                      ${statusText}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px; background-color: #000000;">

              <div style="background-color: #000000; border: 1px solid #1e293b; padding: 14px 20px; margin-bottom: 24px; text-align: center;">
                <span style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-right: 8px;">
                  PASS CODE:
                </span>
                <span style="color: #2563eb; font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 800; letter-spacing: 1.5px;">
                  ${displayPassCode}
                </span>
              </div>

              <div style="color: #cbd5e1; font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 400; line-height: 1.6; margin-bottom: 24px;">
                ${messageText.replace(/\n/g, "<br />")}
              </div>

              ${paymentSectionHtml}
              ${adminSlipHtml}

              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #1e293b; background-color: #000000; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 10px 16px; background-color: #000000; border-bottom: 1px solid #1e293b; color: #2563eb; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                    REGISTRATION DETAILS
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #000000;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700; width: 140px;">NAME:</td>
                        <td style="color: #ffffff; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0; font-weight: 600;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">EMAIL:</td>
                        <td style="color: #3b82f6; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                      </tr>
                      ${
                        phone
                          ? `<tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">PHONE:</td>
                        <td style="color: #cbd5e1; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;">${phone}</td>
                      </tr>`
                          : ""
                      }
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">INSTITUTION:</td>
                        <td style="color: #cbd5e1; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;">${institution}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">DATE:</td>
                        <td style="color: #ffffff; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0; font-weight: 600;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">TIME:</td>
                        <td style="color: #ffffff; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0; font-weight: 600;">${formattedTime}</td>
                      </tr>
                      ${
                        selectedLocation
                          ? `<tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">LOCATION:</td>
                        <td style="color: #f97316; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0; font-weight: 700;">${selectedLocation}</td>
                      </tr>`
                          : ""
                      }
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">MODE:</td>
                        <td style="color: #cbd5e1; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;">${attendanceLabel}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 6px 0; font-weight: 700;">EQUIPMENT:</td>
                        <td style="color: #cbd5e1; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 6px 0;">${equipmentLabel}</td>
                      </tr>
                      ${emergencyContactHtml}
                      ${mealHtml}
                    </table>
                  </td>
                </tr>
              </table>

              <div style="text-align: center; margin-top: 8px;">
                <a href="${process.env.NEXT_PUBLIC_SERVER_URL || process.env.WEBSITE_URL || "https://seds-sl.org"}/projects/observe-the-moon-night" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 28px; font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; text-decoration: none; border: 1px solid #3b82f6; letter-spacing: 1px;">
                  View Event Portal →
                </a>
              </div>

            </td>
          </tr>

          <tr>
            <td style="padding: 20px 28px; background-color: #000000; border-top: 1px solid #1e293b; text-align: center;">
              <p style="color: #64748b; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 500; margin: 0;">
                Students for the Exploration & Development of Space (SEDS Sri Lanka)
              </p>
            </td>
          </tr>

          <tr>
            <td style="height: 1px; background-color: #1e293b;"></td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  const text = `
SEDS SRI LANKA • OBSERVE THE MOON NIGHT ${year}
${subject}

PASS CODE: ${displayPassCode}
STATUS: ${statusText}

${messageText}

REGISTRATION DETAILS:
• Name: ${fullName}
• Email: ${email}
• Phone: ${phone || "N/A"}
• Institution: ${institution}
• Date: ${formattedDate}
• Time: ${formattedTime}
${selectedLocation ? `• Location: ${selectedLocation}\n` : ""}• Mode: ${attendanceLabel}
• Equipment: ${equipmentLabel}
${emergencyContactName ? `• Emergency Contact: ${emergencyContactName} (${emergencyContactPhone}) [${emergencyContactRelation}]\n` : ""}• Meal Preference: ${mealLabel}${dietaryRestrictions ? ` (${dietaryRestrictions})` : ""}

${paymentDetails ? `PAYMENT INSTRUCTIONS:\n${paymentDetails}\n` : ""}
Event Portal: ${process.env.NEXT_PUBLIC_SERVER_URL || process.env.WEBSITE_URL || "https://seds-sl.org"}/projects/observe-the-moon-night

Students for the Exploration & Development of Space (SEDS Sri Lanka)
  `.trim();

  return { subject, html, text };
}
