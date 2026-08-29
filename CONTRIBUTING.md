# Contributing to Vaalilupaukset

Thank you for your interest in contributing! This document provides guidance on how to participate in the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- No harassment or discrimination

## Getting Started

1. **Read the README** — Understand the project structure and tech stack
2. **Clone and run locally** — Follow the setup instructions
3. **Explore the issues** — Look for [good-first-issues](../../labels/good-first-issue) or areas you'd like to improve

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/Vaalilupaukset.git
cd Vaalilupaukset

# Create a feature branch
git checkout -b feature/your-feature-name

# Install and run
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

## Making Changes

### Branch naming
- `feature/add-x` — New features
- `fix/issue-x` — Bug fixes
- `docs/improve-x` — Documentation updates
- `refactor/improve-x` — Code refactoring
- `test/add-x` — Test additions

### Commit messages
Use conventional commits:
```
feat: add election year selector
fix: resolve CORS issue with API
docs: update README with new endpoints
refactor: simplify party list rendering
test: add tests for election service
```

### Code style
- Use consistent indentation (2 spaces)
- Follow existing patterns in the codebase
- Format code with your editor's built-in formatter
- Run linting: `npm run lint --prefix client`

## Submitting Changes

### Before you commit
1. Test locally: `npm run dev`
2. Build production: `npm run build --prefix client`
3. Check for console errors or warnings
4. Verify your feature works as intended

### Push and create a PR
```bash
git push origin feature/your-feature-name
```

Then open a pull request on GitHub with:
- **Clear title** — what does it do?
- **Description** — why is this change needed?
- **Screenshots** (if UI changes) — show what it looks like
- **Testing notes** — how did you test this?

### PR checklist
- [ ] Code follows project style
- [ ] Tests pass locally
- [ ] No console errors
- [ ] Commits are descriptive
- [ ] README or docs updated (if needed)

## Areas We Need Help With

### Frontend
- Improve responsive design for mobile
- Add more interactive features
- Enhance accessibility (WCAG compliance)
- Add animated charts for data visualization

### Backend
- Add authentication system
- Implement promise suggestion moderation
- Add caching for performance
- Improve error handling and validation

### Data & Integration
- Connect to real election data sources (YLE, FSD, Statistics Finland)
- Parse and import candidate information
- Add promise source tracking
- Build economic indicator API integrations

### Documentation
- Improve code comments and docstrings
- Create API documentation
- Write architecture guide
- Create deployment guide

### Testing
- Add unit tests for API endpoints
- Add integration tests for database queries
- Add end-to-end tests for user workflows
- Improve test coverage

## Running Tests

```bash
# Linting (frontend)
npm run lint --prefix client
```

(Unit tests coming soon!)

## Reporting Issues

Found a bug or have a feature request?

1. **Check existing issues** — avoid duplicates
2. **Provide context** — how to reproduce, what you expected, what happened
3. **Include details** — OS, Node version, browser, etc.
4. **Be descriptive** — the more info, the easier to fix

## Questions?

- **Open an issue** for questions or discussions
- **Check GitHub Discussions** for similar topics
- **Look at existing code** for patterns and examples

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

Thank you for making Vaalilupaukset better! 🎉
