"use client";
import { VideoPitch } from "@/interface/sanity";
import React from "react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import { VideoPitch as Component } from "./video-pitch";

export default function Video(videoPitch: VideoPitch) {
  return (
    <>
      {/* Video Pitch Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
              <div className="col-span-12 md:col-span-5 space-y-6">
                <div className="space-y-4">
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    Personal Message
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif">
                    Let me introduce myself
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Beyond the code and technical achievements, I believe in the
                    power of human connection. Watch this brief introduction to
                    understand my approach, passion, and what drives me to
                    create exceptional digital experiences.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>{videoPitch?.duration || "1 min watch"}</span>
                    </div>
                    <div>•</div>
                    <div>Personal pitch</div>
                  </div>

                  <div className="flex gap-4">
                    <MagneticButton href="#work" variant="outline">
                      Skip to Work
                    </MagneticButton>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <Component videoData={videoPitch} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
