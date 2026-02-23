export const dynamic = "force-dynamic";
import type { Order } from "@/payload-types";
import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { OrderItem } from "@/components/OrderItem";
import { headers as getHeaders } from "next/headers";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { redirect } from "next/navigation";

export default async function Orders() {
  const headers = await getHeaders();
  let payload: any = null;
  let user = null;
  try {
    payload = await getPayload({ config: configPromise });
    const authResult = await payload?.auth({ headers });
    user = authResult.user;
  } catch (err) {
    console.warn("DB connection failed, proceeding without user.");
  }

  let orders: Order[] | null = null;

  if (!user) {
    redirect(
      `/login?warning=${encodeURIComponent("Please login to access your orders.")}`,
    );
  }

  try {
    const ordersResult = await payload.find({
      collection: "orders",
      limit: 0,
      pagination: false,
      user,
      overrideAccess: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    });

    orders = ordersResult?.docs || [];
  } catch (_error) {}

  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden w-full">
      <div className="p-6 md:p-8 border-b bg-muted/20">
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Check the status of your recent and past orders.
        </p>
      </div>

      <div className="p-6 md:p-8">
        {!orders || !Array.isArray(orders) || orders?.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted bg-muted/5">
            <Package className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium mb-2">No orders found</p>
            <p className="text-muted-foreground">
              Looks like you haven't made any purchases yet.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-6">
            {orders?.map((order, _index) => (
              <li
                key={order.id}
                className="transition-all hover:bg-muted/30 -mx-4 px-4 py-4 rounded-xl"
              >
                <OrderItem order={order} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  description: "Your orders.",
  openGraph: mergeOpenGraph({
    title: "Orders",
    url: "/orders",
  }),
  title: "Orders",
};
