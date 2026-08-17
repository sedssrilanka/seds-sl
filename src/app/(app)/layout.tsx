import type { Metadata } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Cart } from "@/components/Cart";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";
import { LivePreviewListener } from "@/components/LivePreviewListener";

const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEDS SL",
  description:
    "Students for the Exploration & Development of Space (SEDS), Sri Lanka.",
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
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${jetbrainsMono.variable} antialiased `}
      >
        <Providers>
          <LivePreviewListener />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Navbar />
            <main className="relative min-h-screen pt-16 sm:pt-20">
              {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-[5]" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-[5] opacity-80" />

              {children}
            </main>
            <Footer />

            <Cart />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
