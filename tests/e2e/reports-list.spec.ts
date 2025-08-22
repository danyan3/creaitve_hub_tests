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
            await expect(reportsPage.reportItem().first()).toBeVisible();
            await expect(reportsPage.reportItemDeleteButton().first()).toBeVisible();
            await expect(reportsPage.reportItemDownloadButton().first()).toBeVisible();
        });

    test('Удаление отчета',
        { tag: ['@regression'] },
        async ({ reportsPage }) => {
            await expect(reportsPage.reportItem().first()).toBeVisible();
            const initialCount = await reportsPage.reportItemsCount();
            if (initialCount === 0) {
                test.skip(true, 'Нет отчетов для удаления');
            }

            const lastIndex = initialCount - 1;
            const reportItem = reportsPage.reportItemByIndex(lastIndex);
            const deleteButton = reportsPage.reportItemDeleteButtonByIndex(lastIndex);

            await expect(reportItem).toBeVisible();
            await expect(deleteButton).toBeVisible();

            await deleteButton.click();

            await expect(reportItem).not.toBeVisible();

            const finalCount = await reportsPage.reportItemsCount();
            expect(finalCount).toBe(initialCount - 1);
        });

});
