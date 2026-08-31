import type { CollectionConfig } from "payload";

export const ObserveMoonEvents: CollectionConfig = {
  slug: "observe-moon-events",
  admin: {
    group: "Projects & Initiatives",
    useAsTitle: "title",

    defaultColumns: [
      "title",
      "year",
      "startTime",
      "endTime",
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
      name: "startTime",
      type: "date",
      required: true,
      label: "Start Date & Time (Sri Lanka Time +05:30)",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "MMM d, yyyy - hh:mm a",
        },
      },
    },
    {
      name: "endTime",
      type: "date",
      required: true,
      label: "End Date & Time (Sri Lanka Time +05:30)",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "MMM d, yyyy - hh:mm a",
        },
      },
    },
    {
      name: "eventDate",
      type: "date",
      label: "Event Date (Legacy)",
      admin: {
        description:
          "Legacy date field. Start Date & Time and End Date & Time are used automatically.",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMMM d, yyyy",
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
      name: "isPaid",
      type: "checkbox",
      label: "Is this a paid ticketed event?",
      defaultValue: false,
    },
    {
      name: "ticketPrice",
      type: "text",
      label: "Ticket Price (e.g. LKR 1,500)",
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
      label: "Bank Account Transfer Instructions & Details",
      admin: {
        condition: (data) => Boolean(data?.isPaid),
      },
    },
    {
      name: "confirmationEmailSubject",
      type: "text",
      label: "Custom Confirmation Email Subject (Optional)",
    },
    {
      name: "confirmationEmailBody",
      type: "textarea",
      label: "Custom Confirmation Email Message / Instructions (Optional)",
    },
    {
      name: "locations",
      type: "array",
      label: "Host Observation Locations",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Location Name",
        },
        {
          name: "city",
          type: "text",
          label: "City / Region",
        },
        {
          name: "latitude",
          type: "number",
          required: true,
          label: "Latitude",
        },
        {
          name: "longitude",
          type: "number",
          required: true,
          label: "Longitude",
        },
        {
          name: "isPrimary",
          type: "checkbox",
          label: "Primary Central Host Site",
          defaultValue: false,
        },
      ],
    },
    {
      name: "agenda",
      type: "array",
      label: "Event Agenda Schedule",
      fields: [
        {
          name: "time",
          type: "text",
          required: true,
          label: "Time Slot (e.g. 18:30 - 19:15)",
        },
        {
          name: "stage",
          type: "text",
          label: "Session Stage / Type (e.g. KEYNOTE, WORKSHOP)",
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
      name: "partners",
      type: "array",
      label: "Event Partners & Organizers",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "text",
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "website",
          type: "text",
        },
      ],
    },
    {
      name: "isFeedbackActive",
      type: "checkbox",
      label: "Show Feedback Form Section?",
      defaultValue: true,
    },
    {
      name: "feedbackUrl",
      type: "text",
      label: "Embedded Feedback Form Iframe URL",
    },
    {
      name: "feedbackFormHeight",
      type: "text",
      label: "Feedback Form Iframe Height (px)",
      defaultValue: "1850",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
    },
  ],
};
