import { expect, Locator, Page } from '@playwright/test';
import { TestIds } from '@data/test-ids';
import { ValueMappings } from '@data/value-mappings';

export interface FilterOptions {
    search?: string;
    app?: string;
    channelName?: string;
    region?: string;
    creativeFormat?: string;
    creativeLanguage?: string;
}

export class FiltersMixin {
    constructor(protected page: Page) { }

    searchInput(): Locator {
        return this.page.getByTestId(TestIds.filterSearchInput);
    }

    openFiltersButton(): Locator {
        return this.page.getByTestId(TestIds.filterOpenButton);
    }

    filterChannelType(): Locator {
        return this.page.getByTestId(TestIds.filterChannelType);
    }

    filterChannelTypeMedia(): Locator {
        return this.page.getByTestId(TestIds.filterChannelTypeMedia);
    }

    filterChannelTypePerformance(): Locator {
        return this.page.getByTestId(TestIds.filterChannelTypePerformance);
    }

    filterShowFavorites(): Locator {
        return this.page.getByTestId(TestIds.filterShowFavorites);
    }

    filterApp(): Locator {
        return this.page.getByTestId(TestIds.filterApp);
    }

    filterChannelName(): Locator {
        return this.page.getByTestId(TestIds.filterChannelName);
    }

    filterRegion(): Locator {
        return this.page.getByTestId(TestIds.filterRegion);
    }

    dateFromFilter(): Locator {
        return this.page.getByTestId(TestIds.filterDateFrom);
    }

    dateToFilter(): Locator {
        return this.page.getByTestId(TestIds.filterDateTo);
    }

    filterResetButton(): Locator {
        return this.page.getByTestId(TestIds.filterResetButton);
    }

    filterCreativeFormat(): Locator {
        return this.page.getByTestId(TestIds.filterCreativeFormat);
    }

    filterCreativeLanguage(): Locator {
        return this.page.getByTestId(TestIds.filterCreativeLanguage);
    }

    filterCreativeCampaign(): Locator {
        return this.page.getByTestId(TestIds.filterCreativeCampaign);
    }

    async openFiltersIfClosed(): Promise<void> {
        if (!await this.filterApp().isVisible()) {
            await this.openFiltersButton().click();
        }

        await this.page.waitForTimeout(300);
    }

    async selectFilters(filters: FilterOptions = {}): Promise<void> {
        const {
            search,
            app,
            channelName,
            region,
            creativeFormat,
            creativeLanguage,
        } = filters;

        await this.openFiltersIfClosed();

        if (search) {
            await this.searchInput().fill('');
            await this.searchInput().fill(search);
        }

        if (app) {
            await this.selectOptionInCustomSelect(this.filterApp(), app, ValueMappings.apps);
        }

        if (channelName) {
            await this.selectOptionInCustomSelect(this.filterChannelName(), channelName, ValueMappings.channels);
        }

        if (region) {
            await this.selectOptionInCustomSelect(this.filterRegion(), region, ValueMappings.regions);
        }

        if (creativeFormat) {
            await this.selectOptionInCustomSelect(this.filterCreativeFormat(), creativeFormat, ValueMappings.creativeFormats);
        }

        if (creativeLanguage) {
            await this.selectOptionInCustomSelect(this.filterCreativeLanguage(), creativeLanguage, ValueMappings.languages);
        }
    }

    protected async selectOptionInCustomSelect(selectLocator: Locator, displayName: string, valueMapping: Record<string, string>): Promise<void> {
        const optionValue = valueMapping[displayName];
        const currentValue = await selectLocator.getAttribute('value');

        if (currentValue === displayName) {
            return;
        }

        await selectLocator.click();

        await expect(selectLocator).toBeVisible();

        const option = this.page.locator(`[role="option"][value="${optionValue}"]`);
        await option.click();
    }
}
