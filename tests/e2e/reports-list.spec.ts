import { test, expect } from '@fixtures/fixtures';
import { Paths } from '@data/paths';

test.describe('Страница списка отчетов', () => {
    test.beforeEach(async ({ page, reportsPage }) => {
        await page.goto(Paths.home);
        await reportsPage.reportsTab().click();
    });

    test('Отображение всех атрибутов отчета',
        { tag: ['@smoke', '@critical'] },
        async ({ reportsPage }) => {
            await expect(reportsPage.reportItem()).toBeVisible();
            await expect(reportsPage.reportItemDeleteButton()).toBeVisible();
            await expect(reportsPage.reportItemDownloadButton()).toBeVisible();
        });

    test('Удаление отчета',
        { tag: ['@critical'] },
        async ({ reportsPage }) => {
            const reportItem = reportsPage.reportItem().last();
            await expect(reportItem).toBeVisible();
            await reportsPage.reportItemDeleteButton().last().click();

            await expect(reportItem).not.toBeVisible();
        });

});
