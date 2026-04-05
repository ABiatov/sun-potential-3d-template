# Multi-resolution elevation data

## Официальный кейс
- Slug: `multi-resolution-elevation`
- Официальная страница: https://giro3d.org/latest/examples/multi-resolution-elevation.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/multi-resolution-elevation.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/multi-resolution-elevation.js`

## Краткое описание (official)
Combine multiple elevation sources into a single layer.

## Расширенное описание (official longdesc)
The `AggregateImageSource` can combine multiple `ImageSource`s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. It also makes it possible to have more than one elevation source on a map, which only supports a single elevation layer.

## Теги (official)
- `terrain`
- `map`
- `layer`

## Атрибуция (official)
© U.S. Geological Survey, © NASA,

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=multi-resolution-elevation npm run start`.
