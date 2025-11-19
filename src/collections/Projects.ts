import type { CollectionConfig } from "payload";

interface ProjectData {
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

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const typedData = data as ProjectData;
        if (typedData?.name) {
          const base = generateSlug(typedData.name);
          let slug = base;

          // Try to avoid duplicate slugs on create/duplicate by checking existing records
          try {
            if (req?.payload) {
              const existing = await req.payload.find({
                collection: "projects",
                where: {
                  slug: {
                    equals: slug,
                  },
                },
                limit: 1,
              });

              // Payload's response contains `docs` array; check length instead of `total`
              if (
                existing &&
                Array.isArray(existing.docs) &&
                existing.docs.length > 0
              ) {
                // append timestamp to make unique (simple and reliable)
                slug = `${base}-${Date.now()}`;
              }
            }
          } catch (err) {
            // if anything goes wrong, fall back to base slug
            console.error("Error checking existing slug for projects:", err);
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
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      label: "Chapter",
      required: false,
      hasMany: false,
      admin: {
        description: "Optional: associate this project with a Chapter",
      },
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
  ],
};
