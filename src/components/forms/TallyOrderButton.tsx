"use client";

import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TallyOrderButtonProps {
  productTitle: string;
  priceInLKR: number;
  slug: string;
  formId?: string | null;
  className?: string;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  children?: React.ReactNode;
}

// Default fallback Tally form ID for SEDS Merchandise
const DEFAULT_TALLY_FORM_ID = "rj4eVo";

export function TallyOrderButton({
  productTitle,
  priceInLKR,
  slug,
  formId,
  className = "",
  variant = "default",
  size = "lg",
  children,
}: TallyOrderButtonProps) {
  const activeFormId = formId || DEFAULT_TALLY_FORM_ID;

  useEffect(() => {
    // Load Tally embed script dynamically
    const scriptSrc = "https://tally.so/widgets/embed.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Pre-fill query parameters for Tally
  const tallyQuery = `product_name=${encodeURIComponent(productTitle)}&price=${encodeURIComponent(priceInLKR)}&slug=${encodeURIComponent(slug)}&order_status=PENDING_VERIFICATION&status=PENDING_VERIFICATION`;

  return (
    <Button
      variant={variant}
      size={size}
      className={`font-semibold cursor-pointer gap-2 ${className}`}
      data-tally-open={activeFormId}
      data-tally-width="600"
      data-tally-overlay="1"
      data-tally-emoji-text="🚀"
      data-tally-emoji-animation="wave"
      data-tally-auto-close="5000"
      data-tally-custom-url={`https://tally.so/r/${activeFormId}?${tallyQuery}`}
    >
      {children || (
        <>
          <ShoppingCart className="w-5 h-5" /> Order Merchandise
        </>
      )}
    </Button>
  );
}
