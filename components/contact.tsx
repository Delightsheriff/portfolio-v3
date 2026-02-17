import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import type { About } from "@/interface/sanity";
import { Linkedin, Github } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";

export default function Contact({ about }: { about: About }) {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-8">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Let&apos;s create something exceptional together.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                I&apos;m currently seeking a full-time role with a
                forward-thinking team where I can take on significant ownership
                and contribute to building impactful, user-centric products. If
                you&apos;re building the future, I&apos;d love to discuss how I
                can help.
              </p>

              {/* CTA + Social */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-2">
                <MagneticButton
                  href={`mailto:${about.email}?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,`}
                >
                  Get In Touch
                </MagneticButton>

                <div className="flex gap-3 items-center">
                  {about.socialLinks.map((link, index) => {
                    if (link.platform === "twitter") {
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Follow on X (Twitter)"
                          className="p-3 border border-border rounded-full hover:border-foreground hover:text-foreground transition-colors"
                        >
                          <RiTwitterXFill
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        </a>
                      );
                    }

                    let Icon = Linkedin;
                    if (link.platform === "github") Icon = Github;

                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow on ${link.platform === "github" ? "GitHub" : "LinkedIn"}`}
                        className="p-3 border border-border rounded-full hover:border-foreground hover:text-foreground transition-colors"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Contact Details */}
              <div className="pt-10 border-t border-border">
                <div className="flex flex-col md:flex-row justify-center gap-8 text-sm text-muted-foreground">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Email
                    </div>
                    <a
                      href={`mailto:${about.email}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {about.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Response Time
                    </div>
                    <div>Usually within 24 hours</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                      Availability
                    </div>
                    <div>Open to new opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
