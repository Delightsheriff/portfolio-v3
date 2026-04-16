import { ProjectPage } from "@/components/project-page";
import { getProject, getProjects } from "@/sanity/sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/sanity";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project Not Found" };

  const title = `${project.title} — Case Study`;
  // Use overview (longer) if description is short
  const description =
    project.overview?.slice(0, 160) ?? project.description ?? "";

  // Use project's main image for OG if available, otherwise fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _ogBuilder: any = project.mainImage ? urlFor(project.mainImage) : null;
  const ogImage: string =
    _ogBuilder && typeof _ogBuilder.width === "function"
      ? _ogBuilder.width(1200).height(630).fit("crop").url()
      : "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: `/project/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.delightsheriff.com/project/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} — project by Delight Sheriff`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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

  if (!project) notFound();

  const isMobile = project.projectType?.category === "mobile";
  const projectUrl = `https://www.delightsheriff.com/project/${slug}`;

  // BreadcrumbList — helps Google show breadcrumbs in SERPs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.delightsheriff.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://www.delightsheriff.com/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  // Main entity — SoftwareApplication for mobile apps, CreativeWork for others
  const mainJsonLd = isMobile
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.overview ?? project.description,
        url: projectUrl,
        applicationCategory: "MobileApplication",
        operatingSystem: [
          ...(project.iosUrl ? ["iOS"] : []),
          ...(project.androidUrl ? ["Android"] : []),
        ].join(", ") || "iOS, Android",
        author: {
          "@type": "Person",
          name: "Amadi-Sheriff Delight",
          url: "https://www.delightsheriff.com",
        },
        ...(project.iosUrl && { downloadUrl: project.iosUrl }),
        ...(project.stack && { keywords: project.stack.join(", ") }),
      }
    : {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.overview ?? project.description,
        url: projectUrl,
        author: {
          "@type": "Person",
          name: "Amadi-Sheriff Delight",
          url: "https://www.delightsheriff.com",
        },
        dateCreated: project.year ? `${project.year}-01-01` : undefined,
        ...(project.stack && { keywords: project.stack.join(", ") }),
        ...(project.liveUrl && { mainEntityOfPage: project.liveUrl }),
        ...(project.githubUrl && { codeRepository: project.githubUrl }),
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainJsonLd) }}
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
