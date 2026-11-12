import Link from "next/link";
import { Brand } from "./brand";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Brand />
          <p className="mt-2 text-xs text-muted-foreground">
            An open ecosystem for people who build.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          <Link href="/guides" className="transition-colors hover:text-foreground">
            Guides
          </Link>
          <Link href="/#journey" className="transition-colors hover:text-foreground">
            Product journey
          </Link>
          <a
            href="https://github.com/axomiyaindie/preshipos"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>

        <p className="text-xs text-muted-foreground">
          © <CurrentYear /> PreShipOS
        </p>
      </div>
    </footer>
  );
}
