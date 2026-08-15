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
import { defaultCountries } from "@payloadcms/plugin-ecommerce/client/react";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";

import { s3Storage } from "@payloadcms/storage-s3";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

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

const storageAdapter = process.env.STORAGE_ADAPTER || "s3";

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

    currencies: {
      defaultCurrency: "LKR",
      supportedCurrencies: [
        {
          code: "LKR",
          label: "Sri Lankan Rupee",
          symbol: "Rs",
          decimals: 2,
        },
        {
          code: "USD",
          label: "US Dollar",
          symbol: "$",
          decimals: 2,
        },
      ],
    },

    customers: {
      slug: "users",
    },

    products: {
      productsCollectionOverride: ProductsCollection,
    },

    orders: {
      ordersCollectionOverride: ({ defaultCollection }) => {
        const fields = (defaultCollection.fields || []).map((field) => {
          if ("name" in field && field.name === "status") {
            return {
              ...field,
              type: "select" as const,
              defaultValue: "pending",
              options: [
                { label: "Pending Review", value: "pending" },
                { label: "Processing", value: "processing" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Refunded", value: "refunded" },
              ],
            };
          }
          return field;
        });

        return {
          ...defaultCollection,
          fields: [
            ...fields,
            {
              name: "paymentMethod",
              type: "select" as const,
              defaultValue: "bank_transfer",
              admin: {
                position: "sidebar",
              },
              options: [
                { label: "Bank Transfer", value: "bank_transfer" },
                { label: "Cash on Delivery", value: "cod" },
              ],
            },
          ] as any,
          hooks: {
            ...defaultCollection.hooks,
            afterChange: [
              ...(defaultCollection.hooks?.afterChange || []),
              async ({ doc, previousDoc, req }) => {
                if (
                  previousDoc?.status === "pending" &&
                  doc.status === "processing"
                ) {
                  try {
                    const siteUrl = getServerSideURL();
                    await req.payload.sendEmail({
                      to: doc.customerEmail,
                      subject: `Payment Approved! Your Order #${doc.id} is Processing - SEDS Sri Lanka`,
                      html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                          <h2 style="color: #111;">Your Payment Proof Has Been Approved!</h2>
                          <p>Hi there,</p>
                          <p>Great news! Our team has verified your bank transfer payment proof for <strong>Order #${doc.id}</strong>.</p>
                          <p>Your order status has been updated to <strong>Processing</strong> and is now being prepared.</p>
                          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                          <p style="font-size: 14px; color: #555;">Order ID: #${doc.id}</p>
                          <p style="font-size: 14px; color: #555;">Total Amount: Rs. ${doc.amount?.toLocaleString()}</p>
                          <p style="margin-top: 20px;">
                            <a href="${siteUrl}/orders/${doc.id}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Order Status</a>
                          </p>
                        </div>
                      `,
                    });
                  } catch (err) {
                    console.error("Failed to send order approval email:", err);
                  }
                }

                if (
                  previousDoc?.status !== "cancelled" &&
                  doc.status === "cancelled"
                ) {
                  try {
                    const siteUrl = getServerSideURL();
                    await req.payload.sendEmail({
                      to: doc.customerEmail,
                      subject: `Update regarding Order #${doc.id} - SEDS Sri Lanka`,
                      html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                          <h2 style="color: #111;">Order #${doc.id} Status Update</h2>
                          <p>Your order status has been updated to <strong>Cancelled</strong>.</p>
                          <p>If you have any questions or believe this is an error, please reach out to us by replying to this email.</p>
                          <p style="margin-top: 20px;">
                            <a href="${siteUrl}/orders/${doc.id}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Order Details</a>
                          </p>
                        </div>
                      `,
                    });
                  } catch (err) {
                    console.error(
                      "Failed to send order cancellation email:",
                      err,
                    );
                  }
                }
              },
            ],
          },
        };
      },
    },

    addresses: {
      supportedCountries: [
        {
          label: "Sri Lanka",
          value: "LK",
        },
        ...defaultCountries.filter((c) => {
          const val = typeof c === "string" ? c : c.value;
          return val !== "LK";
        }),
      ],
    },
  }),
  payloadCloudPlugin(),
  s3Storage({
    enabled: storageAdapter === "s3",
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
  vercelBlobStorage({
    enabled: storageAdapter === "vercel-blob",
    collections: {
      media: {
        prefix: "media",
      },
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || "",
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
