import { test, expect } from '@fixtures/fixtures';
import { ScreenshotUtils } from './utils/screenshot-utils';

test.describe('Примеры использования ScreenshotUtils', () => {
    test('Скриншот с автоматической стабилизацией', async ({ page }) => {
        await page.goto('/');

        // Используем утилиту для стабильного скриншота
        await ScreenshotUtils.takeStableScreenshot(page, 'example-stable.png');
    });

    test('Скриншот элемента с ожиданием', async ({ page }) => {
        await page.goto('/');

        // Ждем появления элемента
        await page.waitForSelector('nav, .navigation, .navbar', { timeout: 5000 });
        const navigation = page.locator('nav, .navigation, .navbar').first();

        if (await navigation.isVisible()) {
            // Делаем скриншот элемента с ожиданием стабилизации
            await ScreenshotUtils.takeElementScreenshot(navigation, 'navigation-element.png');
        }
    });

    test('Скриншот с определенным viewport', async ({ page }) => {
        // Делаем скриншот для мобильного устройства
        await ScreenshotUtils.takeScreenshotWithViewport(
            page,
            'mobile-example.png',
            375,
            667
        );
    });

    test('Скриншот с прокруткой', async ({ page }) => {
        await page.goto('/');

        // Ищем элемент внизу страницы
        const footer = page.locator('footer, .footer, [data-testid="footer"]').first();

        if (await footer.isVisible()) {
            // Делаем скриншот с прокруткой до элемента
            await ScreenshotUtils.takeScreenshotWithScroll(page, 'footer-scrolled.png', footer);
        }
    });

    test('Скриншот без динамических элементов', async ({ page }) => {
        await page.goto('/');

        // Скрываем динамические элементы (время, даты, ID)
        const elementsToHide = [
            '.timestamp',
            '.date',
            '.id',
            '[data-dynamic]'
        ];

        await ScreenshotUtils.takeScreenshotWithoutDynamicElements(
            page,
            'without-dynamic.png',
            elementsToHide
        );
    });

    test('Скриншот с определенным состоянием данных', async ({ page }) => {
        await page.goto('/');

        // Ждем загрузки данных и делаем скриншот
        try {
            await ScreenshotUtils.takeScreenshotWithDataState(
                page,
                'with-data.png',
                'populated'
            );
        } catch (e) {
            // Если данных нет, делаем обычный скриншот
            await ScreenshotUtils.takeStableScreenshot(page, 'no-data.png');
        }
    });

    test('Скриншот с темой', async ({ page }) => {
        await page.goto('/');

        // Пытаемся сделать скриншот в темной теме
        try {
            await ScreenshotUtils.takeScreenshotWithTheme(page, 'dark-theme.png', 'dark');
        } catch (e) {
            // Если переключение темы недоступно, делаем обычный скриншот
            await ScreenshotUtils.takeStableScreenshot(page, 'default-theme.png');
        }
    });

    test('Комбинированный пример', async ({ page }) => {
        await page.goto('/');

        // Ждем стабилизации UI
        await ScreenshotUtils.waitForUISettling(page, 2000);

        // Делаем скриншот с увеличенным timeout
        await expect(page).toHaveScreenshot('combined-example.png');
    });
});
