<!--
Sync Impact Report:
- Version change: [INITIAL] → 1.0.0 (initial ratification)
- New constitution created for Physical AI Book project
- Sections added: Vision, Core Principles (6 principles), Success Criteria, Constraints, Stakeholders, Brand Voice, Governance
- Templates requiring updates:
  ✅ constitution.md (created)
  ⚠ plan-template.md (pending - Constitution Check section to be verified)
  ⚠ spec-template.md (pending - alignment with accessibility and hands-on principles)
  ⚠ tasks-template.md (pending - alignment with progressive learning structure)
- Follow-up TODOs: None
-->

# Physical AI Book Constitution

## Vision

To create the definitive hands-on guide to Physical AI that transforms beginners and intermediate learners into confident practitioners through progressive, practical projects. This book bridges the gap between AI theory and real-world robotics applications, making Physical AI accessible to anyone with curiosity and determination.

**Target Outcome**: By completing this book, readers will have built working Physical AI systems from scratch and gained the confidence to pursue their own robotics and embodied AI projects.

## Core Principles

### I. Hands-On Learning First

**Principle**: Every concept MUST be taught through practical implementation. Theory follows practice, not the other way around.

**Requirements**:
- Every chapter includes working code examples readers can run immediately
- Projects build progressively in complexity: simple → intermediate → advanced
- Readers see results within the first 15 minutes of each chapter
- Code snippets are complete and runnable, never pseudocode
- All hardware requirements clearly stated upfront with accessible alternatives

**Rationale**: Adult learners, especially in technical fields, retain knowledge best through doing. Immediate feedback and working systems create motivation and confidence that sustains learning through challenging material.

### II. Progressive Complexity

**Principle**: Concepts build incrementally. No cognitive leaps; each new idea requires only understanding what came before.

**Requirements**:
- Chapter dependencies explicitly mapped in a learning path diagram
- New terminology introduced only when needed, defined in context
- Each project reuses and extends code from previous projects
- Difficulty ratings (Beginner/Intermediate/Advanced) clearly marked
- Prerequisites listed at chapter start with specific prior knowledge needed

**Rationale**: Cognitive load management is critical for learning. Readers who encounter concepts they can't understand with current knowledge will disengage. Progressive scaffolding prevents overwhelm and builds genuine mastery.

### III. Accessibility and Inclusivity

**Principle**: The book MUST be accessible to diverse learners regardless of background, budget, or learning style.

**Requirements**:
- No assumptions about prior robotics knowledge; only basic programming required
- Budget-conscious hardware alternatives provided for every project
- Visual, textual, and code-based explanations for every concept
- Real-world examples from multiple domains (healthcare, agriculture, manufacturing, home automation)
- Troubleshooting sections anticipate common learner mistakes
- Gender-neutral language and diverse examples throughout

**Rationale**: Physical AI should not be gatekept by expensive equipment or assumed knowledge. Broadening access diversifies the field and accelerates innovation. Multiple learning modalities ensure concepts land for visual, kinesthetic, and analytical learners alike.

### IV. Documentation Excellence (Docusaurus Standard)

**Principle**: All content MUST leverage Docusaurus features to create an outstanding reading and navigation experience.

**Requirements**:
- Consistent Markdown structure with proper frontmatter (title, description, sidebar_position)
- Interactive code blocks with syntax highlighting and copy buttons
- Admonitions (note, tip, warning, danger, info) for emphasis and context
- Tabs for showing alternative approaches or platform-specific instructions
- Searchable content with keyword-rich headings
- Mobile-responsive layout tested on small screens
- Fast page load times (<2 seconds on average connection)
- Dark mode support for all diagrams and code examples

**Rationale**: Docusaurus is chosen for superior developer experience and reader experience. Its features (search, versioning, localization-ready) future-proof the book. Consistent structure reduces cognitive load and makes content skimmable for reference use.

### V. Production-Ready Code

**Principle**: All code examples MUST represent good engineering practice suitable for real-world deployment, not just educational shortcuts.

**Requirements**:
- Proper error handling in all code samples
- Security best practices (no hardcoded credentials, input validation, etc.)
- Type hints and docstrings for all Python functions
- Modular, reusable code structure (not monolithic scripts)
- Version pinning for all dependencies with update notes
- Tested on target platforms (specified Raspberry Pi models, Linux versions, etc.)
- Performance considerations discussed when relevant
- Code follows PEP 8 (Python) or language-specific standards

**Rationale**: Teaching bad habits is worse than teaching nothing. Readers will copy-paste and adapt example code. Production-grade examples teach professionalism and prevent future technical debt. Runnable, debugged code respects readers' time and builds trust.

### VI. Community and Extensibility

**Principle**: The book MUST foster a community of practice and enable readers to extend beyond the book's scope.

**Requirements**:
- Every project includes "Next Steps" section with 3-5 extension ideas
- External resource recommendations curated for quality and accessibility
- GitHub repository with working code, issues for reader questions, and contribution guidelines
- Discussion prompts to encourage reader experimentation
- Links to relevant research papers for deeper dives (with plain-language summaries)
- "Ask the Community" callouts directing readers to forums/Discord
- Regular updates addressing new hardware, libraries, and techniques

**Rationale**: No single book can cover everything. Empowering readers to self-direct learning post-book is the ultimate success metric. Community reduces isolation, accelerates learning through peer support, and keeps content relevant as the field evolves.

## Success Criteria

The Physical AI Book succeeds when:

### Reader Outcomes (Primary Metrics)
- **SC-001**: 80% of readers complete at least one physical robot project within 4 weeks of starting
- **SC-002**: 60% of readers successfully complete all core projects and can explain key concepts
- **SC-003**: Readers report 4/5 or higher satisfaction rating on "clarity of explanations"
- **SC-004**: 70% of readers feel confident pursuing their own Physical AI projects after completion
- **SC-005**: Beginners with only basic Python knowledge can follow without external courses

### Content Quality (Secondary Metrics)
- **SC-006**: All code examples run without modification on specified platforms (tested quarterly)
- **SC-007**: Average page load time <2 seconds for 95% of pages
- **SC-008**: Search functionality returns relevant results for 90% of technical queries
- **SC-009**: Zero unresolved placeholders or "TODO" sections in published content
- **SC-010**: Community GitHub receives active engagement (issues, PRs, discussions)

### Educational Impact (Aspirational Metrics)
- **SC-011**: Readers from non-CS backgrounds successfully complete the book
- **SC-012**: Book cited in academic courses or bootcamps as recommended resource
- **SC-013**: Community-created project extensions shared and celebrated
- **SC-014**: Translations or adaptations created for non-English speakers
- **SC-015**: Measurable increase in Physical AI project submissions to maker communities

## Constraints

### Technical Constraints
- **C-001**: All projects must be testable without specialized lab equipment
- **C-002**: Hardware costs per project must not exceed $150 USD (budget alternatives <$50)
- **C-003**: Software stack must be open-source and free for educational use
- **C-004**: Code examples must run on Raspberry Pi 4 or newer (ARM architecture)
- **C-005**: Internet connectivity required only for initial setup, not runtime

### Content Constraints
- **C-006**: Each chapter length: 2,000-5,000 words (excluding code) for readability
- **C-007**: No more than 3 new major concepts per chapter (cognitive load limit)
- **C-008**: Code examples: complete functions <50 lines; full scripts <200 lines
- **C-009**: Diagrams must have alt-text and text descriptions for accessibility
- **C-010**: No content behind paywalls; all resources freely available

### Operational Constraints
- **C-011**: Docusaurus version must be LTS (currently 3.x) for stability
- **C-012**: All dependencies pinned with tested version ranges in `package.json`
- **C-013**: Build time for full site must be <5 minutes for CI/CD efficiency
- **C-014**: Browser support: Modern evergreen browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **C-015**: No tracking scripts or analytics that compromise reader privacy without explicit consent

### Time Constraints
- **C-016**: Readers should complete core content in 8-12 weeks at 5 hours/week pace
- **C-017**: Each project designed for 2-4 hour completion time (excluding hardware setup)
- **C-018**: Content updates (for library/hardware changes) quarterly minimum

## Stakeholders

### Primary Stakeholders
- **Readers (Learners)**: Individuals seeking to learn Physical AI through hands-on practice
  - Success measured by: project completion rates, confidence surveys, community engagement
  - Needs: clear explanations, working code, accessible hardware, supportive community

- **Contributors**: Open-source community members who improve content, add projects, or fix errors
  - Success measured by: PR merge rate, contributor satisfaction, diversity of contributions
  - Needs: clear contribution guidelines, responsive maintainers, credit/recognition

### Secondary Stakeholders
- **Educators**: Instructors who may use this book in courses or workshops
  - Success measured by: adoption in curricula, supplementary material requests
  - Needs: learning objectives, assessment ideas, bulk access considerations

- **Hardware/Software Vendors**: Companies whose products are featured in projects
  - Success measured by: accurate documentation, positive brand association
  - Needs: correct technical specs, fair comparison, disclosure of limitations

### Tertiary Stakeholders
- **Employers**: Companies hiring for Physical AI roles who benefit from skilled practitioners
- **Researchers**: Academics who may reference the book for outreach or teaching inspiration
- **Accessibility Advocates**: Groups ensuring content reaches underrepresented communities

## Brand Voice

The Physical AI Book speaks with a voice that is:

### Encouraging and Empowering
- "You've got this" > "This is hard"
- Celebrate small wins; normalize mistakes as learning opportunities
- Use "we" when problem-solving together; "you" when celebrating reader achievements
- Avoid gatekeeping language like "obviously," "simply," or "just"

### Clear and Concrete
- Short sentences (avg 15-20 words); active voice
- Technical terms defined on first use with context
- Analogies from everyday life to explain abstract concepts
- "Show, don't tell": code examples over lengthy descriptions

### Curious and Exploratory
- Pose questions that encourage experimentation
- Acknowledge multiple valid approaches; explain tradeoffs
- Share "why" behind design decisions, not just "how"
- Wonder aloud about future possibilities and open problems

### Honest and Humble
- Acknowledge limitations of examples and hardware
- Point out when something is genuinely difficult
- Admit when best practices are evolving or debated
- Cite sources; give credit to researchers and practitioners

### Inclusive and Welcoming
- Assume diverse backgrounds; avoid in-group jargon without definition
- Examples from multiple cultures and use cases
- Recognize different learning speeds and paths
- Gender-neutral language; diverse names in examples

### Practical and Pragmatic
- Focus on what works, not theoretical perfection
- Address real frustrations (driver issues, hardware flakiness)
- "Good enough" iterations over analysis paralysis
- Time and budget constraints are features, not bugs

**Example of Voice in Action**:

❌ **Not this**: "Obviously, the PID controller is trivial to implement. Simply tune the gains."

✅ **This**: "Let's build a PID controller together. Don't worry if the math feels abstract—you'll tune it by trial and error like most roboticists do, and it'll click when you see your robot balance for the first time."

## Governance

### Constitutional Authority
- This constitution is the authoritative source for all content, technical, and community decisions
- When conflicts arise, principles in this document supersede all other guidance
- All contributors, maintainers, and stakeholders are bound by these principles

### Amendment Process
- Amendments require documented justification, community feedback period (14 days minimum), and maintainer approval
- Version increments follow semantic versioning:
  - **MAJOR**: Backward-incompatible changes to core principles or target audience
  - **MINOR**: New principles added or significant principle expansions
  - **PATCH**: Clarifications, wording improvements, or non-semantic updates
- All amendments logged in git history with rationale in commit messages

### Compliance and Review
- Every pull request MUST verify compliance with relevant principles before merge
- Quarterly constitution review to ensure principles reflect evolving best practices
- Community feedback actively solicited on constitutional effectiveness
- Principle violations in published content treated as high-priority bugs

### Complexity Justification
- Any violation of principles (e.g., requiring expensive hardware, exceeding word limits) MUST be explicitly justified in PR description
- Justifications follow format: "Violates [Principle], needed because [reason], simpler alternative [X] rejected because [reason]"
- Maintainers may request alternative approaches that better adhere to principles

### Runtime Guidance
- Contributors and maintainers should refer to `CLAUDE.md` for day-to-day development workflow and agent-specific guidance
- This constitution defines "what" and "why"; `CLAUDE.md` defines "how"

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
