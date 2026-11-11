import type { Metadata } from "next";
import Link from "next/link";
import path from "node:path";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { loadGuides } from "@preshipos/content";
import { MODULES } from "@preshipos/shared";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/animations/reveal";

export const instant = false;

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides, workflows and resources to help you validate, build, prepare, launch and grow your product.",
};

const moduleLabels: Record<string, string> = {
  validate: "Validate",
  build: "Build",
  check: "Check",
  prepare: "Prepare",
  launch: "Launch",
  distribute: "Distribute",
  discover: "Discover",
  grow: "Grow",
};

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function GuidesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query =
    typeof params.q === "string" ? params.q.trim().toLowerCase() : "";
  const moduleParam =
    typeof params.module === "string" ? params.module : "";

  const selectedModule = MODULES.includes(
    moduleParam as (typeof MODULES)[number],
  )
    ? moduleParam
    : "all";

  const contentRoot = path.resolve(process.cwd(), "..", "docs");
  const guides = await loadGuides({ contentRoot });

  const filteredGuides = guides.filter((guide) => {
    const matchesModule =
      selectedModule === "all" ||
      guide.metadata.module === selectedModule;

    const searchableText = [
      guide.metadata.title,
      guide.metadata.description,
      guide.metadata.module,
      ...guide.metadata.topics,
      guide.content,
    ]
      .join(" ")
      .toLowerCase();

    return matchesModule && searchableText.includes(query);
  });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="relative isolate overflow-hidden border-b border-border bg-muted/30">
          <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[420px] rounded-full bg-primary/10 blur-[110px]" />

          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <Reveal>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  <BookOpen size={14} />
                  The maker knowledge library
                </div>

                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Learn. Build.{" "}
                  <span className="text-primary">Ship.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Practical guides and workflows for every stage of your
                  product journey, from validating your first idea to
                  growing your audience.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form
                action="/guides"
                method="GET"
                className="mt-10 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="relative min-w-0 flex-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Search guides, topics and resources..."
                    aria-label="Search guides"
                    className="h-12 w-full rounded-xl border border-transparent bg-muted/50 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary/40 focus:bg-background focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <select
                  name="module"
                  defaultValue={selectedModule}
                  aria-label="Filter by product stage"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary sm:min-w-40"
                >
                  <option value="all">All stages</option>
                  {MODULES.map((module) => (
                    <option key={module} value={module}>
                      {moduleLabels[module]}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Search
                  <ArrowRight size={16} />
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Knowledge library
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Explore guides
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {filteredGuides.length} published{" "}
                  {filteredGuides.length === 1 ? "guide" : "guides"}
                </p>
              </div>

              {(query || selectedModule !== "all") && (
                <Link
                  href="/guides"
                  className="text-sm font-semibold text-primary transition-colors hover:opacity-75"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </Reveal>

          {filteredGuides.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGuides.map((guide, index) => (
                <Reveal
                  key={guide.metadata.id}
                  delay={(index % 6) * 0.06}
                >
                  <Link
                    href={`/guides/${guide.metadata.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
                        {moduleLabels[guide.metadata.module]}
                      </span>

                      <span className="text-[11px] capitalize text-muted-foreground">
                        {guide.metadata.difficulty}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary">
                      {guide.metadata.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {guide.metadata.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {guide.metadata.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-md bg-muted px-2.5 py-1 text-[10px] text-muted-foreground"
                          >
                            {topic.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        {guide.metadata.estimated_minutes
                          ? `${guide.metadata.estimated_minutes} min read`
                          : "Guide"}
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-20 text-center">
                <BookOpen
                  size={30}
                  className="mx-auto text-muted-foreground"
                />

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  No guides found
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try another search term or choose a different stage.
                </p>

                <Link
                  href="/guides"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-75"
                >
                  View all guides
                  <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
