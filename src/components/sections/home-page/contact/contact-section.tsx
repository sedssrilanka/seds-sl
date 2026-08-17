import { ContactFormCodeBased } from "@/components/forms/ContactFormCodeBased";
import { SectionHeader } from "@/components/sections/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="light-mode-section relative w-full min-h-screen flex flex-col pt-8 md:pt-12 lg:pt-16 pb-16">
      <div className="section-background bg-background dark:bg-black"></div>
      <div className="grid-container section-content flex-1">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Get in Touch with Us"
            description={
              <>
                Whether you're a student looking to join, a partner interested
                in working with us, or simply curious about our projects, reach
                out and our team will get back to you soon.
              </>
            }
            image="/section-header/contact-bg.jpg"
          />
        </div>

        <div
          id="contact-form"
          className="col-span-4 md:col-span-8 lg:col-span-12 py-8 md:py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form - Takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              <Card className="rounded-none light-mode-card p-6 md:p-8 shadow-sm dark:shadow-none bg-background border border-border/60">
                <ContactFormCodeBased />
              </Card>
            </div>

            {/* Right Sidebar - Takes 1 column on desktop */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="rounded-none border p-6 !glass-5 shadow-sm dark:shadow-none">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      Become a Member
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Join the largest international student-based space
                      community and be part of exciting projects.
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      bleed={true}
                      className="w-full cursor-pointer"
                    >
                      Join SEDS Sri Lanka
                    </Button>
                  </div>
                </Card>

                <Card className="rounded-none border p-6 glass-5 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold mb-4 text-foreground">
                    Connect With Us
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-foreground">
                        Email
                      </h4>
                      <a
                        href="mailto:hello@sedssl.org"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        hello@sedssl.org
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-foreground">
                        Social Media
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Follow us on Facebook, Instagram, and LinkedIn for the
                        latest updates.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
