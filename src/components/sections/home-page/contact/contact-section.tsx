import Link from "next/link";
import { ContactFormCodeBased } from "@/components/forms/ContactFormCodeBased";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  Users,
  Compass,
  Building2,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const ContactSection = () => {
  return (
    <section className="light-mode-section relative w-full min-h-screen flex flex-col pt-8 md:pt-12 lg:pt-16 pb-24 md:pb-32">
      <div className="section-background bg-background dark:bg-black" />
      <div className="grid-container section-content flex-1">
        {/* SECTION HEADER */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Get in Touch with SEDS Sri Lanka"
            description={
              <>
                Whether you're a student looking to join a chapter, a university
                partner interested in collaborating on aerospace research, or an
                organization reaching out for sponsorships, our team is ready to
                connect.
              </>
            }
            image="/section-header/contact-bg.jpg"
          />
        </div>

        {/* MAIN INTERACTIVE SECTION */}
        <div
          id="contact-form"
          className="col-span-4 md:col-span-8 lg:col-span-12 py-8 md:py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CONTACT FORM (8 COLS) — BLEEDING EDGE */}
            <div className="lg:col-span-8 relative">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

              <div className="border border-border/60 bg-card/60 p-6 sm:p-8 lg:p-10 relative z-0">
                <div className="mb-6 space-y-2 border-b border-border/60 pb-5">
                  <h3 className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                    Fill in the form below and our team will get back to you
                    promptly.
                  </p>
                </div>

                <ContactFormCodeBased />
              </div>
            </div>

            {/* SIDEBAR (4 COLS) — BLEEDING EDGE */}
            <div className="lg:col-span-4 space-y-6">
              {/* BECOME A MEMBER CARD */}
              <div className="relative">
                <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                <div className="border border-border/60 bg-card/60 p-6 sm:p-7 relative z-0 space-y-4">
                  <h3 className="text-lg font-mono font-bold uppercase text-foreground">
                    Become a Member
                  </h3>

                  <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                    Join the largest student-led space community in Sri Lanka.
                    Collaborate on high-altitude balloon launches, CanSats,
                    asteroid hunting, and astrophysics research.
                  </p>

                  <Link
                    href="/join-us"
                    prefetch={false}
                    className="block w-full pt-1"
                  >
                    <Button
                      variant="default"
                      size="sm"
                      bleed={true}
                      className="w-full gap-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <span>Join SEDS Sri Lanka</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* CONNECT WITH US CARD */}
              <div className="relative">
                <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

                <div className="border border-border/60 bg-card/60 p-6 sm:p-7 relative z-0 space-y-5">
                  <h3 className="text-lg font-mono font-bold uppercase text-foreground">
                    Connect With Us
                  </h3>

                  {/* Official Email Channels */}
                  <div className="space-y-2 border border-border/60 bg-background divide-y divide-border/60">
                    <a
                      href="mailto:contact@sedssl.org"
                      className="p-3 block bg-card/20 hover:bg-card/60 transition-colors group"
                    >
                      <div className="text-xs font-mono font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>contact@sedssl.org</span>
                        <ExternalLink className="size-3 opacity-60 group-hover:opacity-100" />
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground">
                        General Inquiries &amp; Partnerships
                      </div>
                    </a>

                    <a
                      href="mailto:info@sedssl.org"
                      className="p-3 block bg-card/20 hover:bg-card/60 transition-colors group"
                    >
                      <div className="text-xs font-mono font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>info@sedssl.org</span>
                        <ExternalLink className="size-3 opacity-60 group-hover:opacity-100" />
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground">
                        Academic &amp; Student Affairs
                      </div>
                    </a>
                  </div>

                  {/* Social Media Network */}
                  <div className="grid grid-cols-4 border border-border/60 divide-x divide-border/60 bg-background">
                    <a
                      href="https://www.facebook.com/sedssrilanka/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                      aria-label="Facebook"
                      title="Follow SEDS Sri Lanka on Facebook"
                    >
                      <FaFacebook className="size-4 group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://twitter.com/sedssl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                      aria-label="Twitter / X"
                      title="Follow @sedssl on X"
                    >
                      <FaXTwitter className="size-4 group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://www.instagram.com/sedssrilanka/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                      aria-label="Instagram"
                      title="Follow SEDS Sri Lanka on Instagram"
                    >
                      <FaInstagram className="size-4 group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://lk.linkedin.com/company/seds-sri-lanka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
                      aria-label="LinkedIn"
                      title="Connect with SEDS Sri Lanka on LinkedIn"
                    >
                      <FaLinkedin className="size-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>

                  {/* Quick Hub Navigation */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <Link
                      href="/chapters"
                      prefetch={false}
                      className="hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Building2 className="size-3" />
                      <span>Chapters</span>
                    </Link>
                    <span className="opacity-40">•</span>
                    <Link
                      href="/divisions"
                      prefetch={false}
                      className="hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Compass className="size-3" />
                      <span>Divisions</span>
                    </Link>
                    <span className="opacity-40">•</span>
                    <Link
                      href="/credits"
                      prefetch={false}
                      className="hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Users className="size-3" />
                      <span>Credits</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
