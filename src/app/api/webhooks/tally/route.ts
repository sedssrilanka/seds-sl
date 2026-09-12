import { NextResponse } from "next/server";
import { sendEmail } from "@/utilities/sendEmail";
import { renderOrderReceiptEmail, renderOrderAlertEmail } from "@/emails";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Verify Tally webhook event
    if (!payload || payload.eventType !== "FORM_RESPONSE") {
      return NextResponse.json(
        { message: "Ignored non-form event" },
        { status: 200 },
      );
    }

    const { data } = payload;
    const { fields } = data;

    // Map Tally fields to an easy key-value object
    const responses: Record<string, any> = {};
    if (Array.isArray(fields)) {
      for (const field of fields) {
        const label = field.label || field.key;
        responses[label] = field.value;
      }
    }

    // Flexible lookup helper for fuzzy label matches
    const getField = (aliases: string[]) => {
      for (const [key, val] of Object.entries(responses)) {
        const normalized = key.toLowerCase();
        if (aliases.some((alias) => normalized.includes(alias.toLowerCase()))) {
          return val;
        }
      }
      return undefined;
    };

    const customerName =
      getField(["full name", "name", "customer"]) || "Supporter";
    const customerEmail = getField(["email", "mail"]) || "";
    const customerPhone =
      getField(["phone", "contact", "whatsapp", "mobile"]) || "";
    const shippingAddress =
      getField(["delivery address", "address", "street"]) || "Not provided";
    const city = getField(["city", "district"]) || "Sri Lanka";
    const productName =
      responses["product_name"] ||
      getField(["product", "item"]) ||
      "SEDS Merchandise";
    const totalAmount =
      parseFloat(
        responses["price"] || getField(["price", "total", "amount"]) || "0",
      ) || 0;

    // Slip URL (can be string or array of upload objects from Tally)
    const rawSlip = getField(["slip", "proof", "receipt", "upload", "payment"]);
    let slipUrl: string | null = null;
    if (typeof rawSlip === "string") {
      slipUrl = rawSlip;
    } else if (Array.isArray(rawSlip) && rawSlip.length > 0) {
      slipUrl = rawSlip[0]?.url || rawSlip[0] || null;
    }

    // 1. Send automated acknowledgment email to customer via Resend
    if (customerEmail && customerEmail.includes("@")) {
      await sendEmail({
        to: customerEmail,
        subject: `Order Received: ${productName} | SEDS Sri Lanka Store`,
        html: renderOrderReceiptEmail({
          customerName,
          customerEmail,
          productName,
          totalAmount,
          shippingAddress,
          city,
        }),
      });
    }

    // 2. Notify SEDS Merchandising Team via Resend
    const contactEmail = process.env.CONTACT_EMAIL || "contact@sedssl.org";
    await sendEmail({
      to: contactEmail,
      subject: `New Store Order: ${productName} (${customerName})`,
      html: renderOrderAlertEmail({
        customerName,
        customerEmail,
        customerPhone,
        productName,
        totalAmount,
        shippingAddress,
        city,
        slipUrl,
      }),
    }).catch((err) => console.warn("Team order alert email error:", err));

    return NextResponse.json({
      success: true,
      message: "Order processed and notification dispatched",
      order: {
        customerName,
        customerEmail,
        productName,
        totalAmount,
      },
    });
  } catch (err: any) {
    console.error("Error processing Tally webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
