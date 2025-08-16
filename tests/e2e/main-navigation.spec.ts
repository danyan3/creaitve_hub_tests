import { test, expect } from './fixtures/fixtures';

test.describe('Основная навигация', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Отображение всех вкладок навигации', async ({ campaignsPage, creativesPage, reportsPage }) => {
        await expect(campaignsPage.campaignsTab()).toBeVisible();
        await expect(creativesPage.creativesTab()).toBeVisible();
        await expect(reportsPage.reportsTab()).toBeVisible();
    });

    test('Навигация на вкладку кампаний', async ({ campaignsPage }) => {
        await expect(campaignsPage.campaignsTab()).toBeVisible();
        await campaignsPage.campaignsTab().click();

        await expect(campaignsPage.updateContentButton()).toBeVisible();
    });

    test('Навигация на вкладку креативов', async ({ creativesPage }) => {
        await expect(creativesPage.creativesTab()).toBeVisible();
        await creativesPage.creativesTab().click();

        await expect(creativesPage.creativesItem()).toBeVisible();
    });

    test('Навигация на вкладку отчетов', async ({ reportsPage }) => {
        await expect(reportsPage.reportsTab()).toBeVisible();
        await reportsPage.reportsTab().click();

        await expect(reportsPage.reportItem()).toBeVisible();
    });

    test('Сохранение состояния навигации между вкладками', async ({ campaignsPage, creativesPage }) => {
        await expect(campaignsPage.campaignsTab()).toBeVisible();
        await campaignsPage.campaignsTab().click();
        await expect(campaignsPage.updateContentButton()).toBeVisible();

        await expect(creativesPage.creativesTab()).toBeVisible();
        await creativesPage.creativesTab().click();
        await expect(creativesPage.creativesItem()).toBeVisible();

        await expect(campaignsPage.campaignsTab()).toBeVisible();
        await campaignsPage.campaignsTab().click();
        await expect(campaignsPage.updateContentButton()).toBeVisible();
    });
});
