import { HomePage } from "@/components/home-page";
import {
  getExperiences,
  getFeaturedProjectGroups,
  getFeaturedProjects,
  getProfile,
  getProjects,
} from "@/sanity/sanity";
import Loading from "./loading";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: SITE_URL },
};

export default async function Home() {
  const [projects, experiences, profile, allProjects, groups] =
    await Promise.all([
      getFeaturedProjects(10),
      getExperiences(),
      getProfile(),
      getProjects(),
      getFeaturedProjectGroups(),
    ]);

  if (!projects || !experiences || !profile || !allProjects) {
    return <Loading />;
  }

  return (
    <HomePage
      projects={projects}
      profile={profile}
      experiences={experiences}
      allProjects={allProjects}
      groups={groups ?? []}
    />
  );
}
