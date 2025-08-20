import { test, expect } from '@fixtures/fixtures';
import { Paths } from '@data/paths';

test.describe('Страница креатива', () => {
    test.beforeEach(async ({ page, creativesPage }) => {
        await page.goto(Paths.creativities);
        await creativesPage.creativesItem().first().click();
    });

    test('Отображение всех атрибутов креатива',
        { tag: ['@smoke', '@critical'] },
        async ({ creativePage }) => {
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
