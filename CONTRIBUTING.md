# Contributing to Markdown Shop

Thank you for your interest in contributing! 🚀

## How to Contribute

- **Fork** the repository and create your branch from `develop`.
- **Describe** your changes clearly in your pull request.
- **Add tests** for new features or bug fixes when possible.
- **Lint** your code and ensure all tests pass before submitting.

## Development Setup

- **Node.js** 18+ and **npm** 9+
- Install dependencies: `npm install`
- Start the dev server: `npm run dev`

## Quality Checks

- Lint: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Format: `npm run format`
- Check formatting: `npm run format:check`

## Code Style

- Follow the existing code style and structure.
- Use clear, descriptive commit messages.

## Design System Requirements

- Follow [design-system.md](design-system.md) for all UI changes.
- Reuse semantic tokens from [src/theme/tokens.js](src/theme/tokens.js).
- Keep [src/theme/theme.js](src/theme/theme.js) as the single source for active MUI theme behavior.
- Validate light/dark parity and keyboard-visible focus before submitting.

## Reporting Issues

- Use the [issue templates](.github/ISSUE_TEMPLATE) for bugs or feature requests.
- Provide as much detail as possible.

## Security Issues

- Please do not report security vulnerabilities through public issues.
- See [SECURITY.md](SECURITY.md) for the preferred reporting process.

## Community

- Be respectful and inclusive.
- See our [Code of Conduct](CODE_OF_CONDUCT.md).

---

Happy contributing! 🎉
