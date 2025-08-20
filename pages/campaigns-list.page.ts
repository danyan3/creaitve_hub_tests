import { BasePage } from '@pages/base.page';
import { Locator, Page } from '@playwright/test';
import { TestIds } from '@data/test-ids';
import { Metrics } from '@data/metrics';
import { FiltersMixin, FilterOptions } from '@mixins/filters.mixin';

export class CampaignsListPage extends BasePage {
    private filtersMixin: FiltersMixin;

    constructor(page: Page) {
        super(page);
        this.filtersMixin = new FiltersMixin(page);
    }

    updateContentButton(): Locator {
        return this.page.getByTestId(TestIds.updateContentButton);
    }

    campaignsItem(): Locator {
        return this.page.getByTestId(TestIds.campaignItem);
    }

    campaignItemFavorite(): Locator {
        return this.page.getByTestId(TestIds.campaignItemFavorite);
    }

    metricsSortButton(): Locator {
        return this.page.getByTestId(TestIds.metricsSortSelector);
    }

    metricsApplyButton(): Locator {
        return this.page.getByTestId(TestIds.metricsApplyButton);
    }

    metricsCancelButton(): Locator {
        return this.page.getByTestId(TestIds.metricsCancelButton);
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

    async selectFilters(filters: FilterOptions = {}): Promise<void> {
        return this.filtersMixin.selectFilters(filters);
    }
}
