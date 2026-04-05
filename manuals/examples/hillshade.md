# Hillshading & terrain

## Официальный кейс
- Slug: `hillshade`
- Официальная страница: https://giro3d.org/latest/examples/hillshade.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/hillshade.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/hillshade.js`

## Краткое описание (official)
Illustrate the use of hillshading on maps with terrain.

## Расширенное описание (official longdesc)
Hillshading is a realistic shading technique that uses elevation data to simulate the sunlight behaviour. You can change the sun rays' orientation (azimuth) and slope (zenith). Terrain deformation can be toggled on and off. If toggled off, the map is displayed as a flat surface, while still retaining shading capabilities. Terrain stitching is a rendering technique that reduces cracks and visible seams at the boundary between neighbouring terrain tiles. Disabling stitching can improve performance at the cost of increased visual artifacts.

## Теги (official)
- `map`
- `terrain`
- `hillshading`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=hillshade npm run start`.
