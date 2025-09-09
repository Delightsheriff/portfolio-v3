import ClientOnly from "@/components/client-wrapper";
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

  if (
    !projects ||
    !experiences ||
    !about ||
    !hero ||
    !videoPitch ||
    !allProjects
  ) {
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
        allProjects={allProjects}
      />
    </ClientOnly>
  );
}
