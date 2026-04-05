# demomap: минимальное Giro3D приложение

Этот пример сделан по структуре из:
- `manuals/getting-started.md`
- `manuals/environment-setup.md`
- `manuals/reference_info/giro3d/examples/getting-started.js`

## Что внутри
- `index.html` — контейнер `#view` для рендера карты.
- `main.js` — минимальная инициализация `Instance`, `Map`, `ColorLayer`, `ElevationLayer` и `MapControls`.
- `package.json` — зависимости и команды запуска.

## Запуск
1. Перейдите в папку проекта:
```bash
cd demomap
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите dev-сервер:
```bash
npm run dev
```

4. Откройте в браузере:
- `http://localhost:5173/`

## Запуск именно на `http://localhost/`
По умолчанию `http://localhost/` означает порт `80`.

1. Запустите сервер на порту 80:
```bash
npm run dev:80
```

2. Если получите ошибку прав доступа (типично для macOS/Linux), запустите с правами администратора:
```bash
sudo npm run dev:80
```

3. Откройте:
- `http://localhost/`

## Полезно знать
- Приложение тянет WMS-тайлы и elevation-данные из `https://data.geopf.fr/wms-r`, поэтому нужен доступ в интернет.
- Если порт 80 занят, освободите его или используйте обычный запуск (`npm run dev`) и адрес `http://localhost:5173/`.
