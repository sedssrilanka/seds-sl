import configPromise from "@payload-config";
import { getPayload } from "payload";
import clsx from "clsx";
import { Suspense } from "react";

import { CategoryItem } from "./Categories.client";

async function CategoryList({ borderless }: { borderless?: boolean }) {
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({
    collection: "categories",
    sort: "title",
  });

  return (
    <div className={clsx("flex flex-col gap-2 w-full", { "px-0": borderless })}>
      {!borderless && (
        <h3 className="text-sm font-medium text-muted-foreground mr-4 shrink-0 md:hidden">
          Categories
        </h3>
      )}
      <div className="overflow-x-auto pb-2 -mb-2 scrollbar-none flex items-center pr-4">
        <ul className="flex flex-row flex-nowrap md:flex-wrap items-center gap-2 m-0 p-0">
          <li className="list-none m-0">
            <CategoryItem
              category={{ id: "all", title: "All Products" } as any}
              isAll={true}
            />
          </li>
          {categories.docs.map((category) => {
            return (
              <li key={category.id} className="shrink-0 list-none m-0">
                <CategoryItem category={category} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const skeleton = "h-9 w-24 shrink-0 animate-pulse rounded-full";
const activeAndTitles = "bg-primary/20";
const items = "bg-muted";

export function Categories({ borderless }: { borderless?: boolean }) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-row overflow-x-auto gap-2 w-full py-2">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CategoryList borderless={borderless} />
    </Suspense>
  );
}
