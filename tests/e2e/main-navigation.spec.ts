import { test, expect } from '@fixtures/fixtures';
import { Paths } from '@data/paths';

test.describe('Основная навигация', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(Paths.home);
    });

    test('Отображение всех вкладок навигации',
        { tag: ['@smoke', '@critical'] },
        async ({ campaignsPage, creativesPage, reportsPage }) => {
            await expect(campaignsPage.campaignsTab()).toBeVisible();
            await expect(creativesPage.creativesTab()).toBeVisible();
            await expect(reportsPage.reportsTab()).toBeVisible();
        });

    test('Навигация на вкладку кампаний',
        { tag: ['@smoke'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsTab()).toBeVisible();
            await campaignsPage.campaignsTab().click();

            await expect(campaignsPage.updateContentButton()).toBeVisible();
        });

    test('Навигация на вкладку креативов',
        { tag: ['@smoke'] },
        async ({ creativesPage }) => {
            await expect(creativesPage.creativesTab()).toBeVisible();
            await creativesPage.creativesTab().click();

            await expect(creativesPage.creativesItem().first()).toBeVisible();
        });

    test('Навигация на вкладку отчетов',
        { tag: ['@smoke'] },
        async ({ reportsPage }) => {
            await expect(reportsPage.reportsTab()).toBeVisible();
            await reportsPage.reportsTab().click();

            await expect(reportsPage.reportItem().first()).toBeVisible();
        });

    test('Сохранение состояния навигации между вкладками',
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage, creativesPage }) => {
            await expect(campaignsPage.campaignsTab()).toBeVisible();
            await campaignsPage.campaignsTab().click();
            await expect(campaignsPage.updateContentButton()).toBeVisible();

            await expect(creativesPage.creativesTab()).toBeVisible();
            await creativesPage.creativesTab().click();
            await expect(creativesPage.creativesItem().first()).toBeVisible();

            await expect(campaignsPage.campaignsTab()).toBeVisible();
            await campaignsPage.campaignsTab().click();
            await expect(campaignsPage.updateContentButton()).toBeVisible();
        });
});
