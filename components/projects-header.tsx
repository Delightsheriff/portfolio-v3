"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectsHeader() {
  return (
    <section className="pt-32 pb-16 px-5 md:px-8" aria-label="Projects header">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            All Projects
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-5">
            Work I&apos;m proud of
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A complete archive of projects spanning web applications, mobile
            apps, and APIs. Each one solving a real problem with care for
            user experience.
          </p>
          <a
            href="https://github.com/Delightsheriff"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Browse GitHub profile"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-sm font-mono",
            )}
          >
            Browse GitHub
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
