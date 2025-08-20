import { BasePage } from '@pages/base.page';
import { Locator } from '@playwright/test';
import { TestIds } from '@data/test-ids';
import { Metrics } from '@data/metrics';

export class CreativePage extends BasePage {
    creativeName(): Locator {
        return this.page.getByTestId(TestIds.creativeName);
    }

    creativeMedia(): Locator {
        return this.page.getByTestId(TestIds.creativeMedia);
    }

    creativeMakeReportButton(): Locator {
        return this.page.getByTestId(TestIds.creativeMakeReportButton);
    }

    selectMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'creative'));
    }

    creativeApp(): Locator {
        return this.page.getByTestId(TestIds.creativeApp);
    }

    creativeChannelName(): Locator {
        return this.page.getByTestId(TestIds.creativeChannelName);
    }

    creativeRegion(): Locator {
        return this.page.getByTestId(TestIds.creativeRegion);
    }

    creativeLanguage(): Locator {
        return this.page.getByTestId(TestIds.creativeLanguage);
    }

    creativeChannelType(): Locator {
        return this.page.getByTestId(TestIds.creativeChannelType);
    }

    creativeDate(): Locator {
        return this.page.getByTestId(TestIds.creativeDate);
    }

    creativeDescription(): Locator {
        return this.page.getByTestId(TestIds.creativeDescription);
    }

    creativeCampaign(): Locator {
        return this.page.getByTestId(TestIds.creativeCampaign);
    }
}
