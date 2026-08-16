"use client";
import type React from "react";
import { useCallback, useMemo } from "react";

import type { Category } from "@/payload-types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

type Props = {
  category: Category;
  isAll?: boolean;
};

export const CategoryItem: React.FC<Props> = ({ category, isAll }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = useMemo(() => {
    if (isAll) {
      return !searchParams.has("category");
    }
    return searchParams.get("category") === String(category.id);
  }, [category.id, searchParams, isAll]);

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (isAll) {
      params.delete("category");
    } else {
      if (isActive) {
        params.delete("category");
      } else {
        params.set("category", String(category.id));
      }
    }

    const newParams = params.toString();

    router.push(pathname + "?" + newParams);
  }, [category.id, isActive, pathname, router, searchParams, isAll]);

  return (
    <button
      type="button"
      onClick={() => setQuery()}
      className="focus:outline-none"
    >
      <Badge
        variant={isActive ? "default" : "secondary"}
        className={clsx(
          "px-4 py-1.5 text-sm whitespace-nowrap transition-all duration-200 cursor-pointer font-medium hover:opacity-80",
          {
            "bg-primary text-primary-foreground shadow-sm": isActive,
            "bg-muted/50 text-muted-foreground hover:bg-muted/80": !isActive,
          },
        )}
      >
        {category.title}
      </Badge>
    </button>
  );
};
