# PreShipOS — Repository Structure

This document explains how the PreShipOS repository is organized, where its main project areas live, and where contributors should look when working on different parts of the ecosystem.

PreShipOS is organized as a monorepo: documentation, application code, shared packages, project data, and assets live together in one repository.

## 1. Repository Overview

```text
preshipos/
│
├── .github/                 # GitHub workflows and repository configuration
├── assets/                  # Project assets and visual resources
├── data/                    # Project data
│
├── docs/                    # Product knowledge and maker journey documentation
│   ├── validate/            # Idea validation
│   ├── build/               # Product building
│   ├── check/               # Quality and readiness checks
│   ├── prepare/             # Launch preparation
│   ├── launch/              # Product launch
│   ├── distribute/          # Distribution and promotion
│   ├── discover/            # Discovery and visibility
│   ├── grow/                # Growth and improvement
│   │
│   ├── ARCHITECTURE.md
│   ├── CONTENT-STANDARDS.md
│   ├── DEVELOPMENT.md
│   ├── FEATURES.md
│   ├── GETTING-STARTED.md
│   └── PLATFORM-DIRECTORY.md
│
├── packages/                # Shared and reusable workspace packages
│   ├── content/
│   ├── database/
│   ├── schemas/
│   └── shared/
│
├── webapp/                  # PreShipOS web application
│   └── src/
│       ├── app/             # Application routes and layouts
│       ├── components/      # Reusable UI components
│       ├── config/          # Application configuration
│       ├── features/        # Feature-specific application code
│       ├── hooks/           # Reusable React hooks
│       ├── lib/             # Utilities and supporting libraries
│       └── types/           # TypeScript types
│
├── .env.example             # Example environment configuration
├── .gitignore               # Git ignore rules
├── CHANGELOG.md             # Project change history
├── CODE_OF_CONDUCT.md       # Community participation standards
├── CONTRIBUTING.md          # Contribution guidelines
├── docker-compose.yml       # Local service orchestration
├── package.json             # Root workspace scripts and metadata
├── pnpm-lock.yaml           # Dependency lockfile
├── pnpm-workspace.yaml      # pnpm workspace configuration
├── README.md                # Project introduction
├── ROADMAP.md               # Project direction and planned work
├── SECURITY.md              # Security reporting guidelines
├── STRUCTURE.md             # This document
└── SUPPORT.md               # Help and support information
```

> This is a high-level map of the repository. Individual directories may contain additional nested files and folders.

## 2. Understanding the Main Areas

### `docs/` — Knowledge and Documentation

The documentation follows the journey of turning an idea into a product and growing it.

| Directory | Purpose |
|---|---|
| `validate/` | Research, evaluate, and validate ideas |
| `build/` | Plan and build products |
| `check/` | Review quality, functionality, and readiness |
| `prepare/` | Prepare products and launch materials |
| `launch/` | Plan and execute launches |
| `distribute/` | Reach audiences and distribute products |
| `discover/` | Improve discovery and visibility |
| `grow/` | Learn, improve, and grow products |

The documentation root also contains architecture, development, content standards, feature information, getting-started instructions, and platform references.

### `webapp/` — Application

The web application is the interactive product experience of PreShipOS.

Its source code is organized by responsibility:

- `app/` — Routes, layouts, and application entry points.
- `components/` — Reusable interface components.
- `config/` — Configuration and application settings.
- `features/` — Product features and their implementation.
- `hooks/` — Reusable React hooks.
- `lib/` — Shared utilities and supporting logic.
- `types/` — TypeScript type definitions.

### `packages/` — Shared Workspace Packages

The packages directory contains reusable code separated into focused areas:

- `content/` — Content-related functionality.
- `database/` — Database-related functionality.
- `schemas/` — Shared schemas and validation definitions.
- `shared/` — Common utilities and shared functionality.

### `assets/` — Project Assets

Contains visual and other static resources used by the project.

### `data/` — Project Data

Contains project data resources. Check the relevant documentation before changing data structures or formats.

### `.github/` — GitHub Configuration

Contains repository-level GitHub configuration, such as workflows and community-related files.

## 3. Where Should You Contribute?

| If you want to... | Start here |
|---|---|
| Write or improve a guide | `docs/` |
| Improve documentation standards | `docs/CONTENT-STANDARDS.md` |
| Understand the architecture | `docs/ARCHITECTURE.md` |
| Work on the web application | `webapp/` |
| Build a user-facing feature | `webapp/src/features/` |
| Improve reusable UI | `webapp/src/components/` |
| Work on database functionality | `packages/database/` |
| Improve shared schemas | `packages/schemas/` |
| Work on shared utilities | `packages/shared/` |
| Improve content functionality | `packages/content/` |
| Understand local development | `docs/DEVELOPMENT.md` |
| Learn how to contribute | `CONTRIBUTING.md` |

## 4. Monorepo Development

PreShipOS uses pnpm workspaces to manage the root project, web application, and shared packages.

Before making changes:

1. Read `docs/GETTING-STARTED.md`.
2. Review `docs/DEVELOPMENT.md`.
3. Identify the correct application or package.
4. Follow the existing conventions.
5. Run the relevant checks before submitting changes.

Install dependencies from the repository root:

```bash
pnpm install
```

Start the web application:

```bash
pnpm --filter webapp dev
```

Run the web application's TypeScript check:

```bash
pnpm --filter webapp exec tsc --noEmit
```

Refer to the relevant package's `package.json` for its available scripts.

## 5. Environment and Local Services

- `.env.example` provides the template for environment configuration.
- `.env` contains local environment values and must never be committed.
- `docker-compose.yml` defines local services used during development.
- `.gitignore` identifies files and directories that should remain outside version control.

Never publish credentials, API keys, passwords, database connection strings, or other secrets.

## 6. Important Project Documents

| Document | What it explains |
|---|---|
| `README.md` | What PreShipOS is |
| `CONTRIBUTING.md` | How to contribute |
| `STRUCTURE.md` | How the repository is organized |
| `ROADMAP.md` | Project direction and planned improvements |
| `CHANGELOG.md` | Changes across project versions |
| `SECURITY.md` | How to report security issues |
| `SUPPORT.md` | Where to get help |
| `CODE_OF_CONDUCT.md` | Community expectations |

## 7. Keeping This Document Updated

The repository structure will evolve as PreShipOS grows.

When adding, removing, or reorganizing major directories:

1. Update this document.
2. Keep the descriptions aligned with the actual implementation.
3. Update relevant links in `README.md` and `CONTRIBUTING.md`.
4. Avoid documenting planned functionality as if it already exists.

---

**PreShipOS — Build. Launch. Grow.**

An open-source ecosystem for people who turn ideas into products.