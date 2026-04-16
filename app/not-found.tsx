"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Error 404
          </p>
          <h1 className="text-7xl md:text-9xl font-serif text-foreground/10 select-none">
            404
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground -mt-4">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
            aria-label="Return to home page"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
