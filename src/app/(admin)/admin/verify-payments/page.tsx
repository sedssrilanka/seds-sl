import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { checkRole } from "@/access/utilities";
import { VerificationDashboardClient } from "./VerificationDashboardClient";

export const dynamic = "force-dynamic";

export default async function VerifyPaymentsPage() {
  const payload = await getPayload({ config: configPromise });
  const reqHeaders = await headers();
  const authResult = await payload.auth({ headers: reqHeaders });

  const user = authResult?.user;

  if (!user || !checkRole(["admin", "finance"], user)) {
    redirect("/login?redirect=/admin/verify-payments");
  }

  const queryResult = await payload.find({
    collection: "moon-registrations",
    limit: 500,
    sort: "-createdAt",
    depth: 1, // Populate paymentSlip media object
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docs: any[] = queryResult.docs || [];

  return (
    <VerificationDashboardClient
      initialDocs={docs}
      currentUserEmail={user.email}
    />
  );
}
