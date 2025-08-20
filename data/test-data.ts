export const TestData = {
    campaignChannelTypes: {
        media: 'Media',
        performance: 'Performance'
    },

    apps: {
        kinopoisk: 'Кинопоиск',
        yandexPay: 'Яндекс Пей',
        yandexTaxi: 'Яндекс Такси',
        yandexVideo: 'Яндекс Видео',
        yandexWeather: 'Яндекс Погода',
    },

    channelNames: {
        meta: 'Meta',
        google: 'Google',
    },

    regions: {
        kazakhstan: 'Казахстан',
        kyrgyzstan: 'Кыргызстан',
        uzbekistan: 'Узбекистан',
    },

    languages: {
        russian: 'Русский',
        kyrgyz: 'Кыргызский',
        uzbek: 'Узбекский',
        kazakh: 'Казахский'
    },

} as const;

export type CampaignChannelType = typeof TestData.campaignChannelTypes[keyof typeof TestData.campaignChannelTypes];
export type App = typeof TestData.apps[keyof typeof TestData.apps];
export type ChannelName = typeof TestData.channelNames[keyof typeof TestData.channelNames];
export type Region = typeof TestData.regions[keyof typeof TestData.regions];
export type Language = typeof TestData.languages[keyof typeof TestData.languages];