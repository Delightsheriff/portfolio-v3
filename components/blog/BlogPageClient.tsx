/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogList } from "./blog-list";
import { ThemeToggle } from "../nav/theme-toggle";
import Footer from "../nav/footer";
import { ScrollReveal } from "../animations/scroll-reveal";

interface BlogPageClientProps {
  posts: any[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-lg font-mono font-semibold tracking-wider text-foreground hover:text-primary transition-colors"
            >
              DS.
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pt-20 pb-16">
        <ScrollReveal>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5 block">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
            Welcome In
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Get comfortable. This is where I dump my thoughts on building stuff,
            learning out loud, and figuring things out as I go. You&apos;ll find
            tech discoveries, honest rants, life updates, and the occasional
            existential crisis.
          </p>
        </ScrollReveal>
      </section>

      {/* Blog List */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-20">
        <BlogList posts={posts} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
