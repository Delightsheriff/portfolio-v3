"use client";

import { Github, ExternalLink, ArrowUpRight, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./animations/scroll-reveal";
import type { Project } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/constants";

interface ProjectGridCardProps {
  project: Project;
  index: number;
}

export function ProjectGridCard({ project, index }: ProjectGridCardProps) {
  const isMobile = project.projectType?.category === "mobile";
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).url()
    : "/placeholder.svg";

  return (
    <ScrollReveal key={project._id} delay={index * 0.05}>
      <article className="group flex flex-col h-full">
        <Link
          href={`/project/${project.slug.current}`}
          aria-label={`View ${project.title} case study`}
          className="block mb-4"
        >
          {isMobile ? (
            <div className="rounded-[1.75rem] bg-gradient-to-b from-muted/80 via-muted/60 to-transparent px-5 py-7 sm:px-6">
              <div className="mx-auto max-w-[220px]">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] border border-border/40 bg-background shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)]">
                  <Image
                    src={imageUrl}
                    alt={`${project.title} app screenshot`}
                    fill
                    sizes="(max-width: 640px) 220px, 220px"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-muted/60 aspect-[4/3] rounded-xl">
              <Image
                src={imageUrl}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>
          )}
        </Link>

        <div className="flex flex-col flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {project.projectType && (
              <Badge variant="secondary" className="text-xs font-mono">
                {CATEGORY_LABELS[project.projectType.category] ??
                  project.projectType.category}
              </Badge>
            )}
            {project.year && (
              <span className="text-xs font-mono text-muted-foreground">
                {project.year}
              </span>
            )}
          </div>

          <h2 className="text-lg md:text-xl font-serif leading-snug group-hover:text-highlight transition-colors">
            <Link href={`/project/${project.slug.current}`}>
              {project.title}
            </Link>
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.description}
          </p>

          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1" aria-label="Tech stack">
              {project.stack.slice(0, 4).map((t, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs font-mono px-1.5 py-0 text-muted-foreground border-border/40"
                >
                  {t}
                </Badge>
              ))}
              {project.stack.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs font-mono px-1.5 py-0 text-muted-foreground border-border/40"
                >
                  +{project.stack.length - 4}
                </Badge>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-1">
            <Link
              href={`/project/${project.slug.current}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-highlight transition-colors group/link"
            >
              Case Study
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                Code
              </a>
            )}
            {isMobile ? (
              <>
                {project.iosUrl && (
                  <a
                    href={project.iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on App Store`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                    iOS
                  </a>
                )}
                {project.androidUrl && (
                  <a
                    href={project.androidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on Google Play`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                    Android
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live website`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    Web
                  </a>
                )}
              </>
            ) : (
              project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Live
                </a>
              )
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
