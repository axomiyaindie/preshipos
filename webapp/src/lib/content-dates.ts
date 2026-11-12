export interface ContentDates {
  publishedAt: string;
  updatedAt: string;
}

interface GitHubCommit {
  commit?: {
    committer?: {
      date?: string;
    };
  };
}

const repository =
  process.env.GITHUB_REPOSITORY ?? "axomiyaindie/preshipos";

function getLastPage(linkHeader: string | null): number {
  if (!linkHeader) return 1;

  const lastLink = linkHeader
    .split(",")
    .find((link) => link.includes('rel="last"'));

  if (!lastLink) return 1;

  const url = lastLink.match(/<([^>]+)>/)?.[1];
  if (!url) return 1;

  return Number(new URL(url).searchParams.get("page") ?? 1);
}

async function fetchCommits(
  filePath: string,
  page: number,
) {
  const url = new URL(
    `https://api.github.com/repos/${repository}/commits`,
  );

  url.searchParams.set("path", filePath);
  url.searchParams.set("per_page", "100");
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  return {
    commits: (await response.json()) as GitHubCommit[],
    lastPage: getLastPage(response.headers.get("link")),
  };
}

export async function getGitHubContentDates(
  filePath: string,
): Promise<ContentDates | null> {
  try {
    const latestPage = await fetchCommits(filePath, 1);

    if (!latestPage?.commits.length) return null;

    const latest = latestPage.commits[0];

    let oldestPage = latestPage.commits;

    if (latestPage.lastPage > 1) {
      const lastPage = await fetchCommits(
        filePath,
        latestPage.lastPage,
      );

      if (!lastPage?.commits.length) return null;

      oldestPage = lastPage.commits;
    }

    const oldest = oldestPage[oldestPage.length - 1];

    const publishedAt = oldest.commit?.committer?.date;
    const updatedAt = latest.commit?.committer?.date;

    if (!publishedAt || !updatedAt) return null;

    return { publishedAt, updatedAt };
  } catch (error) {
    console.error("Unable to retrieve GitHub content dates:", error);
    return null;
  }
}
