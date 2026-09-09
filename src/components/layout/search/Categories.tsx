import React, { Suspense } from "react";
import { CategoryItem } from "./Categories.client";
import clsx from "clsx";

export function Categories({ borderless }: { borderless?: boolean }) {
  return (
    <div className={clsx("flex flex-col gap-2 w-full", { "px-0": borderless })}>
      <ul className="flex flex-row flex-nowrap md:flex-wrap items-center gap-2 m-0 p-0">
        <li className="list-none m-0">
          <CategoryItem
            category={{ id: "all", title: "All Products", slug: "all" }}
            isAll={true}
          />
        </li>
      </ul>
    </div>
  );
}
