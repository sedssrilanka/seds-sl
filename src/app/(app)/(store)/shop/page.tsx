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
    <div>
      {searchValue ? (
        <p className="mb-4">
          {products.docs?.length === 0
            ? "There are no products that match "
            : `Showing ${products.docs.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {!searchValue && products.docs?.length === 0 && (
        <p className="mb-4">No products found. Please try different filters.</p>
      )}

      {products?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.docs.map((product) => {
            return <ProductGridItem key={product.id} product={product} />;
          })}
        </Grid>
      ) : null}
    </div>
  );
}
