import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { sendEmail } from "@/utilities/sendEmail";
import { renderOrderShippedEmail } from "@/emails";

function isValidSecret(
  providedSecret: string | null,
  expectedSecret: string,
): boolean {
  if (!providedSecret) return false;
  try {
    const providedBuffer = Buffer.from(providedSecret, "utf8");
    const expectedBuffer = Buffer.from(expectedSecret, "utf8");
    if (providedBuffer.length !== expectedBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const expectedSecret =
      process.env.ORDER_API_SECRET || process.env.TALLY_SIGNING_SECRET;

    // Verify secret if configured
    if (expectedSecret) {
      const authHeader = req.headers.get("authorization");
      const apiKeyHeader =
        req.headers.get("x-api-secret") || req.headers.get("x-api-key");
      const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7).trim()
        : null;
      const providedSecret = bearerToken || apiKeyHeader;

      if (!isValidSecret(providedSecret, expectedSecret)) {
        console.warn("Unauthorized order confirmation request");
        return NextResponse.json(
          { error: "Unauthorized: Invalid or missing API secret" },
          { status: 401 },
        );
      }
    }

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
