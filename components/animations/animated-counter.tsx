"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  label,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract just the number from value (e.g., "40%" -> "40")
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    // Extract suffix (e.g., "%", "K", "M")
    const suffix = value.replace(/[0-9]/g, "");

    let current = 0;
    const increment = Math.ceil(numericValue / 50);
    const duration = 1000; // ms
    const steps = duration / 16; // ~60fps
    const stepIncrement = numericValue / steps;

    const interval = setInterval(() => {
      current += stepIncrement;
      if (current >= numericValue) {
        setDisplayValue(numericValue + suffix);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current) + suffix);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <div ref={ref} className={`space-y-1 ${className}`}>
      <div className="text-3xl md:text-4xl font-heading font-bold text-highlight">
        {displayValue}
      </div>
      <p className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
