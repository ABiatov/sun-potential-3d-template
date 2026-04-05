# Tracking progress

## Официальный кейс
- Slug: `tracking-progress`
- Официальная страница: https://giro3d.org/latest/examples/tracking-progress.html
- Исходный шаблон: `manuals/reference_info/giro3d/examples/tracking-progress.html`
- Исходный скрипт: `manuals/reference_info/giro3d/examples/tracking-progress.js`

## Краткое описание (official)
Query progress of processing tasks with the <code>.progress</code> and <code>.loading</code> APIs.

## Расширенное описание (official longdesc)
Use the `loading` and `progress` properties of various elements (`Instance`, `Entity`, `Layer`...) to track the loading of the data. Each level of the hierarchy aggregates the state of its children (e.g the instance aggregates the state of all entities under its control).

## Теги (official)
- `progress`
- `loading`
- `map`

## Атрибуция (official)
© Mapbox

## Локальный запуск
1. В директории `manuals/reference_info/giro3d` выполнить: `npm run start`.
2. Для запуска только этого примера: `EXAMPLE=tracking-progress npm run start`.
