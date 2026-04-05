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
