import { test, expect } from '@fixtures/fixtures';
import { Paths } from '@data/paths';
import { Download } from '@playwright/test';
import * as fs from 'fs';

test.describe('Страница отчета', () => {
    test.beforeEach(async ({ page, reportPage, reportsPage }) => {
        await page.goto(Paths.reports);

        try {
            await expect(reportsPage.reportItem().first()).toBeVisible();
        } catch {
            test.skip(true, 'Нет отчетов для проверки');
        }

        await reportsPage.reportItem().first().click();
    });

    test('Отображение всех атрибутов отчета',
        { tag: ['@smoke', '@critical'] },
        async ({ reportPage }) => {
            await expect(reportPage.reportViewSwitch()).toBeVisible();
            await expect(reportPage.reportViewTable()).toBeVisible();
            await expect(reportPage.reportViewDashboard()).toBeVisible();
            await expect(reportPage.reportDownloadButton()).toBeVisible();
        });

    test('Навигация назад к списку отчетов',
        { tag: ['@smoke'] },
        async ({ reportPage, reportsPage }) => {
            await expect(reportPage.reportBackButton()).toBeVisible();
            await reportPage.reportBackButton().click();

            await expect(reportsPage.reportItem().first()).toBeVisible();
        });

    test('Скачивание отчета',
        { tag: ['@regression'] },
        async ({ page, reportPage }) => {
            await test.step('Проверяем наличие кнопки скачивания', async () => {
                await expect(reportPage.reportDownloadButton()).toBeVisible();
            });

            await test.step('Запускаем скачивание отчета', async () => {
                const downloadPromise = new Promise<Download>((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        reject(new Error('Превышено время ожидания скачивания отчета'));
                    }, 15000);

                    page.on('download', (download: Download) => {
                        clearTimeout(timeout);
                        resolve(download);
                    });
                });

                await reportPage.reportDownloadButton().click();

                const download = await downloadPromise;
                if (!download) {
                    throw new Error('Скачивание отчета не произошло, нет события download');
                }

                expect(download.suggestedFilename()).toBeTruthy();
                expect(download.suggestedFilename()).not.toBe('');

                const filename = download.suggestedFilename();
                expect(filename).toMatch(/\.(xlsx|xls|pdf|csv)$/i);

                const downloadPath = await download.path();
                expect(downloadPath).toBeTruthy();
                expect(fs.existsSync(downloadPath)).toBe(true);

                await test.step('Удаляем скачанный файл после теста', async () => {
                    try {
                        if (downloadPath && fs.existsSync(downloadPath)) {
                            fs.unlinkSync(downloadPath);
                        }
                    } catch (error) {
                        console.warn(`Не удалось удалить файл ${downloadPath}:`, error);
                    }
                });
            });
        });
});