/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { Pin } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    featuredImage?: string;
    mainImage?: any;
    tags: string[];
    publishedAt: string;
    readTime: number;
    featured?: boolean;
  };
  showPinned?: boolean;
}

export function BlogCard({ post, showPinned = false }: BlogCardProps) {
  const imageUrl =
    post.featuredImage ||
    (post.mainImage ? "/placeholder.svg?height=400&width=600" : null);

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative py-12 border-b border-border last:border-0 transition-colors"
      >
        {showPinned && (
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-primary mb-4">
            <Pin className="w-3 h-3 fill-current" />
            Pinned
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Content */}
          <div
            className={`${imageUrl ? "md:col-span-8" : "md:col-span-12"} space-y-4`}
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>{post.readTime} min read</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Optional Image */}
          {imageUrl && (
            <div className="md:col-span-4">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-muted">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
