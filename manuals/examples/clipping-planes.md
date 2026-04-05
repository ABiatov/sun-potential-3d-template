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
