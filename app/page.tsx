import { HomePage } from "@/components/home-page";
import {
  getAbout,
  getExperiences,
  getFeaturedProjectGroups,
  getFeaturedProjects,
  getHero,
  getProjects,
} from "@/sanity/sanity";
import Loading from "./loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "https://delightsheriff.com" },
};

export default async function Home() {
  const [projects, experiences, about, hero, allProjects, groups] =
    await Promise.all([
      getFeaturedProjects(3),
      getExperiences(),
      getAbout(),
      getHero(),
      getProjects(),
      getFeaturedProjectGroups(),
    ]);

  if (!projects || !experiences || !about || !hero || !allProjects) {
    return <Loading />;
  }

  return (
    <HomePage
      projects={projects}
      about={about}
      hero={hero}
      experiences={experiences}
      allProjects={allProjects}
      groups={groups ?? []}
    />
  );
}
