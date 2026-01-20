import { postgresAdapter } from "@payloadcms/db-postgres";

import path from "node:path";
import { buildConfig, type CollectionSlug } from "payload";
import { fileURLToPath } from "node:url";
import { resendAdapter } from "@payloadcms/email-resend";
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Projects } from "@/collections/Projects";
import { Chapters } from "@/collections/Chapters";

import { plugins } from "@/plugins";
import { Pages } from "@/collections/Pages";
import { Categories } from "@/collections/Categories";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ["@/components/BeforeLogin#BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ["@/components/BeforeDashboard#BeforeDashboard"],
    },
  },

  collections: [Users, Media, Projects, Chapters, Categories, Pages],
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ["pages" as CollectionSlug],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ("name" in field && field.name === "url") return false;
              return true;
            });

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: "url",
                type: "text",
                admin: {
                  condition: ({ linkType }) => linkType !== "internal",
                },
                label: ({ t }) => t("fields:enterURL"),
                required: true,
              },
            ];
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ];
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.FROM_EMAIL || "",
    defaultFromName: process.env.ORG_NAME || "SEDS Sri Lanka",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: plugins,
});
