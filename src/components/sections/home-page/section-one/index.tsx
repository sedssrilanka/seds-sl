import { Button } from "@/components/ui/button";
import SpaceScene from "./space-scene";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Index: React.FC<Props> = () => {
  return (
    <section
      data-slot="section-one"
      data-testid="section-one"
      className="bg-transparent text-foreground w-full min-h-screen flex items-center justify-center relative"
    >
      {/* 3D Space Scene Background - Fixed */}
      <SpaceScene />

      {/* Content Overlay - Right Center */}
      <div className="grid-container section-content h-full min-h-screen">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="absolute bottom-20 right-4 md:right-8 transform z-10 max-w-2xl">
            {/* Design Frame with zero opacity background */}
            <div className="bg-transparent p-4 md:p-8">
              <div className="text-right">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6 text-foreground drop-shadow-lg">
                  Be a Part of the Largest
                  <br />
                  International Student-Based
                  <br />
                  Space Community
                </h1>

                <div className="flex gap-4 justify-end">
                  <Button asChild variant="default" size="lg">
                    <Link href="/projects">Our Projects</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/join-us">Join Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
