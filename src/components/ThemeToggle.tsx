"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Vérifier le thème actuel
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Appliquer le thème
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-200 dark:bg-slate-700
                 text-slate-800 dark:text-slate-200
                 hover:bg-slate-300 dark:hover:bg-slate-600
                 transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
