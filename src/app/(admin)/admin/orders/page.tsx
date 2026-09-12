import type { Metadata } from "next";
import { OrdersDashboardClient } from "./OrdersDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders & Transactions Management | SEDS Sri Lanka Admin",
};

export default function AdminOrdersPage() {
  return <OrdersDashboardClient initialOrders={[]} />;
}
