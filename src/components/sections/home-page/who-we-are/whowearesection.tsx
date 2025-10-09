import { Globe, Users, Flag, Network  } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import {
  Card,
  CardDescription,
  CardTitle,
  CardVisual,
} from "@/components/ui/card";
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
        description: "We are an official branch of SEDS Earth, the world’s largest student-run space organization, which has been promoting space exploration, research, and education for decades."
    },
    {
        id: 2,
        icon: <Users className="size-8 text-primary" />,
        title: "Student Community",
        description: "Our network includes high school, undergraduate, and graduate students, providing opportunities for learning, collaboration, and hands-on experience in space-related projects."
    },
    {
        id: 3,
        icon: <Network className="size-8 text-primary" />,
        title: "International Reach",
        description: "SEDS connects students from across the globe, fostering cross-cultural collaboration and enabling members to participate in international events, competitions, and research initiatives."
    },
    {
        id: 4,
        icon: <Flag className="size-8 text-primary" />,
        title: "Our Mission",
        description: "We aim to inspire and empower students to contribute to space exploration and development, promoting innovation, education, and sustainable progress in the global space sector."
    },
];
const Cardd = ({ whoweare }:{ whoweare : WhoWeAre }) =>(
    <Card className = "rounded-none border ">
        <CardVisual className="h-20 items-start justify-start">
                <div className="glass-3 rounded-md p-4 ">{whoweare.icon}</div>
        </CardVisual>
        <CardTitle className="text-xl">{whoweare.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
        {whoweare.description}
        </CardDescription>
    </Card>
);
const WhoWeAreSection = ()=>{
    return (
        <section className="bg-background relative w-full  p-6">
              <div className="flex flex-col items-center mx-auto">
                <SectionHeader
                  title="Who We Are"
                  description={
                    <>
                     We bring together passionate high school, undergraduate, and graduate students across disciplines to collaborate,
                      <br />
                    learn, and shape the future of space science.
                    </>
                  }
                  image="/divisionimg/header.png"
                />
        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 border-border dark:border-border/50">
                  {whoweare.map((w) => (
                    <Cardd key={w.id} whoweare={w} />
                  ))}
                </div>
              </div>
            </section>
    )
}
export default WhoWeAreSection;