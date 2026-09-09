import type { Metadata } from "next";
import type { Page, Product } from "@/types";

export const generateMeta = async (args: {
  doc: Page | Product | any;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === "object" &&
    doc?.meta?.image !== null &&
    "url" in doc.meta.image
      ? `${process.env.NEXT_PUBLIC_SERVER_URL || ""}${doc.meta.image.url}`
      : undefined;

  return {
    description: doc?.meta?.description || doc?.description || "",
    openGraph: {
      description: doc?.meta?.description || doc?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: doc?.meta?.title || doc?.title || doc?.name || "SEDS Sri Lanka",
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    },
    title: doc?.meta?.title || doc?.title || doc?.name || "SEDS Sri Lanka",
  };
};
