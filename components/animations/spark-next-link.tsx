'use client';

import React, { useContext, ReactNode } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

interface ClickSparkContextType {
  addSpark: (x: number, y: number) => void;
}

export const ClickSparkContext = React.createContext<ClickSparkContextType | null>(null);

export function useClickSparks() {
  const context = useContext(ClickSparkContext);
  if (!context) {
    throw new Error('useClickSparks must be used within ClickSparkProvider');
  }
  return context;
}

interface SparkNextLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export function SparkNextLink({
  children,
  onClick,
  className,
  ...props
}: SparkNextLinkProps) {
  const sparkContext = useContext(ClickSparkContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (sparkContext?.addSpark) {
      sparkContext.addSpark(e.clientX, e.clientY);
    }
    onClick?.(e);
  };

  return (
    <Link onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
