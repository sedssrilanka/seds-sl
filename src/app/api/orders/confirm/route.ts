import { NextResponse } from "next/server";
import { sendEmail } from "@/utilities/sendEmail";
import { renderOrderShippedEmail } from "@/emails";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trackingNumber, customerEmail, customerName, productName } = body;

    if (!customerEmail) {
      return NextResponse.json(
        { error: "customerEmail is required." },
        { status: 400 },
      );
    }

    const nameToSend = customerName || "Supporter";
    const productToSend = productName || "SEDS Merchandise";

    // Send confirmation email via Resend
    if (customerEmail && customerEmail.includes("@")) {
      await sendEmail({
        to: customerEmail,
        subject: `Order Confirmed & Shipped: ${productToSend} | SEDS Sri Lanka`,
        html: renderOrderShippedEmail({
          customerName: nameToSend,
          productName: productToSend,
          trackingNumber,
        }),
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
