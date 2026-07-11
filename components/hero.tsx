"use client";

import type { Profile } from "@/interface/sanity";
import { motion, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { SparkLink } from "./animations/spark-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_STACK = [
  "TypeScript",
  "React / Next.js",
  "Node.js",
  "React Native",
  "PostgreSQL",
  "Docker",
];

const STAGGER = 0.06;

export default function HeroSection({
  profile,
  y,
}: {
  profile: Profile;
  y: MotionValue<string>;
}) {
  const words = profile?.headline?.split(" ") ?? ["Software", "Developer"];
  const pills = profile?.stackPills && profile.stackPills.length > 0
    ? profile.stackPills
    : DEFAULT_STACK;

  return (
    <section
      className="relative min-h-svh flex flex-col justify-center px-5 md:px-8 overflow-hidden"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "25% 100%",
        }}
      />

      <motion.div
        style={{ y }}
        className="max-w-7xl mx-auto w-full pt-32 pb-20 md:pt-40 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {profile?.status ?? "Available for work"}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="text-sm md:text-base font-mono text-muted-foreground mb-4 tracking-wide"
        >
          Delight Sheriff (Amadi-Sheriff Delight)
        </motion.p>

        <h1 className="mb-6 leading-[0.92]" aria-label={profile?.headline}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * STAGGER,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block font-heading font-bold text-[clamp(2.6rem,7.5vw,6rem)] mr-3 md:mr-4 tracking-tight"
            >
              {word === words[words.length - 1] ? (
                <span className="text-highlight">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="origin-left h-px bg-border/60 mb-7 max-w-sm"
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-base md:text-lg max-w-2xl text-muted-foreground leading-relaxed mb-10"
        >
          {profile?.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.15 }}
          className="flex flex-wrap gap-2 mb-10"
          aria-label="Tech stack"
        >
          {pills.map((pill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-mono border border-border/50 text-muted-foreground bg-muted/30 hover:border-highlight/50 hover:text-foreground transition-colors"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <SparkLink
            href={profile?.ctaLink ?? "#work"}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "rounded-full px-6 py-3 text-sm",
            )}
          >
            {profile?.ctaText ?? "View My Work"}
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </SparkLink>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.55 }}
          className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground/50"
          aria-label="Location and expertise"
        >
          {profile?.location && <span>{profile.location}</span>}
          {profile?.location && (
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          )}
          <span>Full-stack &amp; Mobile</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/40 uppercase rotate-90 translate-y-1">
          Scroll
        </span>
        <div className="w-px h-10 bg-border/40" />
      </motion.div>
    </section>
  );
}
