import type { CollectionConfig } from "payload";

export const ObserveMoonEvents: CollectionConfig = {
  slug: "observe-moon-events",
  admin: {
    group: "Projects & Initiatives",
    useAsTitle: "title",

    defaultColumns: [
      "title",
      "year",
      "eventDate",
      "isPaid",
      "status",
      "createdAt",
    ],
  },

  access: {
    read: ({ req }) => {
      // Allow public read if status is published
      if (!req.user) {
        return {
          status: {
            equals: "published",
          },
        };
      }
      return true;
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Event Title",
    },
    {
      name: "year",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Event Year (e.g. 2026)",
    },
    {
      name: "eventDate",
      type: "date",
      label: "Event Date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMMM d, yyyy",
        },
      },
    },
    {
      name: "startTime",
      type: "date",
      label: "Start Time (Sri Lanka Time +05:30)",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "hh:mm a",
        },
      },
    },
    {
      name: "endTime",
      type: "date",
      label: "End Time (Sri Lanka Time +05:30)",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "hh:mm a",
        },
      },
    },

    {
      name: "description",
      type: "textarea",
      label: "Event Description",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Short Description for Project Listing Card",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero / Header Image",
    },
    {
      name: "listingImage",
      type: "upload",
      relationTo: "media",
      label: "Listing Thumbnail Image for Projects Page",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: true,
      label: "Feature on Projects Page",
      admin: {
        description:
          "Check to display this flagship event in the Featured spotlight banner on Projects page",
      },
    },

    {
      name: "isPaid",
      type: "checkbox",
      defaultValue: false,
      label: "Is Paid Event?",
    },
    {
      name: "ticketPrice",
      type: "text",
      label: "Ticket Price / Fee (e.g. LKR 1,000)",
      admin: {
        condition: (data) => Boolean(data?.isPaid),
      },
    },
    {
      name: "bankAccountNumber",
      type: "text",
      label:
        "Bank Account Number (shown as copyable field on registration form)",
      admin: {
        condition: (data) => Boolean(data?.isPaid),
      },
    },
    {
      name: "paymentDetails",
      type: "textarea",
      label: "Bank Account Transfer & Payment Details",
      admin: {
        condition: (data) => Boolean(data?.isPaid),
      },
    },
    {
      name: "agenda",
      type: "array",
      label: "Event Agenda & Schedule",
      fields: [
        {
          name: "time",
          type: "text",
          required: true,
          label: "Time (e.g. 06:30 PM)",
        },
        {
          name: "stage",
          type: "text",
          defaultValue: "PHASE 01",
          label: "Stage / Phase Tag",
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Session Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Session Description",
        },
      ],
    },
    {
      name: "locations",
      type: "array",
      label: "Observation Host Locations",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Location Name (e.g. Galle Face Green)",
        },
        {
          name: "city",
          type: "text",
          label: "City / Address (e.g. Colombo 03)",
        },
        {
          name: "latitude",
          type: "number",
          required: true,
          label: "Latitude Coordinate",
        },
        {
          name: "longitude",
          type: "number",
          required: true,
          label: "Longitude Coordinate",
        },
        {
          name: "isPrimary",
          type: "checkbox",
          defaultValue: false,
          label: "Primary Host Site",
        },
      ],
    },
    {
      name: "partners",
      type: "array",
      label: "Event Partners & Sponsors",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Partner / Sponsor Name",
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Partner Logo",
        },
        {
          name: "partnershipType",
          type: "select",
          defaultValue: "Sponsor",
          options: [
            { label: "Sponsor", value: "Sponsor" },
            { label: "Global Partner", value: "Global Partner" },
            { label: "Academic Partner", value: "Academic Partner" },
            { label: "Media Partner", value: "Media Partner" },
            { label: "Equipment Partner", value: "Equipment Partner" },
          ],
          label: "Partnership Type",
        },
        {
          name: "websiteUrl",
          type: "text",
          label: "Website URL",
        },
      ],
    },
    {
      name: "feedbackUrl",
      type: "text",
      label: "Tally Feedback Form URL / Embed Link",
      admin: {
        description:
          "Paste your Tally.so form link or embed URL (e.g. https://tally.so/r/gD604M?transparentBackground=1)",
      },
    },
    {
      name: "isFeedbackActive",
      type: "checkbox",
      defaultValue: true,
      label: "Enable Feedback Form",
      admin: {
        description:
          "Check to enable the feedback button and feedback page for this event year",
      },
    },
    {
      name: "feedbackFormHeight",
      type: "text",
      defaultValue: "1850",
      label: "Tally Form Height (px)",
      admin: {
        description:
          "Optional height in pixels for the feedback form iframe (e.g. 1850 or 2200). Defaults to 1850.",
      },
    },
    {
      name: "confirmationEmailSubject",
      type: "text",
      label: "Registration Confirmation Email Subject",
      admin: {
        description:
          "Custom email subject for registration confirmation (e.g. Registration Confirmed: International Observe the Moon Night 2026)",
      },
    },
    {
      name: "confirmationEmailBody",
      type: "textarea",
      label: "Registration Confirmation Email Custom Message",
      admin: {
        description:
          "Custom welcome message and event instructions included in the confirmation email sent to registrants for this year.",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Unpublished / Draft", value: "draft" },
        { label: "Unpublished", value: "unpublished" },
      ],
      label: "Publication Status",
      admin: {
        description:
          "Only 'Published' events appear publicly on the Projects listing page and event URL routes.",
      },
    },
  ],
};
