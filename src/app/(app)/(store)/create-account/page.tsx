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
    <div className="container py-16">
      <h1 className="text-xl mb-4">Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
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
