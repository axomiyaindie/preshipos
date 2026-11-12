# Contributing to PreShipOS

First of all, thank you for your interest in contributing to **PreShipOS**!

PreShipOS is an open-source ecosystem designed to help independent makers navigate the journey from idea to product — validating, building, checking, preparing, launching, distributing, discovering, and growing.

Our goal is to build something useful together: a practical, accessible, and community-driven resource for people who want to create and ship products.

Whether you're a developer, writer, researcher, designer, student, founder, or indie maker, there is a place for you here.

You don't need to be an expert. Thoughtful contributions of every size are welcome.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Before You Start](#before-you-start)
- [Repository Overview](#repository-overview)
- [Understanding the Project Structure](#understanding-the-project-structure)
- [Development Setup](#development-setup)
- [Working on Documentation](#working-on-documentation)
- [Working on the Web Application](#working-on-the-web-application)
- [Contribution Workflow](#contribution-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Content and Code Standards](#content-and-code-standards)
- [Reporting Bugs and Suggesting Features](#reporting-bugs-and-suggesting-features)
- [Community Guidelines](#community-guidelines)
- [Need Help?](#need-help)

---

## Ways to Contribute

There are many ways to make PreShipOS better.

### 1. Documentation and Guides

Help makers learn by contributing useful, practical knowledge.

You can:

- Write new product-building guides.
- Improve existing documentation.
- Explain complicated topics in simpler language.
- Add practical examples and checklists.
- Correct outdated or inaccurate information.
- Improve navigation and documentation structure.

### 2. Research and Resources

Help makers discover useful resources.

You can:

- Research useful platforms and services.
- Contribute tools and resources.
- Document useful workflows.
- Share comparisons and practical recommendations.
- Improve existing resource collections.

Please prioritize accuracy, relevance, and usefulness over simply adding more links.

### 3. Web Application Development

Help improve the PreShipOS web experience.

You can:

- Develop new features.
- Improve existing interfaces.
- Fix bugs.
- Improve responsive layouts.
- Enhance accessibility.
- Improve performance and SEO.
- Improve reusable components and shared packages.

### 4. Design and User Experience

Help make the ecosystem easier and more enjoyable to use.

You can:

- Improve user flows.
- Suggest interface improvements.
- Contribute icons and visual assets.
- Improve accessibility and usability.
- Review mobile and desktop experiences.

### 5. Ideas and Feedback

Not every contribution requires code.

You can:

- Suggest improvements.
- Identify missing documentation.
- Share problems you encounter as a maker.
- Propose new workflows.
- Review proposed features.
- Participate in discussions.

---

## Before You Start

Before making changes:

1. Explore the existing repository.
2. Read the relevant documentation.
3. Search existing issues and pull requests.
4. Check whether someone is already working on the same improvement.
5. Open an issue or discussion if the proposed change is substantial.

For small documentation corrections, a focused pull request is usually enough.

For significant changes, discuss the approach before investing time in implementation.

---

## Repository Overview

PreShipOS is organized as a monorepo.

The repository brings together the knowledge base, web application, shared packages, project assets, and supporting configuration.

```text
preshipos/
│
├── .github/
│   └── GitHub workflows and repository configuration
│
├── assets/
│   └── Project-level assets and branding
│
├── data/
│   └── Supporting project data
│
├── docs/
│   └── Documentation and maker knowledge base
│
├── packages/
│   └── Shared packages and reusable functionality
│
├── webapp/
│   └── PreShipOS web application
│
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── README.md
├── ROADMAP.md
├── SECURITY.md
└── SUPPORT.md
```

This is a conceptual overview. Consult the actual directories and their contents before adding or relocating files.

## Understanding the Project Structure

### `.github/`

Contains GitHub-specific project configuration.

Depending on the project setup, this may include:

- GitHub Actions workflows.
- Issue templates.
- Pull request templates.
- Repository automation.
- Contribution-related configuration.

Changes here should improve project collaboration, quality checks, and repository maintenance.

### `assets/`

Contains project-level assets that are not specific to a particular application route.

Examples include:

- Logos and branding.
- Documentation images.
- Diagrams.
- Shared visual resources.

Keep assets organized and use descriptive filenames.

Application-specific assets should generally remain within the relevant application.

### `data/`

Contains supporting data used by the project.

Before introducing new data files, consider:

- Whether the data is public.
- Whether it contains sensitive information.
- Whether it should be generated rather than committed.
- Whether its format and purpose are documented.

Never commit credentials, private user information, or production database exports.

### `docs/`

The central knowledge base of PreShipOS.

Documentation is organized around the eight stages of the maker journey:

| Directory | Purpose |
|---|---|
| `docs/validate/` | Idea validation and user research. |
| `docs/build/` | Product planning and development. |
| `docs/check/` | Quality, usability, and readiness. |
| `docs/prepare/` | Product and launch preparation. |
| `docs/launch/` | Product launches. |
| `docs/distribute/` | Distribution and audience reach. |
| `docs/discover/` | Search and product discovery. |
| `docs/grow/` | Product improvement and growth. |

The documentation root also contains project-level guidance such as:

- `ARCHITECTURE.md`
- `CONTENT-STANDARDS.md`
- `DEVELOPMENT.md`
- `FEATURES.md`
- `GETTING-STARTED.md`
- `PLATFORM-DIRECTORY.md`

A guide should live in the stage most relevant to its primary subject.

For example:

```text
docs/
└── validate/
    └── guides/
        └── idea-validation.md
```

### `packages/`

Contains shared packages used across the project.

Shared functionality should live here when it is genuinely reusable across multiple parts of the ecosystem.

Avoid introducing unnecessary packages for functionality that belongs inside a single application.

### `webapp/`

Contains the PreShipOS web application.

Its main areas include:

```text
webapp/
├── public/
│   └── Static assets
│
├── src/
│   ├── app/
│   │   └── Application routes and pages
│   │
│   ├── components/
│   │   └── Reusable interface components
│   │
│   └── lib/
│       └── Shared utilities and application logic
│
├── package.json
└── Configuration files
```

Use these general conventions:

- `src/app/` — Routes, layouts, loading states, and route-level metadata.
- `src/components/` — Reusable interface components, organized by feature.
- `src/lib/` — Shared utilities and application logic.
- `public/` — Static files served by the web application.

When adding a new feature, keep its components organized and reusable.

Avoid putting substantial application logic directly into page files when it belongs in a dedicated component or utility.

### Root-level project files

| File | Purpose |
|---|---|
| `README.md` | Project introduction and entry point. |
| `CONTRIBUTING.md` | Contribution instructions. |
| `CHANGELOG.md` | Record of notable changes. |
| `ROADMAP.md` | Project direction and priorities. |
| `CODE_OF_CONDUCT.md` | Community expectations. |
| `SECURITY.md` | Security vulnerability reporting. |
| `SUPPORT.md` | Help and support information. |
| `.env.example` | Example environment configuration. |
| `.gitignore` | Files and directories excluded from Git. |

---

## Development Setup

The web application uses a Node.js and pnpm-based development environment.

### Prerequisites

Before starting, install:

- Git.
- Node.js compatible with the project configuration.
- pnpm.
- A code editor such as Visual Studio Code.

If the project requires a local database or other services, follow the instructions in `docs/DEVELOPMENT.md`.

### 1. Fork the repository

Create your own fork:

https://github.com/axomiyaindie/preshipos/fork

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/preshipos.git
cd preshipos
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Add the upstream repository

```bash
git remote add upstream https://github.com/axomiyaindie/preshipos.git
```

### 4. Install dependencies

Follow the workspace instructions in the repository's package configuration.

For a pnpm workspace:

```bash
pnpm install
```

### 5. Configure environment variables

Use the example environment file as a reference.

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Fill in the values required by your local development environment.

Never commit `.env` files, API keys, passwords, or other secrets.

### 6. Start development

From the repository root:

```bash
pnpm --filter webapp dev
```

Open the local URL printed in your terminal.

### 7. Verify your changes

Before submitting application changes, run the relevant checks.

For the web application:

```bash
pnpm --filter webapp exec tsc --noEmit
```

Run the available lint, test, and build commands specified in the web application's `package.json` and project documentation.

Do not assume a test command exists without checking the scripts first.

---

## Working on Documentation

Documentation is one of the most important parts of PreShipOS.

We want guides that are useful to someone trying to solve a real problem.

### Writing a new guide

1. Identify the relevant maker journey stage.
2. Check whether a similar guide already exists.
3. Read `docs/CONTENT-STANDARDS.md`.
4. Create the guide in the appropriate documentation directory.
5. Write clear, actionable content.
6. Verify links, examples, and references.
7. Submit a pull request.

### Documentation principles

Good documentation should be:

- Clear and understandable.
- Practical and actionable.
- Accurate and appropriately sourced.
