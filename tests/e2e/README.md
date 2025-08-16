# 🧪 E2E тесты Creative Hub

Этот документ описывает структуру и использование End-to-End тестов в проекте Creative Hub.

## 📁 Структура проекта

```
creaitve_hub_tests/
├── config/                        # Глобальные настройки
│   └── global-setup.ts            # Глобальная настройка тестов
├── data/                          # Тестовые данные
│   ├── test-data.ts               # Данные для тестов
│   └── test-ids.ts                # Test ID селекторы
├── pages/                         # Page Object модели
│   ├── base.page.ts               # Базовый класс страницы
│   ├── campaign.page.ts            # Страница кампании
│   ├── campaigns-list.page.ts      # Список кампаний
│   ├── creative.page.ts            # Страница креатива
│   ├── creatives-list.page.ts      # Список креативов
│   ├── report.page.ts              # Страница отчета
│   ├── reports-list.page.ts        # Список отчетов
│   └── mixins/                     # Миксины для страниц
│       └── filters.mixin.ts        # Фильтры
├── storage-states/                 # Состояния авторизации
│   └── user.json                   # Состояние пользователя
├── tests/                          # Все тесты
│   ├── e2e/                       # E2E тесты
│   │   ├── fixtures/              # Фикстуры и настройки
│   │   │   └── fixtures.ts        # Основные фикстуры Playwright
│   │   ├── campaign.spec.ts        # Тесты страницы кампании
│   │   ├── campaigns-list.spec.ts  # Тесты списка кампаний
│   │   ├── creative.spec.ts        # Тесты страницы креатива
│   │   ├── creatives-list.spec.ts  # Тесты списка креативов
│   │   ├── main-navigation.spec.ts # Тесты основной навигации
│   │   ├── report.spec.ts          # Тесты страницы отчета
│   │   ├── reports-list.spec.ts    # Тесты списка отчетов
│   │   └── README.md               # Этот файл
│   └── screenshot/                 # Скриншотные тесты (отдельно)
├── playwright.config.ts            # Конфигурация Playwright
├── package.json                   # Зависимости и скрипты
└── tsconfig.json                  # Конфигурация TypeScript
```

## 🚀 Быстрый запуск

### Первый запуск
```bash
# Установка зависимостей
npm install

# Установка браузеров Playwright
npx playwright install

# Запуск всех E2E тестов
npm run test
```

### Последующие запуски
```bash
# Запуск всех тестов
npm run test

# Запуск с отображением браузера
npm run test:headed

# Запуск с UI интерфейсом
npm run test:ui

# Проверка типов TypeScript
npm run typecheck
```

## 🎯 Что тестируется

### Основные страницы
- **Главная страница** - базовая навигация и доступность
- **Список отчетов** - отображение, фильтрация, пагинация
- **Список кампаний** - отображение, создание, редактирование
- **Список креативов** - отображение, управление

### Функциональность
- **Навигация** - переходы между страницами
- **Формы** - создание и редактирование элементов
- **Фильтры** - поиск и фильтрация данных
- **Пагинация** - навигация по страницам
- **Модальные окна** - диалоги и подтверждения

## 🏗️ Архитектура тестов

### Page Object Model (POM)
Тесты используют паттерн Page Object для лучшей организации:

```typescript
// Пример использования Page Object
import { ReportsListPage } from '../../pages/reports-list.page';

test('Отображение списка отчетов', async ({ page }) => {
    const reportsPage = new ReportsListPage(page);
    await page.goto('/');
    await reportsPage.reportsTab().click();
    
    await expect(reportsPage.reportItem()).toBeVisible();
});
```

### Фикстуры
Playwright фикстуры предоставляют готовые Page Objects:

```typescript
test('Тест с фикстурой', async ({ reportsPage }) => {
    // reportsPage уже инициализирован
    await reportsPage.reportsTab().click();
});
```

## 📝 Создание новых тестов

### 1. Создание Page Object
```typescript
// pages/new-page.page.ts
export class NewPage {
    constructor(private page: Page) {}

    newPageTab() {
        return this.page.locator('[data-testid="new-page-tab"]');
    }

    newPageItem() {
        return this.page.locator('[data-testid="new-page-item"]');
    }
}
```

### 2. Добавление в фикстуры
```typescript
// fixtures/fixtures.ts
export const test = base.extend<{
    newPage: NewPage;
}>({
    newPage: async ({ page }, use) => {
        const newPage = new NewPage(page);
        await use(newPage);
    },
});
```

### 3. Создание теста
```typescript
// new-page.spec.ts
import { test, expect } from './fixtures/fixtures';

test.describe('Новая страница', () => {
    test('Отображение элементов', async ({ newPage }) => {
        await page.goto('/');
        await newPage.newPageTab().click();
        
        await expect(newPage.newPageItem()).toBeVisible();
    });
});
```

## 🔧 Конфигурация

### Playwright Config
Основные настройки в `playwright.config.ts`:

```typescript
export default defineConfig({
    testDir: path.join(__dirname, 'tests', 'e2e'),
    use: {
        baseURL: process.env.BASE_URL,
        storageState: process.env.PW_STORAGE_STATE,
        actionTimeout: 15000,
        navigationTimeout: 30000,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
```

### Переменные окружения
Создайте файл `.env` в корне проекта:

```env
BASE_URL=http://localhost:3000
PW_STORAGE_STATE=storage-states/user.json
```

## 🧹 Подготовка данных

### Авторизация
Тесты используют предсохраненное состояние авторизации:

```bash
# Создание состояния авторизации
npx playwright codegen --save-storage=storage-states/user.json
```

### Тестовые данные
Убедитесь, что в приложении есть тестовые данные:
- Отчеты для тестирования
- Кампании для проверки
- Креативы для тестов

## 🐛 Отладка тестов

### Запуск в режиме отладки
```bash
# Запуск конкретного теста с отладкой
npx playwright test --grep "Название теста" --debug

# Запуск с UI для пошаговой отладки
npx playwright test --ui
```

### Просмотр отчетов
```bash
# HTML отчет
npx playwright show-report

# Отчет в консоли
npx playwright test --reporter=list
```

### Логи и скриншоты
- **Скриншоты** автоматически создаются при падении тестов
- **Трейсы** сохраняются при ошибках (если включены)
- **Видео** записывается в headed режиме

## 📊 CI/CD интеграция

### GitHub Actions
```yaml
- name: Run E2E Tests
  run: npm run test
  
- name: Upload Test Results
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

### Локальная разработка
```bash
# Запуск в фоновом режиме
npm run test:headed

# Запуск конкретного браузера
npx playwright test --project=chromium
```