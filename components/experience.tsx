import { ScrollReveal } from "./animations/scroll-reveal";
import type { Experience } from "@/interface/sanity";
import { MapPin } from "lucide-react";
import { MagneticButton } from "./animations/magnetic-button";

export default function Experiences({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section id="experience" className="py-24 md:py-36 px-6 md:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16 md:mb-24 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5 block">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
              Professional Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Building products from ideation to execution — my journey blends
              startup leadership with deep full-stack expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-[calc(25%-1px)] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {experiences.map((experience, index) => (
              <ScrollReveal key={experience._id} delay={index * 0.1}>
                <div className="relative grid grid-cols-12 gap-4 md:gap-8 group">
                  {/* Timeline column */}
                  <div className="col-span-12 md:col-span-3 md:pr-8">
                    <div className="md:sticky md:top-32 md:py-10">
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute right-0 top-10 w-3 h-3 rounded-full border-2 border-border bg-background group-hover:border-primary group-hover:bg-primary transition-colors duration-300 translate-x-[calc(50%+0.5px)]" />

                      <div className="space-y-2">
                        <div className="text-sm font-mono font-medium text-foreground">
                          {experience.period}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                          <MapPin
                            className="w-3 h-3 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{experience.location}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span>{experience.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="col-span-12 md:col-span-8 md:col-start-5 py-10 border-b border-border/50 last:border-0">
                    <div className="space-y-5 md:pl-4">
                      {/* Role + Company */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-serif group-hover:text-primary transition-colors duration-300">
                          {experience.role}
                        </h3>
                        <div className="text-base text-muted-foreground font-medium mt-1">
                          {experience.company}
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2.5">
                          {experience.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-foreground/90"
                            >
                              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0 group-hover:bg-primary transition-colors duration-300" />
                              <span className="leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {experience.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-background border border-border/60 text-xs font-mono rounded-full text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <MagneticButton href="/resume" variant="outline">
              View Full Resume
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
