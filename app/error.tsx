"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            Error
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground/10 select-none">
            Something broke
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground -mt-4">
            That wasn&apos;t supposed to happen. You can try again or head back home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={reset}
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full px-6 py-3 h-auto",
              )}
            >
              <RefreshCw
                className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500"
                aria-hidden="true"
              />
              Try Again
            </button>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full px-6 py-3 h-auto",
              )}
              aria-label="Return to home page"
            >
              <ArrowLeft
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
