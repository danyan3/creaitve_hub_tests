import { BasePage } from '@pages/base.page';
import { Locator } from '@playwright/test';
import { TestIds } from '@data/test-ids';
import { Metrics } from '@data/metrics';

export class CampaignPage extends BasePage {
    campaignBackButton(): Locator {
        return this.page.getByTestId(TestIds.campaignBackButton);
    }

    campaignName(): Locator {
        return this.page.getByTestId(TestIds.campaignName);
    }

    campaignDescription(): Locator {
        return this.page.getByTestId(TestIds.campaignDescription);
    }

    campaignPreviewImg(): Locator {
        return this.page.getByTestId(TestIds.campaignPreviewImg);
    }

    campaignApp(): Locator {
        return this.page.getByTestId(TestIds.campaignApp);
    }

    campaignChannelName(): Locator {
        return this.page.getByTestId(TestIds.campaignChannelName);
    }

    campaignRegion(): Locator {
        return this.page.getByTestId(TestIds.campaignRegion);
    }

    campaignDate(): Locator {
        return this.page.getByTestId(TestIds.campaignDate);
    }

    campaignChannelType(): Locator {
        return this.page.getByTestId(TestIds.campaignChannelType);
    }

    campaignIsFavorite(): Locator {
        return this.page.getByTestId(TestIds.campaignIsFavorite);
    }

    selectMetric(metric: Metrics): Locator {
        return this.page.getByTestId(TestIds.getMetricTestId(metric, 'campaign'));
    }
}
