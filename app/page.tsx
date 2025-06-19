import ClientOnly from "@/components/client-wrapper";
import { HomePage } from "@/components/home-page";
import {
  getAbout,
  getExperiences,
  getFeaturedProjects,
  getHero,
} from "@/sanity/sanity";
import Loading from "./loading";

export default async function Home() {
  const [projects, experiences, about, hero] = await Promise.all([
    getFeaturedProjects(3),
    getExperiences(),
    getAbout(),
    getHero(),
  ]);

  if (!projects || !experiences || !about || !hero) {
    return <Loading />;
  }
  return (
    <ClientOnly>
      <HomePage
        projects={projects}
        about={about}
        hero={hero}
        experiences={experiences}
      />
    </ClientOnly>
  );
}
