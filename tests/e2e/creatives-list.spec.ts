import { test, expect } from '@fixtures/fixtures';
import { Metrics } from '@data/metrics';
import { TestData } from '@data/test-data';
import { ValueMappings } from '@data/value-mappings';
import { Paths } from '@data/paths';
import { ContentListUtils, MetricsUtils } from '@utils/index';

test.describe('Страница списка креативов', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(Paths.creativities);
    });

    test(`Фильтр по продукту «${TestData.apps.kinopoisk}» | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ creativesPage, creativePage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypeMedia().click();

            await creativesPage.selectFilters({ app: TestData.apps.kinopoisk });
            await expect(creativesPage.filterApp()).toHaveValue(TestData.apps.kinopoisk);

            if (await ContentListUtils.shouldSkipTestIfNoCreatives(creativesPage)) {
                test.skip(true, 'Нет креативов для проверки');
            }

            await creativesPage.creativesItem().first().click();

            await expect(creativePage.creativeApp()).toBeVisible();
            await expect(creativePage.creativeApp()).toHaveText(ValueMappings.apps[TestData.apps.kinopoisk]
            );
        });

    test(`Фильтр по платформе ${TestData.channelNames.meta} | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ creativesPage, creativePage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypeMedia().click();

            await creativesPage.selectFilters({ channelName: TestData.channelNames.meta });
            await expect(creativesPage.filterChannelName()).toHaveValue(TestData.channelNames.meta);

            if (await ContentListUtils.shouldSkipTestIfNoCreatives(creativesPage)) {
                test.skip(true, 'Нет креативов для проверки');
            }

            await creativesPage.creativesItem().first().click();

            await expect(creativePage.creativeChannelName()).toBeVisible();
            await expect(creativePage.creativeChannelName()).toHaveText(ValueMappings.channels[TestData.channelNames.meta]);
        });

    test(`Фильтр по стране ${TestData.regions.kazakhstan} | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@regression'] },
        async ({ creativesPage, creativePage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypeMedia().click();

            await creativesPage.selectFilters({ region: TestData.regions.kazakhstan });
            await expect(creativesPage.filterRegion()).toHaveValue(TestData.regions.kazakhstan);

            if (await ContentListUtils.shouldSkipTestIfNoCreatives(creativesPage)) {
                test.skip(true, 'Нет креативов для проверки');
            }

            await creativesPage.creativesItem().first().click();

            await expect(creativePage.creativeRegion()).toBeVisible();
            await expect(creativePage.creativeRegion()).toHaveText(ValueMappings.regions[TestData.regions.kazakhstan]);
        });

    test(`Мультифильтр по продукту «${TestData.apps.yandexPay}» | «${TestData.campaignChannelTypes.performance}»`,
        { tag: ['@smoke', '@regression'] },
        async ({ creativesPage, creativePage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypePerformance().click();

            await creativesPage.selectFilters({ app: TestData.apps.yandexPay });
            await expect(creativesPage.filterApp()).toHaveValue(TestData.apps.yandexPay);

            if (await ContentListUtils.shouldSkipTestIfNoCreatives(creativesPage)) {
                test.skip(true, 'Нет креативов для проверки');
            }

            await creativesPage.creativesItem().first().click();

            await expect(creativePage.creativeApp()).toBeVisible();
            await expect(creativePage.creativeApp()).toHaveText(ValueMappings.apps[TestData.apps.yandexPay]);
        });

    test(`Мультифильтр по продукту «${TestData.apps.yandexTaxi}» | Язык «${TestData.languages.kazakh}» | «${TestData.campaignChannelTypes.media}»`,
        { tag: ['@regression'] },
        async ({ creativesPage, creativePage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypeMedia().click();

            await creativesPage.selectFilters({ app: TestData.apps.yandexTaxi, creativeLanguage: TestData.languages.kazakh });
            await expect(creativesPage.filterApp()).toHaveValue(TestData.apps.yandexTaxi);
            await expect(creativesPage.filterCreativeLanguage()).toHaveValue(TestData.languages.kazakh);

            if (await ContentListUtils.shouldSkipTestIfNoCreatives(creativesPage)) {
                test.skip(true, 'Нет креативов для проверки');
            }

            await creativesPage.creativesItem().first().click();

            await expect(creativePage.creativeApp()).toBeVisible();
            await expect(creativePage.creativeApp()).toHaveText(ValueMappings.apps[TestData.apps.yandexTaxi]);
            await expect(creativePage.creativeLanguage()).toHaveText(ValueMappings.languages[TestData.languages.kazakh]);
        });

    test(`Отчет с кастомными метриками | ${TestData.campaignChannelTypes.media}: ${Metrics.CPC}, ${Metrics.VTR}, ${Metrics.FREQUENCY}, ${Metrics.IMPRESSIONS}`,
        { tag: ['@regression'] },
        async ({ creativesPage, reportPage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypeMedia().click();

            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.creativesItemSelect().first().click();

            await expect(creativesPage.createReportButton()).toBeVisible();
            await creativesPage.createReportButton().click();

            await expect(creativesPage.goToReportButton()).toBeVisible();
            await MetricsUtils.selectReportMetrics(creativesPage, [Metrics.CPC, Metrics.VTR, Metrics.FREQUENCY, Metrics.IMPRESSIONS]);
            await creativesPage.goToReportButton().click();

            await expect(reportPage.reportBackButton()).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.CPC)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.VTR)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.FREQUENCY)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();

            await expect(reportPage.selectMetric(Metrics.CTR)).not.toBeVisible();
            await expect(reportPage.selectMetric(Metrics.REACH)).not.toBeVisible();
        });

    test(`Отчет с кастомными метриками | ${TestData.campaignChannelTypes.performance}: ${Metrics.CLICKS}, ${Metrics.CTR}, ${Metrics.CONVERSIONS}, ${Metrics.IMPRESSIONS}`,
        { tag: ['@regression'] },
        async ({ creativesPage, reportPage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypePerformance().click();

            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.creativesItemSelect().first().click();

            await expect(creativesPage.createReportButton()).toBeVisible();
            await creativesPage.createReportButton().click();

            await expect(creativesPage.goToReportButton()).toBeVisible();

            await MetricsUtils.selectReportMetrics(creativesPage, [Metrics.CLICKS, Metrics.CTR, Metrics.CONVERSIONS, Metrics.IMPRESSIONS]);
            await creativesPage.goToReportButton().click();
            await expect(reportPage.selectMetric(Metrics.CLICKS)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.CTR)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.CONVERSIONS)).toBeVisible();

            await expect(reportPage.selectMetric(Metrics.ROAS)).not.toBeVisible();
            await expect(reportPage.selectMetric(Metrics.CPC)).not.toBeVisible();
            await expect(reportPage.selectMetric(Metrics.VTR)).not.toBeVisible();
            await expect(reportPage.selectMetric(Metrics.FREQUENCY)).not.toBeVisible();

        });

    test(`Отчет из нескольких креативов | ${TestData.campaignChannelTypes.media}: ${Metrics.IMPRESSIONS}, ${Metrics.CTR}, ${Metrics.REACH}`,
        { tag: ['@smoke', '@regression'] },
        async ({ creativesPage, reportPage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.filterChannelTypeMedia().click();

            await expect(creativesPage.creativesItem().first()).toBeVisible();
            const creativesCount = await creativesPage.creativesItem().count();

            if (creativesCount >= 3) {
                await creativesPage.creativesItemSelect().nth(0).click();
                await creativesPage.creativesItemSelect().nth(1).click();
                await creativesPage.creativesItemSelect().nth(2).click();

                await expect(creativesPage.creativesItemSelect().nth(0)).toBeChecked();
                await expect(creativesPage.creativesItemSelect().nth(1)).toBeChecked();
                await expect(creativesPage.creativesItemSelect().nth(2)).toBeChecked();

                await expect(creativesPage.createReportButton()).toBeVisible();
                await creativesPage.createReportButton().click();

                await expect(creativesPage.goToReportButton()).toBeVisible();
                await MetricsUtils.selectReportMetrics(creativesPage, [Metrics.IMPRESSIONS, Metrics.CTR, Metrics.REACH]);
                await creativesPage.goToReportButton().click();

                await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();
                await expect(reportPage.selectMetric(Metrics.CTR)).toBeVisible();
                await expect(reportPage.selectMetric(Metrics.REACH)).toBeVisible();

                await expect(reportPage.selectMetric(Metrics.ROAS)).not.toBeVisible();
                await expect(reportPage.selectMetric(Metrics.VTR)).not.toBeVisible();
                await expect(reportPage.selectMetric(Metrics.FREQUENCY)).not.toBeVisible();

                await expect(reportPage.creativesItemReport().first()).toBeVisible();
                const reportCreativesCount = await reportPage.creativesItemReport().count();
                await expect(reportCreativesCount).toBe(3);

            } else if (await ContentListUtils.shouldSkipTestIfNoCreatives(creativesPage)) {
                test.skip(true, 'Нет креативов для проверки');
            } else {
                test.skip(true, 'Недостаточно креативов для проверки');
            }
        });

    test('Отмена создания отчета',
        { tag: ['@smoke', '@regression'] },
        async ({ creativesPage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.creativesItemSelect().first().click();

            await expect(creativesPage.createReportButton()).toBeVisible();
            await creativesPage.createReportButton().click();

            await creativesPage.cancelReportMetricsButton().click();

            await expect(creativesPage.goToReportButton()).not.toBeVisible();
        });

    test('Закрытие модалки создания отчета',
        { tag: ['@smoke', '@regression'] },
        async ({ creativesPage }) => {
            await expect(creativesPage.creativesItem().first()).toBeVisible();
            await creativesPage.creativesItemSelect().first().click();
            await creativesPage.createReportButton().click();

            await expect(creativesPage.goToReportButton()).toBeVisible();

            await creativesPage.cancelReportMetricsButton().click();

            await expect(creativesPage.goToReportButton()).not.toBeVisible();
        });

});
