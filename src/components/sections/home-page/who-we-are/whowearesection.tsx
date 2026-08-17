"use client";

import { Globe, Users, Flag, Network, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/section-header";
import { motion } from "motion/react";

interface WhoWeAre {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const whoweare: WhoWeAre[] = [
  {
    id: 1,
    icon: <Globe className="size-8 text-primary" />,
    title: "Global Affiliation",
    description:
      "We are an official branch of SEDS Earth, the world’s largest student-run space organization, which has been promoting space exploration, research, and education for decades.",
  },
  {
    id: 2,
    icon: <Users className="size-8 text-primary" />,
    title: "Student Community",
    description:
      "Our network includes high school, undergraduate, and graduate students, providing opportunities for learning, collaboration, and hands-on experience in space-related projects.",
  },
  {
    id: 3,
    icon: <Network className="size-8 text-primary" />,
    title: "International Reach",
    description:
      "SEDS connects students from across the globe, fostering cross-cultural collaboration and enabling members to participate in international events, competitions, and research initiatives.",
  },
  {
    id: 4,
    icon: <Flag className="size-8 text-primary" />,
    title: "Our Mission",
    description:
      "We aim to inspire and empower students to contribute to space exploration and development, promoting innovation, education, and sustainable progress in the global space sector.",
  },
];

const Cardd = ({ whoweare, index }: { whoweare: WhoWeAre; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-40px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className="p-6 md:p-8 bg-background flex flex-col h-full space-y-4"
  >
    <div className="p-3 bg-primary/10 border border-primary/20 w-fit">
      {whoweare.icon}
    </div>
    <h3 className="text-xl font-bold text-foreground">{whoweare.title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground flex-1">
      {whoweare.description}
    </p>
  </motion.div>
);

const WhoWeAreSection = () => {
  return (
    <section className="light-mode-section relative w-full pt-8 md:pt-12 lg:pt-16">
      <div className="section-background bg-background dark:bg-black"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Who We Are"
            description={
              <>
                We bring together passionate high school, undergraduate, and
                graduate students across disciplines to collaborate,
                <br />
                learn, and shape the future of space science.
              </>
            }
            image="/section-header/who-we-are-bg.jpg"
          />

          <div className="mt-12 relative">
            {/* Extended Horizontal Bleed Lines */}
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

            {/* Extended Vertical Bleed Lines */}
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />
            <div className="hidden md:block absolute -top-6 -bottom-6 left-1/2 border-l border-border/40 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 border border-border/60 divide-y divide-border/60 md:divide-y-0 md:divide-x bg-background relative z-0">
              {whoweare.slice(0, 3).map((w, idx) => (
                <Cardd key={w.id} whoweare={w} index={idx} />
              ))}
              {/* View All About Us Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Link
                  href="/about"
                  className="block h-full group bg-background p-8 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      Learn More About Us
                    </h3>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium">View All About Us</span>
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
