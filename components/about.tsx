import { ScrollReveal } from "./animations/scroll-reveal";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity";
import type { Profile } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, FileText } from "lucide-react";
import { BlogContent } from "./blog-content";

export default function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="py-20 md:py-28 px-5 md:px-8" aria-label="About me">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

            {/* Photo */}
            <div className="md:col-span-4">
              <div className="relative aspect-3/4 bg-card/60 rounded-2xl overflow-hidden max-w-xs mx-auto md:mx-0 border border-border/30">
                {profile.profileImage ? (
                  <Image
                    src={urlFor(profile.profileImage).url()}
                    alt="Amadi-Sheriff Delight portrait"
                    fill
                    sizes="(max-width: 768px) 300px, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted/40" />
                )}
                {/* Overlay at bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" aria-hidden="true" />
              </div>

              {/* Quick-facts below photo on desktop */}
              <div className="mt-5 space-y-2.5 hidden md:block">
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" aria-hidden="true" />
                  Open to remote roles
                </div>
                <div className="text-sm text-muted-foreground font-mono">
                  Nigeria (Port Harcourt)
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-7 md:col-start-6 space-y-9">
              <div className="space-y-5">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
                  About
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
                  {profile.title || "Building with purpose."}
                </h2>
                <div className="text-muted-foreground leading-relaxed">
                  {profile.manifesto && profile.manifesto.length > 0 ? (
                    <BlogContent content={profile.manifesto} />
                  ) : null}
                </div>
              </div>

              {/* Skills grid */}
              {profile.skills && profile.skills.length > 0 && (
                <div className="space-y-5">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
                    Core Expertise
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {profile.skills.map((group, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm font-heading font-semibold text-foreground/90">
                          {group.category}
                        </p>
                        <div className="flex flex-wrap gap-1.5" aria-label={`${group.category} skills`}>
                          {group.items.map((skill, j) => (
                            <Badge
                              key={j}
                              variant="outline"
                              className="text-xs font-mono text-muted-foreground border-border/40"
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

              {/* Resume CTA + mobile quick facts */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View full resume (opens in new tab)"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full px-5 py-2.5",
                    )}
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    View Resume
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}

                {/* Mobile availability */}
                <div className="flex items-center gap-2 md:hidden text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" aria-hidden="true" />
                  Open to remote roles
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
