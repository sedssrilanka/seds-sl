import type { CollectionConfig } from "payload";

interface ProjectData {
  name?: string;
  slug?: string;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-')        // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '');     // Remove hyphens from start and end
};

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        const typedData = data as ProjectData;
        if (typedData?.name) {
          typedData.slug = generateSlug(typedData.name);
        }
        return typedData;
      }
    ]
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
        description: 'Auto-generated from the Name field',
        position: 'sidebar',
      },
    },
    {
      name: "image",
      type: 'upload',
      relationTo: 'media',
      label: "Image"
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
    }
  ],
};
