/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  index: number;
  urlFor: (source: any) => any;
}

const CATEGORY_LABELS: Record<string, string> = {
  fullstack: "Full-Stack",
  frontend: "Frontend",
  mobile: "Mobile App",
  backend: "Backend API",
  static: "Static Site",
  ai: "AI / ML",
  dataviz: "Data Viz",
  devtool: "Dev Tool",
};

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center py-10 md:py-14 bg-muted/60 rounded-lg">
      <div className="relative w-[180px] md:w-[220px] group">
        <div className="relative rounded-[2.2rem] border-[7px] border-foreground/85 bg-foreground/85 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-foreground/85 rounded-b-xl z-10" />
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] bg-background">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="220px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground/20 rounded-full blur-sm" />
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, urlFor }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const isMobile = project.projectType?.category === "mobile";
  const imageUrl = urlFor(project.mainImage).url();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center group"
    >
      {/* Image */}
      <div
        className={`${
          isEven
            ? "md:col-span-7"
            : "md:col-span-7 md:col-start-6 md:order-2"
        }`}
      >
        <Link
          href={`/project/${project.slug.current}`}
          aria-label={`View ${project.title} case study`}
          className="block"
        >
          {isMobile ? (
            <PhoneMockup src={imageUrl} alt={project.title} />
          ) : (
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-muted/60">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/8 transition-colors duration-500" />
            </div>
          )}
        </Link>
      </div>

      {/* Content */}
      <div
        className={`${
          isEven
            ? "md:col-span-4 md:col-start-9"
            : "md:col-span-4 md:order-1"
        } space-y-4`}
      >
        {/* Category + year */}
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

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif leading-tight">
          <Link
            href={`/project/${project.slug.current}`}
            className="hover:text-highlight transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {project.description}
        </p>

        {/* Tech stack badges */}
        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.slice(0, 6).map((tech, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-xs font-mono text-muted-foreground border-border/50 px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.stack.length > 6 && (
              <Badge
                variant="outline"
                className="text-xs font-mono text-muted-foreground border-border/50 px-2 py-0.5"
              >
                +{project.stack.length - 6}
              </Badge>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-1">
          <Link
            href={`/project/${project.slug.current}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-highlight transition-colors group/link"
          >
            Case Study
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
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
    </motion.article>
  );
}
