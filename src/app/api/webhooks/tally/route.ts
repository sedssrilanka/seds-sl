import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { sendEmail } from "@/utilities/sendEmail";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Verify Tally webhook event
    if (!payload || payload.eventType !== "FORM_RESPONSE") {
      return NextResponse.json({ message: "Ignored non-form event" }, { status: 200 });
    }

    const { data } = payload;
    const { formName, fields } = data;

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

    const customerName = getField(["full name", "name", "customer"]) || "Supporter";
    const customerEmail = getField(["email", "mail"]) || "";
    const customerPhone = getField(["phone", "contact", "whatsapp", "mobile"]) || "";
    const shippingAddress = getField(["delivery address", "address", "street"]) || "Not provided";
    const city = getField(["city", "district"]) || "Sri Lanka";
    const productName = responses["product_name"] || getField(["product", "item"]) || "SEDS Merchandise";
    const totalAmount = parseFloat(responses["price"] || getField(["price", "total", "amount"]) || "0") || 0;
    
    // Slip URL (can be string or array of upload objects from Tally)
    const rawSlip = getField(["slip", "proof", "receipt", "upload", "payment"]);
    let slipUrl: string | null = null;
    if (typeof rawSlip === "string") {
      slipUrl = rawSlip;
    } else if (Array.isArray(rawSlip) && rawSlip.length > 0) {
      slipUrl = rawSlip[0]?.url || rawSlip[0] || null;
    }

    const supabase = createAdminSupabaseClient();

    // 1. Insert into Supabase Orders table
    const { data: orderData, error: dbError } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: shippingAddress,
        city,
        total_amount_lkr: totalAmount,
        status: "pending",
        payment_status: slipUrl ? "receipt_uploaded" : "unpaid",
        payment_receipt_url: typeof slipUrl === "string" ? slipUrl : null,
        items: [{ title: productName, quantity: 1, price: totalAmount }],
      })
      .select()
      .single();

    if (dbError) {
      console.warn("Could not insert order into Supabase:", dbError.message);
    }

    // 2. Send automated acknowledgment email via Resend if email is provided
    if (customerEmail && customerEmail.includes("@")) {
      await sendEmail({
        to: customerEmail,
        subject: `Order Received: ${productName} | SEDS Sri Lanka Store`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #4f46e5; margin: 0;">SEDS Sri Lanka Merchandise</h2>
              <p style="color: #71717a; font-size: 14px; margin-top: 4px;">Thank you for supporting student space initiatives!</p>
            </div>

            <div style="background-color: #f4f4f5; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #27272a; font-size: 16px;">Order Summary</h3>
              <p style="margin: 6px 0;"><strong>Product:</strong> ${productName}</p>
              ${totalAmount > 0 ? `<p style="margin: 6px 0;"><strong>Total:</strong> Rs. ${totalAmount.toLocaleString()}</p>` : ""}
              <p style="margin: 6px 0;"><strong>Customer:</strong> ${customerName}</p>
              <p style="margin: 6px 0;"><strong>Delivery Address:</strong> ${shippingAddress}, ${city}</p>
              <p style="margin: 6px 0;"><strong>Status:</strong> <span style="color: #d97706; font-weight: bold;">Pending Verification</span></p>
            </div>

            <div style="border-left: 4px solid #4f46e5; padding-left: 14px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; color: #3f3f46;">
                Our merchandising team is reviewing your order details and payment slip. You will receive a confirmation once your package is dispatched!
              </p>
            </div>

            <p style="font-size: 13px; color: #71717a; margin-top: 30px; text-align: center;">
              Have questions? Reply directly to this email or contact us at <a href="mailto:info@sedssl.org" style="color: #4f46e5;">info@sedssl.org</a>.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Order processed and notification dispatched",
      order: orderData,
    });
  } catch (err: any) {
    console.error("Error processing Tally webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
