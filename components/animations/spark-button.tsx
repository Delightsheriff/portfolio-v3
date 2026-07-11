import React, { ReactNode, createContext } from 'react';

export interface ClickSparkContextType {
  addSpark: (x: number, y: number) => void;
}

export const ClickSparkContext = createContext<ClickSparkContextType | null>(null);

interface SparkLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function SparkLink({ children, ...props }: SparkLinkProps) {
  return <a {...props}>{children}</a>;
}
