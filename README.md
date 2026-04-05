![License](https://img.shields.io/badge/license-MIT-blue) ![Build](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-0.1.0-orange)

# Sun Potential 3D Template

Repository with a configurable 3D solar-potential viewer built on top of `Giro3D`.

The main runnable application in this repository is [`3d-map/`](./3d-map). It is a Vite-based client application that renders terrain, raster overlays, mask geometry, measurements, click sampling, and a minimap using local geospatial data.

Project website:

https://sun-potential-3d.com

## What Is In This Repository

- `3d-map/` - the main application.
- `manuals/` - Giro3D-related manuals and reference notes used during development.
- `Giro3D-Flat_knowledge_base_/` - flattened knowledge base and examples.
- `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md` - project policy files.

This repository does not use a root-level app build. There is no root `package.json` for the viewer itself. All application commands are run from [`3d-map/`](./3d-map).

## Main Application

The app in [`3d-map/`](./3d-map) is a static front-end that uses:

- `Giro3D` for the 3D scene, maps, layers, mask, and measurement tools.
- `Three.js` for camera math and controls.
- `proj4` for CRS transformations.
- `geotiff` for direct raster sampling on click.
- `MapLibre GL` for the minimap.
- `Vite` for development and production bundling.

Core capabilities:

- terrain rendering from GeoTIFF;
- colorized raster overlays and RGB orthophoto layers;
- GeoJSON mask support;
- hillshading and terrain deformation toggles;
- click-to-read values from active raster layers;
- annual generation estimate for POA layers;
- measurement tools for distance, area, height, and angle;
- optional COPC point-cloud support;
- minimap synced to the 3D view.

## Repository Structure

```text
sun-potential-3d-template/
├── 3d-map/
│   ├── assets/                 # Static assets, including laz-perf wasm
│   ├── data/                   # Local GeoTIFF, LAZ/COPC, and GeoJSON files
│   ├── dist/                   # Production build output
│   ├── Code_Explanation.md     # Detailed code walkthrough
│   ├── index.html              # App shell and UI markup
│   ├── main.js                 # Main application logic
│   ├── map_layers.json         # Runtime map/layer configuration
│   ├── map_layers.schema.json  # JSON schema for the config
│   ├── package.json            # App dependencies and scripts
│   ├── readme.md               # App-specific notes
│   ├── style.css               # UI styling
│   └── vite.config.js          # Vite config
├── manuals/
├── Giro3D-Flat_knowledge_base_/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

## Configuration

The behavior of the 3D viewer is driven primarily by [`3d-map/map_layers.json`](./3d-map/map_layers.json).

This file controls:

- CRS and map extent;
- initial camera center, zoom, pitch, and bearing;
- terrain source and deformation behavior;
- hillshading parameters;
- mask layer settings;
- raster and point-cloud layers;
- color ramps, value ranges, opacity, blending, and clickability.

Important implementation detail:

- `elevation` defines the terrain height source.
- The layer with `id: "elevation"` inside `layers[]` controls the terrain color ramp.

For a detailed architectural explanation, see [`3d-map/Code_Explanation.md`](./3d-map/Code_Explanation.md).

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/ABiatov/sun-potential-3d-template.git
cd sun-potential-3d-template
```

### 2. Move into the application directory

```bash
cd 3d-map
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

By default the app will be available at:

```text
http://localhost:5173/
```

Optional: run on port 80

```bash
npm run dev:80
```

If the OS blocks port `80`, run it with elevated privileges.

## Local Build

Build the production bundle from inside [`3d-map/`](./3d-map):

```bash
npm run build
```

Vite will generate the bundled output in:

```text
3d-map/dist/
```

Because [`3d-map/vite.config.js`](./3d-map/vite.config.js) uses:

```js
base: './'
```

the built app can be served from a subfolder such as `/demo/` and will use relative asset paths.

## Runtime Files Required After Build

Important: the Vite bundle alone is not enough for this application.

The app loads some files at runtime with `fetch(...)`, so they must exist next to the built site after `npm run build`.

At minimum, add:

- `map_layers.json`
- `data/`

to the build output.

### Manual step after build

From inside [`3d-map/`](./3d-map), run:

```bash
cp map_layers.json dist/
cp -R data dist/
```

After that, your production folder should look like this:

```text
3d-map/dist/
├── assets/
├── data/
├── index.html
└── map_layers.json
```

Without these runtime files, the app will load the shell but fail to initialize the map correctly.

## Deployment

This application can be deployed as a static site after building and copying the runtime files into `dist/`.

General deployment flow:

1. `cd 3d-map`
2. `npm install`
3. `npm run build`
4. `cp map_layers.json dist/`
5. `cp -R data dist/`
6. upload the contents of `dist/` to your hosting target

If you deploy into a subfolder, upload the contents of `dist/` into that subfolder so that `index.html`, `assets/`, `data/`, and `map_layers.json` live together.

Example target structure for deployment to `/demo/`:

```text
public_html/demo/
├── assets/
├── data/
├── index.html
└── map_layers.json
```

## Notes About the Current Build

- The current build process does not automatically copy `map_layers.json` and `data/` into `dist/`.
- `map_layers.schema.json` exists for validation/reference, but runtime schema validation is not currently enforced in the app.
- The minimap uses external OpenStreetMap tiles, so that part of the UI requires network access even if the main data is local.

## Additional Documentation

- [`3d-map/Code_Explanation.md`](./3d-map/Code_Explanation.md) - detailed architecture and code walkthrough.
- [`3d-map/readme.md`](./3d-map/readme.md) - app-specific quick notes.
- [`manuals/`](./manuals) - supporting Giro3D documentation.
- [`Giro3D-Flat_knowledge_base_/`](./Giro3D-Flat_knowledge_base_) - flattened knowledge base and examples.

## License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE).

## Disclaimer

This repository contains the viewer/template application and local demo assets only.

The proprietary solar-potential analysis engine and production services used in the full Sun Potential 3D platform are not included here.

## Contributing

Contributions, issues, and feature requests are welcome.

- See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution guidelines.
- See [`SECURITY.md`](./SECURITY.md) for vulnerability reporting.
- See [`CHANGELOG.md`](./CHANGELOG.md) for release history.
