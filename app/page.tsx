import {
  getAbout,
  getExperiences,
  getFeaturedProjects,
  getHero,
} from "@/sanity/sanity";

export default async function Home() {
  const projects = await getFeaturedProjects(3);
  const experiences = await getExperiences();
  const about = await getAbout();
  const hero = await getHero();

  if (!projects || !experiences || !about || !hero) {
    return (
      <div>
        <h1>Error loading data</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Welcome to My Portfolio</h1>
      <p>This is a showcase of my work.</p>
    </div>
  );
}
