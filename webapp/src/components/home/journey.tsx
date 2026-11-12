import {
  Lightbulb,
  Code2,
  ShieldCheck,
  ClipboardCheck,
  Rocket,
  Send,
  Compass,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

const stages = [
  { name: "Validate", description: "Research ideas, markets and customers.", icon: Lightbulb },
  { name: "Build", description: "Explore architecture, tools and workflows.", icon: Code2 },
  { name: "Check", description: "Review quality, security and performance.", icon: ShieldCheck },
  { name: "Prepare", description: "Get your product ready for release.", icon: ClipboardCheck },
  { name: "Launch", description: "Plan and introduce your product.", icon: Rocket },
  { name: "Distribute", description: "Reach the right audience and channels.", icon: Send },
  { name: "Discover", description: "Explore products and maker resources.", icon: Compass },
  { name: "Grow", description: "Learn, improve and grow sustainably.", icon: TrendingUp },
];

export function Journey() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 border-y border-border bg-muted/40"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The product lifecycle
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything around building a product.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              A connected journey from the first idea to sustainable growth.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <Reveal key={stage.name} delay={index * 0.07}>
                <article className="group h-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-card-foreground">
                    {stage.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {stage.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
