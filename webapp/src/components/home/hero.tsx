import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[480px] rounded-full bg-primary/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[380px] rounded-full bg-accent blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-36">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            The open ecosystem for makers
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            From your first idea to your next big thing.
          </h1>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Validate, build, prepare, launch and grow your digital products
            with practical guides, resources and tools in one open ecosystem.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/guides"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
            >
              Explore the guides <ArrowRight size={16} />
            </Link>

            <Link
              href="#journey"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-card-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent"
            >
              Explore the journey
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <p className="mt-6 text-xs text-muted-foreground">
            Open knowledge. No account required to explore.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
