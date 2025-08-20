import { Metrics } from '@data/metrics';
import { CampaignsListPage } from '@pages/campaigns-list.page';
import { CreativesListPage } from '@pages/creatives-list.page';

export class MetricsUtils {
    static async selectPresetMetrics(
        page: CampaignsListPage,
        metricNames: Metrics[]
    ): Promise<void> {
        for (const metricName of metricNames) {
            await page.selectPresetMetric(metricName).click();
        }
    }

    static async selectReportMetrics(
        page: CreativesListPage,
        metricNames: Metrics[]
    ): Promise<void> {
        for (const metricName of metricNames) {
            await page.selectReportMetric(metricName).click();
        }
    }

    static async getMetricValue(
        page: CampaignsListPage,
        metric: Metrics,
        index: number = 0
    ): Promise<number> {
        const text = await page.selectItemMetric(metric).nth(index).textContent();
        if (!text) {
            throw new Error(`Не удалось получить значение метрики ${metric} для элемента ${index}`);
        }
        return Number(text.replace(/[^\d.,]/g, '').replace(',', '.'));
    }
}
