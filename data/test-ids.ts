import { Metrics } from './metrics';

const metricPrefixes: Record<MetricPrefixes, string> = {
    metric: 'metric',
    sort: 'sort-metric',
    campaignItem: 'campaign-item-metric',
    creativesItem: 'creatives-item-metric',
    report: 'report-metric',
    campaign: 'campaign-metric',
    creative: 'creative-metric',
    reportSort: 'report-sort-metric',
} as const;

export type MetricPrefixes = 'metric' | 'sort' | 'campaignItem' | 'creativesItem' | 'report' | 'campaign' | 'creative' | 'reportSort';

function getMetricTestId(metric: Metrics, type: MetricPrefixes): string {
    return `${metricPrefixes[type]}-${metric}`;
}

export const TestIds = {
    // Вкладки
    tabCampaigns: 'tab-campaigns',
    tabCreatives: 'tab-creatives',
    tabReports: 'tab-reports',

    // Обновление контента
    updateContentButton: 'update-content-button',

    // Пустое список элементов
    nothingFoundText: 'nothing-found-text',

    // Основные фильтры
    filterSearchInput: 'filter-search-input',
    filterOpenButton: 'filter-open-button',
    filterChannelType: 'filter-channel-type',
    filterChannelTypeMedia: 'filter-channel-type-media',
    filterChannelTypePerformance: 'filter-channel-type-performance',
    filterApp: 'filter-app',
    filterChannelName: 'filter-channel-name',
    filterRegion: 'filter-region',
    filterDateFrom: 'filter-date-from',
    filterDateTo: 'filter-date-to',
    filterResetButton: 'filter-reset-button',

    // Дополнительные фильтры кампаний
    filterShowFavorites: 'filter-show-favorites',

    // Дополнительные фильтры креативов
    filterCreativeFormat: 'filter-creative-format-type',
    filterCreativeLanguage: 'filter-creative-language',
    filterCreativeCampaign: 'filter-creative-campaignsIds',

    // Селектор метрик для сортировки
    metricsSortSelector: 'metrics-sort-selector',
    getMetricTestId, // Функция для получения test-id метрики в модалке селектора для сортировки (TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'metric'))
    metricsApplyButton: 'metrics-apply-button',
    metricsCancelButton: 'metrics-cancel-button',

    // Элемент кампании на странице списка кампаний
    campaignItem: 'campaign-item',
    campaignItemPreviewImg: 'campaign-item-preview-img',
    campaignItemName: 'campaign-item-name',
    campaignItemDescription: 'campaign-item-description',
    campaignItemApp: 'campaign-item-app',
    campaignItemRegion: 'campaign-item-region',
    campaignItemDate: 'campaign-item-date',
    campaignItemFavorite: 'campaign-item-favorite',
    // id каждой метрики из карточки кампании получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'campaignItem')

    // Элемент креатива на странице списка креативов
    creativesItem: 'creatives-item',
    creativesItemSelect: 'creatives-item-select',
    creativesItemHeader: 'creatives-item-header',
    creativesItemMedia: 'creatives-item-media', // изображение или видео
    // id каждой метрики из карточки креатива получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'creativesItem')

    // Элемент креатива с форматом описания
    creativesItemDescription: 'creatives-item-description',

    // Выбранные креативы для отчета
    selectedCreativesModal: 'selected-creatives-modal',
    createReportButton: 'create-report-button',

    // Модалка выбора метрик для отчета
    metricsForReportModal: 'metrics-for-report-modal',
    // id каждой метрики из модалки селектора для отчета получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'report')
    goToReportButton: 'goto-report-button',
    cancelReportMetricsButton: 'cancel-report-metrics-button',
    closeReportMetricsModal: 'close-report-metrics-modal',

    // Элементы отчетов на странице списка отчетов
    reportItem: 'report-item',
    reportItemDeleteButton: 'report-item-delete-button',
    reportItemDownloadButton: 'report-item-download-button',
    reportItemName: 'report-item-name',

    // Страница кампании
    campaignBackButton: 'campaign-back-button',
    campaignName: 'campaign-name',
    campaignDescription: 'campaign-description',
    campaignPreviewImg: 'campaign-preview-img',
    campaignApp: 'campaign-app',
    campaignChannelName: 'campaign-channel-name',
    campaignRegion: 'campaign-region',
    campaignDate: 'campaign-date',
    campaignChannelType: 'campaign-channel-type',
    campaignIsFavorite: 'campaign-is-favorite',
    // id каждой метрики на странице кампании получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'campaign')

    // Страница креатива
    creativeBackButton: 'creative-back-button',
    creativeName: 'creative-name',
    creativeMedia: 'creative-media', // изображение или видео
    creativeChannelType: 'creative-channel-type',
    creativeChannelName: 'creative-channel-name',
    creativeApp: 'creative-app',
    creativeCampaign: 'creative-campaign',
    creativeRegion: 'creative-region',
    creativeDate: 'creative-date',
    creativeLanguage: 'creative-language',
    creativeDescription: 'creative-description',
    creativeMakeReportButton: 'creative-make-report-button',

    // Страница отчета
    reportBackButton: 'report-back-button',
    reportViewSwitch: 'report-view-switch',
    reportViewTable: 'report-view-table',
    reportViewDashboard: 'report-view-dashboard',
    reportDownloadButton: 'report-download-button',
    reportCreativesItem: 'creativesItem-',
    // id каждой метрики на странице отчёта получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'reportSort')

};


