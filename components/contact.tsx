import { ScrollReveal } from "./animations/scroll-reveal";
import type { Profile } from "@/interface/sanity";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLATFORM_ICONS: Record<string, React.FC<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  twitter: RiTwitterXFill,
  github: Github,
  linkedin: Linkedin,
};

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-5 md:px-8"
      aria-label="Contact"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl">
            {/* Label */}
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-6">
              Get in touch
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.0] tracking-tight mb-6">
              {"Let's build something"}
              <br />
              <span className="text-highlight">{"that ships."}</span>
            </h2>

            {/* Supporting copy */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-10">
              I&apos;m looking for a full-time role where I can own meaningful product areas and ship at scale across web and mobile. If you&apos;re building something worthwhile, I&apos;d like to hear about it.
            </p>

            {/* Primary CTA */}
            <a
              href={`mailto:${profile.email}?subject=Let's%20work%20together`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full px-8 py-4 text-base mb-10 h-auto",
              )}
              aria-label={`Send email to ${profile.email}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {profile.email}
              <ArrowUpRight
                className="w-4 h-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <Separator className="mb-10 opacity-15" />

            {/* Social + meta row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Social links */}
              {profile.socialLinks && profile.socialLinks.length > 0 && (
                <div className="flex items-center gap-2" aria-label="Social media profiles">
                  {profile.socialLinks.map((link, i) => {
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
                        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
                      >
                        <Icon className="w-4 h-4" aria-hidden={true} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Response + availability */}
              <dl className="flex gap-6 text-sm text-muted-foreground">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-0.5">
                    Response
                  </dt>
                  <dd>Within 24 hours</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-0.5">
                    Availability
                  </dt>
                  <dd className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    Open to roles
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
