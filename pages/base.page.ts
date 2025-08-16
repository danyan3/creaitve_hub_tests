import { Page, Locator } from '@playwright/test';
import { TestIds } from '../data/test-ids';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(urlOrPath: string): Promise<void> {
        await this.page.goto(urlOrPath);
    }

    getByTestId(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    campaignsTab(): Locator {
        return this.page.getByTestId(TestIds.tabCampaigns);
    }

    creativesTab(): Locator {
        return this.page.getByTestId(TestIds.tabCreatives);
    }

    reportsTab(): Locator {
        return this.page.getByTestId(TestIds.tabReports);
    }

    nothingFoundText(): Locator {
        return this.page.getByTestId(TestIds.nothingFoundText);
    }

} 