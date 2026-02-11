# AgentBox Landing Page — Agent Working Doc

Marketing site for AgentBox, the hosting platform for agentic workloads.

**Live site:** https://diggerhq.github.io/agentbox-site-2 (GitHub Pages)
**Product app:** https://app.agentbox.sh
**Docs:** https://agentbox.mintlify.app/introduction

## Project Structure

```
agentbox-site-2/
├── index.html       # Single-page landing (370 lines) — all content lives here
├── style.css        # Complete stylesheet (907 lines) — design system + responsive
├── script.js        # Client-side JS (77 lines) — mobile menu, scroll animations
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment (push to main = auto-deploy)
```

**This is a vanilla HTML/CSS/JS site. No build tools, no bundler, no package manager, no dependencies.** Files are deployed as-is to GitHub Pages.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations) |
| Interactivity | Vanilla ES6 JavaScript |
| Fonts | Google Fonts — Inter (body), JetBrains Mono (code) |
| Deployment | GitHub Pages via Actions |

## Design System

### Colors (CSS custom properties in `:root`)

```
--bg: #09090b           Dark background
--bg-subtle: #111114    Subtle variant
--bg-card: #16161a      Card surfaces
--border: #27272a       Default borders
--border-light: #3f3f46 Light borders
--text: #fafafa         Primary text
--text-muted: #a1a1aa   Secondary text
--text-dim: #71717a     Tertiary text
--primary: #6366f1      Indigo (brand primary)
--primary-light: #818cf8
--primary-dark: #4f46e5
--accent: #8b5cf6       Purple (gradients, accents)
--success: #34d399      Green (terminal output)
```

### Typography

- **Sans-serif:** `'Inter'` — weights 400, 500, 600, 700, 800
- **Monospace:** `'JetBrains Mono'` — weights 400, 500 (code blocks, terminal)
- Hero title uses `clamp()` for responsive sizing

### Component Patterns

- **Buttons:** `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-white`, `.btn-ghost-light` — each with `.btn-sm` / `.btn-lg` size variants
- **Cards:** `.feature-card`, `.sdk-card` — dark surface (`--bg-card`) with border, hover lift + glow
- **Code blocks:** `.terminal`, `.code-block` with syntax highlighting classes (`.kw`, `.str`, `.fn`, `.var`, `.num`, `.cmt`, `.prompt`, `.dim`, `.success`)
- **Sections:** Each major section uses `<section id="...">` for anchor navigation
- **Icons:** Inline SVGs throughout (no icon library)

## Page Sections (index.html)

| Lines | Section | ID | Description |
|-------|---------|-----|------------|
| 14–52 | Navigation | — | Fixed nav with blur backdrop, mobile hamburger menu |
| 54–113 | Hero | — | Headline, CTAs, terminal mockup showing CLI workflow |
| 115–182 | Features | `#features` | 6 feature cards in responsive grid |
| 184–265 | How It Works | `#how-it-works` | 3-step flow: Develop → Deploy → Execute & Monitor |
| 267–298 | SDK Reference | `#sdk` | 4 cards: Projects, Deployments, Sessions, API Keys |
| 300–319 | CTA | — | Final call-to-action with gradient background |
| 321–366 | Footer | — | Brand, product links, resource links, company links |

## JavaScript Behavior (script.js)

1. **Mobile menu toggle** (lines 1–18) — hamburger opens/closes nav, links auto-close menu
2. **Scroll animations** (lines 20–39) — IntersectionObserver adds `.visible` class at 10% threshold
3. **Staggered animation timing** (lines 41–62) — dynamically injects CSS for sequential card reveals
4. **Nav scroll effect** (lines 64–76) — darkens nav border after 50px scroll (passive listener)

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):
- **Trigger:** Push to `main` branch, or manual `workflow_dispatch`
- **Process:** Checkout → Upload artifact (root `/`) → Deploy to GitHub Pages
- **No build step** — static files served directly

To deploy: push to `main`. That's it.

## External Links & URLs

| Destination | URL |
|-------------|-----|
| App / Dashboard | https://app.agentbox.sh |
| Docs (Introduction) | https://agentbox.mintlify.app/introduction |
| Docs (Quickstart) | https://agentbox.mintlify.app/quickstart |
| Docs (CLI Reference) | https://agentbox.mintlify.app/cli |
| GitHub org | https://github.com/diggerhq |
| npm CLI | `@agentboxsh/cli` |
| npm SDK | `@agentboxsh/sdk` |

## Responsive Breakpoints (style.css)

| Breakpoint | Changes |
|-----------|---------|
| ≤1024px | Feature grid: 3→2 columns |
| ≤768px | Mobile nav, single-column layout, stacked steps |
| ≤480px | Stacked buttons, tighter spacing |

## CSS Architecture

```
Lines 1–53     Base reset, variables, body/container
Lines 55–145   Navigation (desktop + mobile)
Lines 147–227  Button system
Lines 228–410  Hero (background effects, terminal mockup)
Lines 412–442  Section headings
Lines 444–512  Feature cards
Lines 514–617  How It Works steps + code blocks
Lines 619–675  SDK reference cards
Lines 677–738  CTA section
Lines 740–805  Footer
Lines 807–830  Animations (@keyframes, .visible transitions)
Lines 832–906  Responsive media queries
```

## Coding Conventions

- **Class naming:** BEM-inspired (`nav-inner`, `hero-title`, `feature-card`, `btn-primary`)
- **No external dependencies** — keep it that way unless there's a strong reason
- **Inline SVGs** for all icons (no icon fonts or external sprite sheets)
- **CSS custom properties** for all colors — modify the theme by changing `:root` variables
- **Semantic HTML5** — `<section>`, `<nav>`, `<footer>`, `<article>`
- **Accessibility:** `aria-label` on interactive elements, semantic structure
- **Animations:** CSS transitions + IntersectionObserver (no JS animation libraries)

## Product Context

AgentBox is positioned as **"Vercel for AI agents."** This site is the marketing landing page for a real product — the source of truth for the product lives in `../agentbox-poc/`.

### What AgentBox Actually Is

A hosting platform where developers deploy AI agents that run in isolated cloud sandboxes. The core loop:

1. Developer writes an agent (TypeScript or Python) that uses the Anthropic SDK
2. `agentbox deploy` bundles and uploads the agent to the platform
3. Users/systems create **sessions** via SDK or API — each session spins up an E2B sandbox, downloads the agent artifact, injects environment variables, and runs the entrypoint
4. Logs stream in real-time via Axiom; token usage is tracked through a model proxy

### Architecture (what the site is marketing)

| Component | What It Does | Stack |
|-----------|-------------|-------|
| **API** | Session orchestration, deployment management, GitHub webhooks | Hono + PostgreSQL on Fly.io |
| **SDK** (`@agentboxsh/sdk`) | TypeScript client — `agentbox.sessions.create()`, `.logs()`, `.projects.*`, `.deployments.*`, `.apiKeys.*` |
| **CLI** (`@agentboxsh/cli`) | `login`, `init`, `deploy`, `sessions`, `logs` commands | Commander.js |
| **Dashboard** | Web UI for projects, deployments, sessions, logs, API keys, GitHub integration | TanStack Start + React 19 on Cloudflare Workers |
| **Model Proxy** | Sits between agents and Anthropic API, tracks token usage per session | Hono on Fly.io |
| **Log Shipper** | Go binary piped to agent stdout, batches lines to Axiom every 200ms | Go |
| **Sandboxes** | Isolated execution environments (30-min timeout) | E2B |

### Key Concepts to Get Right on the Site

- **Sessions** (not "runs" or "executions") — a session is one invocation of an agent with specific input. Sessions have statuses: pending → creating → running → completed/failed
- **Deployments** (not "releases") — a versioned snapshot of agent code. Each deploy increments the version number. Source can be CLI or GitHub
- **Projects** — a named container for deployments and sessions
- **API Keys** — JWT-based, stateless (no DB lookup for auth). Created in dashboard, used in SDK/CLI
- **Artifact** — tar.gz bundle of agent code uploaded to Cloudflare R2 via presigned URL

### SDK API Surface (for accurate code examples)

```typescript
import { Agentbox } from "@agentboxsh/sdk";
const ab = new Agentbox({ apiKey: "..." });

// Projects
ab.projects.create({ name }), .get(id), .list(), .delete(id)

// Deployments
ab.deployments.getUploadUrl(projectId)
ab.deployments.uploadArtifact(url, blob)
ab.deployments.create(projectId, { config }), .get(id), .list(projectId)

// Sessions
ab.sessions.create(projectId, { input })
ab.sessions.get(id), .list(projectId), .terminate(id)
ab.sessions.logs(id)  // → AsyncGenerator<string> (SSE)

// API Keys
ab.apiKeys.create(name), .list(), .delete(id)
```

### Agent-Side Environment Variables

Agents running inside sandboxes receive:
```
AGENTBOX_SESSION_ID       # Session identifier
AGENTBOX_SESSION_INPUT    # JSON string of session input
AGENTBOX_SESSION_URL      # API endpoint for metadata updates
AGENTBOX_SESSION_TOKEN    # Token for metadata endpoint
ANTHROPIC_API_KEY         # Proxy key (routes through model proxy)
ANTHROPIC_BASE_URL        # Points to proxy for token tracking
```

### CLI Workflow (shown in hero terminal)

```bash
npm install -g @agentboxsh/cli
agentbox login              # OAuth device flow via WorkOS
agentbox init               # Creates agentbox.toml (project name, entrypoint, runtime)
agentbox deploy             # Builds, tars, uploads to R2, creates deployment
agentbox sessions           # List sessions for project
agentbox logs <session-id>  # Stream SSE logs
```

### GitHub Auto-Deploy Flow

1. User installs AgentBox GitHub App on repo
2. Push to connected branch → webhook → build queued in PostgreSQL
3. Build runner creates E2B sandbox → clones repo → runs build command → creates artifact → uploads to R2
4. Deployment record created with commit SHA, message, author, branch
5. GitHub commit status updated (pending → success/failure)

### What the Site's Code Examples Should Reflect

The "How It Works" section shows three steps with real code. If updating these:

- **Develop step** should show agent code using `@anthropic-ai/sdk` (the Anthropic SDK, not the AgentBox SDK) reading from `process.env.AGENTBOX_SESSION_INPUT`
- **Deploy step** should show the CLI terminal output
- **Execute step** should show `@agentboxsh/sdk` creating a session and streaming logs

### Runtimes

- **Node.js 22** — entrypoint: `node main.js`
- **Python 3.12** — entrypoint: `python main.py`

## Guidelines

1. **Keep it vanilla** — no frameworks, no build tools, no npm
2. **Dark theme only** — the design is built around the dark palette
3. **Performance matters** — no heavy assets, lazy animations, passive listeners
4. **Mobile-first responsive** — test all changes at 480px, 768px, 1024px breakpoints
5. **Match the design language** — gradients from indigo to purple, glassmorphism, card-based layouts
6. **Use correct terminology** — sessions (not runs), deployments (not releases), projects (not apps)
7. **Code examples must be accurate** — match the real SDK/CLI API surface documented above
8. **Always ask before committing or pushing**
