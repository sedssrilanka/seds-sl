import { redirect } from "next/navigation";
import { getAllObserveMoonNightYears } from "@/utilities/getObserveMoonNightProject";

interface Props {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAllObserveMoonNightYears();
  return years.map((year) => ({
    year,
  }));
}

export default async function ObserveMoonStoryPage({ params }: Props) {
  const { year } = await params;
  redirect(`/projects/observe-the-moon-night/${year}`);
}
