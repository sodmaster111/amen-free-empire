# Amen Backend

Backend-сервис проекта AMEN FREE EMPIRE, написанный на Node.js и TypeScript поверх Express. Он предоставляет базовый API для проверки состояния и служит отправной точкой для дальнейшего развития.

## Требования
- Node.js (рекомендуемая версия LTS 20.x)
- npm

## Установка
1. `cd backend`
2. `npm install`

## Запуск в режиме разработки
```bash
npm run dev
```

## Запуск в продакшн-режиме (локально)
1. `npm run build`
2. `npm start`

## Переменные окружения
- `PORT` — порт, на котором слушает backend (по умолчанию 3000).
- `NODE_ENV` — режим окружения (`development` или `production`).

Пример значений см. в файле `.env.example`. Переменные можно задавать напрямую перед командой, например: `PORT=4000 npm run dev`.

## Эндпоинты
- `GET /health`

Пример ответа:
```json
{
  "status": "ok",
  "service": "amen-backend",
  "uptime": 42,
  "timestamp": "2024-06-01T12:00:00.000Z"
}
```
