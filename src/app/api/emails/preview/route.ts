import { type NextRequest, NextResponse } from "next/server";
import {
  renderContactEmail,
  renderMembershipEmail,
  renderOrderReceiptEmail,
  renderOrderAlertEmail,
  renderOrderShippedEmail,
} from "@/emails";
import { generateRegistrationEmailHtml } from "@/utilities/generateRegistrationEmail";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const template = searchParams.get("template") || "contact";

  let html = "";

  switch (template) {
    case "contact":
      html = renderContactEmail({
        fullName: "Kavindu Perera",
        email: "kavindu.perera@example.com",
        reasons: ["General Inquiry", "Events & Competitions"],
        message:
          "Hello SEDS Sri Lanka Team,\n\nI would like to inquire about the upcoming high-altitude balloon project and how school students can participate or attend observation sessions.\n\nThank you!\nKavindu",
      });
      break;

    case "membership":
      html = renderMembershipEmail({
        fullName: "Senura Wickramasinghe",
        email: "senura.wick@example.com",
        phone: "+94 77 123 4567",
        institution: "University of Moratuwa",
        chapter: "SEDS UOM (University of Moratuwa)",
        statement:
          "I am a second-year undergraduate in Electronic & Telecommunication Engineering. I have experience in embedded systems, PCB design, and telemetry. I want to contribute to the SEDS CubeSat communications subsystem.",
      });
      break;

    case "order-receipt":
      html = renderOrderReceiptEmail({
        customerName: "Dilani Fernando",
        customerEmail: "dilani.fernando@example.com",
        productName: "SEDS Sri Lanka Official T-Shirt 2026",
        totalAmount: 2850,
        shippingAddress: "No. 45/2, Galle Road, Colombo 03",
        city: "Colombo",
      });
      break;

    case "order-alert":
      html = renderOrderAlertEmail({
        customerName: "Dilani Fernando",
        customerEmail: "dilani.fernando@example.com",
        customerPhone: "+94 71 987 6543",
        productName: "SEDS Sri Lanka Official T-Shirt 2026 (Size: L)",
        totalAmount: 2850,
        shippingAddress: "No. 45/2, Galle Road, Colombo 03",
        city: "Colombo",
        slipUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
      });
      break;

    case "order-shipped":
      html = renderOrderShippedEmail({
        customerName: "Dilani Fernando",
        productName: "SEDS Sri Lanka Official T-Shirt 2026",
        trackingNumber: "DOM-EXP-92841029LK",
      });
      break;

    case "moon-event":
      html = generateRegistrationEmailHtml({
        name: "Amara Jayawardena",
        email: "amara.jaya@example.com",
        registrationId: "MOON-892147",
        eventYear: 2026,
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=MOON-892147",
        icsFileUrl: "https://seds-sl.org/events/moon-night-2026.ics",
      });
      break;

    default:
      html = `<h1>Template '${template}' not found.</h1>`;
      break;
  }

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
