"use client";

import GoBack from "./go-back";
import { urlFor } from "@/sanity/sanity";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/interface/sanity";
import Footer from "./nav/footer";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectHeroImage } from "@/components/project/project-hero-image";
import { ProjectImpactSection } from "@/components/project/project-impact-section";
import { ProjectCaseStudies } from "@/components/project/project-case-studies";
import { ProjectNextSection } from "@/components/project/project-next-section";

interface ProjectPageProps {
  project: Project;
}

export function ProjectPage({ project }: ProjectPageProps) {
  const isMobile = project.projectType?.category === "mobile";
  const mainImageUrl = project.mainImage
    ? urlFor(project.mainImage).url()
    : "/placeholder.svg";
  const galleryImages = (project.images ?? []).filter((image) =>
    Boolean(image?.asset?._ref),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GoBack />

      <main id="main-content">
        <ProjectHeader project={project} />

        <ProjectHeroImage
          project={project}
          imageUrl={mainImageUrl}
          isMobile={isMobile}
        />

        <Separator className="mx-auto max-w-7xl px-5 md:px-8" />

        {project.impactMetric && (
          <ProjectImpactSection impactMetric={project.impactMetric} />
        )}

        <ProjectCaseStudies
          project={project}
          isMobile={isMobile}
          galleryImages={galleryImages}
        />

        {project.nextProject && (
          <ProjectNextSection nextProject={project.nextProject} />
        )}
      </main>

      <Footer />
    </div>
  );
}
