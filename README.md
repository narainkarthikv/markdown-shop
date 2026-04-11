# Markdown Shop

[![License](https://img.shields.io/github/license/narainkarthikv/markdown-shop)](./LICENSE)
[![Version](https://img.shields.io/github/package-json/v/narainkarthikv/markdown-shop)](./package.json)
[![Last Commit](https://img.shields.io/github/last-commit/narainkarthikv/markdown-shop)](https://github.com/narainkarthikv/markdown-shop/commits/develop)
[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/markdown-shop)](https://github.com/narainkarthikv/markdown-shop/issues)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/markdown-shop)](https://github.com/narainkarthikv/markdown-shop/stargazers)

**Structure your README with confidence. Build clean, ready-to-publish documentation using guided templates and live previews.**

Markdown Shop is a React 18 + Vite web app that helps you assemble professional README files using templates, badges, GitHub stats components, and a live markdown editor. The output is sanitized and ready to copy or embed.

## ✨ Features

- **Live Markdown Preview**: Edit and see results instantly
- **Templates Library**: Prebuilt README templates to customize fast
- **Badges and Icons**: Shields, skill icons, and banners out of the box
- **GitHub Stats Components**: Activity, streaks, metrics, and more
- **Embed and Copy**: Grab markdown or embed snippets in seconds
- **Theme Aware UI**: Clean light and dark modes
- **Responsive Layout**: Works smoothly across desktop and mobile

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Local Installation

````bash
# Clone the repository
git clone https://github.com/narainkarthikv/markdown-shop.git
cd markdown-shop

# Install dependencies
npm install

# Start development server
npm run dev

Visit **http://localhost:5173** to use the app.

### Production Build

```bash
npm run build
npm run preview
````

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite 5** - Fast dev server and build tool
- **Material UI + Emotion** - Component styling and theming
- **Framer Motion** - Page transitions and motion effects
- **React Router** - App routing

### Markdown and Data

- **Marked** - Markdown parsing
- **DOMPurify** - Sanitized HTML output
- **Zustand** - State management

### Tooling

- **ESLint + Prettier** - Code quality
- **Semantic Release** - Automated releases
- **Web Vitals** - Optional perf reporting in dev

## 🎨 Wisdom Fox Design System

- This project follows the Wisdom Fox design system in [design-system.md](./design-system.md).
- Ensure UI changes support both light and dark modes with visible focus states.

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,materialui,javascript" alt="Tech Stack" />
</p>

## 📁 Project Structure

```
markdown-shop/
├── public/
├── src/
│   ├── assets/data/       # Templates and icon catalogs
│   ├── components/        # UI components and sections
│   ├── features/          # GitHub stats, markdown, templates
│   ├── pages/             # Routes (Home, Components, Output, Templates)
│   ├── routes/            # Route definitions
│   ├── store/             # Zustand store
│   ├── styles/            # Global styles
│   ├── theme/             # Theme tokens and configuration
│   ├── utils/             # Helpers and loaders
│   ├── App.jsx            # App shell and routing
│   └── main.jsx           # App entry point
├── index.html
└── vite.config.js
```

## 🔑 Environment Variables

Markdown Shop does not require any environment variables for local development.

## 🧪 Development

### Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build
npm run lint          # Lint code
npm run lint:fix      # Auto-fix lint issues
npm run format        # Format src files
npm run format:check  # Check formatting
npm run analyze       # Bundle analysis
npm run clean         # Remove build cache
npm run release       # Semantic release
```

### Formatting (Prettier)

Run these from the repository root so Prettier checks both frontend and backend:

```bash
# Check formatting
npx prettier --check .

# Write formatting fixes
npx prettier --write .
```

## 🤝 Contributing

Contributions are welcome. Please review the guidelines before submitting changes.

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

## 🔗 Links

- **Live Demo**: https://markdownshop.netlify.app/
- **Repository**: https://github.com/narainkarthikv/markdown-shop

### Contribution workflow (detailed)

- Ensure your code passes linting: `npm run lint -- --fix`

5. **Stage and commit**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch and provide a clear description
   - Reference any related issues (e.g., "Closes #42")
   - Wait for maintainer review and feedback

### Types of Contributions We Welcome

- 🎯 **New Features** — Add functionality that improves README creation
- 🐛 **Bug Fixes** — Help us squash bugs and improve stability
- 📖 **Documentation** — Improve guides, comments, and examples
- 🎨 **UI/UX Improvements** — Make the interface more beautiful and intuitive
- ⚡ **Performance** — Optimize speed and efficiency
- 🧪 **Tests** — Add unit or integration tests
- 🌍 **New Templates** — Create amazing README templates for the community

---

## 👥 Contributors

Thanks to everyone who has helped make Markdown Shop awesome! 💪

<a href="https://github.com/narainkarthikv/markdown-shop/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=narainkarthikv/markdown-shop" />
</a>

See the [Contributors Page](https://github.com/narainkarthikv/markdown-shop/blob/main/Contributors.md) for the full list.

### How to Add Yourself

When your PR is merged, add yourself to the `Contributors.md` file following the format in that file.

---

## Support

If you find Markdown Shop helpful:

- ⭐ **Star the repository** on GitHub
- 🐛 **Report bugs** through [Issues](https://github.com/narainkarthikv/markdown-shop/issues)
- 💡 **Suggest features** in [Discussions](https://github.com/narainkarthikv/markdown-shop/discussions)
- 📢 **Share** Markdown Shop with your network
- 💬 **Participate** in community discussions

### Special Thanks

A heartfelt thank you to:

- [`Ileriayo`](https://github.com/Ileriayo) for the [Markdown Badges](https://github.com/Ileriayo/markdown-badges)
- [`tandpfun`](https://github.com/tandpfun) for the [Skill Icons](https://github.com/tandpfun/skill-icons)
- The React and Material UI communities for their amazing tools

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](./LICENSE) file for full details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

---

## 🔗 Quick Links

- **Production:** [markdownshop.netlify.app](https://markdownshop.netlify.app/)
- **Development:** [markdownshop-dev.vercel.app](https://markdownshop-dev.vercel.app/)
- **GitHub Repository:** [narainkarthikv/markdown-shop](https://github.com/narainkarthikv/markdown-shop)
- **Issues:** [Report a bug or request a feature](https://github.com/narainkarthikv/markdown-shop/issues)
- **Discussions:** [Join the community](https://github.com/narainkarthikv/markdown-shop/discussions)
- **Contributing Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Code of Conduct:** [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- **Security Policy:** [SECURITY.md](./SECURITY.md)
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)

---

## 📚 Additional Resources

- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [Shields.io - Badge Creation](https://shields.io/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Material UI Documentation](https://mui.com/)

---

## 💡 Final Thoughts

We're building **Markdown Shop** as a community-driven tool to help developers create professional, engaging GitHub README files with ease. Your code, ideas, and feedback make it stronger every day.

Whether you're fixing a typo, improving performance, adding a new template, or building amazing features — **every contribution matters!** 🏗️💚

Made with ❤️ by the Wisdom Fox community

Let's build the best README builder together! 🚀

---
