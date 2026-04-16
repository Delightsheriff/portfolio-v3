import { ScrollReveal } from "./animations/scroll-reveal";
import type { Experience } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TYPE_COLOR: Record<string, string> = {
  "Full-time": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Part-time": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  Contract: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  Freelance: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  Internship: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
};

export default function Experiences({
  experiences,
  resumeUrl,
}: {
  experiences: Experience[];
  resumeUrl?: string;
}) {
  return (
    <section
      id="experience"
      className="py-24 md:py-36 px-5 md:px-8 bg-muted/40"
      aria-label="Work experience"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Experience
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
              Professional journey
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp._id} delay={index * 0.08}>
              <div className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 py-10 md:py-12">
                {/* Left — date + meta */}
                <aside className="md:pt-1 space-y-2">
                  <p className="text-sm font-mono font-medium text-foreground">
                    {exp.period}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.type && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono border ${
                          TYPE_COLOR[exp.type] ??
                          "bg-muted text-muted-foreground"
                        }`}
                      >
                        {exp.type}
                      </span>
                    )}
                    {exp.current && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono bg-highlight/10 text-highlight border border-highlight/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" aria-hidden="true" />
                        Current
                      </span>
                    )}
                  </div>
                  {exp.location && (
                    <p className="text-xs text-muted-foreground/70 font-mono">
                      {exp.location}
                    </p>
                  )}
                </aside>

                {/* Right — content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif group-hover:text-highlight transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-base text-muted-foreground font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul
                      className="space-y-2 pt-1"
                      aria-label="Key achievements"
                    >
                      {exp.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-foreground/85"
                        >
                          <span
                            className="mt-[6px] w-1.5 h-1.5 rounded-full bg-highlight/60 flex-shrink-0 group-hover:bg-highlight transition-colors"
                            aria-hidden="true"
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech badges */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div
                      className="flex flex-wrap gap-1.5 pt-1"
                      aria-label="Technologies used"
                    >
                      {exp.technologies.map((t, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs font-mono px-2 py-0.5 text-muted-foreground border-border/50"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {index < experiences.length - 1 && (
                <Separator className="opacity-30" />
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Resume CTA */}
        {resumeUrl && (
          <ScrollReveal>
            <div className="mt-14 flex justify-start">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
                aria-label="View full resume (opens in new tab)"
              >
                View full resume
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
