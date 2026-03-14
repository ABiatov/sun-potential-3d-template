# Contributing

Thank you for your interest in contributing to **Sun Potential 3D Viewer Template**.

We welcome bug reports, documentation improvements, and pull requests that improve the project.

---

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies
4. Start the development server

```bash
npm install
npm run dev
```

The application should start at:

```
http://localhost:5173
```

---

## Project Structure

The project uses a **feature-based architecture**. Major functionality is grouped into modules under:

```
src/features
```

Examples:

* `viewer` — Giro3D integration and scene logic
* `solar` — solar analysis visualization
* `ui` — interface components and panels

Try to keep new functionality within the appropriate feature module.

---

## Branch Naming

Please use descriptive branch names.

Examples:

```
feature/add-roof-layer
feature/viewer-controls
fix/camera-reset
docs/update-readme
```

---

## Commit Messages

Use clear commit messages that describe the change.

Examples:

```
feat: add building highlight interaction
fix: correct camera initialization
docs: improve installation instructions
refactor: simplify viewer initialization
```

---

## Pull Requests

Before submitting a pull request, please ensure:

* the project builds successfully
* the application runs locally
* there are no obvious console errors
* the change is focused and well described
* documentation is updated if needed

Small and focused pull requests are preferred.

---

## Reporting Issues

When reporting a bug, please include:

* steps to reproduce
* expected behavior
* actual behavior
* screenshots if relevant
* browser and environment information

---

## Scope

This repository provides a **viewer/template application only**.

Please do **not** include in pull requests:

* secrets or credentials
* production API keys
* proprietary backend logic
* customer-specific datasets
* large proprietary geospatial datasets

---

## Questions

If you have questions about the project, feel free to open an issue.


