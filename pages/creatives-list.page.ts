import { BasePage } from './base.page';
import { Locator } from '@playwright/test';
import { TestIds, Metrics } from '../data/test-ids';
import { FiltersMixin, FilterOptions } from './mixins/filters.mixin';

export interface CreativesFilterOptions extends FilterOptions {
    creativeFormat?: string;
    creativeLanguage?: string;
    creativeCampaign?: string;
}

export class CreativesListPage extends BasePage {
    private filtersMixin: FiltersMixin;

    constructor(page: any) {
        super(page);
        this.filtersMixin = new FiltersMixin(page);
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

    // Дополнительные фильтры для креативов
    creativeFormatFilter(): Locator {
        return this.page.getByTestId(TestIds.filterCreativeFormat);
    }

    creativeLanguageFilter(): Locator {
        return this.page.getByTestId(TestIds.filterCreativeLanguage);
    }

    creativeCampaignFilter(): Locator {
        return this.page.getByTestId(TestIds.filterCreativeCampaign);
    }

    // Селектор выбора метрик для сортировки
    metricsSortButton(): Locator {
        return this.page.getByTestId(TestIds.metricsSortSelector);
    }

    metricsApplyButton(): Locator {
        return this.page.getByTestId(TestIds.metricsApplyButton);
    }

    // Выбор метрик на карточках креативов
    selectMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'creativesItem'));
    }

    // Элементы креативов
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

    // Элементы креативов для Google платформы
    creativesItemDescription(): Locator {
        return this.page.getByTestId(TestIds.creativesItemDescription);
    }

    // Модальное окно выбранных креативов для отчета
    selectedCreativesModal(): Locator {
        return this.page.getByTestId(TestIds.selectedCreativesModal);
    }

    createReportButton(): Locator {
        return this.page.getByTestId(TestIds.createReportButton);
    }

    // Модальное окно метрик для отчета
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

    // Выбор метрик для отчета в модалке
    selectReportMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'report'));
    }

    async selectFilters(filters: CreativesFilterOptions = {}): Promise<void> {
        const {
            search,
            channelType,
            favorite,
            app,
            channelName,
            region,
            date,
            creativeFormat,
            creativeLanguage,
            creativeCampaign
        } = filters;

        if (Object.values(filters).some(value => value)) {
            await this.openFiltersButton().click();
        }

        // Основные фильтры
        if (search) {
            await this.searchInput().fill('');
            await this.searchInput().fill(search);
        }

        if (channelType) {
            await this.filterChannelType().selectOption(channelType);
        }

        if (favorite) {
            await this.filterShowFavorites().click();
        }

        if (app) {
            await this.filterApp().selectOption(app);
        }

        if (channelName) {
            await this.filterChannelName().selectOption(channelName);
        }
        // Настроить дату
        if (date) {
            await this.dateFilter().selectOption(date);
        }

        if (creativeFormat) {
            await this.creativeFormatFilter().selectOption(creativeFormat);
        }

        if (creativeLanguage) {
            await this.creativeLanguageFilter().selectOption(creativeLanguage);
        }

        if (creativeCampaign) {
            await this.creativeCampaignFilter().selectOption(creativeCampaign);
        }

        if (region) {
            await this.filterRegion().selectOption(region);
        }

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

    async selectReportMetrics(metricNames: Metrics[]): Promise<void> {
        for (const metricName of metricNames) {
            await this.selectReportMetric(metricName).click();
        }
    }

    async selectAllReportMetrics(): Promise<void> {
        const allMetrics = Object.values(Metrics);
        await this.selectReportMetrics(allMetrics);
    }

    // Вспомогательные методы для тестов
    async shouldSkipTestIfNoCreatives(): Promise<boolean> {
        const creativesCount = await this.creativesItem().count();
        if (creativesCount === 0 && await this.nothingFoundText().isVisible()) {
            return true;
        }
        return false;
    }

    async clearMetricsForReport(): Promise<void> {
        const metricCheckboxes = this.metricsForReportModal().locator('input[type="checkbox"]');

        const count = await metricCheckboxes.count();
        for (let i = 0; i < count; i++) {
            const checkbox = metricCheckboxes.nth(i);
            const isChecked = await checkbox.isChecked();

            if (isChecked) {
                await checkbox.click();
            }
        }
    }
}