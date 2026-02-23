export const dynamic = "force-dynamic";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import Link from "next/link";
import { headers as getHeaders } from "next/headers.js";
import configPromise from "@payload-config";
import { AccountForm } from "@/components/forms/AccountForm";
import type { Order } from "@/payload-types";
import { OrderItem } from "@/components/OrderItem";
import { getPayload } from "payload";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const headers = await getHeaders();
  let payload: any = null;
  let user = null;
  try {
    payload = await getPayload({ config: configPromise });
    const authResult = await payload?.auth({ headers });
    user = authResult?.user || null;
  } catch (err) {
    console.warn("DB connection failed, proceeding without user.");
  }

  let orders: Order[] | null = null;

  if (!user) {
    redirect(
      `/login?warning=${encodeURIComponent("Please login to access your account settings.")}`,
    );
  }

  try {
    const ordersResult = await payload.find({
      collection: "orders",
      limit: 5,
      user,
      overrideAccess: false,
      pagination: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    });

    orders = ordersResult?.docs || [];
  } catch (_error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b bg-muted/20">
          <h1 className="text-2xl font-bold tracking-tight">
            Account settings
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your personal information and login details.
          </p>
        </div>
        <div className="p-6 md:p-8">
          <AccountForm />
        </div>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recent Orders</h2>
            <p className="text-sm text-muted-foreground mt-2">
              View your most recent transactions and payment details.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full sm:w-auto h-9"
          >
            <Link href="/orders">View all orders</Link>
          </Button>
        </div>

        <div className="p-6 md:p-8">
          {!orders || !Array.isArray(orders) || orders?.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted bg-muted/5">
              <p className="text-muted-foreground mb-4">
                You have no orders yet.
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
    </div>
  );
}

export const metadata: Metadata = {
  description: "Create an account or log in to your existing account.",
  openGraph: mergeOpenGraph({
    title: "Account",
    url: "/account",
  }),
  title: "Account",
};
