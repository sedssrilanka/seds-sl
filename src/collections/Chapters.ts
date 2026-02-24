import type { CollectionConfig } from "payload";

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
      ({ data }) => {
        const typedData = data as ChapterData;
        if (typedData?.name) {
          typedData.slug = generateSlug(typedData.name);
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
