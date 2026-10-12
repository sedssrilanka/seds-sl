"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  MessageSquareHeart,
  Users,
  Sparkles,
  ListVideo,
  Layers,
  Compass,
  ArrowUp,
  X,
  Telescope,
  CloudRain,
  Radio,
  Moon,
  Heart,
  Clock,
  Tv,
  Play,
  Calendar,
  Globe,
  Archive,
} from "lucide-react";

interface Contributor {
  name: string;
  projectRole: string;
  sedsRole?: string;
  chapter: string;
  description: string;
  linkedin?: string;
  image?: string;
}

const contributorsList: Contributor[] = [
  {
    name: "Mihindukulasuriya Sachindi Saumya Fernando",
    projectRole: "Co-Chair, Moon Night 2026",
    sedsRole: "Co-Chair",
    chapter: "SEDS Sri Lanka",
    description:
      "Co-led strategic planning, cross-team coordination, speaker liaison, and delivered the formal Vote of Thanks during the closing ceremony.",
    linkedin: "https://www.linkedin.com/in/sachindi-fernando-028b18368",
    image: "/images/projects/observe-moon-night/credits/sachindi-fernando.jpg",
  },
  {
    name: "Malindu Sachinthana Wijekoon",
    projectRole: "Campaign Lead",
    sedsRole: "Vice Chair",
    chapter: "SEDS Sri Lanka",
    description:
      "Led the campaign execution and overall operational direction as Vice Chair.",
    linkedin: "https://www.linkedin.com/in/malindu-sachinthana-79540a319",
    image:
      "/images/projects/observe-moon-night/credits/malindu-sachinthana.jpeg",
  },
  {
    name: "Aatreyee",
    projectRole: "Organizing Committee Lead (India)",
    sedsRole: "General Secretary",
    chapter: "SEDS India",
    description:
      "Led the discussions for SEDS India, bridging national chapters and connecting technical POCs to deliver the live broadcast.",
    linkedin: "https://www.linkedin.com/in/aatreyee/",
  },
  {
    name: "Avaneetsinh Thakur",
    projectRole: "Ground Site Coordinator (Day 1)",
    sedsRole: "President",
    chapter: "SEDS Celestia",
    description:
      "Assisted optical telescope setup for the Day 1 live feed and publicized the event across SEDS Celestia.",
    linkedin: "https://www.linkedin.com/in/avaneetsinh",
    image:
      "/images/projects/observe-moon-night/credits/avaneetsinh-thakur.jpeg",
  },
  {
    name: "Shorya Agarwal",
    projectRole: "Ground Site Coordinator (Day 1)",
    sedsRole: "Observations Head",
    chapter: "SEDS Celestia (BITS Pilani Goa)",
    description:
      "Managed optical sensor calibration and telescope tracking at the Day 1 observation site.",
    linkedin: "https://www.linkedin.com/in/shorya-agarwal-b888791a7",
    image: "/images/projects/observe-moon-night/credits/shorya-agarwal.png",
  },
  {
    name: "Deepakumar S",
    projectRole: "Technical Lead (Day 2)",
    sedsRole: "Sounding Rocket Team Lead",
    chapter: "SEDS Kumaraguru (SEDS KCT)",
    description:
      "Coordinated Day 2 telescope broadcast station and technical ground operations.",
    linkedin: "https://www.linkedin.com/in/deepakumars",
    image: "/images/projects/observe-moon-night/credits/deepakumar-s.jpg",
  },
  {
    name: "Shathika Perera",
    projectRole: "Telescope Demonstrator",
    sedsRole: "Observation Divisional Manager",
    chapter: "SEDS Japura",
    description:
      "Conducted live optical telescope demonstration and guided lunar surface feature narration.",
    linkedin: "https://www.linkedin.com/in/shathika-perera-818423228",
    image: "/images/projects/observe-moon-night/credits/shathika-perera.jpg",
  },
  {
    name: "Saviru Weerakkody",
    projectRole: "Live Stream Hostess",
    sedsRole: "Host & Moderator",
    chapter: "SEDS Sri Lanka",
    description: "Hosted the Day 01 live broadcast and guided audience Q&A.",
    linkedin: "https://www.linkedin.com/in/saviru-weerakkody-a68043317",
  },
  {
    name: "S.A. Anjalee Uthpala Sinhapruthivi",
    projectRole: "Content Creator",
    sedsRole: "Assistant Manager (Events), Magnetar",
    chapter: "SEDS Ocean",
    description:
      "Authored engaging social media copy and promotional outreach content for the event.",
    linkedin: "https://www.linkedin.com/in/anjalee-sinhapruthivi-13513b3a8",
    image:
      "/images/projects/observe-moon-night/credits/anjalee-sinhapruthivi.jpeg",
  },
  {
    name: "H.P. Sithuka Sanujana",
    projectRole: "Media Coordinator",
    sedsRole: "Assistant Manager, Magnetar",
    chapter: "SEDS Sri Lanka",
    description:
      "Managed media coordination, outreach distribution, and public astronomy engagement.",
    linkedin: "https://www.linkedin.com/in/sithuka-sanujana-899067400",
    image: "/images/projects/observe-moon-night/credits/sithuka-sanujana.jpg",
  },
  {
    name: "Nirupama Minipa",
    projectRole: "Visual & Flyer Designer",
    sedsRole: "Designer, Magnetar",
    chapter: "Magnetar",
    description:
      "Designed the official promotional flyers, banners, and digital graphics for the campaign.",
    linkedin: "https://www.linkedin.com/in/nirupama-minipa-b9500b14a/",
    image: "/images/projects/observe-moon-night/credits/nirupama-minipa.png",
  },
];

interface PartnerLogo {
  name: string;
  role: string;
  logo: string;
}

const partnerLogos: PartnerLogo[] = [
  {
    name: "SEDS India",
    role: "Cross-Border National Partner",
    logo: "/images/projects/seds_india_white_logo.png",
  },
  {
    name: "SEDS Celestia",
    role: "Day 1 Telescope Stream Host",
    logo: "/images/projects/seds-celestia.png",
  },
  {
    name: "SEDS Kumaraguru",
    role: "Day 2 Telescope Stream Host",
    logo: "/images/projects/seds-kumraguru.png",
  },
];

interface StorySectionEntry {
  id: string;
  title: string;
  shortTag: string;
}

const storyNavEntries: StorySectionEntry[] = [
  { id: "overview", title: "Story Overview", shortTag: "00" },
  { id: "the-washout", title: "The 30-Day Monsoon Washout", shortTag: "01" },
  { id: "the-lunar-clock", title: "The 7-Day Physics Dilemma", shortTag: "02" },
  {
    id: "calling-india",
    title: "Calling Across the Palk Strait",
    shortTag: "03",
  },
  { id: "day-1-stream", title: "Day 1: Chaos & Plato Crater", shortTag: "04" },
  {
    id: "day-2-stream",
    title: "Day 2: Geology & Deep Craters",
    shortTag: "05",
  },
  { id: "the-takeaway", title: "What We Learned", shortTag: "06" },
  { id: "playlist", title: "Watch Broadcasts", shortTag: "07" },
  { id: "logos", title: "Partner Logos", shortTag: "08" },
  { id: "credits", title: "Team & Credits", shortTag: "09" },
];

interface ObserveMoonStoryClientProps {
  year?: string;
}

export function ObserveMoonStoryClient({
  year = "2026",
}: ObserveMoonStoryClientProps) {
  const [activeChapterTab, setActiveChapterTab] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = storyNavEntries.map((e) => e.id);
      let currentActive = "overview";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            currentActive = id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative">
      {/* CONTINUOUS VISIBLE VERTICAL MARGIN GUIDE LINES */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl border-x border-border/60 pointer-events-none z-0" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-7xl pointer-events-none grid grid-cols-4 md:grid-cols-12 divide-x divide-border/20 z-0 opacity-40" />

      {/* TOP NAV BAR */}
      <div className="w-full border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link
              href="/projects"
              prefetch={false}
              className="hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <ChevronLeft className="size-3.5" />
              <span>PROJECTS</span>
            </Link>
            <ChevronRight className="size-3.5 opacity-40" />
            <span className="text-foreground font-mono uppercase font-bold tracking-wider">
              OBSERVE THE MOON NIGHT {year}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/projects/observe-the-moon-night/${year}/archive`}
              prefetch={false}
              className="hidden sm:inline-flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-none border-border/60 hover:bg-muted/40"
              >
                <Archive className="size-3.5" />
                <span>Event Archive</span>
              </Button>
            </Link>

            <a
              href="https://cert.sedssl.org/imot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="default"
                size="sm"
                className="gap-1.5 font-mono text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white rounded-none border border-blue-600"
              >
                <Award className="size-3.5" />
                <span>Certificate</span>
                <ExternalLink className="size-3 opacity-80" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* STORY HERO HEADER */}
      <header
        id="overview"
        className="w-full pt-12 pb-8 md:pt-16 md:pb-12 relative z-10 scroll-mt-20 border-b border-border/60"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <span className="text-primary font-bold uppercase tracking-widest">
              OBSERVE THE MOON NIGHT {year}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-muted-foreground uppercase">
              500+ Registrations
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-foreground leading-[1.12] uppercase max-w-5xl">
            When Rain Stole Our Skies, We Built a Telescope Bridge Across the
            Sea
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-sans max-w-3xl">
            How thirty days of stargazing camp preparation was washed out in
            twenty four hours, sparking a late-night cross-border collaboration
            with SEDS India that brought live optical telescope feeds to over
            500 registered observers.
          </p>
        </div>
      </header>

      {/* FULL-WIDTH COVER IMAGE WITH SHARP EXTENDED BLEEDING CORNER BORDERS */}
      <section className="w-full relative z-10 border-b border-border/60 bg-background overflow-hidden py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Extended Bleeding Edge Border Corners Container */}
          <div className="relative">
            {/* Extended Horizontal Bleed Lines */}
            <div className="absolute -left-4 sm:-left-6 -right-4 sm:-right-6 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-4 sm:-left-6 -right-4 sm:-right-6 bottom-0 border-b border-border/60 pointer-events-none" />

            {/* Extended Vertical Bleed Lines */}
            <div className="absolute -top-4 sm:-top-6 -bottom-4 sm:-bottom-6 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-4 sm:-top-6 -bottom-4 sm:-bottom-6 right-0 border-r border-border/60 pointer-events-none" />

            <div className="w-full relative group overflow-hidden border border-border/80 bg-black">
              {/* Main Cover Image */}
              <img
                src="/images/projects/iotm-day-2026.png"
                alt={`International Observe the Moon Night ${year} Banner`}
                className="w-full h-[240px] sm:h-[380px] md:h-[500px] lg:h-[560px] object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORY CONTENT & FLOATING SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col lg:flex-row items-start gap-12 xl:gap-16 relative z-10">
        {/* MAIN EDITORIAL STORY */}
        <main className="flex-1 min-w-0 max-w-3xl space-y-16 text-foreground font-sans">
          {/* SECTION 1: THE WASHOUT */}
          <section id="the-washout" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
              <CloudRain className="size-4 text-primary" />
              <span>THE WASHOUT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
              A Month of Spreadsheets Meets a Monsoon Cloud
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                If you have ever organized a public astronomy night in Sri
                Lanka, you know the familiar ritual of refreshing your weather
                app every twenty minutes while whispering quiet bargains to the
                universe.
              </p>
              <p>
                For thirty straight days, our team lived and breathed
                International Observe the Moon Night. We had reservation sheets
                packed with hundreds of enthusiastic names, permission letters
                stamped, power cables neatly rolled, optics cleaned with soft
                microfiber cloths, and volunteers ready to guide families and
                school kids through the craters of the Moon.
              </p>
              <p>Then, right on cue, the tropical monsoon entered the chat.</p>
              <p>
                It was not just a little evening shower that you could wait out
                under a tent. A stubborn, impenetrable blanket of dark grey
                clouds rolled across the island from Jaffna straight down to
                Matara. Every satellite radar screen we loaded painted the exact
                same story: pure, unbroken overcast for days. Just like that,
                thirty days of meticulous stargazing camp plans washed away in a
                single afternoon.
              </p>
            </div>
          </section>

          {/* SECTION 2: THE LUNAR CLOCK */}
          <section id="the-lunar-clock" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
              <Clock className="size-4 text-primary" />
              <span>THE CLOCK IS TICKING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
              Why You Cannot Just Ask the Moon for a Rain Check
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Our first instinctive thought was what any normal group would
                do: can we just push the camp to next weekend?
              </p>
              <p>
                Here is the funny thing about astronomy that non-stargazers
                rarely realize: amateur astronomers actually avoid the Full Moon
                like the plague. People assume a full moon is the best time to
                look through a telescope. In reality, staring at a full moon
                through a high-power optical eyepiece is like shining a
                high-beam car headlight directly into your eyeball. Because the
                Sun is shining straight down from directly overhead, there are
                zero shadows. Towering lunar mountain chains and deep impact
                craters turn into flat, blinding white circles on a washed-out
                plate.
              </p>
              <p>
                International Observe the Moon Night is carefully chosen around
                the first quarter moon for a very specific reason. Sunlight hits
                the lunar surface at a sharp, grazing angle. That delicate
                dividing line between lunar day and night, known as the
                terminator, casts long, dramatic, razor-sharp shadows along
                every ridge, cliff, and crater rim.
              </p>
              <p>
                If we delayed past September 22 toward September 26, the Moon
                would turn full, ruining the view entirely. Physics had handed
                us an uncompromising deadline: figure out a solution in seven
                days, or pack up and wait until next year.
              </p>
            </div>
          </section>

          {/* SECTION 3: CALLING INDIA */}
          <section id="calling-india" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
              <Radio className="size-4 text-primary" />
              <span>THE PIVOT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
              Calling Across the Palk Strait
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Late that night, sitting in a tense voice call with coffee cups
                cooling on our desks, we asked the obvious question: if the sky
                above Sri Lanka is completely sealed shut, who has clear skies
                right now?
              </p>
              <p>
                We pulled up regional satellite feeds and looked just across the
                Palk Strait. India was clear.
              </p>
              <p>
                Without wasting a second, we reached out to our friends at SEDS
                India. We threw out a wild proposal: instead of letting the
                event die in the rain, let us pool our resources and build a
                two-night live telescope broadcast bridge between both
                countries.
              </p>
              <p>
                SEDS India jumped in immediately without hesitation. Within
                forty-eight hours, they mobilized two powerhouse student
                telescope chapters equipped with professional tracking mounts
                and imaging sensors: SEDS Celestia to take on Day 1, and SEDS
                Kumaraguru to lead Day 2.
              </p>
              <p>
                What started as a canceled local camp in Colombo had suddenly
                morphed into an international space mission.
              </p>
            </div>

            {/* Pull Quote with Bleeding Border Corners */}
            <div className="my-8 relative">
              <div className="absolute -left-3 -right-3 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-3 -right-3 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-3 -bottom-3 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-3 -bottom-3 right-0 border-r border-border/60 pointer-events-none" />

              <blockquote className="p-5 border border-border/60 bg-muted/20 space-y-2">
                <p className="italic font-mono text-sm sm:text-base text-foreground/90">
                  &quot;When the sky closes above your head, look for teammates
                  who have open skies. Space exploration has always been about
                  working together across borders.&quot;
                </p>
                <footer className="text-xs text-primary font-bold uppercase not-italic font-mono">
                  SEDS Sri Lanka Organizing Team
                </footer>
              </blockquote>
            </div>
          </section>

          {/* SECTION 4: DAY 1 STREAM & EXPERIENCE */}
          <section id="day-1-stream" className="space-y-6 scroll-mt-28">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
                <Tv className="size-4 text-primary" />
                <span>DAY 01 BROADCAST</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
                Chaos, Lag, and the Magic of Plato Crater
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>Night one was pure adrenaline and high drama.</p>
                <p>
                  If you have ever tried running a multi-node live telescope
                  stream with video encoders, stream keys, and camera sensors
                  syncing between two different countries on one week of prep,
                  you know technical gremlins will inevitably show up. Ten
                  minutes before showtime, audio feeds were echoing, latency was
                  spiking, and backstage group chats were filled with frantic
                  troubleshooting.
                </p>
                <p>
                  And then, the moment happened. SEDS Celestia dialed in their
                  optical focuser. The fuzzy screen snapped into razor-sharp
                  clarity.
                </p>
                <p>
                  There it was: the pitch-black basalt floor of Plato Crater,
                  framed by the towering, sunlit peaks of the Montes Apenninus
                  mountain range. The live chat instantly erupted with questions
                  from kids, university students, and parents who were watching
                  the surface of another world in real time from their living
                  rooms. Every bit of stress and panic dissolved in that single
                  frame.
                </p>
              </div>
            </div>

            {/* DAY 1 STREAM EMBED WITH BLEEDING CORNER BORDERS */}
            <div className="relative pt-2">
              <div className="absolute -left-4 -right-4 top-2 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-2 -bottom-2 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-2 -bottom-2 right-0 border-r border-border/60 pointer-events-none" />

              <div className="border border-border/80 bg-black overflow-hidden">
                <div className="px-4 py-3 bg-muted/30 border-b border-border/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-red-500 animate-pulse" />
                    <span className="font-bold text-foreground uppercase tracking-wider">
                      Day 1 Live Recording
                    </span>
                    <span className="text-muted-foreground hidden sm:inline">
                      (SEDS Celestia Feed)
                    </span>
                  </div>
                  <a
                    href="https://youtu.be/BBBGGHzXVlI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1 text-primary font-bold uppercase tracking-wider text-[11px]"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <div className="aspect-video w-full bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/BBBGGHzXVlI"
                    title="Observe the Moon Night 2026 - Day 1 Live Stream (SEDS Celestia)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: DAY 2 STREAM & EXPERIENCE */}
          <section id="day-2-stream" className="space-y-6 scroll-mt-28">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
                <Sparkles className="size-4 text-primary" />
                <span>DAY 02 BROADCAST</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
                Rock Steady Optics and Deep Lunar Geology
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  With the opening night baptism by fire behind us, night two
                  ran with absolute precision.
                </p>
                <p>
                  The team at SEDS Kumaraguru brought out their high-resolution
                  optical setup and delivered rock-steady, breathtaking views of
                  the lunar south pole, the dramatic rays of Tycho Crater, and
                  the terraced walls of Copernicus.
                </p>
                <p>
                  While the crowd was slightly smaller and more intimate than
                  the opening night rush, the atmosphere turned into a cozy,
                  late-night lunar masterclass. Viewers stayed on the stream for
                  over two hours, geeking out with the hosts about ancient lava
                  flows in Mare Tranquillitatis and permanently shadowed craters
                  that might harbor water ice for future human bases.
                </p>
              </div>
            </div>

            {/* DAY 2 STREAM EMBED WITH BLEEDING CORNER BORDERS */}
            <div className="relative pt-2">
              <div className="absolute -left-4 -right-4 top-2 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-2 -bottom-2 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-2 -bottom-2 right-0 border-r border-border/60 pointer-events-none" />

              <div className="border border-border/80 bg-black overflow-hidden">
                <div className="px-4 py-3 bg-muted/30 border-b border-border/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-emerald-500" />
                    <span className="font-bold text-foreground uppercase tracking-wider">
                      Day 2 Live Recording
                    </span>
                    <span className="text-muted-foreground hidden sm:inline">
                      (SEDS Kumaraguru Feed)
                    </span>
                  </div>
                  <a
                    href="https://youtu.be/dL8G-luCVMQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1 text-primary font-bold uppercase tracking-wider text-[11px]"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <div className="aspect-video w-full bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/dL8G-luCVMQ"
                    title="Observe the Moon Night 2026 - Day 2 Live Stream (SEDS Kumaraguru)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: THE TAKEAWAY */}
          <section id="the-takeaway" className="space-y-4 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
              <Heart className="size-4 text-primary" />
              <span>THE TAKEAWAY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
              Clear Skies Are Not Guaranteed. Good Friends Are.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                By the time we closed the broadcast and tallied the final logs,
                over 500 people had registered from across Sri Lanka, India, and
                around the world.
              </p>
              <p>
                In space exploration and student projects alike, things almost
                never go strictly according to plan. Clouds roll in, software
                crashes, and plans get turned upside down at the eleventh hour.
                But that is the entire essence of what SEDS stands for: adapting
                fast, reaching out across borders, and finding a way to share
                the wonders of the universe no matter what the weather has to
                say.
              </p>
              <p>
                What started as a canceled stargazing camp in Colombo ended up
                building friendships and memories that will last far longer than
                any single night under the stars.
              </p>
            </div>
          </section>

          {/* PLAYLIST SECTION WITH BLEEDING CORNER BORDERS */}
          <section id="playlist" className="space-y-4 pt-4 scroll-mt-28">
            <div className="relative">
              <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

              <div className="p-6 border border-border/80 bg-muted/20 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-xs font-mono font-bold uppercase text-primary tracking-widest flex items-center gap-2">
                    <ListVideo className="size-4 text-primary" />
                    <span>COMPLETE BROADCAST ARCHIVE</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    2 SESSIONS RECORDED
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold uppercase text-foreground">
                  Watch the Full Replay Playlist
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Access the full YouTube recordings containing both
                  livestreamed nights, optical telescope captures, keynote
                  presentations, and audience Q&amp;A.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.youtube.com/results?search_query=SEDS+Sri+Lanka+Observe+The+Moon+Night"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-xs"
                  >
                    <Play className="size-3.5 fill-current" />
                    <span>Open YouTube Playlist</span>
                    <ExternalLink className="size-3.5 opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* PARTICIPATING CHAPTER LOGOS WITH BLEEDING CORNER BORDERS */}
          <section id="logos" className="space-y-6 pt-4 scroll-mt-28">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-primary tracking-widest flex items-center gap-2">
                <Layers className="size-4 text-primary" />
                <span>PARTICIPATING CHAPTERS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
                Partner Organizations
              </h2>
            </div>

            <div className="relative">
              {/* Extended Bleeding Edge Lines */}
              <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

              <div className="grid grid-cols-1 sm:grid-cols-3 border border-border/60 divide-y sm:divide-y-0 sm:divide-x divide-border/60 bg-background/80">
                {partnerLogos.map((partner, idx) => (
                  <div
                    key={idx}
                    className="p-6 flex flex-col items-center justify-center text-center space-y-4 group hover:bg-muted/20 transition-colors"
                  >
                    <div className="h-20 w-full flex items-center justify-center p-2">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-[130px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="font-mono font-bold text-xs uppercase text-foreground">
                        {partner.name}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">
                        {partner.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TEAM & CHAPTER CREDITS LIST COLLECTION */}
          <section id="credits" className="space-y-6 pt-4 scroll-mt-28">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-primary tracking-widest flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span>TEAM &amp; CHAPTER CREDITS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-foreground">
                The People Who Made It Happen
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Honoring the organizing leads, technical coordinators,
                demonstrators, and creatives across SEDS Sri Lanka and SEDS
                India.
              </p>
            </div>

            <div className="relative">
              {/* Extended Bleeding Edge Corner Borders */}
              <div className="absolute -left-4 -right-4 top-0 border-t border-border/60 pointer-events-none" />
              <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/60 pointer-events-none" />
              <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/60 pointer-events-none" />

              <div className="border border-border/60 divide-y divide-border/60 bg-background/80">
                {contributorsList.map((person, idx) => {
                  const cleanLinkedin = person.linkedin
                    ? person.linkedin.startsWith("http")
                      ? person.linkedin
                      : `https://${person.linkedin.replace(/^:/, "").replace(/^\/\//, "")}`
                    : undefined;

                  const initials = person.name
                    .trim()
                    .split(/\s+/)
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 space-y-3 group hover:bg-muted/15 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <div className="size-12 sm:size-14 shrink-0 rounded-full border border-border/80 bg-muted/40 overflow-hidden relative flex items-center justify-center ring-2 ring-border/30">
                            {person.image ? (
                              <img
                                src={person.image}
                                alt={person.name}
                                className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <span className="font-mono font-bold text-xs sm:text-sm text-primary tracking-widest">
                                {initials}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                                {person.name}
                              </span>
                              <span className="px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                                {person.projectRole}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                              <span>{person.chapter}</span>
                              {person.sedsRole &&
                                person.sedsRole !== person.projectRole && (
                                  <>
                                    <span className="opacity-40">•</span>
                                    <span className="opacity-80">
                                      {person.sedsRole}
                                    </span>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>

                        {cleanLinkedin && (
                          <div className="self-start sm:self-auto pl-16 sm:pl-0 shrink-0">
                            <a
                              href={cleanLinkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted/40 hover:bg-muted/70 border border-border/60 text-xs font-mono text-foreground hover:text-primary transition-colors"
                            >
                              <span>LinkedIn</span>
                              <ExternalLink className="size-3 text-primary" />
                            </a>
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed sm:pl-[4.5rem]">
                        {person.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        {/* FLOATING TABLE OF CONTENTS (DESKTOP) WITH BLEEDING CORNERS */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start z-30 space-y-6">
          <div className="relative">
            <div className="absolute -left-3 -right-3 top-0 border-t border-border/60 pointer-events-none" />
            <div className="absolute -left-3 -right-3 bottom-0 border-b border-border/60 pointer-events-none" />
            <div className="absolute -top-3 -bottom-3 left-0 border-l border-border/60 pointer-events-none" />
            <div className="absolute -top-3 -bottom-3 right-0 border-r border-border/60 pointer-events-none" />

            <div className="p-5 border border-border/60 bg-background/95 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                <Compass className="size-3.5 text-primary" />
                <span>STORY NAVIGATION</span>
              </div>

              <nav className="space-y-1 text-xs font-mono">
                {storyNavEntries.map((entry) => {
                  const isActive = activeSection === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => scrollToSection(entry.id)}
                      className={`w-full text-left py-1.5 transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "text-primary font-bold bg-primary/10 pl-2.5 border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground pl-2.5 hover:bg-muted/30 border-l-2 border-transparent"
                      }`}
                    >
                      <span className="text-[10px] opacity-60 font-bold">
                        {entry.shortTag}
                      </span>
                      <span className="truncate">{entry.title}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-border/40 space-y-2">
                <a
                  href="https://cert.sedssl.org/imot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors shadow-xs"
                >
                  <Award className="size-3.5" />
                  <span>Claim Certificate</span>
                  <ExternalLink className="size-3 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ArrowUp className="size-3" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FLOATING MOBILE TABLE OF CONTENTS PILL - SHARP */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-background/95 backdrop-blur-md text-foreground font-mono text-xs font-bold uppercase tracking-wider shadow-xl border border-border cursor-pointer rounded-none"
        >
          {mobileTocOpen ? (
            <X className="size-4" />
          ) : (
            <Compass className="size-4 text-primary" />
          )}
          <span>Sections</span>
        </button>
      </div>

      {/* MOBILE TOC OVERLAY DRAWER - SHARP */}
      {mobileTocOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end p-4 animate-in fade-in duration-200">
          <div className="border border-border bg-background p-6 space-y-4 shadow-2xl relative max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
                <Compass className="size-4 text-primary" />
                <span>STORY NAVIGATION</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileTocOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {storyNavEntries.map((entry) => {
                const isActive = activeSection === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => scrollToSection(entry.id)}
                    className={`w-full flex items-center justify-between p-2.5 text-left font-mono text-xs transition-colors cursor-pointer ${
                      isActive
                        ? "text-primary font-bold bg-primary/10 border-l-2 border-primary pl-3"
                        : "text-muted-foreground hover:text-foreground pl-3 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60 font-bold">
                        {entry.shortTag}
                      </span>
                      <span>{entry.title}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2">
              <a
                href="https://cert.sedssl.org/imot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-none"
              >
                <Award className="size-3.5" />
                <span>Claim Certificate</span>
                <ExternalLink className="size-3 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
