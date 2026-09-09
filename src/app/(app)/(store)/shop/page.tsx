import { getAllProducts } from "@/lib/keystatic";
import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata = {
  description: "Official SEDS Sri Lanka merchandise and apparel.",
  title: "Shop | SEDS Sri Lanka",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-border/60 pb-8 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-indigo-400" /> SEDS Merchandise Store
        </h1>
        <p className="text-zinc-400 mt-2 text-base">
          Support student space initiatives by purchasing official SEDS Sri Lanka apparel, patches, and gear.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
          <p>No merchandise items available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="border border-border/60 rounded-xl overflow-hidden bg-card hover:border-indigo-500/50 transition-all flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-lg text-white">{product.title}</h3>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-6">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xs text-zinc-500 uppercase block font-mono">Price</span>
                  <span className="text-lg font-bold text-indigo-400">
                    Rs. {Number(product.priceInLKR || 0).toLocaleString()}
                  </span>
                </div>
                <Link href={`/products/${product.slug}`}>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
