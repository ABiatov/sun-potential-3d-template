Source Path: manuals/getting-started.md

# Getting Started (минимальное Giro3D-приложение)

Источник: официальный tutorial и API-документация Giro3D.

## Базовый минимум
1. Зарегистрировать CRS (если нужен не built-in CRS).
2. Создать `Instance` с `target` и CRS.
3. Создать `Extent` и `Map`, затем добавить `Map` в `Instance`.
4. Добавить хотя бы один `ColorLayer` (опционально `ElevationLayer`).
5. Подключить controls через `instance.view.setControls(...)`.

## Минимальный пример кода
```js
import TileWMS from 'ol/source/TileWMS.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';

const crs = CoordinateSystem.register(
  'EPSG:3946',
  '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

const instance = new Instance({ target: 'view', crs });
const extent = new Extent(crs, 1837816.94334, 1847692.32501, 5170036.4587, 5178412.82698);
const map = new Map({ extent });
instance.add(map);

const source = new TiledImageSource({
  source: new TileWMS({
    url: 'https://data.geopf.fr/wms-r',
    projection: 'EPSG:3946',
    params: { LAYERS: ['ORTHOIMAGERY.ORTHOPHOTOS'], FORMAT: 'image/jpeg' },
  }),
});

const colorLayer = new ColorLayer({ name: 'satellite', source, extent: map.extent });
map.addLayer(colorLayer);
```

## Официальные первоисточники
- `manuals/reference_info/giro3d-website/dist/latest/tutorials/getting-started.html`
- `manuals/reference_info/giro3d/examples/getting-started.js`
- `manuals/reference_info/giro3d/apidoc/README.md`
