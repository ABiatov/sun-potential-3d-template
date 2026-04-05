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
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

const crs = CoordinateSystem.register(
  'EPSG:3946',
  '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const instance = new Instance({
  target: 'view',
  crs,
});

const extent = new Extent(
  crs,
  1837816.94334,
  1847692.32501,
  5170036.4587,
  5178412.82698,
);

const map = new Map({ extent });
instance.add(map);

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
  name: 'satellite',
  source: colorSource,
  extent: map.extent,
});

map.addLayer(colorLayer);

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
  name: 'dem',
  source: elevationSource,
  extent: map.extent,
  resolutionFactor: 1 / 8,
});

map.addLayer(elevationLayer);

const controls = new MapControls(instance.view.camera, instance.domElement);
controls.target = extent.centerAsVector3();
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.maxPolarAngle = Math.PI / 2.3;
controls.saveState();

const cameraAltitude = 2000;
const cameraPosition = new Vector3(extent.minX, extent.minY, cameraAltitude);
instance.view.camera.position.copy(cameraPosition);

instance.view.setControls(controls);
