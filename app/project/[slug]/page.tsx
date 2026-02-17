import { ProjectPage } from "@/components/project-page";
import { getProject, getProjects } from "@/sanity/sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title} - Amadi-Sheriff Delight`;
  const description = project.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/project/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.delightsheriff.com/project/${slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} - Project by Amadi-Sheriff Delight`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://www.delightsheriff.com/project/${slug}`,
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
      url: "https://www.delightsheriff.com",
    },
    ...(project.stack && {
      keywords: project.stack.join(", "),
    }),
    ...(project.liveUrl && {
      mainEntityOfPage: project.liveUrl,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPage project={project} />
    </>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  if (!projects) return [];

  return projects.map((project: { slug: { current: string } }) => ({
    slug: project.slug.current,
  }));
}
