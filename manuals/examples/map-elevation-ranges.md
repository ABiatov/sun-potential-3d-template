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
