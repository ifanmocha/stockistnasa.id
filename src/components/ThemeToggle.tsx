"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-xl glass text-ink transition hover:text-brand"
      aria-label={theme === "light" ? "Aktifkan tema gelap" : "Aktifkan tema terang"}
      title={theme === "light" ? "Mode gelap" : "Mode terang"}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4 text-highlight" />
      )}
    </button>
  );
}
