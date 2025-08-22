# Creative Hub Tests

Автоматизированные тесты для Creative Hub приложения.

## Запуск тестов

```bash
# Установка зависимостей
npm install

# Все тесты
npm test

# Только smoke тесты
npm run test:smoke

# E2E тесты
npm run test:e2e

# С UI интерфейсом
npm run test:ui
```

## Настройка

Создайте файл `.env` в корне проекта и укажите:

```bash
# Базовый URL приложения для тестирования
BASE_URL=http://localhost:3000

# Или для продакшена
# BASE_URL=https://your-app.com
```

## Структура

- `tests/e2e/` - тестовые файлы
- `pages/` - Page Object модели
- `data/` - тестовые данные и конфигурация
- `utils/` - вспомогательные функции

## Теги

- `@smoke` - основные тесты
- `@regression` - тесты для регресса
- `@critical` - критически важные функции