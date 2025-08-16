import { Locator } from '@playwright/test';
import { TestIds } from '../../data/test-ids';

export interface FilterOptions {
    search?: string;
    channelType?: string;
    favorite?: boolean;
    app?: string;
    channelName?: string;
    region?: string;
    date?: string;
}

export class FiltersMixin {
    constructor(protected page: any) { }

    searchInput(): Locator {
        return this.page.getByTestId(TestIds.filterSearchInput);
    }

    openFiltersButton(): Locator {
        return this.page.getByTestId(TestIds.filterOpenButton);
    }

    async openFiltersIfClosed(): Promise<void> {
        const filtersButton = this.openFiltersButton();

        const ariaExpanded = await filtersButton.getAttribute('aria-expanded');
        const dataExpanded = await filtersButton.getAttribute('data-expanded');
        const classAttr = await filtersButton.getAttribute('class');

        const isActive = ariaExpanded === 'true' ||
            dataExpanded === 'true' ||
            (classAttr && classAttr.includes('active')) ||
            (classAttr && classAttr.includes('expanded'));

        if (!isActive) {
            await filtersButton.click();
            await this.page.waitForTimeout(300);
        }
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

    dateFilter(): Locator {
        return this.page.getByTestId(TestIds.filterDate);
    }

    datePicker(): Locator {
        return this.page.getByTestId(TestIds.filterDatePicker);
    }

    async selectFilters(filters: FilterOptions = {}): Promise<void> {
        const {
            search,
            channelType,
            favorite,
            app,
            channelName,
            region,
            date,
        } = filters;

        if (Object.values(filters).some(value => value)) {
            await this.openFiltersIfClosed();
        }

        if (search) {
            await this.searchInput().fill('');
            await this.searchInput().fill(search);
        }

        if (channelType) {
            await this.filterChannelType().selectOption(channelType);
        }

        if (favorite) {
            const currentState = await this.filterShowFavorites().isChecked();
            if (currentState !== favorite) {
                await this.filterShowFavorites().click();
            }
        }

        if (app) {
            await this.filterApp().selectOption(app);
        }

        if (channelName) {
            await this.filterChannelName().selectOption(channelName);
        }

        if (region) {
            await this.filterRegion().selectOption(region);
        }

        if (date) {
            await this.dateFilter().selectOption(date);
        }

    }
}
