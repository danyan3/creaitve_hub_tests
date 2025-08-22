import { BasePage } from '@pages/base.page';
import { Locator } from '@playwright/test';
import { TestIds } from '@data/test-ids';

export class ReportsListPage extends BasePage {
    reportItem(): Locator {
        return this.page.getByTestId(TestIds.reportItem);
    }

    reportItemByIndex(index: number): Locator {
        return this.page.getByTestId(TestIds.reportItem).nth(index);
    }

    reportItemDeleteButton(): Locator {
        return this.page.getByTestId(TestIds.reportItemDeleteButton);
    }

    reportItemDeleteButtonByIndex(index: number): Locator {
        return this.page.getByTestId(TestIds.reportItemDeleteButton).nth(index);
    }

    reportItemDownloadButton(): Locator {
        return this.page.getByTestId(TestIds.reportItemDownloadButton);
    }

    reportItemDownloadButtonByIndex(index: number): Locator {
        return this.page.getByTestId(TestIds.reportItemDownloadButton).nth(index);
    }

    // Метод для получения количества элементов отчетов
    reportItemsCount(): Promise<number> {
        return this.page.getByTestId(TestIds.reportItem).count();
    }
}
