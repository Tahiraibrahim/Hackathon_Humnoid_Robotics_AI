# Implementation Plan: Physical AI Book Structure

**Branch**: `001-book-structure` | **Date**: 2025-12-05 | **Spec**: [specs/001-book-structure/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-book-structure/spec.md`

## Summary

Build a Docusaurus v3-based documentation site for the Physical AI Book—a 15-lesson (5 chapters × 3 lessons) hands-on guide for beginner-to-intermediate learners. The site will feature progressive learning paths, production-ready code examples, accessibility-first design (WCAG AA), and community engagement features. Optimized for hackathon timeline with phased content delivery: Foundations (Ch 1-2), Core Concepts (Ch 3-4), Advanced/Capstone (Ch 5).

## Technical Context

**Language/Version**: TypeScript 5.x (Docusaurus standard) + Markdown for content
**Primary Dependencies**: Docusaurus 3.x LTS, React 18.x, Node.js 18.x+, npm 9.x+
**Storage**: Static site generation (no database); Git for version control
**Testing**: Manual accessibility testing (WCAG AA), automated Lighthouse audits, link validation
**Target Platform**: Web (responsive, mobile-first); browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
**Project Type**: Static documentation site (Docusaurus)
**Performance Goals**: <2 second page load time (95th percentile on 4G); <5 minute build time; 90+ Lighthouse score
**Constraints**: <2MB initial bundle size; WCAG AA accessibility compliance; zero hardcoded credentials or secrets; dark mode support
**Scale/Scope**: 15 lesson documents (Markdown), 5 chapter groupings, 1 landing page, ~200 code blocks, sitemap for search

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Alignment with Physical AI Book Constitution (v1.0.0)

**✅ I. Hands-On Learning First**
- Every lesson will include runnable code examples and hands-on exercises
- Plan includes milestone-based content delivery enabling readers to see results early
- Code examples will be production-ready, not pseudocode

**✅ II. Progressive Complexity**
- 5-chapter structure ordered by difficulty (Beginner → Advanced)
- Each chapter builds on prerequisites; chapter dependencies explicitly mapped
- Lesson templates ensure consistent scaffolding of concepts

**✅ III. Accessibility and Inclusivity**
- WCAG AA compliance required in site implementation
- Plan includes accessibility audit step (Lighthouse, axe-core)
- Multiple learning modalities (text, code, visuals) specified in lesson template

**✅ IV. Documentation Excellence (Docusaurus Standard)**
- Docusaurus 3.x LTS explicitly chosen
- Dark mode support, responsive design, fast load times specified
- Search configuration and navigation structure designed

**✅ V. Production-Ready Code**
- Code blocks will use syntax highlighting, type hints, docstrings
- Build optimization ensures high Lighthouse scores
- Accessibility audit prevents broken links or rendering issues

**✅ VI. Community and Extensibility**
- Plan includes GitHub integration points (links to repo, issues, discussions)
- "Next Steps" sections and community showcase features built into content template

**GATE RESULT**: ✅ **PASS** - All constitutional principles can be met within this plan. No conflicts or violations detected.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-book-structure/
├── plan.md                  # This file (/sp.plan command output)
├── research.md              # Phase 0 output: tech stack decisions, performance targets, accessibility standards
├── data-model.md            # Phase 1 output: lesson metadata structure, frontmatter schema
├── quickstart.md            # Phase 1 output: developer quickstart for content creation
├── contracts/
│   └── lesson-template.md   # Lesson Markdown template with required frontmatter
└── checklists/
    └── requirements.md      # Specification quality checklist
```

### Source Code (Docusaurus Site Root)

```text
physical-ai-book/                      # Site root (typically: ../docs/ or ../site/)
├── docs/
│   ├── 01-chapter-foundations/
│   │   ├── _category_.json            # Chapter grouping for sidebar
│   │   ├── 01-lesson-intro.md         # Lesson 1: What is Physical AI?
│   │   ├── 02-lesson-simulator.md     # Lesson 2: Your First Robot Simulator
│   │   └── 03-lesson-concepts.md      # Lesson 3: Sensors, Brains, Actuators
│   ├── 02-chapter-building/
│   │   ├── _category_.json
│   │   ├── 01-lesson-platform.md      # Lesson 1: Robot Platform Assembly
│   │   ├── 02-lesson-wiring.md        # Lesson 2: Wiring & Powering
│   │   └── 03-lesson-control.md       # Lesson 3: Motor Control
│   ├── 03-chapter-sensors/
│   │   ├── _category_.json
│   │   ├── 01-lesson-reading.md       # Lesson 1: Reading Sensors
│   │   ├── 02-lesson-reactive.md      # Lesson 2: Reactive Control Logic
│   │   └── 03-lesson-navigation.md    # Lesson 3: Navigation Systems
│   ├── 04-chapter-learning/
│   │   ├── _category_.json
│   │   ├── 01-lesson-classification.md
│   │   ├── 02-lesson-reinforcement.md
│   │   └── 03-lesson-hybrid.md
│   ├── 05-chapter-advanced/
│   │   ├── _category_.json
│   │   ├── 01-lesson-multi-robot.md
│   │   ├── 02-lesson-manipulation.md
│   │   └── 03-lesson-capstone.md
│   └── intro.md                        # Site landing/intro page
├── static/
│   ├── images/                         # All lesson images with descriptive filenames
│   ├── code/                          # Code examples (if stored separately)
│   └── diagrams/                      # Architecture diagrams
├── blog/
│   └── community-projects.md          # Featured reader/community projects
├── src/
│   ├── pages/
│   │   ├── index.js                   # Customized landing page
│   │   └── ...
│   └── components/
│       └── ...
├── docusaurus.config.js               # Site configuration
├── sidebars.js                        # Sidebar navigation (auto-generated from docs structure)
├── package.json                       # Dependencies and build scripts
├── .env.example                       # Example env file (no secrets)
└── README.md                          # Developer documentation for site
```

**Structure Decision**:
- Docusaurus standard `/docs` structure for content (industry best practice)
- Numbered chapter folders (`01-`, `02-`, etc.) for explicit ordering
- Numbered lesson files within chapters for clarity and searchability
- `_category_.json` per chapter enables Docusaurus sidebar auto-collapse feature
- Static assets (`/static/images`, `/static/diagrams`) for media organization
- Blog section for community showcase and project highlights

---

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitutional violations detected. All core principles can be met within this architecture.

---

## Phase 0: Research & Decision Documentation

**Objective**: Resolve technical decisions and document rationale for hackathon timeline optimization.

**Outputs**: `research.md` (all decisions documented)

### Research Tasks

1. **Docusaurus v3 Setup & Best Practices**
   - Decision: Docusaurus 3.x LTS with TypeScript variant
   - Rationale: Latest LTS version; TypeScript provides type safety; first-class Markdown support; React integration for landing page customization
   - Alternatives: Hugo (Go-based, faster builds but less JS integration), VuePress (Vue instead of React)

2. **Performance Optimization Strategy**
   - Decision: Static site generation (SSG) with Vercel/GitHub Pages hosting
   - Rationale: No runtime cost; CDN-friendly; <2s load time achievable with proper asset optimization
   - Targets: <2MB initial bundle, <5min builds, 90+ Lighthouse

3. **Accessibility Compliance Approach**
   - Decision: WCAG AA compliance automated testing (axe-core) + manual review
   - Rationale: Automated testing catches 60-80% of issues; manual review ensures semantic HTML and real user testing
   - Process: Pre-commit hooks + CI/CD pipeline audit

4. **Lesson Content Management**
   - Decision: Markdown-only content with YAML frontmatter; Git-based version control
   - Rationale: Lightweight, searchable, version-controllable; separates content from code
   - Alternatives: Headless CMS (Contentful, Strapi) - overkill for hackathon timeline

5. **Search & Discoverability**
   - Decision: Docusaurus built-in search (powered by Algolia free tier or local search)
   - Rationale: No external dependencies; fast setup; sufficient for 15 documents
   - Alternative: External Algolia (requires API keys, more setup)

6. **Code Block Syntax Highlighting**
   - Decision: Prism.js (Docusaurus default) with language-specific highlighting
   - Rationale: Excellent Python syntax support; dark mode support; copy-to-clipboard plugin available
   - Highlight languages: Python (primary), YAML, JSON, Bash

7. **Community Integration**
   - Decision: GitHub repository with README, Issues, Discussions enabled
   - Rationale: Low-overhead community management; leverages familiar tools
   - Alternatives: Discord server (future enhancement post-hackathon)

---

## Phase 1: Design & Artifacts

**Prerequisites**: Phase 0 research complete

**Objective**: Create design documents and code artifacts needed for implementation.

**Outputs**: `data-model.md`, `contracts/lesson-template.md`, `quickstart.md`

### Design Tasks

1. **Data Model: Lesson Metadata Structure** (`data-model.md`)
   - Entity: Lesson
     - Fields: title, description, difficulty (enum: Beginner/Intermediate/Advanced), duration_minutes, prerequisites (array), hardware_budget (string)
     - Validation: title required + unique per chapter, difficulty must be valid enum, duration > 0
   - Entity: Chapter
     - Fields: number (1-5), title, description, prerequisites (array), lessons (array of lesson references)
   - Relationships: Chapter → contains 3 Lessons, Lesson → belongs to 1 Chapter

2. **API Contracts: Site Routes & Navigation** (`contracts/site-structure.md`)
   - Route: `/` (landing page) - Hero, benefits, getting started CTA
   - Route: `/docs` (docs root) - Redirects to Chapter 1
   - Route: `/docs/chapter-N` (chapter overview) - Lists 3 lessons, prerequisites
   - Route: `/docs/chapter-N/lesson-M` (lesson page) - Full lesson content
   - Route: `/search` (search results) - Full-text search across all lessons
   - Route: `/community` (community projects) - Featured reader projects

3. **Lesson Markdown Template** (`contracts/lesson-template.md`)
   - Frontmatter: title, description, sidebar_position, difficulty, duration_minutes, prerequisites, hardware_budget, keywords
   - Sections: Objectives, Prerequisites, Introduction, Concepts, Code Example, Exercise, Troubleshooting, Next Steps
   - Code blocks: Language-tagged (python, yaml, bash, etc.), copy button enabled, dark mode compatible

4. **Developer Quickstart** (`quickstart.md`)
   - Steps: Clone repo → install Node.js → npm install → npm start → create lesson file → add to sidebar
   - Example: Creating a new lesson from template
   - Validation checklist: word count, code examples tested, alt-text for images

---

## Phase 2: Implementation Plan (Hackathon Optimized)

**Prerequisites**: Phase 1 design complete

**Timeline**: ~40-50 hours hackathon sprint

### Phase 2.1: Infrastructure & Configuration (Hours 1-8)

**Goal**: Docusaurus site bootstrapped and configured, ready for content

**Tasks**:

1. **Initialize Docusaurus Project**
   ```bash
   npx create-docusaurus@latest physical-ai-book classic --typescript
   ```
   - Creates Node.js project with Docusaurus boilerplate
   - Installs: @docusaurus/core, @docusaurus/preset-classic, React, React-DOM

2. **Configure `docusaurus.config.js`**
   - Set title: "Physical AI Book"
   - Tagline: "A Hands-On Guide to AI-Powered Robotics"
   - URL: `https://physical-ai-book.github.io` (or custom domain)
   - Organization: Physical AI Book
   - Author: Contributors
   - Colors: Primary: #0052CC (blue), Secondary: #FFA500 (orange for emphasis)
   - Dark mode: enabled
   - Footer: GitHub link, community Discord, license (CC-BY-4.0)

3. **Clean Up Default Scaffold**
   - Delete: blog posts (demo files)
   - Delete: Docusaurus landing page (will customize)
   - Keep: Core structure and config framework

4. **Set Up Navigation**
   - Navbar links: Home | Docs | Community | GitHub
   - Header logo: Physical AI Book icon (simple SVG)
   - Footer: Quick links, license, copyright

5. **Configure `sidebars.js`**
   - Auto-generate sidebar from `/docs` folder structure
   - Chapter grouping with auto-collapse (via `_category_.json`)
   - Breadcrumb navigation enabled

6. **Enable Plugins & Features**
   - Syntax highlighting: Prism.js with Python, YAML, Bash, JSON
   - Dark mode: auto-detect user preference
   - Search: local search (no external API)
   - Code copy button: Docusaurus built-in

**Deliverables**:
- ✅ Site builds without errors
- ✅ Navigation structure works (Navbar, sidebar, breadcrumbs)
- ✅ Landing page placeholder created
- ✅ Local dev server runs at `http://localhost:3000`

---

### Phase 2.2: Information Architecture & File Structure (Hours 9-16)

**Goal**: Directory structure and templates ready, sidebar auto-generates correctly

**Tasks**:

1. **Create Chapter & Lesson Directories**
   ```
   docs/
   ├── 01-chapter-foundations/
   │   ├── _category_.json
   │   ├── 01-lesson-intro.md
   │   ├── 02-lesson-simulator.md
   │   └── 03-lesson-concepts.md
   ├── 02-chapter-building/
   │   └── (similar structure)
   ... (chapters 3-5)
   ```

2. **Create `_category_.json` Files**
   - Template for each chapter:
   ```json
   {
     "label": "Chapter 1: Foundations of Physical AI",
     "position": 1,
     "link": null,
     "collapsed": false
   }
   ```

3. **Create Placeholder Lesson Files**
   - Create all 15 lesson files with frontmatter + minimal content
   - Frontmatter includes title, difficulty, duration, prerequisites, hardware_budget
   - Body: "Content coming soon. [Hands-on exercise description]"

4. **Verify Sidebar Auto-Generation**
   - Run `npm run start`
   - Confirm sidebar shows 5 chapters with 3 lessons each
   - Verify chapter ordering (1-5)
   - Test lesson links and navigation

5. **Create `intro.md` Landing Page**
   - Summary of book, learning outcomes
   - "Get Started" button linking to Chapter 1, Lesson 1
   - Prerequisites summary

**Deliverables**:
- ✅ All 15 lesson files created with frontmatter
- ✅ Sidebar displays correctly with chapters and lessons
- ✅ Navigation between lessons works
- ✅ Intro page links to first lesson

---

### Phase 2.3: Content Development Strategy (Hours 17-40)

**Goal**: MVP-ready content for all 5 chapters (phased approach for hackathon)

**Milestone A: Chapter 1 & 2 (Foundations) - Hours 17-24**

**Chapter 1: Foundations of Physical AI**
- L1.1: What is Physical AI? (Beginner)
  - Content: definition, applications, embodied cognition
  - Code: Simple Python example of sensor-brain-actuator loop
  - Exercise: Identify Physical AI in real-world examples
  - Hardware: $0

- L1.2: Your First Robot Simulator (Beginner)
  - Content: simulator setup, environment overview
  - Code: Running pre-built simulation, basic forward movement
  - Exercise: Make simulated robot avoid obstacles
  - Hardware: $0

- L1.3: Sensors, Brains, Actuators (Beginner)
  - Content: Component deep-dive, feedback loops
  - Code: Simple if-then control logic
  - Exercise: Modify control logic, observe results
  - Hardware: $0

**Chapter 2: Building Your First Robot**
- L2.1: Robot Platform Assembly (Beginner/Intermediate)
  - Content: platform options, assembly guide (photos/diagrams)
  - Code: Minimal (setup instructions)
  - Exercise: Physical assembly checkpoint
  - Hardware: $40-150

- L2.2: Wiring & Powering (Beginner/Intermediate)
  - Content: GPIO pins, power distribution, safety
  - Code: Pin configuration, power test script
  - Exercise: Wire all connections, verify with multimeter
  - Hardware: included in L2.1

- L2.3: Motor Control (Intermediate)
  - Content: PWM, duty cycle, speed control
  - Code: Motor movement functions (forward, backward, turn, stop)
  - Exercise: Drive robot in figure-8 pattern
  - Hardware: included in L2.1

**Content Production Process**:
1. Content author writes lesson body (2,000-5,000 words)
2. Developer provides tested code examples
3. Reviewer checks accessibility (alt-text, WCAG AA)
4. Content author adds images/diagrams with alt-text
5. Final review: brand voice, code quality, testability

**Parallel Work During Milestone A**:
- Set up CI/CD pipeline for accessibility audits (axe-core, Lighthouse)
- Create lesson template documentation (writer's guide)
- Test Docusaurus build with full content

**Deliverables**:
- ✅ All 6 lessons (Ch 1-2) fully written and published
- ✅ All code examples tested and runnable
- ✅ All images with alt-text
- ✅ Site builds, all links valid
- ✅ Lighthouse score 90+

---

**Milestone B: Chapter 3 & 4 (Core Concepts) - Hours 25-32**

**Chapter 3: Sensor Integration**
- L3.1: Reading Sensors (Intermediate)
- L3.2: Reactive Control Logic (Intermediate)
- L3.3: Navigation Systems (Intermediate)

**Chapter 4: Machine Learning Basics**
- L4.1: Classification (Intermediate/Advanced)
- L4.2: Reinforcement Learning (Intermediate/Advanced)
- L4.3: Hybrid Systems (Advanced)

**Process**: Same as Milestone A (write → code → review → accessibility → final review)

**Parallel Work**:
- Finalize community showcase section
- Set up GitHub Discussions for reader questions
- Prepare deployment pipeline

**Deliverables**:
- ✅ All 6 lessons (Ch 3-4) fully written
- ✅ All code examples tested on Raspberry Pi 4+
- ✅ WCAG AA accessibility compliance verified
- ✅ Community sections configured

---

**Milestone C: Chapter 5 (Advanced/Capstone) - Hours 33-40**

**Chapter 5: Advanced Applications**
- L5.1: Multi-Robot Coordination (Advanced)
- L5.2: Perception & Manipulation (Advanced)
- L5.3: Your Own Physical AI Project (Advanced/Capstone)

**Process**: Same as previous milestones

**Bonus Activities (if time permits)**:
- Create lesson video walkthroughs
- Write accompanying blog posts
- Set up automated accessibility testing in CI/CD

**Deliverables**:
- ✅ All 15 lessons complete and published
- ✅ All code tested and verified
- ✅ Site fully accessible and performant
- ✅ Community features live

---

### Phase 2.4: UI/UX & Deployment (Hours 41-50)

**Goal**: Professional landing page, optimized build, live deployment

**Tasks**:

1. **Customize Landing Page** (`src/pages/index.js`)
   - Hero section: Book title, tagline, cover image
   - Value proposition: 15 lessons, hands-on projects, beginner-friendly
   - CTA button: "Start Learning" → Chapter 1
   - Featured projects: Community showcase carousel
   - Footer CTA: "Join the community" → GitHub/Discord

2. **Add Docusaurus Plugins**
   - `@docusaurus/theme-search-algolia` (or local search): Full-text search
   - `docusaurus-plugin-image-zoom`: Click-to-zoom code blocks and diagrams
   - `docusaurus-plugin-copy-code-block`: Enhanced copy-to-clipboard button
   - `docusaurus-theme-live-codeblock`: (Optional) Interactive code examples

3. **Accessibility Audit**
   - Run Lighthouse audit: Target 90+ score
   - Run axe-core audit: Fix all critical/serious violations
   - Manual screen reader testing: Chrome + NVDA
   - Keyboard-only navigation: Tab through all pages
   - Mobile testing: Responsive on 320px, 768px, 1024px widths

4. **Performance Optimization**
   - Image optimization: JPEG/WebP conversion, lazy loading
   - CSS/JS minification: Automatic via Docusaurus build
   - Bundle analysis: Ensure <2MB initial load
   - Asset caching: Set Vercel/GitHub Pages cache headers

5. **Final Build Check**
   - Run `npm run build`
   - Target: <5 minutes build time
   - Verify no warnings or errors
   - Test all links: `npm install -g broken-link-checker && blc https://localhost:3000`

6. **Deployment Setup**
   - Option A: GitHub Pages (free, auto-deploy from main branch)
   - Option B: Vercel (free tier, better performance, auto-preview)
   - Option C: Netlify (free tier alternative)
   - Recommendation: GitHub Pages (simplest for hackathon)

7. **Deploy to Production**
   - Push to GitHub
   - GitHub Actions auto-builds and deploys
   - Verify live site: `https://[org].github.io/physical-ai-book`
   - Test on mobile and desktop

**Deliverables**:
- ✅ Professional landing page live
- ✅ Site fully deployed and accessible
- ✅ All accessibility standards met
- ✅ Performance targets achieved
- ✅ Search functional
- ✅ Community links active

---

## Timeline Summary (Hackathon - ~50 hours)

| Phase | Hours | Tasks | Owner |
|-------|-------|-------|-------|
| P2.1: Infrastructure | 8 | Initialize Docusaurus, configure, clean up, navbar setup | DevOps/Developer |
| P2.2: Information Architecture | 8 | Create directories, category files, placeholder lessons | Developer |
| P2.3A: Content (Ch 1-2) | 8 | Write, code, review, accessibility check | Content Team |
| P2.3B: Content (Ch 3-4) | 8 | Write, code, review, accessibility check | Content Team |
| P2.3C: Content (Ch 5) | 7 | Write, code, review, accessibility check | Content Team |
| P2.4: UI/UX & Deploy | 10 | Landing page, plugins, audit, deploy | Frontend/DevOps |
| **Total** | **49** | | |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Content delays | Medium | High | Parallel content creation; prioritize Chapters 1-2 MVP |
| Accessibility audit failures | Low | Medium | Use automated testing early; manual review in parallel |
| Build performance issues | Low | Medium | Monitor bundle size; lazy-load images from day 1 |
| Deployment misconfiguration | Low | Low | Test deployment setup on day 2; use GitHub Pages (simple) |
| Browser compatibility issues | Low | Low | Test in Chrome/Firefox/Safari/Edge early; use modern CSS/JS |

---

## Success Criteria (Phase 2 Completion)

- ✅ All 15 lessons accessible and readable
- ✅ Site builds in <5 minutes
- ✅ Page load time <2 seconds (95th percentile)
- ✅ Lighthouse score 90+
- ✅ WCAG AA compliance verified
- ✅ All code examples tested and runnable
- ✅ Live deployment accessible
- ✅ Sidebar navigation works correctly
- ✅ Search functional
- ✅ Dark mode toggle functional

---

## Post-Hackathon Roadmap (Future Phases)

**Phase 3: Community & Content Expansion**
- Video walkthroughs for core lessons
- Interactive code playgrounds (CodePen/repl.it integration)
- Reader project showcase with voting
- Bi-weekly live Q&A sessions

**Phase 4: Internationalization**
- Translate to Spanish, Mandarin, French
- Localize hardware recommendations by region

**Phase 5: Advanced Features**
- Personalized learning paths based on goals
- Certificate of completion
- Integration with online course platforms (Udemy, Coursera)
- Mobile app companion
- Cloud robotics simulation integration

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
