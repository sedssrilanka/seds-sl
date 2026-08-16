"use client";

import { cn } from "@/utilities/cn";
import { createUrl } from "@/utilities/createUrl";
import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef } from "react";

type Props = {
  className?: string;
};

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams?.get("q") || "";
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (term) {
      newParams.set("q", term);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/shop", newParams));
  }, 300);

  const clearSearch = () => {
    setValue("");
    handleSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative group w-full", className)}>
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
      <input
        ref={inputRef}
        autoComplete="off"
        className="w-full rounded-full border border-border/50 bg-background/50 backdrop-blur-md pl-11 pr-10 py-2.5 text-sm text-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
        name="search"
        placeholder="Search projects, rovers, rockets..."
        type="text"
      />
      {value && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
