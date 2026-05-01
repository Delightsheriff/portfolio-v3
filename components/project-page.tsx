"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GoBack from "./go-back";
import { urlFor } from "@/sanity/sanity";
import { ScrollReveal } from "./animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/interface/sanity";
import Footer from "./nav/footer";

interface ProjectPageProps {
  project: Project;
}

const CATEGORY_LABELS: Record<string, string> = {
  fullstack: "Full-Stack",
  frontend: "Frontend",
  mobile: "Mobile App",
  backend: "Backend",
  static: "Static Site",
  ai: "AI / ML",
  dataviz: "Data Viz",
  devtool: "Dev Tool",
};

const FEATURE_LABELS: Record<string, string> = {
  auth: "Authentication",
  payments: "Payments",
  realtime: "Real-time",
  search: "Search & Filter",
  responsive: "Responsive",
  api: "API Integration",
  analytics: "Analytics",
  notifications: "Notifications",
  "custom-ui": "Custom UI/UX",
  performance: "Performance",
  security: "Security",
  "file-management": "File Management",
  "ai-integration": "AI/ML",
  email: "Email",
  i18n: "i18n",
  pwa: "PWA",
  "background-jobs": "Background Jobs",
  admin: "Admin Dashboard",
};

function FramedMobileImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-b from-muted/85 via-muted/65 to-transparent px-6 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[320px] lg:max-w-[380px]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border border-border/40 bg-background shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 320px, 380px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
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
    <>
      <div className="min-h-screen bg-background text-foreground">
        <GoBack />

        <main id="main-content">
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

                <h1 className="mb-5 text-4xl font-serif leading-tight sm:text-5xl lg:text-6xl">
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
                          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-highlight"
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
                          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-highlight"
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
                          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
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
                          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                        >
                          <Github className="h-4 w-4" aria-hidden="true" />
                          View Source
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} live demo`}
                          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-highlight"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source on GitHub`}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                        >
                          <Github className="h-4 w-4" aria-hidden="true" />
                          View Source
                        </a>
                      )}
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

          <section className="px-5 pb-14 md:px-8">
            <div className="mx-auto max-w-7xl">
              {isMobile ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex items-center justify-center overflow-hidden rounded-2xl py-16 md:py-24"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 30%, hsl(var(--muted) / 0.9) 0%, hsl(var(--muted)) 70%)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                  >
                    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.03]" />
                    <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.05]" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 w-full max-w-[460px]"
                  >
                    <FramedMobileImage
                      src={mainImageUrl}
                      alt={`${project.title} app screenshot`}
                      priority
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/10]"
                >
                  <Image
                    src={mainImageUrl}
                    alt={`${project.title} preview`}
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 space-y-5"
              >
                {project.stack.length > 0 && (
                  <div>
                    <p className="mb-2.5 text-xs uppercase tracking-[0.15em] text-muted-foreground font-mono">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <Badge key={i} variant="outline" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.projectType?.features &&
                  project.projectType.features.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs uppercase tracking-[0.15em] text-muted-foreground font-mono">
                        Key Features
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.projectType.features.map((feature, i) => (
                          <Badge key={i} variant="secondary">
                            {FEATURE_LABELS[feature] ?? feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </motion.div>
            </div>
          </section>

          <Separator className="mx-auto max-w-7xl px-5 md:px-8" />

          <section className="px-5 py-16 md:px-8">
            <div className="mx-auto max-w-7xl space-y-20">
              {project.challenge && (
                <ScrollReveal>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-3">
                      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                        01
                      </span>
                      <h2 className="text-2xl font-serif md:text-3xl">
                        The Challenge
                      </h2>
                    </div>
                    <div className="md:col-span-8 md:col-start-5">
                      <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                        {project.challenge}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {project.solution && (
                <ScrollReveal>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-3">
                      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                        02
                      </span>
                      <h2 className="text-2xl font-serif md:text-3xl">
                        The Solution
                      </h2>
                    </div>
                    <div className="md:col-span-8 md:col-start-5">
                      <p className="mb-10 text-base leading-relaxed text-foreground/90 md:text-lg">
                        {project.solution}
                      </p>

                      {galleryImages.length > 0 &&
                        (isMobile ? (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                            {galleryImages.slice(0, 2).map((image, i) => (
                              <FramedMobileImage
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
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {project.results && project.results.length > 0 && (
                <ScrollReveal>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-3">
                      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-mono">
                        03
                      </span>
                      <h2 className="text-2xl font-serif md:text-3xl">
                        The Results
                      </h2>
                    </div>
                    <div className="md:col-span-8 md:col-start-5">
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
                          <FramedMobileImage
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
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </section>

          {project.nextProject && (
            <section className="bg-muted px-5 py-20 md:px-8">
              <div className="mx-auto max-w-7xl">
                <ScrollReveal>
                  <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                      <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                        Next Project
                      </span>
                      <h3 className="text-3xl font-serif transition-colors hover:text-highlight md:text-4xl lg:text-5xl">
                        {project.nextProject.title}
                      </h3>
                    </div>
                    <Link
                      href={`/project/${project.nextProject.slug}`}
                      className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                      aria-label={`View next project: ${project.nextProject.title}`}
                    >
                      View Project
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
