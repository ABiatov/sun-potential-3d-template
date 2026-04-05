# Elevation profile

## Официальный кейс
- Slug: `map-elevation-profile`
- Официальная страница: https://giro3d.org/latest/examples/map-elevation-profile.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/map-elevation-profile.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/map-elevation-profile.js`

## Краткое описание (official)
Create an elevation profile using a Map and a path.

## Расширенное описание (official longdesc)
Use the `getElevation()` method to sample the elevation at a given coordinate. The elevation profile chart is built with Chart.js. Keep in mind, however, that the accuracy of the profile will depend on the currently loaded data, which in turns depend on the position of the camera. The closer the camer is to a certain point, the better the resolution will be around this point.

## Теги (official)
- `map`
- `terrain`
- `profile`

## Атрибуция (official)
© IGN

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=map-elevation-profile npm run start`.
