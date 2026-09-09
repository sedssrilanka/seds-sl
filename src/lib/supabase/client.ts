import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    // Return a dummy client if keys are not set yet during development
    console.warn("Supabase credentials not configured in environment.");
  }

  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseKey || "placeholder-anon-key",
  );
}
