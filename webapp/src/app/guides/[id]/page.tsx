
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  ChevronRight,
  CalendarDays,
  History,
} from "lucide-react";

import { getGuideById, loadGuides } from "@preshipos/content";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/animations/reveal";
import { ShareButtons } from "@/components/share/share-buttons";
import { getGitHubContentDates } from "@/lib/content-dates";
import type { ReactNode } from "react";

export const instant = false;

type PageProps = {
  params: Promise<{ id: string }>;
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

function getContentRoot() {
  return path.resolve(process.cwd(), "..", "docs");
}

function formatCommitDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getHeadingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getHeadingText).join("");
  }

  return "";
}

function createHeadingId(
  text: string,
  counts: Map<string, number>,
) {
  const base = slugify(text);
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);

  return count === 0 ? base : `${base}-${count}`;
}

function extractHeadings(markdown: string) {
  const matches = [...markdown.matchAll(/^(#{1,3})\s+(.+)$/gm)];
  const counts = new Map<string, number>();

  return matches.flatMap((match) => {
    const level = match[1].length;
    const text = match[2]
      .replace(/\s+#+\s*$/, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .trim();

    const id = createHeadingId(text, counts);

    if (level === 1) return [];

    return [{ level, text, id }];
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const guide = await getGuideById(id, {
    contentRoot: getContentRoot(),
  });

  if (!guide) {
    return { title: "Guide not found" };
  }

  return {
    title: guide.metadata.title,
    description: guide.metadata.description,
    openGraph: {
      title: guide.metadata.title,
      description: guide.metadata.description,
      type: "article",
    },
  };
}

export default async function GuideDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [guide, guides] = await Promise.all([
    getGuideById(id, {
      contentRoot: getContentRoot(),
    }),
    loadGuides({
      contentRoot: getContentRoot(),
    }),
  ]);

  if (!guide) {
    notFound();
  }

  // Retrieve publication and last-updated dates from GitHub history.
  const repositoryRoot = path.resolve(process.cwd(), "..");

  const contentPath = path
    .relative(repositoryRoot, guide.path)
    .replace(/\\/g, "/");

  const contentDates = await getGitHubContentDates(contentPath);

  const currentIndex = guides.findIndex(
    (item) => item.metadata.id === guide.metadata.id,
  );

  const previousGuide =
    currentIndex > 0 ? guides[currentIndex - 1] : undefined;

  const nextGuide =
    currentIndex >= 0 && currentIndex < guides.length - 1
      ? guides[currentIndex + 1]
      : undefined;

  const headings = extractHeadings(guide.content);
  const headingCounts = new Map<string, number>();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <Link
                href="/"
                className="transition-colors hover:text-primary"
              >
                Home
              </Link>

              <ChevronRight size={13} />

              <Link
                href="/guides"
                className="transition-colors hover:text-primary"
              >
                Guides
              </Link>

              <ChevronRight size={13} />

              <span className="font-medium text-foreground">
                {moduleLabels[guide.metadata.module]}
              </span>
            </nav>
          </Reveal>

          <div className="mx-auto mt-10 max-w-4xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  {moduleLabels[guide.metadata.module]}
                </span>

                <span className="text-xs capitalize text-muted-foreground">
                  {guide.metadata.difficulty}
                </span>

                {guide.metadata.estimated_minutes && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 size={14} />
                    {guide.metadata.estimated_minutes} min read
                  </span>
                )}
              </div>

              <h1 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {guide.metadata.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                {guide.metadata.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {guide.metadata.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {topic.replace(/-/g, " ")}
                  </span>
                ))}
              </div>

              {/* Publication dates and sharing controls */}
              <div className="mt-8 flex flex-col gap-5 border-y border-border py-5">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                  {contentDates ? (
                    <>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={15} />
                        Published{" "}
                        {formatCommitDate(contentDates.publishedAt)}
                      </span>

                      {new Date(contentDates.updatedAt).getTime() >
                        new Date(contentDates.publishedAt).getTime() && (
                        <span className="inline-flex items-center gap-2">
                          <History size={15} />
                          Last updated{" "}
                          {formatCommitDate(contentDates.updatedAt)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={15} />
                      Publication date will appear after the guide is
                      committed and pushed to GitHub.
                    </span>
                  )}
                </div>

                <ShareButtons
                  title={guide.metadata.title}
                  description={guide.metadata.description}
                />
              </div>
            </Reveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
              <Reveal>
                <article className="min-w-0">
                  <div
                    className={[
                      "max-w-none text-[15px] leading-8 text-foreground",
                      "[&_h1]:mb-6 [&_h1]:mt-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight",
                      "[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight",
                      "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:text-lg [&_h3]:font-semibold",
                      "[&_p]:my-5 [&_p]:leading-8 [&_p]:text-muted-foreground",
                      "[&_strong]:font-semibold [&_strong]:text-foreground",
                      "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
                      "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
                      "[&_li]:pl-1 [&_li]:text-muted-foreground",
                      "[&_li::marker]:text-primary",
                      "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:bg-muted/40 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
                      "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-opacity [&_a]:hover:opacity-75",
                      "[&_hr]:my-10 [&_hr]:border-border",
                      "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/60 [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-7",
                      "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]",
                      "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
                      "[&_table]:my-7 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
                      "[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold",
                      "[&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-muted-foreground",
                    ].join(" ")}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => {
                          const text = getHeadingText(children);
                          const headingId = createHeadingId(
                            text,
                            headingCounts,
                          );

                          return (
                            <h1 id={headingId}>
                              {children}
                            </h1>
                          );
                        },

                        h2: ({ children }) => {
                          const text = getHeadingText(children);
                          const headingId = createHeadingId(
                            text,
                            headingCounts,
                          );

                          return (
                            <h2 id={headingId}>
                              {children}
                            </h2>
                          );
                        },

                        h3: ({ children }) => {
                          const text = getHeadingText(children);
                          const headingId = createHeadingId(
                            text,
                            headingCounts,
                          );

                          return (
                            <h3 id={headingId}>
                              {children}
                            </h3>
                          );
                        },
                      }}
                    >
                      {guide.content}
                    </ReactMarkdown>
                  </div>
                </article>
              </Reveal>

              <aside className="hidden lg:block">
                <div className="sticky top-28 rounded-2xl border border-border bg-card p-5">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BookOpen size={16} className="text-primary" />
                    On this page
                  </h2>

                  {headings.length > 0 ? (
                    <nav
                      aria-label="Table of contents"
                      className="mt-5 flex flex-col gap-3"
                    >
                      {headings.map((heading, index) => (
                        <a
                          key={`${heading.id}-${index}`}
                          href={`#${heading.id}`}
                          className={[
                            "text-xs leading-5 text-muted-foreground transition-colors hover:text-primary",
                            heading.level === 3
                              ? "pl-4"
                              : "font-medium",
                          ].join(" ")}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  ) : (
                    <p className="mt-4 text-xs text-muted-foreground">
                      No sections available.
                    </p>
                  )}
                </div>
              </aside>
            </div>

            <Reveal>
              <div className="mt-16 border-t border-border pt-8">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-75"
                >
                  <ArrowLeft size={16} />
                  Back to all guides
                </Link>

                {(previousGuide || nextGuide) && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {previousGuide ? (
                      <Link
                        href={`/guides/${previousGuide.metadata.id}`}
                        className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                      >
                        <span className="text-xs text-muted-foreground">
                          Previous guide
                        </span>

                        <span className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary">
                          <ArrowLeft size={15} />
                          {previousGuide.metadata.title}
                        </span>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {nextGuide && (
                      <Link
                        href={`/guides/${nextGuide.metadata.id}`}
                        className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:text-right"
                      >
                        <span className="text-xs text-muted-foreground">
                          Next guide
                        </span>

                        <span className="mt-2 flex items-center justify-end gap-2 text-sm font-semibold text-foreground group-hover:text-primary">
                          {nextGuide.metadata.title}
                          <ArrowRight size={15} />
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
