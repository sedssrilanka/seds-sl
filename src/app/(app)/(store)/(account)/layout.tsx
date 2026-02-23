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
      <div className="container">
        <RenderParams className="" />
      </div>

      <div className="container mt-16 pb-8 flex gap-8">
        {user && (
          <AccountNav className="max-w-[15.5rem] grow flex-col items-start gap-4 hidden md:flex" />
        )}

        <div className="flex flex-col gap-12 grow">{children}</div>
      </div>
    </div>
  );
}
