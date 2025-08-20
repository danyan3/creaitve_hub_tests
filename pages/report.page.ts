import { BasePage } from '@pages/base.page';
import { Locator } from '@playwright/test';
import { TestIds } from '@data/test-ids';
import { Metrics } from '@data/metrics';

export class ReportPage extends BasePage {
    reportViewSwitch(): Locator {
        return this.page.getByTestId(TestIds.reportViewSwitch);
    }

    reportViewTable(): Locator {
        return this.page.getByTestId(TestIds.reportViewTable);
    }

    reportViewDashboard(): Locator {
        return this.page.getByTestId(TestIds.reportViewDashboard);
    }

    reportDownloadButton(): Locator {
        return this.page.getByTestId(TestIds.reportDownloadButton);
    }

    reportBackButton(): Locator {
        return this.page.getByTestId(TestIds.reportBackButton);
    }

    selectMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'reportSort'));
    }

    creativesItemReport(): Locator {
        return this.page.locator(`[data-testid^="${TestIds.reportCreativesItem}"]`);
    }
}
