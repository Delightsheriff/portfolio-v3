import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, getProjectGroup, urlFor } from "@/sanity/sanity";
import { ProjectGroupDetail } from "@/components/project-group-detail";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/nav/footer";
import type { ProjectGroupPart } from "@/interface/sanity";

const SITE_URL = "https://delightsheriff.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = await getProjectGroup(slug);
  if (!group) return { title: "Project Group Not Found" };

  const title = `${group.title}: Case Study`;
  const description = group.description?.slice(0, 160) ?? "";
  const leadImage = group.parts[0]?.project?.mainImage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ogBuilder: any = leadImage ? urlFor(leadImage) : null;
  const ogImage: string =
    ogBuilder && typeof ogBuilder.width === "function"
      ? ogBuilder.width(1200).height(630).fit("crop").url()
      : "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: `/project-group/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/project-group/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${group.title}: project by Delight Sheriff`,
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

export async function generateStaticParams() {
  if (!client) return [];
  const slugs = await client.fetch(
    `*[_type == "projectGroup" && (!defined(visible) || visible == true)]{"slug": slug.current}`,
  );
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function ProjectGroupPage({ params }: Props) {
  const { slug } = await params;
  const group = await getProjectGroup(slug);
  if (!group) notFound();

  const groupUrl = `${SITE_URL}/project-group/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: group.title, item: groupUrl },
    ],
  };

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: group.title,
    description: group.description,
    url: groupUrl,
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
      url: SITE_URL,
    },
    ...(group.year && { dateCreated: `${group.year}-01-01` }),
    hasPart: group.parts
      .filter((part: ProjectGroupPart) => part.project)
      .map((part: ProjectGroupPart) => ({
        "@type": "CreativeWork",
        name: part.project.title,
        url: `${SITE_URL}/project/${part.project.slug.current}`,
      })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ProjectGroupDetail group={group} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
