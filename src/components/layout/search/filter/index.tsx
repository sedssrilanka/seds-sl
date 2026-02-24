import type { SortFilterItem } from "@/lib/constants";

import { Suspense } from "react";

import { FilterItemDropdown } from "./FilterItemDropdown";
export type ListItem = PathFilterItem | SortFilterItem;
export type PathFilterItem = { path: string; title: string };

export function FilterList({ list }: { list: ListItem[]; title?: string }) {
  return (
    <nav className="w-full">
      <Suspense fallback={null}>
        <FilterItemDropdown list={list} />
      </Suspense>
    </nav>
  );
}
