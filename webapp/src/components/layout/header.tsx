"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { Brand } from "./brand";

const navigation = [
  { label: "Journey", href: "/#journey" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/#about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div onClick={closeMenu}>
          <Brand />
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                : "Change colour theme"
            }
            title="Toggle colour theme"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {mounted && theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <Link
            href="/guides"
            className="hidden h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Explore guides
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 pb-5 pt-3 shadow-lg md:hidden"
        >
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/guides"
              onClick={closeMenu}
              className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Explore guides
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
