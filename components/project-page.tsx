"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { CustomCursor } from "./animations/custom-cursor";
import GoBack from "./go-back";
import { urlFor } from "@/sanity/sanity";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import { Project } from "@/interface/sanity";
import { ProjectBadge } from "./project-badge";

interface ProjectPageProps {
  project: Project;
}

export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[#FDFBF6] text-[#111111]">
        {/* Enhanced Navigation with Blur */}
        <GoBack />

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-12 gap-4 md:gap-8 mb-12"
            >
              <div className="col-span-12 md:col-span-8">
                <h1 className="text-4xl md:text-6xl font-serif mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                  {project.overview}
                </p>

                {project.projectType && (
                  <div className="mt-6">
                    <ProjectBadge projectType={project.projectType} size="md" />
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mt-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View on GitHub</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF471A] text-white hover:bg-[#e63d17] rounded-full transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 md:col-start-10 space-y-4 text-sm">
                {project.client && (
                  <div>
                    <div className="font-mono text-gray-500 mb-1">Client</div>
                    <div>{project.client}</div>
                  </div>
                )}
                {project.role && (
                  <div>
                    <div className="font-mono text-gray-500 mb-1">Role</div>
                    <div>{project.role}</div>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <div className="font-mono text-gray-500 mb-1">Duration</div>
                    <div>{project.duration}</div>
                  </div>
                )}
                {project.year && (
                  <div>
                    <div className="font-mono text-gray-500 mb-1">Year</div>
                    <div>{project.year}</div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative aspect-[16/10] bg-gray-100 rounded-sm overflow-hidden mb-12"
            >
              <Image
                src={urlFor(project.mainImage).url() || "/placeholder.svg"}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2 mb-16"
            >
              {project.stack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-sm font-mono rounded-full"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12 px-6 md:px-8">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* Challenge */}
            {project.challenge && (
              <ScrollReveal>
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                  <div className="col-span-12 md:col-span-3">
                    <h2 className="text-2xl md:text-3xl font-serif">
                      The Challenge
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <p className="text-lg leading-relaxed text-gray-700">
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
                    <h2 className="text-2xl md:text-3xl font-serif">
                      The Solution
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <p className="text-lg leading-relaxed text-gray-700 mb-8">
                      {project.solution}
                    </p>

                    {project.images && project.images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.images.slice(0, 2).map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden"
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
                    <h2 className="text-2xl md:text-3xl font-serif">
                      The Results
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {project.results.map((result, index) => (
                        <div key={index} className="p-6 bg-gray-50 rounded-sm">
                          <div className="text-lg font-medium">{result}</div>
                        </div>
                      ))}
                    </div>

                    {project.images && project.images[2] && (
                      <div className="relative aspect-[16/9] bg-gray-100 rounded-sm overflow-hidden">
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
          <section className="py-20 px-6 md:px-8 bg-[#111111] text-[#FDFBF6]">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div>
                    <div className="text-sm font-mono text-gray-400 mb-2">
                      Next Project
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif">
                      {project.nextProject.title}
                    </h3>
                  </div>
                  <MagneticButton
                    href={`/project/${project.nextProject.slug}`}
                    variant="light"
                  >
                    View Project
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-8 px-6 md:px-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
            <div>© {new Date().getFullYear()} Amadi-Sheriff Delight</div>
            <div className="font-mono">Crafted with intention</div>
          </div>
        </footer>
      </div>
    </>
  );
}
