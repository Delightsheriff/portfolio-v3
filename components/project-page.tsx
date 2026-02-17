"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { CustomCursor } from "./animations/custom-cursor";
import GoBack from "./go-back";
import { urlFor } from "@/sanity/sanity";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import type { Project } from "@/interface/sanity";
import Footer from "./nav/footer";

interface ProjectPageProps {
  project: Project;
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

function getFeatureLabel(feature: string): string {
  const labels: Record<string, string> = {
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
  return labels[feature] || feature;
}

export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground">
        <GoBack />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Eyebrow */}
              <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                {project.projectType && (
                  <span>{getCategoryLabel(project.projectType.category)}</span>
                )}
                {project.year && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span>{project.year}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {project.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live demo`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
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
              </div>

              {/* Project Metadata */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-border text-sm">
                {project.client && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Client
                    </div>
                    <div className="text-foreground">{project.client}</div>
                  </div>
                )}
                {project.role && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Role
                    </div>
                    <div className="text-foreground">{project.role}</div>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Duration
                    </div>
                    <div className="text-foreground">{project.duration}</div>
                  </div>
                )}
                {project.year && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Year
                    </div>
                    <div className="text-foreground">{project.year}</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 md:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {project.projectType?.category === "mobile" ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex items-center justify-center py-12 md:py-20 bg-muted rounded-sm"
              >
                <div className="relative w-[220px] md:w-[280px]">
                  <div className="relative rounded-[2.5rem] border-[6px] border-foreground/80 bg-foreground/80 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/80 rounded-b-2xl z-10" />
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-background">
                      <Image
                        src={
                          urlFor(project.mainImage).url() || "/placeholder.svg"
                        }
                        alt={project.title}
                        fill
                        priority
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative aspect-[16/10] bg-muted rounded-sm overflow-hidden"
              >
                <Image
                  src={urlFor(project.mainImage).url() || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Tech Stack & Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 space-y-6"
            >
              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted border border-border/60 text-xs font-mono rounded-full text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Features */}
              {project.projectType?.features &&
                project.projectType.features.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">
                      Key Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.projectType.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-muted border border-border/60 text-xs font-mono rounded-full text-muted-foreground"
                        >
                          {getFeatureLabel(feature)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-6 md:px-8">
          <div className="max-w-7xl mx-auto space-y-24">
            {/* Challenge */}
            {project.challenge && (
              <ScrollReveal>
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                  <div className="col-span-12 md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3 block">
                      01
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif">
                      The Challenge
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <p className="text-lg leading-relaxed text-foreground">
                      {project.challenge}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Solution */}
            {project.solution && (
              <ScrollReveal>
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                  <div className="col-span-12 md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3 block">
                      02
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif">
                      The Solution
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <p className="text-lg leading-relaxed text-foreground mb-10">
                      {project.solution}
                    </p>

                    {project.images && project.images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.images.slice(0, 2).map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-[4/3] bg-muted rounded-sm overflow-hidden"
                          >
                            <Image
                              src={urlFor(image).url() || "/placeholder.svg"}
                              alt={`${project.title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <ScrollReveal>
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                  <div className="col-span-12 md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3 block">
                      03
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif">
                      The Results
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                      {project.results.map((result, index) => (
                        <div
                          key={index}
                          className="p-5 border border-border rounded-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <div className="text-sm leading-relaxed">
                              {result}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {project.images && project.images[2] && (
                      <div className="relative aspect-[16/9] bg-muted rounded-sm overflow-hidden">
                        <Image
                          src={
                            urlFor(project.images[2]).url() ||
                            "/placeholder.svg"
                          }
                          alt={`${project.title} - Final Result`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Next Project */}
        {project.nextProject && (
          <section className="py-24 px-6 md:px-8 bg-muted">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
                      Next Project
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif">
                      {project.nextProject.title}
                    </h3>
                  </div>
                  <MagneticButton
                    href={`/project/${project.nextProject.slug}`}
                    variant="outline"
                  >
                    View Project
                  </MagneticButton>
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
