"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ProjectMobileFrame } from "@/components/project-mobile-frame";
import { urlFor } from "@/sanity/sanity";
import type { Project } from "@/interface/sanity";

interface ProjectCaseStudiesProps {
  project: Project;
  isMobile: boolean;
  galleryImages: NonNullable<Project["images"]>;
}

function CaseStudySection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
            {index}
          </span>
          <h2 className="text-2xl font-heading font-bold md:text-3xl tracking-tight">
            {title}
          </h2>
        </div>
        <div className="md:col-span-8 md:col-start-5">{children}</div>
      </div>
    </ScrollReveal>
  );
}

export function ProjectCaseStudies({
  project,
  isMobile,
  galleryImages,
}: ProjectCaseStudiesProps) {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl space-y-20">
        {project.challenge && (
          <CaseStudySection index="01" title="The Challenge">
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              {project.challenge}
            </p>
          </CaseStudySection>
        )}

        {project.architecture && (
          <CaseStudySection index="02" title="The Architecture">
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              {project.architecture}
            </p>
          </CaseStudySection>
        )}

        {project.solution && (
          <CaseStudySection
            index={project.architecture ? "03" : "02"}
            title="The Solution"
          >
            <p className="mb-10 text-base leading-relaxed text-foreground/90 md:text-lg">
              {project.solution}
            </p>

            {galleryImages.length > 0 &&
              (isMobile ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {galleryImages.slice(0, 2).map((image, i) => (
                    <ProjectMobileFrame
                      key={i}
                      src={urlFor(image).url()}
                      alt={`${project.title} - Screen ${i + 1}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {galleryImages.slice(0, 2).map((image, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted"
                    >
                      <Image
                        src={urlFor(image).url()}
                        alt={`${project.title} - Image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
          </CaseStudySection>
        )}

        {project.results && project.results.length > 0 && (
          <CaseStudySection
            index={project.architecture ? "04" : "03"}
            title="The Results"
          >
            <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.results.map((result, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-highlight" />
                    <p className="text-sm leading-relaxed">{result}</p>
                  </div>
                </div>
              ))}
            </div>

            {galleryImages[2] &&
              (isMobile ? (
                <ProjectMobileFrame
                  src={urlFor(galleryImages[2]).url()}
                  alt={`${project.title} - Final Result`}
                />
              ) : (
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={urlFor(galleryImages[2]).url()}
                    alt={`${project.title} - Final Result`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </CaseStudySection>
        )}
      </div>
    </section>
  );
}
