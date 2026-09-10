import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    year: string;
  }>;
}

export default async function ProjectsNasaSpaceAppsYearRedirect({ params }: Props) {
  const { year } = await params;
  redirect(`/nasa-space-apps-challenge/${year}`);
}
