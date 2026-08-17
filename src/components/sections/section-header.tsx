"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionHeaderProps {
  title: string;
  description: React.ReactNode;
  image: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  image,
  children,
  align = "center",
}) => {
  const isLeft = align === "left";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth Zoom-In on Scroll Down, Smooth Zoom-Out on Scroll Up
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[200px] md:min-h-[250px] lg:min-h-[300px] overflow-hidden"
    >
      {/* Background image with scroll-driven zoom in/out effect */}
      <motion.div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          filter: "grayscale(100%) brightness(0.8)",
          scale,
        }}
      />

      {/* Adaptive overlay - lighter in light mode, darker in dark mode */}
      <div className="absolute inset-0 bg-white/95 dark:bg-black/80" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 flex flex-col justify-center min-h-[200px] md:min-h-[250px] lg:min-h-[300px] w-full text-foreground ${
          isLeft
            ? "items-start text-left p-6 md:p-8 lg:p-12"
            : "items-center text-center p-4 md:p-6 lg:p-8"
        }`}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-0 md:px-2 drop-shadow-sm text-primary">
          {title}
        </h2>
        <div className="text-sm md:text-base lg:text-lg mt-2 md:mt-3 px-0 md:px-2 max-w-4xl drop-shadow-sm">
          {description}
        </div>
        {children && (
          <div className="mt-4 md:mt-6 px-0 md:px-2">{children}</div>
        )}
      </motion.div>
    </div>
  );
};
