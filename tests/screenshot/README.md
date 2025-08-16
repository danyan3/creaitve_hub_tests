# 📸 Скриншотные тесты Creative Hub

Все скриншотные тесты находятся в этой папке для удобства организации.

## 📁 Структура файлов

```
tests/screenshot/
├── screenshot-tests.spec.ts          # Основные тесты страниц
├── component-screenshots.spec.ts     # Тесты компонентов
├── example-screenshots.spec.ts       # Примеры использования
├── utils/
│   └── screenshot-utils.ts          # Утилиты для скриншотов
└── README.md                         # Этот файл
```

## 🚀 Быстрый запуск

```bash
# Запуск всех скриншотных тестов
npm run test:screenshots

# Обновление baseline
npm run test:screenshots:update

# Запуск с UI
npm run test:screenshots:ui
```

## 🎯 Что тестируется

- **Страницы**: Главная, отчеты, кампании, креативы
- **Адаптивность**: Десктоп, планшет, мобильные
- **Компоненты**: Модальные окна, формы, таблицы
- **Состояния**: Загрузка, ошибки, пустые данные

## 📝 Добавление новых тестов

Создайте новый файл `.spec.ts` в этой папке:

```typescript
import { test, expect } from '../e2e/fixtures/fixtures';

test.describe('Новые скриншоты', () => {
    test('Новая страница', async ({ page }) => {
        await page.goto('/new-page');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        await expect(page).toHaveScreenshot('new-page.png');
    });
});
```

## 🔧 Утилиты

Используйте `ScreenshotUtils` для стабильных скриншотов:

```typescript
import { ScreenshotUtils } from './utils/screenshot-utils';

// Стабильный скриншот
await ScreenshotUtils.takeStableScreenshot(page, 'screenshot.png');

// Скриншот с viewport
await ScreenshotUtils.takeScreenshotWithViewport(page, 'mobile.png', 375, 667);
```

## 📊 Результаты

Скриншоты сохраняются в подпапках:
```
tests/screenshot/
├── screenshot-tests.spec.ts-snapshots/
├── component-screenshots.spec.ts-snapshots/
└── example-screenshots.spec.ts-snapshots/
```

---

**Все скриншотные тесты теперь в одном месте!** 🎉
