"use client";

import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BackButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  children: ReactNode;
  fallbackHref?: string;
}

export function BackButton({
  children,
  fallbackHref = "/projects",
  ...props
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  };

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
