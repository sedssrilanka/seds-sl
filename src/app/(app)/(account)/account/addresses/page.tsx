export const dynamic = "force-dynamic";
import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { headers as getHeaders } from "next/headers.js";
import configPromise from "@payload-config";
import type { Order } from "@/payload-types";
import { getPayload } from "payload";
import { redirect } from "next/navigation";
import { AddressListing } from "@/components/addresses/AddressListing";
import { CreateAddressModal } from "@/components/addresses/CreateAddressModal";

export default async function AddressesPage() {
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

  let _orders: Order[] | null = null;

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

    _orders = ordersResult?.docs || [];
  } catch (_error) {}

  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
      <div className="p-6 md:p-8 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Addresses</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your shipping and billing addresses.
          </p>
        </div>
        <CreateAddressModal />
      </div>

      <div className="p-6 md:p-8 bg-muted/5 min-h-[400px]">
        <AddressListing />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  description: "Manage your addresses.",
  openGraph: mergeOpenGraph({
    title: "Addresses",
    url: "/account/addresses",
  }),
  title: "Addresses",
};
