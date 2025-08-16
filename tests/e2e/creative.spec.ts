import { test, expect } from '@playwright/test';
import { CreativePage } from '../../pages/creative.page';
import { CreativesListPage } from '@pages/creatives-list.page';

test.describe('Страница креатива', () => {
    let creativePage: CreativePage;
    let creativesPage: CreativesListPage;

    test.beforeEach(async ({ page }) => {
        creativesPage = new CreativesListPage(page);
        creativePage = new CreativePage(page);

        await page.goto('/creativities');
        await creativesPage.creativesItem().first().click();
    });

    test('Отображение всех атрибутов креатива', async () => {
        await expect(creativePage.creativeName()).toBeVisible();
        await expect(creativePage.creativeMedia()).toBeVisible();
        await expect(creativePage.creativeApp()).toBeVisible();
        await expect(creativePage.creativeChannelName()).toBeVisible();
        await expect(creativePage.creativeRegion()).toBeVisible();
        await expect(creativePage.creativeChannelType()).toBeVisible();
        await expect(creativePage.creativeLanguage()).toBeVisible();
        await expect(creativePage.creativeDate()).toBeVisible();
        await expect(creativePage.creativeDescription()).toBeVisible();
        await expect(creativePage.creativeCampaign()).toBeVisible();
    });


});
