import type { Metadata } from "next";
import { EmailPreviewStudioClient } from "./EmailPreviewStudioClient";

export const metadata: Metadata = {
  title: "Email Templates Studio | SEDS Sri Lanka Admin",
  description:
    "Live interactive rendering and preview for all SEDS transactional email templates.",
};

export default function AdminEmailsPage() {
  return <EmailPreviewStudioClient />;
}
