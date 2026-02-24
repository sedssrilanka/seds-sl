import type { Metadata } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";
import { AdminBar } from "@/components/AdminBar";
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
    "Students expWe are the Students for the Exploration & Development of Space (SEDS), Sri Lanka. ",
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
          <AdminBar />
          <LivePreviewListener />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
