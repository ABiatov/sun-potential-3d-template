# Установка Giro3D

## Вариант 1: NPM (рекомендуемый в README)
```bash
npm install --save @giro3d/giro3d
```

Пример импорта:
```js
import Instance from '@giro3d/giro3d/core/Instance.js';
```

## Вариант 2: Docker quick start
```zsh
docker run --rm -p 8080:8080 $(docker build https://gitlab.com/giro3d/giro3d.git#<branch> -q)
```
или:
```zsh
docker build -t giro3d:local https://gitlab.com/giro3d/giro3d.git#<branch>
docker run --rm -p 8080:8080 giro3d:local
```

## Вариант 3: release bundle
- См. релизы: https://gitlab.com/giro3d/giro3d/-/releases

## Официальные первоисточники
- `manuals/reference_info/giro3d/README.md`
