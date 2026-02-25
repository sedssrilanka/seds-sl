export const dynamic = "force-dynamic";
import type { Metadata } from "next";

import { RenderParams } from "@/components/RenderParams";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { headers as getHeaders } from "next/headers";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import { CreateAccountForm } from "@/components/forms/CreateAccountForm";
import { redirect } from "next/navigation";

export default async function CreateAccount() {
  const headers = await getHeaders();
  let user = null;
  try {
    const payload = await getPayload({ config: configPromise });
    const authResult = await payload.auth({ headers });
    user = authResult.user;
  } catch (err) {
    console.warn("DB connection failed, proceeding without user.");
  }

  if (user) {
    redirect(
      `/account?warning=${encodeURIComponent("You are already logged in.")}`,
    );
  }

  return (
    <div className="container min-h-[80vh] flex flex-col items-center justify-center py-12 md:py-20">
      <div className="w-full max-w-md bg-card border shadow-lg rounded-3xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl z-0 pointer-events-none" />

        <div className="relative z-10">
          <RenderParams />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              Create an Account
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign up to track your orders, save addresses, and more.
            </p>
          </div>

          <CreateAccountForm />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  description: "Create an account or log in to your existing account.",
  openGraph: mergeOpenGraph({
    title: "Account",
    url: "/account",
  }),
  title: "Account",
};
