import { BasePage } from './base.page';
import { Locator, expect } from '@playwright/test';
import { TestIds, Metrics } from '../data/test-ids';
import { FiltersMixin, FilterOptions } from './mixins/filters.mixin';

export class CampaignsListPage extends BasePage {
    private filtersMixin: FiltersMixin;

    constructor(page: any) {
        super(page);
        this.filtersMixin = new FiltersMixin(page);
    }

    updateContentButton(): Locator {
        return this.page.getByTestId(TestIds.updateContentButton);
    }

    get searchInput() { return this.filtersMixin.searchInput; }
    get openFiltersButton() { return this.filtersMixin.openFiltersButton; }
    get openFiltersIfClosed() { return this.filtersMixin.openFiltersIfClosed; }
    get filterChannelType() { return this.filtersMixin.filterChannelType; }
    get filterChannelTypeMedia() { return this.filtersMixin.filterChannelTypeMedia; }
    get filterChannelTypePerformance() { return this.filtersMixin.filterChannelTypePerformance; }
    get filterShowFavorites() { return this.filtersMixin.filterShowFavorites; }
    get filterApp() { return this.filtersMixin.filterApp; }
    get filterChannelName() { return this.filtersMixin.filterChannelName; }
    get filterRegion() { return this.filtersMixin.filterRegion; }
    get dateFilter() { return this.filtersMixin.dateFilter; }
    get datePicker() { return this.filtersMixin.datePicker; }

    campaignsItem(): Locator {
        return this.page.getByTestId(TestIds.campaignItem);
    }

    campaignItemIsFavorite(): Locator {
        return this.page.getByTestId(TestIds.campaignItemIsFavorite);
    }

    metricsSortButton(): Locator {
        return this.page.getByTestId(TestIds.metricsSortSelector);
    }

    selectItemMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'campaignItem'));
    }

    selectPresetMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'metric'));
    }

    selectSortMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'sort'));
    }

    async setDateRange(dateFrom?: string, dateTo?: string): Promise<void> {
        if (dateFrom) {
            await this.dateFilter().selectOption(dateFrom);
        }
        if (dateTo) {
            await this.dateFilter().selectOption(dateTo);
        }
    }

    async selectFilters(filters: FilterOptions = {}): Promise<void> {
        return this.filtersMixin.selectFilters(filters);
    }

    async selectMetrics(metricNames: Metrics[]): Promise<void> {
        for (const metricName of metricNames) {
            await this.selectPresetMetric(metricName).click();
        }
    }

    async selectAllMetrics(): Promise<void> {
        const allMetrics = Object.values(Metrics);
        await this.selectMetrics(allMetrics);
    }

    async getMetricValue(metric: Metrics, itemIndex: number = 0): Promise<number> {
        const metricLocator = this.selectItemMetric(metric).nth(itemIndex);
        const metricText = await metricLocator.textContent();
        if (!metricText) {
            return 0;
        }

        const numericValue = metricText.replace(/[^\d.,]/g, '').replace(',', '.');
        return parseFloat(numericValue) || 0;
    }

    async shouldSkipTestIfNoCampaigns(): Promise<boolean> {
        const campaignsCount = await this.campaignsItem().count();
        if (campaignsCount === 0 && await this.nothingFoundText().isVisible()) {
            return true;
        }
        return false;
    }

    async checkSortingOrder(metric: Metrics, isAscending: boolean = false): Promise<void> {
        const campaignsCount = await this.campaignsItem().count();
        const itemsToCheck = Math.min(campaignsCount, 3);

        if (itemsToCheck > 0) {
            const metricValues: number[] = [];

            // Собираем значения метрики для первых элементов
            for (let i = 0; i < itemsToCheck; i++) {
                const metricValue = await this.getMetricValue(metric, i);
                metricValues.push(metricValue);
            }

            // Проверяем порядок сортировки
            for (let i = 0; i < metricValues.length - 1; i++) {
                if (isAscending) {
                    expect(metricValues[i]).toBeLessThanOrEqual(metricValues[i + 1]);
                } else {
                    expect(metricValues[i]).toBeGreaterThanOrEqual(metricValues[i + 1]);
                }
            }
        }
    }

    async setupMetricForSorting(metric: Metrics): Promise<void> {
        await this.metricsSortButton().click();

        const metricCheckbox = this.selectPresetMetric(metric);
        const isChecked = await metricCheckbox.isChecked();

        if (!isChecked) {
            await metricCheckbox.click();
        }

        await this.selectSortMetric(metric).click();
    }
}
