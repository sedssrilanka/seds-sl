export interface BaseEmailOptions {
  title: string;
  preheader?: string;
  heroImageUrl?: string;
  badge?: string;
  heading: string;
  subheading?: string;
  contentHtml: string;
  cta?: {
    text: string;
    url: string;
  };
  footerText?: string;
}

export function renderBaseEmail({
  title,
  preheader = "SEDS Sri Lanka Notification",
  heroImageUrl,
  badge,
  heading,
  subheading,
  contentHtml,
  cta,
  footerText,
}: BaseEmailOptions): string {
  const websiteUrl = process.env.WEBSITE_URL || "https://sedssl.org";
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || websiteUrl;
  const defaultHero = `${serverUrl}/emails/seds-sl-email-cover.png`;
  const heroImage = heroImageUrl !== undefined ? heroImageUrl : defaultHero;
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"/>
  <title>${title}</title>
  <style>
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #000000 !important;
      color: #ededed;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    table { border-collapse: collapse; }
    img { border: 0; outline: none; text-decoration: none; border-radius: 0 !important; }
    a { color: #3b82f6; text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .outer-cell { padding: 16px 0 !important; }
      .email-card { width: 100% !important; }
      .inner-padding { padding: 24px 20px !important; }
      .footer-cell { padding: 20px 20px 32px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; color: #ededed;">
  <!-- Preheader -->
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; color: #000000;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td class="outer-cell" align="center" style="padding: 40px 16px; background-color: #000000;">
        
        <!-- Seamless Pure Black Canvas Card (540px) -->
        <table role="presentation" class="email-card" width="540" cellpadding="0" cellspacing="0" style="max-width: 540px; width: 100%; background-color: #000000; border-radius: 0; border: 0; text-align: left;">
          <tbody>

            <!-- Hero Image Banner -->
            ${
              heroImage
                ? `
            <tr>
              <td style="padding: 0; line-height: 0; background-color: #000000;">
                <img src="${heroImage}" alt="SEDS Sri Lanka" width="540" style="display: block; width: 100%; max-width: 540px; height: auto; border: 0; outline: none; border-radius: 0;" />
              </td>
            </tr>
            `
                : ""
            }

            <!-- Main Content Container -->
            <tr>
              <td class="inner-padding" style="padding: 36px 36px 24px 36px; background-color: #000000;">
                
                ${
                  badge
                    ? `
                <div style="font-family: monospace; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; margin-bottom: 12px;">
                  ${badge}
                </div>
                `
                    : ""
                }

                <h1 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.025em; line-height: 1.3;">
                  ${heading}
                </h1>

                ${
                  subheading
                    ? `
                <p style="margin: 0 0 28px 0; font-size: 14px; color: #71717a; line-height: 1.5;">
                  ${subheading}
                </p>
                `
                    : `<div style="margin-bottom: 24px;"></div>`
                }

                <!-- Body Injection -->
                <div style="font-size: 14px; line-height: 1.65; color: #a1a1aa;">
                  ${contentHtml}
                </div>

                ${
                  cta
                    ? `
                <!-- Sharp High-Contrast White Button -->
                <div style="margin-top: 32px; margin-bottom: 8px;">
                  <a href="${cta.url}" target="_blank" style="display: inline-block; background-color: #ffffff; color: #000000; font-size: 13px; font-weight: 600; padding: 12px 24px; border-radius: 0; text-decoration: none; letter-spacing: -0.01em;">
                    ${cta.text} &rarr;
                  </a>
                </div>
                `
                    : ""
                }
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer-cell" style="padding: 16px 36px 36px 36px; background-color: #000000; font-size: 12px; color: #52525b; line-height: 1.6;">
                <div style="color: #71717a; margin-bottom: 6px;">
                  ${footerText || "SEDS Sri Lanka · Students for the Exploration and Development of Space"}
                </div>
                <div>
                  <a href="${websiteUrl}" style="color: #71717a; text-decoration: none;">sedssl.org</a> &bull;
                  <a href="${websiteUrl}/privacy" style="color: #71717a; text-decoration: none;">Privacy</a> &bull;
                  <a href="mailto:contact@sedssl.org" style="color: #71717a; text-decoration: none;">contact@sedssl.org</a>
                  <span style="color: #3f3f46; margin-left: 8px;">&copy; ${currentYear}</span>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
