# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-10-17

### Added

- Added contributor avatars with staggered motion to the Contributors SVG preview.

### Changed

- Modernized GitHub profile SVG components, including repository summaries for all owned public repositories, excluding forks.
- Refined activity, follower, badge, milestone, stats, and profile banner layouts, and removed the redundant GitHub Metrics component.

## [Unreleased]

### Added

### Changed

## [1.5.1] - 2026-10-16

### Fixed

- Kept the React icon available in the initial tech stack selection and displayed the active GitHub profile username after loading components.
- Updated the GitHub integration test to verify the username is sent to the GitHub API.

## [1.5.0] - 2026-10-16

### Added

- Added themed GitHub profile SVG components and a data-driven profile summary banner, with small, medium, and large preview sizes and SVG downloads.
- Added reusable preview dialogs with descriptions, copy/insert actions, and size controls for generated SVGs.
- Added a responsive README workspace with section navigation, editor/preview views, and draft controls.
- Added a shared design token API for semantic colors, spacing, typography, radii, motion, layout, and controls, with matching CSS variables.

### Changed

- Reworked the home page into a responsive SaaS-style landing page with a README preview, feature overview, workflow, and focused calls to action.
- Replaced the global collapsible navigation drawer with direct desktop links and a persistent mobile navigation row; refreshed the shared footer and aligned its repository links to `main`.
- Updated GitHub component layouts and SVG presentation for responsive sizing, and kept Activity & Contributions expanded.
- Limited initial tech stack icon rendering to the first 25 icons, with search-driven results for other icons.

## [1.4.1] - 2026-10-15

### Fixed

- Updated Playwright E2E coverage to match the current GitHub settings and icon selection UI, verify draft clearing correctly, and test clipboard copies deterministically.

## [1.4.0] - 2026-10-14

### Added

- Added native GitHub profile and repository components backed by public GitHub API data, with optional personal access token support and explicit username update/refresh controls.
- Added standalone, cacheable SVG endpoints for GitHub components, with Vercel and Netlify routing and usage documentation for Markdown, HTML, and scripts.
- Added direct Components, Templates, and Prompts shortcuts beside the Markdown Editor heading while retaining sidebar navigation.

### Changed

- Moved GitHub username entry from the Markdown shop to the Components page. GitHub data is fetched only after the user submits the username with **Update components**.
- Replaced third-party GitHub component embeds with native SVG snapshots and clarified the limits of public activity and profile data.

## [1.3.0] - 2026-07-22

### Added

- Added automatic local draft persistence for markdown content, GitHub username, selected icons, and selected README sections.
- Added a `Clear Draft` control in the markdown editor to reset the saved local draft and selected sections.

### Changed

- Updated the preview action button styling so the eye icon matches the bordered blue copy and insert action buttons.

## [1.2.0] - 2026-07-20

### Fixed

- Updated Playwright E2E tests: adjusted navigation.spec.ts selectors to match the current Home Hero heading and CTA label (`Open Builder`) so navigation checks are stable; re-ran `npm run test:e2e` — all 24 tests now pass.

### Added

- Added a template section selector to the markdown editor for quickly inserting common README sections.
- Added reusable section preset data and a `useSectionPresets` hook to append selected sections without duplicating existing selections.
- Persisted selected README sections in the shop store so section choices survive page reloads.

## [1.1.3] - 2026-07-18

### Fixed

- Fixed markdown editor and preview containers scrollability in `/shop` section
  - Added `minHeight: 0` to flex containers to enable proper scrolling
  - Replaced MUI TextField with native textarea for reliable scroll behavior
  - Updated Paper background color to match outer container for consistent design
  - Ensured both containers scroll independently with proper overflow handling
  - Improved responsive layout for mobile devices

## [1.1.2] - 2026-06-30

### Fixed

- Corrected local Sora font asset paths from `/fonts/Sora/static/*` to `/static/*` in preload and `@font-face` declarations to resolve Vite build-time font warnings.

## [1.1.1] - 2026-06-29

### Fixed

- Resolved strict lint failures by removing unused imports in template/prompt card implementations and applying formatting fixes in shared quick actions/components.
- Updated Playwright E2E specs to align with the current UI behavior and selectors (drawer navigation, theme toggle/store assertions, markdown editor targeting, and template action flows).
- Stabilized `test:e2e` expectations around current non-persistent editor/username route behavior so the suite reflects actual app state handling.

## [1.1.0] - 2026-06-29

### Added

- Playwright end-to-end (E2E) testing infrastructure with comprehensive test coverage
- 7 test suites covering navigation, theming, markdown editing, GitHub integration, components, templates, and export features
- E2E test scripts: `npm run test:e2e`, `test:e2e:ui`, `test:e2e:debug`, `test:e2e:headed`
- Playwright configuration for chromium browser with CI/CD integration
- Test documentation and best practices guide (`tests/e2e/README.md`)
- GitHub Actions CI workflow documentation (`CI_WORKFLOW.md`, `CI_FIXES.md`)

### Fixed

- **CI/CD Workflow**: Fixed GitHub Actions conditions for proper branch handling
  - Changed PR branch condition from `github.ref_name` (wrong for PRs) to `github.base_ref` (correct target branch)
  - Added missing `main` branch to push trigger (was only triggering on develop pushes)
  - Separated smoke tests and full E2E tests to prevent duplicate runs
  - Fixed condition evaluation for edge cases (e.g., PR to main now properly triggers full tests)
  - Improved artifact naming with unique `github.run_id` identifiers
  - Updated artifact paths to include `blob-report` for comprehensive test coverage

## [1.0.3] - 2026-06-12

### Added

- Extracted `QuickActions` component (`src/components/ui/QuickActions.jsx`) and replaced duplicated action groups across template and prompt cards.

### Changed

- Unified action UI for templates and prompts to use contained `ButtonGroup` with small icon buttons for Copy/Use and an IconButton for Preview.

### Fixed

- Removed duplicated `TemplateActions` implementation and repaired JSX/prop issues introduced during refactor.

### Added

- Extracted `QuickActions` component (`src/components/ui/QuickActions.jsx`) and replaced duplicated action groups across template and prompt cards.

### Changed

- Unified action UI for templates and prompts to use contained `ButtonGroup` with small icon buttons for Copy/Use and an IconButton for Preview.

### Fixed

- Removed duplicated `TemplateActions` implementation and repaired JSX/prop issues introduced during refactor.

## [1.0.2] - 2026-06-12

### Fixed

- Standardized quick-action icons (preview, copy, insert) across template and prompt cards to improve spacing, alignment and accessibility.

### Changed

- Extracted actions into a shared component (`src/components/ui/TemplateActions.jsx`) to reduce duplication and ensure consistent behavior.

## [1.0.1] - 2026-05-23

### Added

- Extracted `QuickActions` component (`src/components/ui/QuickActions.jsx`) and replaced duplicated action groups across template and prompt cards.

### Changed

- Unified action UI for templates and prompts to use contained `ButtonGroup` with small icon buttons for Copy/Use and an IconButton for Preview.

### Fixed

- Removed duplicated `TemplateActions` implementation and repaired JSX/prop issues introduced during refactor.

## [1.0.2] - 2026-06-12

### Fixed

- Standardized quick-action icons (preview, copy, insert) across template and prompt cards to improve spacing, alignment and accessibility.

### Changed

- Extracted actions into a shared component (`src/components/ui/TemplateActions.jsx`) to reduce duplication and ensure consistent behavior.

## [1.0.1] - 2026-05-23

### Fixed

- Resolved blocking ESLint failures by removing stale `eslint-disable` directives and cleaning unused imports/variables.
- Corrected syntax regressions in `TemplateCard` and `PromptCard` prop-type declarations.
- Fixed Vite compression plugin configuration to use `brotliCompress`, removing build-time compression path errors.

### Security

- Patched vulnerable dependency tree via `npm audit fix`, including DOMPurify upgrade to `3.4.5`.
- Reduced vulnerabilities from `22` (including `1 critical`) to `5` (no critical; remaining issues are in bundled `npm` under release tooling).

### Added

- Initial Markdown Shop application foundation.
- Icons and badges components, including icon/badge data sources.
- README templates support with drawer and template expansion.
- Output enhancements such as auto-populated icons and badges.
- GitHub README components including SVG graphics and trophy-related sections.
- Dark mode support.
- Landing/home page sections and ongoing UI feature additions.
- Devcontainer and release workflow files.
- Community and OSS docs (issue templates, PR template, contribution/community files).

### Changed

- Bundler/tooling migration from CRA-style setup to Vite + React architecture.
- Significant project refactors into modular components and feature-based structure.
- Repeated UI/UX improvements across home, templates, output, and component pages.
- Templates grid/cards/search interactions refined for responsiveness and usability.
- Codebase modernization and readability refactors across multiple releases.
- Design system alignment for Wisdom Fox conventions (semantic tokens, light/dark parity, shared theme usage).

### Fixed

- Workflow and runner interaction fixes.
- Runtime and Vite/deployment script fixes.
- Template behavior/function fixes and bug removals in components.
- Responsiveness corrections across layouts.
- ESLint/prettier and code-quality cleanup fixes.
- SEO and metadata adjustments.
- Multiple stability and regression fixes after major refactors.

### Documentation

- README updates across releases (setup, structure, contributor guidance, and feature updates).
- PR template and issue template improvements.
- Release/changelog/community metadata updates.

### Refactored

- Large-scale structural refactors for modularity and maintainability.
- Home page and core feature files repeatedly reorganized for clarity.
- Theme and UI consistency refactors for long-term maintainability.

[Unreleased]: https://github.com/narainkarthikv/markdown-shop/compare/v1.5.1...HEAD
[1.5.1]: https://github.com/narainkarthikv/markdown-shop/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.5.0
[1.3.0]: https://github.com/narainkarthikv/markdown-shop/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/narainkarthikv/markdown-shop/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.1.2
[1.1.1]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.1.1
[1.0.3]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.0.3
[1.0.2]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.0.2
[1.0.1]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.0.1
