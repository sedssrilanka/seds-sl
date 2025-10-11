import {
  Bot,
  Laptop,
  Plane,
  Rocket,
  Telescope,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface Division {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const divisions: Division[] = [
  {
    id: 1,
    icon: <Rocket className="size-8 text-primary" />,
    title: "Astronautics Division",
    description:
      "Focuses on rocketry, spacecraft design, and propulsion technology. Members work on projects like CubeSats, launch simulations, and mission planning for future space exploration.",
  },
  {
    id: 2,
    icon: <Telescope className="size-8 text-primary" />,
    title: "Astronomy Division",
    description:
      "Dedicated to studying celestial bodies, astrophysics, and observational astronomy. Organizes stargazing events, telescope training, and research on deep space phenomena.",
  },
  {
    id: 3,
    icon: <Plane className="size-8 text-primary" />,
    title: "Aeronautics Division",
    description:
      "Works on unmanned aerial vehicles (UAVs), drones, and aircraft design. Provides students with hands-on experience in building and testing aerial systems.",
  },
  {
    id: 4,
    icon: <Bot className="size-8 text-primary" />,
    title: "Robotics & Rovers Division",
    description:
      "Develops Mars rover prototypes and robotic systems for exploration and research. Focuses on innovation in mobility, navigation, and autonomous systems.",
  },
  {
    id: 5,
    icon: <Users className="size-8 text-primary" />,
    title: "Outreach & Education Division",
    description:
      "Focuses on spreading awareness of space science through workshops, school programs, and public talks. Helps young students get involved in STEM fields.",
  },
  {
    id: 6,
    icon: <Laptop className="size-8 text-primary" />,
    title: "Development Division",
    description:
      "Engages in experimental projects, scientific studies, and technology development to support local and global space initiatives. Provides a platform for interdisciplinary student research.",
  },
];

const DivisionCard = ({ division }: { division: Division }) => (
  <Card className="rounded-none border p-6">
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 border border-primary/20">
          {division.icon}
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl font-bold mb-3">
            {division.title}
          </CardTitle>
        </div>
      </div>

      <CardDescription className="text-sm leading-relaxed mb-6 flex-1">
        {division.description}
      </CardDescription>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="rounded-sm border-primary/20 hover:bg-primary/10"
        >
          Learn More
        </Button>
      </div>
    </div>
  </Card>
);

const DivisionsSection = () => {
  return (
    <section className="bg-black relative w-full">
      <div className="section-background bg-black"></div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionHeader
            title="Our Divisions"
            description={
              <>
                Our divisions bring together innovators, researchers, and
                enthusiasts to collaborate on projects that span from
                <br />
                satellites and rovers to education and outreach.
              </>
            }
            image="/section-header/division.png"
          />

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 border-border dark:border-border/50">
              {divisions.slice(0, 3).map((division) => (
                <DivisionCard key={division.id} division={division} />
              ))}

              {/* View All Divisions Card */}
              <Card className="rounded-none border p-8 cursor-pointer transition-colors duration-300 hover:border-primary/20">
                <div className="flex flex-col items-end justify-start h-full text-right">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    Discover All Divisions
                  </h3>
                  <div className="flex items-right gap-2 text-primary">
                    <span className="font-medium">View All Divisions</span>
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
