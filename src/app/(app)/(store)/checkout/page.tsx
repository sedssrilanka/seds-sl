import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

import { CheckoutPage } from "@/components/checkout/CheckoutPage";

import { SectionHeader } from "@/components/sections/section-header";

export default function Checkout() {
  return (
    <div className="flex flex-col w-full">
      <SectionHeader
        title="Checkout"
        description="Complete your order and secure your SEDS Sri Lanka merchandise."
        image="/section-header/contact-bg.jpg"
      />
      <div className="container min-h-[70vh] flex flex-col py-12 md:py-20 lg:max-w-6xl mx-auto mt-8">
        <h1 className="sr-only">Checkout</h1>
        <CheckoutPage />
      </div>
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
