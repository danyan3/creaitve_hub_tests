import { test, expect } from './fixtures/fixtures';
import { CampaignPage } from '../../pages/campaign.page';
import { Metrics } from '../../data/test-ids';
import { CampaignsListPage } from '@pages/campaigns-list.page';

test.describe('Страница кампании', () => {
    let campaignPage: CampaignPage;
    let campaignsPage: CampaignsListPage;

    test.beforeEach(async ({ page }) => {
        campaignsPage = new CampaignsListPage(page);
        campaignPage = new CampaignPage(page);

        await page.goto('/campaigns');
        await campaignsPage.campaignsItem().first().click();
    });

    test('Отображение всех атрибутов кампании', async () => {
        await expect(campaignPage.campaignHeader()).toBeVisible();
        await expect(campaignPage.campaignName()).toBeVisible();
        await expect(campaignPage.campaignDescription()).toBeVisible();
        await expect(campaignPage.campaignPreviewImg()).toBeVisible();
        await expect(campaignPage.campaignApp()).toBeVisible();
        await expect(campaignPage.campaignChannelName()).toBeVisible();
        await expect(campaignPage.campaignRegion()).toBeVisible();
        await expect(campaignPage.campaignDate()).toBeVisible();
        await expect(campaignPage.campaignChannelType()).toBeVisible();
        await expect(campaignPage.campaignIsFavorite()).toBeVisible();
    });

    test('Навигация назад к списку кампаний', async ({ campaignsPage }) => {
        await expect(campaignPage.campaignBackButton()).toBeVisible();
        await campaignPage.campaignBackButton().click();

        await expect(campaignsPage.updateContentButton()).toBeVisible();
    })

    test(`Открытие страницы креатива из списка и проверка соответствия метрик ${Metrics.COST}, ${Metrics.IMPRESSIONS}`, async ({ creativesPage, creativePage }) => {
        let costValueInList: string | null;
        let impressionsValueInList: string | null;
        let costValueOnPage: string | null;
        let impressionsValueOnPage: string | null;

        await test.step('Проверяем наличие элементов креативов в списке', async () => {
            await expect(creativesPage.creativesItem()).toBeVisible();
        });

        await test.step('Получаем значения метрик из списка креативов', async () => {
            const firstCreativeItem = creativesPage.creativesItem().first();
            const costMetricInList = creativesPage.selectMetric(Metrics.COST).first();
            const impressionsMetricInList = creativesPage.selectMetric(Metrics.IMPRESSIONS).first();

            costValueInList = await costMetricInList.textContent();
            impressionsValueInList = await impressionsMetricInList.textContent();
        });

        await test.step('Переходим на страницу креатива', async () => {
            const firstCreativeItem = creativesPage.creativesItem().first();
            await firstCreativeItem.click();
        });

        await test.step('Проверяем загрузку страницы креатива', async () => {
            await expect(creativePage.creativeName()).toBeVisible();
            await expect(creativePage.selectMetric(Metrics.COST)).toBeVisible();
            await expect(creativePage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();
        });

        await test.step('Получаем значения метрик на странице креатива', async () => {
            const costMetricOnPage = creativePage.selectMetric(Metrics.COST);
            const impressionsMetricOnPage = creativePage.selectMetric(Metrics.IMPRESSIONS);

            costValueOnPage = await costMetricOnPage.textContent();
            impressionsValueOnPage = await impressionsMetricOnPage.textContent();
        });

        await test.step('Сравниваем метрики из списка с метриками на странице', async () => {
            expect(costValueInList).toBe(costValueOnPage);
            expect(impressionsValueInList).toBe(impressionsValueOnPage);
        });
    })



});
