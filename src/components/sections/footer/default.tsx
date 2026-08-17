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
    <footer className="w-full bg-background border-t border-border/60 relative overflow-hidden">
      {/* Extended Bleeding Guide Lines */}
      <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none z-40" />
      <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none z-40" />

      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES & GRID GUIDES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/80 pointer-events-none z-30" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/40 z-30 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-40">
        {/* Segmented 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-border/60 border-b border-border/60">
          {/* Brand & About */}
          <div className="p-5 sm:p-6 md:py-16 md:pr-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-block group"
                aria-label="SEDS SL Home"
              >
                <div className="h-8 sm:h-10 w-auto relative shrink-0">
                  <SEDSSL className="h-full w-auto object-contain invert dark:invert-0" />
                </div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                Students for the Exploration and Development of Space (SEDS) Sri
                Lanka. Empowering students to contribute to the global space
                industry.
              </p>
            </div>

            {/* Inline Social Icons inside Hairline Grid Box */}
            <div className="pt-4">
              <div className="text-xs font-mono font-semibold uppercase text-primary tracking-wider mb-3">
                CONNECT WITH US
              </div>
              <div className="flex items-center divide-x divide-border/60 border border-border/60 bg-background w-fit">
                <a
                  href="https://www.facebook.com/sedssrilanka/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com/sedssl"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.instagram.com/sedssrilanka/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://lk.linkedin.com/company/seds-sri-lanka"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-5 sm:p-6 md:py-16 md:px-6 flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary font-mono mb-1">
              Explore
            </h3>
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
                  href="/shop"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div className="p-5 sm:p-6 md:py-16 md:px-6 flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary font-mono mb-1">
              Organization
            </h3>
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
                  href="/divisions"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Divisions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/join-us"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center group font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="p-5 sm:p-6 md:py-16 md:pl-6 flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary font-mono mb-1">
              Contact
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
                <span>Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href="mailto:contact@sedssl.org"
                  className="hover:text-primary transition-colors"
                >
                  contact@sedssl.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright sub-bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground font-mono gap-3">
          <p>© {currentYear} SEDS Sri Lanka. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
