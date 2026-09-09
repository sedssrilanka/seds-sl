import type { Metadata } from "next";
import { OrdersDashboardClient } from "./OrdersDashboardClient";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders & Transactions Management | SEDS Sri Lanka Admin",
};

export default async function AdminOrdersPage() {
  const supabase = createAdminSupabaseClient();
  let orders: any[] = [];

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.warn("Could not load orders from Supabase (table may not be created yet):", error.message);
    } else {
      orders = data || [];
    }
  } catch (err) {
    console.error("Error fetching orders:", err);
  }

  return <OrdersDashboardClient initialOrders={orders} />;
}
