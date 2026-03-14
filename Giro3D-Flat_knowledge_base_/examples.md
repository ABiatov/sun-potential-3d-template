# Consolidated Examples Database

## Source: manuals/examples/3d-tiles-building.md

Source Path: manuals/examples/3d-tiles-building.md

# 3D Tiles Building

## Официальный кейс
- Slug: `3d-tiles-building`
- Официальная страница: https://giro3d.org/latest/examples/3d-tiles-building.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/3d-tiles-building.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/3d-tiles-building.js`

## Краткое описание (official)
Display a 3D Tiles building converted from a IFC file with py3dtiles.

## Теги (official)
- `ifc`
- `3d tiles`
- `building`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=3d-tiles-building npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/3d-tiles-building.html
```html
---
title: 3D Tiles Building
shortdesc: Display a 3D Tiles building converted from a IFC file with py3dtiles.
tags: ['ifc', '3d tiles', 'building']
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <h5 class="card-header">Element informations</h5>
        <div class="card-body" style="max-width: 30vw">
            <!-- Result table -->
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <!-- <th scope="col">#</th> -->
                        <th scope="col">Name</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody id="results-body">
                    <tr>
                        <th scope="row" colspan="4">
                            Click on the scene to inspect object properties
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/3d-tiles-building.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { AmbientLight, Color, DirectionalLight, GridHelper, MathUtils, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import StatusBar from './widgets/StatusBar.js';

const tmpVec3 = new Vector3();

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: 0xcccccc,
});

// Add a sunlight
const sun = new DirectionalLight('#ffffff', 1.4);
sun.position.set(1, 0, 1).normalize();
sun.updateMatrixWorld(true);
instance.scene.add(sun);

// We can look below the floor, so let's light also a bit there
const sun2 = new DirectionalLight('#ffffff', 0.5);
sun2.position.set(0, -1, 1);
sun2.updateMatrixWorld();
instance.scene.add(sun2);

// Add ambient light
const ambientLight = new AmbientLight(0xffffff, 1);
instance.scene.add(ambientLight);
instance.view.minNearPlane = 0.5;

const ifc = new Tiles3D({
    url: 'https://3d.oslandia.com/3dtiles/19_rue_Marc_Antoine_Petit_ifc/tileset.json',
});

// Hide some elements that don't bring visual value
ifc.addEventListener('object-created', evt => {
    const scene = evt.obj;
    scene.traverse(obj => {
        if (obj.userData?.class === 'IfcSpace') {
            obj.visible = false;
            instance.notifyChange();
        }
    });
});

function placeCamera(position, lookAt) {
    instance.view.camera.position.set(position.x, position.y, position.z);
    instance.view.camera.lookAt(lookAt);
    // create controls
    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.target.copy(lookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    instance.view.setControls(controls);

    instance.notifyChange(instance.view.camera);
}

// add pointcloud to scene
function initializeCamera() {
    const bbox = ifc.getBoundingBox();

    const ratio = bbox.getSize(tmpVec3).x / bbox.getSize(tmpVec3).z;

    const position = bbox
        .getCenter(new Vector3())
        .clone()
        .add(bbox.getSize(tmpVec3).multiply(new Vector3(-2, -2, ratio)));

    const lookAt = bbox.getCenter(tmpVec3);
    lookAt.z = bbox.min.z;

    placeCamera(position, lookAt);

    const grid = new GridHelper(60, 10);
    grid.rotateX(MathUtils.degToRad(90));

    grid.position.copy(lookAt);

    instance.add(grid);
    grid.updateMatrixWorld(true);

    StatusBar.bind(instance);
}

instance.add(ifc).then(initializeCamera);

Inspector.attach('inspector', instance);

const resultsTable = document.getElementById('results-body');

let highlighted;
let highlightColor = new Color(0xff7171);

let canPick = true;

/**
 * @param {MouseEvent} evt
 */
function highlight(evt) {
    if (!canPick) {
        return;
    }

    const picked = instance.pickObjectsAt(evt, {
        radius: 5,
        limit: 10,
        where: [ifc],
        filter: pick => pick.object.visible, // Ignore invisible objects, such as IfcSpace elements
    });

    if (highlighted) {
        // reset style
        const material = highlighted.material;
        material.color.copy(material.userData.oldColor);

        instance.notifyChange(highlighted);
    }

    if (picked.length === 0) {
        const row = document.createElement('tr');
        const count = document.createElement('th');
        count.setAttribute('scope', 'row');
        count.innerText = '-';
        const coordinates = document.createElement('td');
        coordinates.innerText = '-';
        const distanceToCamera = document.createElement('td');
        distanceToCamera.innerText = '-';
        row.append(count, coordinates, distanceToCamera);
        resultsTable.replaceChildren(row);
    } else {
        const obj = picked[0].object;
        // @ts-expect-error material is missing
        const material = obj.material;

        // keep the old color to reset it later
        if (!material.userData.oldColor) {
            material.userData.oldColor = material.color.clone();
        }

        material.color.copy(highlightColor);

        instance.notifyChange(obj);

        highlighted = obj;

        const rows = [];

        for (const [name, value] of Object.entries(obj.userData)) {
            if (name !== 'oldColor' && name !== 'parentEntity') {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.innerHTML = `<code>${name}</code>`;
                const valueCell = document.createElement('td');
                valueCell.innerText = value;
                row.append(nameCell, valueCell);
                rows.push(row);
            }
        }

        resultsTable.replaceChildren(...rows);
    }
}

// Prevent picking if user is dragging mouse
instance.domElement.addEventListener('mousedown', () => (canPick = true));
instance.domElement.addEventListener('mousemove', () => (canPick = false));
instance.domElement.addEventListener('mouseup', highlight);
```

---

## Source: manuals/examples/3d-tiles-point-cloud.md

Source Path: manuals/examples/3d-tiles-point-cloud.md

# 3D Tiles Point Cloud

## Официальный кейс
- Slug: `3d-tiles-point-cloud`
- Официальная страница: https://giro3d.org/latest/examples/3d-tiles-point-cloud.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/3d-tiles-point-cloud.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/3d-tiles-point-cloud.js`

## Краткое описание (official)
Display a 3D Tiles point cloud.

## Теги (official)
- `point cloud`
- `3d tiles`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=3d-tiles-point-cloud npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/3d-tiles-point-cloud.html
```html
---
title: 3D Tiles Point Cloud
shortdesc: Display a 3D Tiles point cloud.
tags: ['point cloud', '3d tiles']
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-body" style="max-width: 30vw; overflow: auto">
            <!-- Result table -->
            <table class="table small">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Coordinate</th>
                        <th scope="col">Distance to camera</th>
                    </tr>
                </thead>
                <tbody id="results-body">
                    <tr>
                        <th scope="row" colspan="4">Double-click on the scene for picking</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/3d-tiles-point-cloud.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import StatusBar from './widgets/StatusBar.js';

const tmpVec3 = new Vector3();

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: 0xcccccc,
});

// Configure Point Cloud
const pointcloud = new Tiles3D({
    url: 'https://3d.oslandia.com/3dtiles/eglise_saint_blaise_arles/tileset.json',
});

function placeCamera(position, lookAt) {
    instance.view.camera.position.set(position.x, position.y, position.z);
    instance.view.camera.lookAt(lookAt);

    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.target.copy(lookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    instance.view.setControls(controls);

    instance.notifyChange(instance.view.camera);
}

// add pointcloud to scene
function initializeCamera() {
    const bbox = pointcloud.getBoundingBox();

    instance.view.camera.far = 2.0 * bbox.getSize(tmpVec3).length();

    const ratio = bbox.getSize(tmpVec3).x / bbox.getSize(tmpVec3).z;
    const position = bbox.min
        .clone()
        .add(bbox.getSize(tmpVec3).multiply(new Vector3(0, 0, ratio * 0.5)));
    const lookAt = bbox.getCenter(tmpVec3);
    lookAt.z = bbox.min.z;
    placeCamera(position, lookAt);

    StatusBar.bind(instance);
}

instance.add(pointcloud).then(initializeCamera);

Inspector.attach('inspector', instance);

const resultsTable = document.getElementById('results-body');
const formatter = new Intl.NumberFormat();

function format(point) {
    return `x: ${formatter.format(point.x)}\n
            y: ${formatter.format(point.y)}\n
            z: ${formatter.format(point.z)}`;
}

instance.domElement.addEventListener('dblclick', e => {
    const picked = instance.pickObjectsAt(e, { radius: 5, limit: 10 });

    if (picked.length === 0) {
        const row = document.createElement('tr');
        const count = document.createElement('th');
        count.setAttribute('scope', 'row');
        count.innerText = '-';
        const coordinates = document.createElement('td');
        coordinates.innerText = '-';
        const distanceToCamera = document.createElement('td');
        distanceToCamera.innerText = '-';
        row.append(count, coordinates, distanceToCamera);
        resultsTable.replaceChildren(row);
    } else {
        const rows = picked.map((p, i) => {
            const row = document.createElement('tr');
            const count = document.createElement('th');
            count.setAttribute('scope', 'row');
            count.innerText = `${i + 1}`;
            const coordinates = document.createElement('td');
            coordinates.innerHTML = format(p.point);
            const distanceToCamera = document.createElement('td');
            distanceToCamera.innerText = formatter.format(p.distance);
            row.append(count, coordinates, distanceToCamera);
            return row;
        });
        resultsTable.replaceChildren(...rows);
    }
});
```

---

## Source: manuals/examples/3d-tiles-simple-viewer.md

Source Path: manuals/examples/3d-tiles-simple-viewer.md

# 3D Tiles Simple Viewer

## Официальный кейс
- Slug: `3d-tiles-simple-viewer`
- Официальная страница: https://giro3d.org/latest/examples/3d-tiles-simple-viewer.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/3d-tiles-simple-viewer.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/3d-tiles-simple-viewer.js`

## Краткое описание (official)
Display any 3D Tiles from a url.

## Теги (official)
- `3d tiles`
- `building`
- `pointcloud`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=3d-tiles-simple-viewer npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/3d-tiles-simple-viewer.html
```html
---
title: 3D Tiles Simple Viewer
shortdesc: Display any 3D Tiles from a url.
tags: ['3d tiles', 'building', 'pointcloud']
---

<div class="toast-container position-fixed top-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">Error loading tileset</strong>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
        </div>
        <div class="toast-body">Tileset loading failed: <span id="error"></span></div>
    </div>
</div>

<div class="side-pane-with-status-bar">
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            id="tileset_url"
            placeholder="http://domain.tld/path/tileset.json"
        />
        <button class="btn btn-primary" id="start">Reload</button>
    </div>
    <div class="card">
        <h5 class="card-header">Element informations</h5>
        <div class="card-body" style="max-width: 30vw">
            <!-- Result table -->
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody id="results-body">
                    <tr>
                        <th scope="row" colspan="4">
                            Click on the scene to inspect object properties
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/3d-tiles-simple-viewer.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Toast } from 'bootstrap';
import { AmbientLight, Color, DirectionalLight, GridHelper, MathUtils, Mesh, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import StatusBar from './widgets/StatusBar.js';

const TILESET_URL_INPUT_ID = 'tileset_url';
const DEFAULT_URL = 'https://3d.oslandia.com/3dtiles/19_rue_Marc_Antoine_Petit_ifc/tileset.json';
const input = document.getElementById(TILESET_URL_INPUT_ID);
// @ts-expect-error placeholder does not exist on HtmlElement
input.placeholder = DEFAULT_URL;

const tmpVec3 = new Vector3();

function replace_window_url(enteredUrl) {
    const url = new URL(document.URL);
    url.searchParams.delete(TILESET_URL_INPUT_ID);

    url.searchParams.append(TILESET_URL_INPUT_ID, enteredUrl);

    window.history.replaceState({}, null, url.toString());
}

// init instance
const instance = new Instance({
    target: 'view', // The id of the <div> to attach the instance
    crs: CoordinateSystem.epsg3857,
    backgroundColor: 0xcccccc,
});

// Add a sunlight
const sun = new DirectionalLight('#ffffff', 1.4);
sun.position.set(1, 0, 1).normalize();
sun.updateMatrixWorld(true);
instance.scene.add(sun);

// We can look below the floor, so let's light also a bit there
const sun2 = new DirectionalLight('#ffffff', 0.5);
sun2.position.set(0, -1, 1);
sun2.updateMatrixWorld();
instance.scene.add(sun2);

// Add ambient light
const ambientLight = new AmbientLight(0xffffff, 1);
instance.scene.add(ambientLight);
instance.view.minNearPlane = 0.5;

// create controls
const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
instance.view.setControls(controls);

// declare the tileset
let tileset = null;

// setup the error displaying
const toastLiveExample = document.getElementById('liveToast');
const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
function displayError(evt) {
    document.getElementById('error').innerText = evt.error.message;
    toastBootstrap.show();
}

function run(url) {
    if (tileset != null) {
        instance.remove(tileset);
    }
    tileset = new Tiles3D({ url: url.toString() });

    // If the tileset comes from an ifc converted with py3dtiles, hide some elements that don't bring visual value
    tileset.addEventListener('object-created', evt => {
        const scene = evt.obj;
        scene.traverse(obj => {
            if (obj.userData?.class === 'IfcSpace') {
                obj.visible = false;
                instance.notifyChange();
            }
        });
    });

    instance.add(tileset).then(initializeCamera, displayError).catch(console.log);
}

function placeCamera(position, lookAt) {
    instance.view.camera.position.set(position.x, position.y, position.z);
    instance.view.camera.lookAt(lookAt);
    controls.target.copy(lookAt);
    StatusBar.updateUrl();
    instance.notifyChange(instance.view.camera);
}

// add pointcloud to scene
function initializeCamera() {
    const bbox = tileset.getBoundingBox();

    const ratio = bbox.getSize(tmpVec3).x / bbox.getSize(tmpVec3).z;

    const position = bbox
        .getCenter(new Vector3())
        .clone()
        .add(bbox.getSize(tmpVec3).multiply(new Vector3(-2, -2, ratio)));

    const lookAt = bbox.getCenter(tmpVec3);
    lookAt.z = bbox.min.z;

    placeCamera(position, lookAt);

    const grid = new GridHelper(60, 10);
    grid.rotateX(MathUtils.degToRad(90));

    grid.position.copy(lookAt);

    instance.add(grid);
    grid.updateMatrixWorld(true);
}

// url parsing and initialization
let tileset_url = new URL(document.URL).searchParams.get(TILESET_URL_INPUT_ID);

if (tileset_url == null) {
    tileset_url = DEFAULT_URL;
}

replace_window_url(tileset_url);
// @ts-expect-error value does not exist on HtmlElement
input.value = tileset_url;
run(tileset_url);

document.getElementById('start').onclick = () => {
    // @ts-expect-error value does not exist on HtmlElement
    const enteredUrl = input.value;

    if (enteredUrl != null) {
        replace_window_url(enteredUrl);
        run(enteredUrl);
    }
};

// picking and highlighting logic
const resultsTable = document.getElementById('results-body');

let highlighted;
let highlightColor = new Color(0xff7171);

let canPick = true;

/**
 * @param {MouseEvent} evt
 */
function highlight(evt) {
    if (!canPick) {
        return;
    }

    const picked = instance.pickObjectsAt(evt, {
        radius: 5,
        limit: 10,
        where: [tileset],
        filter: pick => pick.object.visible, // Ignore invisible objects, such as IfcSpace elements
    });

    if (highlighted && highlighted.material.color != null) {
        // reset style
        const material = highlighted.material;
        material.color.copy(material.userData.oldColor);

        instance.notifyChange(highlighted);
    }

    if (picked.length === 0) {
        const row = document.createElement('tr');
        const count = document.createElement('th');
        count.setAttribute('scope', 'row');
        count.innerText = '-';
        const coordinates = document.createElement('td');
        coordinates.innerText = '-';
        const distanceToCamera = document.createElement('td');
        distanceToCamera.innerText = '-';
        row.append(count, coordinates, distanceToCamera);
        resultsTable.replaceChildren(row);
    } else {
        const obj = picked[0].object;
        if (obj instanceof Mesh) {
            const material = obj.material;

            // keep the old color to reset it later
            if (material.color != null) {
                if (!material.userData.oldColor) {
                    material.userData.oldColor = material.color.clone();
                }

                material.color.copy(highlightColor);
            }

            instance.notifyChange(obj);
            highlighted = obj;
        }

        const rows = [];

        for (const [name, value] of Object.entries(obj.userData)) {
            if (name !== 'oldColor' && name !== 'parentEntity') {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.innerHTML = `<code>${name}</code>`;
                const valueCell = document.createElement('td');
                valueCell.innerText = value;
                row.append(nameCell, valueCell);
                rows.push(row);
            }
        }

        resultsTable.replaceChildren(...rows);
    }
}

// Prevent picking if user is dragging mouse
instance.domElement.addEventListener('mousedown', () => (canPick = true));
instance.domElement.addEventListener('mousemove', () => (canPick = false));
instance.domElement.addEventListener('mouseup', highlight);

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/3d-transformations.md

Source Path: manuals/examples/3d-transformations.md

# 3D Transformations

## Официальный кейс
- Slug: `3d-transformations`
- Официальная страница: https://giro3d.org/latest/examples/3d-transformations.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/3d-transformations.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/3d-transformations.js`

## Краткое описание (official)
Transform objects using position, rotation and scale.

## Теги (official)
- `transformation`
- `map`

## Атрибуция (official)
© Métropole Grand Lyon

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=3d-transformations npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/3d-transformations.html
```html
---
title: 3D Transformations
shortdesc: Transform objects using position, rotation and scale.
attribution: © <a target="_blank" href="https://www.grandlyon.com/">Métropole Grand Lyon</a>
tags: [transformation, map]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/3d-transformations.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import TileWMS from 'ol/source/TileWMS.js';
import {
    AxesHelper,
    BoxGeometry,
    DoubleSide,
    Euler,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Interpretation from '@giro3d/giro3d/core/layer/Interpretation.js';
import Map, { isMap } from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import WmsSource from '@giro3d/giro3d/sources/WmsSource.js';

import StatusBar from './widgets/StatusBar.js';

const wmsLayers = [
    'metropole-de-lyon:fpc_fond_plan_communaut.fpcilot',
    'metropole-de-lyon:pvo_patrimoine_voirie.pvochausseetrottoir',
    'grandlyon:ortho_2009',
    'metropole-de-lyon:pos_opposable.poshauvoi',
    'grandlyon:MNT2015_Ombrage_2m',
    'metropole-de-lyon:cad_cadastre.cadilot',
];

const cubeTransformations = [
    {
        position: new Vector3(0, 0, 0.5),
        rotation: new Euler(),
    },
    {
        position: new Vector3(0, 0, -0.5),
        rotation: new Euler().set(Math.PI, 0, 0),
    },
    {
        position: new Vector3(0, 0.5, 0),
        rotation: new Euler().set(-Math.PI * 0.5, 0, 0),
    },
    {
        position: new Vector3(0, -0.5, 0),
        rotation: new Euler().set(Math.PI * 0.5, 0, 0),
    },
    {
        position: new Vector3(0.5, 0, 0),
        rotation: new Euler().set(0, Math.PI * 0.5, 0),
    },
    {
        position: new Vector3(-0.5, 0, 0),
        rotation: new Euler().set(0, -Math.PI * 0.5, 0),
    },
];

// Define projection that we will use (taken from https://epsg.io/3946, Proj4js section)
const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

// Define geographic extent: CRS, min/max X, min/max Y
const extent = new Extent(crs, 1837900, 1837900 + 8000, 5170100, 5170100 + 8000);

const scale = new Vector3(1, 1, 1).divideScalar(extent.dimensions().x);

// Instantiate Giro3D
const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x999999,
});

const cube = new Mesh(
    new BoxGeometry(8000, 8000, 8000),
    new MeshBasicMaterial({ color: 0xdddddd }),
);
cube.name = 'root cube';
const wireframe = new Mesh(
    new BoxGeometry(8000, 8000, 8000),
    new MeshBasicMaterial({ color: 0x000000, wireframe: true }),
);
wireframe.name = 'wireframe cube';
cube.add(wireframe);
cube.scale.copy(scale);
cube.updateMatrixWorld(true);

instance.scene.add(cube);

const axes = new AxesHelper(1);

instance.scene.add(axes);

function createColorLayer(name, url) {
    const source = new WmsSource({
        url,
        layer: name,
        imageFormat: 'image/jpeg',
        projection: 'EPSG:3946',
    });

    return new ColorLayer({ name, source });
}

function createElevationLayer(name, url) {
    const source = new TiledImageSource({
        source: new TileWMS({
            url,
            projection: 'EPSG:3946',
            params: {
                LAYERS: [name],
            },
        }),
    });

    return new ElevationLayer({
        name,
        source,
        minmax: { min: -100, max: +250 },
        interpretation: Interpretation.ScaleToMinMax(149, 621),
    });
}

const allMaps = [];

for (let i = 0; i < wmsLayers.length; i++) {
    const cubeSide = new Object3D();
    const offset = extent.centerAsVector3().negate().applyEuler(cubeTransformations[i].rotation);
    offset.add(cubeTransformations[i].position.divide(scale));
    cubeSide.position.copy(offset);
    cubeSide.rotation.copy(cubeTransformations[i].rotation);
    cube.add(cubeSide);
    cubeSide.updateMatrixWorld(true);

    const layerName = wmsLayers[i];

    const map = new Map({
        extent,
        terrain: {
            segments: 16,
        },
        discardNoData: true,
        side: DoubleSide,
        object3d: cubeSide,
    });

    map.name = layerName;

    instance.add(map);

    allMaps.push(map);

    map.addLayer(createColorLayer(layerName, 'https://download.data.grandlyon.com/wms/grandlyon'));
    map.addLayer(
        createElevationLayer(
            'grandlyon:MNT2012_Altitude_10m_CC46',
            'https://download.data.grandlyon.com/wms/grandlyon',
        ),
    );
}

instance.view.camera.position.set(3, 3, 2);
instance.view.camera.updateMatrixWorld(true);
instance.view.camera.lookAt(new Vector3(0, 0, 0));

const controls = new OrbitControls(instance.view.camera, instance.domElement);
controls.minDistance = 1;

instance.view.setControls(controls);
instance.view.minNearPlane = 0.1;

// Request redraw
instance.notifyChange();

Inspector.attach('inspector', instance);
StatusBar.bind(instance);

/**
 * @param {MouseEvent} event
 */
function highlight(event) {
    for (const map of allMaps) {
        map.colorimetry.brightness = 0;
        map.colorimetry.saturation = 1;
        map.colorimetry.contrast = 1;
    }

    const picked = instance.pickObjectsAt(event);
    if (picked.length > 0) {
        picked.sort((a, b) => a.distance - b.distance);

        const first = picked[0];

        if (first) {
            const entity = first.entity;
            if (isMap(entity)) {
                entity.colorimetry.brightness = 0.3;
                entity.colorimetry.saturation = 2;
                entity.colorimetry.contrast = 1.5;
            }
        }
    }
    instance.notifyChange(allMaps);
}

instance.domElement.addEventListener('mousemove', highlight);
```

---

## Source: manuals/examples/README.md

Source Path: manuals/examples/README.md

# Examples Manuals

Сгенерировано из официальных `manuals/reference_info/giro3d/examples/*.html` (front matter).

- Refer to the Examples super-file, section: manuals/examples/3d-tiles-building.md
- Refer to the Examples super-file, section: manuals/examples/3d-tiles-point-cloud.md
- Refer to the Examples super-file, section: manuals/examples/3d-tiles-simple-viewer.md
- Refer to the Examples super-file, section: manuals/examples/3d-transformations.md
- Refer to the Examples super-file, section: manuals/examples/atmosphere.md
- Refer to the Examples super-file, section: manuals/examples/axis-grid.md
- Refer to the Examples super-file, section: manuals/examples/camera-controls-integration.md
- Refer to the Examples super-file, section: manuals/examples/clipping-planes.md
- Refer to the Examples super-file, section: manuals/examples/color-adjustments.md
- Refer to the Examples super-file, section: manuals/examples/colorized-3d-tiles-point-cloud.md
- Refer to the Examples super-file, section: manuals/examples/colormaps.md
- Refer to the Examples super-file, section: manuals/examples/copc.md
- Refer to the Examples super-file, section: manuals/examples/cropped-geotiff-elevation.md
- Refer to the Examples super-file, section: manuals/examples/digitization.md
- Refer to the Examples super-file, section: manuals/examples/draw-tool.md
- Refer to the Examples super-file, section: manuals/examples/ellipsoid.md
- Refer to the Examples super-file, section: manuals/examples/feature-collection-reprojection.md
- Refer to the Examples super-file, section: manuals/examples/first-person-controls.md
- Refer to the Examples super-file, section: manuals/examples/geojson-3d.md
- Refer to the Examples super-file, section: manuals/examples/geotiff-bathymetry.md
- Refer to the Examples super-file, section: manuals/examples/geotiff-channel-mapping.md
- Refer to the Examples super-file, section: manuals/examples/geotiff-color.md
- Refer to the Examples super-file, section: manuals/examples/geotiff-elevation.md
- Refer to the Examples super-file, section: manuals/examples/getting-started.md
- Refer to the Examples super-file, section: manuals/examples/globe.md
- Refer to the Examples super-file, section: manuals/examples/google-photorealistic-3d-tiles.md
- Refer to the Examples super-file, section: manuals/examples/graticule.md
- Refer to the Examples super-file, section: manuals/examples/hillshade.md
- Refer to the Examples super-file, section: manuals/examples/html-labels.md
- Refer to the Examples super-file, section: manuals/examples/ign-data.md
- Refer to the Examples super-file, section: manuals/examples/inspector.md
- Refer to the Examples super-file, section: manuals/examples/instance-dispose.md
- Refer to the Examples super-file, section: manuals/examples/interactive-vector-layer.md
- Refer to the Examples super-file, section: manuals/examples/las.md
- Refer to the Examples super-file, section: manuals/examples/layer-blending-mode.md
- Refer to the Examples super-file, section: manuals/examples/layer-get-pixel.md
- Refer to the Examples super-file, section: manuals/examples/layer-ordering.md
- Refer to the Examples super-file, section: manuals/examples/layer-reprojection.md
- Refer to the Examples super-file, section: manuals/examples/layer-stress-test.md
- Refer to the Examples super-file, section: manuals/examples/layer-texture-filter.md
- Refer to the Examples super-file, section: manuals/examples/layer-update.md
- Refer to the Examples super-file, section: manuals/examples/layouts.md
- Refer to the Examples super-file, section: manuals/examples/lidar-hd.md
- Refer to the Examples super-file, section: manuals/examples/map-add-remove-layers.md
- Refer to the Examples super-file, section: manuals/examples/map-arbitrary-extent.md
- Refer to the Examples super-file, section: manuals/examples/map-contour-lines.md
- Refer to the Examples super-file, section: manuals/examples/map-elevation-profile.md
- Refer to the Examples super-file, section: manuals/examples/map-elevation-ranges.md
- Refer to the Examples super-file, section: manuals/examples/map-opacity.md
- Refer to the Examples super-file, section: manuals/examples/map-shadows.md
- Refer to the Examples super-file, section: manuals/examples/map-shared-layers.md
- Refer to the Examples super-file, section: manuals/examples/map-skirts.md
- Refer to the Examples super-file, section: manuals/examples/map-transparency-stack.md
- Refer to the Examples super-file, section: manuals/examples/map-vertical-exaggeration.md
- Refer to the Examples super-file, section: manuals/examples/mapbox-tilesets.md
- Refer to the Examples super-file, section: manuals/examples/mask-layer.md
- Refer to the Examples super-file, section: manuals/examples/massive-point-cloud.md
- Refer to the Examples super-file, section: manuals/examples/minimap.md
- Refer to the Examples super-file, section: manuals/examples/multi-resolution-elevation.md
- Refer to the Examples super-file, section: manuals/examples/multiple-wmts-layers.md
- Refer to the Examples super-file, section: manuals/examples/no-data-elimination.md
- Refer to the Examples super-file, section: manuals/examples/no-data-reprojection.md
- Refer to the Examples super-file, section: manuals/examples/oriented-image-collection.md
- Refer to the Examples super-file, section: manuals/examples/osm.md
- Refer to the Examples super-file, section: manuals/examples/partial-layer.md
- Refer to the Examples super-file, section: manuals/examples/picking.md
- Refer to the Examples super-file, section: manuals/examples/point-cloud-classification.md
- Refer to the Examples super-file, section: manuals/examples/point-cloud-hybrid-coloring.md
- Refer to the Examples super-file, section: manuals/examples/point-cloud-intensity.md
- Refer to the Examples super-file, section: manuals/examples/point-cloud-intersecting-volumes.md
- Refer to the Examples super-file, section: manuals/examples/potree-point-cloud.md
- Refer to the Examples super-file, section: manuals/examples/query-map-elevation.md
- Refer to the Examples super-file, section: manuals/examples/simple-globe.md
- Refer to the Examples super-file, section: manuals/examples/sparse-layer.md
- Refer to the Examples super-file, section: manuals/examples/spherical-panorama.md
- Refer to the Examples super-file, section: manuals/examples/srtm-tiles.md
- Refer to the Examples super-file, section: manuals/examples/static-image-source.md
- Refer to the Examples super-file, section: manuals/examples/sun-exposure.md
- Refer to the Examples super-file, section: manuals/examples/temporal-wms.md
- Refer to the Examples super-file, section: manuals/examples/three-js-integration.md
- Refer to the Examples super-file, section: manuals/examples/tiff-tiles.md
- Refer to the Examples super-file, section: manuals/examples/topojson.md
- Refer to the Examples super-file, section: manuals/examples/tracking-progress.md
- Refer to the Examples super-file, section: manuals/examples/transparent-background.md
- Refer to the Examples super-file, section: manuals/examples/vector-mesh.md
- Refer to the Examples super-file, section: manuals/examples/vector-source.md
- Refer to the Examples super-file, section: manuals/examples/vector-tile-layer.md
- Refer to the Examples super-file, section: manuals/examples/video-source.md
- Refer to the Examples super-file, section: manuals/examples/wfs-mesh.md
- Refer to the Examples super-file, section: manuals/examples/wfs.md
- Refer to the Examples super-file, section: manuals/examples/wmts.md

---

## Source: manuals/examples/atmosphere.md

Source Path: manuals/examples/atmosphere.md

# Atmosphere

## Официальный кейс
- Slug: `atmosphere`
- Официальная страница: https://giro3d.org/latest/examples/atmosphere.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/atmosphere.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/atmosphere.js`

## Краткое описание (official)
Create a realistic atmosphere and sky dome.

## Расширенное описание (official longdesc)
Use the `Atmosphere` entity to display a realistic atmosphere for a specific `ellipsoid`. The external side of the sphere displays the atmospheric halo, and the internal side displays a sky dome with realistic atmospheric scattering.

## Теги (official)
- `atmosphere`
- `sky`
- `sun`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=atmosphere npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/atmosphere.html
```html
---
title: Atmosphere
shortdesc: Create a realistic atmosphere and sky dome.
longdesc: Use the <a href="../apidoc/classes/entities.Atmosphere.html" target="_blank"><code>Atmosphere</code></a> entity to display a realistic atmosphere for a specific <a href="../apidoc/classes/core.geographic.Ellipsoid.html" target="_blank"><code>ellipsoid</code></a>. The external side of the sphere displays the atmospheric halo, and the internal side displays a sky dome with realistic atmospheric scattering.
tags: [atmosphere, sky, sun]
---

<div class="side-pane-with-status-bar" style="width: 15rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body">
            <button
                type="button"
                class="btn btn-primary w-100"
                id="set-ground-position"
                title="Sets the camera position on the ground"
            >
                <i class="bi bi-crosshair"></i>
                Set ground position
            </button>

            <hr />

            <!-- Toggle outer atmosphere -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="outer"
                    autocomplete="off"
                />
                <label class="form-check-label" for="outer">Outer atmosphere</label>
            </div>

            <!-- Toggle inner atmosphere -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="inner"
                    autocomplete="off"
                />
                <label class="form-check-label" for="inner">Inner atmosphere</label>
            </div>

            <!-- Toggle sun position marker  -->
            <div
                class="form-check form-switch"
                title="The sun position marker must match the apparent sun position in the sky dome. Any discrepancy indicates an error in the sky dome shader."
            >
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="sun-marker"
                    autocomplete="off"
                />
                <label class="form-check-label" for="sun-marker">Sun position marker</label>
            </div>

            <!-- Toggle automatic sun rotation -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="automatic-sun-rotation"
                    autocomplete="off"
                />
                <label class="form-check-label" for="automatic-sun-rotation"
                    >Automatic sun rotation</label
                >
            </div>

            <!-- Toggle ellipsoid helper -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="show-ellipsoid"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-ellipsoid">Show ellipsoid</label>
            </div>

            <!-- Toggle look at sun -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="look-at-sun"
                    autocomplete="off"
                />
                <label class="form-check-label" for="look-at-sun">Look at sun</label>
            </div>

            <!-- Globe color -->
            <label class="form-check-label w-100 mt-3" for="globe-color">
                <div class="row">
                    <div class="col">Globe color</div>
                    <div class="col">
                        <input
                            type="color"
                            class="form-control form-control-color float-end h-100 w-100"
                            id="globe-color"
                            value="#2978b4"
                            title="Globe color"
                            autocomplete="off"
                        />
                    </div>
                </div>
            </label>

            <!-- Thickness -->
            <div class="row mt-2">
                <div class="col-5">
                    <label for="thickness" class="form-label">Thickness</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.0001"
                        value="0"
                        class="form-range"
                        id="thickness"
                        autocomplete="off"
                    />
                </div>
            </div>

            <h6 class="mt-3">Wavelengths ([0, 1])</h6>

            <!-- Red -->
            <div class="row">
                <div class="col-3">
                    <label for="red" class="form-label">Red</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.0001"
                        value="0"
                        class="form-range"
                        id="red"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Green -->
            <div class="row">
                <div class="col-3">
                    <label for="green" class="form-label">Green</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.0001"
                        value="0"
                        class="form-range"
                        id="green"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Blue -->
            <div class="row">
                <div class="col-3">
                    <label for="blue" class="form-label">Blue</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.0001"
                        value="0"
                        class="form-range"
                        id="blue"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/atmosphere.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import {
    Clock,
    Color,
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    SphereGeometry,
    Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Ellipsoid from '@giro3d/giro3d/core/geographic/Ellipsoid';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Atmosphere from '@giro3d/giro3d/entities/Atmosphere';
import SkyDome from '@giro3d/giro3d/entities/SkyDome';
import Inspector from '@giro3d/giro3d/gui/Inspector';
import EllipsoidHelper from '@giro3d/giro3d/helpers/EllipsoidHelper';
import DrawTool from '@giro3d/giro3d/interactions/DrawTool';

import { bindButton } from './widgets/bindButton';
import { bindColorPicker } from './widgets/bindColorPicker';
import { bindSlider } from './widgets/bindSlider';
import { bindToggle } from './widgets/bindToggle';
import StatusBar from './widgets/StatusBar';

const Z_UP = new Vector3(0, 0, 1);

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4978,
    backgroundColor: 'black',
});

const ellipsoid = Ellipsoid.WGS84;

const DEFAULT_PARAMS = {
    automaticSunRotation: true,
    fov: 30,
    redWavelength: 0.65,
    greenWavelength: 0.57,
    blueWavelength: 0.475,
    thickness: 300_000,
    globeColor: '#1e4485',
    showSunObject: true,
    sunPosition: new Vector3(0.2, 1, 0),
    inner: true,
    lookAtSun: false,
    outer: true,
    showSunMarker: false,
    showEllipsoidHelper: false,
    observer: new Coordinates(CoordinateSystem.epsg4326, 40, 25, 36_000_000),
    target: new Coordinates(CoordinateSystem.epsg4326, 0, 0, 0),
};

let params = { ...DEFAULT_PARAMS };

// For this example, we create a simple sphere Mesh. For a full-featured globe with map/GIS support, create a Globe object (see the "globe" example)
const globe = new Mesh(
    new SphereGeometry(ellipsoid.semiMajorAxis, 256, 128),
    new MeshStandardMaterial({
        color: params.globeColor,
        emissive: params.globeColor,
        emissiveIntensity: 0.1,
    }),
);

globe.name = 'Globe';

// Scale it to match the ellipsoid compression factor.
globe.scale.set(1, 1, ellipsoid.compressionFactor);
globe.updateMatrixWorld(true);

instance.threeObjects.add(globe);

/** @type {Atmosphere} */
let atmosphere;

// The skydome will be visible when the camera is near the ground.
const skyDome = new SkyDome();
instance.add(skyDome);

// Create simple orbit controls to move around globe.
// Those controls will be disabled when we are on the ground.
const controls = new OrbitControls(instance.view.camera, instance.domElement);
controls.target.set(0, 0, 0);
instance.view.setControls(controls);

function createAtmosphere() {
    if (atmosphere) {
        instance.remove(atmosphere);
    }

    atmosphere = new Atmosphere({ ellipsoid, thickness: params.thickness });

    instance.add(atmosphere);

    if (params.redWavelength) {
        atmosphere.redWavelength = params.redWavelength;
        atmosphere.greenWavelength = params.greenWavelength;
        atmosphere.blueWavelength = params.blueWavelength;
    }

    atmosphere.inner.visible = params.inner;
    atmosphere.outer.visible = params.outer;

    atmosphere.setSunPosition(params.sunPosition);
    skyDome.setSunPosition(params.sunPosition);

    instance.notifyChange(atmosphere);
}

createAtmosphere();

const camera = instance.view.camera;

function updateCamera() {
    const { observer, target } = params;

    const position = ellipsoid.toCartesian(
        observer.latitude,
        observer.longitude,
        observer.altitude,
    );
    camera.position.set(position.x, position.y, position.z);

    if (observer.altitude < 1_000_000) {
        const up = ellipsoid.getNormal(observer.latitude, observer.longitude);
        camera.up = up;
    } else {
        camera.up = Z_UP;
    }

    const lookAt = ellipsoid.toCartesian(target.latitude, target.longitude, target.altitude);
    camera.lookAt(lookAt);

    // @ts-expect-error typing
    camera.fov = params.fov;

    camera.updateMatrixWorld(true);
}

updateCamera();

const sun = new Mesh(
    new SphereGeometry(ellipsoid.semiMajorAxis * 0.02),
    new MeshBasicMaterial({ color: 'yellow' }),
);

const elt = document.createElement('span');
elt.style.width = '15px';
elt.style.height = '15px';
elt.style.backgroundColor = 'cyan';
elt.style.display = 'inline-block';
elt.style.borderRadius = '50%';
elt.style.borderWidth = '2px';
elt.style.borderStyle = 'solid';
elt.style.borderColor = 'black';
const sunCSSMarker = new CSS2DObject(elt);
sun.add(sunCSSMarker);

sun.name = 'Sun';

instance.add(sun);

// Let's create an ellipsoid helper to help us visualize the ellipsoid and its axes.
const helper = new EllipsoidHelper({ ellipsoid: ellipsoid.scale(1.01), segments: 64 });
instance.threeObjects.add(helper);
helper.visible = params.showEllipsoidHelper;

const sunlight = new DirectionalLight();
instance.add(sunlight);
instance.add(sunlight.target);

const apparentSunCourseRadius = ellipsoid.semiMajorAxis * 2;
const actualSunCourseRAdius = ellipsoid.semiMajorAxis * 200;

const clock = new Clock();
let time = 0;
const actualSunPosition = new Vector3(0, 0, 0);

const updateSunPosition = () => {
    requestAnimationFrame(updateSunPosition);

    if (!params.automaticSunRotation) {
        clock.stop();
        return;
    }

    if (!clock.running) {
        clock.start();
    }

    const speed = -1;

    time += clock.getDelta();
    const t = speed * time;

    const cosT = Math.cos(t);
    const sinT = Math.sin(t);

    const x = cosT * apparentSunCourseRadius;
    const y = sinT * apparentSunCourseRadius;

    actualSunPosition.setX(cosT * actualSunCourseRAdius);
    actualSunPosition.setY(sinT * actualSunCourseRAdius);

    sun.position.set(x, y, 0);

    sun.material.visible = params.showSunObject;

    sun.updateMatrixWorld(true);

    sunlight.position.copy(sun.position);
    sunlight.lookAt(globe.position);

    sunlight.updateMatrixWorld(true);

    if (atmosphere) {
        atmosphere.setSunPosition(sun.position);
    }

    skyDome.setSunPosition(sun.position);

    if (params.lookAtSun) {
        camera.lookAt(actualSunPosition);
    }

    instance.notifyChange();
};

updateSunPosition();

const [setRed] = bindSlider('red', v => {
    params.redWavelength = v;
    atmosphere.redWavelength = v;
    instance.notifyChange(atmosphere);
});
const [setGreen] = bindSlider('green', v => {
    params.greenWavelength = v;
    atmosphere.greenWavelength = v;
    instance.notifyChange(atmosphere);
});
const [setBlue] = bindSlider('blue', v => {
    params.blueWavelength = v;
    atmosphere.blueWavelength = v;
    instance.notifyChange(atmosphere);
});
const [setGlobeColor] = bindColorPicker('globe-color', c => {
    const color = new Color(c);
    params.globeColor = '#' + color.getHexString();
    globe.material.color = color;
    globe.material.emissive = color;

    instance.notifyChange();
});
const [setThickness] = bindSlider('thickness', thickness => {
    params.thickness = thickness;
    createAtmosphere();
});
const [showInner] = bindToggle('inner', show => {
    params.inner = show;
    atmosphere.inner.visible = show;
    instance.notifyChange();
});
const [showHelper] = bindToggle('show-ellipsoid', show => {
    params.showEllipsoidHelper = show;
    helper.showLabels = show;
    helper.visible = show;
    instance.notifyChange();
});
const [setLookAtSun] = bindToggle('look-at-sun', enable => {
    params.lookAtSun = enable;
    instance.notifyChange();
});
const [setAutomaticSunRotation] = bindToggle('automatic-sun-rotation', enabled => {
    params.automaticSunRotation = enabled;
});
const [showOuter] = bindToggle('outer', show => {
    params.outer = show;
    atmosphere.outer.visible = show;
    instance.notifyChange();
});
const [showMarker] = bindToggle('sun-marker', show => {
    params.showSunMarker = show;
    sunCSSMarker.visible = show;
    instance.notifyChange();
});

function goToGround(latitude, longitude) {
    params.fov = 120;

    helper.showLabels = false;

    controls.enabled = false;
    instance.view.setControls(null);

    const altitude = 100;

    params.observer = new Coordinates(CoordinateSystem.epsg4326, longitude, latitude, altitude);

    params.showSunObject = false;
    params.lookAtSun = false;

    params.target = new Coordinates(
        params.observer.crs,
        longitude + 0.01, // Look toward the east (the sunrise)
        latitude,
        altitude + 200, // And slightly above the horizon
    );

    setLookAtSun(params.lookAtSun);
    showInner(false);
    showOuter(false);

    updateCamera();
}

bindButton('set-ground-position', () => {
    const drawTool = new DrawTool({ instance });

    function vertexLabelFormatter({ position }) {
        const geo = ellipsoid.toGeodetic(position.x, position.y, position.z);

        return `lat: ${geo.latitude.toFixed(3)}°, lon: ${geo.longitude.toFixed(3)}°`;
    }

    drawTool.createPoint({ showVertexLabels: true, vertexLabelFormatter }).then(shape => {
        instance.remove(shape);

        const point = shape.points[0];

        const { latitude, longitude } = ellipsoid.toGeodetic(point.x, point.y, point.z);

        goToGround(latitude, longitude);
    });
});

function reset() {
    params = {
        ...DEFAULT_PARAMS,
        observer: DEFAULT_PARAMS.observer.clone(),
        target: DEFAULT_PARAMS.target.clone(),
    };

    showHelper(params.showEllipsoidHelper);
    setRed(params.redWavelength);
    setGreen(params.greenWavelength);
    setBlue(params.blueWavelength);
    setGlobeColor(params.globeColor);
    setThickness(params.thickness, 3_000, 300_000, 1);
    showOuter(params.outer);
    showInner(params.inner);
    setLookAtSun(params.lookAtSun);
    showMarker(params.showSunMarker);
    setAutomaticSunRotation(params.automaticSunRotation);
    updateCamera();

    instance.view.setControls(controls);
    controls.enabled = true;
    controls.target.set(0, 0, 0);
}

bindButton('reset', reset);

reset();

Inspector.attach('inspector', instance);
StatusBar.bind(instance, { disableUrlUpdate: true });
```

---

## Source: manuals/examples/axis-grid.md

Source Path: manuals/examples/axis-grid.md

# AxisGrid

## Официальный кейс
- Slug: `axis-grid`
- Официальная страница: https://giro3d.org/latest/examples/axis-grid.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/axis-grid.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/axis-grid.js`

## Краткое описание (official)
Illustrates the use of the AxisGrid entity.

## Расширенное описание (official longdesc)
The `AxisGrid` is useful to get a grasp of a dataset's volume in 3D space, including is height. The relative origin mode is useful to get a grasp of the dataset's size, with the absolute origin mode displays coordinates in the local CRS.

## Теги (official)
- `map`
- `axisgrid`
- `tiles`
- `xyz`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=axis-grid npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/axis-grid.html
```html
---
title: AxisGrid
shortdesc: Illustrates the use of the AxisGrid entity.
longdesc: The <a href="../apidoc/classes/entities.AxisGrid.html" target="_blank"><code>AxisGrid</code></a> is useful to get a grasp of a dataset's volume in 3D space, including is height. The relative origin mode is useful to get a grasp of the dataset's size, with the absolute origin mode displays coordinates in the local CRS.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [map, axisgrid, tiles, xyz]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Color -->
            <label class="form-check-label w-100 mb-2" for="color">
                <div class="row">
                    <div class="col-auto">Color</div>
                    <div class="col">
                        <input
                            type="color"
                            class="form-control form-control-color float-end h-100 w-100"
                            id="color"
                            value="#ffffff"
                            title="color"
                            autocomplete="off"
                        />
                    </div>
                </div>
            </label>

            <!-- Show/Hide AxisGrid -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="entity"
                    autocomplete="off"
                />
                <label class="form-check-label" for="entity">Show axis grid</label>
            </div>

            <!-- Toggle adaptive labels -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="adaptive-labels"
                    autocomplete="off"
                />
                <label class="form-check-label" for="adaptive-labels"
                    >Adaptive labels
                    <span class="text-secondary" data-bs-toggle="popover" data-bs-content="help"
                        ><i class="bi bi-question-circle"></i></span
                ></label>

                <p class="card-text d-none" id="help">
                    <b>Adaptive labels</b> are displayed at the intersection of grid lines and the
                    viewport's edges.
                </p>
            </div>

            <!-- Toggle custom CSS labels -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="custom-css"
                    autocomplete="off"
                />
                <label class="form-check-label" for="custom-css"
                    >Use custom CSS
                    <span
                        class="text-secondary"
                        data-bs-toggle="popover"
                        data-bs-content="help-custom-css"
                        ><i class="bi bi-question-circle"></i></span
                ></label>

                <p class="card-text d-none" id="help-custom-css">
                    Use the <code>label-created</code> event to customize the DOM element of labels.
                </p>
            </div>

            <!-- Absolute/Relative -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="origin"
                    autocomplete="off"
                />
                <label class="form-check-label" for="origin"
                    >Relative origin
                    <span
                        class="text-secondary"
                        data-bs-toggle="popover"
                        data-bs-content="help-origin"
                        ><i class="bi bi-question-circle"></i></span
                ></label>

                <p class="card-text d-none" id="help-origin">
                    If enabled, the ticks start at the lower-left (south-west) corner of the grid.
                    If disabled, the ticks start at the origin point of the coordinate system.
                </p>
            </div>

            <!-- Show/Hide ceiling -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="ceiling"
                    autocomplete="off"
                />
                <label class="form-check-label" for="ceiling">Show ceiling</label>
            </div>

            <!-- Show/Hide floor -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="floor"
                    autocomplete="off"
                />
                <label class="form-check-label" for="floor">Show floor</label>
            </div>

            <!-- Show/Hide sides -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="sides"
                    autocomplete="off"
                />
                <label class="form-check-label" for="sides">Show sides</label>
            </div>

            <div class="my-2"></div>

            <!-- X step -->
            <label for="x-axis-step" class="form-label">X axis step</label>
            <div class="input-group">
                <input
                    type="number"
                    min="100"
                    max="3000"
                    class="form-control"
                    value="1000"
                    step="100"
                    id="x-axis-step"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Y step -->
            <label for="y-axis-step" class="form-label">Y axis step</label>
            <div class="input-group">
                <input
                    type="number"
                    min="100"
                    max="3000"
                    value="1000"
                    step="100"
                    class="form-control"
                    id="y-axis-step"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Z step -->
            <label for="z-axis-step" class="form-label">Z axis step</label>
            <div class="input-group">
                <input
                    type="number"
                    min="100"
                    max="3000"
                    value="200"
                    step="100"
                    class="form-control"
                    id="z-axis-step"
                    autocomplete="off"
                />
            </div>

            <div class="my-4"></div>

            <!-- Randomize grid position -->
            <button type="button" class="btn btn-primary w-100" id="randomize-position">
                <i class="bi bi-shuffle"></i>
                Randomize position
            </button>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/axis-grid.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import XYZ from 'ol/source/XYZ.js';
import { Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Interpretation from '@giro3d/giro3d/core/layer/Interpretation.js';
import AxisGrid, { TickOrigin } from '@giro3d/giro3d/entities/AxisGrid.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import GeoTIFFFormat from '@giro3d/giro3d/formats/GeoTIFFFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const x = -13602000;
const y = 5812000;
const halfWidth = 2500;

const extent = new Extent(
    CoordinateSystem.epsg3857,
    x - halfWidth,
    x + halfWidth,
    y - halfWidth,
    y + halfWidth,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

const map = new Map({
    extent,
    lighting: true,
    discardNoData: true,
    side: DoubleSide,
    backgroundColor: 'white',
});

const params = {
    useCustomCss: false,
};

instance.add(map);

const source = new TiledImageSource({
    source: new XYZ({
        minZoom: 10,
        maxZoom: 16,
        url: 'https://3d.oslandia.com/dem/MtStHelens-tiles/{z}/{x}/{y}.tif',
    }),
    format: new GeoTIFFFormat(),
});

const floor = 1100;
const ceiling = 2500;

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));

const dem = new ElevationLayer({
    name: 'dem',
    extent,
    interpretation: Interpretation.Raw,
    source,
    colorMap: new ColorMap({ colors, min: floor, max: ceiling, mode: ColorMapMode.Elevation }),
});

map.addLayer(dem);

// Create an axis grid that encompasses the Map.
const axisGrid = new AxisGrid({
    volume: {
        extent: extent.withRelativeMargin(0.1),
        floor,
        ceiling,
    },
    ticks: {
        x: 1000,
        y: 1000,
        z: 200,
    },
});

/**
 * @param {object} param0
 * @param {HTMLSpanElement} param0.label - The label element.
 */
const onLabelCreated = ({ label }) => {
    if (params.useCustomCss) {
        label.classList.add('badge');
        label.classList.add('rounded-pill');
        label.classList.add('text-bg-light');
    }
};

// Let's customize the labels with bootstrap classes
// In you own application, you can use your own CSS classes of courses
axisGrid.addEventListener('label-created', onLabelCreated);

instance.add(axisGrid);

instance.view.camera.position.set(-13594700, 5819700, 7300);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target.set(-13603000, 5811000, 0);
instance.view.setControls(controls);

function bindAxisStep(axis) {
    bindSlider(`${axis}-axis-step`, v => {
        axisGrid.ticks[axis] = v;
        axisGrid.refresh();
        instance.notifyChange(axisGrid);
    });
}

bindAxisStep('x');
bindAxisStep('y');
bindAxisStep('z');

bindColorPicker('color', color => {
    axisGrid.color = color;
    instance.notifyChange(axisGrid);
});

bindToggle('entity', v => {
    axisGrid.visible = v;
    instance.notifyChange(axisGrid);
});
bindToggle('origin', v => {
    axisGrid.origin = v ? TickOrigin.Relative : TickOrigin.Absolute;
    axisGrid.refresh();
    instance.notifyChange(axisGrid);
});
bindToggle('ceiling', v => {
    axisGrid.showCeilingGrid = v;
    instance.notifyChange(axisGrid);
});
bindToggle('floor', v => {
    axisGrid.showFloorGrid = v;
    instance.notifyChange(axisGrid);
});
bindToggle('sides', v => {
    axisGrid.showSideGrids = v;
    instance.notifyChange(axisGrid);
});
bindToggle('adaptive-labels', v => {
    axisGrid.adaptiveLabels = v;
    instance.notifyChange(axisGrid);
});
bindToggle('custom-css', v => {
    params.useCustomCss = v;
    axisGrid.refresh();
    instance.notifyChange(axisGrid);
});

document.getElementById('randomize-position').onclick = () => {
    const current = axisGrid.volume.extent;
    const dims = current.dimensions();
    const center = current.centerAsVector3();
    const range = 5000;
    center.set(
        center.x + (Math.random() - 0.5) * range,
        center.y + (Math.random() - 0.5) * range,
        0,
    );
    const newExtent = new Extent(
        current.crs,
        center.x - dims.x / 2,
        center.x + dims.x / 2,
        center.y - dims.y / 2,
        center.y + dims.y / 2,
    );

    axisGrid.volume.extent = newExtent;
    axisGrid.refresh();
    instance.notifyChange(axisGrid);
};

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/camera-controls-integration.md

Source Path: manuals/examples/camera-controls-integration.md

# Custom controls

## Официальный кейс
- Slug: `camera-controls-integration`
- Официальная страница: https://giro3d.org/latest/examples/camera-controls-integration.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/camera-controls-integration.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/camera-controls-integration.js`

## Краткое описание (official)
Illustrates the use of the <code>camera-controls</code> plugin.

## Расширенное описание (official longdesc)
The `camera-controls` is a powerful navigation controller for three.js that supports touch and mouse/keyboard-based navigation and is highly configurable.

## Теги (official)
- `navigation`
- `controls`
- `3d tiles`
- `wms`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=camera-controls-integration npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/camera-controls-integration.html
```html
---
title: Custom controls
shortdesc: Illustrates the use of the <code>camera-controls</code> plugin.
longdesc: The <a href="https://github.com/yomotsu/camera-controls" target="_blank"><code>camera-controls</code></a> is a powerful navigation controller for three.js that supports touch and mouse/keyboard-based navigation and is highly configurable.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
dependencies: ['camera-controls']
tags: [navigation, controls, '3d tiles', 'wms']
---

<!-- Screenshot's icon from Lucide: https://github.com/lucide-icons/lucide -->
<div class="side-pane-with-status-bar">
    <button class="btn btn-primary" id="animate">Animate</button>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/camera-controls-integration.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import CameraControls from 'camera-controls';
import {
    Box3,
    Clock,
    CubeTextureLoader,
    Matrix4,
    Quaternion,
    Raycaster,
    Sphere,
    Spherical,
    Vector2,
    Vector3,
    Vector4,
} from 'three';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import Panel from '@giro3d/giro3d/gui/Panel.js';
import { MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import StatusBar from './widgets/StatusBar.js';

CameraControls.install({
    THREE: {
        Vector2,
        Vector3,
        Vector4,
        Quaternion,
        Matrix4,
        Spherical,
        Box3,
        Sphere,
        Raycaster,
    },
});

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 ' +
        '+y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const instance = new Instance({
    target: 'view',
    crs,
});

const pointcloud = new Tiles3D({
    url: 'https://3d.oslandia.com/3dtiles/lyon.3dtiles/tileset.json',
    pointCloudMode: MODE.TEXTURE,
    errorTarget: 15,
});

instance.add(pointcloud).then(pc => {
    const url = 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

    // Let's build the color layer from the WMTS capabilities
    WmtsSource.fromCapabilities(url, {
        layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
    })
        .then(orthophotoWmts => {
            pc.setColorLayer(
                new ColorLayer({
                    name: 'color',
                    source: orthophotoWmts,
                }),
            );
        })
        .catch(console.error);
});

// Configure our controls
const controls = new CameraControls(instance.view.camera, instance.domElement);

controls.dollyToCursor = true;
controls.verticalDragToForward = true;

controls.mouseButtons.left = CameraControls.ACTION.TRUCK;
controls.mouseButtons.right = CameraControls.ACTION.ROTATE;
controls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
controls.mouseButtons.middle = CameraControls.ACTION.DOLLY;

const clock = new Clock();

// Update controls from event loop - this replaces the requestAnimationFrame logic from
// camera-controls sample code
instance.addEventListener('before-camera-update', () => {
    // Called from Giro3D
    const delta = clock.getDelta();
    const hasControlsUpdated = controls.update(delta);
    if (hasControlsUpdated) {
        instance.notifyChange(instance.view.camera);
    }
});
// As Giro3D runs the event loop only when needed, we need to notify Giro3D when
// the controls update the view.
// We need both events to make sure the view is updated from user interactions and from animations
controls.addEventListener('update', () => instance.notifyChange(instance.view.camera));
controls.addEventListener('control', () => instance.notifyChange(instance.view.camera));

// place camera
controls.setLookAt(1842456, 5174330, 735, 1841993, 5175493, 188);

// And now we can add some custom behavior

const executeInteraction = callback => {
    // Execute the interaction
    const res = callback() ?? Promise.resolve();

    // As mainloop can pause, before-camera-update can be triggered irregularly
    // Make sure to "reset" the clock to enable smooth transitions with camera-controls
    clock.getDelta();
    // Dispatch events so Giro3D gets notified
    controls.dispatchEvent({ type: 'update' });
    return res;
};

// Add some controls on keyboard
const keys = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    BOTTOM: 'ArrowDown',
};
instance.domElement.addEventListener('keydown', e => {
    let forwardDirection = 0;
    let truckDirectionX = 0;
    const factor = e.ctrlKey || e.metaKey || e.shiftKey ? 200 : 20;
    switch (e.code) {
        case keys.UP:
            forwardDirection = 1;
            break;

        case keys.BOTTOM:
            forwardDirection = -1;
            break;

        case keys.LEFT:
            truckDirectionX = -1;
            break;

        case keys.RIGHT:
            truckDirectionX = 1;
            break;

        default:
        // do nothing
    }
    if (forwardDirection) {
        executeInteraction(() =>
            controls.forward(forwardDirection * controls.truckSpeed * factor, true),
        );
    }
    if (truckDirectionX) {
        executeInteraction(() =>
            controls.truck(truckDirectionX * controls.truckSpeed * factor, 0, true),
        );
    }
});

// Make rotation around where the user clicked
instance.domElement.addEventListener('contextmenu', e => {
    const picked = instance.pickObjectsAt(e, {
        limit: 1,
        radius: 20,
        filter: p =>
            // Make sure we pick a valid point
            Number.isFinite(p.point.x) && Number.isFinite(p.point.y) && Number.isFinite(p.point.z),
    })[0];

    if (picked) {
        controls.setOrbitPoint(picked.point.x, picked.point.y, picked.point.z);
    }
});

// add a skybox background
const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('image/skyboxsun25deg_zup/');
const cubeTexture = cubeTextureLoader.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
]);

instance.scene.background = cubeTexture;

const inspector = Inspector.attach('inspector', instance);

class ControlsInspector extends Panel {
    constructor(gui, _instance, _controls) {
        super(gui, _instance, 'Controls');

        this.controls = _controls;
        this.target = new Vector3();
        this.controls.getTarget(this.target);

        this.addController(this.controls, 'enabled').name('Enabled');
        this.addController(this.controls, 'active').name('Active');

        const target = this.gui.addFolder('Target');
        target.close();
        this._controllers.push(target.add(this.target, 'x'));
        this._controllers.push(target.add(this.target, 'y'));
        this._controllers.push(target.add(this.target, 'z'));

        this._eventhandlers = {
            control: () => this.controls.getTarget(this.target),
        };

        this.addController(this.controls, 'distance').name('Distance');
        this.addController(this.controls, 'polarAngle').name('Polar angle');
        this.addController(this.controls, 'azimuthAngle').name('Azimuth angle');

        this.needsUpdate = false;

        this.controls.addEventListener('update', this._eventhandlers.control);
    }

    /**
     * @override
     */
    dispose() {
        this.controls.removeEventListener('update', this._eventhandlers.control);
        super.dispose();
    }
}

const controlsInspector = new ControlsInspector(inspector.gui, instance, controls);
inspector.addPanel(controlsInspector);

// Add some animations
document.getElementById('animate').onclick = () => {
    executeInteraction(async () => {
        await controls.rotate((Math.random() - 0.5) * (Math.PI / 2), 0, true);
        await controls.rotatePolarTo(Math.PI / 8, true);
        await controls.dolly((Math.random() - 0.5) * 1000, true);
    });
};

StatusBar.bind(instance);
```

---

## Source: manuals/examples/clipping-planes.md

Source Path: manuals/examples/clipping-planes.md

# Clipping planes

## Официальный кейс
- Slug: `clipping-planes`
- Официальная страница: https://giro3d.org/latest/examples/clipping-planes.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/clipping-planes.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/clipping-planes.js`

## Краткое описание (official)
Clip various entities with clipping planes.

## Расширенное описание (official longdesc)
Giro3D entities support three.js's clipping planes. To add one or more clipping planes to an entity, use the `Entity3D.clippingPlanes` property. In this examples, we create a cube-shaped clipping volume by combining 6 clipping planes (one for each side of the cube).

## Теги (official)
- `map`
- `point cloud`
- `clipping`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=clipping-planes npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/clipping-planes.html
```html
---
title: Clipping planes
shortdesc: Clip various entities with clipping planes.
longdesc: Giro3D entities support three.js's <a target="_blank" href="https://threejs.org/docs/index.html?q=materia#api/en/materials/Material.clippingPlanes">clipping planes</a>. To add one or more clipping planes to an entity, use the <code>Entity3D.clippingPlanes</code> property. In this examples, we create a cube-shaped clipping volume by combining 6 clipping planes (one for each side of the cube).</a>
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, 'point cloud', clipping]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <fieldset id="options">
                <!-- Mode -->
                <div class="input-group mb-2">
                    <label class="input-group-text" for="mode">Mode</label>
                    <select class="form-select" id="mode" autocomplete="off">
                        <option value="slice" selected>Slice</option>
                        <option value="volume">Volume</option>
                    </select>
                </div>

                <div id="volume-options" class="my-3" style="display: none">
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked="true"
                            role="switch"
                            id="toggle-show-volume"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="toggle-show-volume">Show volume</label>
                    </div>

                    <label for="slider-size" class="form-label">Volume size</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="1"
                            max="30000"
                            value="3000"
                            step="10"
                            class="form-range"
                            id="slider-size"
                            autocomplete="off"
                        />
                    </div>
                </div>

                <div id="slice-options" class="my-3">
                    <button class="btn btn-primary w-100" id="draw">
                        <i class="bi bi-pencil-fill"></i> Draw cross-section
                    </button>
                </div>

                <hr />

                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="toggle-show-map"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="toggle-show-map">Show Map</label>
                </div>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="toggle-show-pointcloud"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="toggle-show-pointcloud"
                        >Show point cloud</label
                    >
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="toggle-map" />
                    <label class="form-check-label" for="toggle-map"
                        >Apply clipping planes on map</label
                    >
                </div>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="toggle-pointcloud"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="toggle-pointcloud"
                        >Apply clipping planes on point cloud</label
                    >
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/clipping-planes.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import {
    Box3,
    Box3Helper,
    BoxGeometry,
    DoubleSide,
    Group,
    Mesh,
    MeshBasicMaterial,
    Plane,
    Vector3,
} from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import DrawTool from '@giro3d/giro3d/interactions/DrawTool.js';
import { MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const epsg2154 = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const instance = new Instance({
    target: 'view',
    crs: epsg2154,
});

instance.renderingOptions.enableEDL = true;

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

instance.view.setControls(controls);

const pointCloud = new Tiles3D({
    url: 'https://3d.oslandia.com/lidar_hd/tileset.json',
    pointCloudMode: MODE.ELEVATION,
    colorMap: new ColorMap({ colors: makeColorRamp('rdbu').reverse(), min: 200, max: 1800 }),
});

instance.add(pointCloud);

/**
 * @type {Plane[]}
 */
let planes = null;

let boxSize = 3000;

/**
 * @param {Box3} box The box
 */
function getPlanesFromBoxSides(box) {
    const result = [];

    // Notice that when the plane has a positive normal, the distance to the box must be negated
    result.push(new Plane(new Vector3(0, 0, +1), -box.min.z));
    result.push(new Plane(new Vector3(0, 0, -1), +box.max.z));
    result.push(new Plane(new Vector3(+1, 0, 0), -box.min.x));
    result.push(new Plane(new Vector3(-1, 0, 0), +box.max.x));
    result.push(new Plane(new Vector3(0, +1, 0), -box.min.y));
    result.push(new Plane(new Vector3(0, -1, 0), +box.max.y));

    return result;
}

const extent = new Extent(
    epsg2154,
    902000.3307342547,
    927999.9889373797,
    6444999.999618538,
    6466999.990463264,
);
const options = {
    showHelper: true,
    enableClippingPlanes: true,
    applyOnMap: false,
    showMap: true,
    applyOnPointCloud: true,
    showPointCloud: true,
    mode: 'slice',
};

// create a map
const map = new Map({
    extent,
    lighting: false,
    discardNoData: true,
    side: DoubleSide,
});
instance.add(map);

const noDataValue = -1000;

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                name: 'wmts_elevation',
                extent: map.extent,
                // We don't need the full resolution of terrain because we are not using any shading
                resolutionFactor: 0.25,
                minmax: { min: 0, max: 5000 },
                noDataOptions: {
                    replaceNoData: false,
                },
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        map.addLayer(
            new ColorLayer({
                name: 'wmts_orthophotos',
                extent: map.extent,
                source: orthophotoWmts,
            }),
        );
    })
    .catch(console.error);

const box3 = new Box3();
const center = map.extent.centerAsVector2();
const boxCenter = new Vector3(center.x, center.y, 800);

const volumeHelpers = new Group();
instance.scene.add(volumeHelpers);

/** @type {Box3Helper} */
let helper;
/** @type {Mesh} */
let box;

const helperMaterial = new MeshBasicMaterial({
    color: 'yellow',
    opacity: 0.1,
    transparent: true,
});

function deleteBox() {
    box?.geometry?.dispose();
    box?.removeFromParent();
    helper?.dispose();
    helper?.removeFromParent();
}

function generateBoxHelper() {
    deleteBox();

    box3.setFromCenterAndSize(boxCenter, new Vector3(boxSize, boxSize, boxSize));
    const boxGeometry = new BoxGeometry(boxSize, boxSize, boxSize);
    box = new Mesh(boxGeometry, helperMaterial);
    helper = new Box3Helper(box3, 'yellow');
    box.renderOrder = 2;
    volumeHelpers.add(helper);
    volumeHelpers.add(box);
    box.position.copy(boxCenter);
    box.updateMatrixWorld();
    helper.updateMatrixWorld();
    volumeHelpers.updateMatrixWorld();
}

// refresh scene
instance.notifyChange(instance.view.camera);

function update() {
    volumeHelpers.visible = options.showHelper && options.enableClippingPlanes;
    map.visible = options.showMap;
    pointCloud.visible = options.showPointCloud;
    map.clippingPlanes = options.enableClippingPlanes && options.applyOnMap ? planes : null;
    pointCloud.clippingPlanes =
        options.enableClippingPlanes && options.applyOnPointCloud ? planes : null;
    instance.notifyChange();
}

const updateFromBox = () => {
    generateBoxHelper();
    planes = getPlanesFromBoxSides(box3);

    update();
};

let currentSegment;

bindDropDown('mode', mode => {
    options.mode = mode;
    const volumeOptions = document.getElementById('volume-options');
    const sliceOptions = document.getElementById('slice-options');

    volumeOptions.style.display = 'block';
    sliceOptions.style.display = 'block';

    switch (mode) {
        case 'slice':
            volumeOptions.style.display = 'none';
            planes = [];
            deleteBox();
            update();
            break;
        case 'volume':
            sliceOptions.style.display = 'none';
            if (currentSegment) {
                instance.remove(currentSegment);
                currentSegment = null;
            }
            updateFromBox();
            break;
    }
});

const drawTool = new DrawTool({ instance });
drawTool.addEventListener('start-drag', () => (controls.enabled = false));
drawTool.addEventListener('end-drag', () => (controls.enabled = true));
drawTool.enterEditMode();

bindButton('draw', () => {
    const plane = new Plane();

    if (currentSegment) {
        instance.remove(currentSegment);
        currentSegment = null;
    }

    const updatePlanes = shape => {
        if (shape && shape.points.length === 2) {
            const a = shape.points[0];
            const b = shape.points[1];
            const c = shape.points[1].clone().setZ(b.z + 100);

            plane.setFromCoplanarPoints(a, b, c);

            planes = [plane];

            update();
        }
    };

    drawTool
        .createSegment({
            onTemporaryPointMoved: updatePlanes,
            afterUpdatePoint: ({ shape }) => updatePlanes(shape),
        })
        .then(shape => {
            currentSegment = shape;
            updatePlanes(shape);
        });
});

bindToggle('toggle-show-volume', v => {
    options.showHelper = v;
    updateFromBox();
});

bindToggle('toggle-pointcloud', v => {
    options.applyOnPointCloud = v;
    update();
});

bindToggle('toggle-show-pointcloud', v => {
    options.showPointCloud = v;
    update();
});

bindToggle('toggle-show-map', v => {
    options.showMap = v;
    update();
});

bindToggle('toggle-map', v => {
    options.applyOnMap = v;
    update();
});

bindSlider('slider-size', v => {
    boxSize = v;
    updateFromBox();
});

// Configure camera
const lookAt = new Vector3(915833, 6455879, 121);
instance.view.camera.position.set(909914, 6448629, 7925);
instance.view.camera.lookAt(lookAt);
controls.target.copy(lookAt);
controls.saveState();

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/color-adjustments.md

Source Path: manuals/examples/color-adjustments.md

# Color Adjustments

## Официальный кейс
- Slug: `color-adjustments`
- Официальная страница: https://giro3d.org/latest/examples/color-adjustments.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/color-adjustments.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/color-adjustments.js`

## Краткое описание (official)
Set brightness, constrast, and saturation on color layers and maps.

## Теги (official)
- `map`
- `colorimetry`

## Атрибуция (official)
© IGN, Métropole Grand Lyon

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=color-adjustments npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/color-adjustments.html
```html
---
title: Color Adjustments
shortdesc: Set brightness, constrast, and saturation on color layers and maps.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>, <a target="_blank" href="https://www.grandlyon.com/">Métropole Grand Lyon</a>
tags: [map, colorimetry]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>
        <div class="card-body">
            <select class="form-select" id="layer-select">
                <option value="map">Map</option>
                <option value="satellite">Satellite layer</option>
                <option value="geojson">GeoJSON layer</option>
            </select>

            <div id="map-settings">
                <!-- Map parameters -->
                <form>
                    <label for="map-brightness" class="form-label">Brightness</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            value="0"
                            class="form-range"
                            step="0.05"
                            id="map-brightness"
                            autocomplete="off"
                        />
                    </div>

                    <label for="map-contrast" class="form-label">Contrast</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value="1"
                            class="form-range"
                            step="0.05"
                            id="map-contrast"
                            autocomplete="off"
                        />
                    </div>

                    <label for="map-saturation" class="form-label">Saturation</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value="1"
                            class="form-range"
                            step="0.05"
                            id="map-saturation"
                            autocomplete="off"
                        />
                    </div>
                </form>
            </div>
            <div id="satellite-settings" style="display: none">
                <!-- Satellite layer parameters -->
                <form>
                    <label for="satellite-brightness" class="form-label">Brightness</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            value="0"
                            class="form-range"
                            step="0.05"
                            id="satellite-brightness"
                            autocomplete="off"
                        />
                    </div>

                    <label for="satellite-contrast" class="form-label">Contrast</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value="1"
                            class="form-range"
                            step="0.05"
                            id="satellite-contrast"
                            autocomplete="off"
                        />
                    </div>

                    <label for="satellite-saturation" class="form-label">Saturation</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value="1"
                            class="form-range"
                            step="0.05"
                            id="satellite-saturation"
                            autocomplete="off"
                        />
                    </div>
                </form>
            </div>
            <div id="geojson-settings" style="display: none">
                <!-- Vector layer parameters -->
                <form>
                    <label for="vector-brightness" class="form-label">Brightness</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            value="0"
                            class="form-range"
                            step="0.05"
                            id="vector-brightness"
                            autocomplete="off"
                        />
                    </div>

                    <label for="vector-contrast" class="form-label">Contrast</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value="1"
                            class="form-range"
                            step="0.05"
                            id="vector-contrast"
                            autocomplete="off"
                        />
                    </div>

                    <label for="vector-saturation" class="form-label">Saturation</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value="1"
                            class="form-range"
                            step="0.05"
                            id="vector-saturation"
                            autocomplete="off"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/color-adjustments.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';
import WmsSource from '@giro3d/giro3d/sources/WmsSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import StatusBar from './widgets/StatusBar.js';

const epsg3946 = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
const epsg4171 = CoordinateSystem.register(
    'EPSG:4171',
    '+proj=longlat +ellps=GRS80 +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs: epsg3946,
});

const xmin = 1837816.94334;
const xmax = 1847692.32501;
const ymin = 5170036.4587;
const ymax = 5178412.82698;

const extent = new Extent(epsg3946, xmin, xmax, ymin, ymax);

const map = new Map({ extent });
instance.add(map);

const satelliteSource = new WmsSource({
    url: 'https://data.geopf.fr/wms-r',
    projection: 'EPSG:3946',
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
    imageFormat: 'image/jpeg',
});

const satellite = new ColorLayer({
    name: 'satellite',
    source: satelliteSource,
    extent: map.extent,
});
map.addLayer(satellite);

// Adds our first layer from a geojson file
// Initial source: https://data.grandlyon.com/jeux-de-donnees/parcs-places-jardins-indice-canopee-metropole-lyon/info
const geoJsonLayer = new ColorLayer({
    name: 'geojson',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/lyon/evg_esp_veg.evgparcindiccanope_latest.geojson',
            format: new GeoJSON(),
        },
        // Defines the dataProjection to reproject the data,
        // GeoJSON specifications say that the crs should be EPSG:4326 but
        // here we are using a different one.
        dataProjection: epsg4171,
        style: feature =>
            new Style({
                fill: new Fill({
                    color: `rgba(0, 128, 0, ${feature.get('indiccanop')})`,
                }),
                stroke: new Stroke({
                    color: 'white',
                }),
            }),
    }),
});
map.addLayer(geoJsonLayer);

const camera = instance.view.camera;
const cameraAltitude = 2000;

const center = extent.centerAsVector3();

const cameraPosition = new Vector3(center.x, center.y, cameraAltitude);
camera.position.copy(cameraPosition);

const controls = new MapControls(camera, instance.domElement);
controls.target = center;

controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;

controls.saveState();

instance.view.setControls(controls);

const [setSatelliteBrightness] = bindSlider('satellite-brightness', v => {
    satellite.brightness = v;
    instance.notifyChange(map);
});
const [setSatelliteContrast] = bindSlider('satellite-contrast', v => {
    satellite.contrast = v;
    instance.notifyChange(map);
});
const [setSatelliteSaturation] = bindSlider('satellite-saturation', v => {
    satellite.saturation = v;
    instance.notifyChange(map);
});
const [setVectorBrightness] = bindSlider('vector-brightness', v => {
    geoJsonLayer.brightness = v;
    instance.notifyChange(map);
});
const [setVectorContrast] = bindSlider('vector-contrast', v => {
    geoJsonLayer.contrast = v;
    instance.notifyChange(map);
});
const [setVectorSaturation] = bindSlider('vector-saturation', v => {
    geoJsonLayer.saturation = v;
    instance.notifyChange(map);
});

const mapParams = map.colorimetry;

const [setMapBrightness] = bindSlider('map-brightness', v => {
    mapParams.brightness = v;
    instance.notifyChange(map);
});
const [setMapContrast] = bindSlider('map-contrast', v => {
    mapParams.contrast = v;
    instance.notifyChange(map);
});
const [setMapSaturation] = bindSlider('map-saturation', v => {
    mapParams.saturation = v;
    instance.notifyChange(map);
});

bindButton('reset', () => {
    setMapBrightness(0);
    setMapContrast(1);
    setMapSaturation(1);

    setVectorBrightness(0);
    setVectorContrast(1);
    setVectorSaturation(1);

    setSatelliteBrightness(0);
    setSatelliteContrast(1);
    setSatelliteSaturation(1);

    instance.notifyChange(map);
});

bindDropDown('layer-select', selectedValue => {
    document.getElementById('map-settings').style.display = 'none';
    document.getElementById('satellite-settings').style.display = 'none';
    document.getElementById('geojson-settings').style.display = 'none';

    if (selectedValue === 'map') {
        document.getElementById('map-settings').style.display = 'block';
    } else if (selectedValue === 'satellite') {
        document.getElementById('satellite-settings').style.display = 'block';
    } else if (selectedValue === 'geojson') {
        document.getElementById('geojson-settings').style.display = 'block';
    }
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/colorized-3d-tiles-point-cloud.md

Source Path: manuals/examples/colorized-3d-tiles-point-cloud.md

# Colorized 3D Tiles Point Cloud

## Официальный кейс
- Slug: `colorized-3d-tiles-point-cloud`
- Официальная страница: https://giro3d.org/latest/examples/colorized-3d-tiles-point-cloud.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/colorized-3d-tiles-point-cloud.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/colorized-3d-tiles-point-cloud.js`

## Краткое описание (official)
Illustrates colorization of point clouds with multiple modes.

## Расширенное описание (official longdesc)
Point clouds can be colorized from different methods &#58; using the original color in the point cloud, coloring using an elevation gradient, or coloring using an external image source, such as a WMS layer.

## Теги (official)
- `point`
- `cloud`
- `wms`
- `3d tiles`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=colorized-3d-tiles-point-cloud npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/colorized-3d-tiles-point-cloud.html
```html
---
title: Colorized 3D Tiles Point Cloud
shortdesc: Illustrates colorization of point clouds with multiple modes.
longdesc: Point clouds can be colorized from different methods &#58; using the original color in the point cloud, coloring using an elevation gradient, or coloring using an external image source, such as a WMS layer.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
dependencies: ['colormap']
tags: [point, cloud, wms, '3d tiles']
---

<div class="side-pane-with-status-bar">
    <!-- Top color layer -->
    <div class="card">
        <div class="card-header">Options</div>

        <div class="card-body" id="top-options">
            <!-- Coloring mode -->
            <div class="input-group">
                <span class="input-group-text flex-grow-1">Mode</span>
                <select
                    class="btn btn-outline-primary btn-sm"
                    id="pointcloud_mode"
                    autocomplete="off"
                >
                    <option value="0">point cloud colors</option>
                    <option value="5">elevation gradient</option>
                    <option value="4" selected>color layer</option>
                </select>
            </div>

            <!-- Color ramp -->
            <div class="d-none my-2" id="colormapGroup">
                <div class="input-group">
                    <span class="input-group-text flex-grow-1">Color ramp</span>
                    <select class="btn btn-outline-primary btn-sm" id="colormap" autocomplete="off">
                        <option value="viridis" selected>Viridis</option>
                        <option value="jet">Jet</option>
                        <option value="blackbody">Blackbody</option>
                        <option value="earth">Earth</option>
                        <option value="bathymetry">Bathymetry</option>
                        <option value="magma">Magma</option>
                        <option value="par">Par</option>
                    </select>
                </div>

                <div class="input-group my-2">
                    <label for="min" class="form-label" id="minLabel">Lower bound: 100m</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value="100"
                            class="form-range"
                            id="min"
                            autocomplete="off"
                        />
                    </div>
                </div>

                <div class="input-group my-2">
                    <label for="max" class="form-label" id="maxLabel">Upper bound: 600m</label>
                    <div class="input-group">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value="600"
                            class="form-range"
                            id="max"
                            autocomplete="off"
                        />
                    </div>
                </div>
            </div>

            <!-- Opacity -->
            <div class="input-group my-2">
                <label for="opacity" class="form-label" id="opacityLabel"
                    >Point cloud opacity: 100%</label
                >
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value="1"
                        class="form-range"
                        id="opacity"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Activate EDL -->
            <div class="input-group my-2">
                <div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            checked
                            type="checkbox"
                            role="switch"
                            id="edl-enable"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="edl-enable"
                            >Eye dome lighting (EDL)</label
                        >
                    </div>
                </div>
            </div>

            <!-- EDL intensity -->
            <div class="input-group my-2">
                <label for="edl-intensity" class="form-label">EDL intensity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        step="0.05"
                        max="2"
                        value="0.7"
                        class="form-range"
                        id="edl-intensity"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- EDL radius -->
            <div class="input-group my-2">
                <label for="edl-radius" class="form-label">EDL radius</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0.1"
                        step="0.05"
                        max="5"
                        value="1.5"
                        class="form-range"
                        id="edl-radius"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Activate occlusion -->
            <div class="input-group my-2">
                <div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            checked
                            type="checkbox"
                            role="switch"
                            id="occlusion-enable"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="occlusion-enable"
                            >Point occlusion effect</label
                        >
                    </div>
                </div>
            </div>

            <!-- Activate inpainting -->
            <div class="input-group my-2">
                <div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            checked
                            type="checkbox"
                            role="switch"
                            id="inpainting-enable"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="inpainting-enable">Inpainting</label>
                    </div>
                </div>
            </div>

            <!-- Inpainting steps -->
            <div class="input-group my-2">
                <label for="inpainting-steps" class="form-label">Inpainting steps</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="1"
                        step="1"
                        max="10"
                        value="2"
                        class="form-range"
                        id="inpainting-steps"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/colorized-3d-tiles-point-cloud.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindColorMapBounds } from './widgets/bindColorMapBounds.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const colorRamps = {};

function makeColorRamps() {
    colorRamps.viridis = makeColorRamp('viridis');
    colorRamps.jet = makeColorRamp('jet');
    colorRamps.blackbody = makeColorRamp('blackbody');
    colorRamps.earth = makeColorRamp('earth');
    colorRamps.bathymetry = makeColorRamp('bathymetry');
    colorRamps.magma = makeColorRamp('magma');
    colorRamps.par = makeColorRamp('par');

    colorRamps.slope = makeColorRamp('RdBu');
}

makeColorRamps();

const tmpVec3 = new Vector3();

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 ' +
        '+y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: 0xcccccc,
});

// Create the 3D tiles entity
const pointcloud = new Tiles3D({
    url: 'https://3d.oslandia.com/3dtiles/lyon.3dtiles/tileset.json',
    colorMap: new ColorMap({ colors: colorRamps['viridis'], min: 100, max: 600 }),
    errorTarget: 15,
});

let colorLayer;

function placeCamera(position, lookAt) {
    instance.view.camera.position.set(position.x, position.y, position.z);
    instance.view.camera.lookAt(lookAt);
    // create controls
    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.target.copy(lookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    instance.view.setControls(controls);

    instance.notifyChange(instance.view.camera);
}

// add pointcloud to scene
function initializeCamera() {
    const bbox = pointcloud.getBoundingBox();

    instance.view.camera.far = 2.0 * bbox.getSize(tmpVec3).length();

    const ratio = bbox.getSize(tmpVec3).x / bbox.getSize(tmpVec3).z;
    const position = bbox.min
        .clone()
        .add(bbox.getSize(tmpVec3).multiply(new Vector3(0, 0, ratio * 0.5)));
    const lookAt = bbox.getCenter(tmpVec3);
    lookAt.z = bbox.min.z;

    const extent = Extent.fromBox3(crs, bbox);

    placeCamera(position, lookAt);

    const url = 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

    // Let's build the color layer from the WMTS capabilities
    WmtsSource.fromCapabilities(url, {
        layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
    })
        .then(orthophotoWmts => {
            colorLayer = new ColorLayer({
                name: 'color',
                extent,
                source: orthophotoWmts,
            });
            pointcloud.setColorLayer(colorLayer);
        })
        .catch(console.error);

    instance.renderingOptions.enableEDL = true;
    instance.renderingOptions.enableInpainting = true;
    instance.renderingOptions.enablePointCloudOcclusion = true;

    pointcloud.pointCloudMode = MODE.TEXTURE;

    StatusBar.bind(instance);
}

instance.add(pointcloud).then(initializeCamera);

Inspector.attach('inspector', instance);
instance.domElement.addEventListener('dblclick', e =>
    console.log(
        instance.pickObjectsAt(e, {
            // Specify a radius around where we click so we don't have to precisely be on a point
            // to select it
            radius: 5,
            // Limit the number of results for better performances
            limit: 10,
            // Some points are incoherent in the pointcloud, don't pick them
            filter: p => !Number.isNaN(p.point.z) && p.point.z < 1000,
        }),
    ),
);

instance.notifyChange();

bindToggle('edl-enable', v => {
    instance.renderingOptions.enableEDL = v;
    instance.notifyChange();
});
bindToggle('occlusion-enable', v => {
    instance.renderingOptions.enablePointCloudOcclusion = v;
    instance.notifyChange();
});
bindToggle('inpainting-enable', v => {
    instance.renderingOptions.enableInpainting = v;
    instance.notifyChange();
});
bindSlider('edl-radius', v => {
    instance.renderingOptions.EDLRadius = v;
    instance.notifyChange();
});
bindSlider('edl-intensity', v => {
    instance.renderingOptions.EDLStrength = v;
    instance.notifyChange();
});
bindSlider('inpainting-steps', v => {
    instance.renderingOptions.inpaintingSteps = v;
    instance.notifyChange();
});
bindSlider('opacity', v => {
    pointcloud.opacity = v;
    document.getElementById('opacityLabel').innerText =
        `Point cloud opacity: ${Math.round(v * 100)}%`;
    instance.notifyChange(pointcloud);
});

bindColorMapBounds((min, max) => {
    pointcloud.colorMap.min = min;
    pointcloud.colorMap.max = max;
    instance.notifyChange(pointcloud);
});

const colorMapGroup = document.getElementById('colormapGroup');

bindNumericalDropDown('pointcloud_mode', newMode => {
    pointcloud.pointCloudMode = newMode;

    if (newMode === MODE.ELEVATION) {
        colorMapGroup.classList.remove('d-none');
    } else {
        colorMapGroup.classList.add('d-none');
    }

    instance.notifyChange(pointcloud);
    if (colorLayer) {
        colorLayer.visible = newMode === MODE.TEXTURE;
        instance.notifyChange(colorLayer);
    }
});

bindDropDown('colormap', newRamp => {
    pointcloud.colorMap.colors = colorRamps[newRamp];
    instance.notifyChange(pointcloud);
});
```

---

## Source: manuals/examples/colormaps.md

Source Path: manuals/examples/colormaps.md

# Color maps

## Официальный кейс
- Slug: `colormaps`
- Официальная страница: https://giro3d.org/latest/examples/colormaps.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/colormaps.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/colormaps.js`

## Краткое описание (official)
Use colormaps to emphasize elevation and terrain features.

## Расширенное описание (official longdesc)
Colormaps are useful to colorize an elevation dataset. You can change the color map's properties dynamically, such as the min and max values, the color gradients, or disable the color map entirely. Color maps can be applied on both elevation layers and color layers.

## Теги (official)
- `map`
- `colormap`
- `gradient`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=colormaps npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/colormaps.html
```html
---
title: Color maps
shortdesc: Use colormaps to emphasize elevation and terrain features.
longdesc: <a href="../apidoc/classes/core.ColorMap.html" target="_blank">Colormaps</a> are useful to colorize an elevation dataset. You can change the color map's properties dynamically, such as the min and max values, the color gradients, or disable the color map entirely. Color maps can be applied on both elevation layers and color layers.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
dependencies: ['colormap', 'function-curve-editor']
tags: [map, colormap, gradient]
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body" id="top-options">
            <!-- Preset -->
            <div class="input-group mb-3">
                <label class="input-group-text" for="preset">Preset</label>
                <select class="form-select" id="preset" autocomplete="off">
                    <option value="elevation" selected>
                        Simple elevation layer with color map
                    </option>
                    <option value="elevation+transparency">
                        Elevation layer with color map visible only on the 780-2000m range.
                    </option>
                    <option value="southern-slope">
                        Show the southern slopes of the mountains with a semi-transparent colormap.
                    </option>
                    <option value="flat-terrain">Shows flat areas of the terrain.</option>
                </select>
            </div>

            <!-- Layer type -->
            <div class="input-group mb-3">
                <label class="input-group-text" for="layerType">Layers</label>
                <select class="form-select" id="layerType" autocomplete="off">
                    <option value="elevation" selected>Elevation</option>
                    <option value="color">Color</option>
                    <option value="color+background">Color + Background</option>
                    <option value="color+background+elevation">
                        Color + Background + Elevation
                    </option>
                </select>
            </div>

            <!-- Activate color map -->
            <div class="form-check form-switch mb-1">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="enable"
                    autocomplete="off"
                />
                <label class="form-check-label" for="enable">Enable color map</label>
            </div>

            <!-- Reverse color map -->
            <div class="form-check form-switch mb-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="invert"
                    autocomplete="off"
                />
                <label class="form-check-label" for="invert">Invert color map</label>
            </div>

            <!-- Mirror color map -->
            <div class="form-check form-switch mb-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="mirror"
                    autocomplete="off"
                />
                <label class="form-check-label" for="mirror">Mirror color map</label>
            </div>

            <!-- Discrete color map -->
            <div class="form-check form-switch mb-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="discrete"
                    autocomplete="off"
                />
                <label class="form-check-label" for="discrete">Discrete color map</label>
            </div>

            <!-- Color ramp selector -->
            <div class="input-group mb-3">
                <label class="input-group-text" for="ramp">Colors</label>
                <select class="form-select" id="ramp" autocomplete="off">
                    <option value="viridis" selected>Viridis</option>
                    <option value="jet">Jet</option>
                    <option value="greys">Greys</option>
                    <option value="blackbody">Blackbody</option>
                    <option value="earth">Earth</option>
                    <option value="bathymetry">Bathymetry</option>
                    <option value="magma">Magma</option>
                    <option value="par">Par</option>
                    <option value="rdbu">RdBu</option>
                </select>
            </div>

            <!-- Gradient preview -->
            <div class="mb-3 w-100">
                <canvas
                    id="gradient"
                    height="32"
                    class="w-100 border rounded"
                    style="height: 32px; image-rendering: pixelated"
                ></canvas>
            </div>

            <!-- Opacity curve -->
            <div class="mb-3 w-100">
                <label for="curve" class="mb-2">Opacity curve</label>
                <canvas id="curve" height="128" class="w-100" style="height: 128px"></canvas>
            </div>

            <!-- Mode selector -->
            <div class="input-group mb-3">
                <label class="input-group-text" for="mode">Mode</label>
                <select class="form-select" id="mode" autocomplete="off">
                    <option value="1" selected>Elevation</option>
                    <option value="2">Slope</option>
                    <option value="3">Aspect</option>
                </select>
            </div>

            <!-- Background opacity slider -->
            <div class="input-group border rounded p-2 mb-3">
                <label for="backgroundOpacity" id="backgroundOpacityLabel" class="form-label"
                    >Map background opacity</label
                >
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value="1"
                        class="form-range"
                        id="backgroundOpacity"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Bound sliders -->
            <div class="input-group border rounded p-2" id="bounds">
                <label for="min" id="minLabel" class="form-label">Lower bound: 780m</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="780"
                        max="3574"
                        value="0"
                        class="form-range"
                        id="min"
                        autocomplete="off"
                    />
                </div>

                <label for="max" id="maxLabel" class="form-label">Upper bound: 3574m</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="780"
                        max="3574"
                        value="3574"
                        class="form-range"
                        id="max"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/colormaps.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import * as FunctionCurveEditor from 'function-curve-editor';
import XYZ from 'ol/source/XYZ.js';
import { DoubleSide, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import ColorMapMode from '@giro3d/giro3d/core/ColorMapMode.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindColorMapBounds } from './widgets/bindColorMapBounds.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';
import updateColorMapPreview from './widgets/updateColorMapPreview.js';

const extent = Extent.fromCenterAndSize(
    CoordinateSystem.epsg3857,
    { x: 697313, y: 5591324 },
    30000,
    30000,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null, // To make the canvas transparent
});

const cameraPosition = new Vector3(697119, 5543639, 53043);

instance.view.camera.position.copy(cameraPosition);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.saveState();
instance.view.setControls(controls);

const elevationMin = 780;
const elevationMax = 3574;

let parameters = {
    ramp: 'viridis',
    discrete: false,
    invert: false,
    mirror: false,
    backgroundOpacity: 1,
    transparencyCurveKnots: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ],
    enableColorMap: true,
    layerType: 'elevation',
    colors: makeColorRamp('viridis', false, false, false),
    min: elevationMin,
    max: elevationMax,
    mode: ColorMapMode.Elevation,
};

updateColorMapPreview('gradient', parameters.colors);

// Adds the map that will contain the layers.
const map = new Map({
    extent,
    backgroundColor: 'cyan',
    side: DoubleSide,
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
});
instance.add(map);

const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';
const source = new TiledImageSource({
    format: new MapboxTerrainFormat(),
    source: new XYZ({
        url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
        projection: extent.crs.id,
        crossOrigin: 'anonymous',
    }),
});

const backgroundLayer = new ColorLayer({
    name: 'background',
    extent,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
            projection: extent.crs.id,
            crossOrigin: 'anonymous',
        }),
    }),
});

const elevationLayer = new ElevationLayer({
    name: 'elevation',
    extent,
    source,
    colorMap: new ColorMap({
        colors: parameters.colors,
        min: elevationMin,
        max: elevationMax,
        mode: ColorMapMode.Elevation,
    }),
});

const colorLayer = new ColorLayer({
    name: 'color',
    extent,
    source,
    colorMap: new ColorMap({
        colors: parameters.colors,
        min: elevationMin,
        max: elevationMax,
        mode: ColorMapMode.Elevation,
    }),
});

map.addLayer(elevationLayer);

let activeLayer = elevationLayer;

function updateColorRamp() {
    parameters.colors = makeColorRamp(
        parameters.ramp,
        parameters.discrete,
        parameters.invert,
        parameters.mirror,
    );
    activeLayer.colorMap.colors = parameters.colors;
    activeLayer.colorMap.min = parameters.min;
    activeLayer.colorMap.max = parameters.max;
    activeLayer.colorMap.mode = parameters.mode;

    updateTransparency();

    updateColorMapPreview('gradient', parameters.colors);

    instance.notifyChange(map);
}

const [setEnableColorMap] = bindToggle('enable', v => {
    elevationLayer.visible = true;
    colorLayer.visible = true;
    backgroundLayer.visible = true;

    if (activeLayer.type === 'ColorLayer') {
        activeLayer.visible = v;
    } else {
        activeLayer.colorMap.active = v;
    }
    instance.notifyChange(map);
});
const [setDiscrete] = bindToggle('discrete', v => {
    parameters.discrete = v;
    updateColorRamp();
});
const [setInvert] = bindToggle('invert', v => {
    parameters.invert = v;
    updateColorRamp();
});
const [setMirror] = bindToggle('mirror', v => {
    parameters.mirror = v;
    updateColorRamp();
});
const [setRamp] = bindDropDown('ramp', v => {
    parameters.ramp = v;
    updateColorRamp();
});
function setActiveLayers(...layers) {
    map.removeLayer(colorLayer);
    map.removeLayer(elevationLayer);
    map.removeLayer(backgroundLayer);

    for (const layer of layers) {
        map.addLayer(layer);
    }
    activeLayer = layers[layers.length - 1];
}
const [setLayerType] = bindDropDown('layerType', v => {
    switch (v) {
        case 'elevation':
            setActiveLayers(elevationLayer);
            break;
        case 'color':
            setActiveLayers(colorLayer);
            break;
        case 'color+background':
            setActiveLayers(backgroundLayer, colorLayer);
            break;
        case 'color+background+elevation':
            setActiveLayers(elevationLayer, backgroundLayer, colorLayer);
            break;
    }
    updateColorRamp();
    instance.notifyChange(map);
});
const [setBackgroundOpacity] = bindSlider('backgroundOpacity', v => {
    map.backgroundOpacity = v;
    instance.notifyChange(map);
});
const updateBounds = bindColorMapBounds((min, max) => {
    parameters.min = min;
    parameters.max = max;
    activeLayer.colorMap.min = min;
    activeLayer.colorMap.max = max;
    instance.notifyChange(map);
});

const [setMode] = bindDropDown('mode', v => {
    const numerical = Number.parseInt(v);
    switch (numerical) {
        case ColorMapMode.Elevation:
            parameters.mode = ColorMapMode.Elevation;
            updateBounds(elevationMin, elevationMax);
            break;
        case ColorMapMode.Slope:
            parameters.mode = ColorMapMode.Slope;
            updateBounds(0, 90);
            break;
        case ColorMapMode.Aspect:
            parameters.mode = ColorMapMode.Aspect;
            updateBounds(0, 360);
            break;
    }

    updateColorRamp();
    instance.notifyChange(map);
});

const canvas = document.getElementById('curve');
// @ts-expect-error conversion
const widget = new FunctionCurveEditor.Widget(canvas);

function updateTransparency() {
    const length = parameters.colors.length;
    const f = widget.getFunction();
    const opacities = new Array(length);
    for (let i = 0; i < length; i++) {
        const t = i / length;
        opacities[i] = f(t);
    }
    activeLayer.colorMap.opacity = opacities;
}

function setupTransparencyCurve(knots = undefined) {
    // Curve editor
    const initialKnots = knots ?? [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ];

    widget.setEditorState({
        knots: initialKnots,
        xMin: -0.2,
        xMax: 1.2,
        yMin: -0.2,
        yMax: 1.2,
        interpolationMethod: 'linear',
        extendedDomain: true,
        relevantXMin: 0,
        relevantXMax: 1,
        gridEnabled: true,
    });

    widget.addEventListener('change', () => {
        updateColorRamp();
    });
}

setupTransparencyCurve();

function applyPreset(preset) {
    parameters = { ...preset };

    setupTransparencyCurve(preset.transparencyCurveKnots);
    setBackgroundOpacity(preset.backgroundOpacity);
    setRamp(preset.ramp);
    setEnableColorMap(preset.enableColorMap);
    setDiscrete(preset.discrete);
    setInvert(preset.invert);
    setMirror(preset.mirror);
    setMode(preset.mode);
    setLayerType(preset.layerType);
    updateBounds(preset.min, preset.max);
    updateColorRamp();

    instance.notifyChange(map);
}

const [setPreset] = bindDropDown('preset', preset => {
    switch (preset) {
        case 'elevation':
            applyPreset({
                ramp: 'viridis',
                transparencyCurveKnots: [
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                ],
                backgroundOpacity: 1,
                enableColorMap: true,
                discrete: false,
                mirror: false,
                invert: false,
                layerType: 'elevation',
                colors: makeColorRamp('viridis', false, false, false),
                opacity: new Array(256).fill(1),
                min: elevationMin,
                max: elevationMax,
                mode: ColorMapMode.Elevation,
            });
            break;

        case 'elevation+transparency':
            applyPreset({
                ramp: 'jet',
                transparencyCurveKnots: [
                    { x: 0, y: 0.5 },
                    { x: 0.4, y: 0.5 },
                    { x: 0.401, y: 0 },
                    { x: 1, y: 0 },
                ],
                backgroundOpacity: 1,
                enableColorMap: true,
                discrete: false,
                mirror: false,
                invert: false,
                layerType: 'color+background+elevation',
                colors: makeColorRamp('jet', false, false, false),
                min: elevationMin,
                max: elevationMax,
                mode: ColorMapMode.Elevation,
            });
            break;

        case 'southern-slope':
            applyPreset({
                ramp: 'rdbu',
                transparencyCurveKnots: [
                    { x: 0, y: 0 },
                    { x: 0.4, y: 0 },
                    { x: 0.401, y: 1 },
                    { x: 0.6, y: 1 },
                    { x: 0.601, y: 0 },
                    { x: 1, y: 0 },
                ],
                backgroundOpacity: 1,
                enableColorMap: true,
                discrete: false,
                mirror: true,
                invert: false,
                layerType: 'color+background+elevation',
                colors: makeColorRamp('rdbu', false, false, false),
                min: 0,
                max: 360,
                mode: ColorMapMode.Aspect,
            });
            break;

        case 'flat-terrain':
            applyPreset({
                ramp: 'jet',
                transparencyCurveKnots: [
                    { x: 0, y: 1 },
                    { x: 0.3, y: 1 },
                    { x: 0.6, y: 0 },
                    { x: 1, y: 0 },
                ],
                backgroundOpacity: 1,
                enableColorMap: true,
                discrete: false,
                mirror: false,
                invert: true,
                layerType: 'color+background+elevation',
                colors: makeColorRamp('jet', false, false, false),
                min: 0,
                max: 35,
                mode: ColorMapMode.Slope,
            });
            break;
    }
});

function resetToDefaults() {
    setPreset('elevation');
}

bindButton('reset', resetToDefaults);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

// For some reason, not waiting a bit causes the curve editor to be blank on Firefox
setTimeout(resetToDefaults, 100);
```

---

## Source: manuals/examples/copc.md

Source Path: manuals/examples/copc.md

# COPC

## Официальный кейс
- Slug: `copc`
- Официальная страница: https://giro3d.org/latest/examples/copc.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/copc.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/copc.js`

## Краткое описание (official)
Display a Cloud optimized point cloud

## Теги (official)
- `point cloud`
- `las`
- `copc`

## Атрибуция (official)
Autzen stadium dataset provided by United States Geological Survey and Hobu, Inc.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=copc npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/copc.html
```html
---
title: COPC
shortdesc: Display a Cloud optimized point cloud
tags: ['point cloud', 'las', 'copc']
attribution: Autzen stadium dataset provided by <a href="https://www.usgs.gov" target="_blank">United States Geological Survey</a> and <a href="https://hobu.co/" target="_blank">Hobu, Inc.</a>
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <div class="progress" role="progressbar">
        <div
            class="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
            id="progress"
            style="width: 0%"
        >
            Loading metadata...
        </div>
    </div>

    <!-- Error message -->
    <div class="alert alert-danger mt-0 mb-0" id="message" style="display: none" role="alert">
        A simple primary alert—check it out!
    </div>

    <!--Parameters -->
    <div class="card-body">
        <!-- Accordion -->
        <div class="accordion" style="display: none" id="accordion">
            <!-- Section: info -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-info"
                        aria-expanded="true"
                        aria-controls="section-info"
                    >
                        Info
                    </button>
                </h2>
                <div
                    id="section-info"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordion"
                >
                    <ul
                        class="list-group list-group-flush"
                        id="table"
                        style="display: none; font-size: 0.875rem"
                    >
                        <li class="list-group-item">
                            Filename
                            <b
                                id="filename"
                                class="d-float float-end text-truncate"
                                style="max-width: 70%"
                            ></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The total number of points in the dataset"
                        >
                            Total points <b id="point-count" class="d-float float-end"></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The number of points currently displayed"
                        >
                            Displayed points
                            <b id="displayed-point-count" class="d-float float-end"></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The coordinate reference system of this dataset"
                        >
                            CRS
                            <a target="_blank" id="projection" class="d-float float-end"></a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Section: options -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-options"
                        aria-expanded="false"
                        aria-controls="section-options"
                    >
                        Options
                    </button>
                </h2>

                <div
                    id="section-options"
                    class="accordion-collapse collapse p-2"
                    data-bs-parent="#accordion"
                >
                    <!-- Show volume -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="show-volume"
                            autocomplete="off"
                        />
                        <label
                            title="Show the volume of the dataset"
                            class="form-check-label"
                            for="show-volume"
                            >Show dataset volume</label
                        >
                    </div>

                    <!-- Show octree volumes -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="show-tile-volumes"
                            autocomplete="off"
                        />
                        <label
                            title="Show the volumes of the octree cells"
                            class="form-check-label"
                            for="show-tile-volumes"
                            >Show octree volumes</label
                        >
                    </div>

                    <!-- Show basemap -->
                    <div class="form-check form-switch" style="display: none" id="basemap-group">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="show-basemap"
                            autocomplete="off"
                        />
                        <label title="Show the basemap" class="form-check-label" for="show-basemap"
                            >Show basemap</label
                        >
                    </div>

                    <!-- Show cloud -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="show-dataset"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="show-dataset">Show dataset</label>
                    </div>

                    <!-- Eye Dome Lighting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="edl"
                            autocomplete="off"
                        />
                        <label
                            title="Toggles Eye Dome Lighting post-processing effect"
                            class="form-check-label"
                            for="edl"
                            >Eye Dome Lighting</label
                        >
                    </div>

                    <!-- Inpainting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="inpainting"
                            autocomplete="off"
                        />
                        <label title="Toggles inpainting" class="form-check-label" for="inpainting"
                            >Inpainting</label
                        >
                    </div>

                    <!-- Point size slider -->
                    <label for="point-size" class="form-label mt-2" id="point-size-label"
                        >Point size: <b>auto</b></label
                    >
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value="0"
                        title="The point size, in pixels"
                        class="form-range"
                        id="point-size"
                        autocomplete="off"
                    />

                    <!-- Subdivision threshold slider -->
                    <label
                        for="subdivision-threshold"
                        id="subdivision-threshold-label"
                        class="form-label"
                        >Subdvision threshold: <b>1.0</b></label
                    >
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value="1"
                        title="The subdivision threshold of the point cloud. The lower, the higher the number of points simultaneously displayed."
                        class="form-range"
                        id="subdivision-threshold"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Section: filters -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-filters"
                        aria-expanded="false"
                        aria-controls="section-filters"
                    >
                        Filters
                    </button>
                </h2>

                <div
                    id="section-filters"
                    class="accordion-collapse collapse p-2"
                    data-bs-parent="#accordion"
                >
                    <!-- Toggle filters -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="filters"
                            autocomplete="off"
                        />
                        <label title="Enable source filters" class="form-check-label" for="filters"
                            >Enable filters</label
                        >
                    </div>

                    <!-- Filter list (filled by javascript code directly) -->
                    <ul class="list-group">
                        <!-- Filter 1 -->
                        <li class="list-group-item p-1">
                            <div class="input-group">
                                <select
                                    class="form-select"
                                    id="filter-1-attribute"
                                    autocomplete="off"
                                    placeholder="Dimension"
                                    title="The attribute to filter"
                                ></select>
                                <select
                                    class="form-select"
                                    style="max-width: 4.5rem"
                                    id="filter-1-operator"
                                    autocomplete="off"
                                    title="The comparison operator"
                                >
                                    <option value="not" selected>≠</option>
                                    <option value="equal">=</option>
                                    <option value="greater">></option>
                                    <option value="greaterequal">≥</option>
                                    <option value="less"><</option>
                                    <option value="lessequal">≤</option>
                                </select>
                                <input
                                    type="number"
                                    id="filter-1-value"
                                    class="form-control"
                                    placeholder="Value"
                                    aria-label="Value"
                                />
                            </div>
                        </li>

                        <!-- Filter 2 -->
                        <li class="list-group-item p-1">
                            <div class="input-group">
                                <select
                                    class="form-select"
                                    id="filter-2-attribute"
                                    autocomplete="off"
                                    placeholder="Dimension"
                                    title="The attribute to filter"
                                ></select>
                                <select
                                    class="form-select"
                                    style="max-width: 4.5rem"
                                    id="filter-2-operator"
                                    autocomplete="off"
                                    title="The comparison operator"
                                >
                                    <option value="not" selected>≠</option>
                                    <option value="equal">=</option>
                                    <option value="greater">></option>
                                    <option value="greaterequal">≥</option>
                                    <option value="less"><</option>
                                    <option value="lessequal">≤</option>
                                </select>
                                <input
                                    type="number"
                                    id="filter-2-value"
                                    class="form-control"
                                    placeholder="Value"
                                    aria-label="Value"
                                />
                            </div>
                        </li>

                        <!-- Filter 3 -->
                        <li class="list-group-item p-1">
                            <div class="input-group">
                                <select
                                    class="form-select"
                                    id="filter-3-attribute"
                                    autocomplete="off"
                                    placeholder="Dimension"
                                    title="The attribute to filter"
                                ></select>
                                <select
                                    class="form-select"
                                    style="max-width: 4.5rem"
                                    id="filter-3-operator"
                                    autocomplete="off"
                                    title="The comparison operator"
                                >
                                    <option value="not" selected>≠</option>
                                    <option value="equal">=</option>
                                    <option value="greater">></option>
                                    <option value="greaterequal">≥</option>
                                    <option value="less"><</option>
                                    <option value="lessequal">≤</option>
                                </select>
                                <input
                                    type="number"
                                    id="filter-3-value"
                                    class="form-control"
                                    placeholder="Value"
                                    aria-label="Value"
                                />
                            </div>
                        </li>

                        <li class="list-group-item p-1">
                            <div class="input-group">
                                <div class="form-control">Classification</div>
                                <select
                                    class="form-select"
                                    id="filter-classifications-operator"
                                    autocomplete="off"
                                    title="The comparison operator"
                                >
                                    <option value="in" selected>in</option>
                                    <option value="not_in">not in</option>
                                </select>
                                <div id="filter-classifications" class="p-1"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Section: coloring -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-coloring"
                        aria-expanded="false"
                        aria-controls="section-coloring"
                    >
                        Coloring
                    </button>
                </h2>

                <div
                    id="section-coloring"
                    class="accordion-collapse collapse p-2"
                    data-bs-parent="#accordion"
                >
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="radio-group-coloring"
                            id="radio-layer"
                        />
                        <label class="form-check-label" for="radio-layer"> From color layer </label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="radio-group-coloring"
                            id="radio-attribute"
                            checked
                        />
                        <label class="form-check-label" for="radio-attribute">
                            From attribute
                        </label>
                    </div>

                    <div class="mt-2" id="group-attribute">
                        <!-- Active attribute selector -->
                        <div class="input-group mt-1" id="attribute-group">
                            <label class="input-group-text col-5" for="attribute">Attribute</label>
                            <select
                                class="form-select"
                                id="attribute"
                                autocomplete="off"
                                title="Sets the active attribute of the point cloud"
                            ></select>
                        </div>

                        <!-- Color ramp selector -->
                        <div id="ramp-group" class="input-group mt-2">
                            <label class="input-group-text col-5" for="ramp">Color ramp</label>
                            <select class="form-select" id="ramp" autocomplete="off">
                                <option value="viridis">Viridis</option>
                                <option value="jet">Jet</option>
                                <option value="greys">Greys</option>
                                <option value="blackbody">Blackbody</option>
                                <option value="earth">Earth</option>
                                <option value="bathymetry" selected>Bathymetry</option>
                                <option value="magma">Magma</option>
                                <option value="par">Par</option>
                                <option value="rdbu">RdBu</option>
                            </select>

                            <!-- Bound sliders -->
                            <div class="input-group border rounded p-2 mt-2" id="bounds">
                                <label
                                    for="min"
                                    id="label-bounds"
                                    class="form-label"
                                    style="font-size: 0.8rem"
                                    >Bounds: 123 - 456</label
                                >
                                <div class="input-group">
                                    <input
                                        type="range"
                                        min="780"
                                        max="3574"
                                        value="0"
                                        class="form-range"
                                        id="min"
                                        autocomplete="off"
                                    />
                                </div>

                                <div class="input-group">
                                    <input
                                        type="range"
                                        min="780"
                                        max="3574"
                                        value="3574"
                                        class="form-range"
                                        id="max"
                                        autocomplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Classification list -->
                        <div id="classification-group" class="mt-2">
                            <fieldset id="classifications" class="border rounded p-2">
                                <!-- Classifications are added dynamically from the JS example -->
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/copc.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import { Color } from 'three';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import COPCSource from '@giro3d/giro3d/sources/COPCSource.js';
import { setLazPerfPath } from '@giro3d/giro3d/sources/las/config.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindNumberInput } from './widgets/bindNumberInput.js';
import { bindProgress } from './widgets/bindProgress.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { formatPointCount } from './widgets/formatPointCount.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import { placeCameraOnTop } from './widgets/placeCameraOnTop.js';
import StatusBar from './widgets/StatusBar.js';

// LAS processing requires the WebAssembly laz-perf library
// This path is specific to your project, and must be set accordingly.
setLazPerfPath('/assets/wasm');

// We use this CRS when the point cloud does not have a CRS defined.
// It is technically the WebMercator CRS, but we label it 'unknown' to make
// it very explicit that it is not correct.
// See https://gitlab.com/giro3d/giro3d/-/issues/514
CoordinateSystem.register(
    'unknown',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
);

/** @type {Instance} */
let instance;

const options = {
    mode: 'attribute',
    attribute: 'position',
    colorRamp: 'bathymetry',
    min: 0,
    max: 100,
    enableFilters: false,
};

/** @type {PointCloud} */
let entity;

/** @type {ColorLayer} */
let colorLayer;

// Create the color map. The color ramp and bounds will be set later.
const colorMap = new ColorMap({ colors: [], min: 0, max: 1 });

function updateColoring() {
    const attribute = options.attribute;

    if (options.mode === 'layer') {
        if (colorLayer != null) {
            entity.setColorLayer(colorLayer);
            entity.setColoringMode('layer');
        }
    } else {
        entity.setColoringMode('attribute');
        entity.setActiveAttribute(attribute);
    }

    const classificationGroup = document.getElementById('classification-group');
    const colorMapGroup = document.getElementById('ramp-group');

    const shouldDisplayClassifications = attribute === 'Classification';
    classificationGroup.style.display = shouldDisplayClassifications ? 'block' : 'none';
    colorMapGroup.style.display =
        !shouldDisplayClassifications && attribute !== 'Color' ? 'flex' : 'none';

    if (options.mode !== 'layer') {
        updateColorMap();
    }
}

const [setProgress, progressElement] = bindProgress('progress');

const [, , , setAvailableAttributes] = bindDropDown('attribute', attribute => {
    options.attribute = attribute;

    if (entity) {
        updateColoring();
    }
});

const [setMin] = bindSlider('min', min => {
    options.min = Math.round(min);
    if (entity && instance) {
        colorMap.min = min;
        instance.notifyChange(entity);
        document.getElementById('label-bounds').innerHTML =
            `Bounds: <b>${options.min}</b> — <b>${options.max}<b>`;
    }
});

const [setMax] = bindSlider('max', max => {
    options.max = Math.round(max);
    if (entity && instance) {
        colorMap.max = max;
        instance.notifyChange(entity);
        document.getElementById('label-bounds').innerHTML =
            `Bounds: <b>${options.min}</b> — <b>${options.max}<b>`;
    }
});

bindToggle('show-tile-volumes', v => {
    entity.showNodeVolumes = v;
});

bindToggle('show-volume', v => {
    entity.showVolume = v;
});

bindToggle('edl', v => {
    instance.renderingOptions.enableEDL = v;
    instance.notifyChange();
});

bindToggle('inpainting', v => {
    instance.renderingOptions.enableInpainting = v;
    instance.renderingOptions.enablePointCloudOcclusion = v;
    instance.notifyChange();
});

bindSlider('point-size', size => {
    if (entity) {
        entity.pointSize = size;
        document.getElementById('point-size-label').innerHTML =
            `Point size: <b>${size === 0 ? 'auto' : size.toFixed(0)}</b>`;
    }
});
bindSlider('subdivision-threshold', threshold => {
    if (entity) {
        entity.subdivisionThreshold = threshold;
        document.getElementById('subdivision-threshold-label').innerHTML =
            `Subdivision threshold: <b>${threshold}</b>`;
    }
});

function updateColorMapMinMax() {
    if (!entity) {
        return;
    }

    const activeAttribute = entity.getActiveAttributes()[0].attribute;
    const min = activeAttribute.min ?? 0;
    const max = activeAttribute.max ?? 255;

    const step = activeAttribute.type === 'float' ? 0.0001 : 1;

    const lowerBound = min;
    const upperBound = max;

    setMin(min, lowerBound, upperBound, step);
    setMax(max, lowerBound, upperBound, step);
}

bindDropDown('ramp', ramp => {
    options.colorRamp = ramp;
    updateColorMap();
});

function updateColorMap() {
    if (entity && instance) {
        colorMap.colors = makeColorRamp(options.colorRamp);

        updateColorMapMinMax();

        instance.notifyChange();
    }
}

function loadMap(extent) {
    const map = new Map({ extent });

    instance.add(map);

    const key =
        'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

    // Adds a XYZ elevation layer with MapBox terrain RGB tileset
    const elevationLayer = new ElevationLayer({
        extent,
        resolutionFactor: 0.25,
        source: new TiledImageSource({
            format: new MapboxTerrainFormat(),
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
                projection: 'EPSG:3857',
            }),
        }),
    });
    map.addLayer(elevationLayer);

    // Adds a XYZ color layer with MapBox satellite tileset
    colorLayer = new ColorLayer({
        extent,
        resolutionFactor: 0.5,
        source: new TiledImageSource({
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
                projection: 'EPSG:3857',
            }),
        }),
    });
    map.addLayer(colorLayer);

    return map;
}

/**
 * @param {number} code
 */
async function fetchCrsDefinitionFromEpsg(code) {
    async function fetchText(url) {
        const res = await fetch(url, { mode: 'cors' });
        const def = await res.text();
        return def;
    }

    return await fetchText(`https://epsg.io/${code}.proj4?download=1`);
}

const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

function updateDisplayedPointCounts(count, displayed) {
    const pointCountElement = document.getElementById('point-count');
    pointCountElement.innerHTML = formatPointCount(count, numberFormat);
    pointCountElement.title = numberFormat.format(count);

    const activePointCountElement = document.getElementById('displayed-point-count');
    activePointCountElement.innerHTML = formatPointCount(displayed, numberFormat);
    activePointCountElement.title = numberFormat.format(displayed);
}

const filters = [null, null, null, null];

function updateFilters(source) {
    source.filters = options.enableFilters ? filters : null;
}

function bindFilter(index, attributes, onChange) {
    const filter = {
        dimension: 'Z',
        operator: 'not',
        value: 0,
    };

    filters[index - 1] = filter;

    const [, , , setFilterAttributes] = bindDropDown(
        `filter-${index}-attribute`,
        filterAttribute => {
            filter.dimension = filterAttribute;
            onChange();
        },
    );
    bindDropDown(`filter-${index}-operator`, filterOperator => {
        filter.operator = filterOperator;
        onChange();
    });
    bindNumberInput(`filter-${index}-value`, v => {
        filter.value = v;
        onChange();
    });

    setFilterAttributes(
        attributes.map((a, i) => {
            return { id: a.name, name: a.name, selected: i === 0 };
        }),
    );
}

/**
 * @param {COPCSource} source
 */
function populateGUI(source) {
    document.getElementById('accordion').style.display = 'block';

    const tableElement = document.getElementById('table');
    tableElement.style.display = 'block';

    /** @type {HTMLLinkElement} */
    // @ts-expect-error casting
    const projectionElement = document.getElementById('projection');
    const epsgCode = instance.coordinateSystem.srid?.tryGetEpsgCode();
    if (typeof epsgCode === 'number') {
        projectionElement.href = `https://epsg.io/${epsgCode}`;
        projectionElement.innerHTML = instance.coordinateSystem.id;
    } else {
        projectionElement.parentElement.remove();
    }

    progressElement.style.display = 'none';

    const attributes = entity.getSupportedAttributes();

    // Bind the 3 filters
    bindFilter(1, attributes, () => updateFilters(source));
    bindFilter(2, attributes, () => updateFilters(source));
    bindFilter(3, attributes, () => updateFilters(source));

    bindToggle('filters', v => {
        options.enableFilters = v;
        updateFilters(source);
    });
}

// Loads the point cloud from the url parameter
async function load(url) {
    progressElement.style.display = 'block';

    // Let's create the source
    const source = new COPCSource({ url });

    source.addEventListener('progress', () => setProgress(source.progress));

    try {
        // Initialize the source in advance, so that we can
        // access the metadata of the remote LAS file.
        await source.initialize();
    } catch (err) {
        if (err instanceof Error) {
            const messageElement = document.getElementById('message');
            messageElement.innerText = err.message;
            messageElement.style.display = 'block';
        }
        progressElement.style.display = 'none';
        console.error(err);
        return;
    }

    const metadata = await source.getMetadata();

    instance = new Instance({
        target: 'view',
        crs: metadata.crs,
        backgroundColor: null,
    });

    setAvailableAttributes(
        metadata.attributes.map((att, index) => ({
            id: att.name,
            name: att.name,
            selected: index === 0,
        })),
    );

    options.attribute = metadata.attributes[0].name;

    // Let's enable Eye Dome Lighting to make the point cloud more readable.
    instance.renderingOptions.enableEDL = true;
    instance.renderingOptions.EDLRadius = 0.6;
    instance.renderingOptions.EDLStrength = 5;

    // Let's create our point cloud with the COPC source.
    entity = new PointCloud({ source });

    await instance.add(entity);

    instance.addEventListener('update-end', () =>
        updateDisplayedPointCounts(entity.pointCount, entity.displayedPointCount),
    );

    // Let's get the volume of the point cloud for various operations.
    const volume = entity.getBoundingBox();

    entity.elevationColorMap = colorMap;
    for (const attribute of metadata.attributes) {
        entity.setAttributeColorMap(attribute.name, colorMap);
    }

    // Such as setting the min and max of the colormap bounds.
    setMin(volume.min.z, volume.min.z, volume.max.z);
    setMax(volume.max.z, volume.min.z, volume.max.z);

    updateColoring();
    updateColorMap();

    bindToggle('show-dataset', show => {
        entity.visible = show;
        instance.notifyChange(entity);
    });

    bindToggle('radio-layer', v => {
        if (v) {
            options.mode = 'layer';
            document.getElementById('group-attribute').style.display = 'none';

            updateColoring();
        }
    });

    bindToggle('radio-attribute', v => {
        if (v) {
            options.mode = 'attribute';
            document.getElementById('group-attribute').style.display = 'block';

            updateColoring();
        }
    });

    // If the source provides a coordinate system, we can load a map
    // to display as a geographic context and be able to check that the
    // point cloud is properly positioned.
    const epsgCode = metadata.crs.srid?.tryGetEpsgCode();
    if (typeof epsgCode === 'number') {
        try {
            const definitionFromEpsg = await fetchCrsDefinitionFromEpsg(epsgCode);
            const crs = CoordinateSystem.register(metadata.crs.id, definitionFromEpsg);

            // We create the extent from the volume of the point cloud.
            const extent = Extent.fromBox3(crs, volume);
            const map = loadMap(extent.withRelativeMargin(1.2));

            document.getElementById('basemap-group').style.display = 'block';
            bindToggle('show-basemap', show => {
                map.visible = show;
                instance.notifyChange(map);
            });
        } catch (e) {
            console.warn('could not load map: ' + e);
        }
    }

    const classificationFilterOperatorSelect = document.getElementById(
        'filter-classifications-operator',
    );
    const updateClassificationFilter = () => {
        const values = new Set();
        const checkedInputs = document.querySelectorAll('#filter-classifications input:checked');
        for (const input of checkedInputs) {
            // @ts-expect-error we know this is a HTMLInputElement
            values.add(parseInt(input.dataset.classification));
        }

        filters[3] = {
            dimension: 'Classification',
            // @ts-expect-error we know this is a select element
            operator: classificationFilterOperatorSelect.value,
            values,
        };

        updateFilters(source);
    };
    classificationFilterOperatorSelect.addEventListener('change', updateClassificationFilter);

    const classifications = entity.getAttributeClassifications('Classification');

    // Let's populate the classification list with default values from the ASPRS classifications.
    addClassification(0, 'Created, never classified', classifications, updateClassificationFilter);
    addClassification(1, 'Unclassified', classifications, updateClassificationFilter);
    addClassification(2, 'Ground', classifications, updateClassificationFilter);
    addClassification(3, 'Low vegetation', classifications, updateClassificationFilter);
    addClassification(4, 'Medium vegetation', classifications, updateClassificationFilter);
    addClassification(5, 'High vegetation', classifications, updateClassificationFilter);
    addClassification(6, 'Building', classifications, updateClassificationFilter);
    addClassification(7, 'Low point (noise)', classifications, updateClassificationFilter);
    addClassification(8, 'Reserved', classifications, updateClassificationFilter);
    addClassification(9, 'Water', classifications, updateClassificationFilter);
    addClassification(10, 'Rail', classifications, updateClassificationFilter);
    addClassification(11, 'Road surface', classifications, updateClassificationFilter);
    addClassification(12, 'Reserved', classifications, updateClassificationFilter);
    addClassification(13, 'Wire - Guard (shield)', classifications, updateClassificationFilter);
    addClassification(14, 'Wire - Conductor (Phase)', classifications, updateClassificationFilter);
    addClassification(15, 'Transmission Tower', classifications, updateClassificationFilter);
    addClassification(
        16,
        'Wire Structure connector (e.g Insulator)',
        classifications,
        updateClassificationFilter,
    );
    addClassification(17, 'Bridge deck', classifications, updateClassificationFilter);
    addClassification(18, 'High noise', classifications, updateClassificationFilter);

    updateClassificationFilter();
    populateGUI(source);

    Inspector.attach('inspector', instance);

    if (instance.coordinateSystem.srid) {
        StatusBar.bind(instance, { disableUrlUpdate: true });
    }

    placeCameraOnTop(volume, instance);

    instance.notifyChange();
}

const defaultUrl = 'https://3d.oslandia.com/giro3d/pointclouds/autzen-classified.copc.laz';

// Extract dataset URL from URL
const url = new URL(document.URL);
let datasetUrl = url.searchParams.get('dataset');
if (!datasetUrl) {
    datasetUrl = defaultUrl;
    url.searchParams.append('dataset', datasetUrl);
    window.history.replaceState({}, null, url.toString());
}

const fragments = new URL(datasetUrl).pathname.split('/');
document.getElementById('filename').innerText = fragments[fragments.length - 1];

// GUI controls for classification handling

const classificationNames = new Array(32);

function addClassification(number, name, array, updateClassificationFilter) {
    const currentColor = array[number].color.getHexString();

    const template = `
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            checked
            role="switch"
            id="class-${number}"
            autocomplete="off"
        />
        <label class="form-check-label w-100" for="class-${number}">
            <div class="row">
                <div class="col" style="font-size: 13px">${name}</div>
                <div class="col-auto">
                    <input
                        type="color"
                        style="height: 1rem; padding: 1px;"
                        class="form-control form-control-color float-end"
                        id="color-${number}"
                        value="#${currentColor}"
                        title="Classification color"
                    />
                </div>
            </div>
        </label>
    </div>
    `;

    const node = document.createElement('div');
    node.innerHTML = template;
    document.getElementById('classifications').appendChild(node);

    const filter = document.createElement('div');
    filter.innerHTML = `
    <div class="form-check">
        <label class="form-check-label">
            <input
                class="form-check-input"
                type="checkbox"
                checked
                data-classification="${number}"
                />
            <span>${number} - ${name}</span>
        </label>
    </div>`;
    filter.querySelector('input').addEventListener('change', updateClassificationFilter);

    document.getElementById(`filter-classifications`).appendChild(filter);

    // Let's change the classification color with the color picker value
    bindColorPicker(`color-${number}`, v => {
        // Parse it into a THREE.js color
        const color = new Color(v);

        array[number].color = color;

        instance.notifyChange();
    });

    classificationNames[number] = name;

    bindToggle(`class-${number}`, enabled => {
        // By toggling the .visible property of a classification,
        // all points that have this classification are hidden/shown.
        array[number].visible = enabled;
        instance.notifyChange();
    });
}

load(datasetUrl).catch(console.error);
```

---

## Source: manuals/examples/cropped-geotiff-elevation.md

Source Path: manuals/examples/cropped-geotiff-elevation.md

# Cropped Elevation COG

## Официальный кейс
- Slug: `cropped-geotiff-elevation`
- Официальная страница: https://giro3d.org/latest/examples/cropped-geotiff-elevation.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/cropped-geotiff-elevation.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/cropped-geotiff-elevation.js`

## Краткое описание (official)
Check that an elevation COG works correctly at the edge of the map.

## Теги (official)
- `geotiff`
- `elevation`
- `map`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=cropped-geotiff-elevation npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/cropped-geotiff-elevation.html
```html
---
title: Cropped Elevation COG
shortdesc: Check that an elevation COG works correctly at the edge of the map.
tags: [geotiff, elevation, map]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/cropped-geotiff-elevation.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = Extent.fromCenterAndSize(
    CoordinateSystem.epsg3857,
    { x: -13555565, y: 5919254 },
    20000,
    20000,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

instance.view.camera.position.set(-13577183, 5907053, 45050);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(-13557038, 5920026, 0);
instance.view.setControls(controls);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    lighting: true,
});

instance.add(map);

// Use an elevation COG with nodata values
const source = new GeoTIFFSource({
    // https://www.sciencebase.gov/catalog/item/632a9a9ad34e71c6d67b95a3
    url: 'https://3d.oslandia.com/cog_data/COG_EPSG3857_USGS_13_n47w122_20220919.tif',
    crs: extent.crs,
});

const min = 263;
const max = 4347;

map.addLayer(
    new ElevationLayer({
        name: 'elevation',
        extent,
        source,
        preloadImages: false,
        minmax: { min, max },
    }),
);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/digitization.md

Source Path: manuals/examples/digitization.md

# Digitizing vector features

## Официальный кейс
- Slug: `digitization`
- Официальная страница: https://giro3d.org/latest/examples/digitization.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/digitization.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/digitization.js`

## Краткое описание (official)
Draw vectors and add them to a map layer

## Расширенное описание (official longdesc)
Create 3D shapes using the `DrawTool`, then convert them to OpenLayers features, and add those features to the map `layer`.

## Теги (official)
- `wmts`
- `ign`
- `map`
- `drawing`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=digitization npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/digitization.html
```html
---
title: Digitizing vector features
shortdesc: Draw vectors and add them to a map layer
longdesc: Create 3D shapes using the <a target="_blank" href="../apidoc/classes/interactions.DrawTool.DrawTool.html"></a><code>DrawTool</code></a>, then convert them to <a target="_blank" href="https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html">OpenLayers features</a>, and add those features to the map <a target="_blank" href="../apidoc/classes/core.layer.ColorLayer.html"></a><code>layer</code></a>.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [wmts, ign, map, drawing]
---

<div class="side-pane-with-status-bar" class="pe-none">
    <!--Parameters -->
    <div class="card">
        <h5 class="card-header">Parameters</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="tooltip"
            >?</span
        >
        <p class="card-text d-none" id="tooltip">
            Use right-click to complete the drawing of shapes.
        </p>

        <div class="card-body">
            <!-- Geometry types -->
            <div class="d-grid gap-2 mx-auto" id="group">
                <button type="button" class="btn btn-primary" id="point">Point</button>
                <button type="button" class="btn btn-primary" id="multipoint">MultiPoint</button>
                <button type="button" class="btn btn-primary" id="linestring">LineString</button>
                <button type="button" class="btn btn-primary" id="polygon">Polygon</button>

                <button type="button" class="btn btn-danger" disabled id="remove-features">
                    <i class="bi bi-trash-fill"></i>
                    Remove features
                </button>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/digitization.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Circle, Fill, Stroke, Style } from 'ol/style.js';
import { Color, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import DrawTool from '@giro3d/giro3d/interactions/DrawTool.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindButton } from './widgets/bindButton.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null, // To make the canvas transparent
});

const extent = Extent.fromCenterAndSize(crs, { x: 895_055, y: 6_247_049 }, 20_000, 20_000);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
});
instance.add(map);

const noDataValue = -1000;

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                name: 'wmts_elevation',
                extent: map.extent,
                resolutionFactor: 1 / 8,
                minmax: { min: 0, max: 500 },
                noDataOptions: {
                    replaceNoData: false,
                },
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

const color = new Color('#2978b4').convertLinearToSRGB();

const fill = new Fill({
    color: `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.35)`,
});

const stroke = new Stroke({
    color: '#2978b4',
    width: 4,
});

const strokeBorder = new Stroke({
    color: 'white',
    width: 6,
});

const style0 = new Style({
    stroke,
});

const style1 = new Style({
    fill,
    stroke: strokeBorder,
    image: new Circle({
        radius: 8,
        fill: new Fill({
            color: '#2978b4',
        }),
        stroke: new Stroke({
            color: 'white',
            width: 3,
        }),
    }),
});

const vectorSource = new VectorSource({
    dataProjection: CoordinateSystem.epsg4326,
    style: [style1, style0],
    data: [],
});

const vectorLayer = new ColorLayer({
    source: vectorSource,
    extent: map.extent,
});

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        map.addLayer(
            new ColorLayer({
                extent: map.extent,
                source: orthophotoWmts,
            }),
        );

        map.addLayer(vectorLayer);
    })
    .catch(console.error);

instance.view.camera.position.set(892_342, 6_246_816, 3000);
const lookAt = new Vector3(892_342, 6_246_816 + 1, 50);
instance.view.camera.lookAt(lookAt);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

const tool = new DrawTool({
    instance,
});

const removeFeatures = bindButton('remove-features', button => {
    vectorSource.clear();
    button.disabled = true;
});

const disableButtons = disable => {
    const buttons = document.getElementById('group').getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons.item(i);
        button.disabled = disable;
    }
};

const createFeature = shape => {
    if (shape) {
        const feature = shape.toOpenLayersFeature();

        vectorSource.addFeature(feature);

        removeFeatures.disabled = false;

        instance.remove(shape);
    }

    controls.enabled = true;

    disableButtons(false);
};

bindButton('point', () => {
    controls.enabled = false;
    disableButtons(true);
    tool.createPoint().then(createFeature);
});

bindButton('multipoint', () => {
    controls.enabled = false;
    disableButtons(true);
    tool.createMultiPoint().then(createFeature);
});

bindButton('linestring', () => {
    controls.enabled = false;
    disableButtons(true);
    tool.createLineString().then(createFeature);
});

bindButton('polygon', () => {
    controls.enabled = false;
    disableButtons(true);
    tool.createPolygon().then(createFeature);
});

// Disable context menu on canvas to avoid disturbing the right click to end drawing.
instance.domElement.addEventListener('contextmenu', event => event.preventDefault());
```

---

## Source: manuals/examples/draw-tool.md

Source Path: manuals/examples/draw-tool.md

# Draw shapes

## Официальный кейс
- Slug: `draw-tool`
- Официальная страница: https://giro3d.org/latest/examples/draw-tool.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/draw-tool.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/draw-tool.js`

## Краткое описание (official)
Enables the user to draw points, lines and polygons.

## Расширенное описание (official longdesc)
The `DrawTool` class allows you to draw shapes, such as points, lines and polygons, on surfaces. Each generated `Shape` can then be exported in GeoJSON.

## Теги (official)
- `drawing`
- `picking`
- `map`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=draw-tool npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/draw-tool.html
```html
---
title: Draw shapes
shortdesc: Enables the user to draw points, lines and polygons.
longdesc: The <a href="../apidoc/classes/interactions.DrawTool.DrawTool.html" target="_blank"><code>DrawTool</code></a> class allows you to draw shapes, such as points, lines and polygons, on surfaces. Each generated <a target="_blank" href="../apidoc/classes/entities.Shape-1.html"><code>Shape</code></a> can then be exported in GeoJSON.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [drawing, picking, map]
---

<div class="side-pane-with-status-bar" style="width: 20rem" class="pe-none">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">Parameters</div>

        <div class="card-body">
            <!-- Geometry types -->
            <div class="d-grid gap-2 mx-auto" id="draw-group">
                <h5>Create new shape</h5>
                <div class="row">
                    <div class="col" style="padding-right: 0 !important">
                        <button type="button" class="btn btn-primary w-100" id="point">
                            Point
                        </button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary w-100" id="multipoint">
                            MultiPoint
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col" style="padding-right: 0 !important">
                        <button type="button" class="btn btn-primary w-100" id="segment">
                            Segment
                        </button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary w-100" id="linestring">
                            LineString
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col" style="padding-right: 0 !important">
                        <button type="button" class="btn btn-primary w-100" id="ring">Ring</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary w-100" id="polygon">
                            Polygon
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col" style="padding-right: 0 !important">
                        <button
                            type="button"
                            class="btn btn-primary w-100"
                            id="vertical-measurement"
                        >
                            Height
                        </button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary w-100" id="angle-measurement">
                            Angle
                        </button>
                    </div>
                </div>

                <!-- End condition -->
                <div class="input-group mt-2">
                    <label
                        class="input-group-text"
                        title="The condition to complete a drawing. Only applies to shapes with unlimited number of points (LineString, Polygon, MultiPoint)"
                        for="end-condition"
                        >End with</label
                    >
                    <select class="form-select" id="end-condition" autocomplete="off">
                        <option value="rightclick" selected>Right-click</option>
                        <option value="doubleclick">Double click</option>
                    </select>
                </div>

                <hr />

                <button
                    type="button"
                    class="btn btn-primary w-100"
                    id="edit-clicked-shape"
                    title="Click on a shape to start editing it. When finished, press right-click to exit edition."
                >
                    <i class="bi bi-pencil"></i>
                    Edit first clicked shape
                </button>

                <div class="row">
                    <div class="col" style="padding-right: 0 !important">
                        <button type="button" disabled class="btn btn-secondary w-100" id="export">
                            <i class="bi bi-upload"></i>
                            Export
                        </button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-secondary w-100" id="import">
                            <i class="bi bi-download"></i>
                            Import
                        </button>
                    </div>
                </div>

                <button type="button" disabled class="btn btn-danger" id="remove-shapes">
                    <i class="bi bi-trash-fill"></i>
                    Remove shapes
                </button>
            </div>

            <hr />

            <h6>Units</h6>

            <!-- Area unit -->
            <div class="input-group mb-2">
                <label class="input-group-text" style="width: 5rem" for="area-unit">Areas</label>
                <select class="form-select" id="area-unit" autocomplete="off">
                    <option value="m" selected>Metric</option>
                    <option value="ha">Hectares</option>
                    <option value="acre">Acres</option>
                </select>
            </div>

            <!-- Length unit -->
            <div class="input-group mb-2">
                <label class="input-group-text" style="width: 5rem" for="length-unit"
                    >Lengths</label
                >
                <select class="form-select" id="length-unit" autocomplete="off">
                    <option value="m" selected>Metric</option>
                    <option value="ft">Feet</option>
                </select>
            </div>

            <!-- Slope unit -->
            <div class="input-group">
                <label class="input-group-text" style="width: 5rem" for="slope-unit">Slopes</label>
                <select class="form-select" id="slope-unit" autocomplete="off">
                    <option value="deg" selected>Degrees</option>
                    <option value="pct">Percent</option>
                </select>
            </div>

            <hr />

            <!-- Color -->
            <label class="form-check-label w-100 mb-2" for="color">
                <div class="row">
                    <div class="col">Color</div>
                    <div class="col">
                        <input
                            type="color"
                            class="form-control form-control-color float-end h-100 w-100"
                            id="color"
                            value="#2978b4"
                            title="color"
                            autocomplete="off"
                        />
                    </div>
                </div>
            </label>

            <!-- Point radius -->
            <div class="row mb-2">
                <div class="col">
                    <label for="point-radius" class="form-label">Point radius (px)</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value="4"
                        class="form-range"
                        id="point-radius"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Line width slider -->
            <div class="row mb-2">
                <div class="col">
                    <label for="line-width" class="form-label">Line width (px)</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value="2"
                        class="form-range"
                        id="line-width"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Border width slider -->
            <div class="row">
                <div class="col">
                    <label for="border-width" class="form-label">Border width (px)</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value="1"
                        class="form-range"
                        id="border-width"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Border width slider -->
            <div class="row">
                <div class="col">
                    <label for="surface-opacity" class="form-label">Surface opacity</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value="0.35"
                        class="form-range"
                        id="surface-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/draw-tool.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Color, DoubleSide, MathUtils, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Shape, {
    DEFAULT_SURFACE_OPACITY,
    angleSegmentFormatter,
    isShapePickResult,
    slopeSegmentFormatter,
} from '@giro3d/giro3d/entities/Shape.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import DrawTool, {
    afterRemovePointOfRing,
    afterUpdatePointOfRing,
    conditions,
    inhibitHook,
    limitRemovePointHook,
} from '@giro3d/giro3d/interactions/DrawTool.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';
import Fetcher from '@giro3d/giro3d/utils/Fetcher.js';

import { bindButton } from './widgets/bindButton.js';
import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null,
});

const extent = Extent.fromCenterAndSize(crs, { x: 972_027, y: 6_299_491 }, 10_000, 10_000);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    lighting: {
        enabled: true,
        hillshadeIntensity: 0.6,
        elevationLayersOnly: true,
    },
    side: DoubleSide,
});
instance.add(map);

const noDataValue = -1000;

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(source => {
        map.addLayer(
            new ElevationLayer({
                extent: map.extent,
                resolutionFactor: 1 / 8,
                minmax: { min: 500, max: 1500 },
                source: source,
            }),
        );
    })
    .catch(console.error);

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(source => {
        map.addLayer(
            new ColorLayer({
                extent: map.extent,
                source: source,
            }),
        );
    })
    .catch(console.error);

const center = extent.centerAsVector2();
instance.view.camera.position.set(center.x - 1000, center.y - 1000, 3000);
const lookAt = new Vector3(center.x, center.y, 200);
instance.view.camera.lookAt(lookAt);
instance.notifyChange(instance.view.camera);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

/** @type {Shape[]} */
const shapes = [];

const options = {
    lineWidth: 2,
    borderWidth: 1,
    vertexRadius: 4,
    color: '#2978b4',
    areaUnit: 'm',
    lengthUnit: 'm',
    slopeUnit: 'deg',
    endCondition: 'rightclick',
    surfaceOpacity: DEFAULT_SURFACE_OPACITY,
};

const tool = new DrawTool({ instance });

let abortController;

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'Escape':
            try {
                abortController.abort();
            } catch {
                console.log('aborted');
            }
            break;
    }
});

function vertexLabelFormatter({ position }) {
    const latlon = new Coordinates(instance.coordinateSystem, position.x, position.y).as(
        CoordinateSystem.epsg4326,
    );

    return `lat: ${latlon.latitude.toFixed(5)}°, lon: ${latlon.longitude.toFixed(5)}°`;
}

const exportButton = bindButton('export', () => {
    const featureCollection = {
        type: 'FeatureCollection',
        features: shapes.map(m => m.toGeoJSON()),
    };

    const text = JSON.stringify(featureCollection, null, 2);

    const blob = new Blob([text], { type: 'application/geo+json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.download = `shapes.geojson`;
    link.href = url;
    link.click();
});

const numberFormat = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
});

const slopeFormatter = opts => {
    switch (options.slopeUnit) {
        case 'deg':
            return angleSegmentFormatter(opts);
        case 'pct':
            return slopeSegmentFormatter(opts);
    }
};

const surfaceLabelFormatter = ({ area }) => {
    switch (options.areaUnit) {
        case 'm': {
            if (area > 1_000_000) {
                return `${numberFormat.format(area / 1_000_000)} km²`;
            }
            return `${numberFormat.format(Math.round(area))} m²`;
        }
        case 'ha':
            return `${numberFormat.format(area / 10000)} ha`;
        case 'acre':
            return `${numberFormat.format(area / 4_046.8564224)} acres`;
    }
};

const lengthFormatter = ({ length }) => {
    switch (options.lengthUnit) {
        case 'm':
            return `${numberFormat.format(Math.round(length))} m`;
        case 'ft':
            return `${numberFormat.format(Math.round(length * 3.28084))} ft`;
    }
};

// Overrides the default formatter for vertical lines
const verticalLineLabelFormatter = ({ vertexIndex, length }) => {
    if (vertexIndex === 0) {
        return null;
    }

    switch (options.lengthUnit) {
        case 'm':
            return `${numberFormat.format(Math.round(length))} m`;
        case 'ft':
            return `${numberFormat.format(Math.round(length * 3.28084))} ft`;
    }
};

function fromGeoJSON(feature) {
    if (feature.type !== 'Feature') {
        throw new Error('not a valid GeoJSON feature');
    }

    const getPoint = c => {
        const coord = new Coordinates(CoordinateSystem.epsg4326, c[0], c[1], c[2] ?? 0);
        return coord.as(instance.coordinateSystem, coord).toVector3();
    };

    const uuid = MathUtils.generateUUID();
    let result;

    switch (feature.geometry.type) {
        case 'Point':
            result = new Shape({
                showVertexLabels: true,
                showLine: false,
                showVertices: true,
                beforeRemovePoint: inhibitHook,
                vertexLabelFormatter,
            });
            result.setPoints([getPoint(feature.geometry.coordinates)]);
            break;
        case 'MultiPoint':
            result = new Shape({
                showVertexLabels: true,
                showLine: false,
                showVertices: true,
                beforeRemovePoint: limitRemovePointHook(1),
                vertexLabelFormatter,
            });
            result.setPoints(feature.geometry.coordinates.map(getPoint));
            break;
        case 'LineString':
            result = new Shape({
                showVertexLabels: false,
                showLine: true,
                showVertices: true,
                showSegmentLabels: true,
                segmentLabelFormatter: lengthFormatter,
                beforeRemovePoint: limitRemovePointHook(2),
            });
            result.setPoints(feature.geometry.coordinates.map(getPoint));
            break;
        case 'Polygon':
            result = new Shape({
                showVertexLabels: false,
                showLine: true,
                showVertices: true,
                showSurface: true,
                showSurfaceLabel: true,
                surfaceLabelFormatter,
                beforeRemovePoint: limitRemovePointHook(4), // We take into account the doubled first/last point
                afterRemovePoint: afterRemovePointOfRing,
                afterUpdatePoint: afterUpdatePointOfRing,
            });
            result.setPoints(feature.geometry.coordinates[0].map(getPoint));
            break;
    }

    return result;
}

const removeShapesButton = bindButton('remove-shapes', () => {
    shapes.forEach(m => instance.remove(m));
    shapes.length = 0;
    removeShapesButton.disabled = true;
    exportButton.disabled = true;
    instance.notifyChange();
});

function importGeoJSONFile(json) {
    for (const feature of json.features) {
        const shape = fromGeoJSON(feature);
        instance.add(shape);
        shapes.push(shape);
    }

    if (shapes.length > 0) {
        removeShapesButton.disabled = false;
        exportButton.disabled = false;
    }
    instance.notifyChange();
}

Fetcher.json('data/default-shapes.geojson').then(json => {
    importGeoJSONFile(json);
});

bindButton('import', () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = () => {
        const file = input.files[0];

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = readerEvent => {
            const text = readerEvent.target.result;
            // @ts-expect-error typing
            const json = JSON.parse(text);
            importGeoJSONFile(json);
        };
    };

    input.click();
});

function disableDrawButtons(disabled) {
    const group = document.getElementById('draw-group');
    const buttons = group.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons.item(i);
        button.disabled = disabled;
    }
}

/**
 * @param {HTMLButtonElement} button - TTh
 * @param {*} callback
 * @param {*} specificOptions
 */
function createShape(button, callback, specificOptions) {
    disableDrawButtons(true);

    button.classList.remove('btn-primary');
    button.classList.add('btn-secondary');

    abortController = new AbortController();

    callback
        .bind(tool)({
            signal: abortController.signal,
            ...options,
            ...specificOptions,
            endCondition:
                options.endCondition === 'rightclick'
                    ? conditions.rightClick
                    : conditions.doubleClick,
            onTemporaryPointMoved: () => console.log('onTemporaryPointMoved'),
        })
        .then(shape => {
            if (shape) {
                shapes.push(shape);
                removeShapesButton.disabled = false;
                exportButton.disabled = false;
            }
        })
        .catch(e => {
            if (e.message !== 'aborted') {
                console.log(e);
            }
        })
        .finally(() => {
            disableDrawButtons(false);
            button.classList.add('btn-primary');
            button.classList.remove('btn-secondary');
        });
}

bindButton('point', button => {
    createShape(button, tool.createPoint, {
        showVertexLabels: true,
        vertexLabelFormatter,
    });
});
bindButton('multipoint', button => {
    createShape(button, tool.createMultiPoint, {
        showVertexLabels: true,
        vertexLabelFormatter,
    });
});
bindButton('segment', button => {
    createShape(button, tool.createSegment, {
        segmentLabelFormatter: lengthFormatter,
        showSegmentLabels: true,
    });
});
bindButton('linestring', button => {
    createShape(button, tool.createLineString, {
        segmentLabelFormatter: lengthFormatter,
        showSegmentLabels: true,
    });
});
bindButton('ring', button => {
    createShape(button, tool.createRing, {
        showLineLabel: true,
        lineLabelFormatter: lengthFormatter,
    });
});
bindButton('polygon', button => {
    createShape(button, tool.createPolygon, {
        surfaceLabelFormatter,
        showSurfaceLabel: true,
    });
});
bindDropDown('area-unit', v => {
    options.areaUnit = v;
    shapes.forEach(shape => shape.rebuildLabels());
});
bindDropDown('length-unit', v => {
    options.lengthUnit = v;
    shapes.forEach(shape => shape.rebuildLabels());
});
bindDropDown('slope-unit', v => {
    options.slopeUnit = v;
    shapes.forEach(shape => shape.rebuildLabels());
});
bindDropDown('end-condition', v => {
    options.endCondition = v;
});
bindButton('vertical-measurement', button => {
    createShape(button, tool.createVerticalMeasure, {
        verticalLineLabelFormatter: verticalLineLabelFormatter,
        segmentLabelFormatter: slopeFormatter,
    });
});
bindButton('angle-measurement', button => {
    createShape(button, tool.createSector);
});
bindSlider('point-radius', v => {
    options.vertexRadius = v;
    shapes.forEach(m => {
        m.vertexRadius = v;
    });
});
bindSlider('line-width', v => {
    options.lineWidth = v;
    shapes.forEach(m => {
        m.lineWidth = v;
    });
});
bindSlider('border-width', v => {
    options.borderWidth = v;
    shapes.forEach(m => {
        m.borderWidth = v;
    });
});
bindSlider('surface-opacity', v => {
    options.surfaceOpacity = v;
    shapes.forEach(m => {
        m.surfaceOpacity = v;
    });
});
bindColorPicker('color', v => {
    // @ts-expect-error conversion
    options.color = v;
    shapes.forEach(m => {
        m.color = v;
    });
});

function pickShape(mouseEvent) {
    const pickResults = instance.pickObjectsAt(mouseEvent, { where: shapes });
    const first = pickResults[0];
    if (isShapePickResult(first)) {
        return first.entity;
    }

    return null;
}

let isEditModeActive = false;
let highlightHoveredShape = false;
let editedShape = null;

const editButton = bindButton('edit-clicked-shape', () => {
    highlightHoveredShape = true;
    editButton.disabled = true;
    removeShapesButton.disabled = true;

    const onclick = (/** @type {MouseEvent} */ mouseEvent) => {
        if (mouseEvent.button === 0) {
            instance.domElement.removeEventListener('click', onclick);
            const shape = pickShape(mouseEvent);

            if (shape) {
                editedShape = shape;
                isEditModeActive = true;
                highlightHoveredShape = false;

                shape.color = 'yellow';

                tool.enterEditMode({
                    shapesToEdit: [shape],
                    onPointInserted: arg => console.log('onPointInserted', arg),
                    onPointUpdated: arg => console.log('onPointMoved', arg),
                    onPointRemoved: arg => console.log('onPointRemoved', arg),
                });
            }
        }
    };

    const onrightlick = () => {
        editButton.disabled = false;
        removeShapesButton.disabled = shapes.length === 0;
        tool.exitEditMode();
        isEditModeActive = false;
        if (editedShape) {
            editedShape.color = options.color;
            editedShape = null;
        }
        instance.domElement.removeEventListener('contextmenu', onrightlick);
    };

    instance.domElement.addEventListener('click', onclick);
    instance.domElement.addEventListener('contextmenu', onrightlick);
});

function mousemove(mouseEvent) {
    if (shapes.length === 0) {
        return;
    }

    for (const shape of shapes) {
        shape.labelOpacity = 1;
    }

    if (isEditModeActive || highlightHoveredShape) {
        const shape = pickShape(mouseEvent);

        if (shape) {
            if (isEditModeActive && shape === editedShape) {
                // Dim labels so the user can properly insert vertices on segments.
                shape.labelOpacity = 0.5;
            }
            if (highlightHoveredShape) {
                shape.color = new Color(options.color).offsetHSL(0, 0, 0.2);
            }
        }
    }
}

instance.domElement.addEventListener('mousemove', mousemove);

// We want to prevent moving the camera while dragging a point
tool.addEventListener('start-drag', () => {
    controls.enabled = false;
});
tool.addEventListener('end-drag', () => {
    controls.enabled = true;
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/ellipsoid.md

Source Path: manuals/examples/ellipsoid.md

# Ellipsoid

## Официальный кейс
- Slug: `ellipsoid`
- Официальная страница: https://giro3d.org/latest/examples/ellipsoid.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/ellipsoid.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/ellipsoid.js`

## Краткое описание (official)
Visualize an ellipsoid.

## Расширенное описание (official longdesc)
Use the `EllipsoidHelper` to visualize an `ellipsoid`.

## Теги (official)
- `ellipsoid`
- `helper`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=ellipsoid npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/ellipsoid.html
```html
---
title: Ellipsoid
shortdesc: Visualize an ellipsoid.
longdesc: Use the <a href="../apidoc/classes/helpers.EllipsoidHelper.html" target="_blank"><code>EllipsoidHelper</code></a> to visualize an <a href="../apidoc/classes/core.geographic.Ellipsoid.html" target="_blank"><code>ellipsoid</code></a>.
tags: [ellipsoid, helper]
---

<div class="side-pane-with-status-bar" style="width: 22rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body">
            <!-- Semi-major axis -->
            <div class="input-group mb-2">
                <span class="input-group-text">Semi-major axis</span>
                <input
                    type="number"
                    min="1"
                    step="1"
                    value="6378137"
                    class="form-control"
                    id="semi-major-axis"
                    autocomplete="off"
                />
                <span class="input-group-text">m</span>
            </div>

            <!-- Semi-minor axis -->
            <div class="input-group mb-3">
                <span class="input-group-text">Semi-minor axis</span>
                <input
                    type="number"
                    min="1"
                    step="1"
                    value="6356752"
                    class="form-control"
                    id="semi-minor-axis"
                    autocomplete="off"
                />
                <span class="input-group-text">m</span>
            </div>

            <!-- Toggle labels -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="show-labels"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-labels">Show labels</label>
            </div>

            <!-- Toggle labels -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="show-normals"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-normals">Show normal vectors</label>
            </div>

            <!-- Toggle axes -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="show-axes"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-axes">Show axes</label>
            </div>

            <!-- Toggle ENU frame -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="show-enu-frame"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-enu-frame"
                    >Show ENU frame
                    <span
                        class="text-secondary"
                        data-bs-toggle="popover"
                        data-bs-content="help-enu-frame"
                        ><i class="bi bi-question-circle"></i>
                    </span>
                </label>

                <p class="card-text d-none" id="help-enu-frame">
                    Shows the local tangent plane coordinates (LTP) frame at the mouse location.
                </p>
            </div>

            <!-- Toggle lines -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    role="switch"
                    id="show-lines"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-lines">Show lines</label>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/ellipsoid.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { AxesHelper, Matrix4, Raycaster, Vector2, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Ellipsoid from '@giro3d/giro3d/core/geographic/Ellipsoid';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Inspector from '@giro3d/giro3d/gui/Inspector';
import EllipsoidHelper from '@giro3d/giro3d/helpers/EllipsoidHelper';

import { bindButton } from './widgets/bindButton';
import { bindNumberInput } from './widgets/bindNumberInput';
import { bindToggle } from './widgets/bindToggle';
import StatusBar from './widgets/StatusBar';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4978,
    backgroundColor: 'black',
});

const DEFAULT_PARAMS = {
    observer: new Coordinates(CoordinateSystem.epsg4326, 30, 40, 36_000_000),
    semiMajorAxis: Ellipsoid.WGS84.semiMajorAxis,
    semiMinorAxis: Ellipsoid.WGS84.semiMinorAxis,
    ellipsoid: Ellipsoid.WGS84,
    showEnuFrame: true,
    showLines: true,
    showLabels: true,
    showAxes: true,
    showNormals: false,
};

let params = { ...DEFAULT_PARAMS };

/** @type {EllipsoidHelper} */
let helper;

function createHelper() {
    if (helper) {
        helper.dispose();
        helper.removeFromParent();
    }

    const ellipsoid = new Ellipsoid({
        semiMajorAxis: params.semiMajorAxis,
        semiMinorAxis: params.semiMinorAxis,
    });

    params.ellipsoid = ellipsoid;

    helper = new EllipsoidHelper({ ellipsoid });

    instance.threeObjects.add(helper);

    helper.showAxes = params.showAxes;
    helper.showLabels = params.showLabels;
    helper.showLines = params.showLines;
    helper.showNormals = params.showNormals;

    instance.notifyChange();
}

const [setSemiMajorAxis] = bindNumberInput('semi-major-axis', val => {
    params.semiMajorAxis = val;

    createHelper();
});
const [setSemiMinorAxis] = bindNumberInput('semi-minor-axis', val => {
    params.semiMinorAxis = val;

    createHelper();
});
const [showLabels] = bindToggle('show-labels', show => {
    params.showLabels = show;
    helper.showLabels = show;
    instance.notifyChange();
});
const [showAxes] = bindToggle('show-axes', show => {
    helper.showAxes = show;
    params.showAxes = show;
    instance.notifyChange();
});
const [showLines] = bindToggle('show-lines', show => {
    params.showLines = show;
    helper.showLines = show;
    instance.notifyChange();
});
const [showNormals] = bindToggle('show-normals', show => {
    params.showNormals = show;
    helper.showNormals = show;
    instance.notifyChange();
});
const [showEnuFrame] = bindToggle('show-enu-frame', show => {
    params.showEnuFrame = show;
    instance.notifyChange();
});

createHelper();

const camera = instance.view.camera;

function updateCamera() {
    const { observer, ellipsoid } = params;

    const position = ellipsoid.toCartesian(
        observer.latitude,
        observer.longitude,
        observer.altitude,
    );

    camera.position.set(position.x, position.y, position.z);

    camera.lookAt(0, 0, 0);

    camera.updateMatrixWorld(true);

    instance.notifyChange(camera);
}

updateCamera();

function reset() {
    params = { ...DEFAULT_PARAMS };

    setSemiMajorAxis(params.semiMajorAxis);
    setSemiMinorAxis(params.semiMinorAxis);
    showLabels(params.showLabels);
    showLines(params.showLines);
    showAxes(params.showAxes);
    showNormals(params.showNormals);
    showEnuFrame(params.showEnuFrame);

    updateCamera();
    createHelper();
}

bindButton('reset', reset);

reset();

const controls = new OrbitControls(instance.view.camera, instance.domElement);
controls.target.set(0, 0, 0);
instance.view.setControls(controls);

const enuMatrix = new Matrix4();
const raycaster = new Raycaster();
const intersection = new Vector3();
const axes = new AxesHelper(params.ellipsoid.semiMajorAxis * 0.25);
instance.scene.add(axes);
axes.visible = false;

/**
 * @param {MouseEvent} event
 */
const onMouseMove = event => {
    if (!params.showEnuFrame) {
        if (axes.visible) {
            axes.visible = false;
            instance.notifyChange();
        }
        return;
    }

    const ndc = instance.eventToNormalizedCoords(event, new Vector2());
    raycaster.setFromCamera(ndc, instance.view.camera);
    const ray = raycaster.ray;

    const point = params.ellipsoid.intersectRay(ray, intersection);

    axes.visible = point != null;

    if (point) {
        axes.position.copy(point);

        const enu = params.ellipsoid.getEastNorthUpMatrixFromCartesian(point, enuMatrix);

        axes.setRotationFromMatrix(enu);

        axes.updateMatrixWorld(true);
    }

    instance.notifyChange();
};

instance.domElement.addEventListener('mousemove', onMouseMove);

Inspector.attach('inspector', instance);
StatusBar.bind(instance, { disableUrlUpdate: true });
```

---

## Source: manuals/examples/feature-collection-reprojection.md

Source Path: manuals/examples/feature-collection-reprojection.md

# Reprojection of features as mesh

## Официальный кейс
- Slug: `feature-collection-reprojection`
- Официальная страница: https://giro3d.org/latest/examples/feature-collection-reprojection.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/feature-collection-reprojection.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/feature-collection-reprojection.js`

## Краткое описание (official)
Illustrates the automatic reprojection of vectors to match the instance's CRS.

## Расширенное описание (official longdesc)
Display a map in EPGS:2154 with GeoJSON features displayed as meshes in various CRS, showing reprojection capabilities of FeatureCollection.

## Теги (official)
- `vector`
- `features`
- `reprojection`

## Атрибуция (official)
© Paris Data

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=feature-collection-reprojection npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/feature-collection-reprojection.html
```html
---
title: Reprojection of features as mesh
shortdesc: Illustrates the automatic reprojection of vectors to match the instance's CRS.
longdesc: Display a map in EPGS:2154 with GeoJSON features displayed as meshes in various CRS, showing reprojection capabilities of FeatureCollection.
attribution: © <a target="_blank" href="https://opendata.paris.fr/">Paris Data</a>
tags: [vector, features, reprojection]
---

<div class="side-pane-with-status-bar" style="min-height: 9rem">
    <div class="card">
        <h5 class="card-header">Information</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="tooltip"
            >?</span
        >

        <p class="card-text d-none" id="tooltip">Some informations embedded in the GeoJSON</p>

        <div class="card-body pe-none">
            <!-- Result table -->
            <ul style="width: 12rem" id="results"></ul>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/feature-collection-reprojection.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { tile } from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import { createXYZ } from 'ol/tilegrid.js';
import { Color, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { MathUtils } from 'three/src/math/MathUtils.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import FeatureCollection from '@giro3d/giro3d/entities/FeatureCollection.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const extent = new Extent(crs, -111629.52, 1275028.84, 5976033.79, 7230161.64);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

// This is a GeoJSON with the default crs EPSG:4326
const arrondissementSource = new VectorSource({
    format: new GeoJSON(),
    url: './data/paris_arrondissements.geojson',
});

function getHue(area) {
    const minArea = 991153;
    const maxArea = 16372542;
    const hue = MathUtils.mapLinear(area, minArea, maxArea, 0.2, 0.8);

    return MathUtils.clamp(hue, 0, 1);
}

// Creates the entity. The features will automatically be reprojected before being displayed.
const arrondissements = new FeatureCollection({
    name: 'arrondissements',
    source: arrondissementSource,
    extent,
    ignoreZ: true,
    minLevel: 0,
    maxLevel: 0,
    style: feature => {
        // The style depends on the polygon's area
        const t = getHue(feature.get('surface'));
        const highlight = feature.get('highlight');
        const brightness = highlight ? 1 : 0.7;
        const color = new Color().setHSL(0, t, brightness * t, 'srgb');

        return {
            fill: {
                color,
                depthTest: false,
                renderOrder: 1,
            },
            stroke: highlight
                ? {
                      color: 'white',
                      depthTest: false,
                      renderOrder: 2,
                  }
                : null,
        };
    },
});
instance.add(arrondissements);

// Another GeoJSON in EPSG:3857
// Although this is non-standard in recent versions of
// the GeoJSON specification, OpenLayers and Giro3D still
// support GeoJSON files that have a different CRS than EPSG:4326.
const perimeterqaaSource = new VectorSource({
    format: new GeoJSON(),
    url: './data/perimetreqaa.geojson',
});

const perimeterqaa = new FeatureCollection({
    name: 'perimeterqaa',
    source: perimeterqaaSource,
    extent,
    ignoreZ: true,
    minLevel: 0,
    maxLevel: 0,
    style: feature => {
        const highlight = feature.get('highlight');
        return {
            fill: {
                color: highlight ? '#5d914d' : '#41822d',
                depthTest: false,
                opacity: 0.7,
                renderOrder: 3,
            },
            stroke: {
                color: '#85f516',
                lineWidth: highlight ? 4 : 1,
                depthTest: false,
                renderOrder: 4,
            },
        };
    },
});
instance.add(perimeterqaa);

// A WFS source in EPSG:3857
const bdTopoSource = new VectorSource({
    format: new GeoJSON(),
    url: function url(bbox) {
        return `${
            'https://data.geopf.fr/wfs/ows' +
            '?SERVICE=WFS' +
            '&VERSION=2.0.0' +
            '&request=GetFeature' +
            '&typename=BDTOPO_V3:batiment' +
            '&outputFormat=application/json' +
            '&SRSNAME=EPSG:3857' +
            '&startIndex=0' +
            '&bbox='
        }${bbox.join(',')},EPSG:3857`;
    },
    strategy: tile(createXYZ({ tileSize: 512 })),
});
const buildings = new FeatureCollection({
    name: 'buildings',
    source: bdTopoSource,
    // we specify that FeatureCollection should reproject the features before displaying them
    dataProjection: CoordinateSystem.epsg3857,
    // We are working on a flat, 2D scene, so we must ignore the Z coordinate of features, if any.
    ignoreZ: true,
    extent,
    style: feature => {
        const properties = feature.getProperties();
        const highlighted = properties.highlight;
        let color = '#FFFFFF';

        if (highlighted) {
            color = 'cyan';
        } else {
            if (properties.usage_1 === 'Résidentiel') {
                color = '#9d9484';
            } else if (properties.usage_1 === 'Commercial et services') {
                color = '#b0ffa7';
            }
        }
        return {
            fill: {
                color,
                depthTest: false,
                renderOrder: 5,
            },
            stroke: {
                color: 'black',
                renderOrder: 6,
                depthTest: false,
            },
        };
    },
    minLevel: 11,
    maxLevel: 11,
});
instance.add(buildings);

const position = new Coordinates(crs, 652212.5, 6860754.1, 27717.3);
const lookAtCoords = new Coordinates(crs, 652338.3, 6862087.1, 200);
const lookAt = new Vector3(lookAtCoords.x, lookAtCoords.y, lookAtCoords.z);
instance.view.camera.position.set(position.x, position.y, position.z);
instance.view.camera.lookAt(lookAt);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

// information on click
const resultTable = document.getElementById('results');

let previousObjects = [];
const objectsToUpdate = [];

function createResultTable(values) {
    resultTable.innerHTML = '';

    for (const value of values) {
        const child = document.createElement('li');
        // child.classList.add('list-group-item');
        child.innerText = value;
        resultTable.appendChild(child);
    }
}

function pick(e) {
    instance.notifyChange();
    // pick objects
    const pickedObjects = instance.pickObjectsAt(e, {
        radius: 2,
        where: [arrondissements, perimeterqaa],
    });

    // Reset highlights
    previousObjects.forEach(o => o.userData.feature.set('highlight', false));

    const tableValues = [];

    if (pickedObjects.length !== 0) {
        resultTable.innerHTML = '';

        for (const p of pickedObjects) {
            const obj = p.object;

            const feature = obj.userData.feature;
            const entity = obj.userData.parentEntity;

            objectsToUpdate.push(obj);

            if (entity === arrondissements) {
                tableValues.push(feature.get('l_ar'));
            }
            if (entity === perimeterqaa) {
                tableValues.push('Improved Accessibility Zone');
            }
            // highlight it
            feature.set('highlight', true);
        }
    }

    createResultTable(tableValues);

    instance.notifyChange([...previousObjects, ...objectsToUpdate]);
    previousObjects = [...objectsToUpdate];
    objectsToUpdate.length = 0;
}

instance.domElement.addEventListener('mousemove', pick);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/first-person-controls.md

Source Path: manuals/examples/first-person-controls.md

# First Person Controls

## Официальный кейс
- Slug: `first-person-controls`
- Официальная страница: https://giro3d.org/latest/examples/first-person-controls.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/first-person-controls.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/first-person-controls.js`

## Краткое описание (official)
Use first person controls to move in the scene

## Теги (official)
- `navigation`
- `controls`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=first-person-controls npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/first-person-controls.html
```html
---
title: First Person Controls
shortdesc: Use first person controls to move in the scene
tags: [navigation, controls]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/first-person-controls.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Vector3 } from 'three';

import FirstPersonControls from '@giro3d/giro3d/controls/FirstPersonControls.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null,
});

const pointCloud = new Tiles3D({
    url: 'https://3d.oslandia.com/3dtiles/eglise_saint_blaise_arles/tileset.json',
    pointCloudMode: MODE.COLOR,
});

instance.add(pointCloud);

// Position our camera
const camera = instance.view.camera;
camera.position.set(831542.2870560559, 6287655.35350404, 31.86644500706522);
camera.lookAt(new Vector3(831585.923, 6287652.23, 27.461));
camera.updateMatrixWorld();

// And create our controls
const controls = new FirstPersonControls(instance, { focusOnMouseOver: true });

controls.reset();

instance.domElement.focus();
instance.notifyChange(camera);

Inspector.attach('inspector', instance);

StatusBar.bind(instance, { disableUrlUpdate: true });
```

---

## Source: manuals/examples/geojson-3d.md

Source Path: manuals/examples/geojson-3d.md

# GeoJSON 3D

## Официальный кейс
- Slug: `geojson-3d`
- Официальная страница: https://giro3d.org/latest/examples/geojson-3d.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/geojson-3d.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/geojson-3d.js`

## Краткое описание (official)
Represents 3D shapes from a GeoJSON file.

## Расширенное описание (official longdesc)
GeoJSON features with Z coordinates can be displayed as 3D shapes using the `FeatureCollection` entity.

## Теги (official)
- `features`
- `3D`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=geojson-3d npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/geojson-3d.html
```html
---
title: GeoJSON 3D
shortdesc: Represents 3D shapes from a GeoJSON file.
longdesc: GeoJSON features with Z coordinates can be displayed as 3D shapes using the <a target="_blank" href="../apidoc/classes/entities.FeatureCollection.html"><code>FeatureCollection</code></a> entity.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [features, 3D]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Show/Hide lines -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="show-lines"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-lines">Show lines</label>
            </div>

            <!-- Toggle shading -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="toggle-shading"
                    autocomplete="off"
                />
                <label class="form-check-label" for="toggle-shading">Enable shading</label>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/geojson-3d.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { tile } from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import { createXYZ } from 'ol/tilegrid.js';
import { AmbientLight, Color, DirectionalLight, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import FeatureCollection from '@giro3d/giro3d/entities/FeatureCollection.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const epsg2154 = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

CoordinateSystem.register(
    'urn:ogc:def:crs:OGC:1.3:CRS84',
    '+proj=longlat +datum=WGS84 +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs: epsg2154,
    backgroundColor: null,
});

const center = new Coordinates(CoordinateSystem.epsg4326, 6.63125, 45.93506).as(
    instance.coordinateSystem,
);
const extent = Extent.fromCenterAndSize(epsg2154, { x: center.x, y: center.y }, 1_000, 1_000);

const buildingSource = new VectorSource({
    format: new GeoJSON(),
    url: 'data/geojson_3D.geojson',
    strategy: tile(createXYZ({ tileSize: 512 })),
});

const colors = {};

function colorFromId(id) {
    if (colors[id] == null) {
        colors[id] = new Color().setHSL(Math.random(), 0.5, 0.5, 'srgb');
    }

    const result = colors[id];

    return result;
}

const params = {
    shading: true,
    lines: true,
};

const featureCollection = new FeatureCollection({
    source: buildingSource,
    dataProjection: CoordinateSystem.epsg4326,
    extent,
    minLevel: 0,
    maxLevel: 0,
    style: feature => {
        return {
            fill: {
                color: colorFromId(feature.get('id')),
                shading: params.shading,
            },
            stroke: params.lines ? { color: 'black', lineWidth: 2 } : null,
        };
    },
});

instance.add(featureCollection);

// Add a sunlight
const sun = new DirectionalLight('#ffffff', 2);
sun.position.set(1, 0, 10000);
sun.updateMatrixWorld(true);
instance.scene.add(sun);

// We can look below the floor, so let's light also a bit there
const sun2 = new DirectionalLight('#ffffff', 0.5);
sun2.position.set(0, 1, 1);
sun2.updateMatrixWorld();
instance.scene.add(sun2);

// Add an ambient light
const ambientLight = new AmbientLight(0xffffff, 0.2);
instance.scene.add(ambientLight);

instance.view.camera.position.set(center.x + 60, center.y + 60, 150);

const lookAt = new Vector3(center.x, center.y, 10);
instance.view.camera.lookAt(lookAt);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.4;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

bindToggle('toggle-shading', v => {
    params.shading = v;
    featureCollection.updateStyles();
});
bindToggle('show-lines', v => {
    params.lines = v;
    featureCollection.updateStyles();
});
```

---

## Source: manuals/examples/geotiff-bathymetry.md

Source Path: manuals/examples/geotiff-bathymetry.md

# GeoTIFF Bathymetry

## Официальный кейс
- Slug: `geotiff-bathymetry`
- Официальная страница: https://giro3d.org/latest/examples/geotiff-bathymetry.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/geotiff-bathymetry.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/geotiff-bathymetry.js`

## Краткое описание (official)
Display a fully underwater elevation layer using a GeoTIFF raster.

## Теги (official)
- `terrain`
- `map`
- `geotiff`

## Атрибуция (official)
© EMODnet

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=geotiff-bathymetry npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-bathymetry.html
```html
---
title: GeoTIFF Bathymetry
shortdesc: Display a fully underwater elevation layer using a GeoTIFF raster.
attribution: © <a target="_blank" href="https://emodnet.ec.europa.eu/">EMODnet</a>
dependencies: ['colormap']
tags: [terrain, map, geotiff]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-bathymetry.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import AxisGrid from '@giro3d/giro3d/entities/AxisGrid.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(CoordinateSystem.epsg3857, 2285900, 2444000, 4230900, 4386100);

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
    backgroundColor: null, // Make the canvas transparent
});

const map = new Map({
    extent,
    lighting: true,
});
instance.add(map);

const source = new GeoTIFFSource({
    url: 'https://3d.oslandia.com/giro3d/rasters/bathymetry-emodnet.cog.tif',
    crs: CoordinateSystem.epsg3857,
});

const min = -5200;
const max = -900;

const axisGrid = new AxisGrid({
    volume: {
        extent,
        floor: min,
        ceiling: 0,
    },
    ticks: {
        x: 20_000,
        y: 20_000,
        z: 500,
    },
});

instance.add(axisGrid);

const colorMap = new ColorMap({
    colors: makeColorRamp('bathymetry'),
    min,
    max,
    mode: ColorMapMode.Elevation,
});

map.addLayer(
    new ElevationLayer({
        name: 'bathymetry',
        extent,
        source,
        colorMap: colorMap,
        minmax: { min, max },
    }),
);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.2;

const center = extent.centerAsVector2();

instance.view.camera.position.set(2195551, 4146310, 90_000);
controls.target.set(center.x, center.y, min);

instance.view.setControls(controls);

// Attach the inspector
Inspector.attach('inspector', instance);

StatusBar.bind(instance);

const labelElement = document.createElement('span');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';
const label = new CSS2DObject(labelElement);

label.visible = false;
instance.add(label);

function pick(mouseEvent) {
    const picked = instance.pickObjectsAt(mouseEvent, { where: [map] });

    if (picked.length > 0) {
        label.visible = true;
        const point = picked[0].point;
        label.element.innerText = `depth: ${Math.round(point.z)}m`;
        label.position.copy(point);
        label.updateMatrixWorld(true);
    } else {
        label.visible = false;
    }
    instance.notifyChange();
}

instance.domElement.addEventListener('mousemove', pick);
```

---

## Source: manuals/examples/geotiff-channel-mapping.md

Source Path: manuals/examples/geotiff-channel-mapping.md

# GeoTIFF channel mapping

## Официальный кейс
- Slug: `geotiff-channel-mapping`
- Официальная страница: https://giro3d.org/latest/examples/geotiff-channel-mapping.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/geotiff-channel-mapping.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/geotiff-channel-mapping.js`

## Краткое описание (official)
Select which bands to view on GeoTIFFs with multiple bands.

## Расширенное описание (official longdesc)
GeoTIFFs may have multiple bands. You can select which bands to view, and specify how to map them to regular R, G, B colors.

## Теги (official)
- `map`
- `geotiff`

## Атрибуция (official)
© Data provided by the European Space Agency

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=geotiff-channel-mapping npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-channel-mapping.html
```html
---
title: GeoTIFF channel mapping
shortdesc: Select which bands to view on GeoTIFFs with multiple bands.
longdesc: <a href="https://www.cogeo.org/" target="_blank">GeoTIFFs</a> may have multiple bands. You can select which bands to view, and specify how to map them to regular R, G, B colors.
attribution: © Data provided by the <a target="_blank" href="https://esa.int/">European Space Agency</a>
tags: [map, geotiff]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Channel mapping</div>

        <div class="card-body">
            <div class="input-group mb-3">
                <label class="input-group-text" for="r-channel">R</label>
                <select class="form-select" id="r-channel" autocomplete="off">
                    <option value="0" selected>Band 1</option>
                    <option value="1">Band 2</option>
                    <option value="2">Band 3</option>
                    <option value="3">Band 4</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text" for="g-channel">G</label>
                <select class="form-select" id="g-channel" autocomplete="off">
                    <option value="0">Band 1</option>
                    <option value="1" selected>Band 2</option>
                    <option value="2">Band 3</option>
                    <option value="3">Band 4</option>
                </select>
            </div>
            <div class="input-group">
                <label class="input-group-text" for="b-channel" autocomplete="off">B</label>
                <select class="form-select" id="b-channel">
                    <option value="0" selected>Band 1</option>
                    <option value="1">Band 2</option>
                    <option value="2" selected>Band 3</option>
                    <option value="3">Band 4</option>
                </select>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-channel-mapping.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Interpretation from '@giro3d/giro3d/core/layer/Interpretation.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:32611',
    '+proj=utm +zone=11 +datum=WGS84 +units=m +no_defs +type=crs',
);

const extent = new Extent(crs, 666285, 668533.5, 3997174, 3998444);
const center = extent.centerAsVector3();

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

instance.view.camera.position.set(center.x, center.y, 2500);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(center.x, center.y + 1, center.z);
instance.view.setControls(controls);

const map = new Map({ extent });

instance.add(map);

// Data coming from the same source as
// https://openlayers.org/en/latest/examples/cog-math-multisource.html
const source = new GeoTIFFSource({
    url: 'https://3d.oslandia.com/cog_data/20200428_211318_ssc8d1_0017_pansharpened.cog.tif',
    crs: extent.crs,
    channels: [0, 1, 2],
});

const layer = new ColorLayer({
    name: 'color-layer',
    source,
    extent,
    interpretation: Interpretation.CompressTo8Bit(0, 900),
});

map.addLayer(layer);

bindNumericalDropDown('r-channel', v => {
    source.channels[0] = v;
    source.update();
});
bindNumericalDropDown('g-channel', v => {
    source.channels[1] = v;
    source.update();
});
bindNumericalDropDown('b-channel', v => {
    source.channels[2] = v;
    source.update();
});

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/geotiff-color.md

Source Path: manuals/examples/geotiff-color.md

# Cloud Optimized GeoTIFF (COG)

## Официальный кейс
- Slug: `geotiff-color`
- Официальная страница: https://giro3d.org/latest/examples/geotiff-color.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/geotiff-color.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/geotiff-color.js`

## Краткое описание (official)
Display a color COG in various color spaces.

## Расширенное описание (official longdesc)
Cloud Optimized GeoTIFFs are regular GeoTIFF files whose layout is optimized for remote access. They allow streaming the image without tiling it beforehand. The `GeoTIFFSource` image source supports both elevation and color data, as well as 8-bit, 16-bit and 32-bit pixels. Optionally, you can use the `convertToRGB` constructor option to decode images not in the RGB color space, such as CMYK or YCbCR images.

## Теги (official)
- `map`
- `geotiff`
- `cog`

## Атрибуция (official)
© EOX

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=geotiff-color npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-color.html
```html
---
title: Cloud Optimized GeoTIFF (COG)
shortdesc: Display a color COG in various color spaces.
longdesc: <a href="https://www.cogeo.org/" target="_blank">Cloud Optimized GeoTIFFs</a> are regular GeoTIFF files whose layout is optimized for remote access. They allow streaming the image without tiling it beforehand. The <a target="_blank" href="../apidoc/classes/sources.GeoTIFFSource.html"><code>GeoTIFFSource</code></a> image source supports both elevation and color data, as well as 8-bit, 16-bit and 32-bit pixels.  Optionally, you can use the <code>convertToRGB</code> constructor option to decode images not in the RGB color space, such as CMYK or YCbCR images.
attribution: © <a target="_blank" href="https://eox.at/">EOX</a>
tags: [map, geotiff, cog]
---

<div class="side-pane-with-status-bar">
    <!-- Source file selector -->
    <div class="card">
        <div class="card-body">
            <div class="input-group">
                <span class="input-group-text flex-grow-1">Source file</span>
                <select class="btn btn-outline-primary btn-sm" id="source-file" autocomplete="off">
                    <option selected value="rgb">RGB (LZW)</option>
                    <option value="rgba">RGBA (LZW)</option>
                    <option value="ycbcr">YCbCr (JPEG)</option>
                    <option value="ycbcr-mask">YCbCr + mask (JPEG)</option>
                </select>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-color.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindDropDown } from './widgets/bindDropDown.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    1818329.448,
    1987320.77,
    6062229.082,
    6231700.791,
);
const center = extent.centerAsVector3();

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

instance.view.camera.position.set(center.x, center.y, 250000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(center.x, center.y + 1, center.z);
instance.view.setControls(controls);

const map = new Map({ extent: extent.withRelativeMargin(0.1) });
instance.add(map);

// Data coming from the same source as
// https://openlayers.org/en/latest/examples/cog-math-multisource.html
const sources = {
    // LZW compression, RGB colorspace
    rgb: new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/TCI.tif',
        crs: extent.crs,
        channels: [0, 1, 2],
    }),
    // LZW compression, RGB colorspace, 8-bit alpha band
    rgba: new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/TCI-alpha.tif',
        crs: extent.crs,
        channels: [0, 1, 2, 3],
    }),
    // JPEG compression, YCbCr colorspace
    ycbcr: new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/TCI-YCbCr.tif',
        crs: extent.crs,
    }),
    // JPEG compression, YCbCr colorspace, 1-bit mask band
    'ycbcr-mask': new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/TCI-YCbCr-mask.tif',
        crs: extent.crs,
    }),
};

function updateSource(name) {
    map.forEachLayer(layer => map.removeLayer(layer, { disposeLayer: true }));

    const layer = new ColorLayer({ name: 'color-layer', source: sources[name], extent });
    map.addLayer(layer);
}

Inspector.attach('inspector', instance);
StatusBar.bind(instance);

bindDropDown('source-file', updateSource);

updateSource('rgb');
```

---

## Source: manuals/examples/geotiff-elevation.md

Source Path: manuals/examples/geotiff-elevation.md

# Elevation GeoTIFF

## Официальный кейс
- Slug: `geotiff-elevation`
- Официальная страница: https://giro3d.org/latest/examples/geotiff-elevation.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/geotiff-elevation.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/geotiff-elevation.js`

## Краткое описание (official)
Display an elevation GeoTIFF with a color map.

## Расширенное описание (official longdesc)
A GeoTIFF that contains elevation data in 32-bit floating point values. You can visualize the dataset in the following ways&#58; as an elevation layer with or without a color map, as a color layer compressed to 8-bit using `Interpretation.CompressTo8Bit`, and as a color layer with a `ColorMap`.

## Теги (official)
- `terrain`
- `map`
- `geotiff`
- `cog`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=geotiff-elevation npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-elevation.html
```html
---
title: Elevation GeoTIFF
shortdesc: Display an elevation GeoTIFF with a color map.
longdesc: A GeoTIFF that contains elevation data in 32-bit floating point values. You can visualize the dataset in the following ways&#58; as an elevation layer with or without a color map, as a color layer compressed to 8-bit using <a href="../apidoc/classes/core.layer.Interpretation.html#CompressTo8Bit" target="_blank"><code>Interpretation.CompressTo8Bit</code></a>, and as a color layer with a <a href="../apidoc/classes/core.ColorMap.html" target="_blank"><code>ColorMap</code></a>.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [terrain, map, geotiff, cog]
---

<div class="side-pane-with-status-bar">
    <!-- Top color layer -->
    <div class="card">
        <div class="card-body">
            <div class="input-group">
                <span class="input-group-text flex-grow-1">Read COG as</span>
                <select class="btn btn-outline-primary btn-sm" id="mode" autocomplete="off">
                    <option selected value="elevation">Elevation layer</option>
                    <option value="elevation-colormap">Elevation layer (with colormap)</option>
                    <option value="8bit">Color layer (compressed to 8-bit)</option>
                    <option value="colormap">Color layer (with colormap)</option>
                </select>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/geotiff-elevation.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Interpretation from '@giro3d/giro3d/core/layer/Interpretation.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindDropDown } from './widgets/bindDropDown.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -13581040.085,
    -13469591.026,
    5780261.83,
    5942165.048,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

instance.view.camera.position.set(-13656319, 5735451, 88934);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(-13545408, 5837154, 0);
instance.view.setControls(controls);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    lighting: true,
});
instance.add(map);

// Use an elevation COG with nodata values
const source = new GeoTIFFSource({
    // https://www.sciencebase.gov/catalog/item/632a9a9ad34e71c6d67b95a3
    url: 'https://3d.oslandia.com/cog_data/COG_EPSG3857_USGS_13_n47w122_20220919.tif',
    crs: extent.crs,
});

const min = 263;
const max = 4347;

// Display it as elevation and color
const viridis = new ColorMap({
    colors: makeColorRamp('viridis'),
    min,
    max,
    mode: ColorMapMode.Elevation,
});
const magma = new ColorMap({
    colors: makeColorRamp('magma'),
    min,
    max,
    mode: ColorMapMode.Elevation,
});

// Attach the inspector
Inspector.attach('inspector', instance);

StatusBar.bind(instance);

function updateMode(value) {
    map.removeLayer(map.getLayers()[0]);

    switch (value) {
        case 'elevation-colormap':
            map.addLayer(
                new ElevationLayer({
                    name: value,
                    extent,
                    source,
                    colorMap: viridis,
                    minmax: { min, max },
                }),
            );
            break;
        case 'elevation':
            map.addLayer(
                new ElevationLayer({
                    name: value,
                    extent,
                    source,
                    minmax: { min, max },
                }),
            );
            break;
        case '8bit':
            map.addLayer(
                new ColorLayer({
                    name: value,
                    extent,
                    source,
                    interpretation: Interpretation.CompressTo8Bit(min, max),
                }),
            );
            break;
        case 'colormap':
            map.addLayer(
                new ColorLayer({
                    name: value,
                    extent,
                    source,
                    colorMap: magma,
                }),
            );
            break;
        default:
            break;
    }

    instance.notifyChange(map);
}

bindDropDown('mode', updateMode);

updateMode('elevation');
```

---

## Source: manuals/examples/getting-started.md

Source Path: manuals/examples/getting-started.md

# 2.5D Map

## Официальный кейс
- Slug: `getting-started`
- Официальная страница: https://giro3d.org/latest/examples/getting-started.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/getting-started.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/getting-started.js`

## Краткое описание (official)
Display a map with elevation.

## Теги (official)
- `map`
- `elevation`
- `tutorial`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=getting-started npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/getting-started.html
```html
---
title: 2.5D Map
shortdesc: Display a map with elevation.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, elevation, tutorial]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/getting-started.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

// # Giro3D - Getting started

// ### Welcome to Giro3D !

// In this tutorial, we will cover the base features of Giro3D : the creation of the
// [instance](../apidoc/classes/core.Instance.html), the creation of a
// [map](../apidoc/classes/entities.Map.html), and setting up the navigation controls.

// ##### Note
// This walkthrough is based on the [2.5D Map example](../examples/getting-started.html).
// Feel free to visit this example to see the final result of this tutorial.

import TileWMS from 'ol/source/TileWMS.js';
import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

// ### Initialization of the Giro3D instance

// Before creating our map, we must setup Giro3D in our page, by creating an instance.

// The instance is the entry point of a Giro3D context. It needs a DOM element to render its scene.

// #### Register the custom CRS

// Our map uses the [EPSG:3946](https://epsg.io/3946) French coordinate reference system (CRS) that
// is not built-in into Giro3D's CRS registry.

// ####
// Let's register a definition for this CRS. The definition is taken from https://epsg.io/3946.proj4.
const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

// Now we are ready to create our instance. Note that the `crs` parameter is necessary to determine
// the interpretation of coordinates from the 3D scene.
// We will use the `view` element from our HTML page to initialize the instance.
const instance = new Instance({
    target: 'view',
    crs,
});

// ### Create the Map

// Let's create a map of the city of [Lyon](https://en.wikipedia.org/wiki/Lyon), with satellite
// imagery and a digital elevation model (DEM).

// #### Specify the map extent

// A map is a rectangular region of the world that will contain geographic data.

// Let's define a geographic extent (or bounding box) of our map.
// We initialize the [`Extent`](../apidoc/classes/core.geographic.Extent.html) class,
// specifying the CRS name (that we just defined above), with the minimum and maximum X (longitude,
// or easting) and Y (latitude, or northing) values.
const xmin = 1837816.94334;
const xmax = 1847692.32501;
const ymin = 5170036.4587;
const ymax = 5178412.82698;

const extent = new Extent(crs, xmin, xmax, ymin, ymax);

// #### Create the Map object

// Now we can create the Map. The only mandatory parameter is the extent
// but you can experiment with the other options if you'd like.
const map = new Map({ extent });

// Let's add the map to the instance.
instance.add(map);

// #### Create the color layer

// If we looked at the page now, the map would be rendered as a colored rectangle.
// This is the aspect of the map without any data in it (only the background color).
// Nothing very exciting.

// Let's add a color layer.

// In Giro3D, layers are the basic components of the Map. They can be either a color layer,
// or an elevation layer. In both cases, the data comes from a source.

// ##### Specify the data source

// Let's create a source that will pull data from a WMS service.
// We are using the
// [`TiledImageSource`](../apidoc/classes/sources.TiledImageSource.html) for that.
// This source will wrap an OpenLayers source, in this case a `TileWMS`.
const satelliteSource = new TiledImageSource({
    source: new TileWMS({
        url: 'https://data.geopf.fr/wms-r',
        projection: 'EPSG:3946',
        params: {
            LAYERS: ['ORTHOIMAGERY.ORTHOPHOTOS'],
            FORMAT: 'image/jpeg',
        },
    }),
});

// ##### Create the layer

// Now we can create the layer. Note that we specify an extent for the layer. This is not
// strictly required, but since our map is much smaller than the WMS source, we want to avoid
// processing data that is outside our layer.
const colorLayer = new ColorLayer({
    name: 'satellite',
    source: satelliteSource,
    extent: map.extent,
});

// And add it to the map.
map.addLayer(colorLayer);

// Note: `addLayer()` is an asynchronous method, because the layer must be prepared before being
// ready for rendering. We could use the returned promise to wait for the end of the preprocessing
// step, but we don't need that in our example.

// #### Creation of the elevation layer

// Creating an elevation layer is a very similar process to the color layer : we initialize the
// source, then create the layer and add it to the map.

// The only difference is that we are going to use an
// [`ElevationLayer`](../apidoc/classes/core.layer.ElevationLayer.html).

// Contrary to the color layer, the elevation layer does not produce any color information on the
// map, but it rather deforms the map to display the terrain (hence the name 2.5D map).

// Let's create a WMS source for this layer.
const demSource = new TiledImageSource({
    source: new TileWMS({
        url: 'https://data.geopf.fr/wms-r',
        projection: 'EPSG:3946',
        crossOrigin: 'anonymous',
        params: {
            LAYERS: ['ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES'],
            FORMAT: 'image/x-bil;bits=32',
        },
    }),
    format: new BilFormat(),
    noDataValue: -1000,
});

// Then create the elevation layer.
// We have set the resolution factor to 1/8th of the resolution
// of each map tile, because we are not going to display the pixels
// of the layer, but rather use the elevation data to deform the
// terrain mesh. Since the terrain mesh has a much lower resolution
// than the terrain textures, we don't want to waste resources.
const elevationLayer = new ElevationLayer({
    name: 'dem',
    resolutionFactor: 1 / 8,
    extent: map.extent,
    source: demSource,
});

// ##### Add the layer

// Now we are ready to add our layer to the map.
map.addLayer(elevationLayer);

// ### Set the camera and navigation controls

// Giro3D uses the THREE.js controls to navigate in the scene. In our example, we are going to use
// the `MapControls`, which are perfectly adapted to our need.

// Let's get the THREE camera of our scene.
const camera = instance.view.camera;

// Let's specify the camera position. We will position it in the southwest corner of the map, at an
// altitude of 2000 meters.
const cameraAltitude = 2000;

const cameraPosition = new Vector3(extent.minX, extent.minY, cameraAltitude);

camera.position.copy(cameraPosition);

// Now we can create the `MapControls` with our camera and the DOM element of our scene.
const controls = new MapControls(camera, instance.domElement);

// Let's set the controls' target to our map center.
controls.target = extent.centerAsVector3();

// And specify some parameters for the navigation.
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;

controls.saveState();

// Now let's register those controls with the instance. The instance will automatically register
// the event handlers relevant to the navigation in the scene.
instance.view.setControls(controls);

// ### Optional: Set up the inspector

// This is an optional step, but very useful for diagnostic and debugging issues with Giro3D.
// The `Inspector` is a panel containing lots of useful information about the Giro3D instance.

// This supposes that we have a `div` ready to host our inspector.

Inspector.attach('inspector', instance);

// ### The StatusBar

// This widget is no part of the Giro3D library, but is used in the examples
// to display various informations about the scene, such as the geographic
// coordinates of the mouse cursor.

// Let's initialize the coordinate bar widget on our instance.
StatusBar.bind(instance);

// ### Moving around

// Use the mouse the navigate in the scene and observe the map updating with fresh data.

// [See the final result](../examples/getting-started.html).
```

---

## Source: manuals/examples/globe.md

Source Path: manuals/examples/globe.md

# Globe

## Официальный кейс
- Slug: `globe`
- Официальная страница: https://giro3d.org/latest/examples/globe.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/globe.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/globe.js`

## Краткое описание (official)
Display a globe-shaped Map.

## Теги (official)
- `ecef`
- `globe`
- `map`
- `layers`

## Атрибуция (official)
© OpenStreetMap contributors, © NASA, © Mapbox, Made with Natural Earth., SolarSystemsScope

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=globe npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/globe.html
```html
---
title: Globe
shortdesc: Display a globe-shaped Map.
attribution: © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_blank" href="https://visibleearth.nasa.gov/collection/1484/blue-marble">NASA</a>, © <a target="_blank" href="http://open-notify.org/">Mapbox</a>, <a href="https://www.naturalearthdata.com/" target="_blank">Made with Natural Earth.</a>, <a href="https://www.solarsystemscope.com" target="_blank">SolarSystemsScope</a>
dependencies: [colormap]
tags: [ecef, globe, map, layers]
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body" id="top-options">
            <!-- Earth/Moon selector -->
            <div class="input-group mb-3">
                <label class="input-group-text" for="globe-selector">Globe</label>
                <select class="form-select" id="globe-selector" autocomplete="off">
                    <option value="earth" selected>Earth</option>
                    <option value="moon">Moon</option>
                    <option value="mars">Mars</option>
                    <option value="sun">Sun</option>
                </select>
            </div>

            <div id="earth-params">
                <ul class="list-group mb-3" id="layer-list">
                    <!-- Content of this list is generated by the example code -->
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="checkbox" />
                        <label class="form-check-label" for="firstCheckbox">Layer 1</label>
                    </li>
                </ul>
            </div>

            <!-- Atmosphere -->
            <div class="form-check form-switch mb-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="atmosphere"
                    autocomplete="off"
                />
                <label class="form-check-label" for="atmosphere">Atmosphere</label>
            </div>

            <!-- Toggle graticule -->
            <div class="form-check form-switch mb-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="graticule"
                    autocomplete="off"
                />
                <label class="form-check-label w-100" for="graticule">
                    <label class="form-check-label w-100" for="graticule">
                        <div class="row">
                            <div class="col">Graticule</div>
                            <div class="col-auto">
                                <input
                                    type="color"
                                    style="height: 1.5rem"
                                    class="form-control form-control-color float-end"
                                    id="graticule-color"
                                    value="#000000"
                                    title="Graticule color"
                                />
                            </div>
                        </div> </label
                ></label>
            </div>

            <div id="lightingGroup">
                <!-- Toggle lighting -->
                <div class="form-check form-switch mb-1">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="lighting"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="lighting">Lighting</label>
                </div>

                <div id="lightingParams">
                    <!-- Sun intensity -->
                    <div class="row">
                        <div class="col">
                            <label id="sunIntensityLabel" for="sunIntensity" class="form-label"
                                >Sun intensity</label
                            >
                        </div>
                        <div class="col">
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value="4"
                                class="form-range"
                                id="sunIntensity"
                                autocomplete="off"
                            />
                        </div>
                    </div>

                    <!-- Ambient intensity -->
                    <div class="row">
                        <div class="col">
                            <label
                                id="ambientIntensityLabel"
                                for="ambientIntensity"
                                class="form-label"
                                >Ambient light intensity</label
                            >
                        </div>
                        <div class="col">
                            <input
                                type="range"
                                min="0"
                                max="3"
                                step="0.1"
                                value="0.3"
                                class="form-range"
                                id="ambientIntensity"
                                autocomplete="off"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="sunParams">
                <hr />
                <!-- Sun position mode -->
                <div class="input-group">
                    <label class="input-group-text" for="sun-position-mode">Sun position</label>
                    <select class="form-select" id="sun-position-mode" autocomplete="off">
                        <option value="custom-location" selected>By location</option>
                        <option value="custom-date">By date</option>
                    </select>
                </div>

                <!-- Date -->
                <div id="date-picker">
                    <div class="input-group mt-3">
                        <label class="input-group-text" for="date">Date</label>
                        <input class="form-control" type="date" id="date" autocomplete="off" />
                        <div class="input-group-text">
                            <button class="btn btn-sm btn-primary" id="now">Now</button>
                        </div>
                    </div>
                </div>

                <div id="sun-location" class="mt-3">
                    <!-- Sun latitude slider -->
                    <div class="row 1">
                        <div class="col">
                            <label id="sunLatitudeLabel" for="sunLatitude" class="form-label"
                                >Lat: 35° N</label
                            >
                        </div>
                        <div class="col">
                            <input
                                type="range"
                                min="-90"
                                max="90"
                                step="1"
                                value="35"
                                class="form-range"
                                id="sunLatitude"
                                autocomplete="off"
                            />
                        </div>
                    </div>

                    <!-- Sun longitude -->
                    <div class="row">
                        <div class="col">
                            <label id="sunLongitudeLabel" for="sunLongitude" class="form-label"
                                >Lat: 35° N</label
                            >
                        </div>
                        <div class="col">
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                step="1"
                                value="9"
                                class="form-range"
                                id="sunLongitude"
                                autocomplete="off"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div
    class="bg-body border"
    id="timeContainer"
    style="
        display: none;
        position: absolute;
        left: 0;
        bottom: 1.3rem;
        width: 100%;
        height: 7rem;
        padding: 1rem;
    "
>
    <!-- Background opacity slider -->
    <label for="time" class="form-label"
        ><span id="timeLabel" class="badge rounded-pill text-bg-primary">12:00 UTC</span>
    </label>
    <div class="input-group">
        <input
            type="range"
            min="0"
            max="86400"
            step="60"
            value="43200"
            class="form-range"
            id="time"
            autocomplete="off"
        />
    </div>

    <div class="row">
        <div class="col text-start">
            <span id="timeLabel" class="badge rounded-pill text-bg-secondary">00:00</span>
        </div>
        <div class="col text-center">
            <span id="timeLabel" class="badge rounded-pill text-bg-secondary">12:00</span>
        </div>
        <div class="col text-end">
            <span id="timeLabel" class="badge rounded-pill text-bg-secondary">24:00</span>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/globe.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { TopoJSON } from 'ol/format.js';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ.js';
import { Fill, Style } from 'ol/style.js';
import { AmbientLight, DirectionalLight, MathUtils, Vector3 } from 'three';

import GlobeControls from '@giro3d/giro3d/controls/GlobeControls.js';
import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Ellipsoid from '@giro3d/giro3d/core/geographic/Ellipsoid.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Sun from '@giro3d/giro3d/core/geographic/Sun.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import BlendingMode from '@giro3d/giro3d/core/layer/BlendingMode.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Atmosphere from '@giro3d/giro3d/entities/Atmosphere.js';
import Globe from '@giro3d/giro3d/entities/Globe.js';
import Glow from '@giro3d/giro3d/entities/Glow.js';
import SphericalPanorama from '@giro3d/giro3d/entities/SphericalPanorama.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import GlobeControlsInspector from '@giro3d/giro3d/gui/GlobeControlsInspector.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';
import StaticImageSource from '@giro3d/giro3d/sources/StaticImageSource.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindDatePicker } from './widgets/bindDatePicker.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';
import { updateLabel } from './widgets/updateLabel.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4978,
    backgroundColor: 'black',
});

/////////////////////////////// Globe creations ///////////////////////////////////////////////////

const earth = new Globe({
    name: 'Earth',
    lighting: {
        enabled: true,
    },
    graticule: {
        enabled: true,
        color: 'black',
        xStep: 10, // In degrees
        yStep: 10, // In degrees
        xOffset: 0,
        yOffset: 0,
        opacity: 0.5,
        thickness: 0.5, // In degrees
    },
    backgroundColor: '#001B35',
});

instance.add(earth);

const moon = new Globe({
    name: 'Moon',
    lighting: {
        enabled: true,
    },
    graticule: {
        enabled: true,
        color: 'black',
        xStep: 10, // In degrees
        yStep: 10, // In degrees
        xOffset: 0,
        yOffset: 0,
        opacity: 0.5,
        thickness: 0.5, // In degrees
    },
    backgroundColor: 'grey',
    // For the moon we use a custom ellipsoid
    ellipsoid: new Ellipsoid({
        semiMajorAxis: 1_738_100,
        semiMinorAxis: 1_736_000,
    }),
});

instance.add(moon);

const moonLayer = new ColorLayer({
    source: new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/moon.tif',
        crs: CoordinateSystem.epsg4326,
    }),
});

moon.addLayer(moonLayer);

const mars = new Globe({
    name: 'Mars',
    lighting: {
        enabled: true,
    },
    graticule: {
        enabled: true,
        color: 'black',
        xStep: 10, // In degrees
        yStep: 10, // In degrees
        xOffset: 0,
        yOffset: 0,
        opacity: 0.5,
        thickness: 0.5, // In degrees
    },
    backgroundColor: '#C64600',
    // For Mars we use a custom ellipsoid
    // See https://tharsis.gsfc.nasa.gov/geodesy.html
    ellipsoid: new Ellipsoid({
        semiMajorAxis: 3_396_200,
        semiMinorAxis: 3_376_189,
    }),
});

instance.add(mars);

const marsLayer = new ColorLayer({
    source: new GeoTIFFSource({
        // From https://www.solarsystemscope.com/textures/
        url: 'https://3d.oslandia.com/giro3d/rasters/8k_mars.tif',
        crs: CoordinateSystem.epsg4326,
    }),
});

mars.addLayer(marsLayer);

// The sun is so huge that it would be impractical
// to display it in its actual scale.
const SUN_SIZE_FACTOR = 0.1;

const sun = new Globe({
    name: 'Sun',
    lighting: {
        enabled: false,
    },
    graticule: {
        enabled: true,
        color: 'black',
        xStep: 10, // In degrees
        yStep: 10, // In degrees
        xOffset: 0,
        yOffset: 0,
        opacity: 0.5,
        thickness: 0.5, // In degrees
    },
    backgroundColor: 'grey',
    // For the sun we use a spherical ellipsoid
    ellipsoid: new Ellipsoid({
        semiMajorAxis: 696_340_000 * SUN_SIZE_FACTOR,
        semiMinorAxis: 696_340_000 * SUN_SIZE_FACTOR,
    }),
});

instance.add(sun);

const sunLayer = new ColorLayer({
    source: new GeoTIFFSource({
        // From https://www.solarsystemscope.com/textures/
        url: 'https://3d.oslandia.com/giro3d/rasters/8k_sun.tif',
        crs: CoordinateSystem.epsg4326,
    }),
});

sun.addLayer(sunLayer);

const allGlobes = [earth, moon, mars, sun];

/////////////////////////////// Star background /////////////////////////////////////////////////

const background = new SphericalPanorama({
    name: 'background',
    radius: 10_000_000,
    subdivisionThreshold: 0.4,
    maxSubdivisionLevel: 3,
    depthTest: false,
});
background.renderOrder = -9999;
instance.add(background);

const starLayer = new ColorLayer({
    source: new StaticImageSource({
        source: 'https://3d.oslandia.com/giro3d/images/4k_stars_milky_way.jpg',
        extent: Extent.fullEquirectangularProjection,
    }),
});

background.addLayer(starLayer);

/////////////////////////////// Earth layers ////////////////////////////////////////////////////

const mapboxApiKey =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

// Adds a XYZ elevation layer with MapBox terrain RGB tileset
const elevationLayer = new ElevationLayer({
    name: 'elevation',
    preloadImages: true,
    colorMap: new ColorMap({ colors: makeColorRamp('greens'), min: -1500, max: 6000 }),
    minmax: { min: -500, max: 8000 },
    // We dont want the full resolution because the terrain
    // mesh has a much lower resolution than the raster image
    resolutionFactor: 1 / 8,
    source: new TiledImageSource({
        retries: 0,
        format: new MapboxTerrainFormat(),
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${mapboxApiKey}`,
            projection: 'EPSG:3857',
        }),
    }),
});
earth.addLayer(elevationLayer).catch(console.error);

const watermask = new ColorLayer({
    name: 'watermask',
    source: new VectorSource({
        dataProjection: CoordinateSystem.epsg4326,
        data: {
            url: 'https://3d.oslandia.com/giro3d/vectors/water_mask.topojson',
            format: new TopoJSON(),
        },
        style: new Style({
            fill: new Fill({
                color: '#22274a',
            }),
        }),
    }),
});

earth.addLayer(watermask);

// Adds a XYZ color layer with MapBox satellite tileset
const satellite = new ColorLayer({
    name: 'satellite',
    preloadImages: true,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${mapboxApiKey}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});
earth.addLayer(satellite).catch(e => console.error(e));

// Create the OpenStreetMap color layer using an OpenLayers source.
// See https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
// for more informations.
const osm = new ColorLayer({
    name: 'OSM',
    source: new TiledImageSource({ source: new OSM() }),
});
earth.addLayer(osm).catch(e => console.error(e));

const clouds = new ColorLayer({
    name: 'clouds',
    blendingMode: BlendingMode.Add,
    source: new StaticImageSource({
        source: 'https://3d.oslandia.com/giro3d/images/cloud_cover.webp',
        extent: Extent.WGS84,
    }),
});
earth.addLayer(clouds).catch(console.error);

/////////////////////////////// Lighting //////////////////////////////////////////////////////

// Let's add a sun in our scene
const sunlight = new DirectionalLight('white', 4);
sunlight.name = 'sun';

instance.add(sunlight);
instance.add(sunlight.target);

sunlight.updateMatrixWorld(true);

const ambientLight = new AmbientLight('white', 0.3);
instance.add(ambientLight);

/////////////////////////////// Atmospheres //////////////////////////////////////////////////

const earthAtmosphere = new Atmosphere({ name: 'Earth atmosphere', ellipsoid: earth.ellipsoid });
instance.add(earthAtmosphere);

const marsAtmosphere = new Atmosphere({
    name: 'Mars atmosphere',
    ellipsoid: mars.ellipsoid,
    wavelengths: [0.414, 0.443, 0.475], // To give the atmosphere the rusty color of Mars
});
instance.add(marsAtmosphere);

// For the sun we don't use an atmosphere, but a glow
const sunGlow = new Glow({
    name: 'sun glow',
    color: '#ff7800',
    ellipsoid: sun.ellipsoid,
});

instance.add(sunGlow);

/////////////////////////////// Camera & controls ///////////////////////////////////////////

const defaultCameraPosition = new Vector3(35_785_000 + Ellipsoid.WGS84.semiMajorAxis, 0, 0);

// Geostationary orbit at 36,000 km
instance.view.camera.position.copy(defaultCameraPosition);
instance.view.camera.lookAt(new Vector3(0, 0, 0));

/** @type {GlobeControls} */
let controls;

const updateControls = () => {
    if (controls) {
        controls.update();
        instance.notifyChange(allGlobes);
    }

    requestAnimationFrame(updateControls);
};

updateControls();

/////////////////////////////// Example GUI bindings ///////////////////////////////////////////

const [setGraticule] = bindToggle('graticule', enabled => {
    allGlobes.forEach(g => (g.graticule.enabled = enabled));
    instance.notifyChange(allGlobes);
});

setGraticule(earth.graticule.enabled);

const [setAtmosphere] = bindToggle('atmosphere', enabled => {
    earthAtmosphere.visible = enabled && earth.visible;
    marsAtmosphere.visible = enabled && mars.visible;
    sunGlow.visible = enabled && sun.visible;

    instance.notifyChange([earthAtmosphere, marsAtmosphere, sunGlow]);
});

const getActiveGlobe = () => {
    return allGlobes.find(g => g.visible);
};

function update() {
    const globe = getActiveGlobe();

    if (globe == null) {
        return;
    }

    const { x, y, z } = instance.view.camera.position;
    let altitude = globe.ellipsoid.toGeodetic(x, y, z).altitude;
    altitude = MathUtils.clamp(altitude, 2, +Infinity);

    // Let's adjust the graticule step and thickness so that
    // it more or less always look the same when altitude changes.
    if (earth.graticule.enabled) {
        let step = 0;
        if (altitude > 10_000_000) {
            step = 10;
        } else if (altitude > 3_000_000) {
            step = 5;
        } else if (altitude > 1_000_000) {
            step = 2;
        } else if (altitude > 500_000) {
            step = 1;
        } else {
            step = 0.5;
        }

        const thickness = MathUtils.mapLinear(altitude, 200, 39_000_000, 0.002, 0.9);

        earth.graticule.xStep = step;
        earth.graticule.yStep = step;
        earth.graticule.thickness = thickness;
    }

    // Let's make the clouds transparent when we zoom in.
    const opacity = MathUtils.mapLinear(altitude, 12_000_000, 30_000_000, 0, 1);
    clouds.opacity = MathUtils.clamp(opacity, 0, 1);
    earthAtmosphere.opacity = clouds.opacity;

    // Let's increase the shading on the terrain when we zoom out
    const zFactor = MathUtils.mapLinear(altitude, 12_000_000, 30_000_000, 1, 10);
    earth.lighting.zFactor = MathUtils.clamp(zFactor, 1, 10);

    background.object3d.position.set(x, y, z);
    background.object3d.updateMatrixWorld(true);
    instance.notifyChange(background);
}

update();

const updateColorMap = () => {
    const minmax = earth.getElevationMinMaxForVisibleTiles();

    if (minmax != null && isFinite(minmax.min) && isFinite(minmax.max)) {
        const colorMap = elevationLayer.colorMap;
        colorMap.min = MathUtils.lerp(minmax.min, colorMap.min, 0.8);
        colorMap.max = MathUtils.lerp(minmax.max, colorMap.max, 0.8);

        instance.notifyChange(elevationLayer);
    }
};

setInterval(updateColorMap, 50);

instance.addEventListener('after-camera-update', update);

const sunParams = {
    latitude: 9,
    longitude: -41,
};

const updateSunDirection = (latitude, longitude) => {
    const position = Ellipsoid.WGS84.toCartesian(
        sunParams.latitude,
        sunParams.longitude,
        50_000_000,
    );

    sunlight.position.copy(position);
    sunlight.target.position.set(0, 0, 0);
    sunlight.target.updateMatrixWorld(true);
    sunlight.updateMatrixWorld(true);

    const normal = Ellipsoid.WGS84.getNormal(sunParams.latitude, sunParams.longitude);
    earthAtmosphere.setSunPosition(position);
    marsAtmosphere.setSunPosition(position);
};

const [setSunLatitude] = bindSlider('sunLatitude', lat => {
    sunParams.latitude = lat;
    updateSunDirection(sunParams.latitude, sunParams.longitude);
    updateLabel('sunLatitudeLabel', `Lat: ${Math.round(Math.abs(lat))}° ${lat >= 0 ? 'N' : 'S'}`);
});

const [setSunLongitude] = bindSlider('sunLongitude', lon => {
    sunParams.longitude = lon;
    updateSunDirection(sunParams.latitude, sunParams.longitude);
    updateLabel('sunLongitudeLabel', `Lon: ${Math.round(Math.abs(lon))} ${lon >= 0 ? 'E' : 'W'}°`);
});

const [setLighting] = bindToggle('lighting', enabled => {
    earth.lighting.enabled = enabled;
    document.getElementById('lightingParams').style.display = enabled ? 'block' : 'none';
    instance.notifyChange(earth);
});

function setSunPosition(date) {
    const sunPosition = Sun.getGeographicPosition(date);

    setSunLongitude(sunPosition.longitude);
    setSunLatitude(sunPosition.latitude);
}

let date = new Date();

const [setDate] = bindDatePicker('date', newDate => {
    setSunPosition(newDate);
});

const [setTime] = bindSlider('time', seconds => {
    const h = seconds / 3600;
    const wholeH = Math.floor(h);

    const m = (h - wholeH) * 60;
    const wholeM = Math.floor(m);

    date.setUTCHours(wholeH, wholeM);

    setSunPosition(date);

    document.getElementById('timeLabel').innerText =
        `${wholeH.toString().padStart(2, '0')}:${wholeM.toString().padStart(2, '0')} UTC`;
});

const setCurrentDate = newDate => {
    setSunPosition(newDate);
    setDate(newDate);
    setTime(newDate.getUTCHours() * 3600 + newDate.getUTCMinutes() * 60 + newDate.getUTCSeconds());
};

bindButton('now', () => {
    date = new Date();
    setCurrentDate(date);
});

const [setSunPositionMode] = bindDropDown('sun-position-mode', newMode => {
    const datePicker = document.getElementById('date-picker');
    const locationPicker = document.getElementById('sun-location');
    const timeSlider = document.getElementById('timeContainer');

    datePicker.style.display = 'none';
    locationPicker.style.display = 'none';
    timeSlider.style.display = 'none';

    switch (newMode) {
        case 'custom-date':
            datePicker.style.display = 'block';
            timeSlider.style.display = 'block';
            break;
        case 'custom-location':
            locationPicker.style.display = 'block';
            break;
    }
});

const [setGraticuleColor] = bindColorPicker('graticule-color', color => {
    allGlobes.forEach(g => (g.graticule.color = color));
    instance.notifyChange(allGlobes);
});

function setLayers(...name) {
    for (const layer of earth.getLayers()) {
        layer.visible = name.includes(layer.name);
    }
}

const [setAmbientIntensity] = bindSlider('ambientIntensity', intensity => {
    ambientLight.intensity = intensity;
    instance.notifyChange();
});

const [setSunIntensity] = bindSlider('sunIntensity', intensity => {
    sunlight.intensity = intensity;
    instance.notifyChange();
});

const [setGlobe] = bindDropDown('globe-selector', globe => {
    allGlobes.forEach(g => (g.visible = false));

    let entity;

    switch (globe) {
        case 'moon':
            moon.visible = true;
            entity = moon;
            break;
        case 'sun':
            sun.visible = true;
            entity = sun;
            break;
        case 'earth':
            earth.visible = true;
            entity = earth;
            break;
        case 'mars':
            mars.visible = true;
            entity = mars;
            break;
    }

    controls?.dispose();

    instance.view.goTo(entity);

    document.getElementById('earth-params').style.display = earth.visible ? 'block' : 'none';
    document.getElementById('lightingGroup').style.display = sun.visible ? 'none' : 'block';
    document.getElementById('sunParams').style.display = sun.visible ? 'none' : 'block';

    earthAtmosphere.visible = earth.visible;
    marsAtmosphere.visible = mars.visible;
    sunGlow.visible = sun.visible;

    instance.notifyChange(entity);

    controls = new GlobeControls({
        scene: entity.object3d,
        ellipsoid: entity.ellipsoid,
        camera: instance.view.camera,
        domElement: instance.domElement,
    });
});

const reset = () => {
    setGlobe('earth'); // TODO
    setLayers('satellite', 'clouds');
    setAtmosphere(true);
    setGraticule(false);
    setGraticuleColor(0x000000);
    setSunLatitude(9);
    setSunLongitude(-41);
    setAmbientIntensity(0.4);
    setSunIntensity(4);
    setLighting(true);
    setSunPositionMode('custom-location');

    instance.view.camera.position.copy(defaultCameraPosition);
    instance.view.camera.lookAt(new Vector3(0, 0, 0));

    populateLayerList();
};

bindButton('reset', reset);

function populateLayerList() {
    const list = document.getElementById('layer-list');
    list.innerHTML = '';

    const entries = [`<li class="list-group-item list-group-item-secondary">Layers</li>`];

    const createEntry = (name, visible) => {
        const entry = `
            <li class="list-group-item">
                <input id="layer-${name}" class="form-check-input me-1" ${visible ? 'checked' : ''} type="checkbox" />
                <label class="form-check-label" for="layer-${name}">${name}</label>
            </li>
        `;

        entries.push(entry);
    };

    for (const layer of earth.getColorLayers().reverse()) {
        createEntry(layer.name, layer.visible);
    }

    for (const layer of earth.getElevationLayers()) {
        createEntry(layer.name, layer.visible);
    }

    list.innerHTML = entries.join('\n');

    for (const layer of earth.getLayers()) {
        bindToggle(`layer-${layer.name}`, visible => {
            layer.visible = visible;
            instance.notifyChange(earth);
        });
    }
}

reset();

const inspector = Inspector.attach('inspector', instance);

inspector.addPanel(new GlobeControlsInspector(inspector.gui, instance, controls));

StatusBar.bind(instance);
```

---

## Source: manuals/examples/google-photorealistic-3d-tiles.md

Source Path: manuals/examples/google-photorealistic-3d-tiles.md

# Google Photorealistic 3D Tiles

## Официальный кейс
- Slug: `google-photorealistic-3d-tiles`
- Официальная страница: https://giro3d.org/latest/examples/google-photorealistic-3d-tiles.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/google-photorealistic-3d-tiles.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/google-photorealistic-3d-tiles.js`

## Краткое описание (official)
Display Google Maps 3D Tiles using Giro3D and <a href="https://github.com/NASA-AMMOS/3DTilesRendererJS" target="_blank"><code>3d-tiles-renderer</code></a>.

## Расширенное описание (official longdesc)
This example requires a Google Maps API key. You can register this key directly in the URL by appending `?key=THE_KEY` in the URL, or enter the key in the text box.

## Теги (official)
- `google`
- `3d tiles`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=google-photorealistic-3d-tiles npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/google-photorealistic-3d-tiles.html
```html
---
title: Google Photorealistic 3D Tiles
shortdesc: Display Google Maps 3D Tiles using Giro3D and <a href="https://github.com/NASA-AMMOS/3DTilesRendererJS" target="_blank"><code>3d-tiles-renderer</code></a>.
longdesc: This example requires a Google Maps API key. You can register this key directly in the URL by appending <code>?key=THE_KEY</code> in the URL, or enter the key in the text box.
tags: ['google', '3d tiles']
---

<div
    class="position-absolute top-50 start-50 translate-middle text-center"
    style="display: none"
    id="warning"
>
    No Google Maps API key registered.<br />You can register this key directly in the URL by
    appending <code>?key=THE_KEY</code> in the URL,<br />or enter the key in the text box and press
    'Reload'.
</div>

<div class="side-pane-with-status-bar">
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            id="googleApiKey"
            placeholder="Google Tiles API key"
        />
        <button class="btn btn-primary" id="start">Reload</button>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/google-photorealistic-3d-tiles.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { GlobeControls } from '3d-tiles-renderer';
import {
    GoogleCloudAuthPlugin,
    TileCompressionPlugin,
    TilesFadePlugin,
    UnloadTilesPlugin,
    UpdateOnChangePlugin,
} from '3d-tiles-renderer/plugins';
import { Vector3 } from 'three';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import StatusBar from './widgets/StatusBar.js';

function run(apiKey) {
    const instance = new Instance({
        target: 'view',
        crs: CoordinateSystem.epsg4978,
        backgroundColor: 'black',
    });

    // Note that we need the DRACO and Basis libraries.
    // You can omit those parameters to use the default URLs which use a CDN.
    const entity = new Tiles3D({
        // We disable the fetch plugin because we are going to use a Google specific plugin
        // to handle authentication
        enableFetchPlugin: false,
        dracoDecoderPath: '/assets/wasm/',
        ktx2DecoderPath: '/assets/wasm/',
    });

    const tiles = entity.tiles;

    const view = instance.view;

    view.minNearPlane = 200;

    const camera = view.camera;
    camera.up = new Vector3(0, 0, 1);
    camera.position.set(30_000_000, 0, 0);
    camera.lookAt(0, 0, 0);

    camera.updateMatrixWorld();

    tiles.registerPlugin(new GoogleCloudAuthPlugin({ apiToken: apiKey, autoRefreshToken: true }));
    tiles.registerPlugin(new TileCompressionPlugin());
    tiles.registerPlugin(new UpdateOnChangePlugin());
    tiles.registerPlugin(new UnloadTilesPlugin());
    tiles.registerPlugin(new TilesFadePlugin());

    const controls = new GlobeControls(instance.scene, camera, instance.domElement, tiles);
    controls.enableDamping = true;

    /** @type {Array<{ type: string, value: any }>} */
    const attributions = [];

    function updateAttributions() {
        attributions.length = 0;

        entity.tiles.getAttributions(attributions);

        const text = attributions.map(a => a.value).join(',');

        StatusBar.setAttributionHtml(`© ${text}`);
    }

    function animate() {
        const altitude = controls.getDistanceToCenter() - 6_400_000;

        if (altitude > 100_000) {
            view.minNearPlane = 2000;
        } else if (altitude > 1_000) {
            view.minNearPlane = 200;
        } else {
            view.minNearPlane = 2;
        }

        controls.update();

        instance.notifyChange(entity);

        updateAttributions();

        requestAnimationFrame(animate);
    }

    animate();

    controls.update();

    instance.add(entity);

    Inspector.attach('inspector', instance);

    StatusBar.bind(instance);
}

let key = new URL(document.URL).searchParams.get('key');

if (key != null) {
    run(key);
} else {
    document.getElementById('warning').style.display = 'block';
}

document.getElementById('start').onclick = () => {
    // @ts-expect-error value does not exist on HtmlElement
    const enteredKey = document.getElementById('googleApiKey').value;

    if (enteredKey != null) {
        const url = new URL(document.URL);
        url.searchParams.delete('key');

        url.searchParams.append('key', enteredKey);

        window.history.replaceState({}, null, url.toString());

        run(enteredKey);

        document.getElementById('warning').style.display = 'none';
    }
};
```

---

## Source: manuals/examples/graticule.md

Source Path: manuals/examples/graticule.md

# Graticule

## Официальный кейс
- Slug: `graticule`
- Официальная страница: https://giro3d.org/latest/examples/graticule.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/graticule.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/graticule.js`

## Краткое описание (official)
Display a graticule on a Map.

## Расширенное описание (official longdesc)
The `Map` can display a fully configurable graticule.

## Теги (official)
- `map`
- `graticule`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=graticule npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/graticule.html
```html
---
title: Graticule
shortdesc: Display a graticule on a Map.
longdesc: The <a href="../apidoc/classes/entities.Map.html" target="_blank"><code>Map</code></a> can display a fully configurable graticule.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [map, graticule]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-body">
            <!-- Show/Hide graticule -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="toggle-graticule"
                    autocomplete="off"
                />
                <label class="form-check-label" for="toggle-graticule">Show graticule</label>
            </div>

            <div class="my-2"></div>

            <!-- X step -->
            <label for="x-step" class="form-label">X-axis step</label>
            <div class="input-group">
                <input
                    type="range"
                    min="100"
                    max="3000"
                    value="1000"
                    step="100"
                    class="form-range"
                    id="x-step"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Y step -->
            <label for="y-step" class="form-label">Y-axis step</label>
            <div class="input-group">
                <input
                    type="range"
                    min="100"
                    max="3000"
                    value="1000"
                    step="100"
                    class="form-range"
                    id="y-step"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- X offset -->
            <label for="x-offset" class="form-label">X-axis offset</label>
            <div class="input-group">
                <input
                    type="range"
                    min="100"
                    max="3000"
                    value="200"
                    step="100"
                    class="form-range"
                    id="x-offset"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Y offset -->
            <label for="y-offset" class="form-label">Y-axis offset</label>
            <div class="input-group">
                <input
                    type="range"
                    min="100"
                    max="3000"
                    value="200"
                    step="100"
                    class="form-range"
                    id="y-offset"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Opacity -->
            <label for="opacity" class="form-label">Opacity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.01"
                    class="form-range"
                    id="opacity"
                    autocomplete="off"
                />
            </div>

            <!-- Thickness -->
            <label for="thickness" class="form-label">Thickness</label>
            <div class="input-group">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value="20"
                    step="1"
                    class="form-range"
                    id="thickness"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Color dropdown -->
            <div class="input-group">
                <span class="input-group-text flex-grow-1">Color</span>
                <select class="btn btn-outline-primary btn-sm" id="color" autocomplete="off">
                    <option selected value="white">White</option>
                    <option value="black">Black</option>
                    <option value="yellow">Yellow</option>
                    <option value="red">Red</option>
                </select>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/graticule.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import XYZ from 'ol/source/XYZ.js';
import { Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Interpretation from '@giro3d/giro3d/core/layer/Interpretation.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import GeoTIFFFormat from '@giro3d/giro3d/formats/GeoTIFFFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const x = -13602000;
const y = 5812000;
const halfWidth = 25000;

const extent = new Extent(
    CoordinateSystem.epsg3857,
    x - halfWidth,
    x + halfWidth,
    y - halfWidth,
    y + halfWidth,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

const map = new Map({
    extent,
    lighting: true,
    discardNoData: true,
    side: DoubleSide,
    backgroundColor: 'white',
    graticule: {
        enabled: true,
        color: new Color('white'),
        xStep: 500,
        yStep: 500,
        xOffset: 0,
        yOffset: 0,
        opacity: 1,
        thickness: 20,
    },
});

instance.add(map);

const source = new TiledImageSource({
    retries: 0, // Don't retry to download missing tiles as this dataset as a lot of missing tiles
    source: new XYZ({
        minZoom: 10,
        maxZoom: 16,
        url: 'https://3d.oslandia.com/dem/MtStHelens-tiles/{z}/{x}/{y}.tif',
    }),
    format: new GeoTIFFFormat(),
});

const floor = 1100;
const ceiling = 2500;

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));

const dem = new ElevationLayer({
    name: 'dem',
    extent,
    interpretation: Interpretation.Raw,
    source,
    colorMap: new ColorMap({ colors, min: floor, max: ceiling, mode: ColorMapMode.Elevation }),
});

map.addLayer(dem);

instance.view.camera.position.set(-13600394, 5818579, 11832);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.target.set(-13603000, 5811000, 0);

instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

/// Example GUI

bindToggle('toggle-graticule', v => {
    map.graticule.enabled = v;
    instance.notifyChange(map);
});

bindSlider('x-step', v => {
    map.graticule.xStep = v;
    instance.notifyChange(map);
});
bindSlider('y-step', v => {
    map.graticule.yStep = v;
    instance.notifyChange(map);
});
bindSlider('x-offset', v => {
    map.graticule.xOffset = v;
    instance.notifyChange(map);
});
bindSlider('y-offset', v => {
    map.graticule.yOffset = v;
    instance.notifyChange(map);
});
bindSlider('opacity', v => {
    map.graticule.opacity = v;
    instance.notifyChange(map);
});
bindSlider('thickness', v => {
    map.graticule.thickness = v;
    instance.notifyChange(map);
});
bindDropDown('color', v => {
    map.graticule.color = new Color(v);
    instance.notifyChange(map);
});
```

---

## Source: manuals/examples/hillshade.md

Source Path: manuals/examples/hillshade.md

# Hillshading & terrain

## Официальный кейс
- Slug: `hillshade`
- Официальная страница: https://giro3d.org/latest/examples/hillshade.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/hillshade.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/hillshade.js`

## Краткое описание (official)
Illustrate the use of hillshading on maps with terrain.

## Расширенное описание (official longdesc)
Hillshading is a realistic shading technique that uses elevation data to simulate the sunlight behaviour. You can change the sun rays' orientation (azimuth) and slope (zenith). Terrain deformation can be toggled on and off. If toggled off, the map is displayed as a flat surface, while still retaining shading capabilities. Terrain stitching is a rendering technique that reduces cracks and visible seams at the boundary between neighbouring terrain tiles. Disabling stitching can improve performance at the cost of increased visual artifacts.

## Теги (official)
- `map`
- `terrain`
- `hillshading`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=hillshade npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/hillshade.html
```html
---
title: Hillshading & terrain
shortdesc: Illustrate the use of hillshading on maps with terrain.
longdesc: Hillshading is a realistic shading technique that uses elevation data to simulate the sunlight behaviour. You can change the sun rays' orientation (azimuth) and slope (zenith). Terrain deformation can be toggled on and off. If toggled off, the map is displayed as a flat surface, while still retaining shading capabilities. Terrain stitching is a rendering technique that reduces cracks and visible seams at the boundary between neighbouring terrain tiles. Disabling stitching can improve performance at the cost of increased visual artifacts.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, terrain, hillshading]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Terrain rendering</div>

        <div class="card-body">
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="terrainDeformation"
                    autocomplete="off"
                />
                <label class="form-check-label" for="terrainDeformation">Terrain deformation</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="stitching"
                    autocomplete="off"
                />
                <label class="form-check-label" for="stitching">Terrain stitching</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="enabled"
                    autocomplete="off"
                />
                <label class="form-check-label" for="enabled">Hillshading</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="colorLayers"
                    autocomplete="off"
                />
                <label class="form-check-label" for="colorLayers">Shade color layers</label>
            </div>

            <label for="azimuth" class="form-label">Azimuth (0 - 360)</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="360"
                    value="315"
                    class="form-range"
                    id="azimuth"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <label for="zenith" class="form-label">Zenith (0 - 90)</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="90"
                    value="45"
                    class="form-range"
                    id="zenith"
                    autocomplete="off"
                />
            </div>

            <label for="intensity" class="form-label">Intensity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.1"
                    class="form-range"
                    id="intensity"
                    autocomplete="off"
                />
            </div>

            <label for="zFactor" class="form-label">Z-factor</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="10"
                    value="1"
                    step="0.1"
                    class="form-range"
                    id="zFactor"
                    autocomplete="off"
                />
            </div>

            <label for="opacity" class="form-label">Color layer opacity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value="100"
                    class="form-range"
                    id="opacity"
                    autocomplete="off"
                />
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/hillshade.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import { MapLightingMode } from '@giro3d/giro3d/entities/MapLightingOptions.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const epsg3946 = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const extent = new Extent(epsg3946, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

const map = new Map({
    extent,
    // Enables hillshading on this map
    lighting: {
        enabled: true,
        mode: MapLightingMode.Hillshade,
    },
    backgroundColor: 'white',
});
instance.add(map);

const url = 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

const noDataValue = -1000;

/** @type {ColorLayer} */
let colorLayer;

// Let's build the elevation layer from the WMTS capabilities
WmtsSource.fromCapabilities(url, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                name: 'elevation',
                extent: map.extent,
                minmax: { min: 100, max: 300 },
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

// Let's build the color layer from the WMTS capabilities
WmtsSource.fromCapabilities(url, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        colorLayer = new ColorLayer({
            name: 'color',
            extent: map.extent.split(2, 1)[0],
            source: orthophotoWmts,
        });
        map.addLayer(colorLayer);
    })
    .catch(console.error);

const mapCenter = extent.centerAsVector3();

instance.view.camera.position.set(mapCenter.x, mapCenter.y - 1, 10000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = mapCenter;
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

// Example GUI

const [, , colorLayersToggle] = bindToggle('colorLayers', state => {
    map.lighting.elevationLayersOnly = !state;
    instance.notifyChange(map);
});

const [, , azimuthSlider] = bindSlider('azimuth', azimuth => {
    map.lighting.hillshadeAzimuth = azimuth;
    instance.notifyChange(map);
});

const [, , zenithSlider] = bindSlider('zenith', zenith => {
    map.lighting.hillshadeZenith = zenith;
    instance.notifyChange(map);
});

bindToggle('enabled', state => {
    map.lighting.enabled = state;
    instance.notifyChange(map);

    colorLayersToggle.disabled = !state;
    azimuthSlider.disabled = !state;
    zenithSlider.disabled = !state;
});

const [, , opacitySlider] = bindSlider('opacity', percentage => {
    const opacity = percentage / 100.0;
    colorLayer.opacity = opacity;
    instance.notifyChange(map);
    opacitySlider.innerHTML = `${percentage}%`;
});

bindSlider('intensity', intensity => {
    map.lighting.hillshadeIntensity = intensity;
    instance.notifyChange(map);
});

bindSlider('zFactor', zFactor => {
    map.lighting.zFactor = zFactor;
    instance.notifyChange(map);
});

const [, , stitchingToggle] = bindToggle('stitching', enabled => {
    map.terrain.stitching = enabled;
    instance.notifyChange(map);
});

bindToggle('terrainDeformation', enabled => {
    map.terrain.enabled = enabled;
    instance.notifyChange(map);
    stitchingToggle.disabled = !enabled;
});
```

---

## Source: manuals/examples/html-labels.md

Source Path: manuals/examples/html-labels.md

# HTML labels

## Официальный кейс
- Slug: `html-labels`
- Официальная страница: https://giro3d.org/latest/examples/html-labels.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/html-labels.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/html-labels.js`

## Краткое описание (official)
Display HTML labels in the 3D scene.

## Расширенное описание (official longdesc)
Labels are HTML elements produced by Three.js' `CSS2DRenderer`. They can be styled using normal CSS styling.

## Теги (official)
- `labels`
- `map`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=html-labels npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/html-labels.html
```html
---
title: HTML labels
shortdesc: Display HTML labels in the 3D scene.
longdesc: Labels are HTML elements produced by Three.js' <a href="https://threejs.org/docs/index.html?q=css2#examples/en/renderers/CSS2DRenderer" target="_blank"><code>CSS2DRenderer</code></a>. They can be styled using normal CSS styling.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [labels, map]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/html-labels.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { GeoJSON } from 'ol/format.js';
import TileWMS from 'ol/source/TileWMS.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { MathUtils, Vector2, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import StatusBar from './widgets/StatusBar.js';

// This example is based on planar_vector example, adding labels on features.
// You can directly jump to `geoJsonLayer.source.addEventListener('featuresloadend', ...)`,
// as the rest is similar.

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const extent = new Extent(crs, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

const map = new Map({ extent });
instance.add(map);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.saveState();

controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;

instance.view.setControls(controls);

// Function to look at an extent from top
function lookTopDownAt(lookAtExtent, lookAtAltitude = 0) {
    const camera = instance.view.camera;
    // @ts-expect-error conversion
    const fov = camera.fov;
    // @ts-expect-error conversion
    const aspect = camera.aspect;

    const hFov = MathUtils.degToRad(fov) / 2;

    const dims = lookAtExtent.dimensions();

    const altitude = (Math.max(dims.x / aspect, dims.y) / Math.tan(hFov)) * 0.5;
    const position = lookAtExtent.centerAsVector3().add(new Vector3(0, 0, altitude));
    const lookAt = lookAtExtent.centerAsVector3();

    lookAt.z = lookAtAltitude;

    // place camera above
    camera.position.copy(position);

    // look down
    camera.lookAt(lookAt);

    // make sure the camera isn't rotating around its view axis
    camera.rotation.z = 0;
    camera.rotation.x = 0.01; // quickfix to avoid bizarre jumps

    controls.target.copy(lookAt);
    controls.saveState();

    instance.notifyChange(camera);
}

const wmsSource = new TiledImageSource({
    source: new TileWMS({
        url: 'https://data.geopf.fr/wms-r',
        projection: 'EPSG:3946',
        params: {
            LAYERS: ['ORTHOIMAGERY.ORTHOPHOTOS'],
            FORMAT: 'image/jpeg',
        },
    }),
});

const colorLayer = new ColorLayer({
    name: 'wms_imagery',
    extent,
    source: wmsSource,
});
map.addLayer(colorLayer);

const style = new Style({
    fill: new Fill({
        color: 'rgba(255, 165, 0, 0.2)',
    }),
    stroke: new Stroke({
        color: 'white',
        width: 2,
    }),
});

const geojsonSource = new VectorSource({
    data: {
        url: 'https://raw.githubusercontent.com/iTowns/iTowns2-sample-data/master/lyon.geojson',
        format: new GeoJSON(),
    },
    style,
});

const geoJsonLayer = new ColorLayer({
    name: 'geojson',
    extent,
    source: geojsonSource,
});

map.addLayer(geoJsonLayer).then(() => {
    // Traverse the OpenLayers features that were added
    for (const feature of geojsonSource.getFeatures()) {
        // Create a label for each feature

        const text = document.createElement('div');
        // Virtually any inner markup is supported, here we're just inserting text
        text.innerText = feature.get('nom');
        text.title = `${feature.get('numero_arrondissement')}e arrondissement`;

        // Any CSS style is supported
        text.style.color = '#ffffff';
        text.style.padding = '0.2em 1em';
        text.style.maxWidth = '200px';
        text.style.border = '2px solid #cccccc';
        text.style.backgroundColor = '#080808';
        text.style.textAlign = 'center';
        text.style.opacity = '80%';

        // Adding the label requires a Vector3 position, let's compute that
        // We'll position the label at the center of the geometry extent
        const olExtent = feature.getGeometry().getExtent();
        const giro3dExtent = new Extent(crs, olExtent[0], olExtent[2], olExtent[1], olExtent[3]);
        if (!giro3dExtent.isInside(extent)) {
            // The extent of the feature is not fully inside the map extent,
            // let's crop it to make sure the label will be inside the map
            giro3dExtent.intersect(extent);
        }
        const position = new Vector2();
        giro3dExtent.centerAsVector2(position);

        // Create our label and position it
        const label = new CSS2DObject(text);
        label.position.set(position.x, position.y, 0);
        label.updateMatrixWorld();
        // Give it a name so it shows up nicely in the inspector
        label.name = `${feature.get('nom')}`;
        // Simply add it to our instance
        // (we could also create a dedicated THREE.Group to have all the labels inside)
        instance.add(label);

        // By default, labels don't have mouse interaction enabled (pointerEvents = 'none')
        // Let's change that so we can click on it to zoom on it
        text.style.cursor = 'pointer';
        text.style.pointerEvents = 'auto';
        // Controls can interfer with the click event
        // e.g. this click event is triggered when we drag the map and the dragging ends on a label
        // but the mouseover is not, so use that to know if the user really wants to click
        // on the label.
        text.addEventListener('mouseover', () => {
            text.setAttribute('giro3d_over', 'on');
        });
        text.addEventListener('mouseout', () => {
            text.removeAttribute('giro3d_over');
        });
        text.addEventListener('click', () => {
            if (text.getAttribute('giro3d_over')) {
                lookTopDownAt(giro3dExtent);
            }
        });
    }
    instance.notifyChange(geoJsonLayer);
});

instance.view.camera.position.set(extent.minX, extent.minY, 2000);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/ign-data.md

Source Path: manuals/examples/ign-data.md

# IGN data

## Официальный кейс
- Slug: `ign-data`
- Официальная страница: https://giro3d.org/latest/examples/ign-data.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/ign-data.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/ign-data.js`

## Краткое описание (official)
Use data sources provided by the french geographic provider (IGN).

## Расширенное описание (official longdesc)
Display a map of France with various IGN datasets (elevation, extruded WFS and orthophotography).

## Теги (official)
- `wfs`
- `wmts`
- `ign`
- `map`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=ign-data npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/ign-data.html
```html
---
title: IGN data
shortdesc: Use data sources provided by the french geographic provider (IGN).
longdesc: Display a map of France with various IGN datasets (elevation, extruded WFS and orthophotography).
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [wfs, wmts, ign, map]
---

<div class="side-pane-with-status-bar pe-none" style="display: none" id="card">
    <div class="card">
        <h5 class="card-header">Building informations</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="pickingHelper"
            >?</span
        >
        <p class="card-text d-none" id="pickingHelper">
            These informations are the feature properties embedded in the return value from the WFS
            server
        </p>

        <div class="card-body">
            <!-- Result table -->
            <div id="results"></div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/ign-data.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { tile } from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import { createXYZ } from 'ol/tilegrid.js';
import {
    AmbientLight,
    Color,
    CubeTextureLoader,
    DirectionalLight,
    DoubleSide,
    Fog,
    MathUtils,
    Vector3,
} from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import FeatureCollection from '@giro3d/giro3d/entities/FeatureCollection.js';
// NOTE: changing the imported name because we use the native `Map` object in this example.
import Giro3dMap from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import StatusBar from './widgets/StatusBar.js';

const epsg2154 = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const SKY_COLOR = new Color(0xf1e9c6);

const instance = new Instance({
    target: 'view',
    crs: epsg2154,
    backgroundColor: SKY_COLOR,
});

const extent = new Extent(epsg2154, -111629.52, 1275028.84, 5976033.79, 7230161.64);

// create a map
const map = new Giro3dMap({
    extent,
    backgroundColor: 'gray',
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
    side: DoubleSide,
});

instance.add(map);

const noDataValue = -1000;

const url = 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

// Let's build the elevation layer from the WMTS capabilities
WmtsSource.fromCapabilities(url, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                name: 'elevation',
                extent: map.extent,
                // We don't need the full resolution of terrain
                // because we are not using any shading. This will save a lot of memory
                // and make the terrain faster to load.
                resolutionFactor: 1 / 8,
                minmax: { min: 0, max: 5000 },
                noDataOptions: {
                    replaceNoData: false,
                },
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

// Let's build the color layer from the WMTS capabilities
WmtsSource.fromCapabilities(url, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        map.addLayer(
            new ColorLayer({
                name: 'color',
                extent: map.extent,
                source: orthophotoWmts,
            }),
        );
    })
    .catch(console.error);

const buildingSource = new VectorSource({
    format: new GeoJSON(),
    url: bbox => {
        return `${
            'https://data.geopf.fr/wfs/ows' +
            '?SERVICE=WFS' +
            '&VERSION=2.0.0' +
            '&request=GetFeature' +
            '&typename=BDTOPO_V3:batiment' +
            '&outputFormat=application/json' +
            '&SRSNAME=EPSG:2154' +
            '&startIndex=0' +
            '&bbox='
        }${bbox.join(',')},EPSG:2154`;
    },
    strategy: tile(createXYZ({ tileSize: 512 })),
});

const hoverColor = new Color('yellow');

// This is the style function that will assign a different style depending on a feature's attribute.
// The `feature` argument is an OpenLayers feature.
const buildingStyle = feature => {
    const properties = feature.getProperties();
    let fillColor = '#FFFFFF';

    const hovered = properties.hovered ?? false;
    const clicked = properties.clicked ?? false;

    switch (properties.usage_1) {
        case 'Industriel':
            fillColor = '#f0bb41';
            break;
        case 'Agricole':
            fillColor = '#96ff0d';
            break;
        case 'Religieux':
            fillColor = '#41b5f0';
            break;
        case 'Sportif':
            fillColor = '#ff0d45';
            break;
        case 'Résidentiel':
            fillColor = '#cec8be';
            break;
        case 'Commercial et services':
            fillColor = '#d8ffd4';
            break;
    }

    const fill = clicked
        ? 'yellow'
        : hovered
          ? new Color(fillColor).lerp(hoverColor, 0.2) // Let's use a slightly brighter color for hover
          : fillColor;

    return {
        fill: {
            color: fill,
            shading: true,
        },
        stroke: {
            color: clicked ? 'yellow' : hovered ? 'white' : 'black',
            lineWidth: clicked ? 5 : undefined,
        },
    };
};

// Let's compute the extrusion offset of building polygons to give them walls.
const extrusionOffsetCallback = feature => {
    const properties = feature.getProperties();
    const buildingHeight = properties['hauteur'];
    const extrusionOffset = -buildingHeight;

    if (Number.isNaN(extrusionOffset)) {
        return null;
    }
    return extrusionOffset;
};

const featureCollection = new FeatureCollection({
    source: buildingSource,
    extent,
    extrusionOffset: extrusionOffsetCallback,
    style: buildingStyle,
    minLevel: 11,
    maxLevel: 11,
});

instance.add(featureCollection);

// To make sure that the buildings remain correctly displayed whenever
// one entity become transparent (i.e it's opacity is less than 1), we need
// to set the render of the feature collection to be greater than the map's.
map.renderOrder = 0;
featureCollection.renderOrder = 1;

// Add a sunlight
const sun = new DirectionalLight('#ffffff', 2);
sun.position.set(1, 0, 1).normalize();
sun.updateMatrixWorld(true);
instance.scene.add(sun);

// We can look below the floor, so let's light also a bit there
const sun2 = new DirectionalLight('#ffffff', 0.5);
sun2.position.set(0, 1, 1);
sun2.updateMatrixWorld();
instance.scene.add(sun2);

// Add an ambient light
const ambientLight = new AmbientLight(0xffffff, 0.2);
instance.scene.add(ambientLight);

instance.view.camera.position.set(913349.2364044407, 6456426.459171033, 1706.0108044011636);

const lookAt = new Vector3(913896, 6459191, 200);
instance.view.camera.lookAt(lookAt);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.4;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

// add a skybox background
const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('image/skyboxsun25deg_zup/');
const cubeTexture = cubeTextureLoader.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
]);

instance.scene.background = cubeTexture;

// information on click
const resultTable = document.getElementById('results');

let lastCameraPosition = new Vector3(0, 0, 0);
const tempVec3 = new Vector3(0, 0, 0);

function truncate(value, length) {
    if (value == null) {
        return null;
    }

    const text = `${value}`;

    if (text.length < length) {
        return text;
    }

    return text.substring(0, length) + '…';
}

// Fill the attribute table with the objects' attributes.
function fillTable(objects) {
    resultTable.innerHTML = '';
    document.getElementById('card').style.display = objects.length > 0 ? 'block' : 'none';

    for (const obj of objects) {
        if (!obj.userData.feature) {
            continue;
        }
        const p = obj.userData.feature.getProperties();

        const entries = [];
        for (const [key, value] of Object.entries(p)) {
            if (key !== 'geometry' && key !== 'clicked' && key !== 'hovered') {
                const entry = `<tr>
                <td title="${key}"><code>${truncate(key, 12)}</code></td>
                <td title="${value}">${truncate(value, 18) ?? '<code>null</code>'}</td>
                </tr>`;
                entries.push(entry);
            }
        }

        resultTable.innerHTML += `
        <table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                ${entries.join('')}
            </tbody>
        </table>
    `;
    }
}

const previousHovered = [];
const previousClicked = [];
const objectsToUpdate = [];

function pick(e, click) {
    const pickedObjects = instance.pickObjectsAt(e, {
        where: [featureCollection],
    });

    if (click) {
        previousClicked.forEach(obj => obj.userData.feature.set('clicked', false));
    } else {
        previousHovered.forEach(obj => obj.userData.feature.set('hovered', false));
    }

    const property = click ? 'clicked' : 'hovered';

    objectsToUpdate.length = 0;

    if (pickedObjects.length > 0) {
        const picked = pickedObjects[0];
        const obj = picked.object;
        const { feature } = obj.userData;

        feature.set(property, true);

        objectsToUpdate.push(obj);
    }

    if (click) {
        fillTable(objectsToUpdate);
    }

    // To avoid updating all the objects and lose a lot of performance,
    // we only update the objects that have changed.
    const updatedObjects = [...previousHovered, ...previousClicked, ...objectsToUpdate];
    if (click) {
        previousClicked.splice(0, previousClicked.length, ...objectsToUpdate);
    } else {
        previousHovered.splice(0, previousHovered.length, ...objectsToUpdate);
    }

    if (updatedObjects.length > 0) {
        featureCollection.updateStyles(updatedObjects);
    }
}

const hover = e => pick(e, false);
const click = e => pick(e, true);

instance.domElement.addEventListener('mousemove', hover);
instance.domElement.addEventListener('click', click);

const DOWN_VECTOR = new Vector3(0, 0, -1);
const EARTH_RADIUS = 6_3781_000;
const tmpVec3 = new Vector3();

const fog = new Fog(SKY_COLOR, 1, 2);
instance.scene.fog = fog;

function processFogAndClippingPlanes(camera) {
    // Compute the tilt, in radians, of the camera.
    const tilt = DOWN_VECTOR.angleTo(camera.camera.getWorldDirection(tmpVec3));

    const altitude = MathUtils.clamp(camera.camera.position.z, 20, 100000);

    const maxFarPlane = 9_999_999;
    const actualTilt = MathUtils.clamp(tilt, 0, Math.PI / 3);
    const horizon = Math.sqrt(2 * altitude * EARTH_RADIUS) * 0.2;

    camera.maxFarPlane = MathUtils.mapLinear(actualTilt, 0, Math.PI / 3, maxFarPlane, horizon);
    fog.far = camera.far;
    fog.near = MathUtils.lerp(camera.near, camera.far, 0.2);
}

instance.addEventListener('after-camera-update', event =>
    processFogAndClippingPlanes(event.camera),
);

processFogAndClippingPlanes(instance.view);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/inspector.md

Source Path: manuals/examples/inspector.md

# Inspector

## Официальный кейс
- Slug: `inspector`
- Официальная страница: https://giro3d.org/latest/examples/inspector.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/inspector.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/inspector.js`

## Краткое описание (official)
Display the inspector with a custom panel.

## Расширенное описание (official longdesc)
The inspector is an extensible tool used to debug and diagnose issues in the 3D scene.

## Теги (official)
- `inspector`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=inspector npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/inspector.html
```html
---
title: Inspector
shortdesc: Display the inspector with a custom panel.
longdesc: The inspector is an extensible tool used to debug and diagnose issues in the 3D scene.
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [inspector]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/inspector.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GUI from 'lil-gui';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import Panel from '@giro3d/giro3d/gui/Panel.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

class MyCustomPanel extends Panel {
    /**
     * @param {GUI} parentGui The parent GUI.
     * @param {Map} map The observed map.
     * @param {Instance} instance The Giro3D instance.
     */
    constructor(parentGui, map, instance) {
        super(parentGui, instance, 'Custom panel');

        this.map = map;

        this.myCheckBox = true;

        this.addController(this, 'sayHello').name('Press this button!');
        this.addController(this, 'myCheckBox')
            .name('Check this box !')
            .onChange(value => {
                this.map.object3d.visible = value;
                this.instance.notifyChange(this.map);
            });
    }

    sayHello() {
        window.alert('Hello from my custom panel!');
    }
}

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

const map = new Map({ extent });

instance.add(map);

map.addLayer(
    new ColorLayer({
        source: new TiledImageSource({
            source: new StadiaMaps({ layer: 'stamen_watercolor', wrapX: false }),
        }),
    }),
);

// Create camera and controls
instance.view.camera.position.set(0, 0, 25000000);
const controls = new MapControls(instance.view.camera, instance.domElement);
instance.view.setControls(controls);

// Attach the inspector to the DOM
const inspectorDiv = document.getElementById('inspector');
inspectorDiv.classList.remove('d-none');
const inspector = Inspector.attach(inspectorDiv, instance, { title: 'Custom title' });

// Hide the fullscreen button that is at the same place as the Inspector
const btnFullscreen = document.getElementById('btnFullscreen');
btnFullscreen.classList.add('d-none');

const myCustomPanel = new MyCustomPanel(inspector.gui, map, instance);

// Add our custom panel to the inspector.
inspector.addPanel(myCustomPanel);

// Trigger the first render
instance.notifyChange(map);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/instance-dispose.md

Source Path: manuals/examples/instance-dispose.md

# Dispose instance

## Официальный кейс
- Slug: `instance-dispose`
- Официальная страница: https://giro3d.org/latest/examples/instance-dispose.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/instance-dispose.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/instance-dispose.js`

## Краткое описание (official)
Help to test if Giro3D correctly deallocates memory.

## Теги (official)
- `performance`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=instance-dispose npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/instance-dispose.html
```html
---
title: Dispose instance
shortdesc: Help to test if Giro3D correctly deallocates memory.
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [performance]
---

<div class="side-pane-with-status-bar">
    <div class="card" id="buttons-container">
        <div class="card-body">
            <div class="form-check form-switch mb-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="autoreload"
                    autocomplete="off"
                />
                <label class="form-check-label" for="autoreload"
                    >Reload Giro3D every 2 seconds</label
                >
            </div>

            <button id="load_once" class="btn btn-primary">Dispose and reload Giro3D once</button>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/instance-dispose.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import StadiaMaps from 'ol/source/StadiaMaps.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);
const dimensions = extent.dimensions();

let instance = null;
let inspector = null;
let controls = null;
/** @type {Map} */
let map = null;

function init() {
    instance = new Instance({
        target: 'view',
        crs: extent.crs,
        backgroundColor: 0x0a3b59,
    });

    map = new Map({ extent });

    instance.add(map);

    // Adds an TMS imagery layer
    map.addLayer(
        new ColorLayer({
            name: 'osm',
            source: new TiledImageSource({
                source: new StadiaMaps({ layer: 'stamen_watercolor', wrapX: false }),
            }),
        }),
    ).catch(e => console.error(e));

    instance.view.camera.position.set(
        (Math.random() - 0.5) * dimensions.x,
        (Math.random() - 0.5) * dimensions.y,
        25000000,
    );

    controls = new MapControls(instance.view.camera, instance.domElement);

    instance.view.setControls(controls);

    inspector = Inspector.attach('inspector', instance);
}

init();

function reload() {
    if (!instance) {
        return;
    }

    map.getLayers().forEach(l => l.dispose());
    inspector.detach();
    instance.dispose();
    controls.dispose();
    inspector = null;
    instance = null;
    controls = null;
    init();
}

document.getElementById('load_once').addEventListener('click', reload);

let intervalId;

bindToggle('autoreload', state => {
    clearInterval(intervalId);

    if (state) {
        intervalId = setInterval(reload, 2000);
    }
});

StatusBar.bind(instance);
```

---

## Source: manuals/examples/interactive-vector-layer.md

Source Path: manuals/examples/interactive-vector-layer.md

# Interactive vector layer

## Официальный кейс
- Slug: `interactive-vector-layer`
- Официальная страница: https://giro3d.org/latest/examples/interactive-vector-layer.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/interactive-vector-layer.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/interactive-vector-layer.js`

## Краткое описание (official)
Display interactive vector data on a Map.

## Расширенное описание (official longdesc)
The `VectorSource` accepts all formats that OpenLayers handle (such as GeoJSON, KML, GPX...). The `VectorSource` accepts either a URL to the remote data file, or the text content of the file, or an array of OpenLayers features. The style of the source is expressed using the OpenLayers Style object.

## Теги (official)
- `map`
- `layer`
- `vector`
- `geojson`

## Атрибуция (official)
© OpenLayers

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=interactive-vector-layer npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/interactive-vector-layer.html
```html
---
title: Interactive vector layer
shortdesc: Display interactive vector data on a Map.
attribution: © <a target="_blank" href="https://openlayers.org/">OpenLayers</a>
longdesc: The <a href="../apidoc/classes/sources.VectorSource.html" target="_blank"><code>VectorSource</code></a> accepts all formats that OpenLayers handle (such as GeoJSON, KML, GPX...). The <code>VectorSource</code> accepts either a URL to the remote data file, or the text content of the file, or an array of OpenLayers features. The style of the source is expressed using the OpenLayers </code>Style</code> object.
tags: [map, layer, vector, geojson]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/interactive-vector-layer.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { Color } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

let time = 0;

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 'white',
});

instance.view.camera.position.set(0, 0, 10000000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
instance.view.setControls(controls);

const map = new Map({ extent, backgroundColor: '#135D66' });

instance.add(map);

const ecoRegionLayerStyle = feature => {
    const brightness = Math.sin((time / 1000) * 6) * 0.2;
    const featureColor = new Color(feature.get('COLOR') || '#eeeeee');
    const highlight = feature.get('highlight');

    const color = highlight ? new Color(featureColor).offsetHSL(0, 0, brightness) : featureColor;

    const stroke = highlight
        ? new Stroke({
              color: 'white',
              width: 2,
          })
        : undefined;

    return new Style({
        zIndex: highlight ? 1 : 0,
        fill: new Fill({
            color: `#${color.getHexString()}`,
        }),
        stroke,
    });
};

const ecoRegionSource = new VectorSource({
    data: {
        url: 'https://3d.oslandia.com/giro3d/vectors/ecoregions.json',
        format: new GeoJSON(),
    },
    dataProjection: CoordinateSystem.epsg4326,
    style: ecoRegionLayerStyle,
});

const ecoRegionLayer = new ColorLayer({
    name: 'ecoregions',
    extent,
    source: ecoRegionSource,
});

map.addLayer(ecoRegionLayer);

// Creates the country layer
const countryLayerStyle = new Style({
    stroke: new Stroke({
        color: 'black',
        width: 1,
    }),
});

const countryLayer = new ColorLayer({
    name: 'countries',
    extent,
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/giro3d/vectors/countries.geojson',
            format: new GeoJSON(),
        },
        dataProjection: CoordinateSystem.epsg4326,
        style: countryLayerStyle,
    }),
});

map.addLayer(countryLayer);

// Creates a custom vector layer
const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [102.0, 0.5],
            },
            properties: {
                prop0: 'value0',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    [102.0, 0.0],
                    [103.0, 1.0],
                    [104.0, 0.0],
                    [105.0, 1.0],
                ],
            },
            properties: {
                prop0: 'value0',
                prop1: 0.0,
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0],
                    ],
                ],
            },
            properties: {
                prop0: 'value0',
                prop1: { this: 'that' },
            },
        },
    ],
};

const customVectorLayerStyle = new Style({
    fill: new Fill({
        color: 'cyan',
    }),
    stroke: new Stroke({
        color: 'orange',
        width: 1,
    }),
});

const customVectorLayer = new ColorLayer({
    name: 'geojson',
    extent,
    source: new VectorSource({
        data: {
            content: geojson,
            format: new GeoJSON(),
        },
        dataProjection: CoordinateSystem.epsg4326,
        style: customVectorLayerStyle,
    }),
});

map.addLayer(customVectorLayer);

const labelElement = document.createElement('span');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';
const label = new CSS2DObject(labelElement);

label.visible = false;
instance.add(label);

let previousFeature;

function pickFeatures(mouseEvent) {
    const pickResult = instance.pickObjectsAt(mouseEvent);

    const picked = pickResult[0];

    function resetPickedFeatures() {
        if (previousFeature) {
            previousFeature.set('highlight', false);
            ecoRegionSource.updateFeature(previousFeature);
        }
        if (label.visible) {
            label.visible = false;
        }
        previousFeature = null;
    }

    if (picked) {
        const { x, y } = picked.point;
        const features = ecoRegionLayer.getVectorFeaturesAtCoordinate(
            new Coordinates(instance.coordinateSystem, x, y),
        );

        if (features.length > 0) {
            const firstFeature = features[0];

            previousFeature?.set('highlight', false);
            firstFeature.set('highlight', true);

            if (previousFeature !== firstFeature) {
                ecoRegionSource.updateFeature(previousFeature, firstFeature);
                previousFeature = firstFeature;
            }

            label.position.set(x, y, 100);
            label.visible = true;
            label.element.innerText = firstFeature.get('ECO_NAME');
            label.updateMatrixWorld(true);
        } else {
            resetPickedFeatures();
        }
    } else {
        resetPickedFeatures();
    }
}

function update(t) {
    time = t;
    if (previousFeature != null) {
        ecoRegionSource.updateFeature(previousFeature);
    }
    requestAnimationFrame(update);
}

update(0);

instance.domElement.addEventListener('mousemove', pickFeatures);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/las.md

Source Path: manuals/examples/las.md

# LAS/LAZ files.

## Официальный кейс
- Slug: `las`
- Официальная страница: https://giro3d.org/latest/examples/las.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/las.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/las.js`

## Краткое описание (official)
Display a LAS/LAZ file.

## Расширенное описание (official longdesc)
Use the `LASSource` to display raw LAS/LAZ files. Note however that this format is not optimized for web streaming and visualization. Instead, it is recommended to use a `COPCSource` to load Cloud-Optimized Point Cloud LAZ files instead.

## Теги (official)
- `point cloud`
- `las`
- `laz`

## Атрибуция (official)
Autzen stadium dataset provided by United States Geological Survey and Hobu, Inc.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=las npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/las.html
```html
---
title: LAS/LAZ files.
shortdesc: Display a LAS/LAZ file.
longdesc: Use the <a target="_blank" href="../apidoc/classes/sources.LASSource.html"><code>LASSource</code></a> to display raw LAS/LAZ files. Note however that this format is not optimized for web streaming and visualization. Instead, it is recommended to use a <a target="_blank" href="../apidoc/classes/sources.COPCSource.html"><code>COPCSource</code></a> to load <a href="https://copc.io" target="_blank">Cloud-Optimized Point Cloud</a> LAZ files instead.
tags: ['point cloud', 'las', 'laz']
attribution: Autzen stadium dataset provided by <a href="https://www.usgs.gov" target="_blank">United States Geological Survey</a> and <a href="https://hobu.co/" target="_blank">Hobu, Inc.</a>
---
```

#### Inlined: manuals/reference_info/giro3d/examples/las.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { setLazPerfPath } from '@giro3d/giro3d/sources/las/config.js';
import LASSource from '@giro3d/giro3d/sources/LASSource.js';

import { placeCameraOnTop } from './widgets/placeCameraOnTop.js';
import StatusBar from './widgets/StatusBar.js';

// LAS processing requires the WebAssembly laz-perf library
// This path is specific to your project, and must be set accordingly.
setLazPerfPath('/assets/wasm');

const url = 'https://3d.oslandia.com/giro3d/pointclouds/autzen-simplified.laz';

const crs = CoordinateSystem.register(
    'EPSG:2992',
    '+proj=lcc +lat_0=41.75 +lon_0=-120.5 +lat_1=43 +lat_2=45.5 +x_0=399999.9999984 +y_0=0 +ellps=GRS80 +nadgrids=us_noaa_WO.tif +units=ft +no_defs +type=crs',
);

const instance = new Instance({
    crs,
    target: 'view',
    backgroundColor: null,
});

async function load() {
    const source = new LASSource({ url });

    const entity = new PointCloud({ source });

    await instance.add(entity);

    entity.setActiveAttribute('Color');

    placeCameraOnTop(entity.getBoundingBox(), instance);
}

load().catch(console.error);

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/layer-blending-mode.md

Source Path: manuals/examples/layer-blending-mode.md

# Blending modes

## Официальный кейс
- Slug: `layer-blending-mode`
- Официальная страница: https://giro3d.org/latest/examples/layer-blending-mode.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-blending-mode.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-blending-mode.js`

## Краткое описание (official)
Assign various blending modes to a color layer.

## Расширенное описание (official longdesc)
Color layers can have different blending modes depending on the desired effect. The default blending mode (`BlendingMode.Normal`) is alpha blending, where the transparency of the pixels is used to blend the layer with the previous layer (or the background).

## Теги (official)
- `map`
- `osm`
- `layer`
- `blending`

## Атрибуция (official)
© Mapbox, © OpenStreetMap contributors, © NASA

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-blending-mode npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-blending-mode.html
```html
---
title: Blending modes
shortdesc: Assign various blending modes to a color layer.
longdesc: Color layers can have different <a href="../apidoc/enums/core.layer.BlendingMode.html" target="_blank">blending modes</a> depending on the desired effect. The default blending mode (<code>BlendingMode.Normal</code>) is alpha blending, where the transparency of the pixels is used to blend the layer with the previous layer (or the background).
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>, © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_blank" href="https://visibleearth.nasa.gov/collection/1484/blue-marble">NASA</a>
tags: [map, osm, layer, blending]
---

<div class="side-pane-with-status-bar">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body">
            <!-- Cloud layer -->
            <div class="input-group mb-3">
                <div class="input-group-text">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-cloud"
                        autocomplete="off"
                    />
                </div>
                <label class="input-group-text" style="width: 8rem" for="cloud">Cloud layer</label>
                <select class="form-select" id="cloud" autocomplete="off">
                    <option value="0">None</option>
                    <option value="1">Normal</option>
                    <option value="2" selected>Add</option>
                    <option value="3">Multiply</option>
                </select>
            </div>

            <!-- Vector layer -->
            <div class="input-group mb-3">
                <div class="input-group-text">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-vector"
                        autocomplete="off"
                    />
                </div>
                <label class="input-group-text" style="width: 8rem" for="vector"
                    >Vector layer</label
                >
                <select class="form-select" id="vector" autocomplete="off">
                    <option value="0">None</option>
                    <option value="1" selected>Normal</option>
                    <option value="2">Add</option>
                    <option value="3">Multiply</option>
                </select>
            </div>

            <!-- Satellite layer -->
            <div class="input-group mb-3">
                <div class="input-group-text">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-satellite"
                        autocomplete="off"
                    />
                </div>
                <label class="input-group-text" style="width: 8rem" for="satellite"
                    >Satellite layer</label
                >
                <select class="form-select" id="satellite" autocomplete="off">
                    <option value="0" selected>None</option>
                    <option value="1">Normal</option>
                    <option value="2">Add</option>
                    <option value="3">Multiply</option>
                </select>
            </div>

            <!-- Background color -->
            <div class="input-group">
                <div class="input-group-text">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-background"
                        autocomplete="off"
                    />
                </div>
                <label class="input-group-text" style="width: 8rem" for="color">Background</label>
                <input
                    type="color"
                    class="form-control form-control-color"
                    id="color"
                    value="#2978b4"
                    title="color"
                />
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-blending-mode.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import XYZ from 'ol/source/XYZ.js';
import { Stroke, Style } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import BlendingMode from '@giro3d/giro3d/core/layer/BlendingMode.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import StaticImageSource from '@giro3d/giro3d/sources/StaticImageSource.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4326,
});

const extent = new Extent(CoordinateSystem.epsg4326, -180, 180, -90, 90);

const map = new Map({ extent, backgroundColor: 'blue' });

instance.add(map);

const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

// Create a satellite layer with no blending at all (layer is completely opaque)
const satellite = new ColorLayer({
    name: 'satellite',
    blendingMode: BlendingMode.None,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
            crossOrigin: 'anonymous',
        }),
    }),
});
map.addLayer(satellite).catch(e => console.error(e));

// Create a vector layer with normal blending mode.
const vector = new ColorLayer({
    name: 'boundaries',
    blendingMode: BlendingMode.Normal,
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/giro3d/vectors/countries.geojson',
            format: new GeoJSON(),
        },
        style: new Style({
            stroke: new Stroke({ color: 'red', width: 2 }),
        }),
        dataProjection: CoordinateSystem.epsg4326,
    }),
});
map.addLayer(vector).catch(e => console.error(e));

// Create a cloud coverage layer with an additive blending mode
const cloud = new ColorLayer({
    name: 'clouds',
    blendingMode: BlendingMode.Add,
    source: new StaticImageSource({
        source: 'https://3d.oslandia.com/giro3d/images/cloud_cover.webp',
        extent,
    }),
});
map.addLayer(cloud).catch(e => console.error(e));

instance.view.camera.position.set(0, 0, 230);

const controls = new MapControls(instance.view.camera, instance.domElement);

instance.view.setControls(controls);

// Example GUI

const [setBackground] = bindColorPicker('color', v => {
    map.backgroundColor = v;
    instance.notifyChange(map);
});
const setMode = (layer, mode) => {
    layer.blendingMode = mode;
    instance.notifyChange(layer);
};
const [setCloudMode] = bindNumericalDropDown('cloud', v => setMode(cloud, v));
const [setVectorMode] = bindNumericalDropDown('vector', v => setMode(vector, v));
const [setSatelliteMode] = bindNumericalDropDown('satellite', v => setMode(satellite, v));

const show = (layer, v) => {
    layer.visible = v;
    instance.notifyChange(layer);
};
const [showClouds] = bindToggle('show-cloud', v => show(cloud, v));
const [showSatellite] = bindToggle('show-satellite', v => show(satellite, v));
const [showVector] = bindToggle('show-vector', v => show(vector, v));
const [showBackground] = bindToggle('show-background', v => {
    map.backgroundOpacity = v ? 1 : 0;
    instance.notifyChange(map);
});

const reset = () => {
    setCloudMode(BlendingMode.Add);
    setVectorMode(BlendingMode.Normal);
    setSatelliteMode(BlendingMode.None);

    showClouds(true);
    showVector(true);
    showSatellite(true);

    setBackground('blue');

    showBackground(true);
};

bindButton('reset', reset);

reset();

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/layer-get-pixel.md

Source Path: manuals/examples/layer-get-pixel.md

# Sample layer color

## Официальный кейс
- Slug: `layer-get-pixel`
- Официальная страница: https://giro3d.org/latest/examples/layer-get-pixel.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-get-pixel.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-get-pixel.js`

## Краткое описание (official)
Retrieve the pixel value of a layer at given coordinates.

## Расширенное описание (official longdesc)
Use the `getPixel()` method to change the mouse pointer when hovering a non-transparent pixel on the map.

## Теги (official)
- `map`
- `wms`
- `wmts`

## Атрибуция (official)
layers from © IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-get-pixel npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-get-pixel.html
```html
---
title: Sample layer color
shortdesc: Retrieve the pixel value of a layer at given coordinates.
longdesc: Use the <a target="_blank" href="../apidoc/classes/core.layer.Layer.html#getPixel"><code>getPixel()</code></a> method to change the mouse pointer when hovering a non-transparent pixel on the map.
attribution: layers from  © <a target="_blank" href="https://geoservices.ign.fr/services-web">IGN</a>
tags: [map, wms, wmts]
---

<div class="side-pane-with-status-bar" style="width: 10rem">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Color -->
            <label class="form-check-label w-100 mb-2" for="color">Picked color</label>
            <input
                disabled
                type="color"
                class="form-control form-control-color float-end w-100"
                id="color"
                value="#ffffff"
                title="color"
                autocomplete="off"
            />
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-get-pixel.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { get as getProjection } from 'ol/proj.js';
import { TileWMS } from 'ol/source.js';
import { Vector2, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20048966.1,
    20048966.1,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 'black',
});
const camPos = new Vector3(258767.3, 6247882.8, 6872.5);
instance.view.camera.position.set(camPos.x, camPos.y, camPos.z);

const controls = new MapControls(instance.view.camera, instance.domElement);
instance.view.setControls(controls);

controls.target.set(camPos.x, camPos.y + 1, 0);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    maxSubdivisionLevel: 19,
    lighting: {
        enabled: true,
        zFactor: 8,
    },
    terrain: false,
});
instance.add(map);

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

const wmsLayer = new ColorLayer({
    name: 'museums',
    source: new TiledImageSource({
        httpTimeout: 10000,
        source: new TileWMS({
            url: 'https://data.geopf.fr/wms-v/wms?SERVICE=WMS&VERSION=1.3.0',
            params: { LAYERS: 'POI.MUSEUM', TILED: true },
            crossOrigin: 'anonymous',
            projection: getProjection('EPSG:3857'),
        }),
    }),
});

async function initializeWmts() {
    const orthophotoWmts = await WmtsSource.fromCapabilities(capabilitiesUrl, {
        layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
    });

    const layer = new ColorLayer({
        name: 'orthophotos',
        extent: map.extent,
        source: orthophotoWmts,
    });
    layer.userData.zOrder = 0;

    await Promise.all([map.addLayer(layer), map.addLayer(wmsLayer)]);

    const [setColor, _, colorPicker] = bindColorPicker('color', () => {});

    instance.domElement.addEventListener('pointermove', event => {
        const canvasCoords = instance.eventToCanvasCoords(event, new Vector2());

        const results = map.pick(canvasCoords);

        if (results && results.length > 0) {
            const point = results[0].point;
            const coordinates = new Coordinates(instance.coordinateSystem, point.x, point.y);

            const hit = wmsLayer.getPixel({ coordinates, size: 10 });

            if (hit && hit.length > 0) {
                setColor(hit[0]);
            }

            colorPicker.style.display = hit ? 'block' : 'none';
            instance.domElement.style.cursor = hit ? 'pointer' : '';
        } else {
            colorPicker.style.display = 'none';
            instance.domElement.style.cursor = '';
        }
    });
}

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
initializeWmts();
```

---

## Source: manuals/examples/layer-ordering.md

Source Path: manuals/examples/layer-ordering.md

# Change layer order

## Официальный кейс
- Slug: `layer-ordering`
- Официальная страница: https://giro3d.org/latest/examples/layer-ordering.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-ordering.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-ordering.js`

## Краткое описание (official)
Move layers up and down in the map.

## Теги (official)
- `map`
- `layers`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-ordering npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-ordering.html
```html
---
title: Change layer order
shortdesc: Move layers up and down in the map.
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [map, layers]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-body p-0">
            <ul id="layer-list" class="list-group list-group-flush">
                <li id="terrain" class="list-group-item">
                    <div class="float-start align-start mx-4">terrain</div>
                    <div
                        class="btn-group btn-group-sm float-end"
                        role="group"
                        aria-label="Basic example"
                    >
                        <button id="btn-terrain-up" type="button" class="btn btn-primary">
                            Up
                        </button>
                        <button id="btn-terrain-down" type="button" class="btn btn-primary">
                            Down
                        </button>
                    </div>
                </li>

                <li id="toner" class="list-group-item">
                    <div class="float-start align-start mx-4">toner</div>
                    <div
                        class="btn-group btn-group-sm float-end"
                        role="group"
                        aria-label="Basic example"
                    >
                        <button id="btn-toner-up" type="button" class="btn btn-primary">Up</button>
                        <button id="btn-toner-down" type="button" class="btn btn-primary">
                            Down
                        </button>
                    </div>
                </li>

                <li id="watercolor" class="list-group-item">
                    <div class="float-start align-start mx-4">watercolor</div>
                    <div
                        class="btn-group btn-group-sm float-end"
                        role="group"
                        aria-label="Basic example"
                    >
                        <button id="btn-watercolor-up" type="button" class="btn btn-primary">
                            Up
                        </button>
                        <button id="btn-watercolor-down" type="button" class="btn btn-primary">
                            Down
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-ordering.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import StadiaMaps from 'ol/source/StadiaMaps.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.epsg3857;
const mapExtent = Extent.fromCenterAndSize(crs, { x: 256227, y: 5882214 }, 2000000, 2000000);

const instance = new Instance({
    target: 'view',
    crs,
});

instance.view.camera.position.set(256227, 5882214, 4000000);

const map = new Map({ extent: mapExtent, backgroundOpacity: 0 });

instance.add(map);

const layerSize = 1000000;

const watercolor = new ColorLayer({
    name: 'watercolor',
    extent: Extent.fromCenterAndSize(crs, { x: -100000, y: 6169226 }, layerSize, layerSize),
    source: new TiledImageSource({
        source: new StadiaMaps({ layer: 'stamen_watercolor', wrapX: false }),
    }),
});

const toner = new ColorLayer({
    name: 'toner',
    extent: Extent.fromCenterAndSize(crs, { x: 500000, y: 5669226 }, layerSize, layerSize),
    source: new TiledImageSource({
        source: new StadiaMaps({ layer: 'stamen_toner', wrapX: false }),
    }),
});

const terrain = new ColorLayer({
    name: 'terrain',
    extent: Extent.fromCenterAndSize(crs, { x: 900000, y: 5169226 }, layerSize, layerSize),
    source: new TiledImageSource({
        source: new StadiaMaps({ layer: 'stamen_terrain', wrapX: false }),
    }),
});

map.addLayer(watercolor);
map.addLayer(toner);
map.addLayer(terrain);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

const layers = {
    watercolor,
    toner,
    terrain,
};

function bindUI(layer) {
    const id = layer.name;
    const btnUp = document.getElementById(`btn-${id}-up`);
    const btnDown = document.getElementById(`btn-${id}-down`);
    const layerElt = document.getElementById(`${id}`);
    const container = layerElt.parentNode;

    function reorder() {
        [...container.children]
            .sort((a, b) => (map.getIndex(layers[a.id]) > map.getIndex(layers[b.id]) ? -1 : 1))
            .forEach(node => container.appendChild(node));
    }

    btnUp.onclick = () => {
        map.moveLayerUp(layer);
        reorder();
    };
    btnDown.onclick = () => {
        map.moveLayerDown(layer);
        reorder();
    };

    reorder();
}

bindUI(watercolor);
bindUI(toner);
bindUI(terrain);
```

---

## Source: manuals/examples/layer-reprojection.md

Source Path: manuals/examples/layer-reprojection.md

# Layer reprojection

## Официальный кейс
- Slug: `layer-reprojection`
- Официальная страница: https://giro3d.org/latest/examples/layer-reprojection.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-reprojection.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-reprojection.js`

## Краткое описание (official)
Reproject layers with heterogenous coordinate systems.

## Расширенное описание (official longdesc)
A `Layer` can reproject the images produced by the `ImageSource` to conform to the CRS of the instance.

## Теги (official)
- `map`
- `layers`
- `reprojection`

## Атрибуция (official)
© Mapbox, CRS data provided by epsg.io

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-reprojection npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-reprojection.html
```html
---
title: Layer reprojection
shortdesc: Reproject layers with heterogenous coordinate systems.
longdesc: A <code>Layer</code> can reproject the images produced by the <code>ImageSource</code> to conform to the CRS of the instance.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>, CRS data provided by <a target="_blank" href="https://www.epsg.io/">epsg.io</a>
tags: [map, layers, reprojection]
---

<div class="side-pane-with-status-bar" style="width: 22rem">
    <div class="mh-100 overflow-y-auto">
        <div class="card" id="currentCrsSection">
            <!-- CRS code -->
            <div class="card-header">Parameters</div>

            <!-- tooltip -->
            <span
                class="badge bg-secondary position-absolute top-0 end-0 m-2"
                data-bs-toggle="popover"
                data-bs-content="help"
                >?</span
            >
            <p class="card-text d-none" id="help">
                Type a projected CRS in the field below, then "Update" to create a scene with
                various layers. You can search for projection codes on
                <a target="_blank" href="https://epsg.io/?q=epsg">epsg.io</a>. <b>Note:</b> not all
                projections are supported.
            </p>

            <!-- CRS name and area -->
            <div class="card-body">
                <!-- CRS selector -->
                <div class="input-group">
                    <span class="input-group-text" id="code-label">EPSG</span>
                    <input
                        type="number"
                        class="form-control"
                        id="code"
                        placeholder="EPSG code (e.g 3857)"
                        value="2154"
                        aria-label="EpsgCode"
                        autocomplete="off"
                        aria-describedby="code-label"
                    />
                    <button class="input-group-text btn btn-primary" id="create">Update</button>
                </div>

                <hr />
                <h5 class="card-title" id="name">RGF93 v1 / Lambert-93 -- France</h5>
                <h6 class="card-subtitle text-body-secondary mb-2" id="srid">EPSG:2154</h6>
                <p class="card-text" id="description">
                    France - onshore and offshore, mainland and Corsica (France métropolitaine
                    including Corsica).
                </p>
                <a id="link" target="_blank">See on epsg.io</a>
            </div>
        </div>

        <!-- Error message -->
        <div class="alert alert-danger mt-3" id="message" style="display: none" role="alert">
            A simple primary alert—check it out!
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-reprojection.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { GeoJSON } from 'ol/format.js';
import XYZ from 'ol/source/XYZ.js';
import { Stroke, Style } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindButton } from './widgets/bindButton.js';
import StatusBar from './widgets/StatusBar.js';

/** @type {Instance} */
let instance;
/** @type {Inspector} */
let inspector;
/** @type {MapControls} */
let controls;
/** @type {Map} */
let map;

function addMapboxLayer(extent) {
    const apiKey =
        'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

    // Adds a satellite basemap
    const tiledLayer = new ColorLayer({
        name: 'basemap',
        extent,
        showTileBorders: true,
        source: new TiledImageSource({
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${apiKey}`,
                projection: 'EPSG:3857',
            }),
        }),
    });
    map.addLayer(tiledLayer).catch(e => console.error(e));
}

function addCogLayer() {
    const cogLayer = new ColorLayer({
        name: 'cog',
        showTileBorders: true,
        source: new GeoTIFFSource({
            url: 'https://3d.oslandia.com/giro3d/rasters/TCI.tif',
            crs: CoordinateSystem.epsg3857,
        }),
    });
    map.addLayer(cogLayer).catch(e => console.error(e));
}

function addVectorLayer() {
    const outlineStyle = new Style({
        stroke: new Stroke({ color: 'red', width: 2 }),
    });

    // Display the countries boundaries.
    const boundaries = new ColorLayer({
        name: 'boundaries',
        source: new VectorSource({
            data: {
                url: 'https://3d.oslandia.com/giro3d/vectors/countries.geojson',
                format: new GeoJSON(),
            },
            style: outlineStyle,
            dataProjection: CoordinateSystem.epsg4326,
        }),
    });

    map.addLayer(boundaries).catch(e => console.error(e));
}

function createScene(/** @type CoordinateSystem */ crs, extent) {
    if (instance) {
        map.getLayers().forEach(l => l.dispose());
        controls.dispose();
        inspector.detach();
        instance.dispose();
    }

    instance = new Instance({
        target: 'view',
        crs,
        backgroundColor: 'grey',
    });

    map = new Map({
        extent,
        terrain: {
            segments: 2,
        },
        backgroundColor: 'black',
        backgroundOpacity: 0.3,
    });

    instance.add(map);

    addMapboxLayer(extent);

    addCogLayer();

    addVectorLayer();

    const center = extent.centerAsVector3();
    instance.view.camera.position.set(center.x, center.y - 1, extent.dimensions().y * 2);

    controls = new MapControls(instance.view.camera, instance.domElement);
    controls.target = center;
    controls.saveState();
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.maxPolarAngle = Math.PI / 2.3;
    instance.view.setControls(controls);

    inspector = Inspector.attach('inspector', instance);

    StatusBar.bind(instance, { disableUrlUpdate: true });
}

async function fetchCrs(code) {
    const res = await fetch(`https://epsg.io/${code}.wkt2`, { mode: 'cors' });
    const wkt2 = await res.text();

    const name = /PROJCRS\["(.*?)"/gm.exec(wkt2)[1];
    const area = /AREA\["(.*?)"/gm.exec(wkt2)[1];
    const bbox = /BBOX\[(.*?)\]/gm.exec(wkt2)[1];

    const [minLat, minLon, maxLat, maxLon] = bbox.split(',').map(s => s.trim());

    const proj = await (await fetch(`https://epsg.io/${code}.proj4`, { mode: 'cors' })).text();

    const id = `EPSG:${code}`;
    const crs = CoordinateSystem.register(id, proj, { throwIfFailedToRegisterWithProj: true });

    const extent = new Extent(CoordinateSystem.epsg4326, {
        west: Number.parseFloat(minLon),
        east: Number.parseFloat(maxLon),
        north: Number.parseFloat(maxLat),
        south: Number.parseFloat(minLat),
    });

    document.getElementById('srid').innerText = id;
    document.getElementById('name').innerText = name;
    document.getElementById('description').innerText = area;
    // @ts-expect-error typing
    document.getElementById('link').href = `https://epsg.io/${code}`;

    return { def: wkt2, crs, extent: extent.as(crs) };
}

async function initialize(epsgCode) {
    const error = document.getElementById('message');

    try {
        const { extent, crs } = await fetchCrs(epsgCode);
        error.style.display = 'none';

        createScene(crs, extent);
    } catch (e) {
        error.style.display = 'block';

        if (e instanceof Error) {
            error.innerText = e.message;
        } else {
            error.innerText = `An error occured while fetching CRS definition on epsg.io`;
        }
    }
}

bindButton('create', () => {
    /** @type {HTMLInputElement} */
    // @ts-expect-error conversion
    const epsgCodeElt = document.getElementById('code');

    const epsgCode = Number.parseInt(epsgCodeElt.value);

    if (epsgCode) {
        initialize(epsgCode);
    }
});

initialize(2154);
```

---

## Source: manuals/examples/layer-stress-test.md

Source Path: manuals/examples/layer-stress-test.md

# Color layer stress test

## Официальный кейс
- Slug: `layer-stress-test`
- Официальная страница: https://giro3d.org/latest/examples/layer-stress-test.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-stress-test.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-stress-test.js`

## Краткое описание (official)
Stress test a map with many color layers.

## Теги (official)
- `performance`
- `layer`
- `map`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-stress-test npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-stress-test.html
```html
---
title: Color layer stress test
shortdesc: Stress test a map with many color layers.
tags: [performance, layer, map]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>

        <div class="card-body">
            <div class="mb-3">
                <label for="layerCount" class="form-label">Color layer count</label>
                <div class="input-group">
                    <input
                        type="number"
                        min="0"
                        max="100"
                        autocomplete="off"
                        value="8"
                        class="form-control"
                        id="layerCount"
                    />
                </div>
            </div>

            <div class="form-check form-switch mb-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    autocomplete="off"
                    role="switch"
                    id="forceAtlases"
                />
                <label class="form-check-label" for="forceAtlases">Force texture atlases</label>
            </div>

            <button type="button" class="btn btn-primary" id="build">Generate</button>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-stress-test.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Color, MathUtils } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import DebugSource from '@giro3d/giro3d/sources/DebugSource.js';

import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

instance.view.camera.position.set(0, 0, 25000000);

const controls = new MapControls(instance.view.camera, instance.domElement);

instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

function createColorLayer() {
    const source = new DebugSource({
        color: new Color().setHSL(Math.random(), 0.5, 0.5),
        extent,
        subdivisions: MathUtils.randInt(1, 4),
    });

    return new ColorLayer({ extent, source, showTileBorders: true });
}

let layerCount = 8;
let forceTextureAtlases = false;
/** @type {Map} */
let map = null;

function buildMapAndLayers() {
    if (map) {
        for (const layer of map.getLayers()) {
            map.removeLayer(layer, { disposeLayer: true });
        }
        instance.remove(map);
    }

    map = new Map({ extent, forceTextureAtlases });

    instance.add(map);

    for (let i = 0; i < layerCount; i++) {
        map.addLayer(createColorLayer());
    }
}

bindSlider('layerCount', count => {
    layerCount = count;
});

bindToggle('forceAtlases', force => {
    forceTextureAtlases = force;
});

document.getElementById('build').onclick = () => buildMapAndLayers();
```

---

## Source: manuals/examples/layer-texture-filter.md

Source Path: manuals/examples/layer-texture-filter.md

# Layer texture filtering.

## Официальный кейс
- Slug: `layer-texture-filter`
- Официальная страница: https://giro3d.org/latest/examples/layer-texture-filter.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-texture-filter.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-texture-filter.js`

## Краткое описание (official)
Illustrates various texture filtering modes on layers.

## Теги (official)
- `layer`
- `texture`

## Атрибуция (official)
© EOX

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-texture-filter npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-texture-filter.html
```html
---
title: Layer texture filtering.
shortdesc: Illustrates various texture filtering modes on layers.
attribution: © <a target="_blank" href="https://eox.at/">EOX</a>
tags: [layer, texture]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-body">
            <div class="input-group">
                <span class="input-group-text flex-grow-1">Filter</span>
                <select class="btn btn-outline-primary btn-sm" id="filter" autocomplete="off">
                    <option selected value="linear">Linear filtering</option>
                    <option value="nearest">Nearest neighbour</option>
                </select>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-texture-filter.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { LinearFilter, NearestFilter, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindDropDown } from './widgets/bindDropDown.js';
import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    1818329.448,
    1987320.77,
    6062229.082,
    6231700.791,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 'black',
});

const center = new Vector3(1911960, 6130719, 2156);

instance.view.camera.position.set(center.x, center.y, center.z);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(center.x, center.y + 1, 0);
instance.view.setControls(controls);

const map = new Map({ extent, backgroundOpacity: 0 });

instance.add(map);

const source = new GeoTIFFSource({
    url: 'https://3d.oslandia.com/giro3d/rasters/TCI-YCbCr-mask.tif',
    crs: extent.crs,
});

/** @type {NearestFilter | LinearFilter} */
let filter = LinearFilter;

function run() {
    map.forEachLayer(layer => map.removeLayer(layer, { disposeLayer: true }));

    map.addLayer(
        new ColorLayer({
            source,
            minFilter: filter,
            magFilter: filter,
        }),
    );
}

Inspector.attach('inspector', instance);
StatusBar.bind(instance);

bindDropDown('filter', v => {
    switch (v) {
        case 'nearest':
            filter = NearestFilter;
            break;
        case 'linear':
            filter = LinearFilter;
            break;
    }

    run();
});

run();
```

---

## Source: manuals/examples/layer-update.md

Source Path: manuals/examples/layer-update.md

# Dynamic layer updates

## Официальный кейс
- Slug: `layer-update`
- Официальная страница: https://giro3d.org/latest/examples/layer-update.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layer-update.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layer-update.js`

## Краткое описание (official)
The layer is updated when the style changes.

## Теги (official)
- `vector`
- `geojson`
- `map`
- `layer`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layer-update npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layer-update.html
```html
---
title: Dynamic layer updates
shortdesc: The layer is updated when the style changes.
tags: [vector, geojson, map, layer]
---

<div class="side-pane-with-status-bar">
    <!-- Top color layer -->
    <div class="card">
        <div class="card-header">Options</div>

        <div class="card-body" id="top-options">
            <!-- Show point -->
            <div class="input-group my-2">
                <div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            checked
                            type="checkbox"
                            role="switch"
                            id="show-point"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="show-point">Show point</label>
                    </div>
                </div>
            </div>

            <!-- Show polygon -->
            <div class="input-group my-2">
                <div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            checked
                            type="checkbox"
                            role="switch"
                            id="show-polygon"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="show-polygon">Show polygon</label>
                    </div>
                </div>
            </div>

            <!-- Show line -->
            <div class="input-group my-2">
                <div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            checked
                            type="checkbox"
                            role="switch"
                            id="show-line"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="show-line">Show line</label>
                    </div>
                </div>
            </div>

            <!-- Stroke width -->
            <div class="input-group my-2">
                <label for="stroke-width" class="form-label">Stroke width</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="1"
                        step="1"
                        max="20"
                        value="5"
                        class="form-range"
                        id="stroke-width"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Point radius -->
            <div class="input-group my-2">
                <label for="point-radius" class="form-label">Point radius</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0.1"
                        step="0.05"
                        max="100"
                        value="20"
                        class="form-range"
                        id="point-radius"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Style opacity -->
            <div class="input-group my-2">
                <label for="style-opacity" class="form-label">Style opacity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        step="0.05"
                        max="1"
                        value="1"
                        class="form-range"
                        id="style-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>

            <hr />

            <!-- Randomize style -->
            <button type="button" class="btn btn-primary w-100" id="randomize">
                Randomize style
            </button>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/layer-update.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Feature } from 'ol';
import { LineString, Point, Polygon } from 'ol/geom.js';
import { Circle, Fill, Stroke, Style } from 'ol/style.js';
import { Color, MathUtils } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const extent = Extent.fromCenterAndSize(
    CoordinateSystem.epsg3857,
    { x: 11393552, y: 44035 },
    1000000,
    500000,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 'white',
});

const center = extent.centerAsVector3();
instance.view.camera.position.set(center.x, center.y - 1, 1000000);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.target = center;
controls.saveState();

instance.view.setControls(controls);

const map = new Map({ extent });
instance.add(map);

const fillColor = new Color('orange');
const strokeColor = new Color('red');

const image = new Circle({
    radius: 20,
    fill: new Fill({
        color: `#${fillColor.getHexString()}`,
    }),
    stroke: new Stroke({
        color: `#${strokeColor.getHexString()}`,
        width: 5,
    }),
});

const fill = new Fill({
    color: `#${fillColor.getHexString()}`,
});

const stroke = new Stroke({
    color: `#${strokeColor.getHexString()}`,
    width: 5,
});

let style = new Style({
    fill,
    stroke,
    image,
});

const polygon = new Feature(
    new Polygon([
        [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0],
        ],
    ]).transform('EPSG:4326', 'EPSG:3857'),
);

const line = new Feature(
    new LineString([
        [102.0, 0.0],
        [103.0, 1.0],
        [104.0, 0.0],
        [105.0, 1.0],
    ]).transform('EPSG:4326', 'EPSG:3857'),
);

const point = new Feature(new Point([102.0, 0.5]).transform('EPSG:4326', 'EPSG:3857'));

const source = new VectorSource({
    data: [],
    dataProjection: CoordinateSystem.epsg3857,
    style,
});

const layer = new ColorLayer({ source });

map.addLayer(layer);

StatusBar.bind(instance);

Inspector.attach('inspector', instance);

instance.notifyChange(map);

source.addFeatures([point, line, polygon]);

const [setStrokeWidth] = bindSlider('stroke-width', v => {
    style.getStroke().setWidth(v);

    const circle = /** @type {Circle} */ (style.getImage());

    circle.getStroke().setWidth(v);
    circle.setRadius(circle.getRadius());
    source.update();
});
const [setPointRadius] = bindSlider('point-radius', v => {
    const circle = /** @type {Circle} */ (style.getImage());

    circle.setRadius(v);
    style.setImage(style.getImage());
    source.update();
});

const toCssColor = (color, alpha) =>
    `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${alpha})`;

const [setOpacity] = bindSlider('style-opacity', v => {
    const circle = /** @type {Circle} */ (style.getImage());

    circle.getStroke().setColor(toCssColor(strokeColor, v));
    circle.getFill().setColor(toCssColor(fillColor, v));

    style.getStroke().setColor(toCssColor(strokeColor, v));
    style.getFill().setColor(toCssColor(fillColor, v));

    circle.setRadius(circle.getRadius());

    source.update();
});

bindToggle('show-line', v => {
    if (v) {
        source.addFeature(line);
    } else {
        source.removeFeature(line);
    }
    source.update();
});
bindToggle('show-polygon', v => {
    if (v) {
        source.addFeature(polygon);
    } else {
        source.removeFeature(polygon);
    }
    source.update();
});
bindToggle('show-point', v => {
    if (v) {
        source.addFeature(point);
    } else {
        source.removeFeature(point);
    }
    source.update();
});

bindButton('randomize', () => {
    strokeColor.r = MathUtils.randFloat(0, 1);
    strokeColor.g = MathUtils.randFloat(0, 1);
    strokeColor.b = MathUtils.randFloat(0, 1);

    fillColor.r = MathUtils.randFloat(0, 1);
    fillColor.g = MathUtils.randFloat(0, 1);
    fillColor.b = MathUtils.randFloat(0, 1);

    const pointRadius = MathUtils.randFloat(0.1, 20);
    const strokeWidth = MathUtils.randFloat(1, 20);
    const opacity = MathUtils.randFloat(0, 1);

    const newStyle = new Style({
        fill: new Fill({
            color: toCssColor(fillColor, opacity),
        }),
        stroke: new Stroke({
            color: toCssColor(strokeColor, opacity),
            width: strokeWidth,
        }),
        image: new Circle({
            radius: pointRadius,
            fill: new Fill({
                color: toCssColor(fillColor, opacity),
            }),
            stroke: new Stroke({
                color: toCssColor(strokeColor, opacity),
                width: strokeWidth,
            }),
        }),
    });

    setPointRadius(pointRadius);
    setStrokeWidth(strokeWidth);
    setOpacity(opacity);

    style = newStyle;

    // Here we test that setStyle() takes the new style into account
    // and that the layer is repainted.
    source.setStyle(newStyle);
});
```

---

## Source: manuals/examples/layouts.md

Source Path: manuals/examples/layouts.md

# Multiple instances in different layouts

## Официальный кейс
- Slug: `layouts`
- Официальная страница: https://giro3d.org/latest/examples/layouts.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/layouts.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/layouts.js`

## Краткое описание (official)
Display Giro3D scenes in with different layouts (flex, sticky, fixed, etc.).

## Теги (official)
- `layout`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=layouts npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/layouts.html
```html
---
title: Multiple instances in different layouts
shortdesc: Display Giro3D scenes in with different layouts (flex, sticky, fixed, etc.).
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [layout]
---

<!--
    In all examples we are using Bootstrap classes for styling.
    Here, we are using:
    - plain-old styles to show how to use different layouts,
    - Bootstrap classes and embedded <style> for pure styling (borders, padding, margin, backgrounds, etc.).
-->

<div id="legendSticky" style="position: sticky; z-index: 1021; top: 0" class="ps-2">
    Sticky position
</div>
<!-- A container must have a size (height+width), and can have any style applied-->
<div
    id="viewerDivSticky"
    style="position: sticky; z-index: 1020; top: 0; height: 300px; width: 100%"
    class="viewer p-2 border-bottom border-5 border-dark"
></div>

<div id="containerFlex" style="display: flex; align-items: stretch; height: 50vh" class="mt-5">
    <div id="legendNestedFlex" class="pt-2">Nested flex layouts</div>
    <!-- In flex display, a container can have a flex property instead of a size -->
    <div id="viewerDivNestedFlex1" style="flex: 1 1 auto" class="viewer ps-2 pe-2"></div>

    <!--
        In case you are using your own renderer, you are responsible for the layout, for instance:
        - a parent div to set the element size - this is were you would want to apply borders, padding, backgrounds, etc.
        - a viewport div that fills it parent and has "position: relative" and "overflow: hidden"
            - this is to ensure a correct sizing of the renderer when the parent div is resized
        - the div that will hold your renderer, that fills its parent
    -->
    <div style="min-width: 20vw; height: 100%" class="p-5 border border-3 border-dark">
        <div
            id="customViewDivContainer"
            style="position: relative; overflow: hidden; width: 100%; height: 100%"
        >
            <div
                id="customViewerDiv"
                style="width: 100%; height: 100%"
                class="viewer-custom-renderer"
            ></div>
        </div>
        <span class="position-absolute">Custom WebGL Renderer</span>
    </div>
</div>

<div id="legendOverflow" class="mt-5 ps-2">Overflow</div>
<!-- You can also have containers that are larger than the viewport -->
<div id="viewerDivOverflow" style="width: 100%; height: 200vh" class="viewer p-2"></div>

<!-- You can also have containers that are at fixed positions -->
<div
    id="viewerDivFixed"
    style="position: fixed; left: 0; bottom: 0; height: 200px; width: 50vw"
    class="viewer p-2 border border-3 border-dark"
></div>
<!-- Any Giro3D container can have overlays, as long as they are after in the DOM (or using z-index) -->
<span id="legendFixed" style="position: fixed; left: 0; bottom: 0" class="ps-2">
    Fixed position
</span>
```

#### Inlined: manuals/reference_info/giro3d/examples/layouts.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import StadiaMaps from 'ol/source/StadiaMaps.js';
import { WebGLRenderer } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const source = new TiledImageSource({
    source: new StadiaMaps({ layer: 'stamen_watercolor', wrapX: false }),
});

function buildViewer(target, defaultRenderer = true) {
    const instance = new Instance({
        target,
        crs: extent.crs,
        backgroundColor: null,
        renderer: defaultRenderer ? null : new WebGLRenderer({ antialias: true, alpha: true }),
    });

    const map = new Map({ extent, maxSubdivisionLevel: 10 });

    instance.add(map);

    map.addLayer(new ColorLayer({ source })).catch(e => console.error(e));

    instance.view.camera.position.set(0, 0, 25000000);

    const controls = new MapControls(instance.view.camera, instance.domElement);

    instance.view.setControls(controls);

    // Disable zoom so it doesn't capture scrolling
    controls.enableZoom = false;
}

// Remove the pre-generated default HTML elements for this example
document.getElementById('view').remove();
document.getElementById('inspector').remove();

// Dynamically find all viewers we have to build
const viewerDivs = document.getElementsByClassName('viewer');
for (let i = 0; i < viewerDivs.length; i += 1) {
    buildViewer(viewerDivs[i]);
}

// Dynamically find all viewers we have to build with custom WebGLRenderers
const viewerCustomRendererDivs = document.getElementsByClassName('viewer-custom-renderer');
for (let i = 0; i < viewerCustomRendererDivs.length; i += 1) {
    buildViewer(viewerCustomRendererDivs[i], false);
}
```

---

## Source: manuals/examples/lidar-hd.md

Source Path: manuals/examples/lidar-hd.md

# Pointcloud from IGN Lidar HD

## Официальный кейс
- Slug: `lidar-hd`
- Официальная страница: https://giro3d.org/latest/examples/lidar-hd.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/lidar-hd.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/lidar-hd.js`

## Краткое описание (official)
Display a point cloud from the Lidar HD project. Colorized with a WMS layer.

## Расширенное описание (official longdesc)
Giro3D is capable of displaying large point clouds. Lidar data can be converted into 3D Tiles using py3dtiles

## Теги (official)
- `point cloud`
- `3d tiles`
- `ign`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=lidar-hd npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/lidar-hd.html
```html
---
title: Pointcloud from IGN Lidar HD
shortdesc: Display a point cloud from the Lidar HD project. Colorized with a WMS layer.
longdesc: Giro3D is capable of displaying large point clouds. Lidar data can be converted into 3D Tiles using <a target="_blank" href="https://oslandia.gitlab.io/py3dtiles/">py3dtiles</a>
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: ['point cloud', '3d tiles', ign]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/lidar-hd.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { CubeTextureLoader, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const tmpVec3 = new Vector3();

const instance = new Instance({
    target: 'view',
    crs,
});

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

const pointcloud = new Tiles3D({
    url: 'https://3d.oslandia.com/lidar_hd/tileset.json',
    errorTarget: 15,
    pointCloudMode: MODE.TEXTURE,
});

// add pointcloud to scene
/**
 * @param {Tiles3D} entity
 */
function initializeCameraPosition(entity) {
    const bbox = entity.getBoundingBox();

    // configure camera
    instance.view.camera.far = 2.0 * bbox.getSize(tmpVec3).length();

    const ratio = bbox.getSize(tmpVec3).x / bbox.getSize(tmpVec3).z;
    const position = bbox.min
        .clone()
        .add(bbox.getSize(tmpVec3).multiply(new Vector3(0, 0, ratio * 0.5)));
    const lookAt = bbox.getCenter(tmpVec3);
    lookAt.z = bbox.min.z;
    instance.view.camera.position.set(position.x, position.y, position.z);
    instance.view.camera.lookAt(lookAt);
    controls.target.copy(lookAt);
    controls.saveState();

    // Let's build the color layer from the WMTS capabilities
    const url = 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';
    WmtsSource.fromCapabilities(url, {
        layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
    })
        .then(orthophotoWmts => {
            pointcloud.setColorLayer(
                new ColorLayer({
                    name: 'color',
                    extent: Extent.fromBox3(crs, bbox),
                    source: orthophotoWmts,
                }),
            );
        })
        .catch(console.error);

    instance.renderingOptions.enableEDL = true;
    instance.renderingOptions.enableInpainting = true;
    instance.renderingOptions.enablePointCloudOcclusion = true;

    // refresh scene
    instance.notifyChange(instance.view.camera);
}
instance.add(pointcloud).then(initializeCameraPosition);

// add a skybox background
const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('image/skyboxsun25deg_zup/');
const cubeTexture = cubeTextureLoader.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
]);

instance.scene.background = cubeTexture;

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/map-add-remove-layers.md

Source Path: manuals/examples/map-add-remove-layers.md

# Add / Remove layers

## Официальный кейс
- Slug: `map-add-remove-layers`
- Официальная страница: https://giro3d.org/latest/examples/map-add-remove-layers.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-add-remove-layers.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-add-remove-layers.js`

## Краткое описание (official)
Add and remove layers in a Map.

## Расширенное описание (official longdesc)
Use the `addLayer()` and `removeLayer()` methods to add and remove layers in a Map.

## Теги (official)
- `map`
- `wmts`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-add-remove-layers npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-add-remove-layers.html
```html
---
title: Add / Remove layers
shortdesc: Add and remove layers in a Map.
longdesc: Use the <a target="_blank" href="../apidoc/classes/entities.Map.html#addLayer"><code>addLayer()</code></a> and <a target="_blank" href="../apidoc/classes/entities.Map.html#removeLayer"><code>removeLayer()</code></a> methods to add and remove layers in a Map.
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [map, wmts]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <h5 class="card-header" style="width: 12rem">Add / Remove</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="tooltip"
            >?</span
        >

        <p class="card-text d-none" id="tooltip">Toggling a layer removes / adds it to the map.</p>

        <div class="card-body">
            <fieldset>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="plan"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="plan">Plan</label>
                </div>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="orthophotos"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="orthophotos">Orthophoto</label>
                </div>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="terrain"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="terrain">Terrain</label>
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-add-remove-layers.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const epsg2154 = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);
const extent = new Extent(epsg2154, -111629.52, 1275028.84, 5976033.79, 7230161.64);

const instance = new Instance({
    target: 'view',
    crs: epsg2154,
    backgroundColor: 'black',
});

const camPos = new Vector3(220295, 6810219, 409065);
instance.view.camera.position.set(camPos.x, camPos.y, camPos.z);

const controls = new MapControls(instance.view.camera, instance.domElement);
instance.view.setControls(controls);

controls.target.set(camPos.x, camPos.y + 1, 0);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    maxSubdivisionLevel: 13,
    lighting: {
        enabled: true,
        zFactor: 8,
    },
    terrain: false,
});
instance.add(map);

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

let layers = {};

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        const layer = new ColorLayer({
            name: 'orthophotos',
            extent: map.extent,
            source: orthophotoWmts,
        });
        layers['orthophotos'] = layer;
        layer.userData.zOrder = 0;
        map.addLayer(layer);
    })
    .catch(console.error);

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
})
    .then(planIgn => {
        const layer = new ColorLayer({
            name: 'plan',
            extent: map.extent,
            source: planIgn,
            opacity: 0.2,
        });
        layers['plan'] = layer;
        layer.userData.zOrder = 1;
        map.addLayer(layer);
    })
    .catch(console.error);

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue: -1000,
})
    .then(elevationWmts => {
        const layer = new ElevationLayer({
            name: 'terrain',
            extent: map.extent,
            resolutionFactor: 1 / 4,
            minmax: { min: 0, max: 5000 },
            noDataOptions: {
                replaceNoData: false,
            },
            source: elevationWmts,
        });
        layers['terrain'] = layer;
        map.addLayer(layer);
    })
    .catch(console.error);

function bindLayerToggle(layerName) {
    bindToggle(layerName, state => {
        if (state) {
            map.addLayer(layers[layerName]);
        } else {
            map.removeLayer(layers[layerName]);
        }
        // @ts-expect-error untyped zOrder
        map.sortColorLayers((a, b) => a.userData.zOrder - b.userData.zOrder);
        instance.notifyChange(map);
    });
}

bindLayerToggle('terrain');
bindLayerToggle('plan');
bindLayerToggle('orthophotos');

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/map-arbitrary-extent.md

Source Path: manuals/examples/map-arbitrary-extent.md

# Arbitrary map extents

## Официальный кейс
- Slug: `map-arbitrary-extent`
- Официальная страница: https://giro3d.org/latest/examples/map-arbitrary-extent.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-arbitrary-extent.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-arbitrary-extent.js`

## Краткое описание (official)
Create maps with arbitrary extents.

## Расширенное описание (official longdesc)
Map extents can be of any size. They will be subdivided into tiles accordingly.

## Теги (official)
- `map`
- `tiles`
- `xyz`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-arbitrary-extent npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-arbitrary-extent.html
```html
---
title: Arbitrary map extents
shortdesc: Create maps with arbitrary extents.
longdesc: Map extents can be of any size. They will be subdivided into tiles accordingly.
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [map, tiles, xyz]
---

<div class="side-pane-with-status-bar">
    <button class="btn btn-primary" id="createMap">Create new map</button>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-arbitrary-extent.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import StadiaMaps from 'ol/source/StadiaMaps.js';
import { MathUtils, Object3D, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import Helpers from '@giro3d/giro3d/helpers/Helpers.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindButton } from './widgets/bindButton.js';
import StatusBar from './widgets/StatusBar.js';

const EPSG3857_BOUNDS = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

let currentMap;

const instance = new Instance({
    target: 'view',
    crs: EPSG3857_BOUNDS.crs,
    backgroundColor: 0x0a3b59,
});

instance.view.camera.position.set(0, 0, 100000000);

const controls = new MapControls(instance.view.camera, instance.domElement);
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

instance.notifyChange();

const layers = ['stamen_watercolor', 'stamen_toner', 'stamen_terrain'];

let mapCount = 0;

// Create a grid that encompasses the whole EPSG:3857 bounds.
const grid = Helpers.createGrid(new Vector3(0, 0, -10000), EPSG3857_BOUNDS.dimensions().x, 20);
instance.threeObjects.add(grid);

function createMap(extent) {
    if (currentMap) {
        instance.remove(currentMap);
        currentMap = null;
    }

    mapCount++;

    const object3d = new Object3D();

    currentMap = new Map({
        extent,
        maxSubdivisionLevel: 10,
        object3d,
        showOutline: true,
    });

    currentMap.name = `${mapCount}`;

    currentMap.object3d.position.set(0, 0, mapCount * 10000);

    instance.add(currentMap);

    // Adds an TMS imagery layer
    const layer = layers[mapCount % layers.length];
    currentMap
        .addLayer(
            new ColorLayer({
                name: 'osm',
                extent,
                source: new TiledImageSource({ source: new StadiaMaps({ layer, wrapX: false }) }),
            }),
        )
        .catch(e => console.error(e));

    instance.notifyChange();
}

bindButton('createMap', () => {
    const dimensions = EPSG3857_BOUNDS.dimensions();

    const width = MathUtils.randFloat(dimensions.width * 0.5, dimensions.width * 0.1);
    const height = MathUtils.randFloat(dimensions.height * 0.5, dimensions.height * 0.1);
    const x = MathUtils.randFloat(-dimensions.width / 2, +dimensions.width / 2);
    const y = MathUtils.randFloat(-dimensions.height / 2, +dimensions.height / 2);

    const extent = Extent.fromCenterAndSize(
        CoordinateSystem.epsg3857,
        { x, y },
        width,
        height,
    ).intersect(EPSG3857_BOUNDS);

    createMap(extent);
});

StatusBar.bind(instance);
```

---

## Source: manuals/examples/map-contour-lines.md

Source Path: manuals/examples/map-contour-lines.md

# Contour lines

## Официальный кейс
- Slug: `map-contour-lines`
- Официальная страница: https://giro3d.org/latest/examples/map-contour-lines.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-contour-lines.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-contour-lines.js`

## Краткое описание (official)
Use contour lines to display elevation levels.

## Расширенное описание (official longdesc)
Contour lines can be enabled on Map entities to visualize relief. Change line intervals, opacity, thickness and color, as well as opacity. Note that on very flat surfaces, contour lines can produce artifacts where their displayed thickness is greater than desired.

## Теги (official)
- `map`
- `elevation`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-contour-lines npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-contour-lines.html
```html
---
title: Contour lines
shortdesc: Use contour lines to display elevation levels.
longdesc: Contour lines can be enabled on Map entities to visualize relief. Change line intervals, opacity, thickness and color, as well as opacity. Note that on very flat surfaces, contour lines can produce artifacts where their displayed thickness is greater than desired.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [map, elevation]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="contourLineCheckbox"
                    autocomplete="off"
                />
                <label class="form-check-label" for="contourLineCheckbox">Contour lines</label>
            </div>
        </div>

        <div class="card-body">
            <fieldset class="container" id="options">
                <div class="input-group my-2">
                    <span class="input-group-text flex-grow-1">Main interval (m)</span>
                    <select
                        class="btn btn-outline-primary btn-sm"
                        id="mainInterval"
                        autocomplete="off"
                    >
                        <option value="0">Disabled</option>
                        <option selected value="100">100 m</option>
                        <option value="200">200 m</option>
                        <option value="400">400 m</option>
                    </select>
                </div>

                <div class="input-group my-2">
                    <span class="input-group-text flex-grow-1">Secondary interval (m)</span>
                    <select
                        class="btn btn-outline-primary btn-sm"
                        id="secondaryInterval"
                        autocomplete="off"
                    >
                        <option value="0">Disabled</option>
                        <option selected value="10">10 m</option>
                        <option selected value="20">20 m</option>
                        <option value="50">50 m</option>
                    </select>
                </div>

                <label for="opacitySlider" class="form-label">Opacity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        value="1"
                        step="0.05"
                        class="form-range"
                        id="opacitySlider"
                        autocomplete="off"
                    />
                </div>

                <label for="thicknessSlider" class="form-label">Thickness</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="2"
                        value="1"
                        step="0.05"
                        class="form-range"
                        id="thicknessSlider"
                        autocomplete="off"
                    />
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-contour-lines.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import XYZ from 'ol/source/XYZ.js';
import { Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import GeoTIFFFormat from '@giro3d/giro3d/formats/GeoTIFFFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const x = -13602000;
const y = 5812000;
const halfWidth = 2500;

const extent = new Extent(
    CoordinateSystem.epsg3857,
    x - halfWidth,
    x + halfWidth,
    y - halfWidth,
    y + halfWidth,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

const map = new Map({
    extent,
    lighting: {
        enabled: true,
        hillshadeIntensity: 0.5,
    },
    side: DoubleSide,
    backgroundColor: 'white',
    contourLines: true,
});

instance.add(map);

const source = new TiledImageSource({
    source: new XYZ({
        minZoom: 10,
        maxZoom: 16,
        url: 'https://3d.oslandia.com/dem/MtStHelens-tiles/{z}/{x}/{y}.tif',
    }),
    format: new GeoTIFFFormat(),
});

const floor = 1100;
const ceiling = 2500;

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));

const dem = new ElevationLayer({
    name: 'dem',
    source,
    extent,
    colorMap: new ColorMap({ colors, min: floor, max: ceiling, mode: ColorMapMode.Elevation }),
});

map.addLayer(dem);

instance.view.camera.position.set(-13594700, 5819700, 7300);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.target.set(-13603000, 5811000, 0);

instance.view.setControls(controls);

instance.notifyChange();

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

bindToggle('contourLineCheckbox', state => {
    if (state) {
        document.getElementById('options').removeAttribute('disabled');
    } else {
        document.getElementById('options').setAttribute('disabled', 'disabled');
    }
    map.contourLines.enabled = state;
    instance.notifyChange(map);
});

bindNumericalDropDown('mainInterval', v => {
    map.contourLines.interval = v;
    instance.notifyChange(map);
});
bindNumericalDropDown('secondaryInterval', v => {
    map.contourLines.secondaryInterval = v;
    instance.notifyChange(map);
});
bindSlider('opacitySlider', v => {
    map.contourLines.opacity = v;
    instance.notifyChange(map);
});
bindSlider('thicknessSlider', v => {
    map.contourLines.thickness = v;
    instance.notifyChange(map);
});
```

---

## Source: manuals/examples/map-elevation-profile.md

Source Path: manuals/examples/map-elevation-profile.md

# Elevation profile

## Официальный кейс
- Slug: `map-elevation-profile`
- Официальная страница: https://giro3d.org/latest/examples/map-elevation-profile.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-elevation-profile.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-elevation-profile.js`

## Краткое описание (official)
Create an elevation profile using a Map and a path.

## Расширенное описание (official longdesc)
Use the `getElevation()` method to sample the elevation at a given coordinate. The elevation profile chart is built with Chart.js. Keep in mind, however, that the accuracy of the profile will depend on the currently loaded data, which in turns depend on the position of the camera. The closer the camer is to a certain point, the better the resolution will be around this point.

## Теги (official)
- `map`
- `terrain`
- `profile`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-elevation-profile npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-elevation-profile.html
```html
---
title: Elevation profile
shortdesc: Create an elevation profile using a Map and a path.
longdesc: Use the <a target="_blank" href="../apidoc/classes/entities.Map.html#getElevation"><code>getElevation()</code></a> method to sample the elevation at a given coordinate. The elevation profile chart is built with <a href="https://www.chartjs.org/" target="_blank">Chart.js</a>. Keep in mind, however, that the accuracy of the profile will depend on the currently loaded data, which in turns depend on the position of the camera. The closer the camer is to a certain point, the better the resolution will be around this point.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
dependencies: [colormap, 'chart.js']
tags: [map, terrain, profile]
---

<div class="side-pane-with-status-bar pe-none">
    <div class="card pe-auto">
        <h5 class="card-header">Options</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="pickingHelper"
            >?</span
        >
        <p class="card-text d-none" id="pickingHelper">
            Clik on the <b>Create profile</b> button to draw a path on the map. Use right-click to
            complete the drawing.
        </p>

        <div class="card-body">
            <div class="form-check form-switch mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked
                    role="switch"
                    id="showColorLayer"
                    autocomplete="off"
                />
                <label class="form-check-label" for="showColorLayer">Show color layer</label>
            </div>

            <div class="form-check form-switch mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="showLength"
                    autocomplete="off"
                />
                <label class="form-check-label" for="showLength">Show line length</label>
            </div>

            <!-- Sample count -->
            <div class="mb-3">
                <div class="input-group" style="width: 12rem">
                    <input
                        id="sampleCount"
                        type="number"
                        min="2"
                        max="1000"
                        value="200"
                        class="form-control"
                    />
                    <span class="input-group-text">samples</span>
                </div>
            </div>

            <!-- Start elevation profile -->
            <button type="button" class="w-100 btn btn-primary" id="start">
                <i class="bi bi-graph-up"></i>
                Create profile
            </button>
        </div>
    </div>
</div>

<div
    class="bg-body"
    id="chartContainer"
    style="
        display: none;
        position: absolute;
        left: 0;
        bottom: 1.3rem;
        width: 100%;
        height: 15rem;
        padding: 1rem;
    "
>
    <button type="button" class="btn-close" id="closeChart" aria-label="Close"></button>

    <!-- The canvas that will host the chart -->
    <canvas id="profileChart" style="width: 100%; height: 15rem"></canvas>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-elevation-profile.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import * as ChartJS from 'chart.js';
import { CurvePath, DoubleSide, LineCurve, Vector2, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Shape from '@giro3d/giro3d/entities/Shape.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import DrawTool from '@giro3d/giro3d/interactions/DrawTool.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const epsg2154 = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const extent = Extent.fromCenterAndSize(epsg2154, { x: 674_675, y: 6_442_569 }, 30_000, 30_000);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

const map = new Map({
    extent,
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
    side: DoubleSide,
    backgroundColor: 'white',
});

instance.add(map);

const noDataValue = -1000;

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                extent: map.extent,
                minmax: { min: 0, max: 5000 },
                noDataOptions: {
                    replaceNoData: false,
                },
                colorMap: new ColorMap({
                    colors: makeColorRamp('bathymetry'),
                    min: 500,
                    max: 1800,
                }),
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

let colorLayer;

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        colorLayer = new ColorLayer({
            extent: map.extent,
            source: orthophotoWmts,
        });

        map.addLayer(colorLayer);
    })
    .catch(console.error);

const center = extent.centerAsVector2();

instance.view.camera.position.set(center.x - 4000, center.y - 4000, 7300);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target.set(center.x, center.y, 300);
instance.view.setControls(controls);

// We use the DrawTool to draw the path on the map.
const measureTool = new DrawTool({ instance });

// The 3D line that will follow the elevation profile
const measure = new Shape({
    name: 'profile',
    showVertices: false,
    showLine: true,
    vertexRadius: 3,
});
measure.renderOrder = 10;

instance.add(measure);

function updateMarkers(points) {
    measure.setPoints(points);
}

let currentChart;

/** @type {HTMLCanvasElement} */
// @ts-expect-error conversion
const canvas = document.getElementById('profileChart');
const chartContainer = document.getElementById('chartContainer');

const canvasHeight = canvas.clientHeight;
const canvasWidth = canvas.clientWidth;

function updateProfileChart(points) {
    ChartJS.Chart.register(
        ChartJS.LinearScale,
        ChartJS.LineController,
        ChartJS.PointElement,
        ChartJS.LineElement,
        ChartJS.Title,
        ChartJS.Legend,
        ChartJS.Filler,
    );

    const data = [];
    let distance = 0;

    // Let's process our datapoints.
    // On the X axis, we will have the horizontal distance along the curve.
    // On the Y axis, we will have the elevations.
    for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (i > 0) {
            const prev = new Vector2(points[i - 1].x, points[i - 1].y);
            const curr = new Vector2(points[i].x, points[i].y);

            distance += Math.round(curr.distanceTo(prev));
        }

        data.push({ x: distance, y: pt.z });
    }

    const dataset = {
        label: 'Profile',
        data,
        fill: true,
        borderWidth: 3,
        pointRadius: 0,
        backgroundColor: '#2978b430',
        borderColor: '#2978b480',
        yAxisID: 'y',
    };

    currentChart?.destroy();

    // Let's build our elevation profile chart.
    const chart = new ChartJS.Chart(canvas, {
        type: 'line',
        data: {
            datasets: [dataset],
        },
        options: {
            parsing: false,
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: canvasWidth / canvasHeight,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Elevation profile',
                },
            },
            scales: {
                x: {
                    display: true,
                    bounds: 'data',
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'horizontal distance (meters)',
                    },
                },
                y: {
                    bounds: 'ticks',
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'elevation (meters)',
                    },
                },
            },
        },
    });

    currentChart = chart;

    chartContainer.style.display = 'block';
}

function computeElevationProfile() {
    // We first start by drawing a LineString on the map.
    return measureTool.createLineString().then(lineString => {
        if (lineString == null) {
            return;
        }

        const start = performance.now();

        // Then we need to sample this line according to the number of samples
        // selected by the user. We are using a THREE.js CurvePath for that.
        /** @type {CurvePath<Vector2>} */
        const path = new CurvePath();

        const vertices = lineString.points;

        // For each pair of coordinates, we create a linearly interpolated curve
        for (let i = 0; i < vertices.length - 1; i++) {
            const v0 = vertices[i];
            const v1 = vertices[i + 1];

            const line = new LineCurve(new Vector2(v0.x, v0.y), new Vector2(v1.x, v1.y));

            path.add(line);
        }

        // And then we sample this curve to have our evenly spaced points
        // @ts-expect-error conversion
        const sampleCount = document.getElementById('sampleCount').valueAsNumber;
        const points = path.getSpacedPoints(sampleCount - 1);

        const chartPoints = [];

        for (const point of points) {
            const coordinates = new Coordinates(extent.crs, point.x, point.y, 0);

            // Get the elevation for our current coordinate
            const result = map.getElevation({ coordinates });

            // Elevation sampling can return zero or more samples:
            // - Zero sample happens if the coordinate is outside the map's extent
            //   or if no data has been loaded yet.
            // - More than one sample happens because the samples are taken from map tiles, and
            //   they are organized in a hierarchical grid, where parent tiles overlap their children.
            if (result.samples.length > 0) {
                // Let's sort the samples to get the highest resolution sample first
                result.samples.sort((a, b) => a.resolution - b.resolution);

                const elevation = result.samples[0].elevation;

                // Let's populate or list of data points.
                chartPoints.push(new Vector3(point.x, point.y, elevation));
            }
        }

        updateMarkers(chartPoints);
        updateProfileChart(chartPoints);

        // Remove the temporary line
        instance.remove(lineString);

        instance.notifyChange();

        const end = performance.now();
        console.log(`elapsed: ${(end - start).toFixed(1)} ms`);
    });
}

bindButton('start', button => {
    button.disabled = true;

    computeElevationProfile().then(() => {
        button.disabled = false;
    });
});
bindButton('closeChart', () => {
    chartContainer.style.display = 'none';
});

Inspector.attach('inspector', instance);
StatusBar.bind(instance);

const parameters = {
    showLineLabel: false,
};

bindToggle('showLength', v => {
    parameters.showLineLabel = v;
    measure.showLineLabel = v;
});
bindToggle('showColorLayer', v => {
    colorLayer.visible = v;
    instance.notifyChange(map);
});

const hoveredPoint = new Shape({
    name: 'hovered-point',
    vertexRadius: 6,
    showVertexLabels: true,
    vertexLabelFormatter: ({ position }) => {
        return `${position.z.toFixed(0)}m`;
    },
});
hoveredPoint.setPoints([new Vector3()]);
hoveredPoint.renderOrder = measure.renderOrder + 2;
hoveredPoint.color = measure.color;
hoveredPoint.visible = false;

const markerHtmlElement = document.createElement('div');
markerHtmlElement.style.paddingBottom = '4rem';
const span = document.createElement('span');
span.classList.value = 'badge rounded-pill text-bg-primary';
span.innerText = '?';
markerHtmlElement.appendChild(span);

const hoveredLabel = new CSS2DObject(markerHtmlElement);

hoveredPoint.object3d.add(hoveredLabel);

instance.add(hoveredPoint);

function pick(ev) {
    const pickedList = instance.pickObjectsAt(ev);
    hoveredPoint.visible = false;
    hoveredLabel.visible = false;

    measure.showLineLabel = parameters.showLineLabel;

    if (pickedList && pickedList.length > 0) {
        for (const picked of pickedList) {
            if (picked.entity === measure) {
                measure.showLineLabel = false;

                const { point } = measure.getClosestPointOnLine(picked.point);

                hoveredPoint.updatePoint(0, point);

                hoveredPoint.visible = true;
                hoveredLabel.visible = true;

                break;
            }
        }
    }

    instance.notifyChange();
}

instance.domElement.addEventListener('mousemove', pick);
```

---

## Source: manuals/examples/map-elevation-ranges.md

Source Path: manuals/examples/map-elevation-ranges.md

# Elevation ranges

## Официальный кейс
- Slug: `map-elevation-ranges`
- Официальная страница: https://giro3d.org/latest/examples/map-elevation-ranges.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-elevation-ranges.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-elevation-ranges.js`

## Краткое описание (official)
Limit the display of a color layer or a map within an elevation range.

## Расширенное описание (official longdesc)
By passing the `elevationRange` option to the `ColorLayer` and/or `Map` constructor, you can limit the visibility of this layer/map within this range. A possible use case is to limit the display of a satellite layer above the sea level, then limit the display of a bathymetry dataset below the sea level.

## Теги (official)
- `map`
- `layer`
- `clipping`
- `elevation range`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-elevation-ranges npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-elevation-ranges.html
```html
---
title: Elevation ranges
shortdesc: Limit the display of a color layer or a map within an elevation range.
longdesc: By passing the <code>elevationRange</code> option to the <a href="../apidoc/classes/core.layer.ColorLayer.html" target="_blank"><code>ColorLayer</code></a> and/or <a href="../apidoc/classes/entities.Map.html" target="_blank"><code>Map</code></a> constructor, you can limit the visibility of this layer/map within this range. A possible use case is to limit the display of a satellite layer above the sea level, then limit the display of a bathymetry dataset below the sea level.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
dependencies: ['colormap']
tags: [map, layer, clipping, 'elevation range']
---

<div class="side-pane-with-status-bar">
    <div class="mh-100 overflow-y-auto">
        <div class="card mb-1">
            <div class="card-header">Per-map range</div>
            <fieldset class="container card-body" id="options">
                <label for="mapMin" class="form-label">Lower bound</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="500"
                        max="3000"
                        value="500"
                        class="form-range"
                        id="mapMin"
                        autocomplete="off"
                    />
                </div>

                <div class="my-2"></div>

                <label for="mapMax" class="form-label">Upper bound</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="500"
                        max="3000"
                        value="3000"
                        class="form-range"
                        id="mapMax"
                        autocomplete="off"
                    />
                </div>
            </fieldset>
        </div>

        <div class="card mb-1">
            <div class="card-header">Per-layer range (color layer only)</div>
            <fieldset class="container card-body" id="options">
                <!-- Toggle elevation range feature -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="toggle-colorlayer-range"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="toggle-colorlayer-range"
                        >Enable elevation range</label
                    >
                </div>

                <label for="layerMin" class="form-label">Lower bound</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="500"
                        max="3000"
                        value="500"
                        class="form-range"
                        id="layerMin"
                        autocomplete="off"
                    />
                </div>

                <div class="my-2"></div>

                <label for="layerMax" class="form-label">Upper bound</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="500"
                        max="3000"
                        value="3000"
                        class="form-range"
                        id="layerMax"
                        autocomplete="off"
                    />
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-elevation-ranges.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const center = { x: -13601505, y: 5812315 };

const extent = Extent.fromCenterAndSize(CoordinateSystem.epsg3857, center, 20000, 20000);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

const map = new Map({
    extent,
    elevationRange: { min: 500, max: 3000 },
});

instance.add(map);

const colorRamp = makeColorRamp('viridis');

const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';
// Adds a XYZ elevation layer with MapBox terrain RGB tileset
const elevationLayer = new ElevationLayer({
    name: 'xyz_elevation',
    extent,
    source: new TiledImageSource({
        format: new MapboxTerrainFormat(),
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
            projection: extent.crs.id,
            crossOrigin: 'anonymous',
        }),
    }),
    colorMap: new ColorMap({ colors: colorRamp, min: 700, max: 2500 }),
});
map.addLayer(elevationLayer);

// Adds a XYZ color layer with MapBox satellite tileset
const colorLayer = new ColorLayer({
    name: 'xyz_color',
    extent,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
            projection: extent.crs.id,
            crossOrigin: 'anonymous',
        }),
    }),
    elevationRange: { min: 500, max: 3000 },
});
map.addLayer(colorLayer);

// Sets the camera position
instance.view.camera.position.set(-13615016, 5835706, 14797);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = new Vector3(-13603869, 5814829, 0);
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

let colorLayerRange = colorLayer.elevationRange;

bindToggle('toggle-colorlayer-range', enabled => {
    if (enabled) {
        colorLayer.elevationRange = colorLayerRange;
    } else {
        colorLayer.elevationRange = null;
    }

    // @ts-expect-error typing
    document.getElementById('layerMin').disabled = !enabled;
    // @ts-expect-error typing
    document.getElementById('layerMax').disabled = !enabled;

    instance.notifyChange(map);
});

bindSlider('mapMin', v => {
    map.elevationRange.min = v;
    instance.notifyChange(map);
});
bindSlider('mapMax', v => {
    map.elevationRange.max = v;
    instance.notifyChange(map);
});
bindSlider('layerMin', v => {
    colorLayer.elevationRange = { min: v, max: colorLayer.elevationRange.max };
    colorLayerRange = colorLayer.elevationRange;
    instance.notifyChange(map);
});
bindSlider('layerMax', v => {
    colorLayer.elevationRange = { min: colorLayer.elevationRange.min, max: v };
    colorLayerRange = colorLayer.elevationRange;
    instance.notifyChange(map);
});
```

---

## Source: manuals/examples/map-opacity.md

Source Path: manuals/examples/map-opacity.md

# Types of opacity

## Официальный кейс
- Slug: `map-opacity`
- Официальная страница: https://giro3d.org/latest/examples/map-opacity.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-opacity.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-opacity.js`

## Краткое описание (official)
Illustrates various types of opacity (map, map background, and layer)

## Теги (official)
- `map`
- `layer`
- `opacity`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-opacity npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-opacity.html
```html
---
title: Types of opacity
shortdesc: Illustrates various types of opacity (map, map background, and layer)
tags: [map, layer, opacity]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-body">
            <!-- Map global opacity -->
            <label for="map-opacity" class="form-label">Map opacity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.05"
                    class="form-range"
                    id="map-opacity"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Map background opacity -->
            <label for="bg-opacity" class="form-label">Map background opacity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.05"
                    class="form-range"
                    id="bg-opacity"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Blue layer opacity -->
            <label for="blue-opacity" class="form-label">Blue layer opacity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.05"
                    class="form-range"
                    id="blue-opacity"
                    autocomplete="off"
                />
            </div>

            <div class="my-2"></div>

            <!-- Red layer opacity -->
            <label for="red-opacity" class="form-label">Red layer opacity</label>
            <div class="input-group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.05"
                    class="form-range"
                    id="red-opacity"
                    autocomplete="off"
                />
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-opacity.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { Fill, Style } from 'ol/style.js';
import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindSlider } from './widgets/bindSlider';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -4553934 - 1000000,
    -4553934 + 1000000,
    -3910697 - 1000000,
    -3910697 + 1000000,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

instance.view.camera.position.set(-4553934, -3910697, 4600000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = new Vector3(-4553934, -3910696, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
instance.view.setControls(controls);

const map = new Map({ extent, backgroundColor: 'green' });

instance.add(map);

const rectangle = {
    type: 'Feature',
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [-46, -30],
                [-41, -30],
                [-41, -35],
                [-46, -35],
                [-46, -30],
            ],
        ],
    },
};

const triangle = {
    type: 'Feature',
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [-45, -31],
                [-39, -31],
                [-39, -35],
                [-45, -31],
            ],
        ],
    },
};

function makeGeoJSONLayer(name, geojson, color) {
    const style = new Style({
        fill: new Fill({
            color,
        }),
    });
    const source = new VectorSource({
        data: {
            content: geojson,
            format: new GeoJSON(),
        },
        style,
        dataProjection: CoordinateSystem.epsg4326,
    });
    const layer = new ColorLayer({
        name,
        extent,
        source,
    });
    return layer;
}

const redSquare = makeGeoJSONLayer('redSquare', rectangle, '#aa0000');
const blueTriangle = makeGeoJSONLayer('blueTriangle', triangle, '#0000aa');

map.addLayer(redSquare);
map.addLayer(blueTriangle);

Inspector.attach('inspector', instance);

instance.notifyChange(map);

// GUI
bindSlider('map-opacity', v => {
    map.opacity = v;
    instance.notifyChange(map);
});
bindSlider('bg-opacity', v => {
    map.backgroundOpacity = v;
    instance.notifyChange(map);
});
bindSlider('blue-opacity', v => {
    blueTriangle.opacity = v;
    instance.notifyChange(map);
});
bindSlider('red-opacity', v => {
    redSquare.opacity = v;
    instance.notifyChange(map);
});
```

---

## Source: manuals/examples/map-shadows.md

Source Path: manuals/examples/map-shadows.md

# Physical lights and shadow maps

## Официальный кейс
- Slug: `map-shadows`
- Официальная страница: https://giro3d.org/latest/examples/map-shadows.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-shadows.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-shadows.js`

## Краткое описание (official)
Illustrates the use of three.js physically accurate lights and shadows on <code>Map</code>s.

## Расширенное описание (official longdesc)
three.js lights and shadows can be used on Maps.

## Теги (official)
- `map`
- `terrain`
- `physical lighting`
- `shadow`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-shadows npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-shadows.html
```html
---
title: Physical lights and shadow maps
shortdesc: Illustrates the use of three.js physically accurate lights and shadows on <code>Map</code>s.
longdesc: three.js lights and shadows can be used on Maps.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
tags: [map, terrain, physical lighting, shadow]
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <!--Parameters -->
    <div class="card-body">
        <!-- Accordion -->
        <div class="accordion" id="accordion">
            <!-- Section: map -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-map"
                        aria-expanded="true"
                        aria-controls="section-map"
                    >
                        Options
                    </button>
                </h2>
                <div
                    id="section-map"
                    class="accordion-collapse collapse show p-3"
                    data-bs-parent="#accordion"
                >
                    <button type="button" id="reset" class="btn btn-warning w-100">
                        <i class="bi bi-trash"></i>
                        Reset scene
                    </button>

                    <button type="button" id="create-cube" class="btn btn-primary w-100 mt-2">
                        <i class="bi bi-box"></i>
                        Create cube
                    </button>

                    <!--  Shade color layers toggle -->
                    <div class="form-check form-switch mt-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked="true"
                            role="switch"
                            id="colorLayers"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="colorLayers">Shade color layers</label>
                    </div>

                    <!--  Show helpers -->
                    <div class="form-check form-switch mt-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="show-helpers"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="show-helpers">Show helpers</label>
                    </div>

                    <label for="opacity" class="form-label mt-2">Color layer opacity</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value="100"
                        class="form-range"
                        id="opacity"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Section: lights -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-lights"
                        aria-expanded="true"
                        aria-controls="section-lights"
                    >
                        Lights
                    </button>
                </h2>
                <div
                    id="section-lights"
                    class="accordion-collapse collapse show p-3"
                    data-bs-parent="#accordion"
                >
                    <!-- Shading mode -->
                    <div class="input-group">
                        <label class="input-group-text" for="mode">Shading model</label>
                        <select class="form-select" id="mode" autocomplete="off">
                            <option value="-1">Disabled</option>
                            <option value="0">Hillshading</option>
                            <option value="1" selected>Light-based</option>
                        </select>
                    </div>

                    <div id="shadingParams">
                        <!-- Azimuth slider -->
                        <label id="azimuth-label" for="azimuth" class="form-label mt-2"
                            >Azimuth: 315°</label
                        >
                        <input
                            type="range"
                            min="0"
                            max="360"
                            step="1"
                            value="315"
                            class="form-range"
                            id="azimuth"
                            autocomplete="off"
                        />

                        <!-- Zenith slider -->
                        <label id="zenith-label" for="zenith" class="form-label mt-2"
                            >Zenith: 45°</label
                        >
                        <input
                            type="range"
                            min="0.1"
                            step="1"
                            max="90"
                            value="45"
                            class="form-range"
                            id="zenith"
                            autocomplete="off"
                        />

                        <!-- Z-factor -->
                        <label for="zFactor" class="form-label mt-2">Z-factor</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value="1"
                            step="0.1"
                            class="form-range"
                            id="zFactor"
                            autocomplete="off"
                        />

                        <div id="simpleGroup">
                            <!-- Simple shading intensity -->
                            <label for="intensity" class="form-label">Shade opacity</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                value="1"
                                step="0.1"
                                class="form-range"
                                id="intensity"
                                autocomplete="off"
                            />
                        </div>

                        <!-- Group for light-based settings -->
                        <div id="realisticGroup">
                            <!-- Light type (only if realistic mode) -->
                            <div class="input-group mt-2">
                                <label class="input-group-text" for="light-type">Light type</label>
                                <select class="form-select" id="light-type" autocomplete="off">
                                    <option value="directional" selected>Directional</option>
                                    <option value="point">Point</option>
                                </select>
                            </div>

                            <!-- Directional light intensity -->
                            <div class="mt-2" id="directional-light-params">
                                <label for="directional-light-intensity" class="form-label"
                                    >Light intensity</label
                                >
                                <input
                                    type="number"
                                    min="0"
                                    max="99"
                                    step="0.01"
                                    value="3"
                                    class="form-control"
                                    id="directional-light-intensity"
                                    autocomplete="off"
                                />
                            </div>

                            <!-- Point light intensity -->
                            <div class="mt-2" id="point-light-params">
                                <label for="point-light-intensity" class="form-label"
                                    >Light intensity</label
                                >
                                <input
                                    type="number"
                                    min="0"
                                    max="20000000"
                                    step="1000"
                                    value="20000000"
                                    class="form-control"
                                    id="point-light-intensity"
                                    autocomplete="off"
                                />
                            </div>

                            <!-- Light color -->
                            <label for="color" class="form-label mt-2">Light color</label>
                            <input
                                type="color"
                                class="form-control form-control-color w-100"
                                id="color"
                                value="#ffffff"
                                title="color"
                            />

                            <!-- Ambient light intensity -->
                            <label for="ambient-intensity" class="form-label mt-2"
                                >Ambient intensity</label
                            >
                            <input
                                type="number"
                                min="0"
                                max="2"
                                step="0.5"
                                value="0.5"
                                class="form-control"
                                id="ambient-intensity"
                                autocomplete="off"
                            />

                            <!-- Ambient light color -->
                            <label for="ambient-color" class="form-label mt-2">Ambient color</label>
                            <input
                                type="color"
                                class="form-control form-control-color w-100"
                                id="ambient-color"
                                value="#ffffff"
                                title="color"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section: shadows -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-shadows"
                        aria-expanded="false"
                        aria-controls="section-shadows"
                    >
                        Shadows
                    </button>
                </h2>

                <div
                    id="section-shadows"
                    class="accordion-collapse collapse p-3"
                    data-bs-parent="#accordion"
                >
                    <div id="group-shadows">
                        <!--  Toggle shadows -->
                        <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                checked="true"
                                role="switch"
                                id="enable-shadows"
                                autocomplete="off"
                            />
                            <label class="form-check-label" for="enable-shadows"
                                >Enable shadows</label
                            >
                        </div>

                        <!-- Shadow type -->
                        <div class="input-group mt-2">
                            <label class="input-group-text" for="shadow-map-type"
                                >Shadow type</label
                            >

                            <select class="form-select" id="shadow-map-type" autocomplete="off">
                                <option value="0">BasicShadowMap</option>
                                <option value="1">PCFShadowMap</option>
                                <option value="2">PCFSoftShadowMap</option>
                                <option value="3" selected>VSMShadowMap</option>
                            </select>
                        </div>

                        <!-- Shadow map texture size -->
                        <label for="shadow-map-resolution" class="form-label mt-2"
                            >Texture size</label
                        >
                        <input
                            type="number"
                            min="64"
                            max="4096"
                            value="4096"
                            class="form-control"
                            id="shadow-map-resolution"
                            autocomplete="off"
                        />

                        <!-- Shadow map camera volume size (meters) -->
                        <label for="shadow-volume-size" class="form-label mt-2">Volume size</label>
                        <input
                            type="number"
                            min="100"
                            max="100000"
                            value="100000"
                            class="form-control"
                            id="shadow-volume-size"
                            autocomplete="off"
                        />

                        <!-- Shadow volume near plane -->
                        <label for="shadow-volume-near" class="form-label mt-2"
                            >Camera near plane</label
                        >
                        <input
                            type="number"
                            min="100"
                            max="100000"
                            value="5000"
                            class="form-control"
                            id="shadow-volume-near"
                            autocomplete="off"
                        />

                        <!-- Shadow volume near plane -->
                        <label for="shadow-volume-far" class="form-label mt-2"
                            >Camera far plane</label
                        >
                        <input
                            type="number"
                            min="100"
                            max="100000"
                            value="50000"
                            class="form-control"
                            id="shadow-volume-far"
                            autocomplete="off"
                        />

                        <!-- Shadow intensity -->
                        <label for="shadow-map-intensity" class="form-label mt-2">Intensity</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            value="1"
                            step="0.01"
                            class="form-range"
                            id="shadow-map-intensity"
                            autocomplete="off"
                        />

                        <!-- Shadow map bias -->
                        <label for="shadow-map-bias" class="form-label mt-2">Bias</label>
                        <input
                            type="number"
                            min="-0.01"
                            max="0.01"
                            step="0.0001"
                            value="-0.0001"
                            class="form-control"
                            id="shadow-map-bias"
                            autocomplete="off"
                        />

                        <!-- Shadow map normal bias -->
                        <label for="shadow-map-normal-bias" class="form-label mt-2"
                            >Normal bias</label
                        >
                        <input
                            type="number"
                            min="-10"
                            max="10"
                            step="0.1"
                            value="0"
                            class="form-control"
                            id="shadow-map-normal-bias"
                            autocomplete="off"
                        />
                    </div>

                    <div id="group-noshadows" style="display: none">
                        Shadows are only available in light-based shading mode
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-shadows.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import {
    AmbientLight,
    ArrowHelper,
    BasicShadowMap,
    BoxGeometry,
    CameraHelper,
    Color,
    DirectionalLight,
    DirectionalLightHelper,
    Mesh,
    MeshStandardMaterial,
    PointLight,
    PointLightHelper,
    Vector3,
    VSMShadowMap,
} from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Sun from '@giro3d/giro3d/core/geographic/Sun.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import { MapLightingMode } from '@giro3d/giro3d/entities/MapLightingOptions.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';
import { updateLabel } from './widgets/updateLabel.js';

const EXTENT_SIZE = 20_000;

const min = 1500;
const max = 2000;

// Monument Valley coordinates
const center = new Coordinates(CoordinateSystem.epsg4326, -110.08252, 36.98715)
    .as(CoordinateSystem.epsg3857)
    .toVector3();

const extent = Extent.fromCenterAndSize(
    CoordinateSystem.epsg3857,
    center,
    EXTENT_SIZE,
    EXTENT_SIZE,
);

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
    backgroundColor: null,
});

const map = new Map({
    extent,
    // Enables light-based shading on this map
    lighting: {
        enabled: true,
        mode: MapLightingMode.LightBased,
    },
    discardNoData: true,
    terrain: {
        segments: 64,
    },
    subdivisionThreshold: 1,
    backgroundColor: '#c0bfbc',
});

instance.add(map);

const northArrow = new ArrowHelper(
    new Vector3(0, 1, 0),
    new Vector3(center.x, extent.maxY + 500, min),
    EXTENT_SIZE * 0.5,
    'yellow',
    EXTENT_SIZE * 0.1,
    EXTENT_SIZE * 0.02,
);

instance.add(northArrow);

northArrow.updateMatrixWorld(true);

const token =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

const elevationLayer = new ElevationLayer({
    extent,
    preloadImages: true,
    minmax: { min, max },
    colorMap: new ColorMap({ colors: makeColorRamp('turbidity'), min, max }),
    source: new TiledImageSource({
        extent,
        format: new MapboxTerrainFormat(),
        source: new XYZ({
            projection: 'EPSG:3857',
            url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${token}`,
        }),
    }),
});
map.addLayer(elevationLayer).catch(console.error);

const colorLayer = new ColorLayer({
    extent,
    preloadImages: true,
    source: new TiledImageSource({
        extent,
        source: new XYZ({
            projection: 'EPSG:3857',
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${token}`,
        }),
    }),
});
map.addLayer(colorLayer).catch(console.error);

instance.view.camera.position.set(-12254256, 4417664, 9400);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target.set(center.x, center.y, 1600);
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

// Light & shadow management
const lightParams = {
    zenith: 45,
    azimuth: 315,
    shadowBias: -0.0001,
    normalBias: 0,
    /** @type {number} */
    shadowMapType: VSMShadowMap,
    enableShadows: true,
    /** @type {'directional' | 'point'} */
    lightType: 'directional',
    shadowIntensity: 1,
    distance: EXTENT_SIZE * 4,
    directionalLightIntensity: 3,
    pointLightIntensity: 20000000,
    ambientIntensity: 0.5,
    shadowVolumeSize: EXTENT_SIZE,
    shadowVolumeNear: 50000,
    shadowVolumeFar: 150000,
    shadowMapResolution: 512,
    color: new Color('white'),
    ambientColor: new Color('white'),
    showHelpers: false,
};

instance.renderer.shadowMap.enabled = true;
instance.renderer.shadowMap.type = BasicShadowMap;

/** @type {DirectionalLight} */
let directionalLight;
/** @type {PointLight} */
let pointLight;
/** @type {PointLightHelper} */
let pointLightHelper;
/** @type {DirectionalLightHelper} */
let directionalLightHelper;
/** @type {CameraHelper} */
let shadowCameraHelper;

const ambientLight = new AmbientLight('#dbf1ff', 0.5);

instance.add(ambientLight);

const createLights = () => {
    if (directionalLight) {
        directionalLight.target.removeFromParent();
        directionalLight.dispose();
        directionalLight.removeFromParent();
    }

    if (directionalLightHelper) {
        directionalLightHelper.dispose();
        directionalLightHelper.removeFromParent();
    }

    if (shadowCameraHelper) {
        shadowCameraHelper.dispose();
        shadowCameraHelper.removeFromParent();
    }

    if (pointLight) {
        pointLight.dispose();
        pointLight.removeFromParent();
    }

    if (pointLightHelper) {
        pointLightHelper.dispose();
        pointLightHelper.removeFromParent();
    }

    directionalLight = new DirectionalLight(
        lightParams.color,
        lightParams.directionalLightIntensity,
    );

    instance.add(directionalLight);
    instance.add(directionalLight.target);

    directionalLight.name = 'sunlight';
    directionalLight.target.name = 'sunlight target';

    directionalLight.castShadow = true;
    directionalLight.position.set(center.x, center.y, lightParams.distance);
    directionalLight.target.position.set(center.x, center.y, 2200);

    const size = lightParams.shadowMapResolution;
    directionalLight.shadow.mapSize.set(size, size);

    directionalLight.shadow.bias = lightParams.shadowBias;
    directionalLight.shadow.normalBias = lightParams.normalBias;
    directionalLight.shadow.intensity = lightParams.shadowIntensity;

    // @ts-expect-error casting to number
    instance.renderer.shadowMap.type = lightParams.shadowMapType;

    directionalLight.shadow.camera.top = lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.bottom = -lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.left = -lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.right = lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.near = lightParams.shadowVolumeNear;
    directionalLight.shadow.camera.far = lightParams.shadowVolumeFar;

    directionalLight.updateMatrixWorld(true);
    directionalLight.target.updateMatrixWorld(true);

    directionalLight.shadow.updateMatrices(directionalLight);

    directionalLightHelper = new DirectionalLightHelper(directionalLight, 200, lightParams.color);
    instance.add(directionalLightHelper);

    shadowCameraHelper = new CameraHelper(directionalLight.shadow.camera);
    instance.add(shadowCameraHelper);

    pointLight = new PointLight(lightParams.color, 20_000_000, 4000);
    pointLight.castShadow = true;
    pointLight.shadow.bias = lightParams.shadowBias;
    pointLight.shadow.normalBias = lightParams.normalBias;
    pointLight.shadow.intensity = lightParams.shadowIntensity;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 10000;
    pointLight.shadow.mapSize.set(size, size);
    pointLight.position.set(center.x, center.y, min + 400);

    pointLight.updateMatrixWorld(true);

    pointLightHelper = new PointLightHelper(pointLight, 200, 'black');
    instance.add(pointLightHelper);
    pointLightHelper.updateMatrixWorld(true);

    instance.add(pointLight);

    updateLightsAndHelpers();
};

createLights();

// Example GUI

function updatePointLight() {
    pointLight.visible = lightParams.lightType === 'point';

    pointLight.intensity = lightParams.pointLightIntensity;
    pointLight.shadow.intensity = lightParams.shadowIntensity;
    pointLightHelper.visible = pointLight.visible && lightParams.showHelpers;

    instance.notifyChange();
}

function updateDirectionalLight() {
    const pos = Sun.getLocalPosition({
        point: center,
        zenith: lightParams.zenith,
        azimuth: lightParams.azimuth,
        distance: lightParams.distance,
    });

    directionalLight.position.copy(pos);

    directionalLight.updateMatrixWorld(true);
    directionalLight.target.updateMatrixWorld(true);

    directionalLight.shadow.bias = lightParams.shadowBias;
    directionalLight.shadow.normalBias = lightParams.normalBias;
    directionalLight.shadow.intensity = lightParams.shadowIntensity;

    directionalLight.shadow.camera.top = lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.bottom = -lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.left = -lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.right = lightParams.shadowVolumeSize;
    directionalLight.shadow.camera.near = lightParams.shadowVolumeNear;
    directionalLight.shadow.camera.far = lightParams.shadowVolumeFar;

    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLight.shadow.camera.updateMatrix();

    directionalLightHelper.update();
    directionalLightHelper.updateMatrixWorld(true);

    shadowCameraHelper.update();
    shadowCameraHelper.updateMatrixWorld(true);

    directionalLight.intensity = lightParams.directionalLightIntensity;

    directionalLight.visible = lightParams.lightType === 'directional';
    shadowCameraHelper.visible = directionalLight.visible && lightParams.showHelpers;
    directionalLightHelper.visible = directionalLight.visible && lightParams.showHelpers;

    instance.notifyChange();
}

function updateLightsAndHelpers() {
    updateDirectionalLight();
    updatePointLight();

    northArrow.visible = lightParams.showHelpers;

    instance.notifyChange();
}

const [setColorLayerToggle] = bindToggle('colorLayers', state => {
    map.lighting.elevationLayersOnly = !state;
    instance.notifyChange(map);
});

const [setAzimuth] = bindSlider('azimuth', azimuth => {
    map.lighting.hillshadeAzimuth = azimuth;
    lightParams.azimuth = azimuth;
    updateLightsAndHelpers();
    updateLabel('azimuth-label', `Azimuth: ${Math.round(azimuth)}°`);
    instance.notifyChange(map);
});

const [setZenith] = bindSlider('zenith', zenith => {
    map.lighting.hillshadeZenith = zenith;
    lightParams.zenith = zenith;
    updateLightsAndHelpers();
    updateLabel('zenith-label', `Zenith: ${Math.round(zenith)}°`);
    instance.notifyChange(map);
});

const [setLightColor] = bindColorPicker('color', v => {
    lightParams.color = new Color(v);
    directionalLight.color = lightParams.color;
    pointLight.color = lightParams.color;
    instance.notifyChange();
});

const [setAmbientColor] = bindColorPicker('ambient-color', v => {
    lightParams.ambientColor = new Color(v);
    ambientLight.color = lightParams.ambientColor;
    instance.notifyChange();
});

const [setShadowMapResolution] = bindSlider('shadow-map-resolution', size => {
    lightParams.shadowMapResolution = size;

    createLights();

    instance.notifyChange();
});

const [setShadowMapBias] = bindSlider('shadow-map-bias', bias => {
    lightParams.shadowBias = bias;

    updateLightsAndHelpers();

    instance.notifyChange();
});

const [setShadowMapNormalBias] = bindSlider('shadow-map-normal-bias', bias => {
    lightParams.normalBias = bias;

    updateLightsAndHelpers();

    instance.notifyChange();
});

const [setShadowVolumeSize] = bindSlider('shadow-volume-size', size => {
    lightParams.shadowVolumeSize = size;

    updateLightsAndHelpers();

    instance.notifyChange();
});

const [setLightType] = bindDropDown('light-type', type => {
    // @ts-expect-error casting to string
    lightParams.lightType = type;

    document.getElementById('point-light-params').style.display =
        lightParams.lightType === 'point' ? 'block' : 'none';
    document.getElementById('directional-light-params').style.display =
        lightParams.lightType === 'directional' ? 'block' : 'none';

    updateLightsAndHelpers();
});

const [setEnableShadows] = bindToggle('enable-shadows', v => {
    lightParams.enableShadows = v;
    directionalLight.castShadow = v;
    pointLight.castShadow = v;

    instance.notifyChange();
});

const [setShadowMapType] = bindNumericalDropDown('shadow-map-type', type => {
    lightParams.shadowMapType = type;
    // @ts-expect-error casting to number
    instance.renderer.shadowMap.type = type;
});

const [setMode] = bindNumericalDropDown('mode', newMode => {
    const simpleGroup = document.getElementById('simpleGroup');
    const realisticGroup = document.getElementById('realisticGroup');
    const shadingGroup = document.getElementById('shadingParams');
    const shadowGroup = document.getElementById('group-shadows');
    const noShadowGroup = document.getElementById('group-noshadows');

    switch (newMode) {
        case -1:
            map.lighting.enabled = false;
            shadingGroup.style.display = 'none';
            shadowGroup.style.display = 'none';
            noShadowGroup.style.display = 'block';
            break;
        case MapLightingMode.Hillshade:
            shadingGroup.style.display = 'block';
            simpleGroup.style.display = 'block';
            realisticGroup.style.display = 'none';
            map.lighting.enabled = true;
            map.lighting.mode = MapLightingMode.Hillshade;
            shadowGroup.style.display = 'none';
            noShadowGroup.style.display = 'block';
            break;
        case MapLightingMode.LightBased:
            shadingGroup.style.display = 'block';
            simpleGroup.style.display = 'none';
            realisticGroup.style.display = 'block';
            map.lighting.enabled = true;
            map.lighting.mode = MapLightingMode.LightBased;
            shadowGroup.style.display = 'block';
            noShadowGroup.style.display = 'none';
            break;
    }

    instance.notifyChange(map);
});

const [setOpacity, , opacitySlider] = bindSlider('opacity', percentage => {
    const opacity = percentage / 100.0;
    colorLayer.opacity = opacity;
    instance.notifyChange(map);
    opacitySlider.innerHTML = `${percentage}%`;
});

const [setIntensity] = bindSlider('intensity', intensity => {
    map.lighting.hillshadeIntensity = intensity;
    instance.notifyChange(map);
});

const [setDirectionalLightIntensity] = bindSlider('directional-light-intensity', v => {
    lightParams.directionalLightIntensity = v;
    directionalLight.intensity = v;
    instance.notifyChange();
});

const [setPointLightIntensity] = bindSlider('point-light-intensity', v => {
    lightParams.pointLightIntensity = v;
    pointLight.intensity = v;
    instance.notifyChange();
});

const [setShadowVolumeNear] = bindSlider('shadow-volume-near', v => {
    lightParams.shadowVolumeNear = v;
    directionalLight.shadow.camera.near = v;
    updateLightsAndHelpers();
    instance.notifyChange();
});

const [setShadowVolumeFar] = bindSlider('shadow-volume-far', v => {
    lightParams.shadowVolumeFar = v;
    directionalLight.shadow.camera.far = v;
    updateLightsAndHelpers();
    instance.notifyChange();
});

const [setAmbientIntensity] = bindSlider('ambient-intensity', v => {
    lightParams.ambientIntensity = v;
    ambientLight.intensity = v;
    instance.notifyChange();
});

const [setShadowIntensity] = bindSlider('shadow-map-intensity', v => {
    lightParams.shadowIntensity = v;
    updateLightsAndHelpers();
    instance.notifyChange();
});

const [setZFactor] = bindSlider('zFactor', zFactor => {
    map.lighting.zFactor = zFactor;
    instance.notifyChange(map);
});

const [setShowHelpers] = bindToggle('show-helpers', enabled => {
    lightParams.showHelpers = enabled;
    updateLightsAndHelpers();
    instance.notifyChange();
});

const cubes = [];

const reset = () => {
    cubes.forEach(c => {
        c.geometry.dispose();
        c.material.dispose();
        c.removeFromParent();
    });

    setColorLayerToggle(true);
    setLightColor('white');
    setAmbientColor('white');
    setLightType('directional');
    setIntensity(1);
    setEnableShadows(true);
    setShadowMapType(VSMShadowMap);
    setShadowVolumeSize(EXTENT_SIZE);
    setShadowMapResolution(2048);
    setShadowMapBias(-0.0001);
    setShadowMapNormalBias(0);
    setShadowVolumeNear(50000);
    setShadowVolumeFar(150000);
    setDirectionalLightIntensity(5);
    setPointLightIntensity(20000000);
    setAmbientIntensity(1);
    setShadowIntensity(1);
    setZFactor(1);
    setOpacity(100);
    setMode(MapLightingMode.LightBased);
    setShowHelpers(false);
    setAzimuth(252);
    setZenith(71);

    updateLightsAndHelpers();
};

bindButton('reset', () => {
    reset();
});

bindButton('create-cube', btn => {
    btn.disabled = true;

    const size = Math.random() * 500 + 100;
    const cube = new Mesh(
        new BoxGeometry(size, size, size),
        new MeshStandardMaterial({ color: new Color().setHSL(Math.random(), 0.5, 0.5) }),
    );
    cube.castShadow = true;
    cube.receiveShadow = true;

    cube.material.opacity = 0.5;
    cube.material.transparent = true;

    instance.add(cube);
    cubes.push(cube);

    const onMouseMove = e => {
        const picked = instance.pickObjectsAt(e, {
            sortByDistance: true,
            filter: p => p.object !== cube,
        })[0];
        if (picked) {
            const { x, y, z } = picked.point;

            cube.position.set(x, y, z + size / 2);
            cube.updateMatrixWorld(true);

            instance.notifyChange();
        }
    };

    instance.domElement.addEventListener('mousemove', onMouseMove);

    instance.domElement.addEventListener('mousedown', e => {
        cube.material.opacity = 1;
        cube.material.transparent = false;

        btn.disabled = false;

        instance.domElement.removeEventListener('mousemove', onMouseMove);

        instance.notifyChange();
    });
});

reset();

instance.domElement.addEventListener('mousemove', e => {
    const picked = instance.pickObjectsAt(e, { sortByDistance: true })[0];
    if (picked) {
        const { x, y, z } = picked.point;

        pointLight.position.set(x, y, z + 200);
        pointLight.updateMatrixWorld(true);
        pointLightHelper.update();
        pointLightHelper.updateMatrixWorld(true);

        instance.notifyChange();
    }
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/map-shared-layers.md

Source Path: manuals/examples/map-shared-layers.md

# Share layer between maps

## Официальный кейс
- Slug: `map-shared-layers`
- Официальная страница: https://giro3d.org/latest/examples/map-shared-layers.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-shared-layers.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-shared-layers.js`

## Краткое описание (official)
Display multiple maps that share the same layer.

## Теги (official)
- `map`
- `layer`

## Атрибуция (official)
Map style by Stamen Design, © OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-shared-layers npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-shared-layers.html
```html
---
title: Share layer between maps
shortdesc: Display multiple maps that share the same layer.
attribution: Map style by <a target="_blank" href="https://stamen.com/">Stamen Design</a>, © OpenStreetMap contributors
tags: [map, layer]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/map-shared-layers.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import StadiaMaps from 'ol/source/StadiaMaps.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

// Adds an TMS imagery layer
const layer = new ColorLayer({
    name: 'osm',
    source: new TiledImageSource({
        source: new StadiaMaps({ layer: 'stamen_watercolor', wrapX: false }),
    }),
});

let index = 0;
const promises = [];
for (const ex of extent.split(8, 8)) {
    const mapExtent = ex.withRelativeMargin(-0.05);
    // Creates a map that will contain the layer
    const map = new Map({ extent: mapExtent });
    map.name = `${index++}`;

    instance.add(map);

    const promise = map.addLayer(layer).catch(e => console.error(e));
    promises.push(promise);
}

Promise.allSettled(promises).then(() => {
    instance.view.camera.position.set(0, 0, 25000000);

    const controls = new MapControls(instance.view.camera, instance.domElement);
    instance.view.setControls(controls);

    Inspector.attach('inspector', instance);

    StatusBar.bind(instance);
});
```

---

## Source: manuals/examples/map-skirts.md

Source Path: manuals/examples/map-skirts.md

# Map vertical skirts

## Официальный кейс
- Slug: `map-skirts`
- Официальная страница: https://giro3d.org/latest/examples/map-skirts.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-skirts.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-skirts.js`

## Краткое описание (official)
Illustrates the optional vertical skirts on maps.

## Расширенное описание (official longdesc)
Skirts are vertical side on the edges of map tiles that give volume to maps.

## Теги (official)
- `map`
- `skirt`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-skirts npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-skirts.html
```html
---
title: Map vertical skirts
shortdesc: Illustrates the optional vertical skirts on maps.
longdesc: Skirts are vertical side on the edges of map tiles that give volume to maps.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
tags: [map, skirt]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Color -->
            <label class="form-check-label w-100 mb-2" for="color">Skirt color</label>
            <div class="input-group">
                <input
                    type="color"
                    class="form-control form-control-color float-end"
                    id="color"
                    value="#faf0e6"
                    title="color"
                    autocomplete="off"
                />
            </div>

            <!-- Skirt depth -->
            <label for="skirt-depth" class="form-label mt-2">Skirt depth (meters)</label>
            <div class="input-group">
                <input
                    type="number"
                    min="-10000"
                    max="10000"
                    value="0"
                    step="500"
                    class="form-control"
                    id="skirt-depth"
                    autocomplete="off"
                />
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-skirts.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import { AmbientLight, Color, DirectionalLight } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import { MapLightingMode } from '@giro3d/giro3d/entities/MapLightingOptions.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindNumberInput } from './widgets/bindNumberInput.js';
import StatusBar from './widgets/StatusBar.js';

// Chamonix Mont-Blanc coordinates
const poi = new Coordinates(CoordinateSystem.epsg4326, 6.8697, 45.9231)
    .as(CoordinateSystem.epsg3857)
    .toVector3();

const extentSize = 30_000;
const extent = Extent.fromCenterAndSize(
    CoordinateSystem.epsg3857,
    { x: poi.x, y: poi.y },
    extentSize,
    extentSize,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

let skirtDepth = 0;
let skirtColor = new Color('#faf0e6');

const center = extent.centerAsVector3();

const directionalLight = new DirectionalLight('white', 3);
const ambientLight = new AmbientLight('white', 1);

directionalLight.position.set(center.x - 5000, center.y - 2000, 10000);
directionalLight.target.position.copy(center);

instance.add(directionalLight);
instance.add(directionalLight.target);
instance.add(ambientLight);

directionalLight.updateMatrixWorld(true);
directionalLight.target.updateMatrixWorld(true);

/** @type {Map} */
let map;

const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

// Adds a XYZ elevation layer with MapBox terrain RGB tileset
const elevationLayer = new ElevationLayer({
    extent,
    preloadImages: true,
    resolutionFactor: 1 / 8,
    minmax: { min: 0, max: 5000 },
    source: new TiledImageSource({
        format: new MapboxTerrainFormat(),
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});

// Adds a XYZ color layer with MapBox satellite tileset
const satelliteLayer = new ColorLayer({
    extent,
    resolutionFactor: 1.5,
    preloadImages: true,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});

function load() {
    map = new Map({
        extent,
        lighting: {
            enabled: true,
            mode: MapLightingMode.LightBased,
            elevationLayersOnly: true,
        },
        subdivisionThreshold: 1,
        terrain: {
            segments: 64,
            enabled: true,
            skirts: {
                enabled: true,
                depth: skirtDepth,
            },
        },
        backgroundColor: skirtColor,
    });

    instance.add(map);

    map.addLayer(elevationLayer);
    map.addLayer(satelliteLayer);
}

load();

const controls = new MapControls(instance.view.camera, instance.domElement);

instance.view.camera.position.set(poi.x - extentSize - 15000, poi.y - extentSize - 15000, 35_000);
controls.target.set(poi.x, poi.y, 2000);

instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

bindNumberInput('skirt-depth', v => {
    skirtDepth = v;
    if (map) {
        instance.remove(map);
    }
    load();
});

bindColorPicker('color', newColor => {
    skirtColor = new Color(newColor);
    if (map) {
        map.backgroundColor = skirtColor;
        instance.notifyChange(map);
    }
});
```

---

## Source: manuals/examples/map-transparency-stack.md

Source Path: manuals/examples/map-transparency-stack.md

# Stacking transparent maps

## Официальный кейс
- Slug: `map-transparency-stack`
- Официальная страница: https://giro3d.org/latest/examples/map-transparency-stack.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-transparency-stack.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-transparency-stack.js`

## Краткое описание (official)
Illustrates how transparency in maps work.

## Расширенное описание (official longdesc)
Transparency in maps (and any other 3D object) is a tricky problem. Due to limitations in how 3D renderers work, it is not generally possible to correctly display overlapping transparent objects. For example, set the opacity of at least 2 maps to less than 100%, rotate the camera around, and observe various rendering issues, such as missing map tiles.

## Теги (official)
- `map`
- `layer`
- `opacity`

## Атрибуция (official)
© IGN, © iTowns

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-transparency-stack npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-transparency-stack.html
```html
---
title: Stacking transparent maps
shortdesc: Illustrates how transparency in maps work.
longdesc: Transparency in maps (and any other 3D object) is a tricky problem. Due to limitations in how 3D renderers work, it is not generally possible to correctly display overlapping transparent objects. For example, set the opacity of at least 2 maps to less than 100%, rotate the camera around, and observe various rendering issues, such as missing map tiles.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>, © <a href="http://www.itowns-project.org/">iTowns</a>
dependencies: ['colormap']
tags: [map, layer, opacity]
---

<div class="side-pane-with-status-bar">
    <div class="mh-100 overflow-y-auto">
        <!-- Vector map -->
        <div class="card mb-1">
            <div class="card-header">
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        checked
                        type="checkbox"
                        role="switch"
                        id="show-vector"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-vector">Vector map</label>
                </div>
            </div>

            <div class="card-body" id="vector-options">
                <!-- Opacity -->
                <label for="vector-opacity" class="form-label">Map opacity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        step="0.01"
                        max="1"
                        value="1"
                        class="form-range"
                        id="vector-opacity"
                        autocomplete="off"
                    />
                </div>

                <!-- Opacity -->
                <label for="vector-bg-opacity" class="form-label">Background opacity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        step="0.01"
                        max="1"
                        value="0"
                        class="form-range"
                        id="vector-bg-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>

        <!-- Orthophoto map -->
        <div class="card mb-1">
            <div class="card-header">
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        checked
                        type="checkbox"
                        role="switch"
                        id="show-orthophoto"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-orthophoto">Orthophoto map</label>
                </div>
            </div>

            <div class="card-body" id="orthophoto-options">
                <!-- Opacity -->
                <label for="orthophoto-opacity" class="form-label">Map opacity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        step="0.01"
                        max="1"
                        value="1"
                        class="form-range"
                        id="orthophoto-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>

        <!-- Terrain map -->
        <div class="card mb-1">
            <div class="card-header">
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        checked
                        type="checkbox"
                        role="switch"
                        id="show-terrain"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-terrain">Terrain map</label>
                </div>
            </div>

            <div class="card-body" id="terrain-options">
                <!-- Opacity -->
                <label for="terrain-opacity" class="form-label">Map opacity</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        step="0.01"
                        max="1"
                        value="1"
                        class="form-range"
                        id="terrain-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-transparency-stack.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import GeoJSON from 'ol/format/GeoJSON.js';
import TileWMS from 'ol/source/TileWMS.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const extent = new Extent(crs, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null,
});

const terrainMap = new Map({ extent, side: DoubleSide, lighting: true });
instance.add(terrainMap);

const min = 100;
const max = 300;

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));
const colorMap = new ColorMap({ colors, min, max });

const elevationLayer = new ElevationLayer({
    name: 'terrain',
    extent,
    colorMap,
    minmax: { min, max },
    source: new TiledImageSource({
        source: new TileWMS({
            url: 'https://data.geopf.fr/wms-r',
            projection: 'EPSG:3946',
            crossOrigin: 'anonymous',
            params: {
                LAYERS: ['ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES'],
                FORMAT: 'image/x-bil;bits=32',
            },
        }),
        format: new BilFormat(),
        noDataValue: -1000,
    }),
});

terrainMap.addLayer(elevationLayer);

const orthophotoMap = new Map({ extent, side: DoubleSide });
instance.add(orthophotoMap);

const orthophotoLayer = new ColorLayer({
    name: 'orthophoto',
    extent,
    source: new TiledImageSource({
        source: new TileWMS({
            url: 'https://data.geopf.fr/wms-r',
            projection: 'EPSG:3946',
            params: {
                LAYERS: ['ORTHOIMAGERY.ORTHOPHOTOS'],
                FORMAT: 'image/jpeg',
            },
        }),
    }),
});
orthophotoMap.addLayer(orthophotoLayer);

const vectorMap = new Map({ extent, side: DoubleSide, backgroundOpacity: 0 });
instance.add(vectorMap);

const geoJsonLayer = new ColorLayer({
    name: 'geojson',
    extent,
    source: new VectorSource({
        data: {
            url: 'https://raw.githubusercontent.com/iTowns/iTowns2-sample-data/master/lyon.geojson',
            format: new GeoJSON(),
        },
        dataProjection: crs,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 165, 0, 0.6)',
            }),
            stroke: new Stroke({
                color: 'white',
            }),
        }),
    }),
});

vectorMap.addLayer(geoJsonLayer);

orthophotoMap.object3d.translateZ(+1500);
orthophotoMap.object3d.updateMatrixWorld();
vectorMap.object3d.translateZ(+2500);
vectorMap.object3d.updateMatrixWorld();

instance.view.camera.position.set(1832816, 5163527, 6121);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

bindToggle('show-terrain', v => {
    terrainMap.visible = v;
    instance.notifyChange();
});
bindToggle('show-orthophoto', v => {
    orthophotoMap.visible = v;
    instance.notifyChange();
});
bindToggle('show-vector', v => {
    vectorMap.visible = v;
    instance.notifyChange();
});

bindSlider('terrain-opacity', o => {
    terrainMap.opacity = o;
    instance.notifyChange();
});
bindSlider('orthophoto-opacity', o => {
    orthophotoMap.opacity = o;
    instance.notifyChange();
});
bindSlider('vector-opacity', o => {
    vectorMap.opacity = o;
    instance.notifyChange();
});
bindSlider('vector-bg-opacity', o => {
    vectorMap.backgroundOpacity = o;
    instance.notifyChange(vectorMap);
});
```

---

## Source: manuals/examples/map-vertical-exaggeration.md

Source Path: manuals/examples/map-vertical-exaggeration.md

# Vertical exaggeration

## Официальный кейс
- Slug: `map-vertical-exaggeration`
- Официальная страница: https://giro3d.org/latest/examples/map-vertical-exaggeration.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-vertical-exaggeration.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-vertical-exaggeration.js`

## Краткое описание (official)
Apply a vertical exaggeration on a scene.

## Расширенное описание (official longdesc)
Vertical exaggeration, also known as Z-scale, is helpful to emphasize the features of terrain. However, properly handling this scale can be tricky, as the equivalence relationship between scene units and actual geospatial coordinates no longer applies. For example, with a z-scale of 200%, a scene coordinate with a Z value of 2 actually means 1 meter of elevation.

## Теги (official)
- `map`
- `axisgrid`
- `terrain`
- `picking`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-vertical-exaggeration npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/map-vertical-exaggeration.html
```html
---
title: Vertical exaggeration
shortdesc: Apply a vertical exaggeration on a scene.
longdesc: Vertical exaggeration, also known as Z-scale, is helpful to emphasize the features of terrain. However, properly handling this scale can be tricky, as the equivalence relationship between scene units and actual geospatial coordinates no longer applies. For example, with a z-scale of 200%, a scene coordinate with a Z value of 2 actually means 1 meter of elevation.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [map, axisgrid, terrain, picking]
---

<div class="side-pane-with-status-bar pe-none">
    <div class="card pe-auto">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body">
            <label for="vertical-exaggeration" id="label-vertical-exaggeration" class="form-label"
                >Z-scale: <span class="fw-bold text-success">100%</span></label
            >
            <div class="input-group">
                <input
                    type="range"
                    min="0.01"
                    max="10"
                    step="0.01"
                    value="1"
                    class="form-range"
                    id="vertical-exaggeration"
                    autocomplete="off"
                />
            </div>

            <hr />

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked
                    id="show-grid"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-grid">Show grid</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-colliders"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-colliders">Show collider meshes</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="wireframe"
                    autocomplete="off"
                />
                <label class="form-check-label" for="wireframe">Wireframe</label>
            </div>

            <label for="geometric-resolution" id="label-geometric-resolution" class="form-label"
                >Terrain mesh resolution: 32</label
            >
            <div class="input-group">
                <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value="5"
                    class="form-range"
                    id="geometric-resolution"
                    autocomplete="off"
                />
            </div>

            <hr />

            <table class="table" style="width: 25rem">
                <thead>
                    <tr>
                        <th scope="col">Measurement</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Z (in scene units)</th>
                        <td id="raw-height">-</td>
                    </tr>
                    <tr>
                        <th scope="row">Z after Z-scale compensation</th>
                        <td id="adjusted-height">-</td>
                    </tr>
                    <tr>
                        <th scope="row">Actual elevation from layer</th>
                        <td style="width: 8rem" id="raster-height">-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/map-vertical-exaggeration.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { DoubleSide, MathUtils, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import AxisGrid from '@giro3d/giro3d/entities/AxisGrid.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
    backgroundColor: null,
});

// We are going to change the transform of the scene itself,
// so  we need to enable this, which by default is disabled
// for performance reasons.
instance.scene.matrixWorldAutoUpdate = true;

const minAltitude = -1531;
const maxAltitude = 2388;

const extent = new Extent(
    instance.coordinateSystem,
    -13576103.933,
    -13532051.346,
    5894667.439,
    5939002.826,
).withMargin(-200, -200);

const map = new Map({
    extent,
    backgroundColor: 'gray',
    lighting: {
        enabled: true,
        hillshadeIntensity: 0.75,
        zFactor: 1,
        hillshadeAzimuth: 254,
    },
    discardNoData: true,
    side: DoubleSide,
});

// Forces the map to subdivide more than usual, for better readability of tiles.
map.subdivisionThreshold = 0.75;

instance.add(map);

const source = new GeoTIFFSource({
    url: 'https://3d.oslandia.com/giro3d/rasters/topobathy.cog.tiff',
    crs: extent.crs,
});

const elevationLayer = new ElevationLayer({
    source,
    minmax: { min: minAltitude, max: maxAltitude },
    preloadImages: true,
    colorMap: new ColorMap({
        colors: makeColorRamp('bathymetry'),
        min: minAltitude + 200,
        max: maxAltitude - 200,
    }),
});

map.addLayer(elevationLayer);

const axisGrid = new AxisGrid({
    volume: {
        extent: map.extent,
        floor: -2000,
        ceiling: 2500,
    },
    ticks: {
        x: 10_000,
        y: 10_000,
        z: 500,
    },
});

instance.add(axisGrid);

const center = extent.centerAsVector2();

instance.view.camera.position.set(-13609580, 5858793, 32757);
const lookAt = new Vector3(center.x, center.y, 0);
instance.view.camera.lookAt(lookAt);

instance.notifyChange(instance.view.camera);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

const sphere = new Mesh(new SphereGeometry(1), new MeshBasicMaterial({ color: 'red' }));

const tmpOrigin = new Vector3();
const tmpSize = new Vector3();
const tmpPosition = new Vector3();

// Make the sphere constant size on the screen
sphere.onBeforeRender = function onBeforeRender(renderer, _scene, camera) {
    const origin = camera.getWorldPosition(tmpOrigin);
    const dist = origin.distanceTo(sphere.getWorldPosition(tmpPosition));

    const fovRads = MathUtils.degToRad(camera.fov);
    const fieldOfViewHeight = Math.tan(fovRads) * dist;

    const size = renderer.getSize(tmpSize);

    const radius = 5; // pixels
    const pixelRatio = radius / size.y;

    const scale = fieldOfViewHeight * pixelRatio;

    // We also have to apply a counteracting z-scale to the
    // sphere in order to keep its round shape, otherwise
    // it will be squeezed by the z-scale.
    sphere.scale.set(scale, scale, scale / instance.scene.scale.z);

    sphere.updateMatrixWorld(true);
};

instance.add(sphere);

function getRawPickedPoint(mouseEvent) {
    const picked = instance.pickObjectsAt(mouseEvent, { where: [map] });
    if (picked.length > 0) {
        const first = picked[0];
        const point = first.point;
        return point;
    }

    return null;
}

function sampleElevationOnMap(point) {
    const getElevation = map.getElevation({
        coordinates: new Coordinates(instance.coordinateSystem, point.x, point.y),
    });
    if (getElevation.samples.length > 0) {
        getElevation.samples.sort((a, b) => a.resolution - b.resolution);
        return getElevation.samples[0].elevation;
    }

    return null;
}

function updateMeasurements(mouseEvent) {
    const point = getRawPickedPoint(mouseEvent);

    const rawHeightCell = document.getElementById('raw-height');
    const adjustedHeightCell = document.getElementById('adjusted-height');
    const rasterHeightCell = document.getElementById('raster-height');

    if (point) {
        // The raw Z value is in scene units.
        const rawZ = point.z;

        // To obtain the actual elevation in geospatial
        // units (meters), we need to divided by the z-scale.
        const unscaledZ = rawZ / instance.scene.scale.z;

        // We can also compare those values with the elevation
        // sampled directly on elevation data (rasters).
        const sampledZ = sampleElevationOnMap(point);

        // Warning! Here we have to position the sphere to the unscaled Z value
        // because the entire scene is already scaled. Applying the raw Z value means
        // that the Z-scale will be applied twice on the sphere !
        sphere.position.set(point.x, point.y, unscaledZ);

        // We also have to apply a counteracting scale to the
        // sphere in order to keep its round shape, otherwise
        // it will be squeezed by the z-scale.
        sphere.scale.setZ(1 / instance.scene.scale.z);

        sphere.updateMatrixWorld();

        rawHeightCell.innerText = `${rawZ?.toFixed(2)}`;
        adjustedHeightCell.innerText = `${unscaledZ?.toFixed(2)} m`;
        rasterHeightCell.innerText = `${sampledZ?.toFixed(3)} m`;

        sphere.visible = true;
    } else {
        rawHeightCell.innerText = '-';
        adjustedHeightCell.innerText = '-';
        rasterHeightCell.innerText = '-';

        sphere.visible = false;
    }

    instance.notifyChange();
}

instance.domElement.addEventListener('mousemove', updateMeasurements);

StatusBar.bind(instance);

const [showColliders] = bindToggle('show-colliders', v => {
    map.showColliderMeshes = v;
    instance.notifyChange(map);
});

const [showGrid] = bindToggle('show-grid', v => {
    axisGrid.visible = v;
    instance.notifyChange();
});

const [setGeometricResolution] = bindSlider('geometric-resolution', v => {
    map.segments = 2 ** v;
    instance.notifyChange(map);

    document.getElementById('label-geometric-resolution').innerText =
        `Terrain mesh resolution: ${map.segments}`;
});

const [setWireframe] = bindToggle('wireframe', v => {
    map.wireframe = v;
    instance.notifyChange(map);
});

const [setVerticalExaggeration] = bindSlider('vertical-exaggeration', v => {
    // Vertical exaggerations simply means that the entire scene is scaled vertically.
    instance.scene.scale.setZ(v);

    // Changing the position, rotation or scale of an object requires the
    // recomputation of the transformation matrices of the object and its descendants.
    // Since the scene is the root object of the entire instance, updating it will
    // update all the objects in the scene as well.
    instance.scene.updateWorldMatrix(true, true);

    // By default, vertical exaggeration has no effect on hillshade,
    // so let's apply it to hillshading to increase the shading intensity
    // when the vertical exaggeration increases.
    map.lighting.zFactor = v;

    instance.notifyChange(map);

    const percent = Math.round(v * 100);

    document.getElementById('label-vertical-exaggeration').innerHTML =
        `Z-scale: <span class="fw-bold ${percent === 100 ? 'text-success' : ''}">${percent}%</span>`;
});

instance.addEventListener('before-render', () => {
    const camera = instance.view.camera;
    camera.near = 1000;
    camera.far = 200000;
});

bindButton('reset', () => {
    showGrid(true);
    showColliders(false);
    setVerticalExaggeration(1);
    setGeometricResolution(5);
    setWireframe(false);
});
```

---

## Source: manuals/examples/mapbox-tilesets.md

Source Path: manuals/examples/mapbox-tilesets.md

# Mapbox tilesets

## Официальный кейс
- Slug: `mapbox-tilesets`
- Официальная страница: https://giro3d.org/latest/examples/mapbox-tilesets.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/mapbox-tilesets.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/mapbox-tilesets.js`

## Краткое описание (official)
Display color and elevation Mapbox tilesets.

## Расширенное описание (official longdesc)
Mapbox Terrain RGB is an encoding of elevation data where 24 bits of elevation data are encoded using the 3 colors of a PNG image.

## Теги (official)
- `map`
- `layer`
- `mapbox`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=mapbox-tilesets npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/mapbox-tilesets.html
```html
---
title: Mapbox tilesets
shortdesc: Display color and elevation Mapbox tilesets.
longdesc: <a href="https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-rgb-v1/" target="_blank">Mapbox Terrain RGB</a> is an encoding of elevation data where 24 bits of elevation data are encoded using the 3 colors of a PNG image.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
tags: [map, layer, mapbox]
---

<div class="side-pane-with-status-bar">
    <form class="row row-cols-lg-auto g-3 align-items-center" id="mapboxApi">
        <div class="input-group">
            <input
                type="text"
                class="form-control"
                id="mapboxApiKey"
                placeholder="Custom Mapbox API key..."
            />
        </div>
    </form>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/mapbox-tilesets.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(CoordinateSystem.epsg3857, 659030, 735596, 5535152, 5647497);

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
});

const map = new Map({ extent });

instance.add(map);

async function addLayers(key) {
    const layers = map.getLayers();
    for (const current of layers) {
        map.removeLayer(current);
    }

    // Adds a XYZ elevation layer with MapBox terrain RGB tileset
    const elevationLayer = new ElevationLayer({
        name: 'xyz_elevation',
        extent,
        // We dont want the full resolution because the terrain
        // mesh has a much lower resolution than the raster image
        resolutionFactor: 1 / 8,
        source: new TiledImageSource({
            format: new MapboxTerrainFormat(),
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
                projection: extent.crs.id,
                crossOrigin: 'anonymous',
            }),
        }),
    });
    await map.addLayer(elevationLayer);

    // Adds a XYZ color layer with MapBox satellite tileset
    const satelliteLayer = new ColorLayer({
        name: 'xyz_color',
        extent,
        source: new TiledImageSource({
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
                projection: extent.crs.id,
                crossOrigin: 'anonymous',
            }),
        }),
    });
    await map.addLayer(satelliteLayer);
}

// Create our elevation layer using Giro3D's default mapbox api key
addLayers(
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ',
).catch(console.error);

instance.view.camera.position.set(extent.maxX, extent.minY, 2000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

document.getElementById('mapboxApi').addEventListener('submit', e => {
    e.preventDefault();
    // @ts-expect-error typing
    addLayers(document.getElementById('mapboxApiKey').value);
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/mask-layer.md

Source Path: manuals/examples/mask-layer.md

# Mask layers

## Официальный кейс
- Slug: `mask-layer`
- Официальная страница: https://giro3d.org/latest/examples/mask-layer.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/mask-layer.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/mask-layer.js`

## Краткое описание (official)
Illustrates the use of mask layers.

## Расширенное описание (official longdesc)
A `MaskLayer` can be used to mask part of a map. By default, the transparent part of the mask makes the map transparent. By inverting the mask, the transparent part of the mask makes the map opaque.

## Теги (official)
- `map`
- `layer`
- `mapbox`
- `geojson`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=mask-layer npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/mask-layer.html
```html
---
title: Mask layers
shortdesc: Illustrates the use of mask layers.
longdesc: A <a href="../apidoc/classes/core.layer.MaskLayer.html" target="_blank"><code>MaskLayer</code></a> can be used to mask part of a map. By default, the transparent part of the mask makes the map transparent. By inverting the mask, the transparent part of the mask makes the map opaque.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
tags: [map, layer, mapbox, geojson]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <h5 class="card-header">Mask layer</h5>

        <div class="card-body">
            <form>
                <div class="row">
                    <div class="dropdown">
                        <select
                            class="btn btn-primary dropdown-toggle"
                            id="layerState"
                            autocomplete="off"
                        >
                            <option value="0">Disabled</option>
                            <option value="1" selected>Enabled</option>
                            <option value="2">Enabled (invert mask)</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/mask-layer.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { GeoJSON } from 'ol/format.js';
import XYZ from 'ol/source/XYZ.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import MaskLayer, { MaskMode } from '@giro3d/giro3d/core/layer/MaskLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import StatusBar from './widgets/StatusBar.js';

const extent = Extent.fromCenterAndSize(
    CoordinateSystem.epsg3857,
    { x: 260000, y: 6251379 },
    32000,
    32000,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

const apiKey =
    '_____________________';

const map = new Map({ extent });

instance.add(map);

// Adds a satellite basemap
const basemap = new ColorLayer({
    name: 'basemap',
    extent,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${apiKey}`,
            projection: extent.crs.id,
            crossOrigin: 'anonymous',
        }),
    }),
});

map.addLayer(basemap);

const outlineStyle = new Style({
    stroke: new Stroke({ color: 'red', width: 2 }),
});

// Display the footprint using a red outline. This layer is not necessary for the mask to work,
// and is only present for illustration purposes.
const outline = new ColorLayer({
    name: 'outline',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/giro3d/vectors/paris.geojson',
            format: new GeoJSON(),
        },
        style: outlineStyle,
    }),
});

map.addLayer(outline);

// The mask layer uses an opaque fill style.
const maskStyle = new Style({
    fill: new Fill({ color: 'white' }),
});

// Create the actual mask layer with the same source as the outline.
const mask = new MaskLayer({
    name: 'mask',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/giro3d/vectors/paris.geojson',
            format: new GeoJSON(),
        },
        style: maskStyle,
    }),
});

map.addLayer(mask);

const center = extent.centerAsVector3();
instance.view.camera.position.set(center.x, center.y - 1, 40000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = center;
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

bindNumericalDropDown('layerState', newMode => {
    switch (newMode) {
        case 1:
            mask.visible = true;
            mask.maskMode = MaskMode.Normal;
            break;
        case 2:
            mask.visible = true;
            mask.maskMode = MaskMode.Inverted;
            break;
        default:
            mask.visible = false;
            break;
    }

    instance.notifyChange(map);
});
```

---

## Source: manuals/examples/massive-point-cloud.md

Source Path: manuals/examples/massive-point-cloud.md

# Massive point cloud

## Официальный кейс
- Slug: `massive-point-cloud`
- Официальная страница: https://giro3d.org/latest/examples/massive-point-cloud.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/massive-point-cloud.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/massive-point-cloud.js`

## Краткое описание (official)
Display a massive point cloud by aggregating dozens of datasets.

## Теги (official)
- `point cloud`
- `las`
- `copc`
- `ign`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=massive-point-cloud npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/massive-point-cloud.html
```html
---
title: Massive point cloud
shortdesc: Display a massive point cloud by aggregating dozens of datasets.
attribution: © <a target="_blank" href="https://geoservices.ign.fr/lidarhd">IGN</a>
tags: ['point cloud', 'las', 'copc', 'ign']
---

<div class="side-pane-with-status-bar" style="width: 25rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">Parameters</div>

        <div class="card-body">
            <div class="progress" role="progressbar">
                <div
                    class="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
                    id="progress"
                    style="width: 0%"
                >
                    Loading metadata...
                </div>
            </div>

            <div id="options" style="display: none">
                <ul class="list-group mb-3" id="table">
                    <li class="list-group-item">
                        Total points
                        <b id="point-count" class="d-float float-end"></b>
                    </li>
                    <li class="list-group-item" title="The number of points currently displayed">
                        Displayed points
                        <b id="displayed-point-count" class="d-float float-end"></b>
                    </li>
                    <li class="list-group-item">
                        Files: <b id="file-count" class="d-float float-end"></b>
                    </li>
                </ul>

                <!-- Active attribute selector -->
                <div class="input-group" id="attribute-group">
                    <label class="input-group-text col-5" for="attribute">Dimension</label>
                    <select
                        class="form-select"
                        id="attribute"
                        autocomplete="off"
                        title="Sets the active attribute of the point cloud"
                    ></select>
                </div>

                <!-- Point budget -->
                <div class="input-group mt-1" id="attribute-group">
                    <label class="input-group-text col-5" for="attribute">Point budget</label>
                    <input
                        type="number"
                        min="-1"
                        max="99999999999"
                        value="-1"
                        step="1"
                        class="form-control"
                        id="point-budget"
                        autocomplete="off"
                    />
                </div>

                <!-- Show volume -->
                <div class="form-check form-switch mt-2">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked
                        id="show-volume"
                        autocomplete="off"
                    />
                    <label
                        title="Show the volume of the octree"
                        class="form-check-label"
                        for="show-volume"
                        >Show dataset volume</label
                    >
                </div>

                <!-- Show octree volumes -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="show-tile-volumes"
                        autocomplete="off"
                    />
                    <label
                        title="Show the volume of the octree"
                        class="form-check-label"
                        for="show-tile-volumes"
                        >Show octrees</label
                    >
                </div>

                <!-- Eye Dome Lighting -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked
                        id="edl"
                        autocomplete="off"
                    />
                    <label
                        title="Toggles Eye Dome Lighting post-processing effect"
                        class="form-check-label"
                        for="edl"
                        >Eye Dome Lighting</label
                    >
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/massive-point-cloud.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import AggregatePointCloudSource from '@giro3d/giro3d/sources/AggregatePointCloudSource';
import COPCSource from '@giro3d/giro3d/sources/COPCSource.js';
import { setLazPerfPath } from '@giro3d/giro3d/sources/las/config.js';

import { bindDropDown } from './widgets/bindDropDown.js';
import { bindNumberInput } from './widgets/bindNumberInput.js';
import { bindProgress } from './widgets/bindProgress.js';
import { bindToggle } from './widgets/bindToggle.js';
import { formatPointCount } from './widgets/formatPointCount.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

// LAS processing requires the WebAssembly laz-perf library
// This path is specific to your project, and must be set accordingly.
setLazPerfPath('/assets/wasm');

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: 'black',
    renderer: {
        logarithmicDepthBuffer: true,
    },
});

instance.renderingOptions.enableEDL = true;
instance.renderingOptions.EDLStrength = 5;

const colormaps = {
    Intensity: new ColorMap({ colors: makeColorRamp('jet'), min: 0, max: 100 }),
    Z: new ColorMap({ colors: makeColorRamp('portland'), min: 0, max: 100 }),
};

const datasets = [
    'LHD_FXX_0657_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0657_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0651_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0650_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0653_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0655_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0652_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0656_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0654_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0649_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0648_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0647_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0646_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0644_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0645_6859_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6868_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6864_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6865_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6866_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6867_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6860_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6861_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6862_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6863_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6857_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6858_PTS_O_LAMB93_IGN69.copc.laz',
    'LHD_FXX_0658_6859_PTS_O_LAMB93_IGN69.copc.laz',
];

const server = 'https://3d.oslandia.com/giro3d/pointclouds/lidarhd/paris/';

const source = new AggregatePointCloudSource({
    sources: datasets.map(dataset => new COPCSource({ url: server + dataset })),
});

const pointCloud = new PointCloud({ source });

const [setProgress, progressElement] = bindProgress('progress');

source.addEventListener('progress', () => setProgress(source.progress));

pointCloud.showVolume = true;

/**
 * @param {PointCloud} entity
 */
async function onInitialized(entity) {
    progressElement.style.display = 'none';
    document.getElementById('options').style.display = 'block';

    for (const [attribute, colorMap] of Object.entries(colormaps)) {
        entity.setAttributeColorMap(attribute, colorMap);
    }

    entity.setActiveAttribute('Z');

    document.getElementById('point-count').innerText = formatPointCount(entity.pointCount);

    document.getElementById('file-count').innerText = source.sources.length.toString();

    const volume = entity.getBoundingBox();
    const center = volume.getCenter(new Vector3());

    const camera = instance.view.camera;
    const lookAt = new Vector3(center.x, center.y, volume.min.z);

    camera.position.set(center.x, center.y - 1, volume.max.z * 10);

    camera.lookAt(lookAt);

    const controls = new MapControls(camera, instance.domElement);
    controls.target.copy(lookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    instance.view.setControls(controls);

    instance.notifyChange(camera);

    const metadata = await source.getMetadata();

    // Update the Z colormap with the min/max height of the datasets.
    colormaps.Z.min = volume.min.z * 1.1;
    colormaps.Z.max = volume.max.z * 0.6;

    colormaps.Intensity.min = 0;
    colormaps.Intensity.max = 5000;

    StatusBar.bind(instance);

    const [, , , setAvailableAttributes] = bindDropDown('attribute', attribute => {
        entity.setActiveAttribute(attribute);
    });

    setAvailableAttributes(
        metadata.attributes.map((att, index) => ({
            id: att.name,
            name: att.name,
            selected: index === 0,
        })),
    );

    bindToggle('show-volume', show => (entity.showVolume = show));
    bindToggle('show-tile-volumes', show => (entity.showNodeVolumes = show));
    bindToggle('edl', edl => {
        instance.renderingOptions.enableEDL = edl;
        instance.notifyChange();
    });
    bindNumberInput('point-budget', v => {
        if (v <= 0) {
            entity.pointBudget = null;
        } else {
            entity.pointBudget = v;
        }
    });

    instance.addEventListener('update-end', () => {
        document.getElementById('displayed-point-count').innerText = formatPointCount(
            entity.displayedPointCount,
        );
    });
}

instance.add(pointCloud).then(onInitialized).catch(console.error);

Inspector.attach('inspector', instance);
```

---

## Source: manuals/examples/minimap.md

Source Path: manuals/examples/minimap.md

# Minimap

## Официальный кейс
- Slug: `minimap`
- Официальная страница: https://giro3d.org/latest/examples/minimap.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/minimap.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/minimap.js`

## Краткое описание (official)
Illustrates the use of a secondary Giro3D instance to display a minimap.

## Расширенное описание (official longdesc)
You can use any number of Giro3D instance in a given page. One common use for multiple instances is to implement a minimap view, where the minimap view contains a single map with a simple, fast to load color layer. You can also synchronize the position of the minimap camera with the main view camera. In this example, the minimap view uses an orthographic camera.

## Теги (official)
- `map`
- `minimap`
- `layout`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=minimap npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/minimap.html
```html
---
title: Minimap
shortdesc: Illustrates the use of a secondary Giro3D instance to display a minimap.
longdesc: You can use any number of Giro3D instance in a given page. One common use for multiple instances is to implement a minimap view, where the minimap view contains a single map with a simple, fast to load color layer. You can also synchronize the position of the minimap camera with the main view camera. In this example, the minimap view uses an orthographic camera.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, minimap, layout]
---

<div class="side-pane-with-status-bar">
    <div
        id="minimap"
        class="card m-1"
        style="
            width: 20rem;
            height: 14rem;
            overflow: hidden;
            border-radius: var(--bs-card-border-radius);
        "
    ></div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/minimap.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import OSM from 'ol/source/OSM.js';
import { Color, CubeTextureLoader, MathUtils, OrthographicCamera, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const SKY_COLOR = new Color(0xf1e9c6);

const mainInstance = new Instance({
    target: 'view',
    crs,
    backgroundColor: SKY_COLOR,
});

// create a map
const extent = new Extent(crs, -111629.52, 1275028.84, 5976033.79, 7230161.64);
const map = new Map({
    extent,
    backgroundColor: 'gray',
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
    discardNoData: true,
});
mainInstance.add(map);

const noDataValue = -1000;

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                name: 'wmts_elevation',
                extent: map.extent,
                // We don't need the full resolution of terrain because we are not using any shading
                resolutionFactor: 1 / 8,
                minmax: { min: 0, max: 5000 },
                noDataOptions: {
                    replaceNoData: false,
                },
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        map.addLayer(
            new ColorLayer({
                name: 'wmts_orthophotos',
                extent: map.extent,
                source: orthophotoWmts,
            }),
        );
    })
    .catch(console.error);

mainInstance.view.camera.position.set(913349.2364044407, 6456426.459171033, 1706.0108044011636);
const lookAt = new Vector3(913896, 6459191, 200);
mainInstance.view.camera.lookAt(lookAt);
mainInstance.notifyChange(mainInstance.view.camera);

const controls = new MapControls(mainInstance.view.camera, mainInstance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.copy(lookAt);
controls.saveState();
mainInstance.view.setControls(controls);

const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('image/skyboxsun25deg_zup/');
const cubeTexture = cubeTextureLoader.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
]);

mainInstance.scene.background = cubeTexture;

/////////////////////////////// Minimap configuration //////////////////////////////////////////////

// The minimap is a regular Giro3D instance located in a <div> element in the top right corner
// of the window. Its configuration is very similar to the main view, with some important
// differences related to the camera and navigation.

// Create our minimap instance and attach it to the 'minimap' <div> element.
const minimapInstance = new Instance({
    target: 'minimap',
    crs: CoordinateSystem.epsg3857, // Contrary to the main view, this minimap uses the Web mercator projection
});

// Set the minimap camera view width, in meters. This can be changed later when
// the user uses the mouse wheel on to zoom in/out.
const minimapCameraWidth = 2000;
const minimapCamera = new OrthographicCamera(
    -minimapCameraWidth / 2,
    minimapCameraWidth / 2,
    100,
    -100,
);

// We replace the default perspective camera of the minimap view by
// an orthographic camera, which is much more suitable for this kind of view.
minimapInstance.view.camera = minimapCamera;

// Let's create our minimap map with the same extent than the main map.
const minimap = new Map({
    extent: map.extent.as(minimapInstance.coordinateSystem),
    terrain: {
        // We can disable terrain deformation because our map will be flat.
        enabled: false,
        // Since the map is flat (no terrain applied), we can use 1 segment per tile.
        segments: 1,
    },
    backgroundColor: 'black',
});

minimapInstance.add(minimap);

// We use an OpenStreetMap color layer for the minimap, because it's readable and fast to display.
const osmLayer = new ColorLayer({
    name: 'osm',
    preloadImages: true,
    source: new TiledImageSource({ source: new OSM() }),
});

minimap.addLayer(osmLayer);

function synchronizeCameras() {
    const target = controls.target;

    // Since our minimap does not use the same projection as the main view (EPSG:2154),
    // we must convert the camera position into this projection (EPSG:3857).
    const srcProj = mainInstance.coordinateSystem;
    const dstProj = minimapInstance.coordinateSystem;
    const srcPosition = new Coordinates(srcProj, target.x, target.y);
    const position = srcPosition.as(dstProj);

    // Then we can assign the position to the camera, while still keeping a constant altitude.
    // The minimap camera "altitude" never changes because we are using an orthographic camera.
    // Changing this value will not change the size of objects rendered in this view.
    const MINIMAP_CAMERA_ALTITUDE = 10;
    minimapInstance.view.camera.position.set(position.x, position.y, MINIMAP_CAMERA_ALTITUDE);

    // Instruct the minimap instance to render the view.
    minimapInstance.notifyChange(minimap);
}

// Synchronize the minimap camera position with the *target* of the main camera
mainInstance.addEventListener('after-camera-update', synchronizeCameras);

function handleMouseWheel(event) {
    const delta = event.wheelDelta;

    const absDelta = Math.abs(delta);
    const ZOOM_SPEED = MathUtils.mapLinear(absDelta, 0, 120, 1.01, 1.2);

    if (delta > 0) {
        minimapCamera.zoom *= ZOOM_SPEED;
    } else if (delta < 0) {
        minimapCamera.zoom /= ZOOM_SPEED;
    }

    minimapInstance.notifyChange(minimapCamera);

    // Prevent this event from bubbling and make the page scroll.
    event.preventDefault();
}

// Use the mouse wheel on the minimap view to set the zoom of the minimap camera.
// We use the 'wheel' event (careful not to use the non-standard 'mousewheel' event).
minimapInstance.domElement.addEventListener('wheel', handleMouseWheel);

Inspector.attach('inspector', mainInstance, { title: 'main' });
Inspector.attach('inspector', minimapInstance, { title: 'minimap' });

StatusBar.bind(mainInstance, { additionalInstances: minimapInstance });
```

---

## Source: manuals/examples/multi-resolution-elevation.md

Source Path: manuals/examples/multi-resolution-elevation.md

# Multi-resolution elevation data

## Официальный кейс
- Slug: `multi-resolution-elevation`
- Официальная страница: https://giro3d.org/latest/examples/multi-resolution-elevation.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/multi-resolution-elevation.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/multi-resolution-elevation.js`

## Краткое описание (official)
Combine multiple elevation sources into a single layer.

## Расширенное описание (official longdesc)
The `AggregateImageSource` can combine multiple `ImageSource`s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. It also makes it possible to have more than one elevation source on a map, which only supports a single elevation layer.

## Теги (official)
- `terrain`
- `map`
- `layer`

## Атрибуция (official)
© U.S. Geological Survey, © NASA,

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=multi-resolution-elevation npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/multi-resolution-elevation.html
```html
---
title: Multi-resolution elevation data
shortdesc: Combine multiple elevation sources into a single layer.
longdesc: The <a target="_blank" href="../apidoc/classes/sources.AggregateImageSource.html"><code>AggregateImageSource</code></a> can combine multiple <a target="_blank" href="../apidoc/classes/sources.ImageSource.html"><code>ImageSource</code></a>s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. It also makes it possible to have more than one elevation source on a map, which only supports a single elevation layer.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>, © <a target="_blank" href="https://www.nasa.gov/">NASA</a>,
tags: ['terrain', 'map', 'layer']
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <fieldset id="options">
                <!-- Show top source -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-top-source"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-top-source"
                        >Show high-resolution source</label
                    >
                </div>

                <!-- Show bottom source -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-bottom-source"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-bottom-source"
                        >Show low-resolution source</label
                    >
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/multi-resolution-elevation.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import AggregateImageSource from '@giro3d/giro3d/sources/AggregateImageSource.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const CRS = CoordinateSystem.epsg3857;

const instance = new Instance({
    target: 'view',
    crs: CRS,
});

async function loadData() {
    // Let's load a single low-resolution SRTM tile
    const srtm = new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/N46W123.cog.tif',
        crs: CRS,
    });
    // An a high-resolution DEM of Mount St Helens
    const highRes = new GeoTIFFSource({
        url: 'https://3d.oslandia.com/giro3d/rasters/msh2009dem-3857.tif',
        enableWorkers: false,
        crs: CRS,
    });

    // Let's initialize the SRTM dataset so that we can access its extent
    await srtm.initialize();

    await highRes.initialize();

    const map = new Map({
        extent: srtm.getExtent(),
        backgroundColor: 'gray',
        lighting: true,
    });
    instance.add(map);

    // Let's combine those two DEMs into a single source.
    // Note that the order in which the sub-sources appear in the array
    // dictates their z-index in the stack: make sure that the higher-resolution
    // sources appear after the lower resolution sources.
    // Important: All sources must share the same CRS.
    const aggregateSource = new AggregateImageSource({ sources: [srtm, highRes] });

    const min = 0;
    const max = 2500;

    const layer = new ElevationLayer({
        minmax: { min, max },
        colorMap: new ColorMap({ colors: makeColorRamp('viridis'), min, max }),
        source: aggregateSource,
    });

    await map.addLayer(layer);

    const center = new Coordinates(instance.coordinateSystem, -13601907, 5812324);
    instance.view.camera.position.set(center.x, center.y, 30_000);

    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.target.set(center.x, center.y + 1, 0);
    instance.view.setControls(controls);

    // Attach the inspector
    Inspector.attach('inspector', instance);

    StatusBar.bind(instance);

    bindToggle('show-top-source', show => {
        aggregateSource.setSourceVisibility(highRes, show);
    });
    bindToggle('show-bottom-source', show => {
        aggregateSource.setSourceVisibility(srtm, show);
    });
}

loadData().catch(console.error);
```

---

## Source: manuals/examples/multiple-wmts-layers.md

Source Path: manuals/examples/multiple-wmts-layers.md

# Stacked WMTS layers

## Официальный кейс
- Slug: `multiple-wmts-layers`
- Официальная страница: https://giro3d.org/latest/examples/multiple-wmts-layers.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/multiple-wmts-layers.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/multiple-wmts-layers.js`

## Краткое описание (official)
Stack multiple WMTS layers into a single Giro3D layer.

## Расширенное описание (official longdesc)
The `AggregateImageSource` can combine multiple `ImageSource`s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. In this example, we display seveveral WMTS layers in a single Map layer.

## Теги (official)
- `map`
- `wmts`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=multiple-wmts-layers npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/multiple-wmts-layers.html
```html
---
title: Stacked WMTS layers
shortdesc: Stack multiple WMTS layers into a single Giro3D layer.
longdesc: The <a target="_blank" href="../apidoc/classes/sources.AggregateImageSource.html"><code>AggregateImageSource</code></a> can combine multiple <a target="_blank" href="../apidoc/classes/sources.ImageSource.html"><code>ImageSource</code></a>s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. In this example, we display seveveral WMTS layers in a single Map layer.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: ['map', 'wmts']
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Sources</div>
        <div class="card-body">
            <fieldset id="options">
                <!-- TRANSPORTNETWORKS.ROADS -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="TRANSPORTNETWORKS.ROADS"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-top-source"
                        >TRANSPORTNETWORKS.ROADS</label
                    >
                </div>

                <!-- ADMINEXPRESS-COG.LATEST -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="ADMINEXPRESS-COG.LATEST"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-top-source"
                        >ADMINEXPRESS-COG.LATEST</label
                    >
                </div>

                <!-- ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-top-source"
                        >ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO</label
                    >
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/multiple-wmts-layers.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import AggregateImageSource from '@giro3d/giro3d/sources/AggregateImageSource.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.epsg3857;
const lowerLeft = new Coordinates(crs, -571790, 5144751);
const upperRight = new Coordinates(crs, 961225, 6577787);
const extent = new Extent(crs, lowerLeft.x, upperRight.x, lowerLeft.y, upperRight.y);
const center = extent.centerAsVector3();

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

instance.view.camera.position.set(center.x, center.y - 1, 5_000_000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.copy(extent.centerAsVector3());
instance.view.setControls(controls);

const map = new Map({ extent, backgroundColor: 'gray' });

instance.add(map);

// Define WMTS layers
const wmtsLayers = [
    { layer: 'TRANSPORTNETWORKS.ROADS', imageFormat: 'image/png', zIndex: 2 },
    { layer: 'ADMINEXPRESS-COG.LATEST', imageFormat: 'image/png', zIndex: 1 },
    { layer: 'ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO', imageFormat: 'image/jpeg', zIndex: 0 },
];

/** @type {WmtsSource[]} */
let sources = [];

/** @type {AggregateImageSource} */
let aggregateSource;

async function loadLayers() {
    const capabilities =
        'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

    const promises = wmtsLayers
        // Sort by z-index so that they appear in the correct order in the stack
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(({ layer, imageFormat }) =>
            // Create a WMTS source from the layer name
            WmtsSource.fromCapabilities(capabilities, { layer, imageFormat }),
        );

    sources = await Promise.all(promises);

    // Let's build the aggregate source that combines all WMTS sources
    aggregateSource = new AggregateImageSource({ sources });

    await map.addLayer(new ColorLayer({ source: aggregateSource }));

    for (let i = 0; i < wmtsLayers.length; i++) {
        const name = wmtsLayers[i].layer;
        // Bind the example GUI to each source
        bindToggle(name, show => aggregateSource.setSourceVisibility(sources[i], show));
    }
}

loadLayers();

// Attach the inspector
Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/no-data-elimination.md

Source Path: manuals/examples/no-data-elimination.md

# No-data elimination

## Официальный кейс
- Slug: `no-data-elimination`
- Официальная страница: https://giro3d.org/latest/examples/no-data-elimination.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/no-data-elimination.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/no-data-elimination.js`

## Краткое описание (official)
Display an elevation COG and discard no-data values.

## Расширенное описание (official longdesc)
The `NoDataOptions` of the `Layer` class can be used to replace no-data values with interpolated neighbouring pixels.

## Теги (official)
- `map`
- `nodata`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=no-data-elimination npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/no-data-elimination.html
```html
---
title: No-data elimination
shortdesc: Display an elevation COG and discard no-data values.
longdesc: The <a href="../apidoc/interfaces/core.layer.NoDataOptions.html" target="_blank"><code>NoDataOptions</code></a> of the <a href="../apidoc/classes/core.layer.Layer.html" target="_blank"><code>Layer</code></a> class can be used to replace no-data values with interpolated neighbouring pixels.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [map, nodata]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Options</div>

        <div class="card-body" id="options">
            <div class="mb-3">
                <label for="noDataLayerSource" class="form-label">Layer type</label>
                <select id="noDataLayerSource" class="form-select" autocomplete="off">
                    <option value="0">Elevation layer</option>
                    <option value="1">Mask layer</option>
                    <option value="2">Color layer</option>
                </select>
            </div>

            <div class="mb-3">
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="enableFillNoData"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="enableFillNoData"
                        >Enable fill no-data</label
                    >
                </div>
            </div>

            <div class="mb-3">
                <label for="alphaReplacement" class="form-label">Replace no-data pixels with</label>
                <select id="alphaReplacement" class="form-select" autocomplete="off">
                    <option value="1">Opaque alpha</option>
                    <option value="0" selected>Transparent alpha</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="maxDistanceSlider" class="form-label">Max distance (meters)</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value="10000"
                        step="100"
                        class="form-range"
                        id="maxDistanceSlider"
                        autocomplete="off"
                    />
                </div>
            </div>

            <div class="mb-3">
                <button type="button" class="btn btn-primary" id="applyChanges">
                    Apply changes
                </button>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/no-data-elimination.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import { Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer';
import MaskLayer from '@giro3d/giro3d/core/layer/MaskLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:26910',
    '+proj=utm +zone=10 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const extent = new Extent(crs, 532622, 569790, 5114416, 5137240);

const center = extent.centerAsVector3();

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null,
});

instance.view.camera.position.set(center.x, center.y - 1, 50000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(center.x, center.y, center.z);
instance.view.setControls(controls);

// Use an elevation COG with nodata values
const source = new GeoTIFFSource({
    // https://pubs.er.usgs.gov/publication/ds904
    url: 'https://3d.oslandia.com/dem/msh2009dem.tif',
    crs,
});

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));

const min = 227;
const max = 2538;

const colorMap = new ColorMap({ colors, min, max, mode: ColorMapMode.Elevation });

const noDataOptions = {
    alpha: 0,
    maxSearchDistance: 10000,
    replaceNoData: true,
};

const map = new Map({
    extent,
    side: DoubleSide,
    backgroundOpacity: 0,
    lighting: true,
    discardNoData: true,
});

instance.add(map);

let elevationLayer;
let maskLayer;
let colorLayer;

let activeLayer = 0;

function updateActiveLayer() {
    elevationLayer.visible = false;
    maskLayer.visible = false;
    colorLayer.visible = false;

    switch (activeLayer) {
        case 0:
            elevationLayer.visible = true;
            map.backgroundOpacity = 0;
            map.discardNoData = true;
            break;
        case 1:
            maskLayer.visible = true;
            map.backgroundOpacity = 1;
            map.discardNoData = false;
            break;
        case 2:
        default:
            colorLayer.visible = true;
            map.backgroundOpacity = 0;
            map.discardNoData = false;
            break;
    }
}

function buildLayers() {
    map.removeLayer(elevationLayer);
    map.removeLayer(maskLayer);
    map.removeLayer(colorLayer);

    maskLayer = new MaskLayer({
        name: 'mask',
        extent,
        source,
        noDataOptions,
        preloadImages: false,
    });

    elevationLayer = new ElevationLayer({
        name: 'elevation',
        extent,
        source,
        noDataOptions,
        colorMap,
        preloadImages: false,
        minmax: { min, max },
    });

    colorLayer = new ColorLayer({
        name: 'color',
        extent,
        source,
        noDataOptions,
        colorMap,
        preloadImages: false,
    });

    map.addLayer(elevationLayer);
    map.addLayer(maskLayer);
    map.addLayer(colorLayer);

    updateActiveLayer();

    instance.notifyChange(map);
}

const [, , alphaReplacementInput] = bindNumericalDropDown('alphaReplacement', value => {
    noDataOptions.alpha = value;
    instance.notifyChange(map);
});

const [, , radiusSlider] = bindSlider('maxDistanceSlider', v => {
    noDataOptions.maxSearchDistance = v;
});

bindToggle('enableFillNoData', state => {
    noDataOptions.replaceNoData = state;
    if (!state) {
        radiusSlider.setAttribute('disabled', '');
        alphaReplacementInput.setAttribute('disabled', '');
    } else {
        radiusSlider.removeAttribute('disabled');
        alphaReplacementInput.removeAttribute('disabled');
    }
});

bindNumericalDropDown('noDataLayerSource', v => {
    activeLayer = v;
});

buildLayers();

document.getElementById('applyChanges').onclick = function onclick() {
    buildLayers();
};

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/no-data-reprojection.md

Source Path: manuals/examples/no-data-reprojection.md

# No-data elimination after reprojection

## Официальный кейс
- Slug: `no-data-reprojection`
- Официальная страница: https://giro3d.org/latest/examples/no-data-reprojection.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/no-data-reprojection.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/no-data-reprojection.js`

## Краткое описание (official)
Illustrates no-data elimination at the edges of a dataset after reprojection.

## Расширенное описание (official longdesc)
The shown dataset does not have any no-data pixels. However, reprojecting it to a different CRS leaves empty areas at the edge, which become no-data areas. This example checks that those new no-data areas are correctly handled by the no-data filling algorithm.

## Теги (official)
- `map`
- `nodata`
- `geotiff`
- `reprojection`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=no-data-reprojection npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/no-data-reprojection.html
```html
---
title: No-data elimination after reprojection
shortdesc: Illustrates no-data elimination at the edges of a dataset after reprojection.
longdesc: The shown dataset does not have any no-data pixels. However, reprojecting it to a different CRS leaves empty areas at the edge, which become no-data areas. This example checks that those new no-data areas are correctly handled by the no-data filling algorithm.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [map, nodata, geotiff, reprojection]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Options</div>

        <div class="card-body" id="options">
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="enableFillNoData"
                    autocomplete="off"
                />
                <label class="form-check-label" for="enableFillNoData">Hide no-data pixels</label>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/no-data-reprojection.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import { Box3Helper, Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap, { ColorMapMode } from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer';
import Map from '@giro3d/giro3d/entities/Map';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:32742',
    '+proj=utm +zone=42 +south +datum=WGS84 +units=m +no_defs +type=crs',
);

const datasetExtent = new Extent(
    CoordinateSystem.epsg3857,
    -13581040.085,
    -13469591.026,
    5780261.83,
    5942165.048,
);

const extent = datasetExtent.clone().as(crs);

const instance = new Instance({
    target: 'view',
    crs,
});

instance.view.camera.position.set(1305865, 24791965, 243407);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(1305865, 24791964, 1000);
instance.view.setControls(controls);

// Use an elevation COG with nodata values
const source = new GeoTIFFSource({
    // https://pubs.er.usgs.gov/publication/ds904
    url: 'https://3d.oslandia.com/cog_data/COG_EPSG3857_USGS_13_n47w122_20220919.tif',
    crs: CoordinateSystem.epsg3857,
});

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));

const min = 263;
const max = 4347;

const colorMap = new ColorMap({ colors, min, max, mode: ColorMapMode.Elevation });

const noDataOptions = {
    alpha: 0,
    maxSearchDistance: Infinity,
    replaceNoData: true,
};

const elevationLayer = new ElevationLayer({
    name: 'elevation',
    extent,
    source,
    noDataOptions,
    colorMap,
    minmax: { min, max },
});

const map = new Map({
    extent,
    side: DoubleSide,
    backgroundOpacity: 0,
    lighting: true,
    discardNoData: true,
});

instance.add(map);

map.addLayer(elevationLayer);

const box = extent.toBox3(min, min);
const boxHelper = new Box3Helper(box, new Color('yellow'));
instance.add(boxHelper);
boxHelper.updateMatrixWorld();

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

bindToggle('enableFillNoData', state => {
    map.discardNoData = state;
    instance.notifyChange(map);
});
```

---

## Source: manuals/examples/oriented-image-collection.md

Source Path: manuals/examples/oriented-image-collection.md

# Oriented Images

## Официальный кейс
- Slug: `oriented-image-collection`
- Официальная страница: https://giro3d.org/latest/examples/oriented-image-collection.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/oriented-image-collection.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/oriented-image-collection.js`

## Краткое описание (official)
Display oriented images in 3D space.

## Теги (official)
- `drone`
- `camera`
- `point cloud`

## Атрибуция (official)
© 2017, Piero Toffanin

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=oriented-image-collection npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/oriented-image-collection.html
```html
---
title: Oriented Images
shortdesc: Display oriented images in 3D space.
attribution: © <a target="_blank" href="https://github.com/pierotofy/drone_dataset_brighton_beach">2017, Piero Toffanin</a>
tags: [drone, camera, 'point cloud']
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Show/Hide images -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="show-images"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-images">Show images</label>
            </div>

            <!-- Show/Hide origins -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="show-origins"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-origins">Show origins</label>
            </div>

            <!-- Show/Hide frustums -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="show-frustums"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-frustums">Show frustums</label>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/oriented-image-collection.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import OrientedImageCollection from '@giro3d/giro3d/entities/OrientedImageCollection.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import COPCSource from '@giro3d/giro3d/sources/COPCSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:32615',
    `
    PROJCRS["WGS 84 / UTM zone 15N",
    BASEGEOGCRS["WGS 84",
        ENSEMBLE["World Geodetic System 1984 ensemble",
            MEMBER["World Geodetic System 1984 (Transit)"],
            MEMBER["World Geodetic System 1984 (G730)"],
            MEMBER["World Geodetic System 1984 (G873)"],
            MEMBER["World Geodetic System 1984 (G1150)"],
            MEMBER["World Geodetic System 1984 (G1674)"],
            MEMBER["World Geodetic System 1984 (G1762)"],
            MEMBER["World Geodetic System 1984 (G2139)"],
            MEMBER["World Geodetic System 1984 (G2296)"],
            ELLIPSOID["WGS 84",6378137,298.257223563,
                LENGTHUNIT["metre",1]],
            ENSEMBLEACCURACY[2.0]],
        PRIMEM["Greenwich",0,
            ANGLEUNIT["degree",0.0174532925199433]],
        ID["EPSG",4326]],
    CONVERSION["UTM zone 15N",
        METHOD["Transverse Mercator",
            ID["EPSG",9807]],
        PARAMETER["Latitude of natural origin",0,
            ANGLEUNIT["degree",0.0174532925199433],
            ID["EPSG",8801]],
        PARAMETER["Longitude of natural origin",-93,
            ANGLEUNIT["degree",0.0174532925199433],
            ID["EPSG",8802]],
        PARAMETER["Scale factor at natural origin",0.9996,
            SCALEUNIT["unity",1],
            ID["EPSG",8805]],
        PARAMETER["False easting",500000,
            LENGTHUNIT["metre",1],
            ID["EPSG",8806]],
        PARAMETER["False northing",0,
            LENGTHUNIT["metre",1],
            ID["EPSG",8807]]],
    CS[Cartesian,2],
        AXIS["(E)",east,
            ORDER[1],
            LENGTHUNIT["metre",1]],
        AXIS["(N)",north,
            ORDER[2],
            LENGTHUNIT["metre",1]],
    USAGE[
        SCOPE["Navigation and medium accuracy spatial referencing."],
        AREA["Between 96°W and 90°W, northern hemisphere between equator and 84°N, onshore and offshore. Canada - Manitoba; Nunavut; Ontario. Ecuador -Galapagos. Guatemala. Mexico. United States (USA)."],
        BBOX[0,-96,84,-90]],
    ID["EPSG",32615]]`,
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null,
});

const pointCloud = new PointCloud({
    source: new COPCSource({
        url: 'https://3d.oslandia.com/giro3d/drone/brighton-beach/model.copc.laz',
    }),
});

instance.add(pointCloud).then(() => {
    const pov = instance.view.goTo(pointCloud);

    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.target.copy(pov.target);
    controls.saveState();
    instance.view.setControls(controls);

    StatusBar.bind(instance);
});

const orientedImageCollection = new OrientedImageCollection({
    locationSpheres: {
        visible: true,
        radius: 0.5,
        color: 'red',
    },
    frustums: {
        visible: true,
        color: 'yellow',
    },
    images: {
        visible: true,
    },
    source: {
        images: [
            {
                position: { x: 576699.898987649, y: 5188128.736938151, z: 198.6 },
                distance: 10,
                aspectRatio: 1.77,
                fov: 47.6365,
                orientation: { heading: 44.2, pitch: -89.9, roll: 0 },
                imageUrl:
                    'https://3d.oslandia.com/giro3d/drone/brighton-beach/images/DJI_0030.webp',
            },
            {
                position: { x: 576709.723136936, y: 5188139.050652663, z: 198.7 },
                distance: 10,
                aspectRatio: 1.77,
                fov: 47.6365,
                orientation: { heading: 41.4, pitch: -89.9, roll: 0 },
                imageUrl:
                    'https://3d.oslandia.com/giro3d/drone/brighton-beach/images/DJI_0031.webp',
            },
            {
                position: { x: 576718.9197612616, y: 5188148.738897609, z: 198.6 },
                distance: 10,
                aspectRatio: 1.77,
                fov: 47.6365,
                orientation: { heading: 42.8, pitch: -89.9, roll: 0 },
                imageUrl:
                    'https://3d.oslandia.com/giro3d/drone/brighton-beach/images/DJI_0032.webp',
            },
            {
                position: { x: 576728.5399550111, y: 5188158.432584833, z: 198.6 },
                distance: 10,
                aspectRatio: 1.77,
                fov: 47.6365,
                orientation: { heading: 42, pitch: -89.9, roll: 2.3 },
                imageUrl:
                    'https://3d.oslandia.com/giro3d/drone/brighton-beach/images/DJI_0033.webp',
            },
            {
                position: { x: 576737.9483180544, y: 5188168.123573817, z: 198.5 },
                distance: 10,
                aspectRatio: 1.77,
                fov: 47.6365,
                orientation: { heading: 44.7, pitch: -89.9, roll: 0 },
                imageUrl:
                    'https://3d.oslandia.com/giro3d/drone/brighton-beach/images/DJI_0034.webp',
            },
            {
                position: { x: 576747.1448514065, y: 5188177.811863552, z: 198.5 },
                distance: 10,
                aspectRatio: 1.77,
                fov: 47.6365,
                orientation: { heading: 45.3, pitch: -89.9, roll: 0 },
                imageUrl:
                    'https://3d.oslandia.com/giro3d/drone/brighton-beach/images/DJI_0035.webp',
            },
        ],
    },
});

instance.add(orientedImageCollection).catch(console.error);

Inspector.attach('inspector', instance);

bindToggle('show-frustums', v => (orientedImageCollection.showFrustums = v));
bindToggle('show-images', v => (orientedImageCollection.showImages = v));
bindToggle('show-origins', v => (orientedImageCollection.showLocationSpheres = v));
```

---

## Source: manuals/examples/osm.md

Source Path: manuals/examples/osm.md

# OpenStreetMap layer

## Официальный кейс
- Slug: `osm`
- Официальная страница: https://giro3d.org/latest/examples/osm.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/osm.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/osm.js`

## Краткое описание (official)
Display an OpenStreetMap layer on a Map.

## Теги (official)
- `map`
- `osm`
- `layer`

## Атрибуция (official)
© OpenStreetMap contributors.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=osm npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/osm.html
```html
---
title: OpenStreetMap layer
shortdesc: Display an OpenStreetMap layer on a Map.
attribution: © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.
tags: [map, osm, layer]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/osm.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import OSM from 'ol/source/OSM.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

const map = new Map({ extent });

instance.add(map);

// Create the OpenStreetMap color layer using an OpenLayers source.
// See https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
// for more informations.
const osm = new ColorLayer({
    name: 'osm',
    source: new TiledImageSource({ source: new OSM() }),
});

map.addLayer(osm);

instance.view.camera.position.set(0, 0, 80000000);

const controls = new MapControls(instance.view.camera, instance.domElement);

instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/partial-layer.md

Source Path: manuals/examples/partial-layer.md

# Partial layers

## Официальный кейс
- Slug: `partial-layer`
- Официальная страница: https://giro3d.org/latest/examples/partial-layer.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/partial-layer.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/partial-layer.js`

## Краткое описание (official)
Illustrates the use of layers partially overlapping their parent Map.

## Теги (official)
- `map`
- `layer`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=partial-layer npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/partial-layer.html
```html
---
title: Partial layers
shortdesc: Illustrates the use of layers partially overlapping their parent Map.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, layer]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/partial-layer.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import TileWMS from 'ol/source/TileWMS.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const extent = new Extent(crs, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);

const instance = new Instance({
    target: 'view',
    crs,
});

const map = new Map({ extent, lighting: true, backgroundColor: 'white' });
instance.add(map);

// Adds a WMS imagery layer
const colorSource = new TiledImageSource({
    source: new TileWMS({
        url: 'https://data.geopf.fr/wms-r',
        projection: 'EPSG:3946',
        params: {
            LAYERS: ['ORTHOIMAGERY.ORTHOPHOTOS'],
            FORMAT: 'image/jpeg',
        },
    }),
});

// Define a smaller extent for the layer.
const layerExtent = extent.withMargin(-1000, -1000);

const colorLayer = new ColorLayer({
    name: 'wms_imagery',
    source: colorSource,
    extent: layerExtent,
});
map.addLayer(colorLayer);

// Adds a WMS elevation layer
const elevationSource = new TiledImageSource({
    source: new TileWMS({
        url: 'https://data.geopf.fr/wms-r',
        projection: 'EPSG:3946',
        crossOrigin: 'anonymous',
        params: {
            LAYERS: ['ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES'],
            FORMAT: 'image/x-bil;bits=32',
        },
    }),
    format: new BilFormat(),
    noDataValue: -1000,
});

const elevationLayer = new ElevationLayer({
    name: 'wms_elevation',
    extent,
    resolutionFactor: 1 / 2,
    source: elevationSource,
});

map.addLayer(elevationLayer);

const center = extent.centerAsVector3();
instance.view.camera.position.set(center.x, center.y, 17000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = center;
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/picking.md

Source Path: manuals/examples/picking.md

# Picking

## Официальный кейс
- Slug: `picking`
- Официальная страница: https://giro3d.org/latest/examples/picking.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/picking.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/picking.js`

## Краткое описание (official)
Pick objects with various methods (GPU picking, raycasting...)

## Расширенное описание (official longdesc)
Picking is the action of determining what's underneath the mouse cursor.

## Теги (official)
- `map`
- `point`
- `cloud`
- `picking`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=picking npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/picking.html
```html
---
title: Picking
shortdesc: Pick objects with various methods (GPU picking, raycasting...)
longdesc: Picking is the action of determining what's underneath the mouse cursor.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, point, cloud, picking]
---

<div class="side-pane-with-status-bar" style="width: 30rem">
    <div class="card">
        <h5 class="card-header">Picking</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="pickingHelper"
            >?</span
        >
        <p class="card-text d-none" id="pickingHelper">
            Picking lets you pick Giro3D and native THREE.js objects, and get their coordinates in
            the CRS of the instance.<br />
            Provides various filtering options to enhance precision and performance.
        </p>

        <div class="card-body p-0">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <!-- Parameters -->
                    <form>
                        <!-- Z-scale -->
                        <div class="mb-2">
                            <label for="zScaleSlider" class="col-form-label" id="zScaleLabel"
                                >Z-scale = 1</label
                            >
                            <div class="input-group">
                                <input
                                    type="range"
                                    min="0.1"
                                    max="4"
                                    step="0.1"
                                    value="1"
                                    class="form-range"
                                    id="zScaleSlider"
                                    autocomplete="off"
                                />
                            </div>
                        </div>

                        <!-- Pick events -->
                        <div class="mb-3">
                            <label for="pickEvent" class="form-label">Pick on event</label>
                            <select id="pickEvent" class="form-select">
                                <option value="click">Click</option>
                                <option value="mousemove" selected>Mouse move</option>
                            </select>
                        </div>
                        <!-- Picking radius -->
                        <div class="mb-3">
                            <label for="radius" class="col-form-label">Picking radius</label>
                            <div class="input-group">
                                <input
                                    id="radius"
                                    type="number"
                                    min="0"
                                    max="10"
                                    value="0"
                                    class="form-control"
                                />
                                <span class="input-group-text">pixels</span>
                            </div>
                        </div>
                        <!-- Limit -->
                        <div class="mb-3">
                            <label for="limit" class="col-form-label"
                                >Number of objects (0 for all)</label
                            >
                            <input
                                id="limit"
                                type="number"
                                min="0"
                                max="100"
                                value="0"
                                class="form-control"
                            />
                        </div>

                        <div class="row">
                            <!-- Prefer raycasting -->
                            <div class="col">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="gpuPicking"
                                    />
                                    <label class="form-check-label" for="gpuPicking">
                                        GPU picking
                                    </label>
                                </div>
                            </div>

                            <!-- Picking markers -->
                            <div class="col">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        checked
                                        id="showMarkers"
                                        autocomplete="off"
                                    />
                                    <label class="form-check-label" for="showMarkers">
                                        Show markers
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <!-- Pick map -->
                            <div class="col">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="pickMap"
                                        autocomplete="off"
                                    />
                                    <label class="form-check-label" for="pickMap">
                                        Pick only map
                                    </label>
                                </div>
                            </div>
                            <!-- Pick point cloud -->
                            <div class="col">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="pickPointCloud"
                                        autocomplete="off"
                                    />
                                    <label class="form-check-label" for="pickPointCloud">
                                        Pick only point cloud
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </li>
                <li class="list-group-item">
                    <span id="latency">Pick latency: 12.1 ms</span>
                </li>
                <li class="list-group-item">
                    <div id="emptyWarning" class="p-4">
                        <span class="fs-4 text-secondary">No result to display</span>
                    </div>
                    <!-- Result table -->
                    <table id="table" class="table" style="display: none">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Entity</th>
                                <th scope="col">Object</th>
                                <th scope="col">X</th>
                                <th scope="col">Y</th>
                                <th scope="col">Z</th>
                            </tr>
                        </thead>
                        <tbody id="results">
                            <tr>
                                <td>?</td>
                                <td>?</td>
                                <td>?</td>
                                <td>?</td>
                                <td>?</td>
                                <td>?</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/picking.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Group,
    Mesh,
    MeshLambertMaterial,
    SphereGeometry,
    Vector3,
} from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import BilFormat from '@giro3d/giro3d/formats/BilFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindDropDown } from './widgets/bindDropDown';
import { bindSlider } from './widgets/bindSlider';
import { bindToggle } from './widgets/bindToggle';
import StatusBar from './widgets/StatusBar';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
CoordinateSystem.register(
    'IGNF:WGS84G',
    'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]',
);

const extent = new Extent(crs, -111629.52, 1275028.84, 5976033.79, 7230161.64);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0xcccccc,
});

instance.renderingOptions.enableEDL = true;

const map = new Map({
    name: 'map',
    extent,
    backgroundColor: 'gray',
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
});

instance.add(map);

const noDataValue = -1000;

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    format: new BilFormat(),
    noDataValue,
})
    .then(elevationWmts => {
        map.addLayer(
            new ElevationLayer({
                name: 'wmts_elevation',
                extent: map.extent,
                // We don't need the full resolution of terrain because we are not using any shading
                resolutionFactor: 1 / 8,
                minmax: { min: 0, max: 5000 },
                noDataOptions: {
                    replaceNoData: false,
                },
                source: elevationWmts,
            }),
        );
    })
    .catch(console.error);

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        map.addLayer(
            new ColorLayer({
                name: 'wmts_orthophotos',
                extent: map.extent,
                source: orthophotoWmts,
            }),
        );
    })
    .catch(console.error);

// Create the 3D tiles entity
const pointcloud = new Tiles3D({
    name: 'point cloud',
    url: 'https://3d.oslandia.com/lidar_hd/tileset.json',
    errorTarget: 16,
});

instance.add(pointcloud);

// Add a sunlight
const sun = new DirectionalLight('#ffffff', 1.4);
sun.position.set(-1, -2, 1).normalize();
sun.updateMatrixWorld(true);
instance.scene.add(sun);

// We can look below the floor, so let's light also a bit there
const sun2 = new DirectionalLight('#ffffff', 0.5);
sun2.position.set(0, 1, 1);
sun2.updateMatrixWorld();
instance.scene.add(sun2);

// Add an ambient light
const ambientLight = new AmbientLight(0xffffff, 0.2);
instance.scene.add(ambientLight);

const cube = new Mesh(new BoxGeometry(300, 300, 300), new MeshLambertMaterial({ color: 'blue' }));
cube.name = 'cube';

cube.position.set(913741, 6459089, 369);
instance.add(cube);
cube.updateMatrixWorld(true);

const lookAt = new Vector3(913896, 6459191, 200);

instance.view.camera.position.set(913349.2364044407, 6456426.459171033, 1706.0108044011636);
instance.view.camera.lookAt(lookAt);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target.copy(lookAt);
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

const markerMaterial = new MeshLambertMaterial({
    color: 'red',
});

const markerGroup = new Group();
instance.add(markerGroup);

const options = {
    gpuPicking: false,
    showMarkers: true,
    pickPointCloudOnly: false,
    pickMapOnly: false,
    radius: 0,
    limit: 0,
    pickEvent: 'mousemove',
};

bindDropDown('pickEvent', v => (options.pickEvent = v));

bindToggle('gpuPicking', v => (options.gpuPicking = v));
bindToggle('showMarkers', v => {
    options.showMarkers = v;
    if (!v) {
        markerGroup.clear();
        instance.notifyChange();
    }
});
bindToggle('pickMap', v => (options.pickMapOnly = v));
bindToggle('pickPointCloud', v => (options.pickPointCloudOnly = v));

bindSlider('radius', v => (options.radius = v));
bindSlider('limit', v => (options.limit = v));

function updateResultTable(pickResults) {
    const table = document.getElementById('table');
    const resultList = document.getElementById('results');

    resultList.innerHTML = '';

    function column(content) {
        const col = document.createElement('td');
        col.innerHTML = content;
        return col;
    }

    const emptyWarning = document.getElementById('emptyWarning');
    if (pickResults.length > 0) {
        emptyWarning.style.display = 'none';
        table.style.display = 'unset';
    } else {
        emptyWarning.style.display = 'unset';
        table.style.display = 'none';
    }

    for (let index = 0; index < pickResults.length; index++) {
        const pickResult = pickResults[index];
        const tr = document.createElement('tr');

        // result #
        tr.appendChild(column(`${index}`));
        // entity
        const entity = pickResult.entity;
        tr.appendChild(column(entity ? `<code>${pickResult.entity?.name}</code>` : 'none'));
        // picked object
        const type = pickResult.object.type;
        tr.appendChild(column(`<span class="badge rounded-pill text-bg-primary">${type}</span>`));

        /** @type {Vector3} */
        const point = pickResult.point;

        // X, Y, Z coordinates of point
        tr.appendChild(column(point.x.toFixed(0)));
        tr.appendChild(column(point.y.toFixed(0)));
        tr.appendChild(column(point.z.toFixed(0)));

        resultList.appendChild(tr);
    }
}

const sphere = new SphereGeometry(8);

function performPicking(mouseEvent) {
    // Determine which entities to include
    let where = [];
    if (options.pickMapOnly) {
        where.push(map);
    }

    if (options.pickPointCloudOnly) {
        where.push(pointcloud);
    }

    const pickOptions = {
        limit: options.limit === 0 ? undefined : options.limit,
        radius: options.radius,
        gpuPicking: options.gpuPicking,
        where: where.length > 0 ? where : undefined,
        sortByDistance: true,
    };

    const start = performance.now();
    const results = instance.pickObjectsAt(mouseEvent, pickOptions);
    const end = performance.now();

    document.getElementById('latency').innerText = `Latency: ${(end - start).toFixed(1)} ms`;

    const noRaycast = () => {
        /** empty */
    };

    if (options.showMarkers && results.length > 0) {
        const position = results[0].point;
        const marker = new Mesh(sphere, markerMaterial);
        // Disable raycasting on markers to avoid picking them.
        marker.raycast = noRaycast;
        if (markerGroup.children.length > 30) {
            const removed = markerGroup.children.splice(0, markerGroup.children.length - 30);
            removed.forEach(item => item.removeFromParent());
        }

        // - In the case of CPU picking, the Z value is simply the Z-coordinate of
        // the picked point, which itself is affected by the scale of the scene.
        //
        // - In the case of GPU picking, the Z value is sampled from the texture, unaffected
        // by the scale of the scene. That is why we have to apply the scene scale to obtain the
        // correct world space coordinate.
        if (options.gpuPicking) {
            position.multiply(instance.scene.scale);
        }

        marker.position.copy(position);
        // Notice we use attach instead of add so that world position is
        // preserved in case of non-default scale.
        markerGroup.attach(marker);
        marker.updateMatrixWorld(true);
        instance.notifyChange();
    }

    updateResultTable(results);
}

function onMouseMove(mouseEvent) {
    if (options.pickEvent === 'mousemove') {
        performPicking(mouseEvent);
    }
}

function onMouseClick(mouseEvent) {
    if (options.pickEvent === 'click') {
        performPicking(mouseEvent);
    }
}

bindSlider('zScaleSlider', v => {
    document.getElementById('zScaleLabel').innerText = `Z-scale = ${v.toFixed(1)}`;

    instance.scene.scale.setZ(v);
    instance.scene.updateMatrixWorld(true);
    instance.notifyChange(map);
});

instance.domElement.addEventListener('mousemove', onMouseMove);
instance.domElement.addEventListener('click', onMouseClick);

instance.scene.updateMatrixWorld(true);

instance.notifyChange();

Inspector.attach('inspector', instance);

StatusBar.bind(instance, { disableCoordinates: true });
```

---

## Source: manuals/examples/point-cloud-classification.md

Source Path: manuals/examples/point-cloud-classification.md

# Point cloud classification

## Официальный кейс
- Slug: `point-cloud-classification`
- Официальная страница: https://giro3d.org/latest/examples/point-cloud-classification.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/point-cloud-classification.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/point-cloud-classification.js`

## Краткое описание (official)
Display a classified point cloud.

## Расширенное описание (official longdesc)
To make use of classification data available in 3D Tiles point cloud, set `pointCloudMode` to `MODE.CLASSIFICATION`. Updating a classification (color and visibility) is done directly on the entity through the `pointCloudClassifications` property.

## Теги (official)
- `point cloud`
- `classification`
- `3d tiles`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=point-cloud-classification npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-classification.html
```html
---
title: Point cloud classification
shortdesc: Display a classified point cloud.
longdesc: To make use of classification data available in 3D Tiles point cloud, set <a target="_blank" href="../apidoc/classes/entities.Tiles3D.html#pointCloudMode"><code>pointCloudMode</code></a> to <code>MODE.CLASSIFICATION</code>. Updating a classification (color and visibility) is done directly on the entity through the <a target="_blank" href="../apidoc/classes/entities.Tiles3D.html#pointCloudClassifications"><code>pointCloudClassifications</code></a> property.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: ['point cloud', classification, '3d tiles']
---

<div class="side-pane-with-status-bar" style="width: 21rem">
    <div class="mh-100 overflow-y-auto">
        <div class="card mb-1">
            <div class="card-header">Options</div>

            <div class="card-body">
                <fieldset>
                    <!-- Point size -->
                    <div class="input-group mb-2">
                        <label for="pointSize" class="form-label">Point size</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value="0"
                            class="form-range"
                            id="pointSize"
                            autocomplete="off"
                        />
                    </div>

                    <!-- Enable point cloud effects -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked="true"
                            role="switch"
                            id="postProcessingEffects"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="postProcessingEffects"
                            >Post-processing effects</label
                        >
                    </div>
                </fieldset>
            </div>
        </div>

        <div class="card mb-1">
            <div class="card-header">Classifications</div>

            <div class="card-body">
                <fieldset id="classifications">
                    <!-- Classifications are added dynamically from the JS example -->
                </fieldset>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-classification.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Color, Mesh } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { ASPRS_CLASSIFICATIONS, MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null, // To make the canvas transparent and show the actual CSS background
});

// Enables post-processing effects to improve readability of point cloud.
instance.renderingOptions.enableEDL = true;
instance.renderingOptions.enableInpainting = true;
instance.renderingOptions.enablePointCloudOcclusion = true;

instance.view.camera.position.set(227137, 6876151, 128);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(227423, 6876442, 0);
controls.saveState();
instance.view.setControls(controls);

const classifications = ASPRS_CLASSIFICATIONS.map(c => c.clone());

// The default classifications provide colors for classifications 0-63,
// i.e the reserved range for ASPRS classifications.
// Classifications in the 64-255 range are user-defined.
classifications[64].color = new Color(0x94a770); // Classification "Sursol pérenne"
classifications[65].color = new Color(0xd3ff00); // Classification "Artefacts"
classifications[66].color = new Color(0x00ff8d); // Classification "Points virtuels"

// Original dataset extracted from the French IGN LIDAR HD
// database (https://geoservices.ign.fr/lidarhd#telechargementclassifiees),
// then converted to 3D Tiles with py3dtiles (https://gitlab.com/py3dtiles/py3dtiles)
const url =
    'https://3d.oslandia.com/giro3d/3d-tiles/LHD_FXX_0227_6877_PTS_C_LAMB93_IGN69/tileset.json';

const pointcloud = new Tiles3D({
    url,
    // Attributes in the original tileset do not have the same casing
    // as the names expected by the entity, so we have to map them.
    pointCloudAttributeMapping: {
        classification: 'Classification',
        scalar: 'Intensity',
    },
    pointCloudMode: MODE.CLASSIFICATION,
    errorTarget: 14,
    classifications,
});

instance.add(pointcloud);

const classificationNames = new Array(32);

// GUI controls for classification handling

function addClassification(number, name) {
    const currentColor = pointcloud.pointCloudClassifications[number].color.getHexString();

    const template = `
    <div class="form-check form-switch">
        <input
            class="form-check-input"
            type="checkbox"
            checked
            role="switch"
            id="class-${number}"
            autocomplete="off"
        />
        <label class="form-check-label w-100" for="class-${number}">
            <div class="row">
                <div class="col" >${name}</div>
                <div class="col-auto">
                    <input
                        type="color"
                        style="height: 1.5rem"
                        class="form-control form-control-color float-end"
                        id="color-${number}"
                        value="#${currentColor}"
                        title="Classification color"
                    />
                </div>
            </div>
        </label>
    </div>
    `;

    const node = document.createElement('div');
    node.innerHTML = template;
    document.getElementById('classifications').appendChild(node);

    // Let's change the classification color with the color picker value
    bindColorPicker(`color-${number}`, v => {
        // Parse it into a THREE.js color
        const color = new Color(v);

        pointcloud.pointCloudClassifications[number].color = color;

        instance.notifyChange();
    });

    classificationNames[number] = name;

    bindToggle(`class-${number}`, enabled => {
        // By toggling the .visible property of a classification,
        // all points that have this classification are hidden/shown.
        pointcloud.pointCloudClassifications[number].visible = enabled;
        instance.notifyChange();
    });
}

// Standard ASPRS classifications found in the dataset
addClassification(1, 'Unclassified');
addClassification(2, 'Ground');
addClassification(3, 'Low vegetation');
addClassification(4, 'Medium vegetation');
addClassification(5, 'High vegetation');
addClassification(6, 'Building');
addClassification(9, 'Water');

// Dataset-specific classifications
addClassification(64, 'Permanent above-ground structures');
addClassification(65, 'Artifacts');
addClassification(67, 'Virtual points');

const labelElement = document.createElement('div');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';

const classifName = document.createElement('span');
classifName.style.marginLeft = '0.5rem';

const classifColor = document.createElement('span');
classifColor.classList.value = 'badge rounded-pill';
classifColor.style.color = 'white';
classifColor.style.background = 'red';
classifColor.style.width = '1rem';
classifColor.innerText = ' ';

labelElement.appendChild(classifColor);
labelElement.appendChild(classifName);

const label = new CSS2DObject(labelElement);

instance.add(label);

// Let's query the classification of the picked point and display it in the label.
function updateLabel(mouseEvent) {
    const results = instance.pickObjectsAt(mouseEvent, { radius: 6 });

    // Reset label visibility
    label.visible = false;

    if (results && results.length > 0) {
        for (const result of results) {
            const { object, point, index } = result;

            if (!(object instanceof Mesh)) {
                continue;
            }

            const classificationIndex = object.geometry.getAttribute('classification').getX(index);

            const classification = pointcloud.pointCloudClassifications[classificationIndex];

            // Let's ignore hidden classifications
            if (classification && classification.visible) {
                const color = classification.color.getHexString();
                classifColor.style.background = `#${color}`;

                classifName.innerText = classificationNames[classificationIndex];

                label.visible = true;
                label.position.copy(point);
                label.updateMatrixWorld(true);

                break;
            }
        }
    }

    instance.notifyChange();
}

bindSlider('pointSize', v => {
    pointcloud.pointSize = v;
    instance.notifyChange(pointcloud);
});

bindToggle('postProcessingEffects', v => {
    instance.renderingOptions.enableEDL = v;
    instance.renderingOptions.enableInpainting = v;
    instance.renderingOptions.enablePointCloudOcclusion = v;
    instance.notifyChange(pointcloud);
});

instance.domElement.addEventListener('mousemove', updateLabel);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/point-cloud-hybrid-coloring.md

Source Path: manuals/examples/point-cloud-hybrid-coloring.md

# PointCloud Hybrid Coloring

## Официальный кейс
- Slug: `point-cloud-hybrid-coloring`
- Официальная страница: https://giro3d.org/latest/examples/point-cloud-hybrid-coloring.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/point-cloud-hybrid-coloring.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/point-cloud-hybrid-coloring.js`

## Краткое описание (official)
Display a point cloud colored by a combination of several attributes

## Теги (official)
- `point cloud`
- `las`
- `copc`

## Атрибуция (official)
Autzen stadium dataset provided by United States Geological Survey and Hobu, Inc.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=point-cloud-hybrid-coloring npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-hybrid-coloring.html
```html
---
title: PointCloud Hybrid Coloring
shortdesc: Display a point cloud colored by a combination of several attributes
tags: ['point cloud', 'las', 'copc']
attribution: Autzen stadium dataset provided by <a href="https://www.usgs.gov" target="_blank">United States Geological Survey</a> and <a href="https://hobu.co/" target="_blank">Hobu, Inc.</a>
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <div class="progress" role="progressbar">
        <div
            class="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
            id="progress"
            style="width: 0%"
        >
            Loading metadata...
        </div>
    </div>

    <!-- Error message -->
    <div class="alert alert-danger mt-0 mb-0" id="message" style="display: none" role="alert">
        A simple primary alert—check it out!
    </div>

    <!--Parameters -->
    <div class="card-body">
        <!-- Accordion -->
        <div class="accordion" style="display: none" id="accordion">
            <!-- Section: options -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-options"
                        aria-expanded="false"
                        aria-controls="section-options"
                    >
                        Options
                    </button>
                </h2>

                <div
                    id="section-options"
                    class="accordion-collapse collapse p-2"
                    data-bs-parent="#accordion"
                >
                    <!-- Eye Dome Lighting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="edl"
                            autocomplete="off"
                        />
                        <label
                            title="Toggles Eye Dome Lighting post-processing effect"
                            class="form-check-label"
                            for="edl"
                            >Eye Dome Lighting</label
                        >
                    </div>

                    <!-- Inpainting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="inpainting"
                            autocomplete="off"
                        />
                        <label title="Toggles inpainting" class="form-check-label" for="inpainting"
                            >Inpainting</label
                        >
                    </div>

                    <!-- Point size slider -->
                    <label for="point-size" class="form-label mt-2" id="point-size-label"
                        >Point size: <b>auto</b></label
                    >
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value="0"
                        title="The point size, in pixels"
                        class="form-range"
                        id="point-size"
                        autocomplete="off"
                    />

                    <!-- Subdivision threshold slider -->
                    <label
                        for="subdivision-threshold"
                        id="subdivision-threshold-label"
                        class="form-label"
                        >Subdvision threshold: <b>1.0</b></label
                    >
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value="1"
                        title="The subdivision threshold of the point cloud. The lower, the higher the number of points simultaneously displayed."
                        class="form-range"
                        id="subdivision-threshold"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Section: coloring -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-coloring"
                        aria-expanded="true"
                        aria-controls="section-coloring"
                    >
                        Coloring
                    </button>
                </h2>

                <div
                    id="section-coloring"
                    class="accordion-collapse collapse p-2 show"
                    data-bs-parent="#accordion"
                >
                    <fieldset class="border p-2 mb-3">
                        <legend class="float-none w-auto form-text mb-0 px-2">
                            "Color" attribute
                        </legend>
                        <label class="d-flex">
                            <span class="me-3">Weight</span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value="0.5"
                                title="The subdivision threshold of the point cloud. The lower, the higher the number of points simultaneously displayed."
                                class="form-range"
                                id="color-weight"
                                autocomplete="off"
                            />
                        </label>
                    </fieldset>
                    <fieldset class="border p-2 mb-3">
                        <legend class="float-none w-auto form-text mb-0 px-2">"Z" attribute</legend>
                        <div>
                            <label class="d-flex">
                                <span class="me-3">Weight</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value="0"
                                    title="The subdivision threshold of the point cloud. The lower, the higher the number of points simultaneously displayed."
                                    class="form-range"
                                    id="z-weight"
                                    autocomplete="off"
                                />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="border p-2 mb-3">
                        <legend class="float-none w-auto form-text mb-0 px-2">
                            "Classification" attribute
                        </legend>
                        <div>
                            <label class="d-flex">
                                <span class="me-3">Weight</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value="1"
                                    title="The subdivision threshold of the point cloud. The lower, the higher the number of points simultaneously displayed."
                                    class="form-range"
                                    id="classification-weight"
                                    autocomplete="off"
                                />
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-hybrid-coloring.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Color } from 'three';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import COPCSource from '@giro3d/giro3d/sources/COPCSource.js';
import { setLazPerfPath } from '@giro3d/giro3d/sources/las/config.js';

import { bindProgress } from './widgets/bindProgress.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { placeCameraOnTop } from './widgets/placeCameraOnTop.js';
import StatusBar from './widgets/StatusBar.js';

// LAS processing requires the WebAssembly laz-perf library
// This path is specific to your project, and must be set accordingly.
setLazPerfPath('/assets/wasm');

// We use this CRS when the point cloud does not have a CRS defined.
// It is technically the WebMercator CRS, but we label it 'unknown' to make
// it very explicit that it is not correct.
// See https://gitlab.com/giro3d/giro3d/-/issues/514
CoordinateSystem.register(
    'unknown',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
);

/** @type {Instance} */
let instance;

/** @type {PointCloud} */
let entity;

const [setProgress, progressElement] = bindProgress('progress');

bindToggle('edl', v => {
    instance.renderingOptions.enableEDL = v;
    instance.notifyChange();
});

bindToggle('inpainting', v => {
    instance.renderingOptions.enableInpainting = v;
    instance.renderingOptions.enablePointCloudOcclusion = v;
    instance.notifyChange();
});

bindSlider('point-size', size => {
    if (entity) {
        entity.pointSize = size;
        document.getElementById('point-size-label').innerHTML =
            `Point size: <b>${size === 0 ? 'auto' : size.toFixed(0)}</b>`;
    }
});
bindSlider('subdivision-threshold', threshold => {
    if (entity) {
        entity.subdivisionThreshold = threshold;
        document.getElementById('subdivision-threshold-label').innerHTML =
            `Subdivision threshold: <b>${threshold}</b>`;
    }
});

// @ts-expect-error This is a range input.
const /** @type HTMLInputElement */ colorWeightRange = document.getElementById('color-weight');
// @ts-expect-error This is a range input.
const /** @type HTMLInputElement */ zWeightRange = document.getElementById('z-weight');
// @ts-expect-error This is a range input.
const /** @type HTMLInputElement */ classificationWeightRange =
        document.getElementById('classification-weight');

/**
 * @param {number} code
 */
async function fetchCrsDefinitionFromEpsg(code) {
    async function fetchText(url) {
        const res = await fetch(url, { mode: 'cors' });
        const def = await res.text();
        return def;
    }

    return await fetchText(`https://epsg.io/${code}.proj4?download=1`);
}

// Loads the point cloud from the url parameter
async function load(url) {
    progressElement.style.display = 'block';

    // Let's create the source
    const source = new COPCSource({ url });

    source.addEventListener('progress', () => setProgress(source.progress));

    try {
        // Initialize the source in advance, so that we can
        // access the metadata of the remote LAS file.
        await source.initialize();
    } catch (err) {
        if (err instanceof Error) {
            const messageElement = document.getElementById('message');
            messageElement.innerText = err.message;
            messageElement.style.display = 'block';
        }
        progressElement.style.display = 'none';
        console.error(err);
        return;
    }

    const metadata = await source.getMetadata();

    instance = new Instance({
        target: 'view',
        crs: metadata.crs,
        backgroundColor: null,
    });

    // Let's enable Eye Dome Lighting to make the point cloud more readable.
    instance.renderingOptions.enableEDL = true;
    instance.renderingOptions.EDLRadius = 0.6;
    instance.renderingOptions.EDLStrength = 5;

    // Let's create our point cloud with the COPC source.
    entity = new PointCloud({ source });

    await instance.add(entity);

    // Create a black to white color ramp for the "Z" attribute
    const zAttribute = entity.getSupportedAttributes().find(att => att.name === 'Z');
    const colors = [];
    for (let i = 0; i < 255; i++) {
        const v = i / 255;
        colors.push(new Color(v, v, v));
    }
    const colorMap = new ColorMap({
        min: zAttribute.min,
        max: zAttribute.max,
        colors,
    });
    entity.elevationColorMap = colorMap;
    entity.setAttributeColorMap('Z', colorMap);

    const onWeightsUpdate = () => {
        const colorWeight = +colorWeightRange.value;
        const zWeight = +zWeightRange.value;
        const classificationWeight = +classificationWeightRange.value;

        const totalWeight = colorWeight + zWeight + classificationWeight;
        if (totalWeight === 0) {
            // default to color
            colorWeightRange.value = '1';
        }

        colorWeightRange.disabled = zWeight === 0 && classificationWeight === 0;
        zWeightRange.disabled = colorWeight === 0 && classificationWeight === 0;
        classificationWeightRange.disabled = colorWeight === 0 && zWeight === 0;

        if (colorWeightRange.disabled) {
            colorWeightRange.value = '1';
        }
        if (zWeightRange.disabled) {
            zWeightRange.value = '1';
        }
        if (classificationWeightRange.disabled) {
            classificationWeightRange.value = '1';
        }

        entity.setActiveAttributes([
            { name: 'Color', weight: +colorWeightRange.value },
            { name: 'Z', weight: +zWeightRange.value },
            { name: 'Classification', weight: +classificationWeightRange.value },
        ]);
    };

    colorWeightRange.addEventListener('input', onWeightsUpdate);
    zWeightRange.addEventListener('input', onWeightsUpdate);
    classificationWeightRange.addEventListener('input', onWeightsUpdate);
    onWeightsUpdate();

    // Let's get the volume of the point cloud for various operations.
    const volume = entity.getBoundingBox();

    // If the source provides a coordinate system, we can load a map
    // to display as a geographic context and be able to check that the
    // point cloud is properly positioned.
    const epsgCode = metadata.crs.srid?.tryGetEpsgCode();
    if (typeof epsgCode === 'number') {
        try {
            const definitionFromEpsg = await fetchCrsDefinitionFromEpsg(epsgCode);
            CoordinateSystem.register(metadata.crs.id, definitionFromEpsg);
        } catch (e) {
            console.warn('could not load map: ' + e);
        }
    }

    document.getElementById('accordion').style.display = 'block';
    progressElement.style.display = 'none';

    Inspector.attach('inspector', instance);

    if (instance.coordinateSystem.srid) {
        StatusBar.bind(instance, { disableUrlUpdate: true });
    }

    placeCameraOnTop(volume, instance);

    instance.notifyChange();
}

const datasetUrl = 'https://3d.oslandia.com/giro3d/pointclouds/autzen-classified.copc.laz';
load(datasetUrl).catch(console.error);
```

---

## Source: manuals/examples/point-cloud-intensity.md

Source Path: manuals/examples/point-cloud-intensity.md

# Point cloud intensity

## Официальный кейс
- Slug: `point-cloud-intensity`
- Официальная страница: https://giro3d.org/latest/examples/point-cloud-intensity.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/point-cloud-intensity.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/point-cloud-intensity.js`

## Краткое описание (official)
Visualize point cloud intensity with a colormap.

## Теги (official)
- `point cloud`
- `3d tiles`
- `intensity`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=point-cloud-intensity npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-intensity.html
```html
---
title: Point cloud intensity
shortdesc: Visualize point cloud intensity with a colormap.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
dependencies: ['colormap', 'function-curve-editor']
tags: ['point cloud', '3d tiles', intensity]
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">
            Parameters
            <button type="button" id="reset" class="btn btn-sm btn-primary rounded float-end">
                reset
            </button>
        </div>

        <div class="card-body" id="top-options">
            <!-- Reverse color map -->
            <div class="form-check form-switch mb-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="invert"
                    autocomplete="off"
                />
                <label class="form-check-label" for="invert">Invert color map</label>
            </div>

            <!-- Discrete color map -->
            <div class="form-check form-switch mb-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="discrete"
                    autocomplete="off"
                />
                <label class="form-check-label" for="discrete">Discrete color map</label>
            </div>

            <!-- Color ramp selector -->
            <div class="input-group mb-3">
                <label class="input-group-text" for="ramp">Colors</label>
                <select class="form-select" id="ramp" autocomplete="off">
                    <option value="greys" selected>Greys</option>
                    <option value="viridis">Viridis</option>
                    <option value="jet">Jet</option>
                    <option value="blackbody">Blackbody</option>
                    <option value="earth">Earth</option>
                    <option value="bathymetry">Bathymetry</option>
                    <option value="magma">Magma</option>
                    <option value="par">Par</option>
                    <option value="rdbu">RdBu</option>
                </select>
            </div>

            <!-- Gradient preview -->
            <div class="mb-3 w-100">
                <canvas
                    id="gradient"
                    height="32"
                    class="w-100 border rounded"
                    style="height: 32px; image-rendering: pixelated"
                ></canvas>
            </div>

            <!-- Opacity curve -->
            <div class="mb-3 w-100">
                <label for="curve" class="mb-2">Opacity curve</label>
                <canvas id="curve" height="128" class="w-100" style="height: 128px"></canvas>
            </div>

            <!-- Bound sliders -->
            <div class="input-group border rounded p-2">
                <label for="min" id="minLabel" class="form-label">Lower bound</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value="0"
                        class="form-range"
                        id="min"
                        autocomplete="off"
                    />
                </div>

                <label for="max" id="maxLabel" class="form-label">Upper bound</label>
                <div class="input-group">
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value="30"
                        class="form-range"
                        id="max"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-intensity.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import * as FunctionCurveEditor from 'function-curve-editor';
import { Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Tiles3D from '@giro3d/giro3d/entities/Tiles3D.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { MODE } from '@giro3d/giro3d/renderer/PointCloudMaterial.js';

import { bindButton } from './widgets/bindButton.js';
import { bindColorMapBounds } from './widgets/bindColorMapBounds.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 ' +
        '+y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: null, // To make canvas transparent
});

// Enable point cloud post processing effects
instance.renderingOptions.enableEDL = true;
// But not inpainting and occlusion because it would hinder the opacity filtering
instance.renderingOptions.enableInpainting = false;
instance.renderingOptions.enablePointCloudOcclusion = false;

let parameters = {
    ramp: 'greys',
    discrete: false,
    invert: false,
    colors: makeColorRamp('greys', false, false),
    opacity: new Array(256).fill(1),
    min: 0,
    max: 30,
};

const url = 'https://3d.oslandia.com/giro3d/3d-tiles/lidarhd_intensity/tileset.json';

// Create the 3D tiles entity
const pointcloud = new Tiles3D({
    url,
    // Attributes in the original tileset do not have the same casing
    // as the names expected by the entity, so we have to map them.
    pointCloudAttributeMapping: {
        classification: 'Classification',
        scalar: 'Intensity',
    },
    pointCloudMode: MODE.SCALAR,
    colorMap: new ColorMap({
        colors: parameters.colors,
        min: parameters.min,
        max: parameters.max,
        opacities: parameters.opacity,
    }),
});

function placeCamera(position, lookAt) {
    instance.view.camera.position.set(position.x, position.y, position.z);
    instance.view.camera.lookAt(lookAt);
    // create controls
    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.target.copy(lookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    instance.view.setControls(controls);

    instance.notifyChange(instance.view.camera);
}

const tmpVec3 = new Vector3();

// add pointcloud to scene
function initializeCamera() {
    const bbox = pointcloud.getBoundingBox();

    instance.view.camera.far = 2.0 * bbox.getSize(tmpVec3).length();

    const lookAt = bbox.getCenter(tmpVec3);
    lookAt.z = bbox.min.z;

    // const axes = new AxesHelper(1000);

    // instance.add(axes);
    // axes.position.set(lookAt.x, lookAt.y, lookAt.z + 50);
    // axes.updateMatrixWorld(true);

    placeCamera(new Vector3(221965, 6873398, 1951), lookAt);

    StatusBar.bind(instance);
}

instance.add(pointcloud).then(initializeCamera);

Inspector.attach('inspector', instance);

function updatePreview(colors) {
    /** @type {HTMLCanvasElement} */
    // @ts-expect-error conversion
    const canvas = document.getElementById('gradient');
    const ctx = canvas.getContext('2d');

    canvas.width = colors.length;
    canvas.height = 32;

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        ctx.fillStyle = `#${color.getHexString()}`;
        ctx.fillRect(i, 0, 1, canvas.height);
    }
}

updatePreview(parameters.colors);

function updateColorRamp() {
    parameters.colors = makeColorRamp(parameters.ramp, parameters.discrete, parameters.invert);

    pointcloud.colorMap.colors = parameters.colors;
    pointcloud.colorMap.min = parameters.min;
    pointcloud.colorMap.max = parameters.max;
    pointcloud.colorMap.mode = parameters.mode;

    updateTransparency();

    updatePreview(parameters.colors);

    instance.notifyChange(pointcloud);
}

const [setDiscrete] = bindToggle('discrete', v => {
    parameters.discrete = v;
    updateColorRamp();
});
const [setInvert] = bindToggle('invert', v => {
    parameters.invert = v;
    updateColorRamp();
});
const [setRamp] = bindDropDown('ramp', v => {
    parameters.ramp = v;
    updateColorRamp();
    instance.notifyChange(pointcloud);
});
const updateBounds = bindColorMapBounds((min, max) => {
    pointcloud.colorMap.min = min;
    pointcloud.colorMap.max = max;
    instance.notifyChange(pointcloud);
});

const canvas = document.getElementById('curve');
// @ts-expect-error conversion
const widget = new FunctionCurveEditor.Widget(canvas);

function updateTransparency() {
    const length = parameters.colors.length;
    const f = widget.getFunction();
    const opacities = new Array(length);
    for (let i = 0; i < length; i++) {
        const t = i / length;
        opacities[i] = f(t);
    }
    parameters.opacity = opacities;
    pointcloud.colorMap.opacity = opacities;
}

function setupCurveEditor() {
    // Curve editor
    const initialKnots = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ];

    widget.setEditorState({
        knots: initialKnots,
        xMin: -0.2,
        xMax: 1.2,
        yMin: -0.2,
        yMax: 1.2,
        interpolationMethod: 'linear',
        extendedDomain: true,
        relevantXMin: 0,
        relevantXMax: 1,
        gridEnabled: true,
    });

    widget.addEventListener('change', () => {
        updateColorRamp();
    });
}

setupCurveEditor();

function resetToDefaults() {
    setupCurveEditor();

    setRamp('greys');
    setDiscrete(false);
    setInvert(false);
    updateBounds(0, 30);

    parameters = {
        ramp: 'greys',
        discrete: false,
        invert: false,
        colors: makeColorRamp('greys', false, false),
        opacity: new Array(256).fill(1),
        min: 0,
        max: 30,
    };

    pointcloud.colorMap.active = true;

    updateColorRamp();

    instance.notifyChange(pointcloud);
}

bindButton('reset', resetToDefaults);

const labelElement = document.createElement('div');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';

const intensityValue = document.createElement('span');
intensityValue.style.marginLeft = '0.5rem';

const intensityColor = document.createElement('span');
intensityColor.classList.value = 'badge rounded-pill';
intensityColor.style.color = 'white';
intensityColor.style.background = 'red';
intensityColor.style.width = '1rem';
intensityColor.innerText = ' ';

labelElement.appendChild(intensityColor);
labelElement.appendChild(intensityValue);

const label = new CSS2DObject(labelElement);

instance.add(label);

// Let's query the intensity of the picked point and display it in the label.
function updateLabel(mouseEvent) {
    const results = instance.pickObjectsAt(mouseEvent, { radius: 6 });

    // Reset label visibility
    label.visible = false;

    if (results && results.length > 0) {
        for (const result of results) {
            const { object, point, index } = result;

            // @ts-expect-error typing
            if (object.geometry) {
                // @ts-expect-error typing
                const intensity = object.geometry.getAttribute('scalar')?.getX(index);

                if (intensity) {
                    const color = pointcloud.colorMap.sample(intensity);
                    const opacity = pointcloud.colorMap.sampleOpacity(intensity);

                    if (opacity > 0.5) {
                        const hex = color.getHexString();
                        intensityColor.style.background = `#${hex}`;

                        intensityValue.innerText = `${intensity.toFixed(2)}`;

                        label.visible = true;
                        label.position.copy(point);
                        label.updateMatrixWorld(true);

                        break;
                    }
                }
            }
        }
    }

    instance.notifyChange();
}

instance.domElement.addEventListener('mousemove', updateLabel);

// For some reason we have to wait a bit in order to the curve editor to display properly on Firefox.
setTimeout(resetToDefaults, 100);
```

---

## Source: manuals/examples/point-cloud-intersecting-volumes.md

Source Path: manuals/examples/point-cloud-intersecting-volumes.md

# Pointcloud Intersecting Volumes

## Официальный кейс
- Slug: `point-cloud-intersecting-volumes`
- Официальная страница: https://giro3d.org/latest/examples/point-cloud-intersecting-volumes.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/point-cloud-intersecting-volumes.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/point-cloud-intersecting-volumes.js`

## Краткое описание (official)
Demonstrates the Intersecting Volumes feature for point clouds

## Теги (official)
- `point cloud`
- `las`
- `copc`

## Атрибуция (official)
Autzen stadium dataset provided by United States Geological Survey and Hobu, Inc.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=point-cloud-intersecting-volumes npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-intersecting-volumes.html
```html
---
title: Pointcloud Intersecting Volumes
shortdesc: Demonstrates the Intersecting Volumes feature for point clouds
tags: ['point cloud', 'las', 'copc']
attribution: Autzen stadium dataset provided by <a href="https://www.usgs.gov" target="_blank">United States Geological Survey</a> and <a href="https://hobu.co/" target="_blank">Hobu, Inc.</a>
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <div class="progress" role="progressbar">
        <div
            class="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
            id="progress"
            style="width: 0%"
        >
            Loading metadata...
        </div>
    </div>

    <!-- Error message -->
    <div class="alert alert-danger mt-0 mb-0" id="message" style="display: none" role="alert">
        A simple primary alert—check it out!
    </div>

    <!--Parameters -->
    <div class="card-body">
        <!-- Accordion -->
        <div class="accordion" style="display: none" id="accordion">
            <!-- Section: info -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-info"
                        aria-controls="section-info"
                    >
                        Info
                    </button>
                </h2>
                <div
                    id="section-info"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordion"
                >
                    <ul
                        class="list-group list-group-flush"
                        id="table"
                        style="display: none; font-size: 0.875rem"
                    >
                        <li class="list-group-item">
                            Filename
                            <b
                                id="filename"
                                class="d-float float-end text-truncate"
                                style="max-width: 70%"
                            ></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The total number of points in the dataset"
                        >
                            Total points <b id="point-count" class="d-float float-end"></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The number of points currently displayed"
                        >
                            Displayed points
                            <b id="displayed-point-count" class="d-float float-end"></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The coordinate reference system of this dataset"
                        >
                            CRS
                            <a target="_blank" id="projection" class="d-float float-end"></a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Section: options -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-options"
                        aria-expanded="false"
                        aria-controls="section-options"
                    >
                        Options
                    </button>
                </h2>

                <div
                    id="section-options"
                    class="accordion-collapse collapse show p-2"
                    data-bs-parent="#accordion"
                >
                    <!-- Eye Dome Lighting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="edl"
                            autocomplete="off"
                        />
                        <label
                            title="Toggles Eye Dome Lighting post-processing effect"
                            class="form-check-label"
                            for="edl"
                            >Eye Dome Lighting</label
                        >
                    </div>

                    <!-- Inpainting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="inpainting"
                            autocomplete="off"
                        />
                        <label title="Toggles inpainting" class="form-check-label" for="inpainting"
                            >Inpainting</label
                        >
                    </div>

                    <!-- Intersecting volumes -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="intersecting-volumes"
                            autocomplete="off"
                            checked
                        />
                        <label
                            title="Toggles intersecting volumes"
                            class="form-check-label"
                            for="intersecting-volumes"
                            >Intersecting volumes</label
                        >
                    </div>

                    <!-- Point size slider -->
                    <label for="point-size" class="form-label mt-2" id="point-size-label"
                        >Point size: <b>auto</b></label
                    >
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value="0"
                        title="The point size, in pixels"
                        class="form-range"
                        id="point-size"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/point-cloud-intersecting-volumes.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Color, Matrix4, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import COPCSource from '@giro3d/giro3d/sources/COPCSource.js';
import { setLazPerfPath } from '@giro3d/giro3d/sources/las/config.js';

import { bindProgress } from './widgets/bindProgress.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { formatPointCount } from './widgets/formatPointCount.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import { placeCameraOnTop } from './widgets/placeCameraOnTop.js';
import StatusBar from './widgets/StatusBar.js';

// LAS processing requires the WebAssembly laz-perf library
// This path is specific to your project, and must be set accordingly.
setLazPerfPath('/assets/wasm');

// We use this CRS when the point cloud does not have a CRS defined.
// It is technically the WebMercator CRS, but we label it 'unknown' to make
// it very explicit that it is not correct.
// See https://gitlab.com/giro3d/giro3d/-/issues/514
CoordinateSystem.register(
    'unknown',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
);

/** @type {Instance} */
let instance;

const options = {
    mode: 'attribute',
    attribute: 'position',
    colorRamp: 'bathymetry',
    min: 0,
    max: 100,
};

/** @type {PointCloud} */
let entity;

// Create the color map. The color ramp and bounds will be set later.
const colorMap = new ColorMap({ colors: [], min: 0, max: 1 });

const [setProgress, progressElement] = bindProgress('progress');

bindToggle('edl', v => {
    instance.renderingOptions.enableEDL = v;
    instance.notifyChange();
});

bindToggle('inpainting', v => {
    instance.renderingOptions.enableInpainting = v;
    instance.renderingOptions.enablePointCloudOcclusion = v;
    instance.notifyChange();
});

bindSlider('point-size', size => {
    if (entity) {
        entity.pointSize = size;
        document.getElementById('point-size-label').innerHTML =
            `Point size: <b>${size === 0 ? 'auto' : size.toFixed(0)}</b>`;
    }
});

function updateColorMap() {
    if (entity && instance) {
        colorMap.colors = makeColorRamp(options.colorRamp);
        instance.notifyChange();
    }
}

/**
 * @param {number} code
 */
async function fetchCrsDefinitionFromEpsg(code) {
    async function fetchText(url) {
        const res = await fetch(url, { mode: 'cors' });
        const def = await res.text();
        return def;
    }

    return await fetchText(`https://epsg.io/${code}.proj4?download=1`);
}

const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

function updateDisplayedPointCounts(count, displayed) {
    const pointCountElement = document.getElementById('point-count');
    pointCountElement.innerHTML = formatPointCount(count, numberFormat);
    pointCountElement.title = numberFormat.format(count);

    const activePointCountElement = document.getElementById('displayed-point-count');
    activePointCountElement.innerHTML = formatPointCount(displayed, numberFormat);
    activePointCountElement.title = numberFormat.format(displayed);
}

function buildViewProjectionMatrix(camera) {
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    return new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
}

function buildIntersectingVolumes() {
    const result = [];

    const fakePerspCamera = new PerspectiveCamera(90, 1, 200, 1000);
    fakePerspCamera.position.set(638690, 851602, 542);
    fakePerspCamera.lookAt(
        fakePerspCamera.position
            .clone()
            .add(new Vector3(-0.63259536468089, 0.7725958632603044, -0.054025333477148996)),
    );
    result.push({
        worldToBoxNdc: buildViewProjectionMatrix(fakePerspCamera),
        color: new Color(0xff0000),
    });

    const fakeOrthoCamera = new OrthographicCamera(-600, 600, 600, -600, 50, 400);
    fakeOrthoCamera.position.set(637173, 850000, 454);
    fakeOrthoCamera.lookAt(
        fakeOrthoCamera.position
            .clone()
            .add(new Vector3(0.04810697763524398, 0.998397464675122, 0.02980304066854412)),
    );
    result.push({
        worldToBoxNdc: buildViewProjectionMatrix(fakeOrthoCamera),
        color: new Color(0x00ff00),
    });

    return result;
}

const intersectingVolumes = buildIntersectingVolumes();

function updateIntersectingVolumes() {
    entity.intersectingVolumes.length = 0;
    // @ts-expect-error This element is an input
    const /** @type HTMLInputElement */ input = document.getElementById('intersecting-volumes');
    if (input.checked) {
        entity.intersectingVolumes.push(...intersectingVolumes);
    }
}

window.addEventListener('keydown', event => {
    if (event.key === 'g') {
        const camera = instance.view.camera;
        console.log('position', camera.getWorldPosition(new Vector3()).toArray());
        console.log('direction', camera.getWorldDirection(new Vector3()).toArray());
    }
});

function populateGUI() {
    document.getElementById('accordion').style.display = 'block';

    const tableElement = document.getElementById('table');
    tableElement.style.display = 'block';

    /** @type {HTMLLinkElement} */
    // @ts-expect-error casting
    const projectionElement = document.getElementById('projection');
    const epsgCode = instance.coordinateSystem.srid?.tryGetEpsgCode();
    if (typeof epsgCode === 'number') {
        projectionElement.href = `https://epsg.io/${epsgCode}`;
        projectionElement.innerHTML = instance.coordinateSystem.id;
    } else {
        projectionElement.parentElement.remove();
    }

    progressElement.style.display = 'none';
}

// Loads the point cloud from the url parameter
async function load(url) {
    progressElement.style.display = 'block';

    // Let's create the source
    const source = new COPCSource({ url });

    source.addEventListener('progress', () => setProgress(source.progress));

    try {
        // Initialize the source in advance, so that we can
        // access the metadata of the remote LAS file.
        await source.initialize();
    } catch (err) {
        if (err instanceof Error) {
            const messageElement = document.getElementById('message');
            messageElement.innerText = err.message;
            messageElement.style.display = 'block';
        }
        progressElement.style.display = 'none';
        console.error(err);
        return;
    }

    const metadata = await source.getMetadata();

    instance = new Instance({
        target: 'view',
        crs: metadata.crs,
        backgroundColor: null,
    });

    options.attribute = metadata.attributes[0].name;

    // Let's enable Eye Dome Lighting to make the point cloud more readable.
    instance.renderingOptions.enableEDL = true;
    instance.renderingOptions.EDLRadius = 0.6;
    instance.renderingOptions.EDLStrength = 5;

    // Let's create our point cloud with the COPC source.
    entity = new PointCloud({ source });

    await instance.add(entity);

    instance.addEventListener('update-end', () =>
        updateDisplayedPointCounts(entity.pointCount, entity.displayedPointCount),
    );

    // Let's get the volume of the point cloud for various operations.
    const volume = entity.getBoundingBox();

    for (const attribute of metadata.attributes) {
        entity.setAttributeColorMap(attribute.name, colorMap);
    }

    updateIntersectingVolumes();
    bindToggle('intersecting-volumes', () => {
        updateIntersectingVolumes();
        instance.notifyChange();
    });

    updateColorMap();

    // If the source provides a coordinate system, we can load a map
    // to display as a geographic context and be able to check that the
    // point cloud is properly positioned.
    const epsgCode = metadata.crs.srid?.tryGetEpsgCode();
    if (typeof epsgCode === 'number') {
        try {
            const definitionFromEpsg = await fetchCrsDefinitionFromEpsg(epsgCode);
            CoordinateSystem.register(metadata.crs.id, definitionFromEpsg);
            document.getElementById('basemap-group').style.display = 'block';
        } catch (e) {
            console.warn('could not load map: ' + e);
        }
    }

    populateGUI();

    Inspector.attach('inspector', instance);

    if (instance.coordinateSystem.srid) {
        StatusBar.bind(instance, { disableUrlUpdate: true });
    }

    placeCameraOnTop(volume, instance);

    instance.notifyChange();
}

const defaultUrl = 'https://3d.oslandia.com/giro3d/pointclouds/autzen-classified.copc.laz';

// Extract dataset URL from URL
const url = new URL(document.URL);
let datasetUrl = url.searchParams.get('dataset');
if (!datasetUrl) {
    datasetUrl = defaultUrl;
    url.searchParams.append('dataset', datasetUrl);
    window.history.replaceState({}, null, url.toString());
}

const fragments = new URL(datasetUrl).pathname.split('/');
document.getElementById('filename').innerText = fragments[fragments.length - 1];

// GUI controls for classification handling

load(datasetUrl).catch(console.error);
```

---

## Source: manuals/examples/potree-point-cloud.md

Source Path: manuals/examples/potree-point-cloud.md

# Potree Point Cloud

## Официальный кейс
- Slug: `potree-point-cloud`
- Официальная страница: https://giro3d.org/latest/examples/potree-point-cloud.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/potree-point-cloud.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/potree-point-cloud.js`

## Краткое описание (official)
Display a Potree point cloud.

## Теги (official)
- `potree`
- `point cloud`

## Атрибуция (official)
© Potree

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=potree-point-cloud npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/potree-point-cloud.html
```html
---
title: Potree Point Cloud
shortdesc: Display a Potree point cloud.
attribution: © <a target="_blank" href="https://potree.github.io/">Potree</a>
tags: [potree, 'point cloud']
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <div class="progress" role="progressbar">
        <div
            class="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
            id="progress"
            style="width: 0%"
        >
            Loading metadata...
        </div>
    </div>

    <!-- Error message -->
    <div class="alert alert-danger mt-0 mb-0" id="message" style="display: none" role="alert">
        A simple primary alert—check it out!
    </div>

    <!--Parameters -->
    <div class="card-body">
        <!-- Accordion -->
        <div class="accordion" style="display: none" id="accordion">
            <!-- Section: info -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-info"
                        aria-expanded="true"
                        aria-controls="section-info"
                    >
                        Info
                    </button>
                </h2>
                <div
                    id="section-info"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordion"
                >
                    <ul
                        class="list-group list-group-flush"
                        id="table"
                        style="display: none; font-size: 0.875rem"
                    >
                        <li
                            class="list-group-item"
                            title="The total number of points in the dataset"
                        >
                            Total points <b id="point-count" class="d-float float-end"></b>
                        </li>
                        <li
                            class="list-group-item"
                            title="The number of points currently displayed"
                        >
                            Displayed points
                            <b id="displayed-point-count" class="d-float float-end"></b>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Section: options -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-options"
                        aria-expanded="false"
                        aria-controls="section-options"
                    >
                        Options
                    </button>
                </h2>

                <div
                    id="section-options"
                    class="accordion-collapse collapse p-2"
                    data-bs-parent="#accordion"
                >
                    <!-- Show volume -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="show-volume"
                            autocomplete="off"
                        />
                        <label
                            title="Show the volume of the dataset"
                            class="form-check-label"
                            for="show-volume"
                            >Show dataset volume</label
                        >
                    </div>

                    <!-- Show octree volumes -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="show-tile-volumes"
                            autocomplete="off"
                        />
                        <label
                            title="Show the volumes of the octree cells"
                            class="form-check-label"
                            for="show-tile-volumes"
                            >Show octree volumes</label
                        >
                    </div>

                    <!-- Show basemap -->
                    <div class="form-check form-switch" style="display: none" id="basemap-group">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="show-basemap"
                            autocomplete="off"
                        />
                        <label title="Show the basemap" class="form-check-label" for="show-basemap"
                            >Show basemap</label
                        >
                    </div>

                    <!-- Show cloud -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="show-dataset"
                            autocomplete="off"
                        />
                        <label class="form-check-label" for="show-dataset">Show dataset</label>
                    </div>

                    <!-- Eye Dome Lighting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked
                            id="edl"
                            autocomplete="off"
                        />
                        <label
                            title="Toggles Eye Dome Lighting post-processing effect"
                            class="form-check-label"
                            for="edl"
                            >Eye Dome Lighting</label
                        >
                    </div>

                    <!-- Inpainting -->
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="inpainting"
                            autocomplete="off"
                        />
                        <label title="Toggles inpainting" class="form-check-label" for="inpainting"
                            >Inpainting</label
                        >
                    </div>

                    <!-- Point size slider -->
                    <label for="point-size" class="form-label mt-2" id="point-size-label"
                        >Point size: <b>auto</b></label
                    >
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value="0"
                        title="The point size, in pixels"
                        class="form-range"
                        id="point-size"
                        autocomplete="off"
                    />

                    <!-- Subdivision threshold slider -->
                    <label
                        for="subdivision-threshold"
                        id="subdivision-threshold-label"
                        class="form-label"
                        >Subdvision threshold: <b>1.0</b></label
                    >
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value="1"
                        title="The subdivision threshold of the point cloud. The lower, the higher the number of points simultaneously displayed."
                        class="form-range"
                        id="subdivision-threshold"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Section: coloring -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-coloring"
                        aria-expanded="false"
                        aria-controls="section-coloring"
                    >
                        Coloring
                    </button>
                </h2>

                <div
                    id="section-coloring"
                    class="accordion-collapse collapse p-2"
                    data-bs-parent="#accordion"
                >
                    <!-- Active attribute selector -->
                    <div class="input-group mt-1" id="attribute-group">
                        <label class="input-group-text col-5" for="attribute">Dimension</label>
                        <select
                            class="form-select"
                            id="attribute"
                            autocomplete="off"
                            title="Sets the active attribute of the point cloud"
                        ></select>
                    </div>

                    <!-- Color ramp selector -->
                    <div id="ramp-group" class="input-group mt-2">
                        <label class="input-group-text col-5" for="ramp">Color ramp</label>
                        <select class="form-select" id="ramp" autocomplete="off">
                            <option value="viridis">Viridis</option>
                            <option value="jet">Jet</option>
                            <option value="greys" selected>Greys</option>
                            <option value="blackbody">Blackbody</option>
                            <option value="earth">Earth</option>
                            <option value="bathymetry">Bathymetry</option>
                            <option value="magma">Magma</option>
                            <option value="par">Par</option>
                            <option value="rdbu">RdBu</option>
                        </select>

                        <!-- Bound sliders -->
                        <div class="input-group border rounded p-2 mt-2" id="bounds">
                            <label
                                for="min"
                                id="label-bounds"
                                class="form-label"
                                style="font-size: 0.8rem"
                                >Bounds: 123 - 456</label
                            >
                            <div class="input-group">
                                <input
                                    type="range"
                                    min="780"
                                    max="3574"
                                    value="0"
                                    class="form-range"
                                    id="min"
                                    autocomplete="off"
                                />
                            </div>

                            <div class="input-group">
                                <input
                                    type="range"
                                    min="780"
                                    max="3574"
                                    value="3574"
                                    class="form-range"
                                    id="max"
                                    autocomplete="off"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Classification list -->
                    <div id="classification-group" class="mt-2">
                        <fieldset id="classifications" class="border rounded p-2">
                            <!-- Classifications are added dynamically from the JS example -->
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/potree-point-cloud.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Color } from 'three';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import PointCloud from '@giro3d/giro3d/entities/PointCloud.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import { setLazPerfPath } from '@giro3d/giro3d/sources/las/config.js';
import PotreeSource from '@giro3d/giro3d/sources/PotreeSource.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindProgress } from './widgets/bindProgress.js';
import { bindSlider } from './widgets/bindSlider.js';
import { bindToggle } from './widgets/bindToggle.js';
import { formatPointCount } from './widgets/formatPointCount.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import { placeCameraOnTop } from './widgets/placeCameraOnTop.js';
import StatusBar from './widgets/StatusBar.js';

// Some Potree datasets contain LAZ files.
// LAS processing requires the WebAssembly laz-perf library
// This path is specific to your project, and must be set accordingly.
setLazPerfPath('/assets/wasm');

// We use this CRS when the point cloud does not have a CRS defined.
// It is technically the WebMercator CRS, but we label it 'unknown' to make
// it very explicit that it is not correct.
// See https://gitlab.com/giro3d/giro3d/-/issues/514
CoordinateSystem.register(
    'unknown',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
);

const options = {
    attribute: 'position',
    colorRamp: 'greys',
    min: 0,
    max: 100,
};

/** @type {PointCloud} */
let entity;

/** @type {Instance} */
let instance;

// Create the color map. The color ramp and bounds will be set later.
const colorMap = new ColorMap({ colors: [], min: 0, max: 1 });

function updateActiveAttribute() {
    const attribute = options.attribute;

    entity.setActiveAttribute(attribute);

    const classificationGroup = document.getElementById('classification-group');
    const colorMapGroup = document.getElementById('ramp-group');

    const shouldDisplayClassifications = attribute.toLowerCase() === 'classification';
    classificationGroup.style.display = shouldDisplayClassifications ? 'block' : 'none';
    colorMapGroup.style.display =
        !shouldDisplayClassifications && attribute !== 'Color' && attribute !== 'COLOR_PACKED'
            ? 'flex'
            : 'none';

    updateColorMap();
}

const [setProgress, progressElement] = bindProgress('progress');

const [, , , setAvailableAttributes] = bindDropDown('attribute', attribute => {
    options.attribute = attribute;

    if (entity) {
        updateActiveAttribute();
    }
});

const [setMin] = bindSlider('min', min => {
    options.min = Math.round(min);
    if (entity && instance) {
        colorMap.min = min;
        instance.notifyChange(entity);
        document.getElementById('label-bounds').innerHTML =
            `Bounds: <b>${options.min}</b> — <b>${options.max}<b>`;
    }
});

const [setMax] = bindSlider('max', max => {
    options.max = Math.round(max);
    if (entity && instance) {
        colorMap.max = max;
        instance.notifyChange(entity);
        document.getElementById('label-bounds').innerHTML =
            `Bounds: <b>${options.min}</b> — <b>${options.max}<b>`;
    }
});

function updateColorMapMinMax() {
    if (!entity) {
        return;
    }

    const activeAttribute = entity.getActiveAttributes()[0].attribute;
    const min = activeAttribute.min ?? 0;
    const max = activeAttribute.max ?? 255;

    const lowerBound = min;
    const upperBound = max;

    setMin(min, lowerBound, upperBound);
    setMax(max, lowerBound, upperBound);
}

const [, currentRamp] = bindDropDown('ramp', ramp => {
    options.colorRamp = ramp;
    updateColorMap();
});

function updateColorMap() {
    if (entity && instance) {
        colorMap.colors = makeColorRamp(options.colorRamp);

        updateColorMapMinMax();

        instance.notifyChange();
    }
}

bindToggle('show-tile-volumes', v => {
    entity.showNodeVolumes = v;
});

bindToggle('show-volume', v => {
    entity.showVolume = v;
});

bindToggle('edl', v => {
    instance.renderingOptions.enableEDL = v;
    instance.notifyChange();
});

bindToggle('inpainting', v => {
    instance.renderingOptions.enableInpainting = v;
    instance.renderingOptions.enablePointCloudOcclusion = v;
    instance.notifyChange();
});

bindSlider('point-size', size => {
    if (entity) {
        entity.pointSize = size;
        document.getElementById('point-size-label').innerHTML =
            `Point size: <b>${size === 0 ? 'auto' : size.toFixed(0)}</b>`;
    }
});
bindSlider('subdivision-threshold', threshold => {
    if (entity) {
        entity.subdivisionThreshold = threshold;
        document.getElementById('subdivision-threshold-label').innerHTML =
            `Subdivision threshold: <b>${threshold}</b>`;
    }
});

function populateGUI() {
    document.getElementById('accordion').style.display = 'block';

    const tableElement = document.getElementById('table');
    tableElement.style.display = 'block';

    progressElement.style.display = 'none';
}

const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

function updateDisplayedPointCounts(count, displayed) {
    const pointCountElement = document.getElementById('point-count');
    pointCountElement.innerHTML = count != null ? formatPointCount(count, numberFormat) : 'unknown';
    pointCountElement.title = count != null ? numberFormat.format(count) : 'unknown';

    const activePointCountElement = document.getElementById('displayed-point-count');
    activePointCountElement.innerHTML = formatPointCount(displayed, numberFormat);
    activePointCountElement.title = numberFormat.format(displayed);
}

async function load(url) {
    progressElement.style.display = 'block';

    const source = new PotreeSource({ url });

    source.addEventListener('progress', () => setProgress(source.progress));

    await source.initialize();

    const metadata = await source.getMetadata();

    let crs = CoordinateSystem.unknown;
    if (!metadata.crs.isUnknown()) {
        crs = metadata.crs;
        CoordinateSystem.register(metadata.crs.name, metadata.crs.definition);
    }

    instance = new Instance({
        target: 'view',
        crs,
        backgroundColor: null,
        renderer: {
            logarithmicDepthBuffer: true,
        },
    });

    // Let's enable Eye Dome Lighting to make the point cloud more readable.
    instance.renderingOptions.enableEDL = true;
    instance.renderingOptions.EDLRadius = 0.6;
    instance.renderingOptions.EDLStrength = 5;

    entity = new PointCloud({ source });

    try {
        await instance.add(entity);
    } catch (err) {
        if (err instanceof Error) {
            const messageElement = document.getElementById('message');
            messageElement.innerText = err.message;
            messageElement.style.display = 'block';
        }
        console.error(err);
        return;
    } finally {
        progressElement.style.display = 'none';
    }

    for (const attribute of metadata.attributes) {
        entity.setAttributeColorMap(attribute.name, colorMap);
    }

    instance.addEventListener('update-end', () =>
        updateDisplayedPointCounts(entity.pointCount, entity.displayedPointCount),
    );

    placeCameraOnTop(entity.getBoundingBox(), instance);

    setAvailableAttributes(
        metadata.attributes.map((att, index) => ({
            id: att.name,
            name: att.name,
            selected: index === 0,
        })),
    );

    if (metadata.attributes.length > 0) {
        options.attribute = metadata.attributes[0].name;
        entity.setActiveAttribute(metadata.attributes[0].name);
    }

    const classifications = entity.getAttributeClassifications('Classification');

    // Let's populate the classification list with default values from the ASPRS classifications.
    addClassification(0, 'Created, never classified', classifications);
    addClassification(1, 'Unclassified', classifications);
    addClassification(2, 'Ground', classifications);
    addClassification(3, 'Low vegetation', classifications);
    addClassification(4, 'Medium vegetation', classifications);
    addClassification(5, 'High vegetation', classifications);
    addClassification(6, 'Building', classifications);
    addClassification(7, 'Low point (noise)', classifications);
    addClassification(8, 'Reserved', classifications);
    addClassification(9, 'Water', classifications);
    addClassification(10, 'Rail', classifications);
    addClassification(11, 'Road surface', classifications);
    addClassification(12, 'Reserved', classifications);
    addClassification(13, 'Wire - Guard (shield)', classifications);
    addClassification(14, 'Wire - Conductor (Phase)', classifications);
    addClassification(15, 'Transmission Tower', classifications);
    addClassification(16, 'Wire Structure connector (e.g Insulator)', classifications);
    addClassification(17, 'Bridge deck', classifications);
    addClassification(18, 'High noise', classifications);

    bindToggle('show-dataset', show => {
        entity.visible = show;
        instance.notifyChange(entity);
    });

    populateGUI();

    updateActiveAttribute();

    Inspector.attach('inspector', instance);
    StatusBar.bind(instance, { disableUrlUpdate: true });
}

const defaultUrl = 'https://3d.oslandia.com/potree/pointclouds/lion_takanawa/cloud.js';

// Extract dataset URL from URL
const url = new URL(document.URL);
let datasetUrl = url.searchParams.get('dataset');
if (!datasetUrl) {
    datasetUrl = defaultUrl;
    url.searchParams.append('dataset', datasetUrl);
    window.history.replaceState({}, null, url.toString());
}

// GUI controls for classification handling

const classificationNames = new Array(32);

function addClassification(number, name, array) {
    const currentColor = array[number].color.getHexString();

    const template = `
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            checked
            role="switch"
            id="class-${number}"
            autocomplete="off"
        />
        <label class="form-check-label w-100" for="class-${number}">
            <div class="row">
                <div class="col" style="font-size: 13px">${name}</div>
                <div class="col-auto">
                    <input
                        type="color"
                        style="height: 1rem; padding: 1px;"
                        class="form-control form-control-color float-end"
                        id="color-${number}"
                        value="#${currentColor}"
                        title="Classification color"
                    />
                </div>
            </div>
        </label>
    </div>
    `;

    const node = document.createElement('div');
    node.innerHTML = template;
    document.getElementById('classifications').appendChild(node);

    // Let's change the classification color with the color picker value
    bindColorPicker(`color-${number}`, v => {
        // Parse it into a THREE.js color
        const color = new Color(v);

        array[number].color = color;

        instance.notifyChange();
    });

    classificationNames[number] = name;

    bindToggle(`class-${number}`, enabled => {
        // By toggling the .visible property of a classification,
        // all points that have this classification are hidden/shown.
        array[number].visible = enabled;
        instance.notifyChange();
    });
}

load(datasetUrl).catch(console.error);
```

---

## Source: manuals/examples/query-map-elevation.md

Source Path: manuals/examples/query-map-elevation.md

# Query map elevations

## Официальный кейс
- Slug: `query-map-elevation`
- Официальная страница: https://giro3d.org/latest/examples/query-map-elevation.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/query-map-elevation.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/query-map-elevation.js`

## Краткое описание (official)
Sample elevation at various points in the map.

## Расширенное описание (official longdesc)
Use the `getElevation()` method to sample the elevation at a given coordinate. Each label is dynamically updated with the most precise elevation available at this location. Note that `getElevation()` only works for regions of the map that are loaded. In this example, we use the elevation data from the map to move the summit labels at the correct altitude.

## Теги (official)
- `map`
- `elevation`
- `mapbox`

## Атрибуция (official)
Map data © Mapbox, open-peaks

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=query-map-elevation npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/query-map-elevation.html
```html
---
title: Query map elevations
shortdesc: Sample elevation at various points in the map.
longdesc: Use the <a target="_blank" href="../apidoc/classes/entities.Map.html#getElevation"><code>getElevation()</code></a> method to sample the elevation at a given coordinate. Each label is dynamically updated with the most precise elevation available at this location. Note that <code>getElevation()</code> only works for regions of the map that are loaded. In this example, we use the elevation data from the map to move the summit labels at the correct altitude.
attribution: Map data © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>, <a href="https://github.com/open-peaks" target="_blank">open-peaks</a>
tags: [map, elevation, mapbox]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/query-map-elevation.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import { Color, DoubleSide, Fog } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const SKY_COLOR = '#87CEEB';
const size = 200_000;
const extent = Extent.fromCenterAndSize(crs, { x: 1_051_908, y: 6_542_409 }, size, size);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: SKY_COLOR,
});

const map = new Map({
    extent,
    lighting: {
        enabled: true,
        elevationLayersOnly: true,
    },
    side: DoubleSide,
    backgroundColor: 'gray',
});

instance.add(map);

const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

// Adds a XYZ elevation layer with MapBox terrain RGB tileset
const elevationLayer = new ElevationLayer({
    name: 'xyz_elevation',
    extent,
    // We dont want the full resolution because the terrain
    // mesh has a much lower resolution than the raster image
    resolutionFactor: 1 / 8,
    minmax: { min: 0, max: 5000 },
    source: new TiledImageSource({
        format: new MapboxTerrainFormat(),
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});
map.addLayer(elevationLayer);

// Adds a XYZ color layer with MapBox satellite tileset
const satelliteLayer = new ColorLayer({
    name: 'xyz_color',
    extent,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});
map.addLayer(satelliteLayer);

const controls = new MapControls(instance.view.camera, instance.domElement);

instance.view.camera.position.set(994_410, 6_520_646, 5_520);
controls.target.set(1_011_954, 6_539_864, 1_000);

instance.view.setControls(controls);

// Here we have a list of summits of the Alps and their geographic coordinates,
// but without any elevation information
const summits = [
    { latitude: 45.832866, longitude: 6.864824, name: 'Mont Blanc' },
    { latitude: 45.976389, longitude: 7.658333, name: 'Matterhorn' },
    { latitude: 45.8667, longitude: 6.98333, name: 'Grandes Jorasses' },
    { latitude: 45.930835, longitude: 6.989466, name: 'Les Droites' },
    { latitude: 45.95, longitude: 7.3, name: 'Grand Combin' },
];
const summitMarkers = [];

function updateMarker(marker) {
    const { x, y } = marker.position;
    const coordinates = new Coordinates(instance.coordinateSystem, x, y);
    const result = map.getElevation({ coordinates });
    if (result.samples.length > 0) {
        result.samples.sort((a, b) => a.resolution - b.resolution);
        const sample = result.samples[0];

        marker.position.setZ(sample.elevation);
        marker.updateMatrixWorld(true);
    }
}

function updateMarkers(newExtent) {
    for (const marker of summitMarkers) {
        const { x, y } = marker.position;
        const coordinates = new Coordinates(instance.coordinateSystem, x, y);

        // Only update markers that are inside the updated area
        if (newExtent.isPointInside(coordinates)) {
            updateMarker(marker);
        }
    }
}

async function loadMarker(summit) {
    const { name, latitude, longitude } = summit;

    const markerHtmlElement = document.createElement('div');
    markerHtmlElement.style.paddingBottom = '4rem';
    const span = document.createElement('span');
    span.classList.value = 'badge rounded-pill text-bg-dark';
    span.innerText = summit.name;
    markerHtmlElement.appendChild(span);

    const marker = new CSS2DObject(markerHtmlElement);
    marker.name = name;

    // Let's convert our summit coordinates from EPSG:4326 to EPSG:2154
    const coordinates = new Coordinates(CoordinateSystem.epsg4326, longitude, latitude).as(
        instance.coordinateSystem,
    );
    marker.position.set(coordinates.x, coordinates.y, 0);

    instance.add(marker);

    marker.updateMatrixWorld(true);
    summitMarkers.push(marker);

    updateMarker(marker);
}

for (const summit of summits) {
    loadMarker(summit);
}

// Let's update the markers' elevations whenever there is some new elevation data loaded on the map
map.addEventListener('elevation-changed', event => updateMarkers(event.extent));

const fog = new Fog(new Color(SKY_COLOR), 1000, 200_000);
instance.scene.fog = fog;

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/simple-globe.md

Source Path: manuals/examples/simple-globe.md

# Simple Globe

## Официальный кейс
- Slug: `simple-globe`
- Официальная страница: https://giro3d.org/latest/examples/simple-globe.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/simple-globe.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/simple-globe.js`

## Краткое описание (official)
Display a simple globe with a single color layer.

## Теги (official)
- `ecef`
- `globe`
- `map`
- `layers`

## Атрибуция (official)
© OpenStreetMap contributors

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=simple-globe npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/simple-globe.html
```html
---
title: Simple Globe
shortdesc: Display a simple globe with a single color layer.
attribution: © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
tags: [ecef, globe, map, layers]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Toggle tile outlines -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-outlines"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-outlines">Show tiles</label>
            </div>

            <!-- Toggle bounding boxes -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-bounding-boxes"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-bounding-boxes"
                    >Show bounding boxes</label
                >
            </div>

            <!-- Toggle LOD spheres -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-lod-spheres"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-lod-spheres">Show LOD spheres</label>
            </div>

            <!-- Toggle color layer -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-layer"
                    checked
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-layer">Show color layer</label>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/simple-globe.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { OSM } from 'ol/source.js';

import GlobeControls from '@giro3d/giro3d/controls/GlobeControls.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Globe from '@giro3d/giro3d/entities/Globe.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4978,
    backgroundColor: 'grey',
});

const globe = new Globe({
    backgroundColor: '#aad3df',
});

globe.helperColor = 'black';

instance.add(globe);

const layer = new ColorLayer({
    source: new TiledImageSource({ source: new OSM() }),
});

globe.addLayer(layer);

instance.view.goTo(globe);

const controls = new GlobeControls({
    scene: globe.object3d,
    ellipsoid: globe.ellipsoid,
    camera: instance.view.camera,
    domElement: instance.domElement,
});

const updateControls = () => {
    controls.update();
    instance.notifyChange(globe);

    requestAnimationFrame(updateControls);
};

updateControls();

Inspector.attach('inspector', instance);

bindToggle('show-layer', v => {
    layer.visible = v;
    instance.notifyChange(layer);
});
bindToggle('show-bounding-boxes', v => {
    globe.showBoundingBoxes = v;
    instance.notifyChange(globe);
});
bindToggle('show-lod-spheres', v => {
    globe.showBoundingSpheres = v;
    instance.notifyChange(globe);
});
bindToggle('show-outlines', v => {
    globe.showTileOutlines = v;
    instance.notifyChange(globe);
});

StatusBar.bind(instance);
```

---

## Source: manuals/examples/sparse-layer.md

Source Path: manuals/examples/sparse-layer.md

# Sparse layers

## Официальный кейс
- Slug: `sparse-layer`
- Официальная страница: https://giro3d.org/latest/examples/sparse-layer.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/sparse-layer.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/sparse-layer.js`

## Краткое описание (official)
Illustrates how textures are allocated when layers have a lot of empty areas.

## Расширенное описание (official longdesc)
Tiles in red do not contain any allocated texture because the layer only produces transparent pixels for this area.

## Теги (official)
- `map`
- `layer`
- `performance`

## Атрибуция (official)
© Métropole Grand Lyon

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=sparse-layer npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/sparse-layer.html
```html
---
title: Sparse layers
shortdesc: Illustrates how textures are allocated when layers have a lot of empty areas.
longdesc: Tiles in red do not contain any allocated texture because the layer only produces transparent pixels for this area.
attribution: © <a target="_blank" href="https://www.grandlyon.com/">Métropole Grand Lyon</a>
tags: [map, layer, performance]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/sparse-layer.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Interpretation from '@giro3d/giro3d/core/layer/Interpretation.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:26910',
    '+proj=utm +zone=10 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const extent = new Extent(crs, 532622, 569790, 5114416, 5137240);

const center = extent.centerAsVector3();

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 'gray',
});

instance.view.camera.position.set(center.x, center.y - 1, 50000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.target.set(center.x, center.y, center.z);
instance.view.setControls(controls);

const source = new GeoTIFFSource({
    url: 'https://3d.oslandia.com/dem/msh2009dem.tif',
    crs: extent.crs,
});

const map = new Map({
    extent,
    side: DoubleSide,
    showOutline: true,
});

instance.add(map);

const min = 227;
const max = 2538;

const layer = new ColorLayer({
    source,
    showEmptyTextures: true,
    interpretation: Interpretation.CompressTo8Bit(min, max),
});

map.addLayer(layer);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/spherical-panorama.md

Source Path: manuals/examples/spherical-panorama.md

# 360° panoramic image

## Официальный кейс
- Slug: `spherical-panorama`
- Официальная страница: https://giro3d.org/latest/examples/spherical-panorama.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/spherical-panorama.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/spherical-panorama.js`

## Краткое описание (official)
Displays a panoramic bubble.

## Расширенное описание (official longdesc)
The `SphericalPanorama` entity can display images in the `'equirectangular'` projection.

## Теги (official)
- `panoramic`
- `bubble`
- `360`
- `map`

## Атрибуция (official)
© Daniel Vorndran for Wikimedia Commons (the image has been resized to 4096x2048).

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=spherical-panorama npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/spherical-panorama.html
```html
---
title: 360° panoramic image
shortdesc: Displays a panoramic bubble.
longdesc: The <a target="_blank" href="../apidoc/classes/entities.SphericalPanorama-1.html"><code>SphericalPanorama</code></a> entity can display images in the <code>'equirectangular'</code> projection.
attribution: © Daniel Vorndran for <a href="https://commons.wikimedia.org/wiki/File:Rheingauer_Dom,_Geisenheim,_360_Panorama_%28Equirectangular_projection%29.jpg">Wikimedia Commons</a> (the image has been resized to 4096x2048).
tags: [panoramic, bubble, 360, map]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Show/Hide graticule -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="graticule"
                    autocomplete="off"
                />
                <label class="form-check-label" for="graticule">Show graticule</label>
            </div>

            <!-- Show/Hide debug layer -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-debug-layer"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-debug-layer">Show debug layer</label>
            </div>

            <!-- Show/Hide rotation helpers -->
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-rotation-helpers"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-rotation-helpers"
                    >Show rotation helpers</label
                >
            </div>

            <hr />

            <!-- Latitude -->
            <label for="latitude" class="form-label">Latitude</label>
            <div class="input-group">
                <input
                    type="number"
                    min="-180"
                    max="180"
                    value="0"
                    step="1"
                    class="form-control"
                    id="latitude"
                    autocomplete="off"
                />
            </div>

            <!-- Longitude -->
            <label for="longitude" class="form-label">Longitude</label>
            <div class="input-group">
                <input
                    type="number"
                    min="-90"
                    max="90"
                    value="0"
                    step="1"
                    class="form-control"
                    id="longitude"
                    autocomplete="off"
                />
            </div>

            <!-- Azimuth -->
            <label for="azimuth" class="form-label">Azimuth</label>
            <div class="input-group">
                <input
                    type="number"
                    min="0"
                    max="360"
                    value="0"
                    step="1"
                    class="form-control"
                    id="azimuth"
                    autocomplete="off"
                />
            </div>

            <!-- Pitch -->
            <label for="pitch" class="form-label">Pitch</label>
            <div class="input-group">
                <input
                    type="number"
                    min="-90"
                    max="90"
                    value="0"
                    step="1"
                    class="form-control"
                    id="pitch"
                    autocomplete="off"
                />
            </div>

            <!-- Roll -->
            <label for="roll" class="form-label">Roll</label>
            <div class="input-group">
                <input
                    type="number"
                    min="-90"
                    max="90"
                    value="0"
                    step="1"
                    class="form-control"
                    id="roll"
                    autocomplete="off"
                />
            </div>

            <!-- Go to panorama -->
            <button type="button" class="btn btn-primary w-100 mt-3" id="go-to-panorama">
                <i class="bi bi-cursor-fill"></i>
                Go to panorama
            </button>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/spherical-panorama.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Feature } from 'ol';
import { LineString, Point } from 'ol/geom.js';
import { Circle, Fill, Stroke, Style } from 'ol/style.js';
import { AxesHelper, Group, PolarGridHelper, Vector3 } from 'three';

import FirstPersonControls from '@giro3d/giro3d/controls/FirstPersonControls.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Ellipsoid from '@giro3d/giro3d/core/geographic/Ellipsoid.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import SphericalPanorama from '@giro3d/giro3d/entities/SphericalPanorama.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import EllipsoidHelper from '@giro3d/giro3d/helpers/EllipsoidHelper.js';
import StaticImageSource from '@giro3d/giro3d/sources/StaticImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindNumberInput } from './widgets/bindNumberInput.js';
import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4978,
});

const ellipsoid = Ellipsoid.WGS84.scale(0.0001);

const ellipsoidHelper = new EllipsoidHelper({
    ellipsoid,
    parallels: 91,
    meridians: 180,
    segments: 64,
});

instance.add(ellipsoidHelper);

const radius = 5;

const panorama = new SphericalPanorama({ depthTest: true, radius });

instance.add(panorama);

const source = new StaticImageSource({
    source: 'https://3d.oslandia.com/giro3d/images/panorama.jpg',
    // Since the image is covering the entire sphere, we must express the extent as such
    extent: Extent.fullEquirectangularProjection,
});

const panoramicLayer = new ColorLayer({
    name: 'panorama',
    source,
});

panorama.addLayer(panoramicLayer).catch(e => console.error(e));

// Let's create a vector layer with various geometries to help us navigate in the panoramic image.
const debugLayer = new ColorLayer({
    name: 'debug',
    source: new VectorSource({
        data: [
            // Center of image
            new Feature(new Point([0, 0])),
            // Equator of image
            new Feature(
                new LineString([
                    [-180, 0],
                    [+180, 0],
                ]),
            ),
            // Prime meridian of image
            new Feature(
                new LineString([
                    [0, -90],
                    [0, +90],
                ]),
            ),
        ],
        style: new Style({
            stroke: new Stroke({ color: 'yellow' }),
            image: new Circle({
                radius: 8,
                fill: new Fill({ color: 'yellow' }),
                stroke: new Stroke({ color: 'orange' }),
            }),
        }),
    }),
});

debugLayer.visible = false;

panorama.addLayer(debugLayer).catch(e => console.error(e));

const view = instance.view;
const camera = view.camera;

// Set camera at the center of the panorama sphere
camera.position.set(0, 0, 0);

// Look at the center of the panoramic image
camera.lookAt(new Vector3(0, 1, 0));

const controls = new FirstPersonControls(instance, { focusOnMouseOver: true });

controls.options.moveSpeed = 5;
instance.domElement.focus();
controls.reset();

instance.addEventListener('after-camera-update', () => controls.reset());

instance.notifyChange(panorama);

// Let's configure the panorama graticule with 1° step to
// help us visualize the rotation of the sphere.
panorama.graticule.xStep = 1;
panorama.graticule.yStep = 1;
panorama.graticule.color = '#f6d32d';
panorama.graticule.opacity = 0.25;
panorama.graticule.thickness = 0.2;

// @ts-expect-error typing
camera.fov = 60;

const axes = new AxesHelper(7);

panorama.object3d.add(axes);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);

const params = {
    latitude: 0,
    longitude: 0,
    heading: 0,
    pitch: 0,
    roll: 0,
};

const horizontalGrid = new PolarGridHelper(radius, 18, 4, 64, 'red', 'red');

horizontalGrid.rotateX(-Math.PI / 2);
horizontalGrid.updateMatrixWorld(true);

const verticalGrid = new PolarGridHelper(radius, 18, 4, 64, 'blue', 'blue');
verticalGrid.rotateZ(-Math.PI / 2);
verticalGrid.updateMatrixWorld(true);

axes.visible = false;
verticalGrid.visible = false;
horizontalGrid.visible = false;

const helperGroup = new Group();

helperGroup.add(verticalGrid, horizontalGrid);

instance.add(helperGroup);

const updateOrientation = () => {
    panorama.setOrientation({
        heading: params.heading,
        pitch: params.pitch,
        roll: params.roll,
    });
    instance.notifyChange(panorama);
};

const updatePosition = () => {
    // Compute the cartesian coordinates from the geographic coordinates
    const position = ellipsoid.toCartesian(params.latitude, params.longitude, 0);
    panorama.object3d.position.copy(position);
    panorama.object3d.updateMatrixWorld(true);

    // Update the camera up vector to match the normal of the ellipsoid at our location
    // Useful for navigation controls to know where "up" is.
    instance.view.camera.up = ellipsoid.getNormalFromCartesian(position);

    // Get the local rotation matrix that matches the normal vector
    const localMatrix = ellipsoid.getEastNorthUpMatrixFromCartesian(position);

    helperGroup.position.copy(position);
    helperGroup.setRotationFromMatrix(localMatrix);
    helperGroup.updateMatrixWorld(true);

    updateOrientation();

    instance.notifyChange(panorama);
};

updatePosition();

instance.view.goTo(panorama);

bindNumberInput('latitude', latitude => {
    params.latitude = latitude;
    updatePosition();
});
bindNumberInput('longitude', longitude => {
    params.longitude = longitude;
    updatePosition();
});
bindNumberInput('azimuth', azimuth => {
    params.heading = azimuth;
    updateOrientation();
});
bindNumberInput('pitch', pitch => {
    params.pitch = pitch;
    updateOrientation();
});
bindNumberInput('roll', roll => {
    params.roll = roll;
    updateOrientation();
});
bindToggle('graticule', show => {
    panorama.graticule.enabled = show;
    instance.notifyChange(panorama);
});
bindToggle('show-rotation-helpers', show => {
    horizontalGrid.visible = show;
    verticalGrid.visible = show;
    axes.visible = show;

    instance.notifyChange();
});
bindToggle('show-debug-layer', show => {
    debugLayer.visible = show;

    instance.notifyChange(debugLayer);
});
bindButton('go-to-panorama', () => {
    instance.view.goTo(panorama);
});
```

---

## Source: manuals/examples/srtm-tiles.md

Source Path: manuals/examples/srtm-tiles.md

# SRTM Tiles

## Официальный кейс
- Slug: `srtm-tiles`
- Официальная страница: https://giro3d.org/latest/examples/srtm-tiles.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/srtm-tiles.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/srtm-tiles.js`

## Краткое описание (official)
Create a mosaic of SRTM tiles.

## Расширенное описание (official longdesc)
The `AggregateImageSource` can combine multiple `ImageSource`s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. It also makes it possible to have more than one elevation source on a map, which only supports a single elevation layer.

## Теги (official)
- `terrain`
- `srtm`
- `map`
- `layer`

## Атрибуция (official)
© NASA,

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=srtm-tiles npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/srtm-tiles.html
```html
---
title: SRTM Tiles
shortdesc: Create a mosaic of SRTM tiles.
longdesc: The <a target="_blank" href="../apidoc/classes/sources.AggregateImageSource.html"><code>AggregateImageSource</code></a> can combine multiple <a target="_blank" href="../apidoc/classes/sources.ImageSource.html"><code>ImageSource</code></a>s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. It also makes it possible to have more than one elevation source on a map, which only supports a single elevation layer.
attribution: © <a target="_blank" href="https://www.nasa.gov/">NASA</a>,
tags: ['terrain', 'srtm', 'map', 'layer']
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <fieldset id="options">
                <!-- Show extents -->
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="true"
                        role="switch"
                        id="show-tile-extents"
                        autocomplete="off"
                    />
                    <label class="form-check-label" for="show-tile-extents"
                        >Show tile extents</label
                    >
                </div>
            </fieldset>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/srtm-tiles.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Feature } from 'ol';
import { fromExtent } from 'ol/geom/Polygon.js';
import { Stroke, Style } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import AggregateImageSource from '@giro3d/giro3d/sources/AggregateImageSource.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';
import OpenLayersUtils from '@giro3d/giro3d/utils/OpenLayersUtils.js';

import { bindToggle } from './widgets/bindToggle.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const CRS = CoordinateSystem.epsg3857;

const instance = new Instance({
    target: 'view',
    crs: CRS,
});

async function loadData() {
    const baseUrl = 'https://3d.oslandia.com/giro3d/rasters/';
    const tiles = ['N41E008.hgt.tif', 'N41E009.hgt.tif', 'N42E008.hgt.tif', 'N42E009.hgt.tif'];

    // Create one GeoTIFFSource per SRTM tile
    // Note that SRTM tiles are in EPSG:4326, so they will be reprojected
    // to EPSG:3857 which is the CRS of the instance.
    const sources = tiles.map(
        tile => new GeoTIFFSource({ url: baseUrl + tile, crs: CoordinateSystem.epsg4326 }),
    );

    // Then combine them in an aggregate source.
    // Note: all sub-sources must have the same CRS.
    const aggregateSource = new AggregateImageSource({ sources });

    // Let's initialize the source to be able to retrieve its extent
    await aggregateSource.initialize({ targetProjection: CRS });

    const extent = aggregateSource.getExtent().as(CRS);

    const map = new Map({
        extent,
        backgroundColor: 'gray',
        lighting: true,
    });

    instance.add(map).catch(console.error);

    const min = 0;
    const max = 2700;

    const layer = new ElevationLayer({
        minmax: { min, max },
        colorMap: new ColorMap({ colors: makeColorRamp('earth'), min, max }),
        source: aggregateSource,
    });

    await map.addLayer(layer);

    // Let's now create a vector layer to visualize the extents of the SRTM tiles.
    const tileOutlines = sources.map(source => {
        const olExtent = OpenLayersUtils.toOLExtent(source.getExtent());
        const olPolygon = fromExtent(olExtent);
        const feature = new Feature(olPolygon);
        return feature;
    });

    const vectorLayer = new ColorLayer({
        source: new VectorSource({
            data: tileOutlines,
            dataProjection: CoordinateSystem.epsg4326,
            style: new Style({
                stroke: new Stroke({
                    width: 4,
                    color: 'red',
                }),
            }),
        }),
    });

    await map.addLayer(vectorLayer);

    const center = extent.centerAsVector2();
    instance.view.camera.position.set(center.x, center.y, 500_000);

    const controls = new MapControls(instance.view.camera, instance.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.target.set(center.x, center.y + 1, 0);
    instance.view.setControls(controls);

    // Attach the inspector
    Inspector.attach('inspector', instance);

    StatusBar.bind(instance);

    bindToggle('show-tile-extents', show => {
        vectorLayer.visible = show;
        instance.notifyChange(vectorLayer);
    });
}

loadData().catch(console.error);
```

---

## Source: manuals/examples/static-image-source.md

Source Path: manuals/examples/static-image-source.md

# Static image

## Официальный кейс
- Slug: `static-image-source`
- Официальная страница: https://giro3d.org/latest/examples/static-image-source.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/static-image-source.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/static-image-source.js`

## Краткое описание (official)
Display a single image on a Map with a <code>StaticImageSource</code>.

## Расширенное описание (official longdesc)
The `StaticImageSource` can display an image at an arbitrary extent. You can either pass a URL to the remote image, or provide a texture or an image to display.

## Теги (official)
- `map`
- `layer`
- `source`

## Атрибуция (official)
© OpenStreetMap contributors.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=static-image-source npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/static-image-source.html
```html
---
title: Static image
shortdesc: Display a single image on a Map with a <code>StaticImageSource</code>.
longdesc: The <a target="_blank" href="../apidoc/classes/sources.StaticImageSource.html"><code>StaticImageSource</code></a> can display an image at an arbitrary extent. You can either pass a URL to the remote image, or provide a texture or an image to display.
attribution: © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.
tags: [map, layer, source]
---

<div class="side-pane-with-status-bar" style="width: 20rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">Parameters</div>

        <div class="card-body" id="top-options">
            <!-- Image URL -->
            <div class="input-group mb-3">
                <span class="input-group-text">URL</span>
                <input
                    type="url"
                    class="form-control"
                    id="url"
                    required
                    value="https://giro3d.org/images/giro3d_logo_big.jpg"
                    placeholder="Image URL..."
                />
            </div>

            <!-- Draw extent -->
            <button type="button" class="btn btn-primary w-100" disabled id="draw">
                <i class="bi bi-pencil-square"></i>
                Draw extent and load image
            </button>

            <!-- Error message -->
            <div class="alert alert-danger m-0 mt-3" id="error" style="display: none" role="alert">
                A simple primary alert—check it out!
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/static-image-source.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import OSM from 'ol/source/OSM.js';
import { AdditiveBlending, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import StaticImageSource from '@giro3d/giro3d/sources/StaticImageSource.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import { bindButton } from './widgets/bindButton.js';
import { bindTextInput } from './widgets/bindTextInput.js';
import StatusBar from './widgets/StatusBar.js';

const defaultExtent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const instance = new Instance({
    target: 'view',
    crs: defaultExtent.crs,
    backgroundColor: 0x0a3b59,
});

const map = new Map({ extent: defaultExtent, backgroundColor: 'white' });

instance.add(map);

// Create the OpenStreetMap color layer using an OpenLayers source.
// See https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
// for more informations.
const osm = new ColorLayer({
    name: 'osm',
    source: new TiledImageSource({ source: new OSM() }),
});

map.addLayer(osm);

instance.view.camera.position.set(0, 0, 80000000);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.enableRotate = false;

instance.view.setControls(controls);

Inspector.attach('inspector', instance);
StatusBar.bind(instance);

let url = null;

const extentPreview = new Mesh(
    new PlaneGeometry(1, 1, 1, 1),
    new MeshBasicMaterial({
        color: 'white',
        opacity: 0.1,
        transparent: true,
        blending: AdditiveBlending,
        depthTest: false,
    }),
);

instance.scene.add(extentPreview);

let topLeftCorner;

function drawExtent() {
    return new Promise(resolve => {
        let clickCount = 0;

        const onMouseMove = mouseEvent => {
            if (topLeftCorner) {
                const picked = instance.pickObjectsAt(mouseEvent)[0];
                if (picked) {
                    const currentPoint = picked.point;
                    const width = Math.abs(topLeftCorner.x - currentPoint.x);
                    const height = Math.abs(topLeftCorner.y - currentPoint.y);

                    extentPreview.scale.set(width, height, 1);

                    const center = new Vector3().lerpVectors(currentPoint, topLeftCorner, 0.5);

                    extentPreview.position.copy(center);

                    extentPreview.updateMatrixWorld(true);

                    instance.notifyChange();
                }
            }
        };

        const onClick = mouseEvent => {
            clickCount++;
            const picked = instance.pickObjectsAt(mouseEvent)[0];
            if (picked) {
                controls.enabled = false;
                extentPreview.visible = true;
                const point = picked.point;
                if (clickCount === 1) {
                    topLeftCorner = point;
                    extentPreview.scale.set(0, 0, 1);
                } else if (clickCount === 2) {
                    instance.domElement.removeEventListener('mousedown', onClick);
                    instance.domElement.removeEventListener('mousemove', onMouseMove);

                    topLeftCorner = null;

                    const { x, y } = extentPreview.position;
                    const scale = extentPreview.scale;

                    controls.enabled = true;

                    resolve(
                        Extent.fromCenterAndSize(
                            instance.coordinateSystem,
                            { x, y },
                            scale.x,
                            scale.y,
                        ),
                    );
                }
            }
        };

        instance.domElement.addEventListener('mousedown', onClick);
        instance.domElement.addEventListener('mousemove', onMouseMove);
    });
}

let currentImage;

const showErrorMessage = (show, message) => {
    const errorElement = document.getElementById('error');
    if (show) {
        errorElement.innerText = `Failed to load remote image: ${message}`;
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
    }
};

const startButton = bindButton('draw', button => {
    button.disabled = true;
    showErrorMessage(false);

    drawExtent().then(extent => {
        if (currentImage) {
            map.removeLayer(currentImage, { disposeLayer: true });
        }
        const source = new StaticImageSource({
            extent,
            source: url,
        });
        currentImage = new ColorLayer({ source });

        source.addEventListener('loaded', () => (extentPreview.visible = false));
        source.addEventListener('error', ({ error }) => {
            extentPreview.visible = false;

            showErrorMessage(true, error.message);
        });

        map.addLayer(currentImage);
        instance.notifyChange(map);
        button.disabled = false;
    });
});

const [setCurrentUrl, currentUrl] = bindTextInput('url', v => {
    url = v;
    startButton.disabled = !url;
});

setCurrentUrl(currentUrl);
```

---

## Source: manuals/examples/sun-exposure.md

Source Path: manuals/examples/sun-exposure.md

# Sun exposure

## Официальный кейс
- Slug: `sun-exposure`
- Официальная страница: https://giro3d.org/latest/examples/sun-exposure.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/sun-exposure.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/sun-exposure.js`

## Краткое описание (official)
Use the <a href="../apidoc/classes/interactions.SunExposure.html" target="_blank"><code>SunExposure</code></a> tool to compute solar exposition for a time interval.

## Теги (official)
- `simulation`
- `sun`
- `sunlight`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=sun-exposure npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/sun-exposure.html
```html
---
title: Sun exposure
shortdesc: Use the <a href="../apidoc/classes/interactions.SunExposure.html" target="_blank"><code>SunExposure</code></a> tool to compute solar exposition for a time interval.
tags: [simulation, sun, sunlight]
---

<div class="side-pane-with-status-bar" style="width: 24rem">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <!-- Scenario selector -->
            <div class="input-group">
                <label class="input-group-text col-4" for="scenario">Scenario</label>
                <select
                    class="form-select"
                    id="scenario"
                    autocomplete="off"
                    title="Sets the solar parameter"
                >
                    <option value="box">Plane + Box</option>
                    <option value="plane">Plane only</option>
                    <option value="sphere">Plane + Sphere</option>
                    <option value="terrain">Terrain only</option>
                    <option value="city-block">Photogrammetry mesh</option>
                </select>
            </div>

            <!-- Date -->
            <label for="date" class="form-label mt-3">Date (UTC)</label>
            <input
                type="date"
                class="form-control"
                id="date"
                value="2025-06-21"
                autocomplete="off"
            />

            <label for="start-time" class="form-label mt-3">Start/end times (h)</label>

            <div class="d-flex">
                <input
                    type="number"
                    min="0"
                    max="23"
                    value="8"
                    step="1"
                    class="form-control"
                    id="start-time"
                    autocomplete="off"
                />

                <input
                    type="number"
                    min="0"
                    max="23"
                    value="16"
                    step="1"
                    class="form-control ms-2"
                    id="end-time"
                    autocomplete="off"
                />
            </div>

            <!-- Spatial resolution -->
            <label for="spatial-resolution" class="form-label mt-3">Spatial resolution (m)</label>
            <input
                type="number"
                min="0.25"
                max="100"
                value="10"
                step="0.1"
                class="form-control"
                id="spatial-resolution"
                autocomplete="off"
            />
            <!-- Temporal resolution -->
            <label for="temporal-resolution" class="form-label mt-3"
                >Temporal resolution (minutes)</label
            >
            <input
                type="number"
                min="1"
                max="120"
                value="60"
                step="1"
                class="form-control"
                id="temporal-resolution"
                autocomplete="off"
            />

            <!-- Show/Hide helpers -->
            <div class="form-check form-switch mt-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="show-helpers"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-helpers">Show helpers</label>
            </div>

            <button type="button" class="btn btn-secondary w-100 mt-3" id="draw-aoi">
                Draw simulation area
            </button>

            <button type="button" class="btn btn-primary w-100 mt-3" id="start">
                Compute sun exposure
            </button>
            <button type="button" class="btn btn-danger w-100 mt-3 d-none" id="cancel">
                Cancel
            </button>

            <div class="progress mt-3" role="progressbar" style="display: none">
                <div
                    class="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
                    id="progress"
                    style="width: 0%"
                >
                    Computing...
                </div>
            </div>

            <!-- Show/Hide inputs -->
            <div class="form-check form-switch mt-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked
                    id="show-inputs"
                    autocomplete="off"
                />
                <label class="form-check-label" for="show-inputs">Show objects</label>
            </div>

            <!-- Active attribute selector -->
            <div class="input-group mt-3" id="attribute-group" style="display: none">
                <label class="input-group-text col-4" for="attribute">Variable</label>
                <select
                    class="form-select"
                    id="attribute"
                    autocomplete="off"
                    title="Sets the solar parameter"
                >
                    <option value="irradiation">Irradiation (KWh/m²)</option>
                    <option value="meanIrradiance">Mean irradiance (W/m²)</option>
                    <option value="hoursOfSunlight">Hours of sunlight</option>
                </select>

                <!-- Gradient preview -->
                <div class="mt-3 w-100">
                    <canvas
                        id="gradient"
                        height="32"
                        class="w-100 border rounded"
                        style="height: 32px; image-rendering: pixelated"
                    ></canvas>

                    <div class="w-100">
                        <p class="float-start mb-0" id="colorMapMin">0</p>
                        <p class="float-end mb-0" id="colorMapMax">100</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/sun-exposure.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ';
import * as THREE from 'three';
import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
    SphereGeometry,
    Vector3,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap';
import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Extent from '@giro3d/giro3d/core/geographic/Extent';
import Instance from '@giro3d/giro3d/core/Instance';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer';
import Entity3D from '@giro3d/giro3d/entities/Entity3D';
import Map from '@giro3d/giro3d/entities/Map';
import { MapLightingMode } from '@giro3d/giro3d/entities/MapLightingOptions';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat';
import Inspector from '@giro3d/giro3d/gui/Inspector';
import DrawTool from '@giro3d/giro3d/interactions/DrawTool';
import SunExposure from '@giro3d/giro3d/interactions/SunExposure';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource';
import Fetcher from '@giro3d/giro3d/utils/Fetcher';

import { bindButton } from './widgets/bindButton';
import { bindDropDown } from './widgets/bindDropDown';
import { bindNumberInput } from './widgets/bindNumberInput';
import { bindTextInput } from './widgets/bindTextInput';
import { bindToggle } from './widgets/bindToggle';
import { makeColorRamp } from './widgets/makeColorRamp';
import StatusBar from './widgets/StatusBar';
import updateColorMapPreview from './widgets/updateColorMapPreview';

const lambert93 = CoordinateSystem.register(
    'EPSG:2154',
    '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const utm32 = CoordinateSystem.register(
    'EPSG:25832',
    '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

const params = {
    abortController: new AbortController(),
    aoiShape: null,
    helpers: false,
    showInputs: true,
    scenario: 'simple',
    activeAttribute: 'irradiation',
    spatialResolution: 10,
    date: new Date(Date.UTC(2025, 6, 21)),
    startTime: 8,
    endTime: 16,
    originalVolume: new THREE.Box3().makeEmpty(),
    volume: null,
    boxHelper: null,
    temporalResolutionMinutes: 60,
    currentObjects: [],
    inputs: [],
};

/**
 * @param {Instance} instance
 * @param {Vector3} center
 */
function createLights(instance, center) {
    // Note: those lights are for illustrative purposes,
    // they are not part of the sun exposure computation.

    const main = new DirectionalLight();
    const secondary = new DirectionalLight('white', 0.3);
    const ambientLight = new AmbientLight('white', 0.2);

    instance.add(ambientLight);

    instance.add(main);
    instance.add(main.target);
    instance.add(secondary);
    instance.add(secondary.target);

    main.target.position.copy(center);
    main.position.set(center.x + 1000, center.y + 300, 1000);
    main.updateMatrixWorld(true);
    main.target.updateMatrixWorld(true);

    params.currentObjects.push(main);
    params.currentObjects.push(main.target);

    secondary.target.position.copy(center);
    secondary.position.set(center.x - 1000, center.y + 300, 1000);
    secondary.updateMatrixWorld(true);
    secondary.target.updateMatrixWorld(true);

    params.currentObjects.push(secondary);
    params.currentObjects.push(secondary.target);

    params.currentObjects.push(ambientLight);
}

/**
 * @typedef Scenario object
 * @property {Extent} areaOfInterest
 * @property {THREE.Box3} volume
 * @property {Vector3} center,
 * @property {Array<THREE.Object3D|Entity3D>} inputs
 * @property {[number, number, number]} allowedSpatialResolutionRange
 */

/**
 * @param {Instance} instance
 * @returns {Promise<Scenario>}
 */
async function planeOnlyScenario(instance) {
    const center = Coordinates.WGS84(23.43, 0).as(lambert93);
    const width = 200;
    const areaOfInterest = Extent.fromCenterAndSize(lambert93, center, width, width);
    const plane = new Mesh(
        new PlaneGeometry(width, width),
        new MeshStandardMaterial({ color: 'white' }),
    );

    const centerVec3 = center.toVector3();
    plane.position.copy(centerVec3);
    plane.updateMatrixWorld();

    await instance.add(plane);

    const inputs = [plane];

    return {
        areaOfInterest,
        inputs,
        allowedSpatialResolutionRange: [0.5, 20, 1],
        center: centerVec3,
        volume: areaOfInterest.toBox3(-1, 1),
    };
}

/**
 * @param {Instance} instance
 * @returns {Promise<Scenario>}
 */
async function planeBoxScenario(instance) {
    const center = Coordinates.WGS84(23.4384024785, 0).as(lambert93);
    const width = 300;
    const areaOfInterest = Extent.fromCenterAndSize(lambert93, center, width, width);
    const plane = new Mesh(
        new PlaneGeometry(width, width),
        new MeshStandardMaterial({ color: 'white' }),
    );
    const box = new Mesh(
        new BoxGeometry(30, 30, 60),
        new MeshStandardMaterial({ color: '#89dce5' }),
    );

    const centerVec3 = center.toVector3();
    plane.position.copy(centerVec3);
    box.position.set(centerVec3.x, centerVec3.y, 30);
    plane.updateMatrixWorld();
    box.updateMatrixWorld();

    await instance.add(plane);
    await instance.add(box);

    const volume = new THREE.Box3();
    volume.expandByObject(plane);
    volume.expandByObject(box);

    const inputs = [plane, box];

    return {
        areaOfInterest,
        allowedSpatialResolutionRange: [1, 50, 1],
        inputs,
        center: centerVec3,
        volume,
    };
}

/**
 * @param {Instance} instance
 * @returns {Promise<Scenario>}
 */
async function sphereScenario(instance) {
    const center = Coordinates.WGS84(48.85304790669139, 2.3497154907829603).as(lambert93);
    const width = 300;
    const areaOfInterest = Extent.fromCenterAndSize(lambert93, center, width, width);
    const plane = new Mesh(
        new PlaneGeometry(width, width),
        new MeshStandardMaterial({ color: 'white' }),
    );
    const sphere = new Mesh(new SphereGeometry(30), new MeshStandardMaterial({ color: '#89dce5' }));

    const centerVec3 = center.toVector3();
    plane.position.copy(centerVec3);
    sphere.position.set(centerVec3.x, centerVec3.y, 30);
    plane.updateMatrixWorld();
    sphere.updateMatrixWorld();

    await instance.add(plane);
    await instance.add(sphere);

    const inputs = [plane, sphere];

    const volume = new THREE.Box3();
    volume.expandByObject(plane);
    volume.expandByObject(sphere);

    return {
        areaOfInterest,
        inputs,
        allowedSpatialResolutionRange: [1, 50, 1],
        center: centerVec3,
        volume,
    };
}

/**
 * @param {Instance} instance
 * @returns {Promise<Scenario>}
 */
async function cityBlockScenario(instance) {
    const center = Coordinates.WGS84(45.93506, 6.63125).as(lambert93);

    const loader = new GLTFLoader();
    const model = await loader.loadAsync('https://3d.oslandia.com/giro3d/gltf/jena/scene.gltf');

    model.scene.position.copy(center);
    model.scene.rotateX(Math.PI / 2);
    model.scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model.scene);
    const actualCenter = box.getCenter(new Vector3());
    actualCenter.setZ(box.min.z);
    const size = box.getSize(new Vector3());
    const areaOfInterest = Extent.fromCenterAndSize(lambert93, actualCenter, size.x, size.y);

    await instance.add(model.scene);

    return {
        areaOfInterest,
        inputs: [model.scene],
        allowedSpatialResolutionRange: [0.1, 50, 0.5],
        center: actualCenter,
        volume: box,
    };
}

/**
 * @param {Instance} instance
 * @param {Extent} extent
 */
async function createMap(instance, extent) {
    const map = new Map({
        backgroundColor: 'white',
        lighting: {
            enabled: true,
            mode: MapLightingMode.LightBased,
            elevationLayersOnly: true,
        },
        extent,
        terrain: {
            enabled: true,
            skirts: {
                enabled: true,
                depth: 0,
            },
        },
    });

    await instance.add(map);

    const key =
        'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

    // Adds a XYZ elevation layer with MapBox terrain RGB tileset
    const elevationLayer = new ElevationLayer({
        name: 'xyz_elevation',
        extent,
        // We dont want the full resolution because the terrain
        // mesh has a much lower resolution than the raster image
        resolutionFactor: 0.5,
        minmax: { min: 0, max: 5000 },
        source: new TiledImageSource({
            format: new MapboxTerrainFormat(),
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
                projection: 'EPSG:3857',
                crossOrigin: 'anonymous',
            }),
        }),
    });
    await map.addLayer(elevationLayer);

    // Adds a XYZ color layer with MapBox satellite tileset
    const satelliteLayer = new ColorLayer({
        name: 'xyz_color',
        extent,
        source: new TiledImageSource({
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
                projection: 'EPSG:3857',
                crossOrigin: 'anonymous',
            }),
        }),
    });
    await map.addLayer(satelliteLayer);

    return map;
}

/**
 * @param {Instance} instance
 * @returns {Promise<Scenario>}
 */
async function terrainScenario(instance) {
    const center = Coordinates.WGS84(45.9231, 6.8697).as(lambert93);
    const size = 30_000;
    const extent = Extent.fromCenterAndSize(lambert93, center, size, size);

    const map = await createMap(instance, extent);

    return {
        areaOfInterest: extent,
        inputs: [map],
        allowedSpatialResolutionRange: [50, 1000, 100],
        center: center.toVector3(),
        volume: extent.toBox3(0, 5000),
    };
}

const scenarios = {
    box: planeBoxScenario,
    plane: planeOnlyScenario,
    terrain: terrainScenario,
    sphere: sphereScenario,
    'city-block': cityBlockScenario,
};

const colorMaps = {
    meanIrradiance: new ColorMap({ colors: makeColorRamp('magma'), min: 0, max: 0 }),
    irradiation: new ColorMap({ colors: makeColorRamp('jet'), min: 0, max: 0 }),
    hoursOfSunlight: new ColorMap({ colors: makeColorRamp('RdBu'), min: 0, max: 0 }),
};

const instance = new Instance({
    target: 'view',
    crs: lambert93,
    backgroundColor: 'white',
});

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

const compassMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    visible: false,
    color: 'white',
});

Fetcher.texture('https://3d.oslandia.com/giro3d/images/compass.webp', { flipY: true }).then(t => {
    compassMaterial.map = t;
    compassMaterial.visible = true;
    instance.notifyChange();
});

const compass = new Mesh(new PlaneGeometry(1, 1), compassMaterial);
compass.name = 'compass';

instance.add(compass);

const progressBar = document.getElementById('progress');

let currentPointCloud = null;
/** @type {SunExposure} */
let currentSunExposure = null;

/**
 * @param {string} scenarioName - The scenario to run.
 */
async function run(scenarioName) {
    if (params.currentObjects.length > 0) {
        params.currentObjects.forEach(o => instance.remove(o));
        params.currentObjects.length = 0;
    }

    if (currentPointCloud) {
        instance.remove(currentPointCloud);
        currentPointCloud = null;
    }

    params.volume = null;
    if (params.boxHelper) {
        instance.remove(params.boxHelper);
        params.boxHelper = null;
    }

    if (currentSunExposure) {
        currentSunExposure.dispose();
    }

    const scenario = scenarios[scenarioName];
    const { areaOfInterest, inputs, center, volume, allowedSpatialResolutionRange } =
        await scenario(instance);

    /** @type {HTMLInputElement} */
    // @ts-expect-error ignore that
    const spatialResInput = document.getElementById('spatial-resolution');
    const [minRes, maxRes, defaultRes] = allowedSpatialResolutionRange;
    spatialResInput.min = minRes;
    spatialResInput.max = maxRes;
    spatialResInput.value = defaultRes;
    params.spatialResolution = defaultRes;

    params.inputs = inputs;
    params.originalVolume = volume;
    params.currentObjects.push(...inputs);

    const dims = areaOfInterest.dimensions();

    const compassSize = dims.width * 2;
    compass.scale.set(compassSize, compassSize, 1);
    compass.position.set(center.x, center.y, center.z - 1);
    compass.updateMatrixWorld(true);
    instance.add(compass);

    const pov = instance.view.goTo(inputs[0]);

    createLights(instance, center);

    controls.target.set(pov.target.x, pov.target.y, 0);
    controls.update();
    controls.saveState();

    instance.notifyChange();

    const setActiveAttribute = (/** @type {string} */ att) => {
        updateColorMapPreview('gradient', colorMaps[att].colors);
        currentPointCloud?.setActiveAttribute(att);

        // Note that irradiation is technically in Watt-hour/m², but for readability,
        // we convert to Kilowatt-hour/m² to be displayed in the UI. Remember that
        // the actual values are in Watt-hour/m² though.
        const factor = att === 'irradiation' ? 0.001 : 1;

        const min = Math.abs(colorMaps[att].min * factor);
        const max = Math.abs(colorMaps[att].max * factor);

        document.getElementById('colorMapMin').innerText = min.toFixed(2);
        document.getElementById('colorMapMax').innerText = max.toFixed(2);
    };

    const onStart = () => {
        if (currentPointCloud) {
            instance.remove(currentPointCloud);
            currentPointCloud = null;
        }

        if (currentSunExposure) {
            currentSunExposure.dispose();
            currentSunExposure = null;
        }

        const yyyy = params.date.getUTCFullYear();
        const mm = params.date.getUTCMonth();
        const dd = params.date.getUTCDay();
        const start = new Date(Date.UTC(yyyy, mm, dd, params.startTime));
        const end = new Date(Date.UTC(yyyy, mm, dd, params.endTime));
        inputs.forEach(obj => (obj.visible = true));

        const sunExposure = new SunExposure({
            instance,
            showHelpers: params.helpers,
            objects: inputs,
            limits: Extent.fromBox3(lambert93, params.volume ?? params.originalVolume),
            spatialResolution: params.spatialResolution,
            colorMap: colorMaps['irradiation'],
            start,
            end,
            temporalResolution: params.temporalResolutionMinutes * 60,
        });

        currentSunExposure = sunExposure;

        sunExposure.addEventListener('progress', e => {
            const percent = (e.progress * 100).toFixed(0);
            console.log(`sun computation progress: ${percent}%`);

            progressBar.style.width = `${percent}%`;

            if (e.progress >= 1) {
                progressBar.parentElement.style.display = 'none';
            }
        });

        progressBar.parentElement.style.display = 'block';

        document.getElementById('attribute-group').style.display = 'none';

        params.abortController = new AbortController();

        const startButton = document.getElementById('start');
        const cancelButton = document.getElementById('cancel');

        startButton.classList.add('d-none');
        cancelButton.classList.remove('d-none');

        sunExposure
            .compute({ signal: params.abortController.signal })
            .then(results => {
                currentPointCloud = results.entity;
                if (!params.showInputs) {
                    inputs.forEach(obj => (obj.visible = false));
                }

                instance.notifyChange();
                colorMaps.meanIrradiance.min = results.variables.meanIrradiance.min;
                colorMaps.meanIrradiance.max = results.variables.meanIrradiance.max;

                colorMaps.irradiation.min = results.variables.irradiation.min;
                colorMaps.irradiation.max = results.variables.irradiation.max;

                colorMaps.hoursOfSunlight.min = results.variables.hoursOfSunlight.min;
                colorMaps.hoursOfSunlight.max = results.variables.hoursOfSunlight.max;

                results.entity.setAttributeColorMap('meanIrradiance', colorMaps.meanIrradiance);
                results.entity.setAttributeColorMap('irradiation', colorMaps.irradiation);
                results.entity.setAttributeColorMap('hoursOfSunlight', colorMaps.hoursOfSunlight);

                setActiveAttribute(params.activeAttribute);

                document.getElementById('attribute-group').style.display = 'flex';
            })
            .catch(console.warn)
            .finally(() => {
                startButton.classList.remove('d-none');
                cancelButton.classList.add('d-none');
                progressBar.parentElement.style.display = 'none';
            });
    };

    bindButton('start', onStart);
    bindButton('cancel', () => params.abortController.abort());

    bindDropDown('attribute', att => {
        params.activeAttribute = att;
        setActiveAttribute(att);
    });
}

const drawTool = new DrawTool({ instance });

function drawAoiShape() {
    drawTool
        .createPolygon({
            showVertices: true,
        })
        .then(shape => {
            const box = new THREE.Box3().setFromPoints([...shape.points]);
            box.min.setZ(-100000);
            box.max.setZ(100000);
            box.intersect(params.originalVolume);
            params.volume = box;
            const boxHelper = new THREE.Box3Helper(box, 'cyan');
            boxHelper.updateMatrixWorld(true);
            if (params.boxHelper) {
                instance.remove(params.boxHelper);
            }
            params.boxHelper = boxHelper;
            instance.add(boxHelper);
            instance.remove(shape);
            instance.notifyChange(boxHelper);
        });
}

bindNumberInput('spatial-resolution', v => (params.spatialResolution = v));
bindNumberInput('temporal-resolution', v => (params.temporalResolutionMinutes = v));
bindDropDown('scenario', s => {
    run(s).catch(console.error);
});
bindNumberInput('start-time', h => (params.startTime = h));
bindNumberInput('end-time', h => (params.endTime = h));
bindTextInput('date', date => {
    params.date = new Date(date);
});
bindButton('draw-aoi', drawAoiShape);
bindToggle('show-helpers', v => (params.helpers = v));
bindToggle('show-inputs', v => {
    params.showInputs = v;
    params.inputs.forEach(obj => (obj.visible = v));
    instance.notifyChange();
});

run('box').catch(console.error);

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/temporal-wms.md

Source Path: manuals/examples/temporal-wms.md

# Temporal WMS layer

## Официальный кейс
- Slug: `temporal-wms`
- Официальная страница: https://giro3d.org/latest/examples/temporal-wms.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/temporal-wms.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/temporal-wms.js`

## Краткое описание (official)
Load a WMS-T layer.

## Теги (official)
- `map`
- `wms`
- `temporal`
- `time`

## Атрибуция (official)
Copernicus, OpenStreetMap contributors.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=temporal-wms npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/temporal-wms.html
```html
---
title: Temporal WMS layer
shortdesc: Load a WMS-T layer.
attribution: <a target="_blank" href="https://global-flood.emergency.copernicus.eu/">Copernicus</a>, <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.
tags: [map, wms, temporal, time]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-header">Parameters</div>
        <div class="card-body">
            <button type="button" class="btn btn-primary w-100" id="reset">Reset</button>
            <button type="button" class="btn btn-primary w-100 mt-2" id="previous-day">
                Previous day
            </button>
            <button type="button" class="btn btn-primary w-100 mt-2" id="next-day">Next day</button>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/temporal-wms.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { OSM } from 'ol/source';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem';
import Extent from '@giro3d/giro3d/core/geographic/Extent';
import Instance from '@giro3d/giro3d/core/Instance';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer';
import Map from '@giro3d/giro3d/entities/Map';
import Inspector from '@giro3d/giro3d/gui/Inspector';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource';
import WmsSource from '@giro3d/giro3d/sources/WmsSource';

import { bindButton } from './widgets/bindButton';
import StatusBar from './widgets/StatusBar';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
});

const extent = new Extent(CoordinateSystem.epsg4326, {
    west: -25,
    south: 36,
    north: 65,
    east: 65,
}).as(instance.coordinateSystem);

const map = new Map({
    extent,
});

instance.add(map);

// Add an OpenStreetMap background
map.addLayer(
    new ColorLayer({
        name: 'OSM',
        source: new TiledImageSource({ source: new OSM() }),
    }),
);

const source = new WmsSource({
    url: 'https://globalfloods-ows.ecmwf.int/glofas-ows/ows.py',
    layer: 'AccRainEGE',
    projection: 'EPSG:4326',
    imageFormat: 'image/png',
});

const initialDate = new Date(Date.UTC(2018, 3, 18));
let currentDate = new Date(initialDate);

source.setTime(currentDate);

// Add our temporal WMS layer
map.addLayer(
    new ColorLayer({
        name: 'AccRainEGE',
        source,
    }),
);

const { target } = instance.view.goTo(map);

const controls = new MapControls(instance.view.camera, instance.domElement);

instance.view.setControls(controls);
controls.target.copy(target);

StatusBar.bind(instance);

Inspector.attach('inspector', instance);

/**
 * @param {Date} date
 */
const updateWmsLayer = date => {
    source.setTime(date);
};

bindButton('reset', () => {
    updateWmsLayer(initialDate);
});

bindButton('previous-day', () => {
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    updateWmsLayer(currentDate);
});

bindButton('next-day', () => {
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    updateWmsLayer(currentDate);
});
```

---

## Source: manuals/examples/three-js-integration.md

Source Path: manuals/examples/three-js-integration.md

# Three.js loaders

## Официальный кейс
- Slug: `three-js-integration`
- Официальная страница: https://giro3d.org/latest/examples/three-js-integration.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/three-js-integration.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/three-js-integration.js`

## Краткое описание (official)
Load models directly from a Three.js loader (skinned mesh in this instance).

## Теги (official)
- `three`
- `gltf`
- `loader`

## Атрибуция (official)
© threejs.org

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=three-js-integration npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/three-js-integration.html
```html
---
title: Three.js loaders
shortdesc: Load models directly from a Three.js loader (skinned mesh in this instance).
attribution: © <a href="http://threejs.org" target="_blank">threejs.org</a>
tags: [three, gltf, loader]
---

<div class="side-pane-with-status-bar">
    <div class="card">
        <div class="card-body">
            <div class="input-group">
                <label class="input-group-text" for="pick_source">Pick from</label>
                <select class="form-select" id="pick_source">
                    <option value="0" selected>All models</option>
                    <option value="1">Vanguard idle</option>
                    <option value="3">Vanguard walking</option>
                    <option value="2">Vanguard running</option>
                </select>
            </div>
            <div id="selectedDiv"></div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/three-js-integration.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import {
    AnimationMixer,
    Clock,
    Color,
    DirectionalLight,
    Fog,
    HemisphereLight,
    Mesh,
    MeshPhongMaterial,
    PlaneGeometry,
    Vector3,
} from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import { bindNumericalDropDown } from './widgets/bindNumericalDropDown.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
});

const camera = instance.view.camera;

instance.renderer.shadowMap.enabled = true;

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

const clock = new Clock();

// we can access the THREE.js scene directly
instance.scene.background = new Color(0xa0a0a0);
instance.scene.fog = new Fog(0xa0a0a0, 10, 50);

// adding lights directly to scene is ok
const hemiLight = new HemisphereLight(0xffffff, 0x444444, 2);
hemiLight.position.set(0, 0, 20);
hemiLight.updateMatrixWorld();
instance.scene.add(hemiLight);

const dirLight = new DirectionalLight(0xffffff, 3);
dirLight.position.set(-3, 10, 10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 4;
dirLight.shadow.camera.bottom = -4;
dirLight.shadow.camera.left = -4;
dirLight.shadow.camera.right = 4;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
instance.scene.add(dirLight);
instance.scene.add(dirLight.target);
dirLight.updateMatrixWorld();

// Let's now setup a "ground" to receive the shadows
const mesh = new Mesh(
    new PlaneGeometry(200, 200),
    new MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }),
);
mesh.receiveShadow = true;
// Contrary to lights, every meshes should be added through `instance.add`, in order for Giro3D to
// be aware of them. Otherwise the objects will just disappear.
// For technical details, see how MainLoop.js calculates camera near and far.
instance.add(mesh);

// Let's load objects using one of the THREE loaders.
const loader = new GLTFLoader();
loader.load('https://threejs.org/examples/models/gltf/Soldier.glb', gltf => {
    gltf.scene.traverse(object => {
        // @ts-expect-error typing
        if (object.isMesh) {
            object.castShadow = true;
        }
    });

    // this code is virtually identical to this example:
    // https://threejs.org/examples/webgl_animation_multiple
    const model1 = clone(gltf.scene);
    const model2 = clone(gltf.scene);
    const model3 = clone(gltf.scene);
    const models = [model1, model2, model3];

    const mixer1 = new AnimationMixer(model1);
    const mixer2 = new AnimationMixer(model2);
    const mixer3 = new AnimationMixer(model3);
    const mixers = [mixer1, mixer2, mixer3];

    mixer1.clipAction(gltf.animations[0]).play(); // idle
    mixer2.clipAction(gltf.animations[1]).play(); // run
    mixer3.clipAction(gltf.animations[3]).play(); // walk

    model1.position.x = 1;
    model1.rotation.x = Math.PI / 2;
    model1.updateMatrixWorld();
    model2.position.x = 0;
    model2.rotation.x = Math.PI / 2;
    model2.updateMatrixWorld();
    model3.position.x = 2;
    model3.rotation.x = Math.PI / 2;
    model3.updateMatrixWorld();

    // except for this part, we add directly to instance to make Giro3D aware of these models
    instance.add(model1);
    instance.add(model2);
    instance.add(model3);

    // let's move our camera and control target
    // We add 1 to z to look at the waist. The 0, 0, 0 is located at the soldier's feet.
    const lookAt = new Vector3(0, 0, 1).add(model1.position);
    camera.position.set(2, 6, 3);
    camera.lookAt(lookAt);
    controls.target.copy(lookAt);
    controls.saveState();

    // you can hook yourself to event of the rendering loop.
    instance.addEventListener('after-camera-update', () => {
        const delta = clock.getDelta();

        for (const mixer of mixers) {
            mixer.update(delta);
        }
        for (const model of models) {
            model.updateMatrixWorld();
            instance.notifyChange(model);
        }
    });

    instance.notifyChange();

    let where = models;
    bindNumericalDropDown('pick_source', newMode => {
        if (newMode === 1) {
            where = [model1];
        } else if (newMode === 2) {
            where = [model2];
        } else if (newMode === 3) {
            where = [model3];
        } else {
            where = models;
        }
    });

    const formatter = new Intl.NumberFormat();

    function format(point) {
        return `x: ${formatter.format(point.x)}\n
                y: ${formatter.format(point.y)}\n
                z: ${formatter.format(point.z)}`;
    }

    instance.domElement.addEventListener('dblclick', e => {
        const picked = instance.pickObjectsAt(e, { limit: 1, where });
        if (picked.length === 0) {
            document.getElementById('selectedDiv').innerText = 'No object found';
        } else {
            document.getElementById('selectedDiv').innerHTML = `
                Picked ${picked[0].object.name} at:<br>
                ${format(picked[0].point)}!`;
        }
    });
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/tiff-tiles.md

Source Path: manuals/examples/tiff-tiles.md

# 32-bit TIFF elevation tiles

## Официальный кейс
- Slug: `tiff-tiles`
- Официальная страница: https://giro3d.org/latest/examples/tiff-tiles.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/tiff-tiles.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/tiff-tiles.js`

## Краткое описание (official)
Display a map with TMS TIFF tiles in Float32 format.

## Расширенное описание (official longdesc)
You can implement your own `ImageFormat` to load images in a non-standard MIME type (by default, only PNG/JPG/WEBP tiles are loaded by Giro3D).

## Теги (official)
- `map`
- `xyz`
- `tiles`
- `geotiff`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=tiff-tiles npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/tiff-tiles.html
```html
---
title: 32-bit TIFF elevation tiles
shortdesc: Display a map with TMS TIFF tiles in Float32 format.
longdesc: You can implement your own <a href="../apidoc/classes/formats.ImageFormat.html" target="_blank"><code>ImageFormat</code></a> to load images in a non-standard MIME type (by default, only PNG/JPG/WEBP tiles are loaded by Giro3D).
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['@turf/turf']
tags: [map, xyz, tiles, geotiff]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/tiff-tiles.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import * as turf from '@turf/turf';
import XYZ from 'ol/source/XYZ.js';
import { DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import GeoTIFFFormat from '@giro3d/giro3d/formats/GeoTIFFFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import Fetcher from '@giro3d/giro3d/utils/Fetcher.js';

import StatusBar from './widgets/StatusBar.js';

const x = -13602618.385789588;
const y = 5811042.273912458;

const extent = new Extent(CoordinateSystem.epsg3857, x - 12000, x + 13000, y - 4000, y + 26000);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

const map = new Map({
    extent,
    lighting: true,
    side: DoubleSide,
    discardNoData: true,
    backgroundColor: 'white',
});

instance.add(map);

let footprint;

/**
 * A function that will override the default intersection test for image sources (by default
 * performing intersection on extents, i.e rectangles). Here we want to exclude tiles that do not
 * intersect with the GeoJSON footprint of the dataset.
 *
 * @param {Extent} tileExtent The extent to test.
 */
function customIntersectionTest(tileExtent) {
    if (!footprint) {
        return true;
    }

    const corners = [
        [tileExtent.topLeft().x, tileExtent.topLeft().y],
        [tileExtent.topRight().x, tileExtent.topRight().y],
        [tileExtent.bottomRight().x, tileExtent.bottomRight().y],
        [tileExtent.bottomLeft().x, tileExtent.bottomLeft().y],
    ];

    const extentAsPolygon = turf.helpers.polygon([
        [corners[0], corners[1], corners[2], corners[3], corners[0]],
    ]);

    const intersects = turf.booleanIntersects(turf.toWgs84(extentAsPolygon), footprint);

    return intersects;
}

Fetcher.json('data/MtStHelens-footprint.geojson')
    .then(geojson => {
        footprint = turf.toWgs84(geojson);

        const source = new TiledImageSource({
            containsFn: customIntersectionTest, // Here we specify our custom intersection test
            source: new XYZ({
                minZoom: 10,
                maxZoom: 16,
                url: 'https://3d.oslandia.com/dem/MtStHelens-tiles/{z}/{x}/{y}.tif',
            }),
            format: new GeoTIFFFormat(),
        });

        map.addLayer(
            new ElevationLayer({
                name: 'osm',
                extent,
                source,
                noDataOptions: {
                    replaceNoData: true,
                },
            }),
        ).catch(e => console.error(e));
    })
    .catch(e => console.error(e));

const center = extent.centerAsVector3();
instance.view.camera.position.set(center.x, center.y - 1, 50000);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.target.copy(center);

instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/topojson.md

Source Path: manuals/examples/topojson.md

# TopoJSON

## Официальный кейс
- Slug: `topojson`
- Официальная страница: https://giro3d.org/latest/examples/topojson.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/topojson.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/topojson.js`

## Краткое описание (official)
Display a TopoJSON file on a Map.

## Теги (official)
- `map`
- `layer`
- `vector`
- `topojson`

## Атрибуция (official)
© OpenStreetMap contributors.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=topojson npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/topojson.html
```html
---
title: TopoJSON
shortdesc: Display a TopoJSON file on a Map.
attribution: © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.
tags: [map, layer, vector, topojson]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/topojson.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import TopoJSON from 'ol/format/TopoJSON.js';
import OSM from 'ol/source/OSM.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:30174',
    '+proj=tmerc +lat_0=26 +lon_0=142 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=-146.414,507.337,680.507,0,0,0,0 +units=m +no_defs +type=crs',
);

const extent = new Extent(
    crs,
    -201012.900985493,
    -198191.63799031873,
    1066954.2964232096,
    1071890.8856167798,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
});

const center = extent.centerAsVector2();

instance.view.camera.position.set(center.x, center.y - 1, 2000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.target.set(center.x, center.y, 0);
instance.view.setControls(controls);

const map = new Map({ extent, backgroundColor: '#135D66' });
instance.add(map);

const buildingsStyle = feature => {
    const highlight = feature.get('highlight');
    const stroke = highlight
        ? new Stroke({
              color: 'white',
              width: 2,
          })
        : undefined;

    return new Style({
        zIndex: highlight ? 1 : 0,
        fill: new Fill({
            color: highlight ? 'green' : 'red',
        }),
        stroke,
    });
};

const topoJsonSource = new VectorSource({
    data: {
        url: 'https://3d.oslandia.com/giro3d/vectors/tokyo_buildings.topojson',
        format: new TopoJSON(),
    },
    dataProjection: CoordinateSystem.epsg4326,
    style: buildingsStyle,
});

const buildingsLayer = new ColorLayer({
    name: 'Buildings',
    extent,
    source: topoJsonSource,
});

// Create the OpenStreetMap color layer using an OpenLayers source.
// See https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
// for more informations.
const osm = new ColorLayer({
    name: 'osm',
    source: new TiledImageSource({ source: new OSM() }),
    extent,
});

map.addLayer(osm);
map.addLayer(buildingsLayer);

StatusBar.bind(instance);

const labelElement = document.createElement('span');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';
const label = new CSS2DObject(labelElement);

label.visible = false;
instance.add(label);

let previousFeature;

function pickFeatures(mouseEvent) {
    const pickResult = instance.pickObjectsAt(mouseEvent, {
        radius: 0,
    });

    const picked = pickResult[0];

    function resetPickedFeatures() {
        if (previousFeature) {
            previousFeature.set('highlight', false);
            topoJsonSource.updateFeature(previousFeature);
        }
        if (label.visible) {
            label.visible = false;
        }
        previousFeature = null;
    }

    if (picked) {
        const { x, y } = picked.point;
        const features = buildingsLayer.getVectorFeaturesAtCoordinate(
            new Coordinates(instance.coordinateSystem, x, y),
        );

        if (features.length > 0) {
            const firstFeature = features[0];

            previousFeature?.set('highlight', false);
            firstFeature.set('highlight', true);

            if (previousFeature !== firstFeature) {
                topoJsonSource.updateFeature(previousFeature, firstFeature);
                previousFeature = firstFeature;
            }

            instance.notifyChange(map);
            label.position.set(x, y, 100);
            label.visible = true;
            label.element.innerText = firstFeature.get('osm_id');
            label.updateMatrixWorld(true);
        } else {
            resetPickedFeatures();
        }
    } else {
        resetPickedFeatures();
    }
}

instance.domElement.addEventListener('mousemove', pickFeatures);
instance.domElement.addEventListener('dblclick', e => console.log(instance.pickObjectsAt(e)));

Inspector.attach('inspector', instance);

instance.notifyChange(map);
```

---

## Source: manuals/examples/tracking-progress.md

Source Path: manuals/examples/tracking-progress.md

# Tracking progress

## Официальный кейс
- Slug: `tracking-progress`
- Официальная страница: https://giro3d.org/latest/examples/tracking-progress.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/tracking-progress.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/tracking-progress.js`

## Краткое описание (official)
Query progress of processing tasks with the <code>.progress</code> and <code>.loading</code> APIs.

## Расширенное описание (official longdesc)
Use the `loading` and `progress` properties of various elements (`Instance`, `Entity`, `Layer`...) to track the loading of the data. Each level of the hierarchy aggregates the state of its children (e.g the instance aggregates the state of all entities under its control).

## Теги (official)
- `progress`
- `loading`
- `map`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=tracking-progress npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/tracking-progress.html
```html
---
title: Tracking progress
shortdesc: Query progress of processing tasks with the <code>.progress</code> and <code>.loading</code> APIs.
longdesc: Use the <code>loading</code> and <code>progress</code> properties of various elements (<a href="../apidoc/classes/core.Instance.html" target="_blank"><code>Instance</code></a>, <a href="../apidoc/classes/entities.Entity.html" target="_blank"><code>Entity</code></a>, <a href="../apidoc/classes/core.layer.Layer.html" target="_blank"><code>Layer</code></a>...) to track the loading of the data. <br> Each level of the hierarchy aggregates the state of its children (e.g the instance aggregates the state of all entities under its control).
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
tags: [progress, loading, map]
---

<div class="side-pane-with-status-bar">
    <ul class="list-group mh-100 overflow-y-auto">
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>Instance</span>
            <div class="progress" style="width: 100px">
                <div id="progress-instance" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mx-3">Map (left)</span>
            <div class="progress" style="width: 100px">
                <div id="progress-map1" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mx-5">Color layer</span>
            <div class="progress" style="width: 100px">
                <div id="progress-color1" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mx-5">Elevation layer</span>
            <div class="progress" style="width: 100px">
                <div id="progress-elevation1" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mx-3">Map (right)</span>
            <div class="progress" style="width: 100px">
                <div id="progress-map2" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mx-5">Color layer</span>
            <div class="progress" style="width: 100px">
                <div id="progress-color2" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="mx-5">Elevation layer</span>
            <div class="progress" style="width: 100px">
                <div id="progress-elevation2" class="progress-bar" style="width: 100%"></div>
            </div>
        </li>
    </ul>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/tracking-progress.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import XYZ from 'ol/source/XYZ.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(CoordinateSystem.epsg3857, -13611854, -13593262, 5806332, 5820603);

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
});

function createMap(mapExtent, tileset) {
    const key =
        'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';
    const map = new Map({
        extent: mapExtent,
        lighting: { enabled: true, elevationLayersOnly: true },
        backgroundColor: 'grey',
    });
    map.name = tileset;
    instance.add(map);

    // Adds a XYZ elevation layer with MapBox terrain RGB tileset
    const elevationLayer = new ElevationLayer({
        name: 'xyz_elevation',
        extent,
        resolutionFactor: 1 / 8,
        source: new TiledImageSource({
            format: new MapboxTerrainFormat(),
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
                projection: extent.crs.id,
                crossOrigin: 'anonymous',
            }),
        }),
    });
    map.addLayer(elevationLayer);

    // Adds a XYZ color layer with MapBox satellite tileset
    const colorLayer = new ColorLayer({
        name: 'xyz_color',
        extent,
        source: new TiledImageSource({
            source: new XYZ({
                url: `https://api.mapbox.com/v4/mapbox.${tileset}/{z}/{x}/{y}.webp?access_token=${key}`,
                projection: extent.crs.id,
                crossOrigin: 'anonymous',
            }),
        }),
    });
    map.addLayer(colorLayer);

    return { map, colorLayer, elevationLayer };
}

const split = extent.split(2, 1);

const naip = createMap(split[0], 'naip');
const satellite = createMap(split[1], 'satellite');

const center = extent.centerAsVector3();
instance.view.camera.position.set(center.x, extent.maxY, 10000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = center;
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

const instanceProgress = document.getElementById('progress-instance');
const naipMapProgress = document.getElementById('progress-map1');
const color1Progress = document.getElementById('progress-color1');
const elevation1Progress = document.getElementById('progress-elevation1');
const satelliteMapProgress = document.getElementById('progress-map2');
const color2Progress = document.getElementById('progress-color2');
const elevation2Progress = document.getElementById('progress-elevation2');

function updateProgressBar(domElement, source) {
    domElement.style.width = `${Math.round(source.progress * 100)}%`;
}

// Let's poll the main loop: at each update, we can update the progress bars
instance.addEventListener('update-end', () => {
    updateProgressBar(instanceProgress, instance);

    updateProgressBar(naipMapProgress, naip.map);
    updateProgressBar(color1Progress, naip.colorLayer);
    updateProgressBar(elevation1Progress, naip.elevationLayer);

    updateProgressBar(satelliteMapProgress, satellite.map);
    updateProgressBar(color2Progress, satellite.colorLayer);
    updateProgressBar(elevation2Progress, satellite.elevationLayer);
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/transparent-background.md

Source Path: manuals/examples/transparent-background.md

# Transparent canvas background

## Официальный кейс
- Slug: `transparent-background`
- Официальная страница: https://giro3d.org/latest/examples/transparent-background.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/transparent-background.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/transparent-background.js`

## Краткое описание (official)
A canvas with a transparent background.

## Расширенное описание (official longdesc)
You can render Giro3D's scene on a transparent background, using the appropriate options in the `Instance` constructor.

## Теги (official)
- `opacity`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=transparent-background npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/transparent-background.html
```html
---
title: Transparent canvas background
shortdesc: A canvas with a transparent background.
longdesc: You can render Giro3D's scene on a transparent background, using the appropriate options in the <a href="../apidoc/classes/core.Instance.html" target="_blank"><code>Instance</code></a> constructor.
attribution: © <a target="_blank" href="https://www.usgs.gov/">U.S. Geological Survey</a>
dependencies: ['colormap']
tags: [opacity]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/transparent-background.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import colormap from 'colormap';
import XYZ from 'ol/source/XYZ.js';
import { Color, DoubleSide } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import GeoTIFFFormat from '@giro3d/giro3d/formats/GeoTIFFFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

import StatusBar from './widgets/StatusBar.js';

const x = -13602000;
const y = 5812000;
const halfWidth = 2500;

const extent = new Extent(
    CoordinateSystem.epsg3857,
    x - halfWidth,
    x + halfWidth,
    y - halfWidth,
    y + halfWidth,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: null,
});

const map = new Map({
    extent,
    lighting: true,
    side: DoubleSide,
    backgroundColor: 'white',
});

instance.add(map);

const source = new TiledImageSource({
    source: new XYZ({
        minZoom: 10,
        maxZoom: 16,
        url: 'https://3d.oslandia.com/dem/MtStHelens-tiles/{z}/{x}/{y}.tif',
    }),
    format: new GeoTIFFFormat(),
});

const floor = 1100;
const ceiling = 2500;

const values = colormap({ colormap: 'viridis', nshades: 256 });
const colors = values.map(v => new Color(v));

const dem = new ElevationLayer({
    name: 'dem',
    source,
    extent,
    colorMap: new ColorMap({ colors, min: floor, max: ceiling }),
});

map.addLayer(dem);

instance.view.camera.position.set(-13594700, 5819700, 7300);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.target.set(-13603000, 5811000, 0);

instance.view.setControls(controls);

instance.notifyChange();

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/vector-mesh.md

Source Path: manuals/examples/vector-mesh.md

# Undraped vectors

## Официальный кейс
- Slug: `vector-mesh`
- Официальная страница: https://giro3d.org/latest/examples/vector-mesh.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/vector-mesh.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/vector-mesh.js`

## Краткое описание (official)
Display GeoJSON files as meshes and symbols.

## Расширенное описание (official longdesc)
The `FeatureCollection` entity can display simple features as meshes, that do not require a map to display. The benefits are a reduced memory usage and lower latency when updating the styles. The entity supports fully dynamic fill, stroke and point `styles`. Whenever the style of a feature changes, call `updateStyles()` with the updated object(s).

## Теги (official)
- `mesh`
- `style`
- `vectors`

## Атрибуция (official)
Не указана.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=vector-mesh npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/vector-mesh.html
```html
---
title: Undraped vectors
shortdesc: Display GeoJSON files as meshes and symbols.
longdesc: The <a target="_blank" href="../apidoc/classes/entities.FeatureCollection.html"><code>FeatureCollection</code></a> entity can display simple features as meshes, that do not require a map to display. The benefits are a reduced memory usage and lower latency when updating the styles. The entity supports fully dynamic fill, stroke and point <a target="_blank" href="../apidoc/types/core.features.FeatureStyle.html"><code>styles</code></a>. Whenever the style of a feature changes, call <a target="_blank" href="../apidoc/classes/entities.FeatureCollection.html#updateStyles"><code>updateStyles()</code></a> with the updated object(s).
dependencies: ['colormap']
tags: [mesh, style, vectors]
---

<div class="side-pane-with-status-bar pe-none" style="width: 20rem">
    <!--Parameters -->
    <div class="card">
        <div class="card-header">Style</div>

        <div class="card-body">
            <div class="input-group mb-3">
                <label class="input-group-text" for="color-mode">Color</label>
                <select class="form-select" id="color-mode" autocomplete="off">
                    <option value="continent" selected>Per continent</option>
                    <option value="population">Population</option>
                    <option value="gdp">GDP</option>
                </select>
            </div>

            <div class="card mb-3" id="colors">
                <div class="card-header">Colors</div>
                <div class="card-body">
                    <!-- North America -->
                    <label class="form-check-label w-100 mb-2" for="North America">
                        <div class="row">
                            <div class="col">North America</div>
                            <div class="col">
                                <input
                                    type="color"
                                    class="form-control form-control-color float-end h-100 w-100"
                                    id="North America"
                                    value="#2978b4"
                                    title="color"
                                />
                            </div>
                        </div>
                    </label>

                    <!-- South America -->
                    <label class="form-check-label w-100 mb-2" for="South America">
                        <div class="row">
                            <div class="col">South America</div>
                            <div class="col">
                                <input
                                    type="color"
                                    class="form-control form-control-color float-end h-100 w-100"
                                    id="South America"
                                    value="#2978b4"
                                    title="color"
                                />
                            </div>
                        </div>
                    </label>

                    <!-- Asia -->
                    <label class="form-check-label w-100 mb-2" for="Asia">
                        <div class="row">
                            <div class="col">Asia</div>
                            <div class="col">
                                <input
                                    type="color"
                                    class="form-control form-control-color float-end h-100 w-100"
                                    id="Asia"
                                    value="#2978b4"
                                    title="color"
                                />
                            </div>
                        </div>
                    </label>

                    <!-- Europe -->
                    <label class="form-check-label w-100 mb-2" for="Europe">
                        <div class="row">
                            <div class="col">Europe</div>
                            <div class="col">
                                <input
                                    type="color"
                                    class="form-control form-control-color float-end h-100 w-100"
                                    id="Europe"
                                    value="#2978b4"
                                    title="color"
                                />
                            </div>
                        </div>
                    </label>

                    <!-- Africa -->
                    <label class="form-check-label w-100 mb-2" for="Africa">
                        <div class="row">
                            <div class="col">Africa</div>
                            <div class="col">
                                <input
                                    type="color"
                                    class="form-control form-control-color float-end h-100 w-100"
                                    id="Africa"
                                    value="#2978b4"
                                    title="color"
                                />
                            </div>
                        </div>
                    </label>

                    <!-- Oceania -->
                    <label class="form-check-label w-100 mb-2" for="Oceania">
                        <div class="row">
                            <div class="col">Oceania</div>
                            <div class="col">
                                <input
                                    type="color"
                                    class="form-control form-control-color float-end h-100 w-100"
                                    id="Oceania"
                                    value="#2978b4"
                                    title="color"
                                />
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <!-- Line width slider -->
            <div class="row">
                <div class="col">
                    <label for="line-width" class="form-label">Line width</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value="2"
                        class="form-range"
                        id="line-width"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Image size -->
            <div class="row">
                <div class="col">
                    <label for="image-size" class="form-label">Image size</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="8"
                        max="256"
                        step="1"
                        value="64"
                        class="form-range"
                        id="image-size"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Stroke opacity -->
            <div class="row">
                <div class="col">
                    <label for="stroke-opacity" class="form-label">Stroke opacity</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value="1"
                        class="form-range"
                        id="stroke-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>

            <!-- Fill opacity -->
            <div class="row">
                <div class="col">
                    <label for="fill-opacity" class="form-label">Fill opacity</label>
                </div>
                <div class="col">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value="1"
                        class="form-range"
                        id="fill-opacity"
                        autocomplete="off"
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="card mt-3" id="attributes" style="display: none">
        <div class="card-header">Attributes</div>

        <div class="card-body">
            <!-- Result table -->
            <div id="results"></div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/vector-mesh.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { tile } from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import { createXYZ } from 'ol/tilegrid.js';
import { MathUtils, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import FeatureCollection from '@giro3d/giro3d/entities/FeatureCollection.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';

import { bindColorPicker } from './widgets/bindColorPicker.js';
import { bindDropDown } from './widgets/bindDropDown.js';
import { bindSlider } from './widgets/bindSlider.js';
import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg3857,
    backgroundColor: null,
});

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20037508.342789244,
    20037508.342789244,
);

const colors = {
    'North America': '#b5a98f',
    'South America': '#adc78b',
    Asia: '#d4d496',
    Africa: '#db95a5',
    Oceania: '#c49856',
    Europe: '#ac96d4',
};

let colorMode = 'continent';
let lineWidth = 1;
let fillOpacity = 1;
let imageSize = 32;
let strokeOpacity = 1;

const getContinentColor = feature => {
    const properties = feature.getProperties();
    const continent = properties['continent'];

    return colors[continent];
};

const populationColorMap = makeColorRamp('bluered');

const getPopulationColor = feature => {
    const properties = feature.getProperties();
    const population = properties['pop_est'];

    const colorIndex = MathUtils.clamp(Math.log(population * 0.0001) * 20, 0, 255);

    return populationColorMap[Math.round(colorIndex)];
};

const gdpColorRamp = makeColorRamp('hot', false, true);

const getGdpColor = feature => {
    const properties = feature.getProperties();
    const gdp = properties['gdp_md'];

    const colorIndex = MathUtils.clamp(Math.log(gdp * 0.0001) * 30, 0, 255);

    return gdpColorRamp[Math.round(colorIndex)];
};

const countryStyle = feature => {
    const properties = feature.getProperties();

    let fillColor;
    let activeColor;

    switch (colorMode) {
        case 'continent':
            fillColor = getContinentColor(feature);
            activeColor = 'yellow';
            break;
        case 'population':
            fillColor = getPopulationColor(feature);
            activeColor = 'yellow';
            break;
        case 'gdp':
            fillColor = getGdpColor(feature);
            activeColor = 'cyan';
            break;
    }

    const hovered = properties.hovered ?? false;
    const clicked = properties.clicked ?? false;

    const fill = clicked ? activeColor : fillColor;

    return {
        fill: {
            color: fill,
            depthTest: false,
            renderOrder: 1,
            opacity: fillOpacity,
        },
        stroke: {
            opacity: strokeOpacity,
            color: clicked || hovered ? activeColor : 'black',
            renderOrder: 2, // To ensure lines are displayed on top of surfaces
            lineWidth: clicked ? lineWidth * 2 : lineWidth,
            depthTest: false,
        },
    };
};

const countries = new FeatureCollection({
    name: 'countries',
    source: new VectorSource({
        format: new GeoJSON(),
        url: 'https://3d.oslandia.com/giro3d/vectors/countries.geojson',
        strategy: tile(createXYZ({ tileSize: 512 })),
    }),
    extent,
    style: countryStyle,
    minLevel: 0,
    maxLevel: 0,
});

instance.add(countries);

const capitalStyle = feature => {
    const image = 'https://3d.oslandia.com/giro3d/images/capital.webp';
    const clicked = feature.get('clicked');
    const hovered = feature.get('hovered');

    return {
        point: {
            color: clicked ? 'yellow' : hovered ? 'orange' : 'white',
            pointSize: clicked ? imageSize * 1.5 : imageSize,
            image,
            renderOrder: clicked ? 4 : 3,
        },
    };
};

const capitals = new FeatureCollection({
    name: 'capitals',
    source: new VectorSource({
        format: new GeoJSON(),
        url: 'https://3d.oslandia.com/giro3d/vectors/capitals.geojson',
        strategy: tile(createXYZ({ tileSize: 512 })),
    }),
    extent,
    style: capitalStyle,
    minLevel: 0,
    maxLevel: 0,
});

instance.add(capitals);

instance.view.camera.position.set(0, 5500000, 50000000);
const lookAt = new Vector3(0, 5500000 + 1, 0);
instance.view.camera.lookAt(lookAt);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.4;
controls.target.copy(lookAt);
controls.saveState();
instance.view.setControls(controls);

// information on click
const resultTable = document.getElementById('results');

function truncate(value, length) {
    if (value == null) {
        return null;
    }

    const text = `${value}`;

    if (text.length < length) {
        return text;
    }

    return text.substring(0, length) + '…';
}

const filteredAttributes = ['country', 'city', 'continent', 'name', 'gdp_md', 'pop_est'];

const gdpFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

const popFormatter = new Intl.NumberFormat(undefined, {
    style: 'decimal',
});

function formatValue(attribute, value) {
    switch (attribute) {
        case 'gdp_md':
            return gdpFormatter.format(value);
        case 'pop_est':
            return popFormatter.format(value);
        default:
            return truncate(value, 18);
    }
}

function fillTable(objects) {
    resultTable.innerHTML = '';
    document.getElementById('attributes').style.display = objects.length > 0 ? 'block' : 'none';

    for (const obj of objects) {
        if (!obj.userData.feature) {
            continue;
        }
        const p = obj.userData.feature.getProperties();

        const entries = [];
        for (const [key, value] of Object.entries(p)) {
            if (filteredAttributes.includes(key)) {
                const entry = `<tr>
                <td title="${key}"><code>${truncate(key, 12)}</code></td>
                <td title="${value}">${formatValue(key, value) ?? '<code>null</code>'}</td>
                </tr>`;
                entries.push(entry);
            }
        }

        resultTable.innerHTML += `
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                ${entries.join('')}
            </tbody>
        </table>
    `;
    }
}

const previousHovered = [];
const previousClicked = [];
const objectsToUpdate = [];

function pick(e, click) {
    const pickedObjects = instance.pickObjectsAt(e, {
        where: [capitals, countries],
    });

    if (click) {
        previousClicked.forEach(obj => obj.userData.feature.set('clicked', false));
    } else {
        previousHovered.forEach(obj => obj.userData.feature.set('hovered', false));
    }

    const property = click ? 'clicked' : 'hovered';

    objectsToUpdate.length = 0;

    if (pickedObjects.length > 0) {
        const picked = pickedObjects[0];
        const obj = picked.object;
        const { feature } = obj.userData;

        feature.set(property, true);

        objectsToUpdate.push(obj);
    }

    if (click) {
        fillTable(objectsToUpdate);
    }

    // To avoid updating all the objects and lose a lot of performance,
    // we only update the objects that have changed.
    const updatedObjects = [...previousHovered, ...previousClicked, ...objectsToUpdate];
    if (click) {
        previousClicked.splice(0, previousClicked.length, ...objectsToUpdate);
    } else {
        previousHovered.splice(0, previousHovered.length, ...objectsToUpdate);
    }

    if (updatedObjects.length > 0) {
        countries.updateStyles(updatedObjects);
        capitals.updateStyles(updatedObjects);
    }
}

const hover = e => pick(e, false);
const click = e => pick(e, true);

instance.domElement.addEventListener('mousemove', hover);
instance.domElement.addEventListener('click', click);

for (const continent of Object.keys(colors)) {
    let timeout;
    const [setColor] = bindColorPicker(continent, c => {
        colors[continent] = c;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => countries.updateStyles(), 16);
    });
    setColor(colors[continent]);
}

const [setLineWidth] = bindSlider('line-width', v => {
    lineWidth = v;
    countries.updateStyles();
});

setLineWidth(lineWidth);

const [setStrokeOpacity] = bindSlider('stroke-opacity', v => {
    strokeOpacity = v;
    countries.updateStyles();
});

setStrokeOpacity(strokeOpacity);

const [setFillOpacity] = bindSlider('fill-opacity', v => {
    fillOpacity = v;
    countries.updateStyles();
});

setFillOpacity(fillOpacity);

const [setImageSize] = bindSlider('image-size', v => {
    imageSize = v;
    capitals.updateStyles();
});

setImageSize(imageSize);

bindDropDown('color-mode', mode => {
    colorMode = mode;
    countries.updateStyles();
    document.getElementById('colors').style.display = colorMode === 'continent' ? 'block' : 'none';
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/vector-source.md

Source Path: manuals/examples/vector-source.md

# Native Vector Data

## Официальный кейс
- Slug: `vector-source`
- Официальная страница: https://giro3d.org/latest/examples/vector-source.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/vector-source.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/vector-source.js`

## Краткое описание (official)
Drape vector data on a map.

## Теги (official)
- `map`
- `vector`
- `gpx`
- `geojson`
- `kml`
- `gml`

## Атрибуция (official)
© IGN©, Métropole Grand Lyon

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=vector-source npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/vector-source.html
```html
---
title: Native Vector Data
shortdesc: Drape vector data on a map.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>©, <a target="_blank" href="https://www.grandlyon.com/">Métropole Grand Lyon</a>
tags: [map, vector, gpx, geojson, kml, gml]
---

<div class="side-pane-with-status-bar" style="min-height: 9rem">
    <div class="card">
        <h5 class="card-header">Information</h5>

        <!-- tooltip -->
        <span
            class="badge bg-secondary position-absolute top-0 end-0 m-2"
            data-bs-toggle="popover"
            data-bs-content="pickingHelper"
            >?</span
        >
        <p class="card-text d-none" id="pickingHelper">
            Some informations embedded in the vector data
        </p>

        <div class="card-body">
            <!-- Result table -->
            <div id="results"></div>
        </div>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/vector-source.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import GML32 from 'ol/format/GML32.js';
import GPX from 'ol/format/GPX.js';
import KML from 'ol/format/KML.js';
import { XYZ } from 'ol/source.js';
import { Fill, RegularShape, Stroke, Style } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import MapboxTerrainFormat from '@giro3d/giro3d/formats/MapboxTerrainFormat.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import StatusBar from './widgets/StatusBar.js';

const epsg3946 = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
const epsg4171 = CoordinateSystem.register(
    'EPSG:4171',
    '+proj=longlat +ellps=GRS80 +no_defs +type=crs',
);

const extent = new Extent(epsg3946, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);

const instance = new Instance({
    target: 'view',
    crs: epsg3946,
});

const map = new Map({ extent });

instance.add(map);

const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

// Adds a XYZ elevation layer with MapBox terrain RGB tileset
const elevationLayer = new ElevationLayer({
    extent,
    resolutionFactor: 1 / 8,
    source: new TiledImageSource({
        format: new MapboxTerrainFormat(),
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${key}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});
map.addLayer(elevationLayer);

// Adds a XYZ color layer with MapBox satellite tileset
const satelliteLayer = new ColorLayer({
    extent,
    source: new TiledImageSource({
        source: new XYZ({
            url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=${key}`,
            projection: 'EPSG:3857',
            crossOrigin: 'anonymous',
        }),
    }),
});
map.addLayer(satelliteLayer);

// Adds our first layer from a GeoJSON file
// Initial source: https://data.grandlyon.com/jeux-de-donnees/parcs-places-jardins-indice-canopee-metropole-lyon/info
const geoJsonLayer = new ColorLayer({
    name: 'geojson',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/lyon/evg_esp_veg.evgparcindiccanope_latest.geojson',
            format: new GeoJSON(),
        },
        // Defines the dataProjection to reproject the data,
        // GeoJSON specifications say that the crs should be EPSG:4326 but
        // here we are using a different one.
        dataProjection: epsg4171,
        style: feature =>
            new Style({
                fill: new Fill({
                    color: `rgba(0, 128, 0, ${feature.get('indiccanop')})`,
                }),
                stroke: new Stroke({
                    color: 'white',
                }),
            }),
    }),
});
map.addLayer(geoJsonLayer);

// Adds a second vector layer from a GPX file
const gpxLayer = new ColorLayer({
    name: 'gpx',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/lyon/track.gpx',
            format: new GPX(),
        },
        // Defines the dataProjection to reproject the data,
        // KML and GPX specifications say that the crs is EPSG:4326.
        dataProjection: CoordinateSystem.epsg4326,
        style: new Style({
            stroke: new Stroke({
                color: '#FA8C22',
                width: 2,
            }),
        }),
    }),
});
map.addLayer(gpxLayer);

// Adds a third source from a KML file
// Initial source: https://data.grandlyon.com/jeux-de-donnees/lignes-metro-funiculaire-reseau-transports-commun-lyonnais-v2/info
// Edited for convering to KML+adding proper colors
const kmlLayer = new ColorLayer({
    name: 'kml',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/lyon/tcl_sytral.tcllignemf_2_0_0.kml',
            format: new KML(),
        },
        dataProjection: epsg3946,
        // With KML format, there is not necessary to specify style rules,
        // there are already present in the file.
    }),
});
map.addLayer(kmlLayer);

// Adds our fourth layer from a GML file
// Initial source: https://data.grandlyon.com/jeux-de-donnees/bornes-fontaine-metropole-lyon/info
// Edited for having a simple GML FeatureCollection
const gmlLayer = new ColorLayer({
    name: 'gml',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/lyon/adr_voie_lieu.adrbornefontaine_latest.gml',
            format: new GML32(),
        },
        dataProjection: epsg4171,
        style: (feature, resolution) => {
            const meters = 1 / resolution; // Assuming pixel ratio is 1
            // We want to display a 5*5m square, except
            // for when we're too far away, use a 2*2px square
            const size = Math.max(5 * meters, 2);
            return new Style({
                image: new RegularShape({
                    radius: size,
                    points: 4,
                    stroke: new Stroke({
                        width: 1,
                        color: [255, 255, 255, 1],
                    }),
                    fill: new Fill({
                        color: [0, 0, 128, 1],
                    }),
                }),
            });
        },
    }),
});
map.addLayer(gmlLayer);

instance.view.camera.position.set(extent.minX, extent.minY, 2000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

const resultTable = document.getElementById('results');
instance.domElement.addEventListener('mousemove', e => {
    const pickResults = instance.pickObjectsAt(e, {
        radius: 5,
        limit: 1,
        pickFeatures: true,
        sortByDistance: true,
    });

    const pickedObject = pickResults[0];

    resultTable.innerHTML = '';

    if (pickedObject?.features && pickedObject.features.length > 0) {
        // @ts-expect-error untyped
        for (const { layer, feature } of pickedObject.features) {
            const layerName = layer.name;
            const featureName = feature.get('nom') ?? feature.get('name') ?? feature.get('gid');
            resultTable.innerHTML += `${layerName}: ${featureName}<br>`;
        }
    }
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/vector-tile-layer.md

Source Path: manuals/examples/vector-tile-layer.md

# Vector Tiles With OpenLayers

## Официальный кейс
- Slug: `vector-tile-layer`
- Официальная страница: https://giro3d.org/latest/examples/vector-tile-layer.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/vector-tile-layer.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/vector-tile-layer.js`

## Краткое описание (official)
Display Vector Tiles on a Map using OpenLayers.

## Теги (official)
- `map`
- `vector tiles`
- `mapbox`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=vector-tile-layer npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/vector-tile-layer.html
```html
---
title: Vector Tiles With OpenLayers
shortdesc: Display Vector Tiles on a Map using OpenLayers.
attribution: © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>
tags: [map, 'vector tiles', mapbox]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/vector-tile-layer.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import VectorTileSource from '@giro3d/giro3d/sources/VectorTileSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(
    CoordinateSystem.epsg3857,
    -20037508.342789244,
    20037508.342789244,
    -20048966.1,
    20048966.1,
);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 'white',
});

const map = new Map({ extent, maxSubdivisionLevel: 15 });
instance.add(map);

instance.view.camera.position.set(0, 0, 10000000);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

instance.view.setControls(controls);

// Adds a color layer from a VectorTile source
const key =
    'pk.eyJ1IjoiZ2lybzNkIiwiYSI6ImNtZ3Q0NDNlNTAwY2oybHI3Ym1kcW03YmoifQ.Zl7_KZiAhqWSPjlkKDKYnQ';

const vectorTileSource = new VectorTileSource({
    url: `${
        'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' +
        '{z}/{x}/{y}.vector.pbf?access_token='
    }${key}`,
    style: createMapboxStreetsV6Style(),
    backgroundColor: 'hsl(47, 26%, 88%)',
});

function createMapboxStreetsV6Style() {
    const fill = new Fill({ color: '' });
    const stroke = new Stroke({ color: '', width: 1 });
    const polygon = new Style({ fill });
    const strokedPolygon = new Style({ fill, stroke });
    const line = new Style({ stroke });
    const text = new Style({
        text: new Text({
            text: '',
            fill,
            stroke,
        }),
    });
    const iconCache = {};
    function getIcon(iconName) {
        let icon = iconCache[iconName];
        if (!icon) {
            icon = new Style({
                image: new Icon({
                    src: `https://cdn.rawgit.com/mapbox/maki/master/icons/${iconName}-15.svg`,
                    size: [15, 15],
                    crossOrigin: 'anonymous',
                }),
            });
            iconCache[iconName] = icon;
        }
        return icon;
    }
    const styles = [];

    return (feature, resolution) => {
        let length = 0;
        const layer = feature.get('layer');
        const cls = feature.get('class');
        const type = feature.get('type');
        const scalerank = feature.get('scalerank');
        const labelrank = feature.get('labelrank');
        const adminLevel = feature.get('admin_level');
        const maritime = feature.get('maritime');
        const disputed = feature.get('disputed');
        const maki = feature.get('maki');
        const geom = feature.getGeometry().getType();
        if (layer === 'landuse' && cls === 'park') {
            fill.setColor('#d8e8c8');
            styles[length++] = polygon;
        } else if (layer === 'landuse' && cls === 'cemetery') {
            fill.setColor('#e0e4dd');
            styles[length++] = polygon;
        } else if (layer === 'landuse' && cls === 'hospital') {
            fill.setColor('#fde');
            styles[length++] = polygon;
        } else if (layer === 'landuse' && cls === 'school') {
            fill.setColor('#f0e8f8');
            styles[length++] = polygon;
        } else if (layer === 'landuse' && cls === 'wood') {
            fill.setColor('rgb(233,238,223)');
            styles[length++] = polygon;
        } else if (layer === 'waterway' && cls !== 'river' && cls !== 'stream' && cls !== 'canal') {
            stroke.setColor('#a0c8f0');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'waterway' && cls === 'river') {
            stroke.setColor('#a0c8f0');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'waterway' && (cls === 'stream' || cls === 'canal')) {
            stroke.setColor('#a0c8f0');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'water') {
            fill.setColor('#a0c8f0');
            styles[length++] = polygon;
        } else if (layer === 'aeroway' && geom === 'Polygon') {
            fill.setColor('rgb(242,239,235)');
            styles[length++] = polygon;
        } else if (
            layer === 'aeroway' &&
            geom === 'LineString' &&
            resolution <= 76.43702828517625
        ) {
            stroke.setColor('#f0ede9');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'building') {
            fill.setColor('#f2eae2');
            stroke.setColor('#dfdbd7');
            stroke.setWidth(1);
            styles[length++] = strokedPolygon;
        } else if (layer === 'tunnel' && cls === 'motorway_link') {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'tunnel' && cls === 'service') {
            stroke.setColor('#cfcdca');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'tunnel' && (cls === 'street' || cls === 'street_limited')) {
            stroke.setColor('#cfcdca');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'tunnel' && cls === 'main' && resolution <= 1222.99245256282) {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'tunnel' && cls === 'motorway') {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'tunnel' && cls === 'path') {
            stroke.setColor('#cba');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'tunnel' && cls === 'major_rail') {
            stroke.setColor('#bbb');
            stroke.setWidth(2);
            styles[length++] = line;
        } else if (layer === 'road' && cls === 'motorway_link') {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (
            layer === 'road' &&
            (cls === 'street' || cls === 'street_limited') &&
            geom === 'LineString'
        ) {
            stroke.setColor('#cfcdca');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'road' && cls === 'main' && resolution <= 1222.99245256282) {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'road' && cls === 'motorway' && resolution <= 4891.96981025128) {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'road' && cls === 'path') {
            stroke.setColor('#cba');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'road' && cls === 'major_rail') {
            stroke.setColor('#bbb');
            stroke.setWidth(2);
            styles[length++] = line;
        } else if (layer === 'bridge' && cls === 'motorway_link') {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'bridge' && cls === 'motorway') {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'bridge' && cls === 'service') {
            stroke.setColor('#cfcdca');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'bridge' && (cls === 'street' || cls === 'street_limited')) {
            stroke.setColor('#cfcdca');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'bridge' && cls === 'main' && resolution <= 1222.99245256282) {
            stroke.setColor('#e9ac77');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'bridge' && cls === 'path') {
            stroke.setColor('#cba');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'bridge' && cls === 'major_rail') {
            stroke.setColor('#bbb');
            stroke.setWidth(2);
            styles[length++] = line;
        } else if (layer === 'admin' && adminLevel >= 3 && maritime === 0) {
            stroke.setColor('#9e9cab');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'admin' && adminLevel === 2 && disputed === 0 && maritime === 0) {
            stroke.setColor('#9e9cab');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'admin' && adminLevel === 2 && disputed === 1 && maritime === 0) {
            stroke.setColor('#9e9cab');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'admin' && adminLevel >= 3 && maritime === 1) {
            stroke.setColor('#a0c8f0');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'admin' && adminLevel === 2 && maritime === 1) {
            stroke.setColor('#a0c8f0');
            stroke.setWidth(1);
            styles[length++] = line;
        } else if (layer === 'country_label' && scalerank === 1) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#334');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(2);
            styles[length++] = text;
        } else if (
            layer === 'country_label' &&
            scalerank === 2 &&
            resolution <= 19567.87924100512
        ) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('bold 10px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#334');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(2);
            styles[length++] = text;
        } else if (layer === 'country_label' && scalerank === 3 && resolution <= 9783.93962050256) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('bold 9px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#334');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(2);
            styles[length++] = text;
        } else if (layer === 'country_label' && scalerank === 4 && resolution <= 4891.96981025128) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('bold 8px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#334');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(2);
            styles[length++] = text;
        } else if (layer === 'marine_label' && labelrank === 1 && geom === 'Point') {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('italic 11px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#74aee9');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (layer === 'marine_label' && labelrank === 2 && geom === 'Point') {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('italic 11px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#74aee9');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (layer === 'marine_label' && labelrank === 3 && geom === 'Point') {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('italic 10px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#74aee9');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (layer === 'marine_label' && labelrank === 4 && geom === 'Point') {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('italic 9px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#74aee9');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (layer === 'place_label' && type === 'city' && resolution <= 1222.99245256282) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('11px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#333');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (layer === 'place_label' && type === 'town' && resolution <= 305.748113140705) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('9px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#333');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (
            layer === 'place_label' &&
            type === 'village' &&
            resolution <= 38.21851414258813
        ) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('8px "Open Sans", "Arial Unicode MS"');
            fill.setColor('#333');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (
            layer === 'place_label' &&
            resolution <= 19.109257071294063 &&
            (type === 'hamlet' || type === 'suburb' || type === 'neighbourhood')
        ) {
            text.getText().setText(feature.get('name_en'));
            text.getText().setFont('bold 9px "Arial Narrow"');
            fill.setColor('#633');
            stroke.setColor('rgba(255,255,255,0.8)');
            stroke.setWidth(1);
            styles[length++] = text;
        } else if (
            layer === 'poi_label' &&
            resolution <= 19.109257071294063 &&
            scalerank === 1 &&
            maki !== 'marker'
        ) {
            styles[length++] = getIcon(maki);
        } else if (
            layer === 'poi_label' &&
            resolution <= 9.554628535647032 &&
            scalerank === 2 &&
            maki !== 'marker'
        ) {
            styles[length++] = getIcon(maki);
        } else if (
            layer === 'poi_label' &&
            resolution <= 4.777314267823516 &&
            scalerank === 3 &&
            maki !== 'marker'
        ) {
            styles[length++] = getIcon(maki);
        } else if (
            layer === 'poi_label' &&
            resolution <= 2.388657133911758 &&
            scalerank === 4 &&
            maki !== 'marker'
        ) {
            styles[length++] = getIcon(maki);
        } else if (
            layer === 'poi_label' &&
            resolution <= 1.194328566955879 &&
            scalerank >= 5 &&
            maki !== 'marker'
        ) {
            styles[length++] = getIcon(maki);
        }
        styles.length = length;
        return styles;
    };
}

const vectorTileLayer = new ColorLayer({
    name: 'osm',
    extent,
    source: vectorTileSource,
});

map.addLayer(vectorTileLayer);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/video-source.md

Source Path: manuals/examples/video-source.md

# Video source

## Официальный кейс
- Slug: `video-source`
- Официальная страница: https://giro3d.org/latest/examples/video-source.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/video-source.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/video-source.js`

## Краткое описание (official)
Display a video on a Map with a <code>VideoSource</code>.

## Расширенное описание (official longdesc)
The `VideoSource` can display a video at an arbitrary extent. You can either pass a URL to the remote video, or provide a VideoTexture or an HTMLVideoElement to display.

## Теги (official)
- `map`
- `layer`
- `source`
- `video`

## Атрибуция (official)
© NOAA.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=video-source npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/video-source.html
```html
---
title: Video source
shortdesc: Display a video on a Map with a <code>VideoSource</code>.
longdesc: The <a target="_blank" href="../apidoc/classes/sources.VideoSource.html"><code>VideoSource</code></a> can display a video at an arbitrary extent. You can either pass a URL to the remote video, or provide a VideoTexture or an HTMLVideoElement to display.
attribution: © <a target="_blank" href="https://psl.noaa.gov">NOAA</a>.
tags: [map, layer, source, video]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/video-source.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { Stroke, Style } from 'ol/style.js';
import { Vector3 } from 'three';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Globe from '@giro3d/giro3d/entities/Globe.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';
import VideoSource from '@giro3d/giro3d/sources/VideoSource.js';

import { makeColorRamp } from './widgets/makeColorRamp.js';
import StatusBar from './widgets/StatusBar.js';

const instance = new Instance({
    target: 'view',
    crs: CoordinateSystem.epsg4978,
    backgroundColor: 0x0a3b59,
});

const globe = new Globe({});

instance.add(globe);

const source = new VideoSource({
    extent: new Extent(CoordinateSystem.epsg4326, {
        west: -180,
        east: +180,
        south: -90,
        north: +90,
    }),
    source: 'https://3d.oslandia.com/giro3d/videos/humidity.webm',
});

const video = new ColorLayer({
    name: 'video',
    source,
    colorMap: new ColorMap({
        colors: makeColorRamp('jet', false, true),
        min: 0,
        max: 1,
    }),
});

source.addEventListener('loaded', () => {
    source.video.loop = true;
    source.video.play();
});

globe.addLayer(video).catch(console.error);

const outlineStyle = new Style({
    stroke: new Stroke({ color: 'black', width: 2 }),
});

// Display the countries boundaries.
const boundaries = new ColorLayer({
    name: 'boundaries',
    source: new VectorSource({
        data: {
            url: 'https://3d.oslandia.com/giro3d/vectors/countries.geojson',
            format: new GeoJSON(),
        },
        style: outlineStyle,
        dataProjection: CoordinateSystem.epsg4326,
    }),
});

globe.addLayer(boundaries).catch(console.error);

const position = globe.ellipsoid.toCartesian(0, 0, 25_000_000);
instance.view.camera.position.copy(position);
instance.view.camera.lookAt(new Vector3(0, 0, 0));

Inspector.attach('inspector', instance);
StatusBar.bind(instance);
```

---

## Source: manuals/examples/wfs-mesh.md

Source Path: manuals/examples/wfs-mesh.md

# WFS as 3D meshes

## Официальный кейс
- Slug: `wfs-mesh`
- Официальная страница: https://giro3d.org/latest/examples/wfs-mesh.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/wfs-mesh.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/wfs-mesh.js`

## Краткое описание (official)
Display features from a WFS source as 3D meshes

## Теги (official)
- `vector`
- `wfs`
- `mesh`

## Атрибуция (official)
© Métropole Grand Lyon, IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=wfs-mesh npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/wfs-mesh.html
```html
---
title: WFS as 3D meshes
shortdesc: Display features from a WFS source as 3D meshes
attribution: © <a target="_blank" href="https://www.grandlyon.com/">Métropole Grand Lyon</a>, <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [vector, wfs, mesh]
---

<div class="m-2 position-absolute top-0 end-0">
    <div class="card m-1">
        <div class="card-header">Options</div>

        <fieldset class="container m-1">
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="showMap"
                />
                <label class="form-check-label" for="showMap">Map</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="showBusLines"
                />
                <label class="form-check-label" for="showBusLines">Bus lines</label>
            </div>

            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    role="switch"
                    id="showBusStops"
                />
                <label class="form-check-label" for="showBusStops">Bus stops</label>
            </div>
        </fieldset>
    </div>
</div>
```

#### Inlined: manuals/reference_info/giro3d/examples/wfs-mesh.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import GeoJSON from 'ol/format/GeoJSON.js';
import { tile } from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import { createXYZ } from 'ol/tilegrid.js';
import { Color, CubeTextureLoader } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { MathUtils } from 'three/src/math/MathUtils.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import FeatureCollection from '@giro3d/giro3d/entities/FeatureCollection.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import { bindToggle } from './widgets/bindToggle.js';
import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const extent = Extent.fromCenterAndSize(crs, { x: 1842741, y: 5174060 }, 30000, 30000);

const instance = new Instance({
    target: 'view',
    crs,
});

const map = new Map({ extent });

instance.add(map);

const capabilitiesUrl =
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';

WmtsSource.fromCapabilities(capabilitiesUrl, {
    layer: 'HR.ORTHOIMAGERY.ORTHOPHOTOS',
})
    .then(orthophotoWmts => {
        map.addLayer(
            new ColorLayer({
                name: 'wmts_orthophotos',
                extent: map.extent,
                source: orthophotoWmts,
            }),
        );
    })
    .catch(console.error);

// define the source of our data
const busLinesSource = new VectorSource({
    format: new GeoJSON(),
    url: function url(tileExtent) {
        return `${
            'https://download.data.grandlyon.com/wfs/rdata' +
            '?SERVICE=WFS' +
            '&VERSION=2.0.0' +
            '&request=GetFeature' +
            '&typename=tcl_sytral.tcllignebus_2_0_0' +
            '&outputFormat=application/json;%20subtype=geojson' +
            '&SRSNAME=EPSG:3946' +
            '&startIndex=0' +
            '&bbox='
        }${tileExtent.join(',')},EPSG:3946`;
    },
    strategy: tile(createXYZ({ tileSize: 512 })),
});

function randColor() {
    const hue = MathUtils.randFloat(0, 1);
    return new Color().setHSL(hue, 0.8, 0.5, 'srgb');
}

function makeStyle() {
    return { color: randColor(), width: 8, renderOrder: MathUtils.randInt(0, 200) };
}

const lineStyles = {};

// Create the `FeatureCollection` entity that will load our features as meshes.
const busLines = new FeatureCollection({
    name: 'bus lines',
    source: busLinesSource,
    extent,
    minLevel: 0,
    maxLevel: 0,
    elevation: 50,
    // we can modify the mesh through the `style` property
    style: feat => {
        const lineName = feat.getProperties().ligne;
        const selected = feat.get('selected');
        // color according to line name
        if (!lineStyles[lineName]) {
            lineStyles[lineName] = makeStyle();
        }
        const { color, width, renderOrder } = lineStyles[lineName];
        let lineWidth = width ?? 20;
        let lineColor = color ?? new Color('white');

        if (selected) {
            lineWidth *= 1.5;
            lineColor = 'red';
        }

        return {
            stroke: {
                color: lineColor,
                lineWidth,
                lineWidthUnits: 'world',
                depthTest: false,
                renderOrder: selected ? 2000 : renderOrder,
            },
        };
    },
});

// Let's add our bus lines feature collection to the scene
instance.add(busLines);

// define another source
const busStopSource = new VectorSource({
    format: new GeoJSON(),
    url: function url(tileExtent) {
        return `${
            'https://download.data.grandlyon.com/wfs/rdata' +
            '?SERVICE=WFS' +
            '&VERSION=2.0.0' +
            '&request=GetFeature' +
            '&typename=tcl_sytral.tclarret' +
            '&outputFormat=application/json; subtype=geojson' +
            '&SRSNAME=EPSG:3946' +
            '&bbox='
        }${tileExtent.join(',')},EPSG:3946`;
    },
    strategy: tile(createXYZ({ tileSize: 512 })),
});
// Create the `FeatureCollection` entity that will load our features as meshes.
const busStops = new FeatureCollection({
    name: 'bus stops',
    source: busStopSource,
    extent,
    minLevel: 0,
    maxLevel: 0,
    elevation: 50,
    style: feat => {
        const selected = feat.get('selected');
        const image = 'https://3d.oslandia.com/giro3d/images/bus-front.png';

        return {
            point: {
                color: 'white',
                pointSize: selected ? 40 : 20,
                image,
                renderOrder: selected ? 3000 : 2500,
            },
        };
    },
});
instance.add(busStops);

// add a skybox background, just to look nicer :-)
const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('image/skyboxsun25deg_zup/');
const cubeTexture = cubeTextureLoader.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
]);
instance.scene.background = cubeTexture;

const center = extent.centerAsVector3();

instance.view.camera.position.set(center.x - 300, center.y - 300, 5000);
instance.view.camera.lookAt(center);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
instance.view.setControls(controls);

const labelElement = document.createElement('div');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';

const text = document.createElement('span');
text.style.marginLeft = '0.5rem';

const busStopSymbol = document.createElement('i');
busStopSymbol.classList.add('bi', 'bi-geo-alt-fill');

const busLineSymbol = document.createElement('i');
busLineSymbol.classList.add('bi', 'bi-bus-front-fill');

labelElement.appendChild(text);

const label = new CSS2DObject(labelElement);

label.visible = false;
instance.add(label);

let previousObjects = [];
const objectsToUpdate = [];

function pick(e) {
    previousObjects.forEach(obj => obj.userData.feature.set('selected', false));

    const pickResults = instance.pickObjectsAt(e, {
        sortByDistance: true,
        where: [busStops, busLines],
    });

    const found = pickResults[0];

    if (found) {
        const obj = found.object;
        const feature = obj.userData.feature;
        if (feature) {
            feature.set('selected', true);
            objectsToUpdate.push(obj);
        }
        if (found.entity === busStops) {
            text.innerText = `Bus stop "${feature.get('nom')}"`;
            labelElement.insertBefore(busStopSymbol, text);
            busLineSymbol.remove();
        } else if (found.entity === busLines) {
            text.innerText = `Bus line ${feature.get('ligne')}`;
            labelElement.insertBefore(busLineSymbol, text);
            busStopSymbol.remove();
        }

        // Virtually any inner markup is supported, here we're just inserting text
        label.name = text.innerText;
        // take the middle vertex as position
        label.position.set(found.point.x, found.point.y, found.point.z);
        label.updateMatrixWorld();
        label.visible = true;
        instance.notifyChange(label);
    } else {
        label.visible = false;
        instance.notifyChange(label);
    }

    busLines.updateStyles();
    busStops.updateStyles();
    previousObjects = [...objectsToUpdate];
    objectsToUpdate.length = 0;
}

instance.domElement.addEventListener('mousemove', pick);

bindToggle('showBusStops', v => {
    busStops.visible = v;
    instance.notifyChange();
});
bindToggle('showBusLines', v => {
    busLines.visible = v;
    instance.notifyChange();
});
bindToggle('showMap', v => {
    map.visible = v;
    instance.notifyChange();
});

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/wfs.md

Source Path: manuals/examples/wfs.md

# Draped WFS

## Официальный кейс
- Slug: `wfs`
- Официальная страница: https://giro3d.org/latest/examples/wfs.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/wfs.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/wfs.js`

## Краткое описание (official)
Display a WFS layer on a Map.

## Теги (official)
- `map`
- `vector`
- `wfs`
- `draped`

## Атрибуция (official)
© Métropole Grand Lyon, IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=wfs npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/wfs.html
```html
---
title: Draped WFS
shortdesc: Display a WFS layer on a Map.
attribution: © <a target="_blank" href="https://www.grandlyon.com/">Métropole Grand Lyon</a>, <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, vector, wfs, draped]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/wfs.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { getUid } from 'ol';
import { GeoJSON } from 'ol/format.js';
import TileWMS from 'ol/source/TileWMS.js';
import { Stroke, Style } from 'ol/style.js';
import { MathUtils, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import Coordinates from '@giro3d/giro3d/core/geographic/Coordinates';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

import StatusBar from './widgets/StatusBar.js';

const crs = CoordinateSystem.register(
    'EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const extent = new Extent(crs, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

const map = new Map({ extent });
instance.add(map);

// Adds a WMS imagery layer
const colorSource = new TiledImageSource({
    source: new TileWMS({
        url: 'https://data.geopf.fr/wms-r',
        projection: 'EPSG:3946',
        params: {
            LAYERS: ['ORTHOIMAGERY.ORTHOPHOTOS'],
            FORMAT: 'image/jpeg',
        },
    }),
});

const colorLayer = new ColorLayer({
    name: 'orthoimagery',
    extent,
    source: colorSource,
});
map.addLayer(colorLayer);

const featureColors = new window.Map();

function getColor(id) {
    if (featureColors.has(id)) {
        return featureColors.get(id);
    }
    const hue = MathUtils.randFloat(30, 340);
    const color = `hsl(${hue}, 70%, 50%)`;

    featureColors.set(id, color);
    return color;
}

const style = feature => {
    const id = getUid(feature);
    const highlight = feature.get('highlight');
    const width = highlight ? 10 : 6;
    const color = getColor(id);
    return [
        new Style({
            zIndex: highlight ? 10 : 0,
            stroke: new Stroke({
                color: 'white',
                width,
            }),
        }),
        new Style({
            zIndex: highlight ? 10 : 0,
            stroke: new Stroke({
                color,
                width: width - 2,
            }),
        }),
    ];
};

// Adds a WFS imagery layer
const wfsSource = new VectorSource({
    dataProjection: crs,
    data: {
        url:
            'https://download.data.grandlyon.com/wfs/rdata' +
            '?SERVICE=WFS' +
            '&VERSION=2.0.0' +
            '&request=GetFeature' +
            '&typename=tcl_sytral.tcllignebus_2_0_0' +
            '&outputFormat=application/json;%20subtype=geojson' +
            '&SRSNAME=EPSG:3946' +
            '&startIndex=0',
        format: new GeoJSON(),
    },
    style,
});

const wfsLayer = new ColorLayer({
    name: 'lyon_tcl_bus',
    extent,
    source: wfsSource,
});

map.addLayer(wfsLayer);

instance.view.camera.position.set(1839739, 5171618, 910);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = new Vector3(1840839, 5172718, 0);
controls.saveState();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
instance.view.setControls(controls);

const labelElement = document.createElement('div');
labelElement.classList.value = 'badge rounded-pill text-bg-light';
labelElement.style.marginTop = '2rem';

const lineName = document.createElement('span');
lineName.style.marginLeft = '0.5rem';

const lineNumber = document.createElement('span');
lineNumber.classList.value = 'badge rounded-pill';
lineNumber.style.color = 'white';
lineNumber.style.background = 'red';
lineNumber.innerText = '32';

labelElement.appendChild(lineNumber);
labelElement.appendChild(lineName);

const label = new CSS2DObject(labelElement);

label.visible = false;
instance.add(label);

let previousFeature;

function pickFeatures(mouseEvent) {
    const pickResult = instance.pickObjectsAt(mouseEvent);

    const picked = pickResult[0];

    function resetPickedFeatures() {
        if (previousFeature) {
            previousFeature.set('highlight', false);
            wfsSource.updateFeature(previousFeature);
        }
        if (label.visible) {
            label.visible = false;
        }
        previousFeature = null;
    }

    if (picked) {
        const { x, y } = picked.point;
        const coordinates = new Coordinates(instance.coordinateSystem, x, y);
        const features = wfsLayer.getVectorFeaturesAtCoordinate(coordinates, {
            radius: 3,
            xTileRes: 2,
            yTileRes: 2,
        });

        if (features.length > 0) {
            const firstFeature = features[features.length - 1];

            previousFeature?.set('highlight', false);
            firstFeature.set('highlight', true);

            if (previousFeature !== firstFeature) {
                wfsSource.updateFeature(previousFeature, firstFeature);
                previousFeature = firstFeature;
            }

            label.position.set(x, y, 0);
            label.visible = true;
            lineNumber.style.background = getColor(getUid(firstFeature));
            lineNumber.innerText = firstFeature.get('ligne');
            lineName.innerText = firstFeature.get('nom_trace');
            label.updateMatrixWorld(true);
        } else {
            resetPickedFeatures();
        }
    } else {
        resetPickedFeatures();
    }
}

instance.domElement.addEventListener('mousemove', pickFeatures);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```

---

## Source: manuals/examples/wmts.md

Source Path: manuals/examples/wmts.md

# WMTS layer

## Официальный кейс
- Slug: `wmts`
- Официальная страница: https://giro3d.org/latest/examples/wmts.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/wmts.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/wmts.js`

## Краткое описание (official)
Display a WMTS layer on a Map.

## Теги (official)
- `map`
- `layer`
- `wmts`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=wmts npm run start`.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d/examples/wmts.html
```html
---
title: WMTS layer
shortdesc: Display a WMTS layer on a Map.
attribution: © <a target="_blank" href="https://ign.fr/">IGN</a>
tags: [map, layer, wmts]
---
```

#### Inlined: manuals/reference_info/giro3d/examples/wmts.js
```js
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import Inspector from '@giro3d/giro3d/gui/Inspector.js';
import WmtsSource from '@giro3d/giro3d/sources/WmtsSource.js';

import StatusBar from './widgets/StatusBar.js';

const extent = new Extent(CoordinateSystem.epsg3857, -551152, 876637, 5178404, 6631315);

const instance = new Instance({
    target: 'view',
    crs: extent.crs,
    backgroundColor: 0x0a3b59,
});

const map = new Map({ extent });

instance.add(map);

// For convenience, we use the fromCapabilities() async method to construct a WmtsSource from
// a WMTS capabilities document.
WmtsSource.fromCapabilities(
    'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities',
    {
        layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
        matrixSet: 'PM',
    },
)
    .then(source => {
        map.addLayer(new ColorLayer({ name: 'wmts', source }));
    })
    .catch(e => console.error(e));

const center = extent.centerAsVector2();
instance.view.camera.position.set(center.x, center.y - 1, 3_000_000);

const controls = new MapControls(instance.view.camera, instance.domElement);

controls.target.set(center.x, center.y, 0);

instance.view.setControls(controls);

Inspector.attach('inspector', instance);

StatusBar.bind(instance);
```
