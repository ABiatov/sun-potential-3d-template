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
