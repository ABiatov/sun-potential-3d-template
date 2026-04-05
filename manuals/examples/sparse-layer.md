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
