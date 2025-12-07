# Feature Specification: Physical AI Book Structure

**Feature Branch**: `001-book-structure`
**Created**: 2025-12-05
**Status**: Draft
**Input**: User description: "Based on the constitution, create a detailed specification for the Physical AI book. Include 1. Book structure with 5 chapters and 3 lessons each (titles and description). 2. Content guidelines and lessons format. 3. Docusaurus-specific requirements for organization"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Book Navigation Structure (Priority: P1)

A content editor needs to organize the Physical AI book content into a logical, progressive learning path that guides beginners from basic concepts to building working robotic systems.

**Why this priority**: This is the foundation for all content work. Without a clear structure, chapters, and lessons, no content can be organized or published. This enables all downstream content creation work.

**Independent Test**: Can be fully tested by building the Docusaurus site skeleton with all chapter and lesson files in place, verifying navigation paths work, and confirming the learning progression is logical when viewed in the sidebar.

**Acceptance Scenarios**:

1. **Given** a user visits the book homepage, **When** they view the sidebar navigation, **Then** they see 5 chapters organized sequentially with 3 lessons each, clearly labeled and progressively complex
2. **Given** a user is on Lesson 1 of Chapter 1, **When** they scroll or use navigation, **Then** they can navigate to Lesson 2, 3, or the next chapter
3. **Given** a user opens any chapter, **When** they read the chapter introduction, **Then** they understand the prerequisites, learning objectives, and how this chapter fits into the overall journey
4. **Given** all lessons are created with proper frontmatter, **When** the site builds, **Then** Docusaurus sidebar auto-generates with correct ordering and nesting

---

### User Story 2 - Establish Content Guidelines (Priority: P2)

A content author needs clear guidelines on how to write lessons that meet the book's standards for clarity, accessibility, hands-on learning, and code quality.

**Why this priority**: Content guidelines ensure consistency across all chapters, maintain the brand voice, and enforce the constitutional principles (hands-on learning, progressive complexity, accessibility). This must be done before or concurrent with content authoring to maintain quality.

**Independent Test**: Can be fully tested by creating a sample lesson using the guidelines, having reviewers validate it against the checklist, and confirming it meets constitution principles for accessibility, hands-on learning, and production-ready code.

**Acceptance Scenarios**:

1. **Given** a new contributor starts writing a lesson, **When** they read the content guidelines, **Then** they understand required sections, word count targets, code standards, and accessibility requirements
2. **Given** a lesson is submitted for review, **When** reviewers check against the guidelines, **Then** they can objectively verify compliance with formatting, code quality, and accessibility standards
3. **Given** a lesson is published, **When** a reader views it on any device, **Then** it meets Docusaurus standards for responsive layout, dark mode, and accessibility (alt-text, WCAG AA compliance)

---

### User Story 3 - Implement Docusaurus Organization (Priority: P3)

A DevOps/content engineer needs to configure Docusaurus to properly organize, build, and deploy the Physical AI book with optimal performance and user experience.

**Why this priority**: This enables the book to be published and accessed by readers. It's important but happens after content structure and guidelines are defined. Good Docusaurus setup multiplies the value of content through search, versioning, and localization readiness.

**Independent Test**: Can be fully tested by building and locally deploying the Docusaurus site, verifying all pages load in <2 seconds, search returns relevant results, and the sidebar navigation is correct and accessible.

**Acceptance Scenarios**:

1. **Given** all content files are in place, **When** running the build command, **Then** the site builds successfully in <5 minutes with no errors or warnings
2. **Given** a reader uses the search function, **When** they search for a technical term, **Then** relevant results appear from multiple chapters with correct context snippets
3. **Given** a reader visits the site on mobile, **When** they navigate chapters and lessons, **Then** the layout is responsive, readable, and the sidebar is accessible via hamburger menu

---

### Edge Cases

- What happens when a lesson is longer than the word limit? (Must be split into sub-lessons or restructured)
- How does the system handle code examples that are platform-specific (Raspberry Pi vs simulation)? (Use Docusaurus tabs for alternatives)
- What if a prerequisite chapter changes significantly after dependent chapters are written? (Update links and dependency notation in affected lessons)

## Requirements *(mandatory)*

### Functional Requirements - Book Structure

- **FR-001**: Book MUST contain exactly 5 chapters, each with exactly 3 lessons (15 total lessons)
- **FR-002**: Each chapter MUST have a sequential number (Ch. 1-5) and a descriptive title
- **FR-003**: Each lesson MUST have a clear title, description, learning objectives, and difficulty level (Beginner/Intermediate/Advanced)
- **FR-004**: Chapters MUST be ordered by progressive complexity (Chapter 1 = Beginner, Chapter 5 = Intermediate/Advanced)
- **FR-005**: Each chapter MUST include an introduction explaining the chapter's purpose and its prerequisites
- **FR-006**: Book structure MUST be documented in a single source of truth that all content authors reference

### Functional Requirements - Content Guidelines

- **FR-007**: Content guidelines MUST specify lesson structure: Intro, Concepts, Code Example, Hands-On Exercise, Troubleshooting, Next Steps
- **FR-008**: Guidelines MUST mandate word count: 2,000-5,000 words per lesson (excluding code)
- **FR-009**: Guidelines MUST require all code examples to include: proper error handling, security best practices, type hints, docstrings, and PEP 8 compliance
- **FR-010**: Guidelines MUST specify that every code example be tested on target platform (Raspberry Pi 4) before publication
- **FR-011**: Guidelines MUST require: alt-text for all images, captions for all diagrams, and WCAG AA accessibility compliance
- **FR-012**: Guidelines MUST define the brand voice requirements: encouraging, clear, curious, honest, inclusive, pragmatic
- **FR-013**: Guidelines MUST include hardware budget constraints and require budget alternatives for every project

### Functional Requirements - Docusaurus Organization

- **FR-014**: Docusaurus MUST be configured to use docs-based structure (content in `/docs` directory)
- **FR-015**: Chapter directories MUST follow pattern: `/docs/chapter-N-title/` with Markdown files named `lesson-1.md`, `lesson-2.md`, `lesson-3.md`
- **FR-016**: Every Markdown file MUST include frontmatter with: title, description, sidebar_position, difficulty, prerequisites, duration_minutes
- **FR-017**: Sidebar MUST auto-generate from frontmatter with correct nesting and ordering
- **FR-018**: Site MUST be configured for search with keyword indexing on lesson titles, concepts, and code examples
- **FR-019**: Build process MUST optimize for performance: <2 second page load time (95th percentile), static asset optimization
- **FR-020**: Site MUST support dark mode with all code blocks and diagrams readable in both light and dark themes
- **FR-021**: Mobile navigation MUST include hamburger menu for sidebar access on screens <768px width

### Functional Requirements - Links and Navigation

- **FR-022**: Each lesson MUST link to the next lesson and previous lesson (if exists)
- **FR-023**: Each chapter introduction MUST link to all 3 lessons within that chapter
- **FR-024**: Chapter pages MUST display estimated reading time and difficulty level for each lesson

### Key Entities

- **Chapter**: A major topic area with 3 related lessons; has title, description, learning objectives, prerequisites
- **Lesson**: An individual learning unit with theory, code examples, exercises; has difficulty level, duration, prerequisites
- **Content**: Textual explanation, code samples, diagrams, exercises for a lesson; must follow guidelines
- **Navigation**: Sidebar structure, breadcrumbs, next/previous links enabling reader movement through book

## Success Criteria *(mandatory)*

### Measurable Outcomes - Content Structure

- **SC-001**: All 15 lessons (5 chapters × 3 lessons) are created with complete titles, descriptions, and learning objectives
- **SC-002**: Each chapter's lessons demonstrate clear progression in difficulty and build on prior lessons in the chapter
- **SC-003**: Chapter prerequisites are documented and validated: each chapter (2-5) can specify prerequisites from earlier chapters
- **SC-004**: Readers can identify the reading time for each lesson (calculated from word count and code complexity)

### Measurable Outcomes - Content Quality

- **SC-005**: 100% of published lessons follow the defined content guidelines (verified via automated checklist)
- **SC-006**: All code examples run without modification on Raspberry Pi 4+ (tested quarterly)
- **SC-007**: All lessons are WCAG AA accessible: alt-text for images, proper heading hierarchy, readable color contrast
- **SC-008**: Brand voice is consistent: reviewers using the voice checklist approve 90%+ of content on first submission

### Measurable Outcomes - Docusaurus Implementation

- **SC-009**: Average page load time is <2 seconds for 95th percentile of users on typical internet connection
- **SC-010**: Site builds successfully in <5 minutes with zero build warnings
- **SC-011**: Search functionality returns relevant results for 90% of technical queries (validated via test queries)
- **SC-012**: Mobile navigation works correctly on screens 320px-1024px width with all content readable

### Measurable Outcomes - Reader Experience

- **SC-013**: Readers report 4/5+ satisfaction on "ease of following the chapter progression"
- **SC-014**: Reader feedback indicates content meets the "beginner to intermediate" accessibility target
- **SC-015**: GitHub issues/discussions related to navigation and content clarity are resolved within 1 week

## Assumptions

- Docusaurus 3.x LTS will be used for site generation
- Content is primarily written in Markdown with embedded code blocks
- Target readers have basic Python knowledge and access to internet during initial setup
- Physical projects will use Raspberry Pi 4 or newer as the primary platform
- Hardware alternatives will be documented for each project but not fully tested
- The book will be published as an open-source project on GitHub
- Build process will use Node.js and npm for dependency management

---

## Physical AI Book Structure: 5 Chapters, 3 Lessons Each

### **Chapter 1: Foundations of Physical AI** (Difficulty: Beginner)

Introduction to Physical AI concepts, robotics basics, and the book's learning approach. Readers understand what Physical AI is, why it matters, and what they'll build.

**Chapter Prerequisites**: Basic Python knowledge (loops, functions, basic data types)

#### Lesson 1.1: What is Physical AI? (Beginner)

**Description**: Introduction to Physical AI as the intersection of artificial intelligence and robotics. Covers autonomous agents, embodied cognition, and real-world applications (healthcare robotics, agricultural automation, autonomous vehicles). Why AI needs a body to learn effectively from the world.

**Learning Objectives**:
- Define Physical AI and distinguish it from traditional AI
- Identify real-world applications of Physical AI
- Understand why embodied learning matters
- Set expectations for hands-on learning style

**Hardware Budget**: $0 (no hardware required for this lesson)

---

#### Lesson 1.2: Your First Robot Simulator (Beginner)

**Description**: Set up the learning environment using a free, browser-based robot simulator. Install Python, required libraries (numpy, matplotlib), and run your first simulation. No hardware yet—focus on environment setup and core concepts (sensors, actuators, feedback loops).

**Learning Objectives**:
- Install Python and required dependencies
- Run a simulation in the robot simulator
- Understand the simulation architecture
- Recognize the sensor-brain-actuator loop

**Hardware Budget**: $0 (simulator only)

**Hands-On Project**: Get a virtual robot moving in a simulated environment

---

#### Lesson 1.3: Core Concepts: Sensors, Brains, and Actuators (Beginner)

**Description**: Deep dive into the three core components of any physical system. Understand how sensors gather data, how a "brain" (control logic or AI) processes that data, and how actuators execute commands. Examples from nature (biological systems) and artificial systems. Create simple control algorithms to make the simulator respond.

**Learning Objectives**:
- Explain sensor types and how they work
- Design simple control logic (if-then-else rules)
- Understand actuator commands and feedback
- Model a complete sensorimotor loop

**Hardware Budget**: $0 (simulator only)

**Hands-On Project**: Write a controller that makes the simulated robot avoid obstacles

---

### **Chapter 2: Building Your First Robot** (Difficulty: Beginner/Intermediate)

Assemble a simple wheeled robot with basic sensors. Focus on mechanical assembly, electrical connections, and basic motor control. First hands-on experience with real hardware.

**Chapter Prerequisites**: Chapter 1 complete (understanding of sensors, actuators, control loops)

#### Lesson 2.1: Choosing and Assembling the Robot Platform (Beginner/Intermediate)

**Description**: Guide to selecting an appropriate robot platform (budget options: DIY kit on $40 platform vs. commercial $150 option). Step-by-step assembly guide with photos/diagrams. Understanding mechanical principles: wheels, drive systems, weight distribution. Includes troubleshooting common assembly issues.

**Learning Objectives**:
- Evaluate robot platform options based on budget and learning goals
- Follow assembly instructions with attention to detail
- Understand basic mechanical principles
- Test physical assembly for proper operation

**Hardware Budget**: $40-$150 (assembly kit with motors, wheels, chassis)

**Hands-On Project**: Assemble a functional wheeled robot

---

#### Lesson 2.2: Wiring and Powering Your Robot (Beginner/Intermediate)

**Description**: Electrical connections for motors, sensors, and microcontroller (Raspberry Pi). Understand power distribution, GPIO pins, I2C/serial communication. Safety practices with batteries and power supplies. Testing electrical connections without risk of damage. Includes platform-specific tabs for different robot choices.

**Learning Objectives**:
- Safely wire motors and sensors to a microcontroller
- Understand power requirements and battery selection
- Configure GPIO pins for input/output
- Test connections systematically for safety

**Hardware Budget**: Included in 2.1 (power management components)

**Hands-On Project**: Connect all hardware, verify power distribution, test GPIO

---

#### Lesson 2.3: Programming Motor Control (Intermediate)

**Description**: Write Python code to control robot motors using PWM (Pulse Width Modulation). Start with simple forward/backward movement, then add turning logic. Understand speed control through duty cycle. Implement emergency stop. Test on physical robot with safety measures.

**Learning Objectives**:
- Explain PWM and duty cycle concepts
- Write functions to control motor speed and direction
- Implement safe startup/shutdown sequences
- Debug motor behavior through testing

**Hardware Budget**: Included in 2.1 (motor control components already assembled)

**Hands-On Project**: Program your robot to move forward, turn, and stop reliably

---

### **Chapter 3: Sensor Integration and Decision-Making** (Difficulty: Intermediate)

Add sensors (distance, line-following, environmental) and write logic to make robots respond to their environment. Move from scripted behavior to reactive control.

**Chapter Prerequisites**: Chapter 2 complete (robot assembly and basic motor control)

#### Lesson 3.1: Reading Sensors (Intermediate)

**Description**: How different sensors work: ultrasonic distance sensors, infrared sensors, line followers, IMU (accelerometer/gyroscope). Read raw sensor values, filter noise, and interpret data. Calibrate sensors for accurate readings. Understand sensor limitations and error sources.

**Learning Objectives**:
- Explain how different sensor types detect their environment
- Read sensor data from GPIO/I2C/serial interfaces
- Implement noise filtering and calibration
- Identify sensor limitations and failure modes

**Hardware Budget**: $20-50 (sensor modules)

**Hands-On Project**: Calibrate and read all robot sensors; log data for analysis

---

#### Lesson 3.2: Reactive Control Logic (Intermediate)

**Description**: Write control algorithms that respond to sensor inputs. Build a robot that avoids obstacles using distance sensors. Implement line-following using IR sensors. Understand state machines. Combine multiple sensors for complex decisions. Troubleshoot control logic through systematic testing.

**Learning Objectives**:
- Design and implement reactive control algorithms
- Use state machines to manage robot behavior
- Combine sensor inputs for complex decision-making
- Test and debug control logic systematically

**Hardware Budget**: Included in 3.1 (already purchased sensors)

**Hands-On Project**: Robot successfully avoids obstacles OR follows a line

---

#### Lesson 3.3: Building a Simple Navigation System (Intermediate)

**Description**: Enable the robot to navigate a simple environment. Combine multiple sensor inputs and motor commands into a coherent navigation strategy. Implement crude path planning using waypoints or grid-based navigation. Create a map of the environment based on sensor data. Test in different environments.

**Learning Objectives**:
- Integrate multiple sensors for navigation
- Create simple environmental maps from sensor data
- Implement goal-seeking behavior
- Test navigation robustness in real environments

**Hardware Budget**: Included in 3.1 (no new hardware)

**Hands-On Project**: Robot navigates from point A to point B in an unknown environment

---

### **Chapter 4: Machine Learning Basics** (Difficulty: Intermediate/Advanced)

Introduce machine learning as the "brain" that learns from data. Start with simple supervised learning, move to learning from interaction. Collect real data from the robot.

**Chapter Prerequisites**: Chapter 3 complete (sensor integration and reactive control)

#### Lesson 4.1: Learning from Data: Classification (Intermediate/Advanced)

**Description**: Collect sensor data from the robot in different scenarios. Train a simple classifier (e.g., decision tree or k-nearest neighbors) to recognize environments or situations. Use libraries like scikit-learn. Move from hand-crafted rules (Chapter 3) to learned patterns. Understand overfitting and generalization.

**Learning Objectives**:
- Collect and label training data from robot sensors
- Train a simple classifier
- Evaluate model performance on test data
- Understand overfitting and generalization
- Deploy model on robot for online inference

**Hardware Budget**: Included in Chapter 3 (reuse existing robot)

**Hands-On Project**: Train a model to classify robot environments; use it to guide robot decisions

---

#### Lesson 4.2: Learning from Interaction: Reinforcement Learning Intro (Intermediate/Advanced)

**Description**: Introduction to reinforcement learning (RL) concepts: agent, environment, reward, policy. Implement a simple RL algorithm (Q-learning or policy gradient) on the robot. Let the robot learn to solve a simple task (navigate to goal, collect objects). Understand reward shaping.

**Learning Objectives**:
- Explain reinforcement learning concepts
- Implement a simple RL algorithm
- Design appropriate reward functions
- Train an RL agent on a physical robot
- Understand challenges of real-world RL

**Hardware Budget**: Included in Chapter 3 (reuse existing robot)

**Hands-On Project**: Robot learns to complete a task (e.g., reach a goal) through interaction

---

#### Lesson 4.3: Combining Learning and Control (Advanced)

**Description**: Integrate learned models with reactive control logic. Use learned perception to improve robot decisions. Understand transfer learning: train in simulation, adapt to real world. Implement a hybrid system where RL handles high-level decisions, reactive control handles safety.

**Learning Objectives**:
- Integrate learned models with control logic
- Implement safety constraints in RL
- Adapt models from simulation to real robots
- Design hybrid systems that learn and react

**Hardware Budget**: Included in Chapter 3 (no new hardware)

**Hands-On Project**: Hybrid system that learns task-specific behavior while maintaining safe reactive control

---

### **Chapter 5: Advanced Applications and Next Steps** (Difficulty: Advanced)

Real-world applications: multi-robot systems, manipulation (grippers), advanced computer vision, cloud robotics. Prepare readers to pursue their own projects.

**Chapter Prerequisites**: Chapters 1-4 complete (full foundation in Physical AI)

#### Lesson 5.1: Multi-Robot Coordination (Advanced)

**Description**: Extend single-robot learning to multiple agents. Coordinate teams of robots to accomplish goals (exploration, coverage, collaborative manipulation). Understand communication between robots, consensus algorithms, and emergent behavior. Simulate before deploying on real robots. Deploy on 2-3 physical robots.

**Learning Objectives**:
- Design communication protocols for multi-robot systems
- Implement coordination algorithms
- Understand emergent behavior and stability
- Test and debug multi-robot systems
- Handle robot failures gracefully

**Hardware Budget**: $80-200 (1-2 additional robot units)

**Hands-On Project**: 2-3 robots collaborate to explore an environment or accomplish a shared goal

---

#### Lesson 5.2: Perception and Manipulation (Advanced)

**Description**: Add computer vision (camera + object detection) to the robot. Add manipulation (gripper/arm). Combine learning with more complex physical interactions. Understand sim-to-real transfer for vision models. Build a system that detects objects and physically interacts with them.

**Learning Objectives**:
- Implement computer vision pipelines for object detection
- Control grippers/manipulators
- Integrate perception and manipulation
- Implement sim-to-real transfer for vision
- Debug physical interaction failures

**Hardware Budget**: $50-150 (camera + gripper module)

**Hands-On Project**: Robot detects and retrieves specific objects in an unstructured environment

---

#### Lesson 5.3: Your Own Physical AI Project (Advanced)

**Description**: Capstone lesson guiding readers to design and implement their own Physical AI project. Framework for defining problem, designing solution, implementing MVP, testing, and iterating. Showcase community projects. Roadmap for continuing learning: advanced topics (SLAM, neural networks, cloud robotics), career paths, research opportunities.

**Learning Objectives**:
- Define a feasible Physical AI project
- Plan implementation and identify milestones
- Integrate multiple concepts from the book
- Test and iterate on a real system
- Articulate next learning steps

**Hardware Budget**: Depends on project (guidance provided)

**Hands-On Project**: Implement and demonstrate a novel Physical AI system

---

## Content Guidelines and Lesson Format

### Lesson Structure (All Lessons Follow This)

Every lesson MUST include these sections in this order:

1. **Learning Objectives** (3-5 bullet points)
   - What readers will be able to do after this lesson
   - Use action verbs: understand, implement, debug, explain
   - Testable and specific

2. **Prerequisites** (clear and linked)
   - Exact lessons that must be completed first
   - Software/hardware needed
   - Prior knowledge assumed

3. **Introduction** (300-500 words)
   - Hook: why this matters and what we're building
   - Real-world context or use case
   - What readers will accomplish
   - How this fits into the larger journey

4. **Core Concepts** (1,000-1,500 words)
   - Theory explained in accessible language
   - Diagrams and visual explanations
   - Analogies from everyday life
   - Multiple learning modalities (text, visuals, code)

5. **Code Example** (50-200 lines total)
   - Complete, runnable example
   - Proper error handling and comments
   - Type hints and docstrings
   - Platform-specific variations (if applicable) in tabs
   - Tested on actual hardware/platform

6. **Hands-On Exercise** (described, not fully coded)
   - Step-by-step instructions
   - Expected outcome clearly stated
   - Troubleshooting tips for common mistakes
   - Extensions/variations to explore

7. **Troubleshooting Section** (300-500 words)
   - Common mistakes and how to spot them
   - Platform-specific issues (Windows/Mac/Linux/Pi differences)
   - How to debug systematically
   - When to seek help (links to community resources)

8. **Next Steps** (3-5 bullet points)
   - How to extend this lesson
   - Related topics for deeper learning
   - Links to external resources (curated, accessible)
   - Preview of next lesson

### Writing Standards for All Lessons

**Accessibility Requirements**:
- All images MUST have descriptive alt-text (min 20 characters, describing the learning value)
- All diagrams MUST have text descriptions
- Code MUST have syntax highlighting with readable contrast in light and dark modes
- Maximum line length in code blocks: 80 characters (readability)
- Headings MUST follow proper hierarchy (no skipping H2→H4)
- Color MUST NOT be the only way to convey information

**Code Quality Requirements**:
- All code samples MUST run without modification
- All Python code MUST follow PEP 8
- All functions MUST have docstrings (Google or NumPy style)
- All parameters MUST have type hints
- Error handling REQUIRED (try-except, input validation)
- No hardcoded credentials, IP addresses, or PINs
- Dependencies MUST be versioned (e.g., numpy==1.21.0)

**Brand Voice Requirements** (lesson text MUST exemplify these):
- Encouraging tone: "You've got this!" not "This is complex"
- Avoid gatekeeping: no "obviously," "simply," "just"
- Conversational style: use "we" when problem-solving together
- Concrete examples: show code, don't just describe
- Honest about limitations: "This doesn't work perfectly, here's why"
- Acknowledge multiple valid approaches with tradeoffs

**Word Count**:
- Lesson body (excluding code, intro, objectives): 2,000-5,000 words
- Introduction: 300-500 words
- Core Concepts: 1,000-1,500 words
- Troubleshooting: 300-500 words
- Each section clearly marked to help authors track word count

**Hardware Budget Guidance**:
- Every lesson's hardware budget clearly stated upfront
- Budget alternative ALWAYS provided (≤$50 where possible)
- Links to where readers can purchase with notes on equivalent options
- Explanation of tradeoffs (e.g., "Cheaper sensor has slightly lower accuracy but sufficient for learning")

### Metadata Requirements (Frontmatter)

Every lesson Markdown file MUST include YAML frontmatter:

```yaml
---
title: "Lesson Title"
description: "One-sentence summary for search and preview"
sidebar_position: 1
difficulty: "Beginner" | "Intermediate" | "Advanced"
duration_minutes: 45
prerequisites: ["Lesson X.Y", "Basic Python"]
hardware_budget: "$XX-XX USD"
keywords: ["keyword1", "keyword2"]
---
```

---

## Docusaurus Organization Requirements

### Directory Structure

```
Physical AI Book (repository root)/
├── docs/
│   ├── chapter-1-foundations/
│   │   ├── _category_.json
│   │   ├── lesson-1-intro.md
│   │   ├── lesson-2-simulator.md
│   │   └── lesson-3-concepts.md
│   ├── chapter-2-building/
│   │   ├── _category_.json
│   │   ├── lesson-1-platform.md
│   │   ├── lesson-2-wiring.md
│   │   └── lesson-3-control.md
│   ├── chapter-3-sensors/
│   │   ├── _category_.json
│   │   ├── lesson-1-reading.md
│   │   ├── lesson-2-reactive.md
│   │   └── lesson-3-navigation.md
│   ├── chapter-4-learning/
│   │   ├── _category_.json
│   │   ├── lesson-1-classification.md
│   │   ├── lesson-2-reinforcement.md
│   │   └── lesson-3-hybrid.md
│   ├── chapter-5-advanced/
│   │   ├── _category_.json
│   │   ├── lesson-1-multi-robot.md
│   │   ├── lesson-2-manipulation.md
│   │   └── lesson-3-capstone.md
│   └── intro.md
├── static/
│   └── images/  (all images with descriptive filenames)
├── blog/
│   └── community-projects.md  (featured reader projects)
├── docusaurus.config.js
├── package.json
└── sidebars.js
```

### Key Docusaurus Configuration

**`_category_.json` for each chapter** (enables auto-collapsing sidebar):

```json
{
  "label": "Chapter 1: Foundations of Physical AI",
  "position": 1,
  "link": null,
  "collapsed": false
}
```

**`docusaurus.config.js` Requirements**:
- Docusaurus version: 3.x LTS
- Dark mode support enabled
- Search/algolia configured
- Mobile-responsive defaults
- Site metadata (title, description, favicon)
- Social links (GitHub, Discord, etc.)

**`sidebars.js` auto-generation**:
- Sidebars auto-generated from file structure and frontmatter
- Manual ordering via `sidebar_position` in frontmatter
- Chapters auto-collapse to show lessons
- Breadcrumb navigation enabled

**Build Optimization**:
- Static site generation for all content pages
- Image optimization (JPEG/WebP conversion)
- CSS/JS minification
- Bundle size target: <2MB initial load
- Lighthouse score target: 90+ for performance

### Search and Discoverability

**Search Configuration**:
- Full-text search on all lesson content
- Keyword metadata indexed per lesson
- Search results show context snippet (150 chars)
- Auto-complete suggestions for common queries

**Metadata for SEO**:
- Each lesson has `<meta description>` from frontmatter
- Social media previews with cover images
- Open Graph metadata configured
- Canonical URLs for content stability

### Accessibility Compliance

**WCAG AA Standards** (required for all content):
- All images have descriptive alt-text
- Heading hierarchy strictly followed (no H2→H4 jumps)
- Color contrast minimum 4.5:1 for text, 3:1 for graphics
- Keyboard navigation fully functional (tab through all interactive elements)
- Focus indicators visible and distinct
- Linked text descriptive (no "click here" links)
- Dark mode accessible (sufficient contrast maintained)

**Testing**:
- Automated accessibility audit (axe-core or similar) on every build
- Manual testing on screen readers (NVDA/JAWS)
- Keyboard-only navigation testing
- Mobile accessibility testing (screen reader + touch navigation)

### Performance Targets

- Page load time: <2 seconds (95th percentile on 4G)
- Build time: <5 minutes
- Mobile Lighthouse score: 90+
- Desktop Lighthouse score: 95+
- Images lazy-loaded below the fold
- Code block syntax highlighting: client-side (no server overhead)
