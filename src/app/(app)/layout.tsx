import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";
import { getServerSideURL } from "@/utilities/getURL";
import TopProgressBar from "@/components/navigation/TopProgressBar";

const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteURL = getServerSideURL();

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
  title: {
    default:
      "SEDS Sri Lanka | Students for the Exploration & Development of Space",
    template: "%s | SEDS Sri Lanka",
  },
  description:
    "SEDS Sri Lanka is the national student-led organization advancing space exploration, astronomy, rocketry, robotics, and aerospace engineering in Sri Lanka.",
  keywords: [
    "SEDS",
    "SEDS Sri Lanka",
    "Space Exploration Sri Lanka",
    "Students for the Exploration and Development of Space",
    "Astronomy Sri Lanka",
    "Aerospace Engineering Sri Lanka",
    "CanSat Sri Lanka",
    "Rocketry Sri Lanka",
    "Observe the Moon Night Sri Lanka",
    "Space Robotics Sri Lanka",
  ],
  authors: [{ name: "SEDS Sri Lanka", url: siteURL }],
  creator: "SEDS Sri Lanka",
  publisher: "SEDS Sri Lanka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteURL,
    siteName: "SEDS Sri Lanka",
    title: "SEDS Sri Lanka | Empowering the Next Generation of Space Pioneers",
    description:
      "The premier national student space organization in Sri Lanka driving innovation in rocketry, satellites, astronomy, and robotics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEDS Sri Lanka - Students for the Exploration & Development of Space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sedssl",
    creator: "@sedssl",
    title: "SEDS Sri Lanka | Space Exploration & Development",
    description:
      "Advancing space technology, rocketry, astronomy, and student aerospace innovation across Sri Lanka.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "SEDS Sri Lanka",
    alternateName:
      "Students for the Exploration and Development of Space Sri Lanka",
    url: siteURL,
    logo: `${siteURL}/logo.png`,
    description:
      "National student organization empowering young scientists and engineers to explore space, build satellites, and develop advanced aerospace technologies in Sri Lanka.",
    sameAs: [
      "https://www.facebook.com/sedssl",
      "https://twitter.com/sedssl",
      "https://www.linkedin.com/company/seds-sri-lanka",
      "https://www.instagram.com/sedssl",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Colombo",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Suspense fallback={null}>
              <TopProgressBar />
            </Suspense>
            <Navbar />
            <main className="relative min-h-screen pt-16 sm:pt-20">
              {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-[5]" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-[5] opacity-80" />

              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
