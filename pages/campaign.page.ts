import { BasePage } from './base.page';
import { Locator } from '@playwright/test';
import { TestIds, Metrics } from '../data/test-ids';

export class CampaignPage extends BasePage {

    campaignBackButton(): Locator {
        return this.page.getByTestId(TestIds.campaignBackButton);
    }

    campaignHeader(): Locator {
        return this.page.getByTestId(TestIds.campaignHeader);
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
