import { createLocalReq, getPayload } from "payload";
import { seed } from "@/endpoints/seed"; // Updated import to point to the new seed index
import config from "@payload-config";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds

export async function POST(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config });
  const requestHeaders = await headers();

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return new Response("Action forbidden.", { status: 403 });
  }

  // Parse search params for 'collection'
  const searchParams = req.nextUrl.searchParams;
  const collectionParam = searchParams.get("collection") || undefined;

  try {
    // Create a Payload request object to pass to the Local API for transactions
    const payloadReq = await createLocalReq({ user }, payload);

    await seed({ payload, req: payloadReq, collection: collectionParam });

    return Response.json({
      success: true,
      collectionSeeded: collectionParam || "all",
    });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return new Response("Error seeding data.", { status: 500 });
  }
}
