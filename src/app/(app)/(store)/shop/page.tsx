export const dynamic = "force-dynamic";
import { Grid } from "@/components/Grid";
import { ProductGridItem } from "@/components/ProductGridItem";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Product } from "@/payload-types";
export const metadata = {
  description: "Search for products in the store.",
  title: "Shop",
};

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { q: searchValue, sort, category } = await searchParams;
  let products: { docs: Partial<Product>[] | any[] } = { docs: [] };
  try {
    const payload = await getPayload({ config: configPromise });
    products = await payload.find({
      collection: "products",
      draft: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        gallery: true,
        categories: true,
        priceInUSD: true,
      },
      ...(sort ? { sort } : { sort: "title" }),
      ...(searchValue || category
        ? {
            where: {
              and: [
                {
                  _status: {
                    equals: "published",
                  },
                },
                ...(searchValue
                  ? [
                      {
                        or: [
                          {
                            title: {
                              like: searchValue,
                            },
                          },
                          {
                            description: {
                              like: searchValue,
                            },
                          },
                        ],
                      },
                    ]
                  : []),
                ...(category
                  ? [
                      {
                        categories: {
                          contains: category,
                        },
                      },
                    ]
                  : []),
              ],
            },
          }
        : {}),
    });
  } catch (error) {
    console.warn("DB connection failed, continuing with empty products list.");
  }

  const resultsText = products.docs.length > 1 ? "results" : "result";

  return (
    <div className="w-full">
      {searchValue && (
        <div className="mb-8 border-b pb-4">
          <h2 className="text-xl font-medium tracking-tight">
            {products.docs?.length === 0
              ? "0 results for "
              : `Showing ${products.docs.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </h2>
        </div>
      )}

      {!searchValue && products.docs?.length === 0 && (
        <div className="flex py-20 flex-col items-center justify-center text-center bg-muted/10 border-2 border-dashed rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting your filters or search query to find what you're
            looking for.
          </p>
        </div>
      )}

      {products?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.docs.map((product) => {
            return (
              <div
                key={product.id}
                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl overflow-hidden group"
              >
                <ProductGridItem product={product} />
              </div>
            );
          })}
        </Grid>
      ) : null}
    </div>
  );
}
