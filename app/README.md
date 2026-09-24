# ekhlusov-site

Одностраничное резюме на React + Vite.

## Запуск

```bash
cd app
npm install
npm run dev      # дев-сервер на http://localhost:3000
npm run build    # прод-сборка в app/build
npm run preview  # локальный просмотр собранного билда
```

## Данные

Страница берёт резюме с `${VITE_BACKEND_URL}/api/v1/main` (см. `.env.example`).
Если `VITE_BACKEND_URL` не задан или бэкенд не отвечает, показывается локальный
мок `src/mocks/cv.json` — так страница никогда не виснет на спиннере.

## Деплой

Пуш в `master` → GitHub Actions заходит по SSH на прод, делает `git pull` и
пересобирает докер-образ (`containers/node-nginx/Dockerfile`): Node собирает
статику, nginx её отдаёт.
