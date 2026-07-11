"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "2+", label: "Years building" },
  { value: "5+", label: "Apps shipped" },
  { value: "iOS & Android", label: "Deployed natively" },
  { value: "Full-Stack", label: "Web & Mobile" },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="At a glance"
      className="border-y border-border/30 bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-10 md:py-12 first:pl-0 last:pr-0 md:first:pl-0 md:last:pr-0"
            >
              <dt className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                {stat.label}
              </dt>
              <dd className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
