import { AuthProvider } from "@/providers/Auth";
import { EcommerceProvider } from "@payloadcms/plugin-ecommerce/client/react";
import React from "react";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AuthProvider>
      <EcommerceProvider
        enableVariants={true}
        currenciesConfig={{
          defaultCurrency: "LKR",
          supportedCurrencies: [
            {
              code: "LKR",
              label: "Sri Lankan Rupee",
              symbol: "Rs ",
              decimals: 2,
            },
          ],
        }}
        api={{
          cartsFetchQuery: {
            depth: 2,
            populate: {
              products: {
                slug: true,
                title: true,
                gallery: true,
                inventory: true,
              },
              variants: {
                title: true,
                inventory: true,
              },
            },
          },
        }}
        paymentMethods={[]}
      >
        {children}
      </EcommerceProvider>
    </AuthProvider>
  );
};
