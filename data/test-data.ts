export const TestData = {
    campaignChannelTypes: {
        media: 'Медиа',
        performance: 'Перфоманс'
    },

    apps: {
        lavka: 'Лавка',
        go: 'Go',
        eda: 'Еда'
    },

    channelNames: {
        meta: 'Meta',
        google: 'Google',
        tiktok: 'TikTok'
    },

    regions: {
        russia: 'Россия',
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