import { test, expect } from '@fixtures/fixtures';
import { CampaignsListPage } from '@pages/campaigns-list.page';
import { Metrics } from '@data/test-ids';
import { TestData } from '@data/test-data';

test.describe('Страница списка кампаний', () => {
    let campaignsPage: CampaignsListPage;

    test.beforeEach(async ({ page }) => {
        campaignsPage = new CampaignsListPage(page);

        await page.goto('/');
        await campaignsPage.campaignsTab().click();
    });

    // test('Обновление контента по кнопке «Обновить»', async ({ page }) => {
    //     await expect(campaignsPage.updateContentButton()).toBeVisible();
    //     await campaignsPage.updateContentButton().click();
    // });

    // После релиза Избранного проверить атрибуты кнопки избранное, чтобы тест работал корректно
    test('Добавление и удаление кампании из избранного', { tag: ['@smoke', '@critical'] }, async ({ page }) => {
        await expect(campaignsPage.campaignsItem()).toBeVisible();
        const firstCampaign = campaignsPage.campaignsItem().first();
        const favoriteButton = firstCampaign.locator(campaignsPage.campaignItemIsFavorite());

        const isFavorite = await favoriteButton.getAttribute('data-selected') === 'true';
        if (isFavorite) {
            await favoriteButton.click();
            await expect(favoriteButton).toHaveAttribute('data-selected', 'false');
        }

        await campaignsPage.filterShowFavorites().click();
        await expect(firstCampaign).not.toBeVisible();

        await campaignsPage.filterShowFavorites().click();

        await favoriteButton.click();
        await expect(favoriteButton).toHaveAttribute('data-selected', 'true');

        await campaignsPage.filterShowFavorites().click();
        await expect(firstCampaign).toBeVisible();

        await favoriteButton.click();
        await expect(firstCampaign).not.toBeVisible();
    });

    test(`Проверка фильтра «${TestData.campaignChannelTypes.media}»`, { tag: ['@smoke'] }, async ({ campaignPage }) => {
        await expect(campaignsPage.filterChannelTypeMedia()).toBeVisible();
        await campaignsPage.filterChannelTypeMedia().click();

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignChannelType()).toBeVisible();
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
    });

    test(`Проверка фильтра «${TestData.campaignChannelTypes.performance}»`, { tag: ['@smoke'] }, async ({ campaignPage }) => {
        await expect(campaignsPage.filterChannelTypePerformance()).toBeVisible();
        await campaignsPage.filterChannelTypePerformance().click();

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignChannelType()).toBeVisible();
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.performance);
    });

    test(`Фильтр по продукту «${TestData.apps.lavka}» | «${TestData.campaignChannelTypes.media}»`, { tag: ['@regression'] }, async ({ page, campaignPage }) => {
        await expect(campaignsPage.filterChannelTypeMedia()).toBeVisible();
        await campaignsPage.filterChannelTypeMedia().click();

        await expect(campaignsPage.openFiltersButton()).toBeVisible();
        await campaignsPage.openFiltersIfClosed();

        await campaignsPage.filterApp().selectOption(TestData.apps.lavka);
        await expect(campaignsPage.filterApp()).toHaveValue(TestData.apps.lavka);

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignChannelType()).toBeVisible();
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
        await expect(campaignPage.campaignApp()).toHaveValue(TestData.apps.lavka);
    });

    test(`Фильтр по платформе ${TestData.channelNames.meta} | «${TestData.campaignChannelTypes.media}»`, { tag: ['@regression'] }, async ({ page, campaignPage }) => {
        await expect(campaignsPage.filterChannelTypeMedia()).toBeVisible();
        await campaignsPage.filterChannelTypeMedia().click();

        await expect(campaignsPage.openFiltersButton()).toBeVisible();
        await campaignsPage.openFiltersIfClosed();

        await campaignsPage.filterChannelName().selectOption(TestData.channelNames.meta);
        await expect(campaignsPage.filterChannelName()).toHaveValue(TestData.channelNames.meta);

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignChannelType()).toBeVisible();
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
        await expect(campaignPage.campaignChannelName()).toHaveValue(TestData.channelNames.meta);
    });

    test(`Фильтр по стране ${TestData.regions.kazakhstan} | «${TestData.campaignChannelTypes.media}»`, { tag: ['@regression'] }, async ({ page, campaignPage }) => {
        await expect(campaignsPage.filterChannelTypeMedia()).toBeVisible();
        await campaignsPage.filterChannelTypeMedia().click();

        await expect(campaignsPage.openFiltersButton()).toBeVisible();
        await campaignsPage.openFiltersIfClosed();

        await campaignsPage.filterRegion().selectOption(TestData.regions.kazakhstan);
        await expect(campaignsPage.filterRegion()).toHaveValue(TestData.regions.kazakhstan);

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignChannelType()).toBeVisible();
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
        await expect(campaignPage.campaignRegion()).toHaveValue(TestData.regions.kazakhstan);
    });
    // Нужно будет придумать, как проверять дату и сверять ей с той, что в карточке. Также добавить разных тестов на дату
    // test('Фильтр по сегодняшней дате | «Медиа»', async ({ page, campaignPage }) => {
    //     await expect(campaignsPage.filterTypeMedia()).toBeVisible();
    //     await campaignsPage.filterTypeMedia().click();

    //     await expect(campaignsPage.openFiltersButton()).toBeVisible();
    //     await campaignsPage.openFiltersIfClosed();

    //     // Открываем календарь
    //     await campaignsPage.dateFilter().click();

    //     // Выбираем сегодняшнюю дату по атрибуту data-today="true" внутри datePicker
    //     await campaignsPage.dateFilter().locator('button[data-today="true"]').click();

    //     await campaignsPage.applyButton().click();

    //     const campaignsCount = await campaignsPage.campaignsItem().count();
    //     if (campaignsCount === 0 && await campaignsPage.nothingFoundText().isVisible()) {
    //         test.skip(true, 'Нет кампаний для проверки');
    //     }

    //     await campaignsPage.campaignsItem().first().click();

    //     await expect(campaignPage.campaignDate()).toBeVisible();

    // });

    test(`Фильтр по продукту «${TestData.apps.go}» | «${TestData.campaignChannelTypes.performance}»`, { tag: ['@regression'] }, async ({ page, campaignPage }) => {
        await expect(campaignsPage.filterChannelTypePerformance()).toBeVisible();
        await campaignsPage.filterChannelTypePerformance().click();

        await expect(campaignsPage.openFiltersButton()).toBeVisible();
        await campaignsPage.openFiltersIfClosed();

        await campaignsPage.filterApp().selectOption(TestData.apps.go);
        await expect(campaignsPage.filterApp()).toHaveValue(TestData.apps.go);

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignApp()).toBeVisible();
        await expect(campaignPage.campaignApp()).toHaveValue(TestData.apps.go);
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.performance);
    });

    test(`Применение сложных фильтров продукт «${TestData.apps.eda}» | площадка «${TestData.channelNames.meta}» | «${TestData.campaignChannelTypes.media}»`, { tag: ['@regression'] }, async ({ page, campaignPage }) => {
        await expect(campaignsPage.filterChannelTypeMedia()).toBeVisible();
        await campaignsPage.filterChannelTypeMedia().click();

        await expect(campaignsPage.openFiltersButton()).toBeVisible();
        await campaignsPage.openFiltersIfClosed();

        await campaignsPage.filterApp().selectOption(TestData.apps.eda);
        await campaignsPage.filterChannelName().selectOption(TestData.channelNames.meta);

        if (await campaignsPage.shouldSkipTestIfNoCampaigns()) {
            test.skip(true, 'Нет кампаний для проверки');
        }

        await campaignsPage.campaignsItem().first().click();

        await expect(campaignPage.campaignApp()).toBeVisible();
        await expect(campaignPage.campaignApp()).toHaveValue(TestData.apps.eda);
        await expect(campaignPage.campaignChannelName()).toHaveValue(TestData.channelNames.meta);
        await expect(campaignPage.campaignChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
    });

    test('Сортировка кампаний по охватам (Reach) по убыванию', { tag: ['@regression'] }, async ({ page }) => {
        await expect(campaignsPage.metricsSortButton()).toBeVisible();
        await campaignsPage.setupMetricForSorting(Metrics.REACH);
        await campaignsPage.checkSortingOrder(Metrics.REACH, false);
    });

    test('Сортировка кампаний по расходам (Cost) по возрастанию', { tag: ['@regression'] }, async ({ page }) => {
        await expect(campaignsPage.metricsSortButton()).toBeVisible();
        await campaignsPage.setupMetricForSorting(Metrics.COST);
        await campaignsPage.checkSortingOrder(Metrics.COST, true);
    });

    test('Сортировка кампаний по CTR по убыванию', { tag: ['@regression'] }, async ({ page }) => {
        await expect(campaignsPage.metricsSortButton()).toBeVisible();
        await campaignsPage.setupMetricForSorting(Metrics.CTR);
        await campaignsPage.checkSortingOrder(Metrics.CTR, false);
    });

    test('Сортировка кампаний по CPM по убыванию', { tag: ['@regression'] }, async ({ page }) => {
        await expect(campaignsPage.metricsSortButton()).toBeVisible();
        await campaignsPage.setupMetricForSorting(Metrics.CPM);
        await campaignsPage.checkSortingOrder(Metrics.CPM, false);
    });
});
