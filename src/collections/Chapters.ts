import type { CollectionConfig } from "payload";
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

interface ChapterData {
  name?: string;
  slug?: string;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove hyphens from start and end
};

export const Chapters: CollectionConfig = {
  slug: "chapters",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const typedData = data as ChapterData;
        if (typedData?.name) {
          const base = generateSlug(typedData.name);
          let slug = base;

          // Check for duplicate slugs (handles duplication in admin)
          try {
            if (req?.payload) {
              const existing = await req.payload.find({
                collection: "chapters",
                where: {
                  slug: {
                    equals: slug,
                  },
                },
                limit: 1,
              });

              if (
                existing &&
                Array.isArray(existing.docs) &&
                existing.docs.length > 0
              ) {
                // Append timestamp to make unique
                slug = `${base}-${Date.now()}`;
              }
            }
          } catch (err) {
            console.error("Error checking existing slug for chapters:", err);
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
      name: "logoDark",
      type: "upload",
      relationTo: "media",
      label: "Dark Logo (Required, Default)",
      required: true,
      validate: (value: any) => (value ? true : "This field is required"),
    },
    {
      name: "logoLight",
      type: "upload",
      relationTo: "media",
      label: "Light Logo (Optional)",
    },
    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      label: "Main Image",
      validate: (value: any) => (value ? true : "This field is required"),
    },
    {
      name: "gallery",
      type: "array",
      label: "Image Gallery",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          validate: (value: any) => (value ? true : "This field is required"),
        },
        {
          name: "caption",
          type: "text",
          label: "Image Caption",
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
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
    {
      name: "contactEmail",
      type: "email",
      label: "Chapter Contact Email",
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Media Links",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Twitter", value: "twitter" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
          ],
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
