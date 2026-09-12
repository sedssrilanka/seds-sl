"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImage: string;
  gallery?: readonly string[] | null;
  title: string;
  badge?: string | null;
}

export function ProductGallery({
  mainImage,
  gallery = [],
  title,
  badge,
}: ProductGalleryProps) {
  const images = Array.from(
    new Set([mainImage, ...(gallery || [])].filter(Boolean) as string[]),
  );
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "/section-header/space-projects-bg.jpeg",
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container with SEDS Architectural Bleed Edge & Crisp Border */}
      <div className="relative aspect-square w-full bg-background border border-border/60 overflow-hidden">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />

        {badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border/80 text-foreground text-xs font-mono font-semibold uppercase tracking-wider">
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnails if multiple */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-20 bg-background border transition-colors shrink-0 cursor-pointer ${
                selectedImage === img
                  ? "border-primary ring-1 ring-primary"
                  : "border-border/60 hover:border-muted-foreground opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
