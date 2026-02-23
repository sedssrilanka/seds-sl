import type { CollectionSlug, Payload, PayloadRequest, File } from "payload";

import { contactFormData } from "./contact-form";
import { contactPageData } from "./contact-page";
import { productHatData } from "./product-hat";
import { productTshirtData, productTshirtVariant } from "./product-tshirt";
import { homePageData } from "./home";
import { imageHatData } from "./image-hat";
import { imageTshirtBlackData } from "./image-tshirt-black";
import { imageTshirtWhiteData } from "./image-tshirt-white";
import { imageHero1Data } from "./image-hero-1";
import type { Address, Transaction, VariantOption } from "@/payload-types";

const collections: CollectionSlug[] = [
  "categories",
  "media",
  "pages",
  "products",
  "forms",
  "form-submissions",
  "variants",
  "variantOptions",
  "variantTypes",
  "carts",
  "transactions",
  "addresses",
  "orders",
  "chapters",
  "projects",
  "divisions",
];

const categories = ["Accessories", "T-Shirts", "Hats"];

const sizeVariantOptions = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "X Large", value: "xlarge" },
];

const colorVariantOptions = [
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
];

const baseAddressUSData: Transaction["billingAddress"] = {
  title: "Dr.",
  firstName: "Otto",
  lastName: "Octavius",
  phone: "1234567890",
  company: "Oscorp",
  addressLine1: "123 Main St",
  addressLine2: "Suite 100",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "US",
};

const baseAddressUKData: Transaction["billingAddress"] = {
  title: "Mr.",
  firstName: "Oliver",
  lastName: "Twist",
  phone: "1234567890",
  addressLine1: "48 Great Portland St",
  city: "London",
  postalCode: "W1W 7ND",
  country: "GB",
};

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload;
  req: PayloadRequest;
}): Promise<void> => {
  payload.logger.info("Seeding database...");

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`);

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} });
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} });
    }
  }

  payload.logger.info(`— Seeding customer and customer data...`);

  await payload.delete({
    collection: "users",
    depth: 0,
    where: {
      email: {
        equals: "customer@example.com",
      },
    },
  });

  payload.logger.info(`— Seeding media...`);

  const [
    imageHatBuffer,
    imageTshirtBlackBuffer,
    imageTshirtWhiteBuffer,
    heroBuffer,
  ] = await Promise.all([
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/ecommerce/src/endpoints/seed/hat-logo.png",
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/ecommerce/src/endpoints/seed/tshirt-black.png",
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/ecommerce/src/endpoints/seed/tshirt-white.png",
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp",
    ),
  ]);

  const [
    customer,
    imageHat,
    imageTshirtBlack,
    imageTshirtWhite,
    imageHero,
    accessoriesCategory,
    tshirtsCategory,
    hatsCategory,
  ] = await Promise.all([
    payload.create({
      collection: "users",
      data: {
        name: "Customer",
        email: "customer@example.com",
        password: "password",
        roles: ["customer"],
      },
    }),
    payload.create({
      collection: "media",
      data: imageHatData,
      file: imageHatBuffer,
    }),
    payload.create({
      collection: "media",
      data: imageTshirtBlackData,
      file: imageTshirtBlackBuffer,
    }),
    payload.create({
      collection: "media",
      data: imageTshirtWhiteData,
      file: imageTshirtWhiteBuffer,
    }),
    payload.create({
      collection: "media",
      data: imageHero1Data,
      file: heroBuffer,
    }),
    ...categories.map((category) =>
      payload.create({
        collection: "categories",
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ]);

  payload.logger.info(`— Seeding variant types and options...`);

  const sizeVariantType = await payload.create({
    collection: "variantTypes",
    data: {
      name: "size",
      label: "Size",
    },
  });

  const sizeVariantOptionsResults: VariantOption[] = [];

  for (const option of sizeVariantOptions) {
    const result = await payload.create({
      collection: "variantOptions",
      data: {
        ...option,
        variantType: sizeVariantType.id,
      },
    });
    sizeVariantOptionsResults.push(result);
  }

  const [small, medium, large, xlarge] = sizeVariantOptionsResults;

  const colorVariantType = await payload.create({
    collection: "variantTypes",
    data: {
      name: "color",
      label: "Color",
    },
  });

  const [black, white] = await Promise.all(
    colorVariantOptions.map((option) => {
      return payload.create({
        collection: "variantOptions",
        data: {
          ...option,
          variantType: colorVariantType.id,
        },
      });
    }),
  );

  payload.logger.info(`— Seeding products...`);

  const productHat = await payload.create({
    collection: "products",
    depth: 0,
    data: productHatData({
      galleryImage: imageHat,
      metaImage: imageHat,
      variantTypes: [colorVariantType],
      categories: [hatsCategory],
      relatedProducts: [],
    }),
  });

  const productTshirt = await payload.create({
    collection: "products",
    depth: 0,
    data: productTshirtData({
      galleryImages: [
        { image: imageTshirtBlack, variantOption: black },
        { image: imageTshirtWhite, variantOption: white },
      ],
      metaImage: imageTshirtBlack,
      contentImage: imageHero,
      variantTypes: [colorVariantType, sizeVariantType],
      categories: [tshirtsCategory],
      relatedProducts: [productHat],
    }),
  });

  let hoodieID: number | string = productTshirt.id;

  if (payload.db.defaultIDType === "text") {
    hoodieID = `"${hoodieID}"`;
  }

  const [
    smallTshirtHoodieVariant,
    mediumTshirtHoodieVariant,
    largeTshirtHoodieVariant,
    xlargeTshirtHoodieVariant,
  ] = await Promise.all(
    [small, medium, large, xlarge].map((variantOption) =>
      payload.create({
        collection: "variants",
        depth: 0,
        data: productTshirtVariant({
          product: productTshirt,
          variantOptions: [variantOption, white],
        }),
      }),
    ),
  );

  await Promise.all(
    [small, medium, large, xlarge].map((variantOption) =>
      payload.create({
        collection: "variants",
        depth: 0,
        data: productTshirtVariant({
          product: productTshirt,
          variantOptions: [variantOption, black],
          ...(variantOption.value === "medium" ? { inventory: 0 } : {}),
        }),
      }),
    ),
  );

  payload.logger.info(`— Seeding contact form...`);

  const contactForm = await payload.create({
    collection: "forms",
    depth: 0,
    data: contactFormData(),
  });

  payload.logger.info(`— Seeding pages...`);

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: "pages",
      depth: 0,
      data: homePageData({
        contentImage: imageHero,
        metaImage: imageHat,
      }),
    }),
    payload.create({
      collection: "pages",
      depth: 0,
      data: contactPageData({
        contactForm: contactForm,
      }),
    }),
  ]);

  payload.logger.info(`— Seeding addresses...`);

  const customerUSAddress = await payload.create({
    collection: "addresses",
    depth: 0,
    data: {
      customer: customer.id,
      ...(baseAddressUSData as Address),
    },
  });

  const customerUKAddress = await payload.create({
    collection: "addresses",
    depth: 0,
    data: {
      customer: customer.id,
      ...(baseAddressUKData as Address),
    },
  });

  payload.logger.info(`— Seeding transactions...`);

  const pendingTransaction = await payload.create({
    collection: "transactions",
    data: {
      currency: "USD",
      customer: customer.id,
      status: "pending",
      billingAddress: baseAddressUSData,
    },
  });

  const succeededTransaction = await payload.create({
    collection: "transactions",
    data: {
      currency: "USD",
      customer: customer.id,
      status: "succeeded",
      billingAddress: baseAddressUSData,
    },
  });

  let succeededTransactionID: number | string = succeededTransaction.id;

  if (payload.db.defaultIDType === "text") {
    succeededTransactionID = `"${succeededTransactionID}"`;
  }

  payload.logger.info(`— Seeding carts...`);

  // This cart is open as it's created now
  const openCart = await payload.create({
    collection: "carts",
    data: {
      customer: customer.id,
      currency: "USD",
      items: [
        {
          product: productTshirt.id,
          variant: mediumTshirtHoodieVariant.id,
          quantity: 1,
        },
      ],
    },
  });

  const oldTimestamp = new Date("2023-01-01T00:00:00Z").toISOString();

  // Cart is abandoned because it was created long in the past
  const abandonedCart = await payload.create({
    collection: "carts",
    data: {
      currency: "USD",
      createdAt: oldTimestamp,
      items: [
        {
          product: productHat.id,
          quantity: 1,
        },
      ],
    },
  });

  // Cart is purchased because it has a purchasedAt date
  const completedCart = await payload.create({
    collection: "carts",
    data: {
      customer: customer.id,
      currency: "USD",
      purchasedAt: new Date().toISOString(),
      subtotal: 7499,
      items: [
        {
          product: productTshirt.id,
          variant: smallTshirtHoodieVariant.id,
          quantity: 1,
        },
        {
          product: productTshirt.id,
          variant: mediumTshirtHoodieVariant.id,
          quantity: 1,
        },
      ],
    },
  });

  let completedCartID: number | string = completedCart.id;

  if (payload.db.defaultIDType === "text") {
    completedCartID = `"${completedCartID}"`;
  }

  payload.logger.info(`— Seeding orders...`);

  const orderInCompleted = await payload.create({
    collection: "orders",
    data: {
      amount: 7499,
      currency: "USD",
      customer: customer.id,
      shippingAddress: baseAddressUSData,
      items: [
        {
          product: productTshirt.id,
          variant: smallTshirtHoodieVariant.id,
          quantity: 1,
        },
        {
          product: productTshirt.id,
          variant: mediumTshirtHoodieVariant.id,
          quantity: 1,
        },
      ],
      status: "completed",
      transactions: [succeededTransaction.id],
    },
  });

  const orderInProcessing = await payload.create({
    collection: "orders",
    data: {
      amount: 7499,
      currency: "USD",
      customer: customer.id,
      shippingAddress: baseAddressUSData,
      items: [
        {
          product: productTshirt.id,
          variant: smallTshirtHoodieVariant.id,
          quantity: 1,
        },
        {
          product: productTshirt.id,
          variant: mediumTshirtHoodieVariant.id,
          quantity: 1,
        },
      ],
      status: "processing",
      transactions: [succeededTransaction.id],
    },
  });

  payload.logger.info(`— Seeding chapters...`);

  const sedsUOC = await payload.create({
    collection: "chapters",
    data: {
      name: "SEDS UOC",
      slug: "seds-uoc",
      mainImage: imageHero.id,
      gallery: [
        {
          image: imageHero.id,
          caption: "SEDS UOC Team",
        },
      ],
      description:
        "Students for the Exploration and Development of Space at University of Colombo.",
      content: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Welcome to SEDS UOC. We are dedicated to space exploration.",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      },
      socialLinks: [
        {
          platform: "facebook",
          url: "https://facebook.com/sedsuoc",
        },
        {
          platform: "linkedin",
          url: "https://linkedin.com/company/sedsuoc",
        },
      ],
    },
  });

  const sedsMora = await payload.create({
    collection: "chapters",
    data: {
      name: "SEDS Mora",
      slug: "seds-mora",
      mainImage: imageHat.id,
      gallery: [
        {
          image: imageHat.id,
          caption: "SEDS Mora Logo",
        },
      ],
      description: "SEDS Chapter at the University of Moratuwa.",
      content: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "SEDS Mora is one of the leading student space chapters in Sri Lanka.",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      },
      socialLinks: [
        {
          platform: "instagram",
          url: "https://instagram.com/sedsmora",
        },
      ],
    },
  });

  payload.logger.info(`— Seeding projects...`);

  await payload.create({
    collection: "projects",
    data: {
      name: "Mars Rover",
      slug: "mars-rover",
      chapter: sedsMora.id,
      image: imageHero.id,
      _status: "published",
      hero: { type: "none" },
      description: "A prototype Mars Rover built by SEDS Mora students.",
      layout: [
        {
          blockType: "content",
          columns: [
            {
              size: "full",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "This project aims to design and build a functional rover for simulated Martian terrain.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },
  });

  await payload.create({
    collection: "projects",
    data: {
      name: "High Altitude Balloon",
      slug: "hab-uoc",
      chapter: sedsUOC.id,
      image: imageTshirtBlack.id, // Using existing image as placeholder
      _status: "published",
      hero: { type: "none" },
      description: "Weather balloon project to capture atmospheric data.",
      layout: [
        {
          blockType: "content",
          columns: [
            {
              size: "full",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Our High Altitude Balloon reached 30km and captured stunning images of the curvature of the Earth.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },
  });

  payload.logger.info(`— Seeding divisions...`);

  const divisionsToCreate = [
    { name: "Robotic & Rover Division", icon: "Bot" },
    { name: "Rocketry Division", icon: "Rocket" },
    { name: "Satellite & IT Division", icon: "Laptop" },
    { name: "Aeronautical Division", icon: "Plane" },
    { name: "Biomedical & Earth Science Division", icon: "Microscope" },
    { name: "Observation & Camping Division", icon: "Telescope" },
    { name: "Finance Division", icon: "Briefcase" },
    { name: "Media Division", icon: "Camera" },
  ];

  for (const divsi of divisionsToCreate) {
    await payload.create({
      collection: "divisions",
      data: {
        name: divsi.name,
        icon: divsi.icon,
        description: `This is the ${divsi.name} of SEDS Sri Lanka.`,
        hero: {
          type: "highImpact",
          media: imageHero.id,
          richText: {
            root: {
              type: "root",
              children: [
                {
                  type: "heading",
                  children: [
                    {
                      type: "text",
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: divsi.name,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  tag: "h1",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
        content: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: `Welcome to the ${divsi.name} page. We will update this section with more detailed information soon.`,
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
      },
    } as any);
  }

  payload.logger.info("Seeded database successfully!");
};

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`);
  }

  const data = await res.arrayBuffer();

  return {
    name: url.split("/").pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split(".").pop()}`,
    size: data.byteLength,
  };
}
