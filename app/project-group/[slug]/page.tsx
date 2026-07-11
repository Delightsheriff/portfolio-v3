import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectGroup } from "@/sanity/sanity";
import { ProjectGroupDetail } from "@/components/project-group-detail";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/nav/footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = await getProjectGroup(slug);
  if (!group) return { title: "Project Group Not Found" };

  return {
    title: `${group.title} — Project Group`,
    description: group.description,
  };
}

export default async function ProjectGroupPage({ params }: Props) {
  const { slug } = await params;
  const group = await getProjectGroup(slug);
  if (!group) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
