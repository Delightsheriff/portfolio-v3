import ClientOnly from "@/components/client-wrapper";
import { HomePage } from "@/components/home-page";
import {
  getAbout,
  getExperiences,
  getFeaturedProjects,
  getHero,
  getVideoPitch,
} from "@/sanity/sanity";
import Loading from "./loading";

export default async function Home() {
  const [projects, experiences, about, hero, videoPitch] = await Promise.all([
    getFeaturedProjects(3),
    getExperiences(),
    getAbout(),
    getHero(),
    getVideoPitch(),
  ]);

  if (!projects || !experiences || !about || !hero || !videoPitch) {
    return <Loading />;
  }
  return (
    <ClientOnly>
      <HomePage
        projects={projects}
        about={about}
        hero={hero}
        experiences={experiences}
        videoPitch={videoPitch}
      />
    </ClientOnly>
  );
}
