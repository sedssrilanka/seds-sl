import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import type { Plugin } from "payload";
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { ecommercePlugin } from "@payloadcms/plugin-ecommerce";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";

import { s3Storage } from "@payloadcms/storage-s3";

import type { Product, Page } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";
import { ProductsCollection } from "@/collections/Products";
import { adminOrPublishedStatus } from "@/access/adminOrPublishedStatus";
import { adminOnlyFieldAccess } from "@/access/adminOnlyFieldAccess";
import { customerOnlyFieldAccess } from "@/access/customerOnlyFieldAccess";
import { isAdmin } from "@/access/isAdmin";
import { isDocumentOwner } from "@/access/isDocumentOwner";

const generateTitle: GenerateTitle<Product | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | SEDS Sri Lanka` : "SEDS Sri Lanka";
};

const generateURL: GenerateURL<Product | Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  ecommercePlugin({
    access: {
      adminOnlyFieldAccess,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
      isAdmin,
      isDocumentOwner,
    },
    customers: {
      slug: "users",
    },

    products: {
      productsCollectionOverride: ProductsCollection,
    },
  }),
  payloadCloudPlugin(),
  s3Storage({
    collections: {
      media: {
        prefix: "media",
      },
    },
    bucket: process.env.S3_BUCKET || "",
    config: {
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
      },
      region: process.env.S3_REGION || "",
      endpoint: process.env.S3_ENDPOINT || "",
    },
  }),

  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      admin: {
        group: "Content",
      },
    },
    formOverrides: {
      admin: {
        group: "Content",
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "confirmationMessage") {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                  ];
                },
              }),
            };
          }
          return field;
        });
      },
    },
  }),
];
