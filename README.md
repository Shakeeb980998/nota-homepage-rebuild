# Surge Global Senior Web Developer Assessment: Homepage Rebuild

Rebuild of the [NŌTA](https://nota.uprock.pro/) homepage powered by self-hosted Strapi CMS and Next.js (React), designed for multi-service deployment on Railway.

---

## Architecture & Framework Rationale

### Frontend: Next.js 16 (React 19, TypeScript, Tailwind CSS, Framer Motion)
- **Why Next.js with React?**:
  - **Dynamic Server Rendering & SEO**: Generates server-side `<title>`, `<meta>` tags, and OpenGraph headers directly from Strapi CMS. Includes mandatory `<meta name="robots" content="noindex, nofollow" />`.
  - **Zero-Redeploy Live Updates**: Implemented `/api/revalidate` with `revalidateTag("homepage")` for instant on-demand cache revalidation when an editor publishes in Strapi without requiring code deployment.
  - **Form Validation & Resilience**: Built `/api/submit` to validate emails and persist user pre-orders directly into Strapi's `form-submissions` collection.
  - **Micro-interactions**: Recreated responsive navigation drawers, specifications tabs, interactive "Inside the box" accordion, color switcher, and reservation modals using Framer Motion and Tailwind CSS.

### Backend: Strapi CMS v5 (PostgreSQL on Railway, SQLite locally)
- **Modular Content Modeling**: Structured for editors using reusable components and Dynamic Zones rather than single large rich-text fields:
  - `HeroSection`: Headlines, CTA copy, pricing badge.
  - `SpecsSection`: Repeatable specification cards (Writing System, Optical Tracking, Digital Continuity).
  - `WhoItIsForSection`: Repeatable audience profiles (Students, Creators, Managers).
  - `SmartPaperSection`: Interactive feature slides with exact coordinate mapping details.
  - `InsideTheBoxSection`: Modular box item cards.
  - `ColorVariantsSection`: Interactive anodized aluminum finishes with hex codes and taglines.
  - `FormSubmissions`: Stores incoming pre-orders with email validation and status tracking.
- **Persistent Media**: Configured with Cloudinary / persistent volume mount so uploaded media survives container redeployments.
- **Automated Reviewer Accounts**: The `src/index.ts` bootstrap script pre-provisions super-admin accounts for:
  - `kavinda.kobbekaduwe@surge.global`
  - `kavisha@surge.global`
  - `samith@surge.global`
  - **Default Reviewer Password**: `SurgeReviewer2026!`

---

## Infrastructure on Railway

The application runs as 3 connected services in a single Railway project:
1. **Database Service**: Railway Managed PostgreSQL.
2. **Backend Service**: Strapi CMS Node.js service connected via Railway internal networking (`DATABASE_URL`).
3. **Frontend Service**: Next.js service linked to Strapi via `NEXT_PUBLIC_STRAPI_URL` and protected revalidation webhooks.

---

## Running Locally

### 1. Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### 2. Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```
- Strapi Admin URL: `http://localhost:1337/admin`
- API Endpoint: `http://localhost:1337/api/homepage`

### 3. Frontend (Next.js React)
```bash
cd frontend
npm install
npm run dev
```
- Frontend Site URL: `http://localhost:3000`

---

## Key Trade-Offs & Future Improvements

1. **Vite Pre-bundling vs. Monorepo Separation**: Kept `frontend` and `backend` as independent sub-projects to allow isolated zero-downtime deployments on Railway.
2. **Dynamic Zones vs. Strict Single-Type Fields**: Used Dynamic Zones to give editors maximum layout flexibility while keeping TypeScript strict contract safety on the frontend.
3. **With More Time**:
   - Add full 3D interactive Canvas using Three.js / React Three Fiber for the floating pen model.
   - Implement localized multi-language content support via Strapi i18n plugin.
   - Add automated E2E testing suite using Playwright.

---

## AI Tools Used

In accordance with the assessment guidelines encouraging the effective and disciplined use of AI tools, multiple state-of-the-art AI assistants were leveraged strategically across different phases of the project:

### 1. Google DeepMind Antigravity (Gemini)
- **Primary Agentic Workspace & Codebase Execution**: Served as the core pair-programming agent with direct filesystem, terminal, and build tool access.
- **Scroll Physics & Complex Choreography**: Reconstructed precision animations matching the reference site, including Framer Motion scroll scrubbing, multi-stage keyframed transforms, pinned viewports, and seamless section transitions (Who It's For $\to$ Smart Paper).
- **Reverse Engineering & Asset Inspection**: Programmatically inspected DOM structures, animation keyframe curves, and CSS rules from reference assets to replicate layout and timing faithfully.
- **Continuous Build & Verification Pipeline**: Automated Turbopack builds, TypeScript type-checking, git commit workflows, and Railway deployment checks to prevent regressions.

### 2. Anthropic Claude (Claude 3.5 / 3.7 Sonnet)
- **Component Architecture & Refactoring**: Designed clean React component boundaries, custom hooks, and modular UI state logic across Next.js 16 App Router.
- **Strapi CMS v5 Schema Modeling**: Structured headless backend models with reusable components and Dynamic Zones, along with bootstrap automation scripts (`src/index.ts`) for reviewer super-admin account provisioning.
- **Accessibility & Motion Considerations**: Integrated semantic HTML landmarks, ARIA attributes, and accessible motion fallback (`useReducedMotion`) for users sensitive to scroll transitions.
- **Responsive Layout & CSS Optimization**: Crafted fluid responsive design breakpoints using Tailwind CSS to guarantee visual parity across desktop, tablet, and mobile displays.

### 3. OpenAI ChatGPT / GPT (GPT-4o)
- **Project Scoping & Task Decomposition**: Analyzed assessment requirements, prioritized feature milestones, and organized delivery criteria.
- **Copywriting Extraction & Schema Mapping**: Extracted and structured editorial copy, product claims, technical specifications, and FAQ blocks from the original NŌTA website into structured JSON fixtures.
- **Edge-Case Validation**: Formulated server-side API validation routines for user pre-order submissions (`/api/submit`), ensuring resilient email validation and graceful error responses.
- **Documentation & Reviewer Onboarding**: Assisted in drafting technical rationale, architecture decision records (ADRs), and straightforward local setup guides.
