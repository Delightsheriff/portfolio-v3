"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useContext } from "react";
import { ClickSparkContext } from "@/components/animations/spark-button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const sparkContext = useContext(ClickSparkContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sparkContext?.addSpark) {
      sparkContext.addSpark(e.clientX, e.clientY);
    }
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full text-muted-foreground"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
