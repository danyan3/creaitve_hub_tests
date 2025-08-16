import { test, expect } from './fixtures/fixtures';
import { CreativesListPage } from '../../pages/creatives-list.page';
import { Metrics } from '../../data/test-ids';
import { TestData } from '../../data/test-data';

test.describe('Страница списка креативов', () => {
    let creativesPage: CreativesListPage;

    test.beforeEach(async ({ page }) => {
        creativesPage = new CreativesListPage(page);
        await page.goto('/creativities');
    });

    test(`Проверка фильтра «${TestData.campaignChannelTypes.media}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypeMedia()).toBeVisible();
        await creativesPage.filterChannelTypeMedia().click();

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeChannelType()).toBeVisible();
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
    });

    test(`Проверка фильтра «${TestData.campaignChannelTypes.performance}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypePerformance()).toBeVisible();
        await creativesPage.filterChannelTypePerformance().click();

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeChannelType()).toBeVisible();
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.performance);
    });

    test(`Фильтр по продукту «${TestData.apps.lavka}» | «${TestData.campaignChannelTypes.performance}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypePerformance()).toBeVisible();
        await creativesPage.filterChannelTypePerformance().click();

        await expect(creativesPage.openFiltersButton()).toBeVisible();
        await creativesPage.openFiltersIfClosed();

        await creativesPage.filterApp().selectOption(TestData.apps.lavka);

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeApp()).toBeVisible();
        await expect(creativePage.creativeApp()).toHaveValue(TestData.apps.lavka);
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.performance);
    });

    test(`Фильтр по платформе ${TestData.channelNames.meta} | «${TestData.campaignChannelTypes.media}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypeMedia()).toBeVisible();
        await creativesPage.filterChannelTypeMedia().click();

        await expect(creativesPage.openFiltersButton()).toBeVisible();
        await creativesPage.openFiltersIfClosed();

        await creativesPage.filterChannelName().selectOption(TestData.channelNames.meta);

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeChannelName()).toBeVisible();
        await expect(creativePage.creativeChannelName()).toHaveValue(TestData.channelNames.meta);
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
    });

    test(`Фильтр по стране ${TestData.regions.kazakhstan} | «${TestData.campaignChannelTypes.media}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypeMedia()).toBeVisible();
        await creativesPage.filterChannelTypeMedia().click();

        await expect(creativesPage.openFiltersButton()).toBeVisible();
        await creativesPage.openFiltersIfClosed();

        await creativesPage.filterRegion().selectOption(TestData.regions.kazakhstan);

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeRegion()).toBeVisible();
        await expect(creativePage.creativeRegion()).toHaveValue(TestData.regions.kazakhstan);
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
    });
    // С датой разобраться, как её вытягивать и сравнивать с той, что в карточке
    // test(`Фильтр по сегодняшней дате | «${TestData.campaignTypes.media}»`, async ({ page, creativePage }) => {
    //     await expect(creativesPage.filterTypeMedia()).toBeVisible();
    //     await creativesPage.filterTypeMedia().click();

    //     await expect(creativesPage.openFiltersButton()).toBeVisible();
    //     await creativesPage.openFiltersIfClosed();

    //     // Открываем календарь
    //     await creativesPage.dateFilter().click();

    //     // Выбираем сегодняшнюю дату по атрибуту data-today="true" внутри datePicker
    //     await creativesPage.dateFilter().locator('button[data-today="true"]').click();

    //     await creativesPage.applyButton().click();

    //     if (await creativesPage.shouldSkipTestIfNoCreatives()) {
    //         test.skip(true, 'Нет креативов для проверки');
    //     }

    //     await creativesPage.creativesItem().first().click();

    //     await expect(creativePage.creativeType()).toBeVisible();
    //     await expect(creativePage.creativeType()).toHaveValue(TestData.campaignTypes.media);
    // });

    test(`Применение множественных фильтров продукт «${TestData.apps.go}» | «${TestData.campaignChannelTypes.performance}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypePerformance()).toBeVisible();
        await creativesPage.filterChannelTypePerformance().click();

        await expect(creativesPage.openFiltersButton()).toBeVisible();
        await creativesPage.openFiltersIfClosed();

        await creativesPage.filterApp().selectOption(TestData.apps.go);

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeApp()).toBeVisible();
        await expect(creativePage.creativeApp()).toHaveValue(TestData.apps.go);
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.performance);
    });

    test(`Применение сложных фильтров продукт «${TestData.apps.eda}» | Язык «${TestData.languages.kazakh}» | «${TestData.campaignChannelTypes.media}»`, async ({ creativePage }) => {
        await expect(creativesPage.filterChannelTypeMedia()).toBeVisible();
        await creativesPage.filterChannelTypeMedia().click();

        await expect(creativesPage.openFiltersButton()).toBeVisible();
        await creativesPage.openFiltersIfClosed();

        await creativesPage.filterApp().selectOption(TestData.apps.eda);
        await creativesPage.creativeLanguageFilter().selectOption(TestData.languages.kazakh);

        if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        }

        await creativesPage.creativesItem().first().click();

        await expect(creativePage.creativeApp()).toBeVisible();
        await expect(creativePage.creativeApp()).toHaveValue(TestData.apps.eda);
        await expect(creativePage.creativeLanguage()).toHaveValue(TestData.languages.kazakh);
        await expect(creativePage.creativeChannelType()).toHaveValue(TestData.campaignChannelTypes.media);
    });

    test('Выбор одного креатива', async () => {
        await expect(creativesPage.creativesItem()).toBeVisible();
        await creativesPage.creativesItemSelect().first().click();

        await expect(creativesPage.creativesItemSelect().first()).toBeChecked();

        await expect(creativesPage.selectedCreativesModal()).toBeVisible();
    });

    test('Создание отчета с дефолтными метриками', async ({ reportPage }) => {
        await expect(creativesPage.creativesItem()).toBeVisible();
        await creativesPage.creativesItemSelect().first().click();

        await expect(creativesPage.selectedCreativesModal()).toBeVisible();
        await creativesPage.createReportButton().click();

        await expect(creativesPage.metricsForReportModal()).toBeVisible();
        await creativesPage.goToReportButton().click();

        await expect(reportPage.reportHeader()).toBeVisible();

        // добавить проверку, что в отчете отображаются только выбранные метрики (в данном случе дефолтные)
    });

    test(`Создание отчета с кастомными метриками для Медиа: ${Metrics.CPC}, ${Metrics.VTR}, ${Metrics.FREQUENCY}, ${Metrics.IMPRESSIONS}`, async ({ reportPage }) => {
        await expect(creativesPage.filterChannelTypeMedia()).toBeVisible();
        await creativesPage.filterChannelTypeMedia().click();

        await expect(creativesPage.creativesItem()).toBeVisible();
        await creativesPage.creativesItemSelect().first().click();

        await expect(creativesPage.selectedCreativesModal()).toBeVisible();
        await creativesPage.createReportButton().click();

        await expect(creativesPage.metricsForReportModal()).toBeVisible();
        await creativesPage.clearMetricsForReport();

        await creativesPage.selectReportMetrics([Metrics.CPC, Metrics.VTR, Metrics.FREQUENCY, Metrics.IMPRESSIONS]);
        await creativesPage.goToReportButton().click();

        await expect(reportPage.reportHeader()).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.CPC)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.VTR)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.FREQUENCY)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();

        await expect(reportPage.selectMetric(Metrics.CTR)).not.toBeVisible();
        await expect(reportPage.selectMetric(Metrics.REACH)).not.toBeVisible();
    });

    test(`Создание отчета с кастомными метриками для Перфоманс: ${Metrics.ROAS}, ${Metrics.REVENUE}, ${Metrics.LTV}, ${Metrics.IMPRESSIONS}`, async ({ reportPage }) => {
        await expect(creativesPage.filterChannelTypePerformance()).toBeVisible();
        await creativesPage.filterChannelTypePerformance().click();

        await expect(creativesPage.creativesItem()).toBeVisible();
        await creativesPage.creativesItemSelect().first().click();

        await expect(creativesPage.selectedCreativesModal()).toBeVisible();
        await creativesPage.createReportButton().click();

        await expect(creativesPage.metricsForReportModal()).toBeVisible();
        await creativesPage.clearMetricsForReport();

        await creativesPage.selectReportMetrics([Metrics.ROAS, Metrics.REVENUE, Metrics.LTV, Metrics.IMPRESSIONS]);
        await creativesPage.goToReportButton().click();

        await expect(reportPage.reportHeader()).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.ROAS)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.REVENUE)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.LTV)).toBeVisible();
        await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();

        await expect(reportPage.selectMetric(Metrics.CPC)).not.toBeVisible();
        await expect(reportPage.selectMetric(Metrics.VTR)).not.toBeVisible();
        await expect(reportPage.selectMetric(Metrics.FREQUENCY)).not.toBeVisible();
    });

    test('Создание отчета из нескольких креативов для Медиа с дефолтными метриками', async ({ reportPage }) => {
        await expect(creativesPage.filterChannelTypeMedia()).toBeVisible();
        await creativesPage.filterChannelTypeMedia().click();

        await expect(creativesPage.creativesItem()).toBeVisible();
        const creativesCount = await creativesPage.creativesItem().count();

        if (creativesCount >= 3) {
            await creativesPage.creativesItemSelect().nth(0).click();
            await creativesPage.creativesItemSelect().nth(1).click();
            await creativesPage.creativesItemSelect().nth(2).click();

            await expect(creativesPage.creativesItemSelect().nth(0)).toBeChecked();
            await expect(creativesPage.creativesItemSelect().nth(1)).toBeChecked();
            await expect(creativesPage.creativesItemSelect().nth(2)).toBeChecked();

            await creativesPage.createReportButton().click();
            await expect(creativesPage.selectedCreativesModal()).toBeVisible();

            await creativesPage.goToReportButton().click();

            await expect(reportPage.reportHeader()).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.IMPRESSIONS)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.CTR)).toBeVisible();
            await expect(reportPage.selectMetric(Metrics.REACH)).toBeVisible();

            await expect(reportPage.selectMetric(Metrics.ROAS)).not.toBeVisible();
            await expect(reportPage.selectMetric(Metrics.VTR)).not.toBeVisible();
            await expect(reportPage.selectMetric(Metrics.FREQUENCY)).not.toBeVisible();

            const reportCreativesCount = await creativesPage.creativesItem().count();
            await expect(reportCreativesCount).toBe(3);

        } else if (await creativesPage.shouldSkipTestIfNoCreatives()) {
            test.skip(true, 'Нет креативов для проверки');
        } else {
            test.skip(true, 'Недостаточно креативов для проверки');
        }
    });

    test('Отмена создания отчета', async () => {
        await expect(creativesPage.creativesItem()).toBeVisible();
        await creativesPage.creativesItemSelect().first().click();
        await creativesPage.createReportButton().click();
        await expect(creativesPage.selectedCreativesModal()).toBeVisible();

        await creativesPage.cancelReportMetricsButton().click();

        await expect(creativesPage.selectedCreativesModal()).not.toBeVisible();
    });

    test('Закрытие модалки создания отчета', async () => {
        await expect(creativesPage.creativesItem()).toBeVisible();
        await creativesPage.creativesItemSelect().first().click();
        await creativesPage.createReportButton().click();
        await expect(creativesPage.selectedCreativesModal()).toBeVisible();

        await creativesPage.closeReportMetricsModal().click();

        await expect(creativesPage.selectedCreativesModal()).not.toBeVisible();
    });


});
