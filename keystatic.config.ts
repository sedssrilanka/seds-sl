import { config, fields, collection } from "@keystatic/core";

export default config({
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND === "github" ||
    (process.env.NODE_ENV === "production" &&
      Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID))
      ? {
          kind: "github",
          repo: {
            owner: "sedssrilanka",
            name: "seds-sl",
          },
        }
      : {
          kind: "local",
        },
  collections: {
    projects: collection({
      label: "Projects & Flagships",
      slugField: "name",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({
          name: {
            label: "Project Name",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Thumbnail / Cover Image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        chapter: fields.text({
          label: "Chapter Name (e.g. SEDS Mora, SEDS UoP)",
          description: "Optional: name of the associated chapter",
        }),
        isFeatured: fields.checkbox({
          label: "Feature this Project in Spotlight banner",
          defaultValue: false,
        }),
        customLink: fields.text({
          label: "Custom Page Link (Optional)",
          description:
            "e.g. /projects/observe-the-moon-night. Leave empty to use default page.",
        }),
        content: fields.markdoc({
          label: "Project Details & Content",
        }),
      },
    }),

    chapters: collection({
      label: "Chapters",
      slugField: "name",
      path: "src/content/chapters/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({
          name: {
            label: "Chapter Name",
            validation: { isRequired: true },
          },
        }),
        university: fields.text({
          label: "University / Institution",
          validation: { isRequired: false },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        logoDark: fields.image({
          label: "Dark Logo (Default)",
          directory: "public/images/chapters",
          publicPath: "/images/chapters/",
        }),
        logoLight: fields.image({
          label: "Light Logo (Optional)",
          directory: "public/images/chapters",
          publicPath: "/images/chapters/",
        }),
        mainImage: fields.image({
          label: "Main Image / Cover",
          directory: "public/images/chapters",
          publicPath: "/images/chapters/",
        }),
        contactEmail: fields.text({
          label: "Contact Email",
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: "Platform",
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "Twitter / X", value: "twitter" },
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
              ],
              defaultValue: "facebook",
            }),
            url: fields.text({ label: "Profile URL" }),
          }),
          {
            label: "Social Media Links",
            itemLabel: (props) =>
              `${props.fields.platform.value}: ${props.fields.url.value || "No URL"}`,
          },
        ),
        content: fields.markdoc({
          label: "Chapter Full Overview & History",
        }),
      },
    }),

    divisions: collection({
      label: "Divisions",
      slugField: "name",
      path: "src/content/divisions/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({
          name: {
            label: "Division Name",
            validation: { isRequired: true },
          },
        }),
        icon: fields.select({
          label: "Display Icon",
          options: [
            { label: "Bot (Robotics & Rovers)", value: "Bot" },
            { label: "Rocket (Rocketry & Propulsion)", value: "Rocket" },
            { label: "Laptop (Satellite & Space Systems)", value: "Laptop" },
            {
              label: "Telescope (Radio Astronomy & Observation)",
              value: "Telescope",
            },
            { label: "Plane (Aeronautics & Drones)", value: "Plane" },
            { label: "Microscope (Space Bio & Sciences)", value: "Microscope" },
            { label: "Users (Education & Outreach)", value: "Users" },
            { label: "Camera (Media & PR)", value: "Camera" },
            {
              label: "Briefcase (Operations & Management)",
              value: "Briefcase",
            },
          ],
          defaultValue: "Rocket",
        }),
        lead: fields.text({
          label: "Division Lead / Head",
        }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: "Division Overview & Projects",
        }),
      },
    }),

    products: collection({
      label: "Products & Merchandise",
      slugField: "title",
      path: "src/content/products/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Product Name",
            validation: { isRequired: true },
          },
        }),
        priceInLKR: fields.number({
          label: "Price (LKR)",
          validation: { isRequired: true, min: 0 },
        }),
        inStock: fields.checkbox({
          label: "In Stock / Available for Order",
          defaultValue: true,
        }),
        isPreOrder: fields.checkbox({
          label: "Pre-Order Item",
          description:
            "Enable if this item is in pre-order state (displays 'Pre-Order Now' instead of 'Proceed to Checkout')",
          defaultValue: false,
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Apparel", value: "Apparel" },
            { label: "Patches & Stickers", value: "Patches & Stickers" },
            { label: "Hardware & Kits", value: "Hardware & Kits" },
            { label: "Accessories", value: "Accessories" },
          ],
          defaultValue: "Apparel",
        }),
        badge: fields.text({
          label: "Ribbon Badge (e.g. Official Merch, Limited Edition)",
          defaultValue: "Official Merch",
        }),
        image: fields.image({
          label: "Product Main Image",
          directory: "public/images/products",
          publicPath: "/images/products/",
        }),
        gallery: fields.array(
          fields.image({
            label: "Gallery Image",
            directory: "public/images/products",
            publicPath: "/images/products/",
          }),
          {
            label: "Product Gallery Images",
            itemLabel: (props) =>
              typeof props.value === "string"
                ? props.value
                : props.value?.filename || "Gallery Image",
          },
        ),
        sizes: fields.array(
          fields.text({ label: "Size (e.g. S, M, L, XL, 2XL)" }),
          {
            label: "Available Sizes (Leave empty if not apparel)",
            itemLabel: (props) => props.value || "Size",
          },
        ),
        features: fields.array(fields.text({ label: "Feature / Highlight" }), {
          label: "Key Features & Highlights",
          itemLabel: (props) => props.value || "Feature",
        }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        tallyFormId: fields.text({
          label: "Custom Tally Form ID (Optional)",
          description:
            "e.g. rj4eVo. Leave blank to use default SEDS Merch Order Form.",
        }),
        content: fields.markdoc({
          label: "Product Details, Sizing & Information",
        }),
      },
    }),

    pages: collection({
      label: "Custom Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Page Title",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Meta Description",
          multiline: true,
        }),
        content: fields.markdoc({
          label: "Page Content",
        }),
      },
    }),
  },
});
