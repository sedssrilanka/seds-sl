import { Bot, Laptop, Plane, Rocket, Telescope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import {
  Card,
  CardDescription,
  CardTitle,
  CardVisual,
} from "@/components/ui/card";

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
  <Card className="rounded-none border ">
    <CardVisual className="h-20 items-start justify-start">
      <div className="glass-3 rounded-md p-4 ">{division.icon}</div>
    </CardVisual>
    <CardTitle className="text-xl">{division.title}</CardTitle>
    <CardDescription className="text-sm leading-relaxed">
      {division.description}
    </CardDescription>
    <Button variant="secondary" size="lg" className=" rounded-sm">
      Learn More
    </Button>
  </Card>
);

const DivisionsSection = () => {
  return (
    <section className="bg-black relative w-full p-6">
      <div className="flex flex-col items-center mx-auto max-w-7xl">
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
          image="/divisionimg/header.png"
        />

        <div className="w-full max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-border dark:border-border/50">
            {divisions.map((division) => (
              <DivisionCard key={division.id} division={division} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
