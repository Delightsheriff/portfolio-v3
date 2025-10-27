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
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif">
            Welcome In
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Get comfortable. This is where I dump my thoughts on building stuff,
            learning out loud, and figuring things out as I go. You&apos;ll find
            tech discoveries, honest rants, life updates, and the occasional
            existential crisis. No filter, no perfectly polished takes, just
            real experiences from someone who&apos;s still learning every single
            day.
          </p>
        </ScrollReveal>
      </section>

      {/* Blog List */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <BlogList posts={posts} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
