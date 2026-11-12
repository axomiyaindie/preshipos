export const MODULES = [
  "validate",
  "build",
  "check",
  "prepare",
  "launch",
  "distribute",
  "discover",
  "grow",
] as const;

export type ModuleId = (typeof MODULES)[number];

export type ContentStatus = "draft" | "published" | "archived";

export type GuideContentType =
  | "guide"
  | "tutorial"
  | "reference"
  | "workflow";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface GuideMetadata {
  id: string;
  title: string;
  description: string;
  module: ModuleId;
  content_type: GuideContentType;
  status: ContentStatus;
  difficulty: Difficulty;
  topics: string[];
  last_reviewed?: string | null;
  estimated_minutes?: number;
}

export interface GuideDocument {
  metadata: GuideMetadata;
  content: string;
  path: string;
}