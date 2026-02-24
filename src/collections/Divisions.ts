import type { CollectionConfig } from "payload";
import { hero } from "@/fields/hero";
import {
  lexicalEditor,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  UploadFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import type { CollectionSlug } from "payload";

interface DivisionData {
  name?: string;
  slug?: string;
}

const generateSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const Divisions: CollectionConfig = {
  slug: "divisions",
  admin: {
    useAsTitle: "name",
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "divisions" as CollectionSlug,
        req,
      }),
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const typedData = data as DivisionData;
        if (typedData?.name) {
          const base = generateSlug(typedData.name);
          let slug = base;

          try {
            if (req?.payload) {
              const existing = await req.payload.find({
                collection: "divisions",
                where: { slug: { equals: slug } },
                limit: 1,
              });
              if (existing?.docs?.length > 0) {
                slug = `${base}-${Date.now()}`;
              }
            }
          } catch (err) {
            console.error("Error checking existing slug for divisions:", err);
          }

          typedData.slug = slug;
        }
        return typedData;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: "Auto-generated from the Name field",
        position: "sidebar",
      },
    },
    {
      name: "icon",
      type: "text",
      label: "Icon Name",
      required: true,
      admin: {
        description: "A Lucide React icon name (e.g. 'Rocket', 'Bot', 'Plane')",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          label: "Content",
          fields: [
            {
              name: "description",
              type: "textarea",
              label: "Short Description",
              required: true,
              admin: {
                description: "Shown on listing cards.",
              },
            },
            {
              name: "content",
              type: "richText",
              label: "Detailed Content",
              required: true,
              admin: {
                description: "Shown on the division's dedicated page.",
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HeadingFeature({
                    enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                  }),
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  StrikethroughFeature(),
                  LinkFeature(),
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  BlockquoteFeature(),
                  HorizontalRuleFeature(),
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          {
                            name: "caption",
                            type: "richText",
                            label: "Caption",
                          },
                        ],
                      },
                    },
                  }),
                ],
              }),
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: "media" }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
  ],
};
