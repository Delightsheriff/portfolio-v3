'use client';

import React, { useContext, ReactNode } from 'react';

export interface ClickSparkContextType {
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

interface SparkButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
}

export function SparkButton({ children, onClick, ...props }: SparkButtonProps) {
  const { addSpark } = useClickSparks();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + rect.width / 2;
    const y = e.clientY - rect.top + rect.height / 2;
    
    addSpark(e.clientX, e.clientY);
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

interface SparkLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function SparkLink({ children, onClick, ...props }: SparkLinkProps) {
  const sparkContext = useContext(ClickSparkContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (sparkContext?.addSpark) {
      sparkContext.addSpark(e.clientX, e.clientY);
    }
    onClick?.(e);
  };

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
