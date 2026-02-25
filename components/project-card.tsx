/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/interface/sanity";

interface ProjectCardProps {
  project: Project;
  index: number;
  urlFor: (source: any) => any;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    fullstack: "Full-Stack",
    frontend: "Frontend",
    mobile: "Mobile App",
    backend: "Backend",
    static: "Static Site",
    ai: "AI / ML",
    dataviz: "Data Viz",
    devtool: "Dev Tool",
  };
  return labels[category] || category;
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center py-8 md:py-12 bg-muted rounded-sm">
      <div className="relative w-[200px] md:w-[240px] group">
        {/* Phone frame */}
        <div className="relative rounded-[2rem] border-[6px] border-foreground/80 bg-foreground/80 shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/80 rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-background">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, urlFor }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const isMobile = project.projectType?.category === "mobile";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-12 gap-4 md:gap-8 items-center"
    >
      {/* Image */}
      <div
        className={`col-span-12 ${isEven ? "md:col-span-7" : "md:col-span-7 md:col-start-6 order-1 md:order-2"}`}
      >
        <Link href={`/project/${project.slug.current}`} className="group block">
          {isMobile ? (
            <PhoneMockup
              src={urlFor(project.mainImage).url() || "/placeholder.svg"}
              alt={project.title}
            />
          ) : (
            <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-sm">
              <Image
                src={urlFor(project.mainImage).url() || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}
        </Link>
      </div>

      {/* Content */}
      <div
        className={`col-span-12 ${
          isEven
            ? "md:col-span-4 md:col-start-9"
            : "md:col-span-4 order-2 md:order-1"
        } space-y-5`}
      >
        <div className="space-y-3">
          {/* Category label */}
          {project.projectType && (
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
              {getCategoryLabel(project.projectType.category)}
            </span>
          )}
          <h3 className="text-2xl md:text-3xl font-serif">{project.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground/70">
          {project.stack.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-5">
          <Link
            href={`/project/${project.slug.current}`}
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
          >
            View Case Study
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              Source
            </a>
          )}

          {isMobile ? (
            <>
              {project.iosUrl && (
                <a
                  href={project.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${project.title} on the App Store`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Website
                </a>
              )}
            </>
          ) : (
            project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Live
              </a>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
