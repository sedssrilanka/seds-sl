import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { ConfirmOrder } from "@/components/checkout/ConfirmOrder";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ConfirmOrderPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams;
}) {
  const _searchParams = await searchParamsPromise;

  //const paymentIntent = searchParams.paymentId;

  return (
    <div className="container min-h-[90vh] flex flex-col py-12 md:py-20 lg:max-w-4xl mx-auto">
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-12">
        <ConfirmOrder />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  description: "Confirm order.",
  openGraph: mergeOpenGraph({
    title: "Confirming order",
    url: "/checkout/confirm-order",
  }),
  title: "Confirming order",
};
