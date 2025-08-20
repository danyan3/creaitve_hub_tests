import { test, expect } from '@fixtures/fixtures';
import { Metrics } from '@data/metrics';
import { TestData } from '@data/test-data';
import { Paths } from '@data/paths';
import { ContentListUtils, SortingUtils } from '@utils/index';

test.describe('Страница списка кампаний', () => {
    test.beforeEach(async ({ page, campaignsPage }) => {
        await page.goto(Paths.home);
        await campaignsPage.campaignsTab().click();
    });

    test('Добавление и удаление кампании из избранного',
        { tag: ['@smoke', '@critical'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            const firstCampaign = campaignsPage.campaignsItem().first();
            const favoriteButton = firstCampaign.locator(campaignsPage.campaignItemFavorite());

            const favoriteIcon = favoriteButton.locator('svg');
            const isFavorite = await favoriteIcon.getAttribute('data-active') === 'true';

            if (isFavorite) {
                await favoriteButton.click();
                await expect(favoriteIcon).toHaveAttribute('data-active', 'false');
            }

            await campaignsPage.filterShowFavorites().click();
            await expect(firstCampaign).not.toBeVisible();

            await campaignsPage.filterShowFavorites().click();

            await favoriteButton.click();
            await expect(favoriteIcon).toHaveAttribute('data-active', 'true');

            await campaignsPage.filterShowFavorites().click();
            await expect(firstCampaign).toBeVisible();

            await favoriteButton.click();
            await campaignsPage.page.waitForTimeout(1000);
            await campaignsPage.filterShowFavorites().dblclick();
            await expect(firstCampaign).not.toBeVisible();
        });

    test(`Проверка фильтра «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@smoke'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypeMedia().click();

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignChannelType()).toBeVisible();
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.media);
        });

    test(`Проверка фильтра «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@smoke'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignChannelType()).toBeVisible();
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.performance);
        });

    test(`Фильтр по продукту «${TestData.apps.kinopoisk}» | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypeMedia().click();

            await campaignsPage.selectFilters({ app: TestData.apps.kinopoisk });
            await expect(campaignsPage.filterApp()).toHaveValue(TestData.apps.kinopoisk);

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignChannelType()).toBeVisible();
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.media);
            await expect(campaignPage.campaignApp()).toHaveText(TestData.apps.kinopoisk);
        });

    test(`Фильтр по платформе ${TestData.channelNames.google} | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@regression'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypeMedia().click();

            await campaignsPage.selectFilters({ channelName: TestData.channelNames.google });
            await expect(campaignsPage.filterChannelName()).toHaveValue(TestData.channelNames.google);

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignChannelType()).toBeVisible();
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.media);
            await expect(campaignPage.campaignChannelName()).toHaveText(TestData.channelNames.google);
        });

    test(`Фильтр по стране ${TestData.regions.kazakhstan} | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();

            await campaignsPage.selectFilters({ region: TestData.regions.kazakhstan });
            await expect(campaignsPage.filterRegion()).toHaveValue(TestData.regions.kazakhstan);

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignChannelType()).toBeVisible();
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.performance);
            await expect(campaignPage.campaignRegion()).toHaveText(TestData.regions.kazakhstan);
        });

    test(`Фильтр по продукту «${TestData.apps.yandexVideo}» | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();

            await campaignsPage.selectFilters({ app: TestData.apps.yandexVideo });
            await expect(campaignsPage.filterApp()).toHaveValue(TestData.apps.yandexVideo);

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignApp()).toBeVisible();
            await expect(campaignPage.campaignApp()).toHaveText(TestData.apps.yandexVideo);
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.performance);
        });

    test(`Применение сложных фильтров продукт «${TestData.apps.yandexWeather}» | площадка «${TestData.channelNames.google}» | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@regression'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();

            await campaignsPage.selectFilters({ app: TestData.apps.yandexWeather, channelName: TestData.channelNames.google });

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignApp()).toBeVisible();
            await expect(campaignPage.campaignApp()).toHaveText(TestData.apps.yandexWeather);
            await expect(campaignPage.campaignChannelName()).toHaveText(TestData.channelNames.google);
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.performance);
        });

    test(`Применение сложных фильтров продукт «${TestData.apps.yandexTaxi}» | площадка «${TestData.channelNames.meta}» | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@regression'] },
        async ({ campaignsPage, campaignPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();

            await campaignsPage.selectFilters({ app: TestData.apps.yandexTaxi, channelName: TestData.channelNames.meta });

            if (await ContentListUtils.shouldSkipTestIfNoCampaigns(campaignsPage)) {
                test.skip(true, 'Нет кампаний для проверки');
            }

            await campaignsPage.campaignsItem().first().click();

            await expect(campaignPage.campaignApp()).toBeVisible();
            await expect(campaignPage.campaignApp()).toHaveText(TestData.apps.yandexTaxi);
            await expect(campaignPage.campaignChannelName()).toHaveText(TestData.channelNames.meta);
            await expect(campaignPage.campaignChannelType()).toHaveText(TestData.campaignChannelTypes.performance);
        });

    test('Сброс дополнительных фильтров',
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.selectFilters({ app: TestData.apps.yandexWeather, region: TestData.regions.kyrgyzstan });
            await expect(campaignsPage.filterApp()).toHaveValue(TestData.apps.yandexWeather);
            await expect(campaignsPage.filterRegion()).toHaveValue(TestData.regions.kyrgyzstan);

            await campaignsPage.filterResetButton().click();
            await expect(campaignsPage.filterApp()).toHaveValue('');
            await expect(campaignsPage.filterRegion()).toHaveValue('');
        });

    test(`Выбор более 6 метрик для сортировки`,
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();
            await expect(campaignsPage.metricsSortButton()).toBeVisible();

            await SortingUtils.setupMetricForSorting(campaignsPage, Metrics.CPC);
            await SortingUtils.setupMetricForSorting(campaignsPage, Metrics.CPM);
            await campaignsPage.metricsSortButton().click();

            await expect(campaignsPage.metricsApplyButton()).toBeVisible();
            await expect(campaignsPage.selectPresetMetric(Metrics.IMPRESSIONS)).toBeDisabled();
        });

    test(`Сортировка кампаний по охватам (Reach) по убыванию | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypeMedia().click();
            await expect(campaignsPage.metricsSortButton()).toBeVisible();

            await SortingUtils.setupMetricForSorting(campaignsPage, Metrics.REACH);
            await SortingUtils.checkSortingOrder(campaignsPage, Metrics.REACH, false);
        });

    test(`Сортировка кампаний по расходам (Cost) по возрастанию | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@regression'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();
            await expect(campaignsPage.metricsSortButton()).toBeVisible();

            await SortingUtils.setupMetricForSorting(campaignsPage, Metrics.COST);
            await SortingUtils.checkSortingOrder(campaignsPage, Metrics.COST, true);
        });

    test(`Сортировка кампаний по CTR по убыванию | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();
            await expect(campaignsPage.metricsSortButton()).toBeVisible();

            await SortingUtils.setupMetricForSorting(campaignsPage, Metrics.CTR);
            await SortingUtils.checkSortingOrder(campaignsPage, Metrics.CTR, false);
        });

    test(`Сортировка кампаний по CPM по убыванию | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@regression'] },
        async ({ campaignsPage }) => {
            await expect(campaignsPage.campaignsItem().first()).toBeVisible();
            await campaignsPage.filterChannelTypePerformance().click();
            await expect(campaignsPage.metricsSortButton()).toBeVisible();

            await SortingUtils.setupMetricForSorting(campaignsPage, Metrics.CPM);
            await SortingUtils.checkSortingOrder(campaignsPage, Metrics.CPM, false);
        });
});
