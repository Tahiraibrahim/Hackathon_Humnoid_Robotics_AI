# Data Model: Physical AI Book Lesson Metadata

**Date**: 2025-12-05
**Feature**: Physical AI Book Structure
**Phase**: Phase 1 - Design & Artifacts

---

## Overview

The Physical AI Book uses a simple but powerful data model based on YAML frontmatter in Markdown files. This model enables:
- Docusaurus to auto-generate navigation (sidebar)
- Search engines to index content with rich metadata
- Readers to understand lesson prerequisites and time investment
- Content authors to track progress and dependencies

---

## Entities

### Entity: Chapter

**Purpose**: Group 3 related lessons into a cohesive learning unit

**Fields**:

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `chapter_number` | Integer (1-5) | Yes | `1` | Determines ordering in sidebar |
| `title` | String | Yes | `"Foundations of Physical AI"` | Displayed in sidebar and breadcrumbs |
| `description` | String (100-200 chars) | Yes | `"Introduction to Physical AI concepts, robotics basics, and the book's learning approach."` | Used in chapter overview page |
| `icon` | String (emoji or Unicode) | No | `"🤖"` | Optional; displayed in sidebar next to chapter |
| `prerequisites` | Array<String> | No | `["Basic Python", "5 minutes of curiosity"]` | What readers need to know before chapter |
| `estimated_hours` | Number | No | `6.5` | Approximate time to complete chapter (3 lessons) |
| `lessons` | Array<Lesson> | Yes | `[Lesson1, Lesson2, Lesson3]` | Fixed: exactly 3 lessons per chapter |

**Validation Rules**:
- `chapter_number` must be between 1 and 5 (inclusive)
- `title` must be unique across all chapters
- Exactly 3 lessons must belong to each chapter
- `estimated_hours` must be > 0 if specified

**Storage**: Defined in `_category_.json` for each chapter directory

---

### Entity: Lesson

**Purpose**: Individual learning unit with theory, code, exercises

**Fields**:

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `title` | String | Yes | `"What is Physical AI?"` | Displayed in sidebar, search results |
| `description` | String (150-300 chars) | Yes | `"Introduction to Physical AI as the intersection of artificial intelligence and robotics."` | Used in search results, chapter overview |
| `sidebar_position` | Integer (1-3) | Yes | `1` | Order within chapter (1, 2, or 3) |
| `difficulty` | Enum | Yes | `"Beginner"` | Must be: `Beginner`, `Intermediate`, or `Advanced` |
| `duration_minutes` | Integer | Yes | `45` | Time to complete lesson (theory + exercise) |
| `prerequisites` | Array<String> | No | `["Lesson 1.1", "Basic Python loops"]` | Links to prior lessons or knowledge needed |
| `hardware_budget` | String | Yes | `"$0"` or `"$40-150"` | Cost range for hardware used in lesson |
| `keywords` | Array<String> | No | `["robotics", "AI", "embodiment"]` | For search indexing and discovery |
| `author` | String | No | `"Jane Smith"` | Content author (for attribution) |
| `last_updated` | Date (ISO 8601) | No | `"2025-12-05"` | When lesson was last edited |

**Validation Rules**:
- `title` must be unique within chapter
- `difficulty` must be valid enum value
- `duration_minutes` must be > 0
- `hardware_budget` must match pattern `$X` or `$X-Y` (USD)
- `prerequisites` array can reference other lessons or general knowledge
- `sidebar_position` must be 1, 2, or 3 (no gaps, no duplicates within chapter)

**Storage**: YAML frontmatter in Markdown files (`.md`)

---

### Entity: Lesson Structure (Content Sections)

**Purpose**: Standardize lesson content for consistency and searchability

**Required Sections** (in order):

| Section | Purpose | Typical Length | Example |
|---------|---------|-----------------|---------|
| **Learning Objectives** | What reader will accomplish | 3-5 bullet points | "Explain PWM concepts", "Implement motor control" |
| **Prerequisites** | What's required before lesson | 2-4 items | "Lesson 2.1 complete", "Basic Python knowledge" |
| **Introduction** | Why this matters, context | 300-500 words | Hook, real-world use case, lesson overview |
| **Core Concepts** | Theory and explanations | 1,000-1,500 words | Concepts, analogies, diagrams with alt-text |
| **Code Example** | Runnable, tested code | 50-200 lines | Complete functions with comments, type hints |
| **Hands-On Exercise** | Practical task for reader | Described, not coded | Step-by-step instructions, expected outcome |
| **Troubleshooting** | Common issues and solutions | 300-500 words | Platform-specific issues, debugging tips |
| **Next Steps** | Extensions and related topics | 3-5 bullet points | Extension ideas, preview of next lesson |

**Validation**:
- All sections must be present
- No sections should be skipped or reordered
- Each section has target length (enforced during review)

---

### Entity: Code Block

**Purpose**: Ensure consistency and accessibility of code examples

**Metadata Per Block**:

| Attribute | Type | Required | Example | Notes |
|-----------|------|----------|---------|-------|
| `language` | String | Yes | `"python"` | Must be one of: python, yaml, json, bash, javascript |
| `title` | String | No | `"motor-control.py"` | File name (helps reader save) |
| `showLineNumbers` | Boolean | No | `true` | Show line numbers for reference |
| `highlight` | String | No | `"5-8, 12"` | Highlight specific lines |
| `copy_button` | Boolean | Yes | `true` | Always true (built-in feature) |
| `tested` | Boolean | Yes | `true` | Code must be tested on target platform |

**Validation**:
- All code must be syntactically valid
- All code must have been tested (at least once)
- All functions must have docstrings (Google or NumPy style)
- All parameters must have type hints
- Code must follow PEP 8 (for Python)
- Maximum line length: 80 characters (readability)
- No hardcoded secrets, IPs, or credentials

---

### Entity: Image/Diagram

**Purpose**: Support visual learning with accessible media

**Metadata**:

| Attribute | Type | Required | Example | Notes |
|-----------|------|----------|---------|-------|
| `src` | String | Yes | `/images/motor-diagram.png` | Path to image file |
| `alt` | String | Yes | `"Diagram showing motor connected to GPIO pins 17 and 27 on Raspberry Pi"` | Min 20 chars; describe learning value |
| `caption` | String | No | `"Figure 3: Motor wiring configuration"` | Optional; for diagrams and figures |
| `width` | String | No | `"600px"` | Responsive width; default: 100% |
| `dark_mode` | String | No | `"invert"` | How image appears in dark mode |

**Validation**:
- Alt text must be >= 20 characters
- Alt text must describe what's shown and why it matters
- Image file must be < 500KB (optimized)
- Format: PNG for diagrams, JPG for photos

---

## Relationships

### Chapter → Lessons (One-to-Many)

**Relationship**: Each Chapter contains exactly 3 Lessons

```
Chapter 1: Foundations
├── Lesson 1.1: What is Physical AI?
├── Lesson 1.2: Your First Robot Simulator
└── Lesson 1.3: Sensors, Brains, Actuators

Chapter 2: Building Your First Robot
├── Lesson 2.1: Robot Platform Assembly
├── Lesson 2.2: Wiring & Powering
└── Lesson 2.3: Motor Control
```

### Lesson → Prerequisites (Zero-to-Many)

**Relationship**: Lesson can reference prior lessons or general knowledge

```
Lesson 3.2: Reactive Control Logic
└── Prerequisites:
    ├── Lesson 3.1 (Reading Sensors)
    ├── Chapter 2 complete (Motor Control)
    └── Understanding of if-then logic
```

### Lesson → Code Blocks (One-to-Many)

**Relationship**: Lesson can contain multiple code blocks

```
Lesson 2.3: Motor Control
├── Code Block 1: PWM explanation with example
├── Code Block 2: Motor control functions
└── Code Block 3: Test script for verification
```

---

## YAML Frontmatter Schema

Every lesson Markdown file **MUST** include frontmatter matching this schema:

```yaml
---
title: "Lesson Title (3-8 words)"
description: "One sentence summary (max 150 chars) for search results"
sidebar_position: 1  # Must be 1, 2, or 3 within chapter
difficulty: "Beginner"  # One of: Beginner, Intermediate, Advanced
duration_minutes: 45  # Time to complete (including exercise)
prerequisites:
  - "Lesson X.Y"
  - "Prior knowledge description"
hardware_budget: "$40-150"  # Format: $X or $X-Y (USD)
keywords:
  - "keyword1"
  - "keyword2"
  - "keyword3"
author: "Author Name"  # Optional
last_updated: "2025-12-05"  # ISO 8601 format
---
```

**Example**:

```yaml
---
title: "Programming Motor Control"
description: "Write Python code to control robot motors using PWM and implement speed control"
sidebar_position: 3
difficulty: "Intermediate"
duration_minutes: 60
prerequisites:
  - "Lesson 2.2 (Wiring & Powering)"
  - "Understanding of functions in Python"
hardware_budget: "Included in Lesson 2.1"
keywords:
  - "PWM"
  - "Motor control"
  - "Raspberry Pi GPIO"
  - "Speed control"
author: "Robotics Team"
last_updated: "2025-12-05"
---
```

---

## File Organization

### Directory Structure

```
docs/
├── 01-chapter-foundations/
│   ├── _category_.json  # Chapter metadata
│   ├── 01-lesson-intro.md  # Frontmatter + content
│   ├── 02-lesson-simulator.md
│   └── 03-lesson-concepts.md
├── 02-chapter-building/
│   ├── _category_.json
│   ├── 01-lesson-platform.md
│   ├── 02-lesson-wiring.md
│   └── 03-lesson-control.md
... (chapters 3-5 similar)
```

### _category_.json Schema

Each chapter directory contains `_category_.json`:

```json
{
  "label": "Chapter 1: Foundations of Physical AI",
  "position": 1,
  "link": null,
  "collapsed": false,
  "className": "chapter-section"
}
```

| Field | Type | Purpose |
|-------|------|---------|
| `label` | String | Chapter title displayed in sidebar |
| `position` | Integer (1-5) | Chapter ordering |
| `link` | null | Not used; kept for Docusaurus compatibility |
| `collapsed` | Boolean | Whether chapter sidebar starts collapsed (false = expanded) |
| `className` | String | CSS class for styling chapter headers |

---

## State Transitions & Workflows

### Lesson Content Lifecycle

```
DRAFT (author writing)
  ↓
REVIEW (accessibility, brand voice, code quality)
  ↓
REVISIONS (feedback addressed)
  ↓
PUBLISHED (live on site)
  ↓
MAINTENANCE (updates, bug fixes)
```

### Tracking Status

Status tracked in git commits and PR descriptions (not in YAML frontmatter):

```
[draft] Chapter 1, Lesson 1.1: What is Physical AI?
[review] Chapter 1, Lesson 1.1: Ready for accessibility audit
[ready] Chapter 1, Lesson 1.1: All feedback addressed
[published] Chapter 1, Lesson 1.1: Live on production site
```

---

## Constraints & Validation

### Content Constraints

| Constraint | Rule | Rationale |
|-----------|------|-----------|
| Lesson Word Count | 2,000-5,000 words (excluding code) | Cognitive load; readability |
| Code Block Size | 50-200 lines total per lesson | Digestibility; prevents overwhelming readers |
| New Concepts | Max 3 per lesson | Prevents cognitive overload |
| Hardware Budget | ≤ $150 per lesson | Accessibility; budget-conscious learners |
| Image Size | ≤ 500KB each | Performance; fast loading |
| Alt Text | ≥ 20 characters | Accessibility; meaningful descriptions |
| Reading Time | Accurate to ±5 minutes | Accurate time estimates |

### Metadata Constraints

| Constraint | Rule |
|-----------|------|
| `duration_minutes` | Must be integer > 0 |
| `sidebar_position` | Must be 1, 2, or 3 (no gaps) |
| `difficulty` | Must be one of three enum values |
| `hardware_budget` | Must match regex: `^\$\d+(-\d+)?$` |
| Unique IDs | No duplicate titles within chapter |

---

## Validation Checklist

Before publishing a lesson:

- [ ] Frontmatter complete and valid YAML
- [ ] All required sections present (8 sections)
- [ ] Word count within range (2,000-5,000)
- [ ] All images have alt-text (≥20 chars)
- [ ] All code blocks tested on Raspberry Pi 4+
- [ ] Code follows PEP 8 (Python)
- [ ] Prerequisites correctly referenced
- [ ] Brand voice consistent
- [ ] No hardcoded credentials or secrets
- [ ] Accessibility audit passing (axe-core)
- [ ] Lighthouse audit passing (90+)

---

## Database/Search Indexing

### Indexing Strategy (Lunr/Local Search)

Docusaurus search indexes:
- `title`: Full-text searchable
- `description`: Full-text searchable
- `keywords`: Full-text searchable
- Content body: Full-text searchable (all sections)

**Example**: Searching "PWM motor control" returns Lesson 2.3 as top result because keywords and content match.

---

## API Contract: Docusaurus Routes

Generated routes from this data model:

| Route | Data | Example |
|-------|------|---------|
| `/docs/chapter-1-foundations/lesson-1-intro` | Lesson 1.1 frontmatter + content | Full lesson page |
| `/docs/chapter-1-foundations` | Chapter 1 metadata + list of 3 lessons | Chapter overview |
| `/docs` | All chapters and lessons | Docs root |
| `/search` | Full-text search across all frontmatter + content | Search results |
| Site metadata | Used in `<meta>` tags for SEO | Open Graph, JSON-LD |

---

## Conclusion

This data model provides:
1. **Structure**: Consistent organization of 15 lessons across 5 chapters
2. **Discoverability**: Rich metadata enables search, browsing, prerequisites
3. **Accessibility**: Alt-text, structured content, semantic HTML
4. **Maintainability**: YAML frontmatter is human-readable and git-friendly
5. **Scalability**: Can extend to 50+ lessons without architectural changes

The model aligns with constitutional principles of progressive learning, hands-on content, and accessibility-first design.
