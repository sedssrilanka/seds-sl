import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

import { CheckoutPage } from "@/components/checkout/CheckoutPage";

export default function Checkout() {
  return (
    <div className="container min-h-[90vh] flex flex-col py-12 md:py-20 lg:max-w-6xl mx-auto">
      <h1 className="sr-only">Checkout</h1>
      <CheckoutPage />
    </div>
  );
}

export const metadata: Metadata = {
  description: "Checkout.",
  openGraph: mergeOpenGraph({
    title: "Checkout",
    url: "/checkout",
  }),
  title: "Checkout",
};
