import { Button } from "@/components/ui/button";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Index: React.FC<Props> = () => {
  return (
    <section
      data-slot="section-one"
      data-testid="section-one"
      className="bg-black text-foreground w-full min-h-screen flex items-center justify-center"
    >
      <div className="grid-container">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="text-center">
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
      </div>
    </section>
  );
};

export default Index;
