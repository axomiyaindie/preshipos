import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Open by design
            </p>

            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Knowledge that stays open.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              The PreShipOS repository is the canonical source for guides,
              checklists and resources. The website makes that knowledge
              easier to explore and use.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/guides"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3"
          >
            Browse the knowledge library
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
