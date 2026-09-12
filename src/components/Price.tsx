import type React from "react";

type BaseProps = {
  className?: string;
  currencyCodeClassName?: string;
  as?: "span" | "p";
};

type PriceFixed = {
  amount: number;
  currencyCode?: string;
  highestAmount?: never;
  lowestAmount?: never;
};

type PriceRange = {
  amount?: never;
  currencyCode?: string;
  highestAmount: number;
  lowestAmount: number;
};

type Props = BaseProps & (PriceFixed | PriceRange);

export const Price = ({
  amount,
  className,
  highestAmount,
  lowestAmount,
  currencyCode = "LKR",
  as = "p",
}: Props & React.ComponentProps<"p">) => {
  const Element = as;

  const formatPrice = (val: number) => {
    return `${currencyCode} ${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (typeof amount === "number") {
    return (
      <Element className={className} suppressHydrationWarning>
        {formatPrice(amount)}
      </Element>
    );
  }

  if (
    highestAmount &&
    highestAmount !== lowestAmount &&
    typeof lowestAmount === "number"
  ) {
    return (
      <Element className={className} suppressHydrationWarning>
        {`${formatPrice(lowestAmount)} - ${formatPrice(highestAmount)}`}
      </Element>
    );
  }

  if (typeof lowestAmount === "number") {
    return (
      <Element className={className} suppressHydrationWarning>
        {formatPrice(lowestAmount)}
      </Element>
    );
  }

  return null;
};

export default Price;
