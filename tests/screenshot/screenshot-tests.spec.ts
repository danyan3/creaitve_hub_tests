import { test, expect } from '../e2e/fixtures/fixtures';
import { ReportsListPage } from '../../pages/reports-list.page';
import { CampaignsListPage } from '../../pages/campaigns-list.page';
import { CreativesListPage } from '../../pages/creatives-list.page';

test.describe('Скриншотные тесты', () => {
    let reportsPage: ReportsListPage;
    let campaignsPage: CampaignsListPage;
    let creativesPage: CreativesListPage;

    test.beforeEach(async ({ page }) => {
        reportsPage = new ReportsListPage(page);
        campaignsPage = new CampaignsListPage(page);
        creativesPage = new CreativesListPage(page);
    });

    test.describe('Главная навигация', () => {
        test('Главная страница - десктоп', async ({ page }) => {
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            // Ждем стабилизации UI
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('main-page-desktop.png');
        });

        test('Главная страница - мобильное устройство', async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto('/');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('main-page-mobile.png');
        });
    });

    test.describe('Страница списка отчетов', () => {
        test('Список отчетов - полный экран', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('reports-list-full.png');
        });

        test('Список отчетов - с фильтрами', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            // Открываем фильтры если есть
            try {
                const filterButton = page.locator('[data-testid="filter-button"], button:has-text("Фильтры"), button:has-text("Filters")').first();
                if (await filterButton.isVisible()) {
                    await filterButton.click();
                    await page.waitForTimeout(500);
                }
            } catch (e) {
                // Фильтры могут отсутствовать
            }

            await page.waitForTimeout(1000);
            await expect(page).toHaveScreenshot('reports-list-with-filters.png');
        });

        test('Список отчетов - мобильное устройство', async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('reports-list-mobile.png');
        });
    });

    test.describe('Страница списка кампаний', () => {
        test('Список кампаний - полный экран', async ({ page }) => {
            await page.goto('/');
            await campaignsPage.campaignsTab().click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('campaigns-list-full.png');
        });

        test('Список кампаний - мобильное устройство', async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto('/');
            await campaignsPage.campaignsTab().click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('campaigns-list-mobile.png');
        });
    });

    test.describe('Страница списка креативов', () => {
        test('Список креативов - полный экран', async ({ page }) => {
            await page.goto('/');
            await creativesPage.creativesTab().click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('creatives-list-full.png');
        });

        test('Список креативов - мобильное устройство', async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto('/');
            await creativesPage.creativesTab().click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('creatives-list-mobile.png');
        });
    });

    test.describe('Адаптивность', () => {
        test('Планшет - портретная ориентация', async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto('/');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('tablet-portrait.png');
        });

        test('Планшет - ландшафтная ориентация', async ({ page }) => {
            await page.setViewportSize({ width: 1024, height: 768 });
            await page.goto('/');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('tablet-landscape.png');
        });

        test('Большой экран', async ({ page }) => {
            await page.setViewportSize({ width: 1920, height: 1080 });
            await page.goto('/');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot('large-screen.png');
        });
    });

    test.describe('Состояния загрузки', () => {
        test('Состояние загрузки', async ({ page }) => {
            await page.goto('/');

            // Делаем скриншот во время загрузки
            await expect(page).toHaveScreenshot('loading-state.png');
        });

        test('Состояние ошибки (если доступно)', async ({ page }) => {
            // Попытка перейти на несуществующий URL для получения ошибки
            await page.goto('/non-existent-page');
            await page.waitForTimeout(2000);

            await expect(page).toHaveScreenshot('error-state.png');
        });
    });
});
