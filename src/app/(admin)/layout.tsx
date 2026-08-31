import type { Metadata } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import "@/app/(app)/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";

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
  title: "Payment Verification Portal | SEDS Sri Lanka",
  description: "Finance and slip verification dashboard.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
