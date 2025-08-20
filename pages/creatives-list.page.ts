import { BasePage } from '@pages/base.page';
import { Locator, Page } from '@playwright/test';
import { TestIds } from '@data/test-ids';
import { Metrics } from '@data/metrics';
import { FiltersMixin, FilterOptions } from '@mixins/filters.mixin';

export interface CreativesFilterOptions extends FilterOptions {
    creativeFormat?: string;
    creativeLanguage?: string;
    creativeCampaign?: string;
    creativeApp?: string;
}

export class CreativesListPage extends BasePage {
    private filtersMixin: FiltersMixin;

    constructor(page: Page) {
        super(page);
        this.filtersMixin = new FiltersMixin(page);
    }

    metricsSortButton(): Locator {
        return this.page.getByTestId(TestIds.metricsSortSelector);
    }

    creativesItem(): Locator {
        return this.page.getByTestId(TestIds.creativesItem);
    }

    creativesItemSelect(): Locator {
        return this.page.getByTestId(TestIds.creativesItemSelect);
    }

    creativesItemHeader(): Locator {
        return this.page.getByTestId(TestIds.creativesItemHeader);
    }

    creativesItemMedia(): Locator {
        return this.page.getByTestId(TestIds.creativesItemMedia);
    }

    creativesItemDescription(): Locator {
        return this.page.getByTestId(TestIds.creativesItemDescription);
    }

    selectedCreativesModal(): Locator {
        return this.page.getByTestId(TestIds.selectedCreativesModal);
    }

    createReportButton(): Locator {
        return this.page.getByTestId(TestIds.createReportButton);
    }

    metricsForReportModal(): Locator {
        return this.page.getByTestId(TestIds.metricsForReportModal);
    }

    goToReportButton(): Locator {
        return this.page.getByTestId(TestIds.goToReportButton);
    }

    cancelReportMetricsButton(): Locator {
        return this.page.getByTestId(TestIds.cancelReportMetricsButton);
    }

    closeReportMetricsModal(): Locator {
        return this.page.getByTestId(TestIds.closeReportMetricsModal);
    }

    selectMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'creativesItem'));
    }

    selectReportMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'report'));
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
    get dateFromFilter() { return this.filtersMixin.dateFromFilter; }
    get dateToFilter() { return this.filtersMixin.dateToFilter; }
    get filterResetButton() { return this.filtersMixin.filterResetButton; }
    get filterCreativeFormat() { return this.filtersMixin.filterCreativeFormat; }
    get filterCreativeLanguage() { return this.filtersMixin.filterCreativeLanguage; }
    get filterCreativeCampaign() { return this.filtersMixin.filterCreativeCampaign; }

    async selectFilters(filters: FilterOptions = {}): Promise<void> {
        return this.filtersMixin.selectFilters(filters);
    }

    async selectCreative(index: number = 0): Promise<void> {
        const creatives = this.page.getByTestId(TestIds.creativesItemSelect);
        await creatives.nth(index).click();
    }

    async selectMultipleCreatives(indices: number[]): Promise<void> {
        for (const index of indices) {
            await this.selectCreative(index);
        }
    }

    async selectAllCreatives(): Promise<void> {
        const creatives = this.page.getByTestId(TestIds.creativesItemSelect);
        const count = await creatives.count();
        for (let i = 0; i < count; i++) {
            await this.selectCreative(i);
        }
    }
}