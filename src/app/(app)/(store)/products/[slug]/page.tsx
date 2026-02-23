import type { Media, Product } from "@/payload-types";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { GridTileImage } from "@/components/Grid/tile";
import { Gallery } from "@/components/product/Gallery";
import { ProductDescription } from "@/components/product/ProductDescription";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const product = await queryProductBySlug({ slug });

  if (!product) return notFound();

  const gallery =
    product.gallery?.filter((item) => typeof item.image === "object") || [];

  const metaImage =
    typeof product.meta?.image === "object" ? product.meta?.image : undefined;
  const canIndex = product._status === "published";

  const seoImage =
    metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined);

  return {
    description: product.meta?.description || "",
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  };
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params;
  const product = await queryProductBySlug({ slug });

  if (!product) return notFound();

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === "object")
      .map((item) => ({
        ...item,
        image: item.image as Media,
      })) || [];

  const metaImage =
    typeof product.meta?.image === "object" ? product.meta?.image : undefined;
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
        if (typeof variant !== "object") return false;
        return variant.inventory && variant?.inventory > 0;
      })
    : product.inventory! > 0;

  let price = product.priceInUSD;

  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc, variant) => {
      if (
        typeof variant === "object" &&
        variant?.priceInUSD &&
        acc &&
        variant?.priceInUSD > acc
      ) {
        return variant.priceInUSD;
      }
      return acc;
    }, price);
  }

  const productJsonLd = {
    name: product.title,
    "@context": "https://schema.org",
    "@type": "Product",
    description: product.description,
    image: metaImage?.url,
    offers: {
      "@type": "AggregateOffer",
      availability: hasStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      price: price,
      priceCurrency: "usd",
    },
  };

  const relatedProducts =
    product.relatedProducts?.filter(
      (relatedProduct) => typeof relatedProduct === "object",
    ) ?? [];

  return (
    <React.Fragment>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection is safe
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="container pt-8 pb-16">
          <Button
            asChild
            variant="ghost"
            className="mb-6 -ml-4 hover:bg-muted/50 rounded-full"
          >
            <Link href="/shop" className="flex items-center gap-2">
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Back to Shop</span>
            </Link>
          </Button>
          <div className="flex flex-col gap-8 md:gap-12 rounded-3xl border p-6 md:p-10 lg:flex-row lg:gap-16 bg-card shadow-sm overflow-hidden">
            <div className="h-full w-full basis-full lg:basis-1/2">
              <Suspense
                fallback={
                  <div className="relative aspect-square h-full min-h-[400px] max-h-[600px] w-full bg-muted/20 animate-pulse rounded-2xl" />
                }
              >
                {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
              </Suspense>
            </div>

            <div className="basis-full lg:basis-1/2">
              <ProductDescription product={product} />
            </div>
          </div>
        </div>

        {product.layout?.length ? (
          <RenderBlocks blocks={product.layout} />
        ) : null}

        {relatedProducts.length ? (
          <div className="container pb-20">
            <RelatedProducts products={relatedProducts as Product[]} />
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div className="py-12 border-t mt-8">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">
        You might also like
      </h2>
      <ul className="flex w-full gap-6 overflow-x-auto pb-4 px-2 -mx-2 snap-x">
        {products.map((product) => (
          <li
            className="aspect-[4/5] w-[260px] flex-none snap-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-2xl overflow-hidden group border bg-card"
            key={product.id}
          >
            <Link
              className="relative h-full w-full"
              href={`/products/${product.slug}`}
            >
              <GridTileImage
                label={{
                  amount: product.priceInUSD!,
                  title: product.title,
                }}
                media={product.meta?.image as Media}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "products",
      depth: 3,
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          ...(draft ? [] : [{ _status: { equals: "published" } }]),
        ],
      },
      populate: {
        variants: {
          title: true,
          priceInUSD: true,
          inventory: true,
          options: true,
        },
      },
    });

    return result.docs?.[0] || null;
  } catch (err) {
    console.warn("DB connection failed, proceeding with null product queries.");
    return null;
  }
};
