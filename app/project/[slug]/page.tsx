import { ProjectPage } from "@/components/project-page";
import { getProject } from "@/sanity/sanity";
import { notFound } from "next/navigation";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
