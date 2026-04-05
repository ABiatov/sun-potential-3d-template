# SRTM Tiles

## Официальный кейс
- Slug: `srtm-tiles`
- Официальная страница: https://giro3d.org/latest/examples/srtm-tiles.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/srtm-tiles.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/srtm-tiles.js`

## Краткое описание (official)
Create a mosaic of SRTM tiles.

## Расширенное описание (official longdesc)
The `AggregateImageSource` can combine multiple `ImageSource`s into one. One the many benefits of this approach is that is reduces the number of layers in a map, which helps improve performance. It also makes it possible to have more than one elevation source on a map, which only supports a single elevation layer.

## Теги (official)
- `terrain`
- `srtm`
- `map`
- `layer`

## Атрибуция (official)
© NASA,

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=srtm-tiles npm run start`.
