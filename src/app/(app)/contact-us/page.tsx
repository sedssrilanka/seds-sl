import type { Metadata } from "next";
import ContactSection from "@/components/sections/home-page/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact Us | SEDS Sri Lanka",
  description:
    "Get in touch with SEDS Sri Lanka. We would love to hear from you.",
};

export default function ContactUsPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
