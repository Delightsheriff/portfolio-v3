import { ScrollReveal } from "./animations/scroll-reveal";
import type { About } from "@/interface/sanity";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";

const PLATFORM_ICONS: Record<string, React.FC<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  twitter: RiTwitterXFill,
  github: Github,
  linkedin: Linkedin,
};

export default function Contact({ about }: { about: About }) {
  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-5 md:px-8 bg-muted/40"
      aria-label="Contact"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl">
            {/* Label */}
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Let's work together
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05] mb-6">
              Ready to build something
              <span className="text-highlight"> exceptional?</span>
            </h2>

            {/* Supporting copy */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
              I&apos;m seeking a full-time role where I can own meaningful product areas and ship at scale.
              If you&apos;re building something worthwhile, let&apos;s talk.
            </p>

            {/* Primary CTA */}
            <a
              href={`mailto:${about.email}?subject=Let's%20work%20together&body=Hi%20Delight%2C%0A%0A`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-highlight hover:text-highlight-foreground transition-all duration-300 text-base mb-10"
              aria-label={`Send email to ${about.email}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {about.email}
              <ArrowUpRight
                className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <Separator className="mb-10 opacity-40" />

            {/* Social + meta row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Social links */}
              {about.socialLinks && about.socialLinks.length > 0 && (
                <div className="flex items-center gap-2" aria-label="Social media profiles">
                  {about.socialLinks.map((link, i) => {
                    const Icon = PLATFORM_ICONS[link.platform] ?? Linkedin;
                    const labels: Record<string, string> = {
                      twitter: "X (Twitter)",
                      github: "GitHub",
                      linkedin: "LinkedIn",
                    };
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${labels[link.platform] ?? link.platform} profile`}
                        className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                      >
                        <Icon className="w-4 h-4" aria-hidden={true} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Response time */}
              <dl className="flex gap-6 text-sm text-muted-foreground">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                    Response
                  </dt>
                  <dd>Within 24 hours</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                    Availability
                  </dt>
                  <dd>Open to offers</dd>
                </div>
              </dl>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
