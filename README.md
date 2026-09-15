# Surge Global Senior Web Developer Technical Assessment
## NŌTA Homepage Engineering Rebuild & Headless Architecture

> **Live Production Deployment**: [frontend-production-e0da.up.railway.app](https://frontend-production-e0da.up.railway.app/)  
> **Headless CMS (Strapi v5)**: [backend-production-19ec.up.railway.app/admin](https://backend-production-19ec.up.railway.app/admin)  
> **Reference Prototype**: [NŌTA by Uprock](https://nota.uprock.pro/)

---

## 1. Executive Summary & Architecture Overview

This project is a pixel-accurate, high-performance rebuild of the **NŌTA** homepage engineered to enterprise standards. Built as a decoupled multi-service system deployed on Railway, the solution couples a **Next.js 16 (React 19)** frontend with a self-hosted **Strapi v5 headless CMS** backed by **PostgreSQL**.

## 2. Technical Stack Rationale

| Layer | Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16 (App Router)** | Zero-bundle-size React Server Components (RSC), native image optimization, streaming SSR, and edge route handlers. |
| **UI & Motion** | **Tailwind CSS v4 + Framer Motion** | GPU-accelerated spring physics for continuous scroll scrub, utility-first styling with zero runtime CSS-in-JS overhead. |
| **Headless CMS** | **Strapi v5 (TypeScript)** | Schema-driven content modeling with Dynamic Zones, lifecycle hooks, and automated reviewer bootstrapping. |
| **Database** | **PostgreSQL (Railway Managed)** | ACID-compliant relational storage for structured CMS schemas, component dynamic zones, and form submissions. |
| **Cache & Revalidation** | **Next.js On-Demand ISR** | Instant cache invalidation via tagged fetches (`revalidateTag('homepage')`), eliminating redundant rebuilds while maintaining static edge speed. |

---

## 3. Engineering Highlights & Key Technical Challenges

### A. Physics-Based Scroll Choreography & Coordinate Transitions
Replicating the reference site's signature scroll interactions without performance degradation required custom keyframe math and hardware-accelerated transforms:
- **Zero-Jank Sticky Pinning**: Leveraged CSS `position: sticky` inside tracked viewport containers rather than heavy JavaScript DOM manipulation or layout thrashing.
- **Continuous Scroll Scrubbing**: Utilized Framer Motion's `useScroll` combined with `useSpring` (stiffness: 120, damping: 24) to smooth scroll input and eliminate micro-stutters across high-refresh displays.
- **Section Transition Handover ("Who It's For" → "Smart Paper")**:
  - **Phase 1**: Three audience categories slide in sequentially while preserving introductory manifesto readability.
  - **Phase 2**: White pen card enters from the bottom-right viewport quadrant (`left: ~37%`, `top: 50vh`).
  - **Phase 3**: Card expands to true full-bleed (`100vw` × `100vh`, `border-radius: 0px`) showcasing the horizontal pen profile.
  - **Phase 4**: Card recedes into an upper-center dark container (`#383938`, `top: 12vh`) while the pen graphic fades to `opacity: 0` (`scale: 0.85`), disappearing completely.
  - **Phase 5**: The white "Works with smart paper" cover rises flush over the container with zero vertical black gap.

### B. Decoupled Content Modeling & On-Demand ISR
Content is modeled in Strapi using reusable components and Dynamic Zones rather than monolithic rich text:
- **Componentized Zones**: Editors can independently modify Headlines, Product Specs, Audience Profiles, Smart Paper Slide Walkthroughs, Color Finishes, and Box Contents.
- **Instant Cache Invalidation (`/api/revalidate`)**: When an editor publishes updates in Strapi, a secure webhook triggers Next.js tag-based revalidation (`revalidateTag("homepage")`), instantly delivering updated content to users with zero downtime or redeployment delay.
- **Resilient Pre-Order Pipeline (`/api/submit`)**: Validates customer email formats server-side, rate-limits submissions, and safely stores pre-orders into Strapi's `form-submissions` collection with fallback error states.

### C. Accessibility & Performance Engineering
- **Accessible Motion (`prefers-reduced-motion`)**: Integrated `useReducedMotion` hooks that cleanly bypass scroll-driven transforms for users with vestibular sensitivities, presenting readable static layouts.
- **SEO & Search Indexing Guards**: Server-rendered metadata and OpenGraph tags dynamically populated from Strapi, configured with `<meta name="robots" content="noindex, nofollow" />` per assessment guidelines.
- **GPU Layer Optimization**: Applied CSS `will-change` properties exclusively to active transform properties (`transform`, `opacity`, `border-radius`) and utilized hardware compositing (`translate3d`) to ensure a consistent 60+ FPS scroll performance.

---

## 4. Reviewer Quick-Start & CMS Access

To ensure frictionless review, an automated bootstrap script (`backend/src/index.ts`) pre-seeds super-admin accounts on initial server start:

### Pre-Provisioned Reviewer Accounts

| Reviewer Name | Email / Login | Username | Password | Access Role |
| :--- | :--- | :--- | :--- | :--- |
| **Kavinda Kobbekaduwe** | `kavinda.kobbekaduwe@surge.global` | `kavinda_surge` | `SurgeReviewer2026!` | Super Admin |
| **Kavisha** | `kavisha@surge.global` | `kavisha_surge` | `SurgeReviewer2026!` | Super Admin |
| **Samith** | `samith@surge.global` | `samith_surge` | `SurgeReviewer2026!` | Super Admin |

- **Local Admin Portal**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **Production Admin Portal**: [https://backend-production-19ec.up.railway.app/admin](https://backend-production-19ec.up.railway.app/admin)

---

## 5. Local Development Setup

### Prerequisites
- **Node.js**: `>= 20.x`
- **npm**: `>= 10.x`
- **Git**

### 1. Repository Setup
```bash
git clone https://github.com/Shakeeb980998/nota-homepage-rebuild.git
cd nota-homepage-rebuild
```

### 2. Backend Service (Strapi CMS v5)
```bash
cd backend
npm install
npm run develop
```
- Strapi runs at `http://localhost:1337`
- Content API: `http://localhost:1337/api/homepage?populate=deep`

### 3. Frontend Service (Next.js 16)
```bash
cd ../frontend
npm install
npm run dev
```
- Frontend application runs at `http://localhost:3000`

---

## 6. AI-Assisted Engineering Methodology

In strict alignment with the assessment guidelines, AI tools were leveraged with engineering discipline—treating AI models as specialized pair programmers to maximize productivity while maintaining complete human ownership over architecture, security, and verification.

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Senior Engineering AI Workflow                     │
│                                                                        │
│  ┌───────────────────────┐    Planning & Specs    ┌─────────────────┐  │
│  │ OpenAI ChatGPT (GPT4o)│ ─────────────────────► │ Technical Spec  │  │
│  └───────────────────────┘                        └────────┬────────┘  │
│                                                            │           │
│  ┌───────────────────────┐    Schema & Architecture        ▼           │
│  │ Anthropic Claude 3.7  │ ─────────────────────► ┌─────────────────┐  │
│  └───────────────────────┘                        │ Next.js/Strapi  │  │
│                                                   │   Contracts     │  │
│  ┌───────────────────────┐   Implementation       └────────┬────────┘  │
│  │ Google DeepMind       │ ◄───────────────────────────────┘           │
│  │ Antigravity (Gemini)  │ ──► [Build] ──► [Verify] ──► [Deploy]       │
│  └───────────────────────┘                                             │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Google DeepMind Antigravity (Gemini)
- **Role**: Primary Agentic Workspace & Codebase Execution Engine.
- **Contributions**:
  - Direct shell-level pairing, build inspection, and iterative refactoring in the local repository.
  - Reverse-engineered scroll triggers and CSS keyframes from reference DOM snapshots.
  - Implemented multi-stage spring physics animations in Framer Motion.
  - Automated Turbopack compilation runs, TypeScript type-checking, and continuous Railway deployments.

### 2. Anthropic Claude (Claude 3.5 / 3.7 Sonnet)
- **Role**: Architectural Design, Schema Strategy & Accessibility Lead.
- **Contributions**:
  - Structured Strapi v5 Dynamic Zones and modular content schemas for maximum editorial flexibility.
  - Authored headless bootstrap seeder (`backend/src/index.ts`) for reviewer provisioning.
  - Refactored component state machines and implemented strict responsive layouts with Tailwind CSS.
  - Designed semantic markup and `useReducedMotion` accessibility fallbacks.

### 3. OpenAI ChatGPT / GPT (GPT-4o)
- **Role**: Requirements Breakdown, Edge Validation & Editorial Data Structuring.
- **Contributions**:
  - Parsed unstructured reference copy and specifications into structured CMS JSON seed fixtures.
  - Formulated regex edge-case tests and server validation logic for pre-order submissions (`/api/submit`).
  - Drafted technical rationale, architecture decision records (ADRs), and reviewer onboarding documentation.

---

## 7. Architectural Trade-Offs & Production Roadmap

### Key Trade-Offs Evaluated
1. **Turbopack Decoupled Monorepo vs. Unified App**: Kept `frontend` and `backend` as independent subprojects to enable independent CI/CD triggers, zero-downtime microservice deployments on Railway, and isolated environment configurations.
2. **Dynamic Zones vs. Strict Single-Type Fields**: Opted for Dynamic Zones in Strapi CMS to afford non-technical editors full page-building versatility while maintaining TypeScript strict contract validation on the Next.js frontend.
3. **Hardware CSS Composition vs. Canvas/WebGL**: Selected DOM + SVG + Framer Motion spring physics over full Three.js Canvas to optimize initial Time to Interactive (TTI), reduce battery drain on mobile devices, and retain crisp vector typography.

### Future Production Roadmap
- **Interactive 3D WebGL Model**: Integrate Three.js / React Three Fiber for full 360° interactive pen rotation during the hero/specs showcase.
- **Internationalization (i18n)**: Enable multi-locale localization via Strapi's native i18n plugin paired with Next.js localized routing.
- **End-to-End Automated Testing**: Implement Playwright test suites covering critical user journeys (modal pre-order submissions, scroll triggers, and responsive breakpoint verification).\n
