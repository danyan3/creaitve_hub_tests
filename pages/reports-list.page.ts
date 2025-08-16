import { BasePage } from './base.page';
import { Locator } from '@playwright/test';
import { TestIds } from '../data/test-ids';

export class ReportsListPage extends BasePage {

    reportItem(): Locator {
        return this.page.getByTestId(TestIds.reportItem);
    }

    reportItemDeleteButton(): Locator {
        return this.page.getByTestId(TestIds.reportItemDeleteButton);
    }

    reportItemDownloadButton(): Locator {
        return this.page.getByTestId(TestIds.reportItemDownloadButton);
    }

}
