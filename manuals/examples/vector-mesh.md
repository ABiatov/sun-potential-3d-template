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
