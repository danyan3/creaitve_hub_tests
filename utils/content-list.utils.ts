import { CampaignsListPage } from '@pages/campaigns-list.page';
import { CreativesListPage } from '@pages/creatives-list.page';

export class ContentListUtils {
    static async shouldSkipTestIfNoCampaigns(page: CampaignsListPage): Promise<boolean> {
        await page.campaignsItem().first().waitFor({ state: 'visible', timeout: 5000 });
        const campaignsCount = await page.campaignsItem().count();
        return campaignsCount === 0 && await page.nothingFoundText().isVisible();
    }

    static async shouldSkipTestIfNoCreatives(page: CreativesListPage): Promise<boolean> {
        await page.creativesItem().first().waitFor({ state: 'visible', timeout: 5000 });
        const creativesCount = await page.creativesItem().count();
        return creativesCount === 0 && await page.nothingFoundText().isVisible();
    }

}
