import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { sendEmail } from "@/utilities/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, trackingNumber, customerEmail, customerName, productName } = body;

    if (!orderId && !customerEmail) {
      return NextResponse.json(
        { error: "orderId or customerEmail is required." },
        { status: 400 },
      );
    }

    const supabase = createAdminSupabaseClient();
    let emailToSend = customerEmail;
    let nameToSend = customerName || "Supporter";
    let productToSend = productName || "SEDS Merchandise";

    // If orderId is provided, update Supabase order status
    if (orderId) {
      const { data: updatedOrder } = await supabase
        .from("orders")
        .update({ status: "completed", payment_status: "paid" })
        .eq("id", orderId)
        .select()
        .single();

      if (updatedOrder) {
        emailToSend = updatedOrder.customer_email || emailToSend;
        nameToSend = updatedOrder.customer_name || nameToSend;
      }
    }

    // Send confirmation email via Resend
    if (emailToSend && emailToSend.includes("@")) {
      await sendEmail({
        to: emailToSend,
        subject: `Order Confirmed & Shipped: ${productToSend} | SEDS Sri Lanka`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #10b981; margin: 0;">Payment Verified & Order Confirmed!</h2>
              <p style="color: #71717a; font-size: 14px; margin-top: 4px;">Your SEDS Sri Lanka merchandise is on its way.</p>
            </div>

            <div style="background-color: #f4f4f5; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 6px 0;"><strong>Hello ${nameToSend},</strong></p>
              <p style="margin: 6px 0;">We have successfully verified your payment slip for <strong>${productToSend}</strong>.</p>
              ${trackingNumber ? `<p style="margin: 6px 0;"><strong>Courier Tracking Number:</strong> <span style="font-family: monospace; font-size: 16px; color: #4f46e5;">${trackingNumber}</span></p>` : ""}
              <p style="margin: 6px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Dispatched / Shipped</span></p>
            </div>

            <p style="font-size: 14px; color: #3f3f46; line-height: 1.6;">
              Thank you for supporting space exploration in Sri Lanka. All proceeds directly fund our student satellite and rocketry programs.
            </p>

            <p style="font-size: 13px; color: #71717a; margin-top: 30px; text-align: center;">
              SEDS Sri Lanka Merchandising Team · <a href="https://seds-sl.org" style="color: #4f46e5;">seds-sl.org</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Order confirmed and email dispatched!",
    });
  } catch (err: any) {
    console.error("Order confirmation error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to confirm order" },
      { status: 500 },
    );
  }
}
