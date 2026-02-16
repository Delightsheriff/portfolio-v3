"use client";

import type { Hero } from "@/interface/sanity";
import { motion, type MotionValue } from "framer-motion";
import { MagneticButton } from "./animations/magnetic-button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection({
  hero,
  y,
}: {
  hero: Hero;
  y: MotionValue<string>;
}) {
  const headlineWords = hero?.headline?.split(" ") || [];

  return (
    <section className="min-h-[90vh] flex items-center relative px-6 md:px-8">
      <motion.div
        style={{ y }}
        className="max-w-7xl mx-auto w-full py-32 md:py-40"
      >
        <div className="max-w-5xl">
          {/* Status Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {hero?.status || "Available for Work"}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-8">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] mr-3 md:mr-5"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Animated Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="origin-left h-px bg-border mb-8 max-w-md"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed mb-10 font-serif italic"
          >
            {hero?.subheadline}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton href={hero?.ctaLink || "#work"}>
              {hero?.ctaText || "View My Work"}
            </MagneticButton>

            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              or view my resume
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Metadata Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="mt-16 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground/70"
          >
            <span>{hero?.location}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>Open to remote opportunities</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
