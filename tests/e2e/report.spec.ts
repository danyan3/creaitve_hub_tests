import { test, expect } from '@playwright/test';
import { ReportPage } from '../../pages/report.page';
import { ReportsListPage } from '@pages/reports-list.page';
import { Metrics } from '@data/test-ids';
import * as fs from 'fs';

test.describe('Страница отчета', () => {
    let reportPage: ReportPage;
    let reportsPage: ReportsListPage;

    test.beforeEach(async ({ page }) => {
        reportPage = new ReportPage(page);
        reportsPage = new ReportsListPage(page);

        await page.goto('/reports');
        await reportsPage.reportItem().first().click();
    });

    test('Отображение всех атрибутов отчета', async () => {
        await expect(reportPage.reportHeader()).toBeVisible();
        await expect(reportPage.reportViewSwitch()).toBeVisible();
        await expect(reportPage.reportViewTable()).toBeVisible();
        await expect(reportPage.reportViewDashboard()).toBeVisible();
        await expect(reportPage.reportDownloadButton()).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.CLICKS)).toBeVisible();
    });

    test('Навигация назад к списку отчетов', async () => {
        await expect(reportPage.reportBackButton()).toBeVisible();
        await reportPage.reportBackButton().click();

        await expect(reportsPage.reportItem()).toBeVisible();
    });

    test('Скачивание отчета', async ({ page }) => {
        await test.step('Проверяем наличие кнопки скачивания', async () => {
            await expect(reportPage.reportDownloadButton()).toBeVisible();
        });

        await test.step('Запускаем скачивание отчета', async () => {
            const downloadPromise = new Promise<any>((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout waiting for download event'));
                }, 15000); // 15 секунд timeout

                page.on('download', (download) => {
                    clearTimeout(timeout);
                    resolve(download);
                });
            });

            await reportPage.reportDownloadButton().click();

            let download;
            try {
                download = await downloadPromise;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Download failed: ${errorMessage}`);
            }

            expect(download.suggestedFilename()).toBeTruthy();

            const filename = download.suggestedFilename();
            expect(filename).toMatch(/\.(xlsx|xls|pdf|csv)$/i);

            const downloadPath = await download.path();
            expect(downloadPath).toBeTruthy();

            await test.step('Очищаем скачанный файл после теста', async () => {
                try {
                    if (fs.existsSync(downloadPath)) {
                        fs.unlinkSync(downloadPath);
                    }
                } catch (error) {
                    console.warn(`Не удалось удалить файл ${downloadPath}:`, error);
                }
            });
        });
    });
});