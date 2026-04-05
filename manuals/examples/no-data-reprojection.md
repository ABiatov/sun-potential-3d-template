# No-data elimination after reprojection

## Официальный кейс
- Slug: `no-data-reprojection`
- Официальная страница: https://giro3d.org/latest/examples/no-data-reprojection.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/no-data-reprojection.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/no-data-reprojection.js`

## Краткое описание (official)
Illustrates no-data elimination at the edges of a dataset after reprojection.

## Расширенное описание (official longdesc)
The shown dataset does not have any no-data pixels. However, reprojecting it to a different CRS leaves empty areas at the edge, which become no-data areas. This example checks that those new no-data areas are correctly handled by the no-data filling algorithm.

## Теги (official)
- `map`
- `nodata`
- `geotiff`
- `reprojection`

## Атрибуция (official)
© U.S. Geological Survey

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=no-data-reprojection npm run start`.
