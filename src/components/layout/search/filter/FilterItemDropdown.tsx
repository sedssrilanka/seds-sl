"use client";

import { ChevronDownIcon, ArrowUpDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ListItem } from ".";

import { FilterItem } from "./FilterItem";
import clsx from "clsx";

export function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("Sort by");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    let newActive = "Sort by";
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        newActive = listItem.title;
      }
    });
    setActive(newActive);
  }, [pathname, list, searchParams]);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-muted-foreground/20 bg-background/50 px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
      >
        <span className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <span className="truncate">{active}</span>
        </span>
        <ChevronDownIcon
          className={clsx(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            { "rotate-180": openSelect },
          )}
        />
      </button>
      {openSelect && (
        <div className="absolute z-50 w-full mt-2 rounded-xl bg-card border shadow-lg border-muted/50 overflow-hidden">
          <ul
            className="w-full flex flex-col m-0 p-1"
            onClick={() => {
              setOpenSelect(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpenSelect(false);
              }
            }}
          >
            {list.map((item: ListItem, i) => (
              <li
                key={i}
                className="list-none px-2 py-1.5 hover:bg-muted/50 rounded-md transition-colors m-0.5"
              >
                <FilterItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
