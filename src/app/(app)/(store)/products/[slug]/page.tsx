import { getProductBySlug, getAllProducts } from "@/lib/keystatic";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | SEDS Store`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const Content = await product.content();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link href="/shop">
          <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white">
            <ChevronLeftIcon className="w-4 h-4" /> Back to Store
          </Button>
        </Link>
      </div>

      <div className="border border-border/60 rounded-2xl bg-card p-8 md:p-12 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {product.title}
              </h1>
              <Badge variant={product.inStock ? "default" : "secondary"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <p className="text-lg text-zinc-400 mt-3">{product.description}</p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-zinc-500 uppercase font-mono block">Price</span>
            <span className="text-3xl font-extrabold text-indigo-400">
              Rs. {Number(product.priceInLKR || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Product Information</h3>
          <div className="prose prose-invert max-w-none text-zinc-300">
            {typeof Content === "string" ? (
              <p className="whitespace-pre-line">{Content}</p>
            ) : (
              <p>{product.description}</p>
            )}
          </div>

          <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row gap-4 items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium gap-2 px-8"
              onClick={() => alert(`To place an order for ${product.title}, please contact our merchandising team or visit the order form.`)}
            >
              <ShoppingCart className="w-5 h-5" /> Order Merchandise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
