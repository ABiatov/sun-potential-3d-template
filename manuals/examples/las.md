# LAS/LAZ files.

## Официальный кейс
- Slug: `las`
- Официальная страница: https://giro3d.org/latest/examples/las.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/las.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/las.js`

## Краткое описание (official)
Display a LAS/LAZ file.

## Расширенное описание (official longdesc)
Use the `LASSource` to display raw LAS/LAZ files. Note however that this format is not optimized for web streaming and visualization. Instead, it is recommended to use a `COPCSource` to load Cloud-Optimized Point Cloud LAZ files instead.

## Теги (official)
- `point cloud`
- `las`
- `laz`

## Атрибуция (official)
Autzen stadium dataset provided by United States Geological Survey and Hobu, Inc.

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=las npm run start`.
