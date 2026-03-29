# PROJECT_CONTEXT.md — warunaslfi.com

## Overview
Personal developer portfolio for Waruna Bandara Rathnamalala (Full-Stack Developer). Single-page portfolio designed to stand out from AI-generated generic portfolios through clean architecture, intentional design, and interactive elements.

## Tech Stack & Why
- **Next.js 15 (App Router):** SSR/SSG, SEO optimization, industry standard React framework
- **TypeScript (strict mode):** Type safety across the entire codebase, skill showcase
- **Tailwind CSS 4:** Utility-first styling, fast iteration, consistent design system
- **Motion (formerly Framer Motion):** React-native animation library for scroll-triggered reveals, page transitions, hover effects
- **Vercel:** Best-in-class Next.js hosting with edge functions and analytics

## Architecture Decisions
- **Content/data separated from components:** All project, experience, and skills data lives in `src/data/` with full TypeScript types
- **CSS variables for theming:** Dark theme with emerald/teal accent, all colors defined as HSL CSS variables
- **Utility function pattern:** `cn()` helper combining `clsx` + `tailwind-merge` for conditional classNames
- **Custom hooks:** `useScrollSpy` for active section tracking on scroll
- **Font:** Open Sans via `next/font/google` for all text (headings + body)

## Folder Structure
```
src/
├── app/              # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Card, Badge)
│   ├── sections/     # Page sections (Hero, About, Experience, Projects, Skills, Contact)
│   ├── layout/       # Header, Footer, Navigation
│   └── shared/       # Shared components (SectionHeading, AnimatedText)
├── lib/
│   ├── utils.ts      # cn() helper
│   ├── constants.ts  # Site config (name, links, nav items)
│   └── types.ts      # TypeScript interfaces for all data structures
├── data/
│   ├── projects.ts   # Project data array
│   ├── experience.ts # Work experience data
│   └── skills.ts     # Skills/tech stack data
├── hooks/
│   └── useScrollSpy.ts
└── styles/
    └── fonts.ts      # Open Sans font configuration
```

## Current Status
- **Phase 1 COMPLETE:** Project initialization, folder structure, data layer, type definitions, font setup, color system
- **Next:** Phase 2 — Hero section with terminal-style animation

## Phases
1. ~~Project Initialization & Architecture Setup~~ ✓
2. Hero Section (terminal animation, typing effect)
3. About Section
4. Experience Section (timeline)
5. Projects Section (cards with hover effects)
6. Skills Section (categorized grid)
7. Contact Section
8. Polish (animations, transitions, responsive, SEO)
9. Deployment (Vercel, domain, analytics)
