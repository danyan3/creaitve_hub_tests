import { test, expect } from '@fixtures/fixtures';
import { ReportsListPage } from '@pages/reports-list.page';

test.describe('Страница списка отчетов', () => {
    let reportsPage: ReportsListPage;

    test.beforeEach(async ({ page }) => {
        reportsPage = new ReportsListPage(page);
        await page.goto('/');
        await reportsPage.reportsTab().click();
    });

    test('Отображение всех атрибутов отчета', { tag: ['@smoke', '@critical'] }, async () => {
        await expect(reportsPage.reportItem()).toBeVisible();
        await expect(reportsPage.reportItemDeleteButton()).toBeVisible();
        await expect(reportsPage.reportItemDownloadButton()).toBeVisible();
    });
});
