"use client";

import { VideoPitch } from "@/interface/sanity";
import { ScrollReveal } from "./animations/scroll-reveal";
import { VideoPitch as VideoPitchComponent } from "./video-pitch";
import { Separator } from "@/components/ui/separator";

export default function Video(videoPitch: VideoPitch) {
  return (
    <section
      className="py-24 md:py-32 px-5 md:px-8"
      aria-label="Personal introduction video"
    >
      <div className="max-w-7xl mx-auto">
        <Separator className="mb-16 opacity-40" />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left — copy */}
            <div className="md:col-span-5 space-y-5 md:pt-2">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                Personal Message
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-serif leading-tight">
                {videoPitch?.title ?? "Let me introduce myself"}
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Beyond the code and technical achievements, I believe in the
                power of human connection. Watch this brief introduction to
                understand my approach, passion, and what drives me to build
                exceptional products.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span>{videoPitch?.duration ?? "1–2 min watch"}</span>
              </div>
            </div>

            {/* Right — video */}
            <div className="md:col-span-7">
              <VideoPitchComponent videoData={videoPitch} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
