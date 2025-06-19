import { ProjectsPage } from "@/components/projects-page";
import { getProjects } from "@/sanity/sanity";

export const revalidate = 60;

export const metadata = {
  title: "Projects - Amadi-Sheriff Delight",
  description:
    "A comprehensive collection of my software engineering projects and case studies.",
};

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectsPage projects={projects} />;
}
