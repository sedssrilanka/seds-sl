import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { FormBlock } from "@/blocks/Form/Component";
import { SectionHeader } from "@/components/sections/section-header";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Join Us | SEDS Sri Lanka",
  description:
    "Apply to become a member of SEDS Sri Lanka and contribute to the global space exploration community.",
};

export default async function JoinUsPage() {
  const payload = await getPayload({ config: configPromise });

  let form = null;
  try {
    const forms = await payload.find({
      collection: "forms",
      where: {
        title: {
          like: "Join",
        },
      },
      limit: 1,
    });

    if (forms.docs && forms.docs.length > 0) {
      form = forms.docs[0];
    } else {
      const allForms = await payload.find({
        collection: "forms",
        limit: 2,
      });
      if (allForms.docs && allForms.docs.length > 1) {
        form = allForms.docs[1];
      } else if (allForms.docs && allForms.docs.length > 0) {
        form = allForms.docs[0];
      }
    }
  } catch (err) {
    console.error("Error fetching join us form:", err);
  }

  return (
    <main className="flex flex-col w-full min-h-screen pt-8 md:pt-12 lg:pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <SectionHeader
          title="Join SEDS Sri Lanka"
          description={
            <>
              Become part of Sri Lanka's largest student-driven space exploration and research organization. Fill out the membership form below to get started.
            </>
          }
          image="/section-header/join-us-bg.jpg"
        />

        <div className="py-8 md:py-12 max-w-3xl mx-auto">
          <Card className="rounded-none light-mode-card p-6 md:p-8 shadow-sm dark:shadow-none bg-background border border-border/60">
            {form ? (
              <FormBlock
                form={form as any}
                enableIntro={false}
                id={form.id}
              />
            ) : (
              <div className="text-center py-12 font-mono text-sm text-muted-foreground">
                Join Us form loading...
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
