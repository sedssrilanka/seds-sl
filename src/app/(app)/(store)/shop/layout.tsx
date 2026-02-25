import { Categories } from "@/components/layout/search/Categories";
import { FilterList } from "@/components/layout/search/filter";
import { sorting } from "@/lib/constants";
import { Search } from "@/components/Search";
import type React from "react";
import { Suspense } from "react";
import { SectionHeader } from "@/components/sections/section-header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col w-full">
        <SectionHeader
          title="Shop"
          description="Browse the latest space exploration gear from our community."
          image="/section-header/who-we-are-bg.jpg"
        />
        <div className="grid-container section-content mt-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col gap-6 mb-12">
            {/* Inline Control Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-card/40 backdrop-blur border border-border/50 rounded-2xl p-4 shadow-sm relative z-10 transition-all">
              {/* Left Box: Search & Filters */}
              <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto flex-1">
                <div className="w-full md:max-w-xs shrink-0">
                  <Search />
                </div>
                <div className="flex-1 w-full min-w-0">
                  <Categories borderless={true} />
                </div>
              </div>

              {/* Right Box: Sort */}
              <div className="w-full lg:w-auto shrink-0 md:max-w-[180px]">
                <FilterList list={sorting} />
              </div>
            </div>

            <main className="min-h-screen w-full mt-4">{children}</main>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
