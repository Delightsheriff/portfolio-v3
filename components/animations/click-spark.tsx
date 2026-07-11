'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
}

export function useClickSpark() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdRef = useRef(0);

  const addSpark = useCallback((x: number, y: number) => {
    const sparkCount = 8;
    const newSparks: Spark[] = [];

    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2;
      const velocity = 4 + Math.random() * 4;

      newSparks.push({
        id: sparkIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        angle,
      });
    }

    setSparks((prev) => [...prev, ...newSparks]);

    // Auto-remove sparks after animation
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.find((ns) => ns.id === s.id)));
    }, 600);
  }, []);

  return { sparks, addSpark };
}

interface SparkParticleProps {
  spark: Spark;
}

function SparkParticle({ spark }: SparkParticleProps) {
  return (
    <motion.div
      key={spark.id}
      initial={{ x: spark.x, y: spark.y, opacity: 1, scale: 1 }}
      animate={{
        x: spark.x + spark.vx * 30,
        y: spark.y + spark.vy * 30,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pointer-events-none fixed w-1.5 h-1.5 rounded-full bg-highlight"
      style={{
        left: 0,
        top: 0,
        filter: 'blur(0.5px)',
      }}
    />
  );
}

interface ClickSparkContainerProps {
  sparks: Spark[];
}

export function ClickSparkContainer({ sparks }: ClickSparkContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {sparks.map((spark) => (
        <SparkParticle key={spark.id} spark={spark} />
      ))}
    </div>
  );
}
