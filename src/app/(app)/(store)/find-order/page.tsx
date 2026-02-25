export const dynamic = "force-dynamic";
import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { FindOrderForm } from "@/components/forms/FindOrderForm";
import { getPayload } from "payload";
import { headers as getHeaders } from "next/headers.js";
import configPromise from "@payload-config";
import { SectionHeader } from "@/components/sections/section-header";

export default async function FindOrderPage() {
  const headers = await getHeaders();
  let user = null;
  try {
    const payload = await getPayload({ config: configPromise });
    const authResult = await payload.auth({ headers });
    user = authResult.user;
  } catch (err) {
    console.warn("DB connection failed, proceeding without user.");
  }

  return (
    <div className="flex flex-col w-full">
      <SectionHeader
        title="Track Your Order"
        description="Enter your email address and we'll send you a link to your order history."
        image="/section-header/space-projects-bg.jpeg"
      />
      <div className="container py-16 md:py-24 max-w-3xl mx-auto mt-12">
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-10">
          <FindOrderForm initialEmail={user?.email} />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  description: "Find your order with us using your email.",
  openGraph: mergeOpenGraph({
    title: "Find order",
    url: "/find-order",
  }),
  title: "Find order",
};
