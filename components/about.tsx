import { ScrollReveal } from "./animations/scroll-reveal";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity";
import type { About } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, FileText } from "lucide-react";

export default function AboutSection({ about }: { about: About }) {
  return (
    <section id="about" className="py-24 md:py-36 px-5 md:px-8" aria-label="About me">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Photo */}
            <div className="md:col-span-4">
              <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden max-w-xs mx-auto md:mx-0">
                <Image
                  src={urlFor(about.profileImage).url() || "/placeholder.svg?height=800&width=600"}
                  alt="Amadi-Sheriff Delight — portrait"
                  fill
                  sizes="(max-width: 768px) 300px, 33vw"
                  className="object-cover"
                  priority={false}
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" aria-hidden="true" />
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-7 md:col-start-6 space-y-10">
              <div className="space-y-5">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  About
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                  {about.title || "Building with purpose."}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {(about.manifesto || []).map((block, index) => (
                    <p key={index}>
                      {block.children?.[0]?.text || ""}
                    </p>
                  ))}
                </div>
              </div>

              {/* Skills grid */}
              {about.skills && about.skills.length > 0 && (
                <div className="space-y-5">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Core Expertise
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {about.skills.map((group, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          {group.category}
                        </p>
                        <div className="flex flex-wrap gap-1.5" aria-label={`${group.category} skills`}>
                          {group.items.map((skill, j) => (
                            <Badge
                              key={j}
                              variant="secondary"
                              className="text-xs font-mono"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume CTA */}
              {about.resumeUrl && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View full resume (opens in new tab)"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    View Resume
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
