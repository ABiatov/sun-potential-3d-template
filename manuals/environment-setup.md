# Настройка среды разработки

## Локальная разработка (репозиторий Giro3D)
1. Перейти в `manuals/reference_info/giro3d`.
2. Установить зависимости: `npm install`.
3. Запуск examples: `npm run start`.
4. Запуск одного примера: `EXAMPLE=<slug> npm run start`.

## Проверки качества
- Полный набор: `npm test`.
- Только lint: `npm run lint`.
- Coverage: `npm run test-with-coverage`.

## Полезные команды из официальных scripts
- `npm run serve-apidoc`
- `npm run serve-site`
- `npm run build-examples`
- `npm run build-tutorials`

## Peer dependencies
По `package.json`: `ol`, `proj4`, `three`.

## Официальные первоисточники
- `manuals/reference_info/giro3d/README.md`
- `manuals/reference_info/giro3d/package.json`
- `manuals/reference_info/giro3d/CONTRIBUTING.md`
