# Stacked WMTS layers

## Официальный кейс
- Slug: `multiple-wmts-layers`
- Официальная страница: https://giro3d.org/latest/examples/multiple-wmts-layers.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/multiple-wmts-layers.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/multiple-wmts-layers.js`

## Краткое описание (official)
Stack multiple WMTS layers into a single Giro3D layer.

## Расширенное описание (official longdesc)
The `AggregateImageSource` can combine multiple `ImageSource`s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. In this example, we display seveveral WMTS layers in a single Map layer.

## Теги (official)
- `map`
- `wmts`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=multiple-wmts-layers npm run start`.
