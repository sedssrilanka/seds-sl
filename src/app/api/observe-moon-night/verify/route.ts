import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { checkRole } from "@/access/utilities";

export const dynamic = "force-dynamic";

// GET endpoint to fetch registrations for verification
export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    const reqHeaders = await headers();
    const authResult = await payload.auth({ headers: reqHeaders });

    const user = authResult?.user;

    if (!user || !checkRole(["admin", "finance"], user)) {
      return NextResponse.json(
        { error: "Unauthorized access. Requires admin or finance role." },
        { status: 403 },
      );
    }

    const queryResult = await payload.find({
      collection: "moon-registrations",
      limit: 500,
      sort: "-createdAt",
      depth: 1, // Populate media for payment slip viewing
    });

    return NextResponse.json({
      success: true,
      docs: queryResult.docs,
    });
  } catch (err: any) {
    console.error("GET /api/observe-moon-night/verify error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch registrations." },
      { status: 500 },
    );
  }
}

// POST endpoint to approve or reject a payment
export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    const reqHeaders = await headers();
    const authResult = await payload.auth({ headers: reqHeaders });

    const user = authResult?.user;

    if (!user || !checkRole(["admin", "finance"], user)) {
      return NextResponse.json(
        { error: "Unauthorized access. Requires admin or finance role." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { id, action } = body;

    if (!id || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        {
          error:
            "Invalid parameters. 'id' and 'action' ('approve' | 'reject') are required.",
        },
        { status: 400 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let updatedDoc: any;
    if (action === "approve") {
      updatedDoc = await payload.update({
        collection: "moon-registrations",
        id,
        data: {
          paymentStatus: "verified",
          status: "confirmed",
        },
      });
    } else {
      updatedDoc = await payload.update({
        collection: "moon-registrations",
        id,
        data: {
          paymentStatus: "rejected",
          status: "cancelled",
        },
      });
    }

    return NextResponse.json({
      success: true,
      action,
      doc: updatedDoc,
    });
  } catch (err: any) {
    console.error("POST /api/observe-moon-night/verify error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update payment status." },
      { status: 500 },
    );
  }
}
