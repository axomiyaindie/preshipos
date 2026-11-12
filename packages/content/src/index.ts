import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import guideSchema from "@preshipos/schemas/guide.schema.json" with {
  type: "json",
};

import {
  MODULES,
  type GuideMetadata,
  type GuideDocument,
  type ModuleId,
} from "@preshipos/shared";

export const CONTENT_ENGINE_VERSION = "0.2.0";

export interface LoadGuidesOptions {
  /** Absolute path to the repository's docs directory. */
  contentRoot: string;
  /** Include draft guides for authorized editorial use. */
  includeDrafts?: boolean;
  /** Include archived guides for editorial or historical use. */
  includeArchived?: boolean;
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
});

addFormats(ajv);

const validateGuide = ajv.compile<GuideMetadata>(guideSchema);

async function findMarkdownFiles(directory: string): Promise<string[]> {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findMarkdownFiles(fullPath);
      }

      if (entry.isFile() && /\.md$/i.test(entry.name)) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat().sort((a, b) => a.localeCompare(b));
}

function validateMetadata(
  metadata: unknown,
  filePath: string,
): GuideMetadata {
  if (!validateGuide(metadata)) {
    const errors = (validateGuide.errors ?? [])
      .map((error) => {
        const location = error.instancePath || "/";
        return `${location}: ${error.message ?? "Invalid value"}`;
      })
      .join("; ");

    throw new Error(`Invalid guide metadata in ${filePath}: ${errors}`);
  }

  return metadata;
}

/**
 * Load guides from the canonical docs directory.
 * Draft and archived content are excluded by default.
 */
export async function loadGuides(
  options: LoadGuidesOptions,
): Promise<GuideDocument[]> {
  const { contentRoot, includeDrafts = false, includeArchived = false } =
    options;

  if (!path.isAbsolute(contentRoot)) {
    throw new Error("contentRoot must be an absolute filesystem path.");
  }

  const allGuides: GuideDocument[] = [];
  const seenIds = new Set<string>();

  for (const moduleId of MODULES) {
    const moduleDirectory = path.join(contentRoot, moduleId, "guides");
    const files = await findMarkdownFiles(moduleDirectory);

    for (const filePath of files) {
      const source = await readFile(filePath, "utf8");
      const parsed = matter(source);
      const relativePath = path
        .relative(contentRoot, filePath)
        .split(path.sep)
        .join("/");

      const metadata = validateMetadata(parsed.data, relativePath);

      if (metadata.module !== moduleId) {
        throw new Error(
          `Module mismatch in ${relativePath}: expected "${moduleId}", received "${metadata.module}".`,
        );
      }

      if (seenIds.has(metadata.id)) {
        throw new Error(
          `Duplicate guide ID "${metadata.id}" found in ${relativePath}.`,
        );
      }

      seenIds.add(metadata.id);

      if (metadata.status === "draft" && !includeDrafts) {
        continue;
      }

      if (metadata.status === "archived" && !includeArchived) {
        continue;
      }

      allGuides.push({
        metadata,
        content: parsed.content.trim(),
        path: relativePath,
      });
    }
  }

  return allGuides.sort((a, b) =>
    a.metadata.title.localeCompare(b.metadata.title),
  );
}

/** Find a guide by its stable content ID. */
export async function getGuideById(
  id: string,
  options: LoadGuidesOptions,
): Promise<GuideDocument | undefined> {
  const guides = await loadGuides(options);
  return guides.find((guide) => guide.metadata.id === id);
}

/** Search published guides by title, description, topics and body text. */
export async function searchGuides(
  query: string,
  options: LoadGuidesOptions,
): Promise<GuideDocument[]> {
  const guides = await loadGuides(options);
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return guides;
  }

  return guides.filter((guide) => {
    const searchableText = [
      guide.metadata.title,
      guide.metadata.description,
      ...guide.metadata.topics,
      guide.content,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export type { GuideDocument, GuideMetadata, ModuleId };