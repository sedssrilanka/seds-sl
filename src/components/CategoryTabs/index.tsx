import React from "react";
import { Item } from "./Item";

export function CategoryTabs() {
  return (
    <nav>
      <ul className="flex gap-3">
        <Item title="All Products" href="/shop" />
      </ul>
    </nav>
  );
}
