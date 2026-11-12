# PreShipOS Content Standards

PreShipOS maintains one canonical source of knowledge for its GitHub
repository and web application.

The repository is the source of truth. The web application consumes
and presents this content through searchable, interactive experiences.

## 1. Content types

| Content | Canonical format |
|---|---|
| Guides and tutorials | Markdown with YAML frontmatter |
| Workflows | Markdown |
| Checklists | JSON |
| Launch platforms | JSON |
| Directories | JSON |
| Communities | JSON |
| Tools and resources | JSON |
| Content definitions | JSON Schema |
| Shared content utilities | TypeScript |

## 2. Module structure

Every knowledge module belongs to one of these areas:

- validate
- build
- check
- prepare
- launch
- distribute
- discover
- grow

Use the appropriate module directory. Do not duplicate content
across modules. Link to the canonical guide instead.

## 3. Guide format

Every published guide should have:

- A unique ID.
- A descriptive title.
- A short description.
- Its module.
- Relevant topics.
- Difficulty level.
- Publication status.
- Last reviewed date.
- Useful references where applicable.

Example:

---
id: validate-idea-validation
title: How to Validate a Product Idea
description: A practical framework for evaluating demand before building.
module: validate
content_type: guide
status: draft
difficulty: beginner
topics:
  - idea-validation
  - market-research
last_reviewed: null
---

# How to Validate a Product Idea

Guide content starts here.

## 4. Structured data

Structured records must:

- Have stable IDs.
- Follow their corresponding JSON Schema.
- Use ISO 8601 dates where dates are required.
- Distinguish verified information from unverified information.
- Include source URLs for externally sourced claims.
- Include a last-verified date where information changes over time.

Do not invent platform requirements, prices, submission rules or statistics.

## 5. Content status

Use these statuses:

- draft: being written or reviewed.
- published: approved for public use.
- archived: retained for historical reference.

Draft content must not appear as published public content.

## 6. Writing standards

Write for builders, founders, developers and makers.

Prefer:

- Practical instructions over vague advice.
- Clear steps and expected outcomes.
- Real examples.
- Explicit limitations and warnings.
- Relevant sources.
- Actionable recommendations.

Avoid:

- Unsupported claims.
- Unverified platform information.
- Repetitive filler.
- Artificially generated content without review.

## 7. Canonical source rule

A guide should have one canonical source file.

The web application may add navigation, search, interactive forms,
visualizations and AI assistance, but it must not create a conflicting
duplicate of the underlying knowledge.

## 8. Contribution

Contributors should follow the schemas, preserve existing IDs,
provide sources for external facts and test structured content
before submitting changes.
