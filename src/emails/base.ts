export interface BaseEmailOptions {
  title: string;
  preheader?: string;
  badge?: {
    text: string;
    variant?: "primary" | "success" | "warning" | "purple";
  };
  heading?: string;
  subheading?: string;
  contentHtml: string;
  cta?: {
    text: string;
    url: string;
  };
  footerNote?: string;
}

export function renderBaseEmail({
  title,
  preheader = "SEDS Sri Lanka Official Notification",
  badge,
  heading,
  subheading,
  contentHtml,
  cta,
  footerNote,
}: BaseEmailOptions): string {
  const websiteUrl = process.env.WEBSITE_URL || "https://sedssl.org";
  const orgName = process.env.ORG_NAME || "SEDS Sri Lanka";

  // Badge Color Mapping
  let badgeBg = "#1e293b";
  let badgeColor = "#38bdf8";
  let badgeBorder = "#0284c7";

  if (badge?.variant === "success") {
    badgeBg = "#064e3b";
    badgeColor = "#34d399";
    badgeBorder = "#059669";
  } else if (badge?.variant === "warning") {
    badgeBg = "#451a03";
    badgeColor = "#fbbf24";
    badgeBorder = "#d97706";
  } else if (badge?.variant === "purple") {
    badgeBg = "#3b0764";
    badgeColor = "#c084fc";
    badgeBorder = "#9333ea";
  } else if (badge?.variant === "primary") {
    badgeBg = "#172554";
    badgeColor = "#60a5fa";
    badgeBorder = "#2563eb";
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #09090b;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; padding: 12px !important; }
      .content-cell { padding: 24px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; color: #e4e4e7;">
  <!-- Preview Text / Preheader -->
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; color: #09090b;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 12px;">
        <!-- Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #121215; border-radius: 16px; border: 1px solid #27272a; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #18181b 0%, #121215 100%); border-bottom: 1px solid #27272a;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 800; letter-spacing: 1.5px; color: #ffffff; text-transform: uppercase; font-family: monospace;">
                      <span style="color: #3b82f6;">SEDS</span> SRI LANKA
                    </div>
                    <div style="font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
                      Students for the Exploration & Development of Space
                    </div>
                  </td>
                  ${badge
      ? `<td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; font-size: 10px; font-weight: 700; font-family: monospace; text-transform: uppercase; letter-spacing: 0.75px; border-radius: 9999px; background-color: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                      ${badge.text}
                    </span>
                  </td>`
      : ""
    }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content-cell" style="padding: 32px;">
              ${heading
      ? `<h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.25px;">
                ${heading}
              </h1>`
      : ""
    }
              ${subheading
      ? `<p style="margin: 0 0 24px 0; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                ${subheading}
              </p>`
      : ""
    }

              <!-- Body Injection -->
              <div style="color: #e4e4e7; font-size: 14px; line-height: 1.6;">
                ${contentHtml}
              </div>

              ${cta
      ? `
              <!-- Call To Action Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="${cta.url}" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #2563eb; color: #ffffff; font-weight: 600; font-size: 14px; border-radius: 8px; text-decoration: none; letter-spacing: 0.25px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);">
                      ${cta.text} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              `
      : ""
    }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #09090b; border-top: 1px solid #1f1f23; text-align: center;">
              ${footerNote
      ? `<p style="margin: 0 0 12px 0; font-size: 12px; color: #71717a; line-height: 1.5;">
                ${footerNote}
              </p>`
      : ""
    }
              <p style="margin: 0; font-size: 12px; color: #52525b;">
                &copy; ${new Date().getFullYear()} ${orgName}. All rights reserved.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #3f3f46;">
                <a href="${websiteUrl}" style="color: #71717a; text-decoration: underline;">Website</a> &bull;
                <a href="${websiteUrl}/privacy" style="color: #71717a; text-decoration: underline;">Privacy Policy</a> &bull;
                <a href="mailto:contact@sedssl.org" style="color: #71717a; text-decoration: underline;">Contact Support</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
