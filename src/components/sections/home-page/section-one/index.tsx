import { Button } from "@/components/ui/button";
import Planet from "./planet";
import Rocket from "./rockets";
import { GradientBackground } from "@/components/ui/gradient-background";

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  return (
    <section
      data-slot="section-one"
      data-testid="section-one"
      className="bg-background text-foreground relative w-full overflow-hidden h-screen"
    >
      <GradientBackground
        className="from-background via-primary/20 to-background"
        transition={{ duration: 100, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="container mx-auto relative flex items-center justify-center max-w-5xl min-h-[calc(100vh-80px)]">
          <div className="absolute left-[-15%] w-1/3 transform-gpu">
            <Rocket />
          </div>

          <div className="absolute right-[-10%] w-1/3 transform-gpu">
            <Planet />
          </div>

          <div className="mx-auto text-center z-10 w-full px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Be a Part of the Largest
              <br />
              International Student-Based
              <br />
              Space Community
            </h1>

            <div className="flex gap-4 justify-center">
              <Button variant="default" size="lg">
                Our Projects
              </Button>
              <Button variant="outline" size="lg">
                Join Us
              </Button>
            </div>
          </div>
        </div>
      </GradientBackground>
    </section>
  );
};

export default Index;
