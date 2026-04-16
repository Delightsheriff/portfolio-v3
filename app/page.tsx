import { HomePage } from "@/components/home-page";
import {
  getAbout,
  getExperiences,
  getFeaturedProjects,
  getHero,
  getProjects,
  getVideoPitch,
} from "@/sanity/sanity";
import Loading from "./loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "https://www.delightsheriff.com" },
};

export default async function Home() {
  const [projects, experiences, about, hero, videoPitch, allProjects] =
    await Promise.all([
      getFeaturedProjects(3),
      getExperiences(),
      getAbout(),
      getHero(),
      getVideoPitch(),
      getProjects(),
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
      videoPitch={videoPitch}
      allProjects={allProjects}
    />
  );
}
