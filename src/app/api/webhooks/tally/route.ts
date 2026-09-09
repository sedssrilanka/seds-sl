import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

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
        responses[field.label || field.key] = field.value;
      }
    }

    const supabase = createAdminSupabaseClient();

    // Store submission in contact_submissions or a generic log table
    await supabase.from("contact_submissions").insert({
      name: responses["Name"] || responses["Full Name"] || "Anonymous",
      email: responses["Email"] || responses["Email Address"] || "no-email@provided.com",
      subject: formName || "Tally Form Submission",
      message: JSON.stringify(responses, null, 2),
      source: "tally_webhook",
    });

    return NextResponse.json({ success: true, message: "Response recorded" }, { status: 200 });
  } catch (err: any) {
    console.error("Error processing Tally webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
