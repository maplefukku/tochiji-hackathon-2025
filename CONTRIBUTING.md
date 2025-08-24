# Contributing to Shibuya Live Canvas

Thank you for your interest in contributing to Shibuya Live Canvas! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Git Flow Strategy](#git-flow-strategy)
- [Commit Message Format](#commit-message-format)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)

## 📜 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions with other contributors.

- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community and the project
- Show empathy towards other community members

## 🌳 Git Flow Strategy

We follow the Git Flow branching model for managing our codebase:

### Branch Types

- **main**: Production-ready code. Protected branch.
- **develop**: Integration branch for features. All feature branches merge here.
- **feature/**: Feature development branches
- **release/**: Release preparation branches
- **hotfix/**: Emergency fixes for production

### Branch Naming Convention

- `feature/[issue-number]-[short-description]` - For new features
  - Example: `feature/123-user-authentication`
- `bugfix/[issue-number]-[short-description]` - For bug fixes
  - Example: `bugfix/456-fix-login-error`
- `hotfix/[issue-number]-[short-description]` - For production hotfixes
  - Example: `hotfix/789-critical-security-patch`
- `release/[version-number]` - For release preparation
  - Example: `release/1.2.0`

### Workflow

1. Create a feature branch from `develop`
2. Make your changes and commit regularly
3. Push your branch and create a Pull Request to `develop`
4. After code review and approval, merge to `develop`
5. Periodically, `develop` is merged to `main` via a release branch

## 💬 Commit Message Format

We follow the Conventional Commits specification for clear and consistent commit history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, missing semicolons, etc.)
- **refactor:** Code refactoring without changing functionality
- **perf:** Performance improvements
- **test:** Adding or updating tests
- **build:** Changes to build system or dependencies
- **ci:** CI/CD configuration changes
- **chore:** Other changes that don't modify src or test files
- **revert:** Reverting a previous commit

### Scope

The scope should indicate the package or module affected:

- `web` - Web application
- `mobile` - Mobile application
- `api` - API service
- `auth` - Authentication service
- `shared` - Shared packages
- `ui` - UI components

### Examples

```
feat(mobile): add user location tracking

Implement real-time location tracking for mobile users
using React Native geolocation API.

Closes #123
```

```
fix(api): resolve database connection timeout

Increase connection pool size and add retry logic
for database connections.

Fixes #456
```

```
docs(readme): update installation instructions

Add Node.js version requirement and clarify
environment setup steps.
```

## 🔄 Development Process

### 1. Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/your-org/shibuya-live-canvas.git
cd shibuya-live-canvas

# Install dependencies
npm install

# Create your feature branch
git checkout -b feature/your-feature-name develop
```

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the project's coding standards
- Add/update tests as needed
- Update documentation if required

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat(scope): description of change"
```

### 5. Push Your Branch

```bash
git push origin feature/your-feature-name
```

## 🔀 Pull Request Process

### Before Creating a PR

1. Ensure your branch is up to date with `develop`
2. Run all tests and ensure they pass
3. Run linting and fix any issues
4. Update documentation if needed
5. Add entries to CHANGELOG if applicable

### Creating a PR

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch and target branch (`develop`)
4. Fill out the PR template completely
5. Link related issues
6. Request reviews from appropriate team members

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. At least one approved review is required
2. All CI checks must pass
3. No merge conflicts
4. PR author merges after approval

## 📐 Code Style Guidelines

### General

- Use meaningful variable and function names
- Keep functions small and focused
- Write self-documenting code
- Add comments for complex logic
- Follow DRY (Don't Repeat Yourself) principle

### JavaScript/TypeScript

- Use ESLint configuration
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Use template literals for string concatenation
- Always use strict equality (`===`)

### React/React Native

- Use functional components with hooks
- Keep components small and reusable
- Use PropTypes or TypeScript for type checking
- Follow naming conventions (PascalCase for components)

### CSS/Styling

- Use CSS modules or styled-components
- Follow BEM naming convention
- Mobile-first responsive design
- Use CSS variables for theming

## 🧪 Testing Guidelines

### Test Structure

- Unit tests for utilities and helpers
- Integration tests for API endpoints
- Component tests for UI components
- E2E tests for critical user flows

### Writing Tests

- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Test edge cases and error scenarios
- Maintain high code coverage (>80%)
- Mock external dependencies

### Test File Naming

- Unit tests: `*.test.js` or `*.spec.js`
- Integration tests: `*.integration.test.js`
- E2E tests: `*.e2e.test.js`

## 📚 Additional Resources

- [Project Documentation](docs/)
- [API Documentation](docs/api/)
- [Architecture Guide](docs/architecture/)
- [Style Guide](docs/style-guide.md)

## ❓ Questions?

If you have questions or need help, please:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with the question label
4. Reach out on our Discord server

Thank you for contributing to Shibuya Live Canvas! 🎉