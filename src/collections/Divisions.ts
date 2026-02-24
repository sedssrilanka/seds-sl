import type { CollectionConfig } from "payload";
import { hero } from "@/fields/hero";

interface DivisionData {
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

export const Divisions: CollectionConfig = {
  slug: "divisions",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true, // Publicly readable for the frontend
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const typedData = data as DivisionData;
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
      name: "icon",
      type: "text",
      label: "Icon Name",
      required: true,
      admin: {
        description:
          "The Lucide React icon name (e.g., 'Rocket', 'Bot', 'Plane')",
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
          fields: [
            {
              name: "description",
              type: "textarea",
              label: "Short Description",
              required: true,
              admin: {
                description:
                  "This will be displayed on the division listing cards.",
              },
            },
            {
              name: "content",
              type: "richText",
              label: "Detailed Content",
              required: true,
              admin: {
                description:
                  "This will be displayed on the division's dedicated page.",
              },
            },
          ],
          label: "Content",
        },
      ],
    },
  ],
};
