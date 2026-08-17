import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import SEDSSL from "@/components/logos/seds-sl";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/80 backdrop-blur-xs border-t border-border/60 relative overflow-hidden">
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-40">
        {/* Segmented 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-border/60 border-b border-border/60">
          {/* Brand & About */}
          <div className="p-5 sm:p-6 md:py-16 md:pr-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-9 h-9 relative shrink-0">
                  <SEDSSL className="w-full h-full object-contain invert dark:invert-0" />
                </div>
                <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 font-mono">
                  SEDS SL
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                Students for the Exploration and Development of Space (SEDS) Sri
                Lanka. Empowering students to contribute to the global space
                industry.
              </p>
            </div>

            {/* Segregated 2x2 Square Grid Box for Social Media Anchored at Bottom */}
            <div className="pt-4">
              <div className="text-xs font-mono font-semibold uppercase text-primary tracking-wider mb-2">
                CONNECT WITH US
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-border/60 border border-border/60 bg-background/50 w-28 h-28">
                <a
                  href="https://www.facebook.com/sedssrilanka/"
                  target="_blank"
                  rel="noreferrer"
                  className="aspect-square flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com/sedssl"
                  target="_blank"
                  rel="noreferrer"
                  className="aspect-square flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.instagram.com/sedssrilanka/"
                  target="_blank"
                  rel="noreferrer"
                  className="aspect-square flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://lk.linkedin.com/company/seds-sri-lanka"
                  target="_blank"
                  rel="noreferrer"
                  className="aspect-square flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>



          {/* Quick Links */}
          <div className="p-5 sm:p-6 md:py-16 md:px-6 flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary font-mono mb-1">Explore</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/chapters"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Chapters
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div className="p-5 sm:p-6 md:py-16 md:px-6 flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary font-mono mb-1">Organization</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="p-5 sm:p-6 md:py-16 md:pl-6 flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary font-mono mb-1">Get in touch</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed font-sans">
                  No 10, SEDS Headquarters,
                  <br /> Colombo 00500, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:hello@sedssl.org"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  hello@sedssl.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-muted-foreground">
          <p className="text-center md:text-left">
            &copy; {currentYear} SEDS Sri Lanka. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Ad Astra per Aspera</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

