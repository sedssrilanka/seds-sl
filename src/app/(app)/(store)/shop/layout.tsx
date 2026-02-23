import { Categories } from "@/components/layout/search/Categories";
import { FilterList } from "@/components/layout/search/filter";
import { sorting } from "@/lib/constants";
import { Search } from "@/components/Search";
import type React from "react";
import { Suspense } from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <div className="grid-container section-content my-12 md:my-16 pb-8 md:pb-12 px-4">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col gap-8">
          <div className="w-full max-w-2xl mx-auto mb-8">
            <Search className="rounded-full shadow-sm" />
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
            <aside className="w-full lg:w-64 flex-none space-y-8 bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
              <Categories />
              <div className="pt-6 border-t">
                <FilterList list={sorting} title="Sort by" />
              </div>
            </aside>
            <main className="min-h-screen w-full lg:max-w-[calc(100%-18rem)]">
              {children}
            </main>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
