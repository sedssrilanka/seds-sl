"use client";

import type { Media as MediaType, Product } from "@/payload-types";

import { Media } from "@/components/Media";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { DefaultDocumentIDType } from "payload";
import { cn } from "@/lib/utils";

type Props = {
  gallery: NonNullable<Product["gallery"]>;
};

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    const values = searchParams.values().toArray();

    if (values && api) {
      const index = gallery.findIndex((item) => {
        if (!item.variantOption) return false;

        let variantID: DefaultDocumentIDType;

        if (typeof item.variantOption === "object") {
          variantID = item.variantOption.id;
        } else variantID = item.variantOption;

        return Boolean(values.find((value) => value === String(variantID)));
      });
      if (index !== -1) {
        setCurrent(index);
        api.scrollTo(index, true);
      }
    }
  }, [searchParams, api, gallery]);

  return (
    <div className="relative w-full">
      {/* Touch-Swipeable Main Image Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full relative rounded-2xl overflow-hidden bg-secondary/30 border border-border/40 group/gallery"
        opts={{ align: "start", loop: false }}
      >
        <CarouselContent className="-ml-0">
          {gallery.map((item, i) => {
            if (typeof item.image !== "object" || !item.image) return null;

            return (
              <CarouselItem
                className="pl-0 basis-full touch-pan-y select-none cursor-grab active:cursor-grabbing"
                key={`${item.image.id}-${i}`}
              >
                <div className="relative w-full aspect-square flex items-center justify-center p-0 overflow-hidden group/slide">
                  <Media
                    resource={item.image}
                    className="w-full h-full relative overflow-hidden"
                    imgClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/slide:scale-105"
                    fill
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Floating Navigation Arrows (Desktop) */}
        {gallery.length > 1 && (
          <>
            <CarouselPrevious className="left-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-md border-border/60 hover:bg-background" />
            <CarouselNext className="right-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-md border-border/60 hover:bg-background" />
          </>
        )}

        {/* Floating Bottom Flowing Thumbnail/Dot Indicators */}
        {gallery.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-background/80 dark:bg-background/90 backdrop-blur-md border border-border/50 shadow-sm pointer-events-auto max-w-[90%] overflow-x-auto no-scrollbar">
              {gallery.map((item, i) => {
                if (typeof item.image !== "object" || !item.image) return null;
                const isSelected = i === current;

                return (
                  <button
                    type="button"
                    key={`thumb-${item.image.id}-${i}`}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      "relative transition-all duration-300 rounded-full cursor-pointer flex-none overflow-hidden",
                      isSelected
                        ? "w-8 h-8 ring-2 ring-primary ring-offset-1 ring-offset-background"
                        : "w-7 h-7 opacity-60 hover:opacity-100",
                    )}
                  >
                    <Media
                      resource={item.image}
                      className="w-full h-full relative"
                      imgClassName="w-full h-full object-cover"
                      fill
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
};
