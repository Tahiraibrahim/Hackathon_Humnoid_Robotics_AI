---
id: 002
title: Specify Book Structure and Guidelines
stage: spec
date: 2025-12-05
surface: agent
model: claude-haiku-4-5-20251001
feature: 001-book-structure
branch: 001-book-structure
user: user
command: /sp.specify
labels: ["spec", "book-structure", "physical-ai", "content-guidelines", "docusaurus"]
links:
  spec: /specs/001-book-structure/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-book-structure/spec.md
  - specs/001-book-structure/checklists/requirements.md
tests:
  - Specification quality checklist (requirements.md) - all items passing
---

## Prompt

specify file update

Based on the constitution, create a detailed specification for the Physical AI book. Include .
1.Book structure with 5 chapter and 3 lessons each (titles and description)
2.Constent guidelines and lessons format.
3. Docusaurus-specific requirments for orginization

## Response snapshot

Created comprehensive specification for Physical AI Book Structure (001-book-structure) featuring:

**User Scenarios & Testing** (3 prioritized stories):
- P1: Create Book Navigation Structure - Docusaurus site skeleton with 5 chapters × 3 lessons, auto-generated sidebar
- P2: Establish Content Guidelines - Content author guidelines for consistency, brand voice, code quality
- P3: Implement Docusaurus Organization - Site build optimization, search, mobile navigation

**Functional Requirements** (24 total):
- Book Structure (6 FR): Exactly 5 chapters with 3 lessons each, sequential numbering, progressive complexity
- Content Guidelines (8 FR): Lesson structure (8 required sections), word count (2,000-5,000), code standards, accessibility
- Docusaurus Organization (7 FR): Docs structure, metadata frontmatter, sidebar auto-generation, search, performance
- Links & Navigation (3 FR): Previous/next lesson links, chapter overview links, reading time display

**Success Criteria** (15 measurable metrics):
- All 15 lessons created with complete metadata
- 100% lesson compliance with guidelines (automated checklist)
- All code examples run on Raspberry Pi 4+ without modification
- WCAG AA accessibility compliance verified
- <2 second page load time (95th percentile)
- 90%+ brand voice consistency approval rate
- Reader satisfaction 4/5+ on progression clarity

**5 Chapters with 3 Lessons Each**:
1. **Chapter 1: Foundations of Physical AI** (Beginner) - L1: What is Physical AI, L2: Robot Simulator, L3: Sensors/Brains/Actuators
2. **Chapter 2: Building Your First Robot** (Beginner/Intermediate) - L1: Platform Assembly, L2: Wiring & Powering, L3: Motor Control
3. **Chapter 3: Sensor Integration** (Intermediate) - L1: Reading Sensors, L2: Reactive Control Logic, L3: Navigation System
4. **Chapter 4: Machine Learning Basics** (Intermediate/Advanced) - L1: Classification, L2: Reinforcement Learning, L3: Hybrid Systems
5. **Chapter 5: Advanced Applications** (Advanced) - L1: Multi-Robot Coordination, L2: Perception & Manipulation, L3: Capstone Project

**Content Guidelines**:
- 8-section lesson structure: Objectives, Prerequisites, Introduction, Concepts, Code Example, Exercise, Troubleshooting, Next Steps
- Accessibility: alt-text, WCAG AA compliance, dark mode support, keyboard navigation
- Code Quality: PEP 8, type hints, docstrings, error handling, tested on Raspberry Pi 4+
- Brand Voice: Encouraging, clear, curious, honest, inclusive, pragmatic
- Hardware Budgets: Each lesson clearly states budget ($0-200) with alternatives

**Docusaurus Organization**:
- Directory structure: `/docs/chapter-N-title/lesson-1.md`, etc.
- Frontmatter metadata: title, description, sidebar_position, difficulty, duration, prerequisites, hardware_budget
- `_category_.json` for auto-collapsing chapter sections
- Performance targets: <2s load time, <5min builds, 90+ Lighthouse score
- Search configuration: full-text search, keyword indexing, context snippets
- WCAG AA compliance: color contrast, heading hierarchy, screen reader support

## Outcome

- ✅ Impact: Established detailed specification for entire book structure, content guidelines, and Docusaurus deployment requirements. Specification comprehensively addresses user requirements and aligns with constitutional principles.
- 🧪 Tests: Specification quality checklist created (requirements.md) - all validation items passing
- 📁 Files: `/specs/001-book-structure/spec.md` (detailed), `/specs/001-book-structure/checklists/requirements.md` (validation)
- 🔁 Next prompts: Create implementation plan using `/sp.plan` to design content creation pipeline, tooling, and workflows
- 🧠 Reflection: Specification comprehensively addresses all three user requests (book structure, content guidelines, Docusaurus requirements) with concrete, measurable acceptance criteria. Aligns strongly with Physical AI Book Constitution (hands-on learning, progressive complexity, accessibility, production-ready code). Ready to proceed to planning phase.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Specification Quality Checklist - PASS (all items verified)
- Prompt variant (if applicable): Standard /sp.specify workflow with detailed feature description
- Next experiment (smallest change to try): Validate specification with sample lesson authors to ensure content guidelines are actionable and sufficient
