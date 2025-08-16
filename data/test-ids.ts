export enum Metrics {
    IMPRESSIONS = 'impressions',
    REACH = 'reach',
    CLICKS = 'clicks',
    FREQUENCY = 'frequency',
    CTR = 'ctr',
    CPM = 'cpm',
    CTV = 'ctv',
    POST_VIEW_CONVERSIONS = 'post-view-conversions',
    CR = 'cr',
    CPL = 'cpl',
    CPC = 'cpc',
    VTR = 'vtr',
    LEADS = 'leads',
    CPA_CAC = 'cpa',
    COST = 'cost',
    ROAS = 'roas',
    CONVERSIONS = 'conversions',
    REVENUE = 'revenue',
    LTV = 'ltv',
}


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
    // Tabs
    tabCampaigns: 'tab-campaigns',
    tabCreatives: 'tab-creatives',
    tabReports: 'tab-reports',

    // Update content
    updateContentButton: 'update-content-button',

    // Empty state
    nothingFoundText: 'nothing-found-text',

    // Main filters
    filterSearchInput: 'filter-search-input',
    filterOpenButton: 'filter-open-button',
    filterChannelType: 'filter-channel-type',
    filterChannelTypeMedia: 'filter-channel-type-media',
    filterChannelTypePerformance: 'filter-channel-type-performance',
    filterApp: 'filter-app',
    filterChannelName: 'filter-channel-name',
    filterRegion: 'filter-region',
    filterDate: 'filter-date',
    filterDatePicker: 'filter-date-picker',
    filterApplyButton: 'filter-apply-button',
    filterResetButton: 'filter-reset-button',

    // Additional Campaigns filters
    filterShowFavorites: 'filter-show-favorites',

    // Additional Creatives filters
    filterCreativeFormat: 'filter-creative-format',
    filterCreativeLanguage: 'filter-creative-language',
    filterCreativeCampaign: 'filter-creative-campaign',

    // Metrics selector
    metricsSortSelector: 'metrics-sort-selector',
    getMetricTestId, // Функция для получения test-id метрики в модалке селектора для сортировки (TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'metric'))
    metricsApplyButton: 'metrics-apply-button',

    // Campaign item
    campaignItem: 'campaign-item',
    campaignItemImage: 'campaign-item-image',
    campaignItemName: 'campaign-item-name',
    campaignItemDescription: 'campaign-item-description',
    campaignItemApp: 'campaign-item-app',
    campaignItemRegion: 'campaign-item-region',
    campaignItemDate: 'campaign-item-date',
    campaignItemIsFavorite: 'campaign-item-is-favorite',
    // id каждой метрики из карточки кампании получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'campaignItem')

    // Creatives item
    creativesItem: 'creatives-item',
    creativesItemSelect: 'creatives-item-select',
    creativesItemHeader: 'creatives-item-header',
    creativesItemMedia: 'creatives-item-media', // img or video
    // id каждой метрики из карточки креатива получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'creativesItem')

    // Creatives item for Google platform
    creativesItemDescription: 'creatives-item-description',

    // Selected creatives for report
    selectedCreativesModal: 'selected-creatives-modal',
    createReportButton: 'create-report-button',

    // Metrics for report
    metricsForReportModal: 'metrics-for-report-modal',
    // id каждой метрики из модалки селектора для отчета получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'report')
    goToReportButton: 'goto-report-button',
    cancelReportMetricsButton: 'cancel-report-metrics-button',
    closeReportMetricsModal: 'close-report-metrics-modal',

    // Reports page: Report items
    reportItem: 'report-item',
    reportItemDeleteButton: 'report-item-delete-button',
    reportItemDownloadButton: 'report-item-download-button',

    // Campaign page
    campaignBackButton: 'campaign-back-button',
    campaignHeader: 'campaign-header',
    campaignName: 'campaign-name',
    campaignDescription: 'campaign-description',
    campaignPreviewImg: 'campaign-preview-img',
    campaignApp: 'campaign-app',
    campaignChannelName: 'campaign-channel-name',
    campaignRegion: 'campaign-region',
    campaignDate: 'campaign-date',
    campaignChannelType: 'campaign-channel-type',
    campaignIsFavorite: 'campaign-is-favorite',
    // id каждой метрики на странице отчёта получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'campaign')

    // Creative page
    creativeBackButton: 'creative-back-button',
    creativeName: 'creative-name',
    creativeMedia: 'creative-media', // img or video
    creativeChannelType: 'creative-channel-type',
    creativeChannelName: 'creative-channel-name',
    creativeApp: 'creative-app',
    creativeCampaign: 'creative-campaign',
    creativeRegion: 'creative-region',
    creativeDate: 'creative-date',
    creativeLanguage: 'creative-language',
    creativeDescription: 'creative-description',
    creativeMakeReportButton: 'creative-make-report-button',

    // Report page
    reportHeader: 'report-header',
    reportBackButton: 'report-back-button',
    reportViewSwitch: 'report-view-switch',
    reportViewTable: 'report-view-table',
    reportViewDashboard: 'report-view-dashboard',
    reportDownloadButton: 'report-download-button',
    // id каждой метрики для сортировки на странице отчёта получаем по TestIds.getMetricTestId(Metrics.IMPRESSIONS, 'reportSort')

};


