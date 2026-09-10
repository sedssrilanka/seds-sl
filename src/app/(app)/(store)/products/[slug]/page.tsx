import { getProductBySlug, getAllProducts } from "@/lib/keystatic";
import React from "react";
import { ProductDetailView } from "@/components/store/ProductDetailView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSideURL } from "@/utilities/getURL";

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

  const baseUrl = getServerSideURL();
  const url = `${baseUrl}/products/${slug}`;
  const image = product.image
    ? `${baseUrl}${product.image}`
    : `${baseUrl}/images/products/tshit-2026-front.png`;

  return {
    title: `${product.title} | SEDS Sri Lanka Store`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | SEDS Sri Lanka Store`,
      description: product.description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
  ]);

  if (!product) {
    return notFound();
  }

  const Content = await product.content();
  const baseUrl = getServerSideURL();
  const relatedProducts = allProducts.filter((p) => p.slug !== slug);

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      price: product.priceInLKR,
      priceCurrency: "LKR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${baseUrl}/products/${slug}`,
    },
  };

  const { content: _fn, ...serializableProduct } = product;
  const serializableRelated = relatedProducts.map(({ content: _c, ...rest }) => rest);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <div className="flex flex-col w-full min-h-screen py-10 md:py-16">
        <div className="grid-container section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <ProductDetailView
              product={serializableProduct}
              content={
                typeof Content === "string" ? (
                  <div className="whitespace-pre-line">{Content}</div>
                ) : (
                  <div>{product.description}</div>
                )
              }
              relatedProducts={serializableRelated}
            />
          </div>
        </div>
      </div>
    </>
  );
}
