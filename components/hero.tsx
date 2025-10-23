"use client";

import type { Hero } from "@/interface/sanity";
import { motion, type MotionValue } from "framer-motion";
import { MagneticButton } from "./animations/magnetic-button";

export default function HeroSection({
  hero,
  y,
}: {
  hero: Hero;
  y: MotionValue<string>;
}) {
  // Split the headline into words
  const headlineWords = hero?.headline?.split(" ") || [];

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-8 mt-28">
        <motion.div
          style={{ y }}
          className="max-w-7xl mx-auto grid grid-cols-12 gap-4 md:gap-8 w-full"
        >
          <div className="col-span-12 md:col-span-8 md:col-start-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                {headlineWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block text-4xl md:text-6xl lg:text-7xl font-serif leading-[0.9] mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed"
              >
                {hero?.subheadline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <MagneticButton href={hero?.ctaLink || "#work"}>
                  {hero?.ctaText || "View My Work"}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end space-y-4 mt-12 md:mt-0"
          >
            <div className="text-xs font-mono text-muted-foreground space-y-2">
              <div>{hero?.status}</div>
              <div>{hero?.location}</div>
              <div>Open to remote opportunities</div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
