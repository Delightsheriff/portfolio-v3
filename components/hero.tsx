"use client";

import type { Hero } from "@/interface/sanity";
import { motion, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const STAGGER = 0.07;

export default function HeroSection({
  hero,
  y,
}: {
  hero: Hero;
  y: MotionValue<string>;
}) {
  const words = hero?.headline?.split(" ") ?? ["Software", "Engineer"];

  return (
    <section
      className="relative min-h-[95vh] flex flex-col justify-center px-5 md:px-8 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        style={{ y }}
        className="max-w-7xl mx-auto w-full pt-28 pb-20 md:pt-36 md:pb-24"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <Badge
            variant="outline"
            className="gap-1.5 text-xs font-mono uppercase tracking-widest border-border/60 text-muted-foreground px-3 py-1"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
              aria-hidden="true"
            />
            {hero?.status ?? "Available for Work"}
          </Badge>
        </motion.div>

        {/* Headline — staggered word reveal */}
        <h1 className="mb-8 leading-[0.92]" aria-label={hero?.headline}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.35 + i * STAGGER,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block text-[clamp(2.8rem,8vw,6.5rem)] font-serif mr-3 md:mr-5"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="origin-left h-px bg-border mb-8 max-w-sm"
          aria-hidden="true"
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-lg md:text-xl max-w-xl text-muted-foreground leading-relaxed mb-10 font-serif italic"
        >
          {hero?.subheadline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <Link
            href={hero?.ctaLink ?? "#work"}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-highlight hover:text-highlight-foreground transition-all duration-300"
          >
            {hero?.ctaText ?? "View My Work"}
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            Get in touch
            <ArrowDownRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground/60"
          aria-label="Location and availability"
        >
          <span>{hero?.location}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span>Web &amp; Mobile Engineer</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span>Open to remote</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/50 uppercase rotate-90 translate-y-1">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
}
