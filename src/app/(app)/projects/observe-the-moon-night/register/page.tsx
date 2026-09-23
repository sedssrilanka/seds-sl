import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

export const metadata: Metadata = {
  title: "Registration | International Observe the Moon Night 2026",
  description:
    "Register for International Observe the Moon Night 2026 (Virtual Edition) organized by SEDS Sri Lanka and SEDS India, with live streaming by SEDS Celestia and SEDS Kumaraguru.",
  alternates: {
    canonical: "/projects/observe-the-moon-night/register",
  },
  openGraph: mergeOpenGraph({
    title:
      "Registration - International Observe the Moon Night 2026 | SEDS Sri Lanka",
    description:
      "Register for International Observe the Moon Night 2026 (Virtual Edition) organized by SEDS Sri Lanka and SEDS India.",
    url: "/projects/observe-the-moon-night/register",
    type: "website",
    images: [
      {
        url: "/images/projects/iotm-day-2026.png",
        width: 1200,
        height: 630,
        alt: "International Observe the Moon Night 2026 Registration - SEDS Sri Lanka",
        type: "image/png",
      },
    ],
  }),
  twitter: {
    card: "summary_large_image",
    title:
      "Registration - International Observe the Moon Night 2026 | SEDS Sri Lanka",
    description:
      "Register for International Observe the Moon Night 2026 (Virtual Edition) organized by SEDS Sri Lanka and SEDS India.",
    images: ["/images/projects/iotm-day-2026.png"],
    site: "@sedssl",
    creator: "@sedssl",
  },
};

export default function ObserveMoonRegisterPage() {
  redirect("/projects/observe-the-moon-night/2026?register=1");
}
