import { BasePage } from './base.page';
import { Locator } from '@playwright/test';
import { TestIds, Metrics } from '../data/test-ids';

export class ReportPage extends BasePage {

    reportHeader(): Locator {
        return this.page.getByTestId(TestIds.reportHeader);
    }

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

    selectMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'reportSort'));
    }

    reportBackButton(): Locator {
        return this.page.getByTestId(TestIds.reportBackButton);
    }

}
