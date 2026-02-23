export const dynamic = "force-dynamic";
import type { Order } from "@/payload-types";
import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

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
    <div className="border p-8 rounded-lg bg-primary-foreground w-full">
      <h1 className="text-3xl font-medium mb-8">Orders</h1>
      {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
        <p className="">You have no orders.</p>
      )}

      {orders && orders.length > 0 && (
        <ul className="flex flex-col gap-6">
          {orders?.map((order, _index) => (
            <li key={order.id}>
              <OrderItem order={order} />
            </li>
          ))}
        </ul>
      )}
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
