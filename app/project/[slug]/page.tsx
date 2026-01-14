import { ProjectPage } from "@/components/project-page";
import { getProject, getProjects } from "@/sanity/sanity";
import { notFound } from "next/navigation";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  if (!projects) return [];

  return projects.map((project: { slug: { current: string } }) => ({
    slug: project.slug.current,
  }));
}
