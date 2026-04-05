# Stacking transparent maps

## Официальный кейс
- Slug: `map-transparency-stack`
- Официальная страница: https://giro3d.org/latest/examples/map-transparency-stack.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-transparency-stack.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-transparency-stack.js`

## Краткое описание (official)
Illustrates how transparency in maps work.

## Расширенное описание (official longdesc)
Transparency in maps (and any other 3D object) is a tricky problem. Due to limitations in how 3D renderers work, it is not generally possible to correctly display overlapping transparent objects. For example, set the opacity of at least 2 maps to less than 100%, rotate the camera around, and observe various rendering issues, such as missing map tiles.

## Теги (official)
- `map`
- `layer`
- `opacity`

## Атрибуция (official)
© IGN, © iTowns

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-transparency-stack npm run start`.
