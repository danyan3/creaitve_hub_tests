import { test as base, type Page } from '@playwright/test';
import { CampaignPage } from '../../../pages/campaign.page';
import { CreativePage } from '../../../pages/creative.page';
import { ReportPage } from '../../../pages/report.page';
import { CampaignsListPage } from '@pages/campaigns-list.page';
import { CreativesListPage } from '@pages/creatives-list.page';
import { ReportsListPage } from '@pages/reports-list.page';

// Фикстуры для страниц
export const test = base.extend<{
    campaignPage: CampaignPage;
    creativePage: CreativePage;
    reportPage: ReportPage;
    campaignsPage: CampaignsListPage;
    creativesPage: CreativesListPage;
    reportsPage: ReportsListPage;
}>({
    campaignPage: async ({ page }, use) => {
        const campaignPage = new CampaignPage(page);
        await use(campaignPage);
    },

    creativePage: async ({ page }, use) => {
        const creativePage = new CreativePage(page);
        await use(creativePage);
    },

    reportPage: async ({ page }, use) => {
        const reportPage = new ReportPage(page);
        await use(reportPage);
    },

    campaignsPage: async ({ page }, use) => {
        const campaignsPage = new CampaignsListPage(page);
        await use(campaignsPage);
    },

    creativesPage: async ({ page }, use) => {
        const creativesPage = new CreativesListPage(page);
        await use(creativesPage);
    },

    reportsPage: async ({ page }, use) => {
        const reportsPage = new ReportsListPage(page);
        await use(reportsPage);
    },

});

export { expect } from '@playwright/test';
