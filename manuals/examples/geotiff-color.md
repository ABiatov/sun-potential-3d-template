# Cloud Optimized GeoTIFF (COG)

## Официальный кейс
- Slug: `geotiff-color`
- Официальная страница: https://giro3d.org/latest/examples/geotiff-color.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/geotiff-color.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/geotiff-color.js`

## Краткое описание (official)
Display a color COG in various color spaces.

## Расширенное описание (official longdesc)
Cloud Optimized GeoTIFFs are regular GeoTIFF files whose layout is optimized for remote access. They allow streaming the image without tiling it beforehand. The `GeoTIFFSource` image source supports both elevation and color data, as well as 8-bit, 16-bit and 32-bit pixels. Optionally, you can use the `convertToRGB` constructor option to decode images not in the RGB color space, such as CMYK or YCbCR images.

## Теги (official)
- `map`
- `geotiff`
- `cog`

## Атрибуция (official)
© EOX

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=geotiff-color npm run start`.
