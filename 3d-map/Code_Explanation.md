# Code Explanation: приложение `3d-map`

## 1. Назначение

`3d-map` это локальное веб-приложение на `Vite`, которое строит интерактивную 3D-карту на базе `Giro3D`, `Three.js` и `MapLibre GL`. Главная идея приложения: почти все параметры карты и слоёв задаются в `map_layers.json`, а `main.js` интерпретирует этот конфиг и собирает сцену.

В текущем состоянии приложение умеет:

- показывать terrain из GeoTIFF;
- накладывать цветовые COG-слои и RGB-ортофото;
- применять GeoJSON-маску;
- включать и выключать hillshading;
- переключать terrain deformation;
- измерять расстояние, площадь, высоту и угол;
- по клику считывать значение из активных queryable COG-слоёв;
- показывать mini-map;
- подключать COPC point cloud, если такой слой есть в конфиге.

## 2. Структура файлов

- `index.html` задаёт контейнер карты `#view`, popup для клика по карте, панель слоёв, блок измерений, кнопки навигации и контейнер mini-map.
- `main.js` содержит почти всю прикладную логику.
- `style.css` оформляет popup, панель управления, палитры слоёв, mini-map и кнопки измерения.
- `map_layers.json` хранит CRS, стартовый вид, terrain, маску, hillshading и набор слоёв.
- `map_layers.schema.json` описывает ожидаемую структуру JSON, но в рантайме схема сейчас не валидируется.
- `data/` содержит локальные GeoTIFF, mask GeoJSON и point cloud.
- `assets/wasm/laz-perf.wasm` нужен для загрузки LAZ/COPC через Giro3D.

## 3. Зависимости и роли библиотек

По `package.json` приложение использует:

- `@giro3d/giro3d` как основу 3D GIS-сцены, карт, слоёв, маски, измерений и point cloud.
- `three` для математики, камеры и `MapControls`.
- `proj4` для преобразования координат между CRS.
- `geotiff` для прямого чтения пикселей из COG при клике.
- `maplibre-gl` для mini-map на OSM-подложке.
- `vite` как dev/build tool.

Ключевая идея архитектуры: рендер основной карты идёт через Giro3D, а mini-map и прямое чтение пикселей решают отдельные задачи и не завязаны на тайловый рендер Giro3D.

## 4. Основной сценарий инициализации

### 4.1 Загрузка конфига

`loadConfig()` в `main.js:801-807` делает `fetch('./map_layers.json')` и прерывает инициализацию, если файл не загрузился.

### 4.2 Регистрация CRS и вычисление extent

В `bootstrap()` (`main.js:994-1012`) код:

1. берёт `map.crs` и `map.proj4` из конфига;
2. регистрирует проекцию через `proj4.defs(...)`;
3. регистрирует CRS внутри Giro3D через `CoordinateSystem.register(...)`;
4. переводит `map.center` из `center_crs` в рабочую CRS;
5. строит `Extent` по `extent_size`.

Для текущего конфига карта работает в `EPSG:3763`, а стартовый центр задаётся в `EPSG:4326`.

### 4.3 Создание `Instance` и двух overlay map

После подготовки extent код создаёт один `Instance` (`main.js:1014-1018`) и сразу две карты Giro3D:

- `unmaskedMap` (`main.js:1048-1052`);
- `maskedMap` (`main.js:1054-1058`).

Это один из самых важных архитектурных моментов приложения.

Причина: часть слоёв должна рендериться с маской, а часть без маски. Вместо сложного ветвления в одном объекте карта разбита на две overlay-плоскости с одинаковым extent:

- `maskedMap` содержит terrain/слои, которые должны уважать `MaskLayer`;
- `unmaskedMap` содержит слои без маски.

Обе карты лежат в одной сцене, но имеют разный `renderOrder` и разные `z`-offset'ы. Смещения вычисляются из `map.layer_offsets` и переключаются в зависимости от того, включена ли terrain deformation (`main.js:1021-1028`).

### 4.4 Terrain как отдельный elevation-слой

Секция `elevation` в `map_layers.json` не равна обычному слою из `layers[]`. Это отдельный источник высот, который создаётся через `createTerrainLayer(...)` (`main.js:809-826`) и подключается либо к `maskedMap`, либо к `unmaskedMap` в зависимости от `config.elevation.is_masked` (`main.js:1060-1069`).

Это значит:

- `config.elevation` отвечает за геометрию terrain;
- слой с `id: "elevation"` из `layers[]` отвечает только за цветовую раскраску terrain.

Такое разделение легко пропустить, но оно принципиально для понимания кода.

## 5. Как создаются слои из `map_layers.json`

### 5.1 Сортировка

Слои из `config.layers` сначала индексируются и сортируются по `z_order` для рендера (`main.js:1072-1081`), а потом отдельно сортируются в обратном порядке для UI-списка (`main.js:1083-1091`).

Итог:

- рендер идёт снизу вверх;
- пользователь видит в списке сначала верхние слои.

### 5.2 Общий state

В `bootstrap()` создаются:

- `runtimeLayers` для хранения уже созданных runtime-объектов;
- `queryableLayers` для слоёв, из которых можно читать значение по клику;
- `switchDescriptors` для динамического UI;
- `layerVisibilityState` как `Map(id -> visible)` (`main.js:1092-1098`).

### 5.3 Специальный случай: слой `elevation`

Если в `layers[]` встречается слой с `id === "elevation"`, код не создаёт отдельный `ColorLayer`. Вместо этого он присваивает `ColorMap` существующему `ElevationLayer` (`main.js:1147-1177`).

Следствия:

- раскраска terrain живёт внутри elevation-слоя;
- выключение такого слоя не убирает terrain, а отключает colormap;
- фон целевой overlay map переключается между `background_color` и `elevation_no_colormap_background_color`.

### 5.4 `copc_point_cloud`

Если тип слоя `copc_point_cloud`, используется отдельная ветка (`main.js:1180-1235`):

1. сначала подгружается `laz-perf.wasm` через `ensureLazPerfWasmBinary()` (`main.js:165-180`);
2. создаётся `PointCloud` с `COPCSource`;
3. применяются параметры вроде `decimate`, `point_size`, `subdivision_threshold`, `attribute`;
4. point cloud добавляется напрямую в `instance`, а не в `maskedMap`/`unmaskedMap`.

Это важно: point cloud живёт отдельно от двух raster overlay map.

### 5.5 `cog_rgb`

Для RGB-растров создаётся обычный `ColorLayer` без `ColorMap` (`main.js:1251-1274`).

### 5.6 `cog_raster`

Для одноканальных растров создаётся `ColorLayer` с `ColorMap` (`main.js:1276-1305`). Цвета берутся из:

- `style_config.palette`, если она есть;
- иначе из предустановленных палитр `PALETTE_STOPS`.

Диапазон значений задаётся через `style_config.value_range`.

### 5.7 Маска GeoJSON

Если в `map.mask_layer` указан `geojson_mask`, код создаёт `MaskLayer` с `VectorSource` и подключает его к `maskedMap` (`main.js:1308-1329`).

Поддерживаются:

- `mask_mode: normal | inverted`;
- `data_projection`, если GeoJSON не в CRS карты;
- `fill_color`.

## 6. Палитры и цветовые шкалы

Палитры объявлены в `PALETTE_STOPS` (`main.js:30-47`), а дальше используются три функции:

- `getPaletteStops(...)` (`main.js:95-104`);
- `makeGradientFromStops(...)` (`main.js:79-93`);
- `makeColorMapColors(...)` (`main.js:106-108`).

Логика такая:

1. если в конфиге есть `style_config.palette`, точки сортируются по `value`;
2. из цветов строится градиент на 256 оттенков;
3. этот градиент передаётся в `ColorMap`.

Тонкий момент: в текущей реализации поле `palette[].value` влияет только на порядок точек. Нелинейная интерполяция по этим значениям не выполняется; интерполяция равномерная между соседними цветами.

Для UI у каждого цветового слоя может появляться preview-полоска с подписями min/max через `createPalettePreview(...)` (`main.js:121-163`, `main.js:591-634`).

## 7. Клик по карте и чтение значений из COG

Это одна из самых полезных частей приложения и её не видно, если смотреть только на слои.

### 7.1 Popup и marker

В `index.html:12-41` описан popup для показа значения. В `main.js` с ним работают:

- `createClickPopupController(...)` (`main.js:466-557`);
- `createClickPointer(...)` (`main.js:559-589`).

`clickPointer` это `Shape`, который используется как красная точка на сцене в месте клика.

### 7.2 Какие слои можно опрашивать

В `registerQueryableLayer(...)` (`main.js:1114-1125`) в queryable-список попадают только слои, для которых одновременно верно:

- `type === 'cog_raster'`;
- `is_clickable === true`.

То есть:

- `cog_rgb` сейчас не опрашиваются;
- point cloud тоже не участвует в click sampling;
- terrain colour layer тоже участвует только если это именно raster layer с `is_clickable: true`.

### 7.3 Как читается значение

`createDirectCogSampler(...)` (`main.js:399-464`) не использует уже отрисованную текстуру Giro3D. Вместо этого он:

1. открывает исходный GeoTIFF через библиотеку `geotiff`;
2. запоминает bounding box, размеры и nodata;
3. переводит координату карты в пиксель;
4. делает `readRasters()` ровно для окна `1x1`;
5. возвращает значение канала или `null`.

Это хороший прагматичный подход: пользователь получает реальное значение из данных, а не приближённый результат визуального рендера.

### 7.4 Последовательность клика

Логика клика реализована в `main.js:1370-1456`:

1. `instance.pickObjectsAt(...)` ищет точку пересечения в `maskedMap` и `unmaskedMap`;
2. если есть активные queryable layers, показывается popup "Loading values";
3. для всех активных queryable слоёв параллельно читаются значения;
4. результаты сортируются по `z_order` сверху вниз;
5. popup показывает либо одно значение, либо селект со списком слоёв.

Для слоёв `annual-poa` и `poa-sweet-spots` дополнительно считается прогноз годовой генерации по формуле:

`POA * 0.22 * 0.8`

Эта логика зашита в `getAnnualGenerationForecast(...)` (`main.js:388-397`).

## 8. Виджет измерений

В `index.html:58-80` расположен блок измерений, а вся логика собрана в `createMeasurementWidget(instance)` (`main.js:636-799`).

Поддерживаются четыре режима:

- `Distance` через `tool.createLineString(...)`;
- `Area` через `tool.createPolygon(...)`;
- `Height` через `tool.createVerticalMeasure(...)`;
- `Angle` через `tool.createSector(...)`.

Особенности реализации:

- завершение измерения идёт по right click через `conditions.rightClick`;
- активный режим можно отменить по `Escape`;
- все созданные фигуры хранятся в массиве `shapes`;
- `Clear` удаляет их из `instance`;
- при смене единиц вызывается `shape.rebuildLabels()`.

Поддерживаемые единицы:

- длина: `m`, `ft`;
- площадь: `m²/km²`, `ha`, `acre`.

## 9. Mini-map

Mini-map собирается функцией `createMinimap(...)` (`main.js:828-991`), а DOM-контейнер находится в `index.html:93-97`.

Как это работает:

1. создаётся отдельный `maplibregl.Map`;
2. используется простая OSM raster style-конфигурация из `MINIMAP_OSM_STYLE`;
3. центр берётся из `controls.target`, а zoom приближённо выводится из высоты камеры через `altitudeToZoom(...)`;
4. на миникарте рисуется маркер центра;
5. если есть mask GeoJSON, он дополнительно рисуется как fill + outline.

Важный нюанс текущей реализации: синхронизация mini-map с движением камеры включается только после успешного `fitBounds` по маске (`main.js:973-989`). Если маска не загрузилась или её границы не вычислены, mini-map создастся, но не будет дальше синхронизироваться с основной камерой.

Ещё один практический момент: основная карта может работать полностью на локальных данных, а mini-map зависит от внешних OSM tiles.

## 10. Управление камерой и UI

### 10.1 Домашний вид

Стартовая позиция камеры вычисляется через:

- `zoomToAltitude(...)` (`main.js:324-330`);
- `buildHomeCamera(...)` (`main.js:343-349`).

Кнопка `Home` возвращает камеру к сохранённому виду (`main.js:1505-1510`).

### 10.2 `MapControls`

`MapControls` настраиваются в `main.js:1354-1360`:

- target ставится в центр extent;
- включается damping;
- ограничивается полярный угол, чтобы камера не уходила под землю.

### 10.3 Кнопки zoom

Кнопки `+` и `-` не меняют некий абстрактный `map.zoom`, а фактически масштабируют расстояние между камерой и `controls.target` через `applyZoomStep(...)` (`main.js:1458-1477`).

### 10.4 Переключатели terrain и hillshading

`terrain-deformation` (`main.js:1479-1494`) включает и выключает terrain сразу у обеих overlay map и пересчитывает их `z`-позицию.

`hillshading-toggle` (`main.js:1496-1503`) включает hillshade только на той карте, которую определяет `map.hillshading.is_masked`.

### 10.5 Скрытие overlay-карт

`updateMaskVisibility()` (`main.js:1127-1135`) выключает `maskedMap`, `unmaskedMap` и `maskLayer`, если:

- не видно ни одного слоя;
- и hillshading тоже выключен.

Это не логика маски как таковой, а оптимизация отображения пустой сцены.

## 11. Разметка и стили

### 11.1 `index.html`

Разметка разделена на три области:

- `#view` для основного 3D canvas;
- `aside#click-popup` для значений по клику;
- `.map-ui` для панели управления.

Внутри `.map-ui` есть:

- динамический список слоёв `#layers-list`;
- переключатели hillshading и terrain;
- виджет измерений;
- кнопки Home / Zoom in / Zoom out;
- mini-map.

### 11.2 `style.css`

Стили делают две вещи:

- фиксируют карту на весь viewport (`style.css:1-12`);
- рисуют поверх неё два floating-интерфейса: popup слева и control panel справа.

Отдельно оформлены:

- preview-палитры слоёв (`style.css:191-220`);
- switch controls (`style.css:222-260`);
- mini-map (`style.css:266-315`);
- блок измерений (`style.css:322-360` и далее).

## 12. Что именно задаёт `map_layers.json`

Текущий `map_layers.json` описывает:

- `map`: CRS, центр, zoom, pitch, bearing, background, offsets, mask и hillshading;
- `elevation`: источник высот terrain;
- `layers[]`: визуальные слои, порядок и стиль.

В текущем конфиге включены по умолчанию:

- terrain elevation;
- цветовая раскраска `Elevation`;
- слой `POA Sweet Spots`;
- GeoJSON mask;
- hillshading;
- terrain deformation.

Слои `Slope`, `Aspect`, `Annual POA` и `POA Sweet Spots` сделаны queryable, поэтому по клику из них можно читать значение, когда они активны.

## 13. Практические замечания и ограничения

1. `map_layers.schema.json` существует, но `main.js` его не использует. Если JSON будет повреждён, ошибки проявятся только в рантайме.
2. Логика клика работает только для `cog_raster` с `is_clickable: true`.
3. `style_config.palette[].value` сейчас не задаёт реальную шкалу распределения цветов, только порядок stop'ов.
4. Mini-map зависит от сети, потому что использует OSM tiles.
5. Большая часть DOM-элементов берётся через `getElementById(...)` без защитных проверок.
6. `runtimeLayers`, возвращаемый из `bootstrap()`, создаётся как внутренний runtime-реестр, но дальше в этом файле не используется.

## 14. Краткий итог

Архитектурно `3d-map` это конфигурационно-управляемая 3D GIS-сцена с одним `Instance`, двумя overlay map для masked/unmasked рендера и набором дополнительных подсистем вокруг них:

- terrain elevation;
- цветовые и RGB raster layers;
- optional COPC point cloud;
- mask layer;
- click sampling через прямое чтение GeoTIFF;
- measurement widget;
- camera/navigation UI;
- mini-map на MapLibre.

Если нужно менять поведение карты без серьёзного рефакторинга, основная точка входа это `map_layers.json`. Если нужно менять механику приложения, почти всё сосредоточено в `main.js`, особенно в `bootstrap()` и в вспомогательных фабричных функциях выше него.
