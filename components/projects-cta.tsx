"use client";

import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Profile } from "@/interface/sanity";

interface ProjectsCtaProps {
  profile: Profile;
}

export function ProjectsCta({ profile }: ProjectsCtaProps) {
  return (
    <section className="py-20 px-5 md:px-8 bg-muted/40" aria-label="Contact CTA">
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-serif">
            Interested in working together?
          </h2>
          <p className="text-muted-foreground">
            I&apos;m open to full-time roles and select freelance projects.
          </p>
          <a
            href={`mailto:${profile.email}?subject=Let's%20work%20together`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full px-7 py-3 h-auto",
            )}
            aria-label="Send an email to start a conversation"
          >
            Send a message
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
