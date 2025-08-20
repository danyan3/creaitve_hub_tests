import { expect } from '@playwright/test';
import { Metrics } from '@data/metrics';
import { CampaignsListPage } from '@pages/campaigns-list.page';
import { MetricsUtils } from '@utils/metrics.utils';

export class SortingUtils {
    static async checkSortingOrder(
        page: CampaignsListPage,
        metric: Metrics,
        isAscending: boolean = false
    ): Promise<void> {
        await expect(page.selectSortMetric(metric)).toBeVisible();

        await page.selectSortMetric(metric).click();

        if (!isAscending) {
            await expect(page.selectSortMetric(metric)).toBeVisible();
            await page.selectSortMetric(metric).click();
        }

        await expect(page.campaignsItem().first()).toBeVisible();

        const campaignsCount = await page.campaignsItem().count();
        if (campaignsCount < 2) return;

        const firstValue = await MetricsUtils.getMetricValue(page, metric, 0);
        const secondValue = await MetricsUtils.getMetricValue(page, metric, 1);

        if (isAscending) {
            expect(firstValue).toBeLessThanOrEqual(secondValue);
        } else {
            expect(firstValue).toBeGreaterThanOrEqual(secondValue);
        }
    }

    static async setupMetricForSorting(
        page: CampaignsListPage,
        metric: Metrics
    ): Promise<void> {
        await expect(page.metricsSortButton()).toBeVisible();
        await page.metricsSortButton().click();

        const metricCheckbox = page.selectPresetMetric(metric);
        const isChecked = await metricCheckbox.isChecked();

        if (!isChecked) {
            await metricCheckbox.click();
        }

        await page.metricsApplyButton().click();
    }
}
