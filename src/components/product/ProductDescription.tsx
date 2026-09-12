"use client";
import type { Product } from "@/types";
import React from "react";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";

export function ProductDescription({ product }: { product: Product }) {
  const amount = product.priceInLKR || 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{product.title}</h1>
        <div className="text-2xl font-bold text-indigo-400 mt-2">
          Rs. {amount.toLocaleString()}
        </div>
      </div>

      <div className="text-zinc-300 text-sm leading-relaxed">
        {typeof product.description === "string" ? product.description : ""}
      </div>

      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-border/40 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-indigo-400" /> Islandwide Delivery
          Available
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" /> Official SEDS Sri
          Lanka Merch
        </div>
      </div>
    </div>
  );
}
