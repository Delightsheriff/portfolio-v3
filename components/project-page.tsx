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

function PhoneMockup({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}) {
  const widths = { sm: "w-[160px] sm:w-[180px]", md: "w-[200px] sm:w-[240px]", lg: "w-[220px] sm:w-[280px]" };
  return (
    <div className={`relative ${widths[size]} mx-auto`}>
      <div className="relative rounded-[2.5rem] border-[6px] border-foreground/80 bg-foreground/80 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-foreground/80 rounded-b-2xl z-10" />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-background">
          <Image src={src} alt={alt} fill className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

export function ProjectPage({ project }: ProjectPageProps) {
  const isMobile = project.projectType?.category === "mobile";

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <GoBack />

        {/* Hero Section */}
        <section className="pt-28 pb-10 px-5 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {project.projectType && (
                  <Badge variant="secondary">
                    {CATEGORY_LABELS[project.projectType.category] ?? project.projectType.category}
                  </Badge>
                )}
                {project.year && (
                  <Badge variant="outline" className="font-mono">
                    {project.year}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-5">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {project.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                {isMobile ? (
                  <>
                    {project.iosUrl && (
                      <a
                        href={project.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download ${project.title} on the App Store`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm hover:border-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Website
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source on GitHub`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm hover:border-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source on GitHub`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm hover:border-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        View Source
                      </a>
                    )}
                  </>
                )}
              </div>

              {/* Project Metadata */}
              <dl className="flex flex-wrap gap-x-8 gap-y-4 py-5 border-y border-border text-sm">
                {project.client && (
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Client</dt>
                    <dd className="text-foreground">{project.client}</dd>
                  </div>
                )}
                {project.role && (
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Role</dt>
                    <dd className="text-foreground">{project.role}</dd>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Duration</dt>
                    <dd className="text-foreground">{project.duration}</dd>
                  </div>
                )}
                {project.year && (
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Year</dt>
                    <dd className="text-foreground">{project.year}</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-5 md:px-8 pb-14">
          <div className="max-w-7xl mx-auto">
            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center py-14 md:py-20 bg-muted rounded-2xl"
              >
                <PhoneMockup
                  src={project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.svg"}
                  alt={`${project.title} app screenshot`}
                  size="lg"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[16/9] sm:aspect-[16/10] bg-muted rounded-2xl overflow-hidden"
              >
                <Image
                  src={project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.svg"}
                  alt={`${project.title} preview`}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Tech Stack & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 space-y-5"
            >
              {project.stack.length > 0 && (
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2.5">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <Badge key={i} variant="outline" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {project.projectType?.features && project.projectType.features.length > 0 && (
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2.5">
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

        <Separator className="max-w-7xl mx-auto px-5 md:px-8" />

        {/* Content Sections */}
        <section className="py-16 px-5 md:px-8">
          <div className="max-w-7xl mx-auto space-y-20">

            {/* Challenge */}
            {project.challenge && (
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block">01</span>
                    <h2 className="text-2xl md:text-3xl font-serif">The Challenge</h2>
                  </div>
                  <div className="md:col-span-8 md:col-start-5">
                    <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                      {project.challenge}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Solution */}
            {project.solution && (
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block">02</span>
                    <h2 className="text-2xl md:text-3xl font-serif">The Solution</h2>
                  </div>
                  <div className="md:col-span-8 md:col-start-5">
                    <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-10">
                      {project.solution}
                    </p>

                    {project.images && project.images.length > 0 && (
                      isMobile ? (
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                          {project.images.slice(0, 2).map((image, i) =>
                            image ? (
                              <div key={i} className="flex items-center justify-center py-8 bg-muted rounded-xl">
                                <PhoneMockup
                                  src={urlFor(image).url()}
                                  alt={`${project.title} — Screen ${i + 1}`}
                                  size="sm"
                                />
                              </div>
                            ) : null
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-5">
                          {project.images.slice(0, 2).map((image, i) =>
                            image ? (
                              <div key={i} className="relative aspect-[16/9] bg-muted rounded-xl overflow-hidden">
                                <Image
                                  src={urlFor(image).url()}
                                  alt={`${project.title} — Image ${i + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : null
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block">03</span>
                    <h2 className="text-2xl md:text-3xl font-serif">The Results</h2>
                  </div>
                  <div className="md:col-span-8 md:col-start-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                      {project.results.map((result, i) => (
                        <div key={i} className="p-4 border border-border rounded-xl bg-muted/30">
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-highlight rounded-full mt-1.5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{result}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {project.images?.[2] && (
                      isMobile ? (
                        <div className="flex items-center justify-center py-10 bg-muted rounded-xl">
                          <PhoneMockup
                            src={urlFor(project.images[2]).url()}
                            alt={`${project.title} — Final Result`}
                            size="md"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-[16/9] bg-muted rounded-xl overflow-hidden">
                          <Image
                            src={urlFor(project.images[2]).url()}
                            alt={`${project.title} — Final Result`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Next Project */}
        {project.nextProject && (
          <section className="py-20 px-5 md:px-8 bg-muted">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
                      Next Project
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif hover:text-highlight transition-colors">
                      {project.nextProject.title}
                    </h3>
                  </div>
                  <Link
                    href={`/project/${project.nextProject.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all group flex-shrink-0"
                    aria-label={`View next project: ${project.nextProject.title}`}
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
