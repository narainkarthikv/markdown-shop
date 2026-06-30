# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

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

[Unreleased]: https://github.com/narainkarthikv/markdown-shop/compare/v1.1.2...HEAD
[1.1.2]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.1.2
[1.1.1]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.1.1
[1.0.3]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.0.3
[1.0.2]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.0.2
[1.0.1]: https://github.com/narainkarthikv/markdown-shop/releases/tag/v1.0.1
