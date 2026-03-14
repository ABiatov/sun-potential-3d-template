![License](https://img.shields.io/badge/license-MIT-blue) ![Build](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-0.1.0-orange)


# Sun Potential 3D Template

A template application for building interactive 3D solar potential viewers based on **Giro3D**.

This repository provides a configurable front-end template used to create web applications that visualize buildings, terrain and solar potential analysis results in a 3D environment.

It is used as a reference implementation for the **Sun Potential 3D** project.

🌐 https://sun-potential-3d.com

---

## Features

* 3D map visualization powered by Giro3D
* Modular architecture for easy customization
* Configurable customer branding (white-label)
* Solar analysis visualization layer
* Demo dataset for development and testing
* Ready-to-use template for new projects

---

## Demo

A live demo may be available here:

https://sun-potential-3d.com/3d-map/

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ABiatov/sun-potential-3d-template.git
cd sun-potential-3d-template
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Start development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Project Structure

```
src
├── app                # Application bootstrap
├── features           # Feature modules
│   ├── viewer         # Giro3D integration
│   ├── solar          # Solar visualization layer
│   └── ui             # UI panels and widgets
│
├── config             # Application configuration
├── services           # API integrations
├── types              # Shared TypeScript types
├── utils              # Utility helpers
└── styles             # Global styles
```

---

## Configuration

The application can be configured through files in:

```
src/config
```

Typical configuration includes:

* default map position
* available layers
* enabled features
* branding options

Example:

```ts
export const appConfig = {
  branding: {
    appName: "Sun Potential 3D",
  },

  map: {
    defaultZoom: 15
  }
}
```

---

## Environment Variables

Create a `.env` file based on:

```
.env.example
```

Example:

```
VITE_API_BASE_URL=
VITE_APP_ENV=development
```

---

## Customization

The template is designed to support **white-label deployments**.

Typical customization includes:

* branding
* UI components
* enabled modules
* data sources
* solar analysis visualization

---

## Demo Data

Example data used in the demo environment can be found in:

```
public/data/demo
```

This allows the application to run without connecting to a production backend.

---

## Deployment

Build the project:

```bash
npm run build
```

The build output will be generated in:

```
dist/
```

It can be deployed on any static hosting platform such as:

* Vercel
* Netlify
* Cloudflare Pages
* AWS S3
* GitHub Pages

---

## License

This project is licensed under the **MIT License**.

---

## Disclaimer

This repository contains only the **viewer/template application**.

The proprietary solar potential analysis engine and production services used in the Sun Potential 3D platform are **not included** in this repository.

---

## Contributing

Contributions, issues and feature requests are welcome.

- See `CONTRIBUTING.md` for contribution guidelines
- See `SECURITY.md` for reporting vulnerabilities
- See `CHANGELOG.md` for release history

---

## Contact

Project website:

https://sun-potential-3d.com

For business inquiries please contact the Sun Potential 3D team.
