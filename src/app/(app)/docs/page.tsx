import { getAllDocs } from "@/lib/docs";
import Link from "next/link";

export default function DocsHomePage() {
  const docs = getAllDocs();

  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground font-mono uppercase">
          Documentation Hub
        </h1>
        <p className="text-lg text-muted-foreground border-l-4 border-primary pl-4 py-1">
          Everything you need to manage the SEDS Sri Lanka platform. Browse our
          full documentation and technical guides below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc) => (
          <Link
            href={`/docs/${doc.slug}`}
            key={doc.slug}
            className="group block h-full"
          >
            <div className="h-full bg-background border border-border/50 hover:border-primary/50 rounded-xl p-8 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />

              <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors relative z-10">
                {doc.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {doc.description || "Read more about this topic..."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
