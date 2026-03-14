Source Path: manuals/testing.md

# Тестирование Giro3D

## Unit tests
- Фреймворк: Vitest.
- Тесты находятся в `test/unit` и повторяют структуру `src`.

Команды:
- `npm run test-unit`
- `npm run test-with-coverage`

## Роль examples
- Примеры используются как showcase и как интерактивные тесты (в случаях, где unit-test неудобен).

## Шаблон метаданных example
В `examples/*.html` используется front matter с полями:
- `title`
- `shortdesc`
- `longdesc`
- `attribution`

## Официальный первоисточник
- `manuals/reference_info/giro3d/TESTING.md`
