import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Telescope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 text-center">
      <div className="flex items-center justify-center w-24 h-24 mt-12 mb-8 rounded-full bg-primary/10">
        <Telescope className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl font-mono text-primary mb-4">
        404
      </h1>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
        Lost in Space
      </h2>
      <p className="max-w-[500px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
        The page you are looking for has drifted out of our orbit. Let&apos;s
        get you back to the station.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" variant="glow">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact-us">Contact Mission Control</Link>
        </Button>
      </div>
    </div>
  );
}
