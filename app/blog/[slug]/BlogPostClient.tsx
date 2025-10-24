/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, ArrowUp, Share } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/nav/theme-toggle";
import { customPortableTextComponents } from "@/components/blog/portable-text-components";

interface BlogPostClientProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    featuredImage?: string;
    mainImage?: any;
    content: any[];
    tags: string[];
    publishedAt: string;
    readTime: number;
    featured?: boolean;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCanShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  const imageUrl = post.featuredImage || post.mainImage;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-4">
            {canShare && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share post"
              >
                {/* <Share2 className="w-4 h-4" /> */}
                <Share className="w-4 h-4" />
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <time className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight text-foreground">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          {post.excerpt}
        </p>

        {/* Featured Image - Optional */}
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-16">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-none">
          <PortableText
            value={post.content}
            components={customPortableTextComponents}
          />
        </div>

        {/* Tags */}
        <footer className="mt-20 pt-12 border-t border-border">
          <div className="flex flex-wrap gap-3">
            {post.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </footer>
      </article>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Amadi-Sheriff Delight
          </p>
        </div>
      </footer>
    </div>
  );
}
