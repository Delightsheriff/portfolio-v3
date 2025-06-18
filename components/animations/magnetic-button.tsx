"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "default" | "light" | "outline";
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  href,
  variant = "default",
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses =
    "inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-colors duration-200";
  const variantClasses = {
    default: "bg-[#FF471A] text-white hover:bg-[#e63d17]",
    light: "bg-[#FDFBF6] text-[#111111] hover:bg-gray-100",
    outline:
      "border-2 border-[#FF471A] text-[#FF471A] hover:bg-[#FF471A] hover:text-white",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
