import { getAllDocs } from "@/lib/docs";
import Link from "next/link";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 mt-8">
        <div className="sticky top-24">
          <h2 className="text-xl font-bold mb-4 font-mono text-primary uppercase tracking-wider">
            Documentation
          </h2>
          <nav className="flex flex-col gap-2">
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-2 rounded-md transition-colors text-sm font-medium"
              >
                {doc.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="bg-muted/10 border border-border/50 rounded-xl p-6 md:p-10 shadow-sm mt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
