# 🚀 Быстрый старт скриншотных тестов

## Что нужно для запуска:

1. **Работающее приложение** - URL в `.env` файле
2. **Данные для тестирования** - отчеты, кампании, креативы
3. **Авторизация** - файл `storage-states/user.json`

## 🎯 Быстрый запуск:

### 1. Первый запуск (создание baseline):
```bash
npm run test:screenshots
```

### 2. Проверка изменений:
```bash
npm run test:screenshots
```

### 3. Обновление baseline после изменений:
```bash
npm run test:screenshots:update
```

## 📁 Структура файлов:

```
tests/screenshot/
├── screenshot-tests.spec.ts          # Основные тесты страниц
├── component-screenshots.spec.ts     # Тесты компонентов
├── example-screenshots.spec.ts       # Примеры использования
├── utils/
│   └── screenshot-utils.ts          # Утилиты
└── README.md                         # Документация
```

## 🔧 Альтернативные команды:

```bash
# Через скрипт
npm run screenshots:run
npm run screenshots:update
npm run screenshots:report

# Прямые команды Playwright
npx playwright test
npx playwright test --update-snapshots
```

## 📊 Просмотр результатов:

```bash
# HTML отчет
npm run screenshots:report

# Или
npx playwright show-report
```

## ❗ Если тесты падают:

1. **Проверьте приложение** - работает ли оно по указанному URL
2. **Проверьте данные** - есть ли тестовые данные для скриншотов
3. **Обновите baseline** - `npm run test:screenshots:update`
4. **Проверьте логи** - какие именно тесты падают

## 🎨 Что тестируется:

- ✅ Главная страница (десктоп + мобильные)
- ✅ Списки отчетов, кампаний, креативов
- ✅ Адаптивность (планшеты, большие экраны)
- ✅ Модальные окна и формы
- ✅ Состояния загрузки и ошибок

## 📝 Добавление новых тестов:

```typescript
test('Новая страница', async ({ page }) => {
    await page.goto('/new-page');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('new-page.png');
});
```

## 🔍 Отладка:

```bash
# Запуск с UI
npm run test:screenshots:ui

# Запуск в браузере
npm run test:screenshots:headed

# Отладка конкретного теста
npx playwright test --grep "Главная страница" --debug
```

---

**Готово!** Все скриншотные тесты теперь в папке `tests/screenshot/`. 🎉
