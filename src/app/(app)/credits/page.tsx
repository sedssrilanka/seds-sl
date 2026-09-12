import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import {
  Github,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Heart,
  ExternalLink,
  GitPullRequest,
  Terminal,
  ShieldCheck,
  Boxes,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Credits & Acknowledgments | SEDS Sri Lanka",
  description:
    "Honoring the open-source creators, tools, libraries, and developers who power the SEDS Sri Lanka digital platform.",
  openGraph: {
    title: "Credits & Acknowledgments | SEDS Sri Lanka",
    description:
      "Honoring the open-source creators, tools, libraries, and developers who power the SEDS Sri Lanka digital platform.",
    images: [{ url: "/section-header/who-we-are-bg.jpg" }],
  },
};

export const revalidate = 3600;

interface GithubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

interface GithubUserProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
  blog?: string;
}

const openSourceTools = [
  {
    category: "Framework & Core Architecture",
    icon: <Terminal className="size-4 text-primary" />,
    items: [
      {
        name: "Next.js 16",
        creator: "Vercel",
        description: "The modern React framework for production-grade server components, edge routing, and image optimization.",
        url: "https://nextjs.org",
      },
      {
        name: "React 19",
        creator: "Meta & Open Source",
        description: "Declarative, component-based user interface library powering all client and server UI rendering.",
        url: "https://react.dev",
      },
      {
        name: "TypeScript",
        creator: "Microsoft",
        description: "Strict, strongly-typed JavaScript layer ensuring end-to-end type safety across the entire application.",
        url: "https://www.typescriptlang.org",
      },
      {
        name: "Bun",
        creator: "Oven (Jarred Sumner)",
        description: "Incredible all-in-one fast JavaScript runtime, package manager, and bundler powering local builds.",
        url: "https://bun.sh",
      },
    ],
  },
  {
    category: "Content Management & Schema",
    icon: <Layers className="size-4 text-primary" />,
    items: [
      {
        name: "Keystatic",
        creator: "Thinkmill",
        description: "Zero-database, git-based CMS managing structured Markdown and Markdoc content directly in the repo.",
        url: "https://keystatic.com",
      },
      {
        name: "Markdoc",
        creator: "Stripe",
        description: "Powerful, extensible, author-friendly Markdown framework for rendering rich documentation and articles.",
        url: "https://markdoc.dev",
      },
      {
        name: "Next MDX Remote",
        creator: "HashiCorp",
        description: "Seamless MDX rendering utility for dynamically parsing and executing Markdown with interactive React components.",
        url: "https://github.com/hashicorp/next-mdx-remote",
      },
      {
        name: "Shiki & Prism",
        creator: "Pine Wu & Anthony Fu",
        description: "Beautiful, accurate syntax highlighting using TextMate grammars and modern color themes.",
        url: "https://shiki.style",
      },
    ],
  },
  {
    category: "Design System & UI Components",
    icon: <Boxes className="size-4 text-primary" />,
    items: [
      {
        name: "Tailwind CSS",
        creator: "Tailwind Labs",
        description: "Utility-first CSS framework delivering lightning-fast styling with the bespoke SEDS aerospace aesthetic.",
        url: "https://tailwindcss.com",
      },
      {
        name: "Radix UI",
        creator: "WorkOS",
        description: "Unstyled, accessible, composable UI primitives powering interactive dialogs, selects, popovers, and menus.",
        url: "https://www.radix-ui.com",
      },
      {
        name: "Lucide Icons",
        creator: "Lucide Community",
        description: "Clean, consistent, lightweight SVG icon toolkit designed with precision for modern interfaces.",
        url: "https://lucide.dev",
      },
      {
        name: "Sonner",
        creator: "Emil Kowalski",
        description: "An opinionated, elegant toast notification library for React with sleek physics and crisp visuals.",
        url: "https://sonner.emilkowal.ski",
      },
      {
        name: "cmdk",
        creator: "Paco Coursey",
        description: "Fast, unstyled command menu component for search, navigation, and dropdown autocomplete filters.",
        url: "https://cmdk.paco.me",
      },
    ],
  },
  {
    category: "3D, Physics & Animation",
    icon: <Sparkles className="size-4 text-primary" />,
    items: [
      {
        name: "Three.js",
        creator: "Ricardo Cabello (Mr.doob)",
        description: "Cross-browser JavaScript 3D engine enabling high-performance WebGL rendering of space models and satellites.",
        url: "https://threejs.org",
      },
      {
        name: "React Three Fiber & Drei",
        creator: "Poimandres",
        description: "Declarative React wrapper for Three.js with robust camera controls, shaders, and 3D asset loaders.",
        url: "https://docs.pmnd.rs/react-three-fiber",
      },
      {
        name: "Motion",
        creator: "Matt Perry & Framer",
        description: "Production-ready motion library for fluid React scroll animations, transitions, and hover micro-interactions.",
        url: "https://motion.dev",
      },
      {
        name: "Anime.js",
        creator: "Julian Garnier",
        description: "Flexible JavaScript animation engine with staggered transforms and smooth SVG path morphing.",
        url: "https://animejs.com",
      },
    ],
  },
  {
    category: "Forms, Validation & Communications",
    icon: <ShieldCheck className="size-4 text-primary" />,
    items: [
      {
        name: "Resend & React Email",
        creator: "Resend Labs (Zeno Rocha)",
        description: "Modern email platform with component-based JSX templates delivering transactional member notifications.",
        url: "https://resend.com",
      },
      {
        name: "Cloudflare Turnstile",
        creator: "Cloudflare",
        description: "Privacy-preserving, frictionless CAPTCHA alternative protecting contact and membership forms from automated bots.",
        url: "https://www.cloudflare.com/products/turnstile/",
      },
      {
        name: "Zod",
        creator: "Colin McDonnell",
        description: "TypeScript-first schema declaration and runtime validation library ensuring robust data integrity.",
        url: "https://zod.dev",
      },
      {
        name: "React Hook Form",
        creator: "Beier Luo & Community",
        description: "Performant, flexible, and extensible forms with easy-to-use validation without unnecessary re-renders.",
        url: "https://react-hook-form.com",
      },
    ],
  },
  {
    category: "Engineering & Tooling",
    icon: <Cpu className="size-4 text-primary" />,
    items: [
      {
        name: "Biome",
        creator: "Biome Community",
        description: "Fast formatter and linter for JavaScript and TypeScript maintaining clean code hygiene across the repository.",
        url: "https://biomejs.dev",
      },
      {
        name: "Leaflet",
        creator: "Volodymyr Agafonkin",
        description: "Open-source JavaScript library for mobile-friendly interactive maps displaying chapter locations.",
        url: "https://leafletjs.com",
      },
      {
        name: "Vercel",
        creator: "Vercel Inc.",
        description: "Edge-first global deployment network and serverless infrastructure hosting the SEDS Sri Lanka web platform.",
        url: "https://vercel.com",
      },
    ],
  },
];

const FALLBACK_CONTRIBUTORS: GithubContributor[] = [
  {
    id: 1,
    login: "Thawshi-Srikanth",
    avatar_url: "https://avatars.githubusercontent.com/u/107026727?v=4",
    html_url: "https://github.com/Thawshi-Srikanth",
    contributions: 150,
    type: "User",
  },
  {
    id: 2,
    login: "sedssrilanka",
    avatar_url: "https://avatars.githubusercontent.com/u/74765373?v=4",
    html_url: "https://github.com/sedssrilanka",
    contributions: 80,
    type: "Organization",
  },
];

async function getThawshiProfile(): Promise<GithubUserProfile> {
  try {
    const res = await fetch("https://api.github.com/users/Thawshi-Srikanth", {
      headers: {
        "User-Agent": "SEDS-Sri-Lanka-Web-Platform",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      return {
        login: data.login || "Thawshi-Srikanth",
        name: data.name || "Thawshi Srikanth",
        avatar_url: data.avatar_url || "https://avatars.githubusercontent.com/u/107026727?v=4",
        html_url: data.html_url || "https://github.com/Thawshi-Srikanth",
        bio: data.bio || "Architected the SEDS Sri Lanka digital platform, Keystatic CMS integration, transactional email engine, and responsive bleeding-edge design system.",
        blog: data.blog || "https://www.thawshi.com/",
      };
    }
  } catch (error) {
    console.error("Error fetching Thawshi GitHub profile:", error);
  }
  return {
    login: "Thawshi-Srikanth",
    name: "Thawshi Srikanth",
    avatar_url: "https://avatars.githubusercontent.com/u/107026727?v=4",
    html_url: "https://github.com/Thawshi-Srikanth",
    bio: "Architected the SEDS Sri Lanka digital platform, Keystatic CMS integration, transactional email engine, and responsive bleeding-edge design system.",
    blog: "https://www.thawshi.com/",
  };
}

async function getContributors(): Promise<GithubContributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/sedssrilanka/seds-sl/contributors?per_page=100",
      {
        headers: {
          "User-Agent": "SEDS-Sri-Lanka-Web-Platform",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (res.ok) {
      const data: GithubContributor[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const hasThawshi = data.some(
          (c) => c.login.toLowerCase() === "thawshi-srikanth"
        );
        if (!hasThawshi) {
          data.unshift(FALLBACK_CONTRIBUTORS[0]);
        }
        return data;
      }
    }
  } catch (error) {
    console.error("Error fetching contributors from GitHub:", error);
  }
  return FALLBACK_CONTRIBUTORS;
}

export default async function CreditsPage() {
  const [contributors, thawshiProfile] = await Promise.all([
    getContributors(),
    getThawshiProfile(),
  ]);

  return (
    <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-24">
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          {/* Hero Header */}
          <SectionHeader
            title="Credits & Open Source Acknowledgments"
            description={
              <>
                SEDS Sri Lanka is proudly built upon the collective genius of the global
                open-source software community and the dedicated contributions of student developers.
              </>
            }
            image="/section-header/who-we-are-bg.jpg"
          />

          {/* GitHub Repository Banner — Bleeding Edge Grid */}
          <div className="mt-10 lg:mt-14 relative">
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-0">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  <Github className="size-4" />
                  <span>Open Source Repository</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  sedssrilanka / seds-sl
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The official digital home of SEDS Sri Lanka is public and open source.
                  We welcome contributions from student developers, designers, and aerospace enthusiasts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="https://github.com/sedssrilanka/seds-sl"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                >
                  <Button variant="default" size="lg" bleed={true} className="gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                    <Github className="size-4" />
                    Star on GitHub
                  </Button>
                </Link>
                <Link
                  href="https://github.com/sedssrilanka/seds-sl/pulls"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                >
                  <Button variant="outline" size="lg" bleed={true} className="gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                    <GitPullRequest className="size-4" />
                    Contribute
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Code Contributors Section */}
          <div className="mt-14 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                <Code2 className="size-4" />
                <span>Development & Architecture</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Platform Architects & Contributors
              </h2>
              <p className="text-sm text-muted-foreground">
                Special thanks to the developers and maintainers who engineered the SEDS Sri Lanka web platform, email studio, and digital systems.
              </p>
            </div>

            {/* Lead Developer Spotlight Card — Bleeding Edge */}
            <div className="relative my-4">
              <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

              <div className="border border-border/60 bg-card/60 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-0">
                <div className="flex items-start md:items-center gap-5">
                  <div className="relative size-16 md:size-20 shrink-0 overflow-hidden border-2 border-primary">
                    <Image
                      src={thawshiProfile.avatar_url}
                      alt={thawshiProfile.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {thawshiProfile.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-primary/20 text-primary border border-primary/40 px-2 py-0.5">
                        Lead Developer &amp; Architect
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
                      {thawshiProfile.bio || "Architected the SEDS Sri Lanka digital platform, Keystatic CMS integration, transactional email engine, and responsive bleeding-edge design system."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href={thawshiProfile.blog || "https://www.thawshi.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    <Button variant="default" size="sm" bleed={true} className="gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
                      <ExternalLink className="size-3.5" />
                      thawshi.com
                    </Button>
                  </Link>
                  <Link
                    href={thawshiProfile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    <Button variant="outline" size="sm" bleed={true} className="gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
                      <Github className="size-3.5" />
                      GitHub Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contributors Grid — Bleeding Edge */}
            <div className="space-y-3 pt-4">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-muted-foreground block">
                All Repository Contributors
              </span>

              <div className="relative my-2">
                <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
                <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
                <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
                <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60 border border-border/60 bg-background relative z-0">
                  {contributors.map((contrib) => {
                    const isThawshi = contrib.login.toLowerCase() === "thawshi-srikanth";
                    return (
                      <Link
                        key={contrib.id}
                        href={isThawshi ? "https://www.thawshi.com/" : contrib.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
                        className="group p-5 bg-card/40 hover:bg-primary/5 transition-colors flex items-center gap-4 relative"
                      >
                        <div className="relative size-12 shrink-0 overflow-hidden border border-border/80 group-hover:border-primary transition-colors">
                          <Image
                            src={contrib.avatar_url}
                            alt={contrib.login}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              @{contrib.login}
                            </span>
                            <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-xs font-mono text-muted-foreground">
                            {contrib.contributions} {contrib.contributions === 1 ? "commit" : "commits"}
                            {isThawshi && " • Portfolio"}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Open Source Tools & Ecosystem Section */}
          <div className="mt-16 space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                <Compass className="size-4" />
                <span>Open Source Technology Stack</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Tools, Libraries & Frameworks We Admire
              </h2>
              <p className="text-sm text-muted-foreground">
                Our platform stands on the shoulders of remarkable open-source projects. We express our deepest gratitude to the maintainers and contributors of each library below.
              </p>
            </div>

            {/* Stack Categories */}
            <div className="space-y-10">
              {openSourceTools.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                    {cat.icon}
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
                        className="group p-5 border border-border/70 bg-card/40 hover:bg-card/70 hover:border-primary/60 transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                              {item.creator}
                              <ExternalLink className="size-3" />
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center gap-1 text-[11px] font-mono text-primary group-hover:underline">
                          <span>Visit documentation</span>
                          <span>→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Statement Bottom Box — Bleeding Edge Grid */}
          <div className="mt-16 relative">
            <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

            <div className="border border-border/60 bg-card/60 p-8 text-center space-y-3 relative z-0">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 border border-primary/20 text-primary mb-2">
                <Heart className="size-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Built with Open Source, for Open Space
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                SEDS Sri Lanka believes that space science, exploration software, and education should be open, accessible, and inclusive for every student on Earth. Thank you to everyone creating open software for humanity.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                  Ad Astra per Aspera • Students for the Exploration & Development of Space
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
