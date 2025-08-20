import { test, expect } from '@fixtures/fixtures';
import { Paths } from '@data/paths';

test.describe('Страница кампании', () => {
    test.beforeEach(async ({ page, campaignsPage }) => {
        await page.goto(Paths.campaigns);
        await campaignsPage.campaignsItem().first().click();
    });

    test('Отображение всех атрибутов кампании',
        { tag: ['@smoke', '@critical'] },
        async ({ campaignPage }) => {
            await expect(campaignPage.campaignDescription()).toBeVisible();
            await expect(campaignPage.campaignPreviewImg()).toBeVisible();
            await expect(campaignPage.campaignApp()).toBeVisible();
            await expect(campaignPage.campaignChannelName()).toBeVisible();
            await expect(campaignPage.campaignRegion()).toBeVisible();
            await expect(campaignPage.campaignDate()).toBeVisible();
            await expect(campaignPage.campaignChannelType()).toBeVisible();
            await expect(campaignPage.campaignIsFavorite()).toBeVisible();
        });

    test('Навигация назад к списку кампаний',
        { tag: ['@smoke'] },
        async ({ campaignPage, campaignsPage }) => {
            await expect(campaignPage.campaignBackButton()).toBeVisible();
            await campaignPage.campaignBackButton().click();

            await expect(campaignsPage.updateContentButton()).toBeVisible();
        });
});
