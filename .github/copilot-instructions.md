# GitHub Copilot Instructions

Use this file as the source of truth for working in the Markdown Shop codebase. Prefer the repository contents over external assumptions.

## Project Summary

Markdown Shop is a modern React 18 + Vite application for building and customizing GitHub README files. The app provides templates, icons, GitHub stats components, a markdown editor with live preview, and export/embed options. Styling is primarily Material UI (MUI) with Emotion, with motion effects via Framer Motion.

## Tech Stack

- React 18, Vite 5
- Material UI (MUI) + Emotion
- React Router
- Framer Motion
- Zustand (state)
- Marked + DOMPurify (markdown parsing and sanitization)
- ESLint + Prettier

## Development Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Format: `npm run format`

## Architecture and Key Paths

- Entry: `src/main.jsx`
- App shell and routing: `src/App.jsx`
- Pages: `src/pages/` (Home, Components, Output, TemplatesPage)
- Features: `src/features/` (github, markdown, templates)
- Components: `src/components/` (UI building blocks and page sections)
- State: `src/store/useShopStore.jsx`
- Theme: `src/theme/theme.js`
- Global styles: `src/styles/index.css`
- Static data: `src/assets/data/`

## Path Aliases (Vite)

- `@` -> `src`
- `@components` -> `src/components`
- `@store` -> `src/store`
- `@utils` -> `src/utils`
- `@theme` -> `src/theme`
- `@config` -> `src/config`

## UI/UX Guidelines

- Maintain a clean, modern, and responsive layout.
- Use MUI components and semantic tokens from `src/theme/tokens.js` and theme behavior from `src/theme/theme.js` for consistency.
- Prefer subtle motion via Framer Motion; avoid heavy or distracting animations.
- Respect accessibility: semantic HTML, focus states, keyboard navigation, and ARIA where needed.
- Keep interactions snappy and predictable; ensure components work in light and dark themes.

## Coding Standards

- Use functional React components and hooks.
- Keep components focused and reusable.
- Prefer existing utilities and hooks before introducing new ones.
- Use PropTypes for runtime checks where appropriate (project already uses it).
- Avoid direct DOM manipulation; use React patterns instead.

## Content and Data

- Templates and icons are sourced from `src/assets/data/`.
- Markdown output should be sanitized with DOMPurify.
- When adding new templates or badges, update the data JSON and reuse existing rendering patterns.

## Deployment and Performance

- Vite build with code splitting configured in `vite.config.js`.
- Keep bundle size reasonable; lazy-load pages and heavy components.

## When Adding New UI

- Place shared components in `src/components/ui/` where possible.
- For feature-specific UI, place under `src/features/<feature>/components/`.
- Update routes via `src/routes/index.js` if new pages are introduced.

# Design System & UI Guidelines

Refer to `design-system.md` for detailed design tokens, color palette, typography, and component patterns. When implementing UI components, always reference the design system for consistency.

---

## Expectations for Copilot

- Be precise, minimal, and consistent with the current code style.
- Do not introduce new libraries without a clear benefit.
- Treat `design-system.md` as the Wisdom Fox source of truth for UI decisions.
- If requirements are unclear, ask a concise question before implementing.
