"use client";

import { motion } from "framer-motion";
import { CustomCursor } from "@/components/animations/custom-cursor";
import { MagneticButton } from "@/components/animations/magnetic-button";

export default function NotFound() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-serif">404</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <div>
              <MagneticButton href="/">Return Home</MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
