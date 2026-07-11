"use client";

import { motion } from "framer-motion";

export function BlogPostHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 mb-12"
    >
      {children}
    </motion.div>
  );
}

export function BlogPostBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="prose prose-invert max-w-none"
    >
      {children}
    </motion.div>
  );
}
