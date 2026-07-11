import React, { ReactNode } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

interface SparkNextLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export function SparkNextLink({ children, ...props }: SparkNextLinkProps) {
  return <Link {...props}>{children}</Link>;
}
