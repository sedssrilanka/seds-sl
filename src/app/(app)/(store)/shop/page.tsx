import { getAllProducts } from "@/lib/keystatic";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  description:
    "Official SEDS Sri Lanka merchandise store. Discover apparel, space patches, stickers, and mission gear supporting student aerospace initiatives.",
  title: "Official Merchandise Store | SEDS Sri Lanka",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-border/60 bg-background text-muted-foreground p-8">
        <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground/60" />
        <h3 className="text-base font-bold text-foreground">
          No merchandise available right now
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Check back soon for new mission gear drops.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y sm:divide-y-0 sm:divide-x divide-border/60 bg-background">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group p-6 sm:p-8 flex flex-col justify-between hover:bg-muted/10 transition-colors"
        >
          <div className="space-y-5">
            {/* Image Container with Crisp Border */}
            <div className="relative aspect-square w-full bg-muted/20 border border-border/40 overflow-hidden">
              <Image
                src={product.image || "/images/products/tshit-2026-front.png"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-background/90 backdrop-blur-sm border border-border/80 text-[10px] font-mono uppercase font-semibold text-foreground">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Meta */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                {product.category && (
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                    {product.category}
                  </span>
                )}
                <span className="text-xs font-mono text-muted-foreground">
                  {product.isPreOrder
                    ? "• Pre-Order"
                    : product.inStock
                      ? "• In Stock"
                      : "• Out of Stock"}
                </span>
              </div>

              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                {product.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Clean Price & Arrow Link */}
          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                Price
              </span>
              <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                Rs. {Number(product.priceInLKR || 0).toLocaleString()}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  LKR
                </span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
              <span>View</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
