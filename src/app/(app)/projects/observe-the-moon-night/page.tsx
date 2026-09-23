import { redirect } from "next/navigation";
import { getLatestObserveMoonNightYear } from "@/utilities/getObserveMoonNightProject";

export default function ObserveMoonNightDefaultRedirect() {
  const latestYear = getLatestObserveMoonNightYear();
  redirect(`/projects/observe-the-moon-night/${latestYear}`);
}
