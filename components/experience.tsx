import { ScrollReveal } from "./animations/scroll-reveal";
import type { Experience } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TYPE_COLOR: Record<string, string> = {
  "Full-time": "bg-green-500/10 text-green-400 border-green-500/20",
  "Part-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contract: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Freelance: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Internship: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function Experiences({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 px-5 md:px-8 bg-card/20 border-y border-border/20"
      aria-label="Work experience"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 md:mb-20">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-3">
              Experience
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
              Where I&apos;ve shipped
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp._id} delay={index * 0.07}>
              <div className="group relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-10 md:py-12">
                {/* Left: date and meta */}
                <aside className="md:pt-1 space-y-2 shrink-0">
                  <p className="text-sm font-mono font-medium text-foreground/80">
                    {exp.period}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.type && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono border ${
                          TYPE_COLOR[exp.type] ?? "bg-muted/40 text-muted-foreground"
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
                    <p className="text-xs text-muted-foreground/50 font-mono">
                      {exp.location}
                    </p>
                  )}
                </aside>

                {/* Right: content */}
                <div className="space-y-4 min-w-0">
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight group-hover:text-highlight transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-base text-muted-foreground font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2.5 pt-1" aria-label="Key achievements">
                      {exp.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-foreground/80"
                        >
                          <span
                            className="mt-[7px] w-1.5 h-1.5 rounded-full bg-highlight flex-shrink-0"
                            aria-hidden="true"
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech badges */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Technologies used">
                      {exp.technologies.map((t, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs font-mono px-2 py-0.5 text-muted-foreground border-border/30"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {index < experiences.length - 1 && (
                <Separator className="opacity-15" />
              )}
            </ScrollReveal>
          ))}
        </div>


      </div>
    </section>
  );
}
