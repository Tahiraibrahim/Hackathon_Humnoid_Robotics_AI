# Quickstart: Developer Guide for Physical AI Book Site

**Date**: 2025-12-05
**Feature**: Physical AI Book Structure
**Phase**: Phase 1 - Design & Artifacts
**Audience**: Developers, Content Authors, DevOps

---

## Quick Links

- **Repository**: `https://github.com/[org]/physical-ai-book`
- **Live Site**: `https://[org].github.io/physical-ai-book`
- **Issues & Feedback**: `https://github.com/[org]/physical-ai-book/issues`
- **Discussions**: `https://github.com/[org]/physical-ai-book/discussions`

---

## Prerequisites

- **Node.js**: 18.x or newer ([download](https://nodejs.org/))
- **npm**: 9.x or newer (comes with Node.js)
- **Git**: For version control ([download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([download](https://code.visualstudio.com/))
- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)

Verify installation:

```bash
node --version
npm --version
git --version
```

---

## Local Development Setup (5 minutes)

### 1. Clone Repository

```bash
git clone https://github.com/[org]/physical-ai-book.git
cd physical-ai-book
```

### 2. Install Dependencies

```bash
npm install
```

This installs Docusaurus, React, and all plugins (one-time setup).

### 3. Start Development Server

```bash
npm start
```

Output:
```
Docusaurus website is running at: http://localhost:3000
```

Open `http://localhost:3000` in your browser. Site will auto-reload when you save changes.

### 4. Build Production Site (Optional)

```bash
npm run build
```

Generates optimized static site in `/build` directory. Use for local testing before deployment.

---

## File Structure Overview

```
physical-ai-book/
├── docs/                              # Content (Markdown files)
│   ├── 01-chapter-foundations/
│   │   ├── _category_.json           # Chapter metadata
│   │   ├── 01-lesson-intro.md        # Lesson 1
│   │   ├── 02-lesson-simulator.md    # Lesson 2
│   │   └── 03-lesson-concepts.md     # Lesson 3
│   ├── 02-chapter-building/          # (similar structure)
│   ├── ... chapters 3-5
│   └── intro.md                      # Site intro/homepage
├── static/
│   └── images/                       # All images (PNG, JPG, etc.)
├── src/
│   ├── pages/
│   │   └── index.js                  # Custom landing page
│   └── css/
│       └── custom.css                # Custom styling
├── docusaurus.config.js              # Site configuration
├── sidebars.js                       # Sidebar navigation
├── package.json                      # Dependencies
└── README.md                         # Developer docs
```

---

## Writing a Lesson (Template)

### 1. Create Markdown File

Create: `docs/01-chapter-foundations/01-lesson-intro.md`

### 2. Use Lesson Template

```markdown
---
title: "Lesson Title"
description: "One-sentence summary for search results"
sidebar_position: 1
difficulty: "Beginner"
duration_minutes: 45
prerequisites:
  - "Basic Python knowledge"
hardware_budget: "$0"
keywords:
  - "keyword1"
  - "keyword2"
---

## Learning Objectives

By the end of this lesson, you will be able to:
- Objective 1
- Objective 2
- Objective 3

## Prerequisites

Before starting this lesson, you should:
- Know about X
- Be able to Y

## Introduction

Why this matters. Real-world context. What you'll accomplish.
(300-500 words)

## Core Concepts

### Concept 1: Title

Explanation...

### Concept 2: Title

Explanation...

(1,000-1,500 words total)

## Code Example

Here's a working example you can run:

\`\`\`python
def example_function(param1: str, param2: int) -> str:
    """
    Brief description of what this does.

    Args:
        param1: Description of param1
        param2: Description of param2

    Returns:
        Description of return value
    """
    # Implementation
    return result
\`\`\`

(50-200 lines total)

## Hands-On Exercise

Step 1: Do this task
Step 2: Then do this
Step 3: Verify this result

## Troubleshooting

**Problem**: [Common issue]
**Solution**: [How to fix it]

**Problem**: [Platform-specific issue]
**Solution**: [How to fix it]

## Next Steps

- Extension idea 1
- Extension idea 2
- [Preview of next lesson]
```

### 3. Add Images (Optional)

Place images in `static/images/` directory.

Reference in Markdown:

```markdown
![Alt text describing the image for screen readers](/images/motor-diagram.png)
```

**Important**: Alt text must be ≥ 20 characters and describe the learning value.

### 4. Local Testing

1. Save file
2. Dev server auto-reloads
3. Visit `http://localhost:3000/docs/chapter-1-foundations/lesson-1-intro`
4. Check rendering, links, code blocks

### 5. Validation Checklist

Before committing, verify:

- [ ] Frontmatter complete and valid
- [ ] All 8 required sections present
- [ ] Word count 2,000-5,000 (excluding code)
- [ ] All code examples tested and runnable
- [ ] All images have descriptive alt-text
- [ ] No hardcoded secrets or credentials
- [ ] Links to other lessons are correct
- [ ] Markdown renders without errors

### 6. Commit & Push

```bash
git add docs/01-chapter-foundations/01-lesson-intro.md
git commit -m "docs: add Lesson 1.1: What is Physical AI?"
git push origin main
```

GitHub Actions automatically builds and deploys!

---

## Code Block Best Practices

### Python Syntax Highlighting

\`\`\`python
def motor_control(speed: float) -> None:
    """Control motor speed with PWM."""
    pwm_value = int(speed * 255)  # Map to 0-255
    gpio.PWM(motor_pin, pwm_value)
\`\`\`

### Command Line / Bash

\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Run the example
python example.py
\`\`\`

### Configuration (YAML)

\`\`\`yaml
robot:
  motors: 2
  sensors:
    - distance
    - line_follower
\`\`\`

### Data Format (JSON)

\`\`\`json
{
  "lesson": 1,
  "difficulty": "Beginner",
  "duration_minutes": 45
}
\`\`\`

---

## Adding New Chapters

Only for post-hackathon use. Chapters are fixed during hackathon (5 total).

To add Chapter 6 later:

1. Create directory: `docs/06-chapter-new/`
2. Create `_category_.json` with position 6
3. Create 3 lesson files within it
4. Update `sidebars.js` (usually auto-generated)

---

## Editing Existing Lessons

### 1. Checkout Branch

```bash
git checkout -b fix/lesson-1-typo
```

### 2. Edit Lesson

Open lesson file and make changes. Dev server auto-reloads.

### 3. Test Locally

```
http://localhost:3000/docs/chapter-X-title/lesson-Y-title
```

### 4. Commit & Push

```bash
git add docs/01-chapter-foundations/01-lesson-intro.md
git commit -m "fix: correct typo in Lesson 1.1 introduction"
git push origin fix/lesson-1-typo
```

### 5. Create Pull Request

On GitHub, create PR from your branch to `main`. Team reviews and merges.

---

## Accessibility Checklist

Every lesson must pass these accessibility checks:

### Visual

- [ ] Alt-text on all images (min 20 chars)
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Heading hierarchy correct (H2 → H3, no gaps)
- [ ] Dark mode: text still readable

### Interactive

- [ ] All links have descriptive text (not "click here")
- [ ] Keyboard navigation: Tab through all elements
- [ ] No content only in images

### Code

- [ ] Code examples have syntax highlighting
- [ ] Copy button works (built-in)
- [ ] Code text readable in dark mode

### Testing

Run locally:

```bash
npm run build
npm run serve

# Then visit http://localhost:3000 and test with keyboard only
# (no mouse; use Tab to navigate)
```

---

## Search & Discoverability

Your lesson automatically appears in search because of:

1. **Frontmatter**: `title`, `description`, `keywords`
2. **Content**: All markdown text is indexed
3. **Indexing**: Docusaurus runs search indexing at build time

Test search:

1. Visit site homepage
2. Click search icon (top right)
3. Type "physical AI" or lesson title
4. Verify lesson appears in results

---

## Performance Tips

### Image Optimization

Before adding images:

```bash
# Compress image
pngquant --quality=75-90 image.png
# or
convert image.jpg -quality 80 image.jpg
```

Images should be < 500KB each.

### Build Time Monitoring

After significant changes:

```bash
npm run build
# Look for: "✓ Generated X static files"
# Time should be < 5 minutes
```

If build is slow, check for:
- [ ] Large images (< 500KB each)
- [ ] Too many code blocks per lesson
- [ ] External API calls (shouldn't happen)

---

## Common Tasks

### Rename a Lesson

1. Rename file: `01-lesson-intro.md` → `01-lesson-what-is-ai.md`
2. Update sidebar ordering (if filename position changes)
3. Update links in other lessons pointing to old name

### Add Code from Repository

If code lives in separate GitHub repo:

1. Create symlink: `static/code/` → external repo
2. Or: copy code into `/static/code/` during build

### Change Site Colors

Edit `docusaurus.config.js`:

```javascript
const config = {
  // ...
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      // ...
    },
  },
};
```

Then rebuild: `npm run build`

### Update Site Metadata

Edit `docusaurus.config.js`:

```javascript
const config = {
  title: 'Physical AI Book',
  tagline: 'A Hands-On Guide to AI-Powered Robotics',
  url: 'https://your-site.com',
  baseUrl: '/physical-ai-book/',
};
```

---

## Deployment

### Automatic Deployment (GitHub Pages)

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Live site updates at: `https://[org].github.io/physical-ai-book`

Check status:

```bash
# On GitHub, go to: Actions tab → latest workflow
```

### Manual Deployment (if needed)

```bash
# Build locally
npm run build

# Deploy to GitHub Pages
npm run deploy
```

(Requires GitHub credentials)

---

## Troubleshooting

### Problem: Dev server won't start

```
Error: Port 3000 already in use
```

**Solution**:
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Problem: Images not showing

**Solution**:
- Image file must be in `static/images/`
- Path must start with `/`: `/images/myimage.png` (not `./`)
- File name must be lowercase
- Supported formats: PNG, JPG, GIF, SVG

### Problem: Build fails

```
Error: Cannot find module X
```

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: Search not working

**Solution**:
- Wait 5+ minutes after site deployment
- Clear browser cache: Ctrl+Shift+Delete
- Rebuild site: `npm run build && npm start`

### Problem: Accessibility audit failing

```
Error: Color contrast 3:1, need 4.5:1
```

**Solution**:
- Use WebAIM contrast checker: https://webaim.org/resources/contrastchecker/
- Update colors in CSS or Docusaurus theme config
- Test in both light and dark modes

---

## Getting Help

1. **Documentation**: Read repo `README.md`
2. **Docusaurus Docs**: https://docusaurus.io/docs
3. **GitHub Issues**: Search existing issues or create new one
4. **GitHub Discussions**: Q&A forum for community
5. **Discord**: (Post-hackathon community channel)

---

## Next Steps

After setting up locally:

1. **Create first lesson**: Follow "Writing a Lesson" section above
2. **Run local build**: `npm run build` (verify no errors)
3. **Test accessibility**: Use keyboard-only navigation
4. **Commit & push**: Submit PR for review
5. **Celebrate**: 🎉 Your lesson is live!

---

## Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Docusaurus | https://docusaurus.io/ | Site framework |
| Markdown Guide | https://www.markdownguide.org/ | Markdown syntax |
| WebAIM | https://webaim.org/ | Accessibility testing |
| Lighthouse | https://developers.google.com/web/tools/lighthouse | Performance audits |
| Git Guide | https://git-scm.com/book/en/v2 | Version control |
| Node.js | https://nodejs.org/ | JavaScript runtime |

---

Good luck, and happy content creation! 🚀
