"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  // Purpose-built for "has hydration happened yet" — avoids the extra
  // render pass a useState+useEffect mount-flag would trigger.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleThemeToggle}
      variant="ghost"
      size="icon"
      className="hover:bg-transparent overflow-hidden"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
