/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Share2, ArrowUp } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/nav/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
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

  const imageUrl =
    post.featuredImage ||
    (post.mainImage ? "/placeholder.svg?height=600&width=1200" : null);

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
                <Share2 className="w-4 h-4" />
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8"
        >
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
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight text-foreground"
        >
          {post.title}
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground leading-relaxed mb-12"
        >
          {post.excerpt}
        </motion.p>

        {/* Featured Image - Optional */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-16"
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-none"
        >
          <PortableText
            value={post.content}
            components={customPortableTextComponents}
          />
        </motion.div>

        {/* Tags */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-border"
        >
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
        </motion.footer>
      </article>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

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
