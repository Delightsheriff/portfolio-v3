"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PenTool } from "lucide-react";
import GoBack from "./go-back";
import Footer from "./nav/footer";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  author?: string;
}

export function BlogPage({ posts }: { posts: BlogPost[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Show empty state if no posts
  if (!posts || posts.length === 0) {
    return (
      <>
        <GoBack />
        <main className="min-h-screen bg-background flex flex-col">
          <div className="flex-1 max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12 text-center"
            >
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <PenTool className="w-16 h-16 text-highlight opacity-60" />
                  </motion.div>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  Blog Coming Soon
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  I&apos;m working on sharing insights about software engineering,
                  React, Node.js, React Native, and building production systems.
                  Check back soon for deep dives and technical stories.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-8"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-highlight hover:text-highlight-foreground transition-all duration-300 animate-glow-pulse"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Footer />
          </motion.div>
        </main>
      </>
    );
  }

  // Blog posts list (when posts exist)
  return (
    <>
      <GoBack />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Thoughts on software engineering, architecture, and building at scale.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {posts.map((post) => (
              <motion.article
                key={post._id}
                variants={itemVariants}
                className="group border border-border rounded-lg p-6 hover:border-highlight hover:bg-muted/30 transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="space-y-2">
                    {post.featured && (
                      <span className="inline-block text-xs font-mono uppercase tracking-widest text-highlight mb-2">
                        Featured
                      </span>
                    )}
                    <h2 className="text-2xl font-heading font-bold text-foreground group-hover:text-highlight transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <time className="text-sm text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-highlight group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}
