"use client";
import { VideoPitch } from "@/interface/sanity";
import React from "react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { VideoPitch as Component } from "./video-pitch";

export default function Video(videoPitch: VideoPitch) {
  return (
    <section className="py-24 md:py-36 px-6 md:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="col-span-12 md:col-span-5 space-y-6">
              <div className="space-y-5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Personal Message
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                  Let me introduce myself
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond the code and technical achievements, I believe in the
                  power of human connection. Watch this brief introduction to
                  understand my approach, passion, and what drives me to create
                  exceptional digital experiences.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>{videoPitch?.duration || "1 min watch"}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>Personal pitch</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <Component videoData={videoPitch} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
