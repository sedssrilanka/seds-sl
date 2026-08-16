import type { ReactNode } from "react";

import { headers as getHeaders } from "next/headers.js";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { RenderParams } from "@/components/RenderParams";
import { AccountNav } from "@/components/AccountNav";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headers = await getHeaders();
  let user = null;
  try {
    const payload = await getPayload({ config: configPromise });
    const authResult = await payload.auth({ headers });
    user = authResult.user;
  } catch (err) {
    console.warn("DB connection failed, proceeding without user.");
  }

  return (
    <div>
      <div className="grid-container section-content">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <RenderParams className="" />
        </div>
      </div>

      <div className="grid-container section-content mt-16 pb-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col md:flex-row gap-12 py-8">
          {user && (
            <aside className="w-full md:w-[260px] shrink-0 mt-8 md:mt-0">
              <AccountNav className="sticky top-24" />
            </aside>
          )}
          <main className="flex flex-col gap-8 grow min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
