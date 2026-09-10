import { getProductBySlug, getAllProducts } from "@/lib/keystatic";
import { notFound } from "next/navigation";
import { CheckoutPageClient } from "./CheckoutPageClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Checkout | SEDS Sri Lanka" };

  return {
    title: `Checkout: ${product.title} | SEDS Sri Lanka`,
    description: `Complete your order for ${product.title}. Direct island-wide delivery with verified bank transfer.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col w-full min-h-screen py-16 items-center justify-center">
          <div className="text-xs font-mono text-muted-foreground animate-pulse">
            Loading checkout...
          </div>
        </div>
      }
    >
      <CheckoutPageClient
        product={{
          title: product.title,
          priceInLKR: product.priceInLKR,
          slug: product.slug,
          image: product.image,
          sizes: product.sizes,
          isPreOrder: product.isPreOrder,
          formId: product.tallyFormId,
          description: product.description,
        }}
      />
    </Suspense>
  );
}
