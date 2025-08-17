import { test, expect } from '@fixtures/fixtures';
import { ReportsListPage } from '@pages/reports-list.page';
import { CampaignsListPage } from '@pages/campaigns-list.page';
import { CreativesListPage } from '@pages/creatives-list.page';

test.describe('Скриншоты компонентов', () => {
    let reportsPage: ReportsListPage;
    let campaignsPage: CampaignsListPage;
    let creativesPage: CreativesListPage;

    test.beforeEach(async ({ page }) => {
        reportsPage = new ReportsListPage(page);
        campaignsPage = new CampaignsListPage(page);
        creativesPage = new CreativesListPage(page);
    });

    test.describe('Модальные окна', () => {
        test('Модальное окно создания отчета', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            // Ищем кнопку создания отчета
            const createButton = page.locator('button:has-text("Создать"), button:has-text("Create"), button:has-text("+"), [data-testid="create-report"]').first();

            if (await createButton.isVisible()) {
                await createButton.click();
                await page.waitForTimeout(500);

                // Ждем появления модального окна
                const modal = page.locator('[role="dialog"], .modal, .popup, [data-testid="modal"]').first();
                if (await modal.isVisible()) {
                    await expect(modal).toHaveScreenshot('create-report-modal.png');
                }
            }
        });

        test('Модальное окно редактирования', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            // Ищем кнопку редактирования
            const editButton = page.locator('button:has-text("Редактировать"), button:has-text("Edit"), [data-testid="edit-button"]').first();

            if (await editButton.isVisible()) {
                await editButton.click();
                await page.waitForTimeout(500);

                const modal = page.locator('[role="dialog"], .modal, .popup, [data-testid="modal"]').first();
                if (await modal.isVisible()) {
                    await expect(modal).toHaveScreenshot('edit-modal.png');
                }
            }
        });

        test('Модальное окно подтверждения удаления', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            // Ищем кнопку удаления
            const deleteButton = page.locator('button:has-text("Удалить"), button:has-text("Delete"), [data-testid="delete-button"]').first();

            if (await deleteButton.isVisible()) {
                await deleteButton.click();
                await page.waitForTimeout(500);

                const confirmModal = page.locator('[role="dialog"], .modal, .popup, [data-testid="confirm-modal"]').first();
                if (await confirmModal.isVisible()) {
                    await expect(confirmModal).toHaveScreenshot('delete-confirmation-modal.png');
                }
            }
        });
    });

    test.describe('Формы', () => {
        test('Форма создания кампании', async ({ page }) => {
            await page.goto('/');
            await campaignsPage.campaignsTab().click();
            await page.waitForLoadState('networkidle');

            const createButton = page.locator('button:has-text("Создать"), button:has-text("Create"), button:has-text("+"), [data-testid="create-campaign"]').first();

            if (await createButton.isVisible()) {
                await createButton.click();
                await page.waitForTimeout(500);

                const form = page.locator('form, [data-testid="form"], .form').first();
                if (await form.isVisible()) {
                    await expect(form).toHaveScreenshot('create-campaign-form.png');
                }
            }
        });

        test('Форма фильтров', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            // Ищем панель фильтров
            const filterPanel = page.locator('.filters, .filter-panel, [data-testid="filters"], .sidebar').first();

            if (await filterPanel.isVisible()) {
                await expect(filterPanel).toHaveScreenshot('filters-panel.png');
            } else {
                // Пытаемся открыть фильтры
                const filterButton = page.locator('button:has-text("Фильтры"), button:has-text("Filters"), [data-testid="filter-toggle"]').first();
                if (await filterButton.isVisible()) {
                    await filterButton.click();
                    await page.waitForTimeout(500);

                    const openedFilters = page.locator('.filters, .filter-panel, [data-testid="filters"], .sidebar').first();
                    if (await openedFilters.isVisible()) {
                        await expect(openedFilters).toHaveScreenshot('filters-panel-opened.png');
                    }
                }
            }
        });
    });

    test.describe('Таблицы и списки', () => {
        test('Таблица отчетов', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            const table = page.locator('table, .table, [data-testid="table"], .list').first();
            if (await table.isVisible()) {
                await expect(table).toHaveScreenshot('reports-table.png');
            }
        });

        test('Карточки креативов', async ({ page }) => {
            await page.goto('/');
            await creativesPage.creativesTab().click();
            await page.waitForLoadState('networkidle');

            const cards = page.locator('.card, .creative-card, [data-testid="creative-card"]').first();
            if (await cards.isVisible()) {
                await expect(cards).toHaveScreenshot('creative-card.png');
            }
        });

        test('Пагинация', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            const pagination = page.locator('.pagination, [data-testid="pagination"], .pager').first();
            if (await pagination.isVisible()) {
                await expect(pagination).toHaveScreenshot('pagination.png');
            }
        });
    });

    test.describe('Навигация', () => {
        test('Главное меню', async ({ page }) => {
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            const navigation = page.locator('nav, .navigation, .navbar, [data-testid="navigation"]').first();
            if (await navigation.isVisible()) {
                await expect(navigation).toHaveScreenshot('main-navigation.png');
            }
        });

        test('Боковое меню (если есть)', async ({ page }) => {
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            const sidebar = page.locator('.sidebar, .side-menu, [data-testid="sidebar"]').first();
            if (await sidebar.isVisible()) {
                await expect(sidebar).toHaveScreenshot('sidebar-menu.png');
            }
        });

        test('Хлебные крошки', async ({ page }) => {
            await page.goto('/');
            await reportsPage.reportsTab().click();
            await page.waitForLoadState('networkidle');

            const breadcrumbs = page.locator('.breadcrumbs, .breadcrumb, [data-testid="breadcrumbs"]').first();
            if (await breadcrumbs.isVisible()) {
                await expect(breadcrumbs).toHaveScreenshot('breadcrumbs.png');
            }
        });
    });

    test.describe('Сообщения и уведомления', () => {
        test('Сообщение об успехе', async ({ page }) => {
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            // Ищем существующие уведомления
            const successMessage = page.locator('.success, .alert-success, [data-testid="success-message"]').first();
            if (await successMessage.isVisible()) {
                await expect(successMessage).toHaveScreenshot('success-message.png');
            }
        });

        test('Сообщение об ошибке', async ({ page }) => {
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            const errorMessage = page.locator('.error, .alert-error, [data-testid="error-message"]').first();
            if (await errorMessage.isVisible()) {
                await expect(errorMessage).toHaveScreenshot('error-message.png');
            }
        });

        test('Информационное сообщение', async ({ page }) => {
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            const infoMessage = page.locator('.info, .alert-info, [data-testid="info-message"]').first();
            if (await infoMessage.isVisible()) {
                await expect(infoMessage).toHaveScreenshot('info-message.png');
            }
        });
    });
});
