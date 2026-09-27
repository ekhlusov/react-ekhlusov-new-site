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

Резюме лежит в `src/data/cv.json` — это и есть «база данных» сайта, бэкенда нет.
Чтобы поменять текст на сайте, правьте этот файл.

## Деплой

Пуш в `master` → GitHub Actions заходит по SSH на прод, делает `git pull` и
пересобирает докер-образ (`containers/node-nginx/Dockerfile`): Node собирает
статику, nginx её отдаёт.
