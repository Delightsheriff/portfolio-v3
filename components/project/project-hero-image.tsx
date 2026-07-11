"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProjectMobileFrame } from "@/components/project-mobile-frame";
import { FEATURE_LABELS } from "@/lib/constants";
import type { Project } from "@/interface/sanity";

interface ProjectHeroImageProps {
  project: Project;
  imageUrl: string;
  isMobile: boolean;
}

export function ProjectHeroImage({
  project,
  imageUrl,
  isMobile,
}: ProjectHeroImageProps) {
  return (
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
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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
              <ProjectMobileFrame
                src={imageUrl}
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
              src={imageUrl}
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
  );
}
