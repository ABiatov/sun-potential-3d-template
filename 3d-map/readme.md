# 3d-map: Giro3D приложение с локальными COG-растрами

Этот пример собран по структуре и подходам из:
- `manuals/getting-started.md`
- `manuals/examples/geotiff-elevation.md`
- `manuals/examples/geotiff-color.md`
- `demomap/main.js`

## Что внутри
- `index.html` — контейнер `#view` и UI-виджет управления слоями.
- `map_layers.json` — единый конфиг карты, elevation-слоя и подключаемых слоёв.
- `main.js` — загрузка `map_layers.json` и построение `Instance`, `Map`, `GeoTIFFSource`, `ElevationLayer`, `ColorLayer`, controls, кнопка «домой».
- `style.css` — стили карты и виджета.
- `data/*.tif` — локальные COG-растры.

## Слои
- Все параметры карты и слоёв читаются из `map_layers.json`.
- Для одноканальных слоёв поддерживается `colormap_name` / `palette` и `blending_mode` (`none|normal|add|multiply`) в `style_config`.
- Для каждого слоя в `layers[]` доступен флаг `is_masked`: `true` — слой рендерится с маской из `map.mask_layer`, `false` — слой рендерится без маски.
- Для `elevation` доступен `is_masked`: определяет, применять ли маску к terrain/elevation-слою.
- Terrain deformation управляется переключателем в UI и стартовым `map.terrain_enabled` в конфиге.
- При выключенном чекбоксе `Elevation` используется `map.elevation_no_colormap_background_color` (по умолчанию белый фон под hillshade).
- Hillshading настраивается через `map.hillshading` (`enabled`, `is_masked`, `azimuth`, `zenith`, `intensity`, `z_factor`, `elevation_layers_only`).

## Запуск
1. Перейдите в папку проекта:
```bash
cd 3d-map
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите dev-сервер:
```bash
npm run dev
```

4. Откройте в браузере:
- `http://localhost:5173/`

## Запуск именно на `http://localhost/`
По умолчанию `http://localhost/` означает порт `80`.

1. Запустите сервер на порту 80:
```bash
npm run dev:80
```

2. Если получите ошибку прав доступа (типично для macOS/Linux), запустите с правами администратора:
```bash
sudo npm run dev:80
```

3. Откройте:
- `http://localhost/`

## Полезно знать
- CRS проекта и растра: `EPSG:3763`.
- Центр карты задан из `EPSG:4326`: `41.702556, -8.823868`.
- Кнопка «домой» возвращает камеру к виду из `map_layers.json` (`center`, `zoom`, `pitch`, `bearing`).
