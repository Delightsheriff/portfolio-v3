"use client";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  FileText,
  Play,
  GitBranch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Project } from "@/interface/sanity";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const isMobile = project.projectType?.category === "mobile";

  return (
    <section className="px-5 pb-10 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {project.projectType && (
              <Badge variant="secondary">
                {CATEGORY_LABELS[project.projectType.category] ??
                  project.projectType.category}
              </Badge>
            )}
            {project.year && (
              <Badge variant="outline" className="font-mono">
                {project.year}
              </Badge>
            )}
          </div>

          <h1 className="mb-5 text-4xl font-heading font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.overview}
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            {isMobile ? (
              <>
                {project.iosUrl && (
                  <a
                    href={project.iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${project.title} on the App Store`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    App Store
                  </a>
                )}
                {project.androidUrl && (
                  <a
                    href={project.androidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get ${project.title} on Google Play`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M3 20.5v-17c0-.83 1-.9 1.4-.5l14.6 8.5-14.6 8.5c-.4.4-1.4.33-1.4-.5zM3.5 4.5l10.4 6.06-10.4 6.06V4.5z" />
                    </svg>
                    Play Store
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} website`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Website
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source on GitHub`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source
                  </a>
                )}
                {project.demoVideoUrl && (
                  <a
                    href={project.demoVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} demo video`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    Watch Demo
                  </a>
                )}
                {project.repoUrls?.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${repo.label} repository`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <GitBranch className="h-4 w-4" aria-hidden="true" />
                    {repo.label}
                  </a>
                ))}
              </>
            ) : (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live demo`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live Demo
                  </a>
                )}
                {project.apiDocsUrl && (
                  <a
                    href={project.apiDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} API documentation`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    API Docs
                  </a>
                )}
                {project.demoVideoUrl && (
                  <a
                    href={project.demoVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} demo video`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    Watch Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source on GitHub`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source
                  </a>
                )}
                {project.repoUrls?.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${repo.label} repository`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full px-5 py-2.5 h-auto",
                    )}
                  >
                    <GitBranch className="h-4 w-4" aria-hidden="true" />
                    {repo.label}
                  </a>
                ))}
              </>
            )}
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-4 border-y border-border py-5 text-sm">
            {project.client && (
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                  Client
                </dt>
                <dd className="text-foreground">{project.client}</dd>
              </div>
            )}
            {project.role && (
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                  Role
                </dt>
                <dd className="text-foreground">{project.role}</dd>
              </div>
            )}
            {project.duration && (
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                  Duration
                </dt>
                <dd className="text-foreground">{project.duration}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                  Year
                </dt>
                <dd className="text-foreground">{project.year}</dd>
              </div>
            )}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
