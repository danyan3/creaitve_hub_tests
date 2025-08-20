/**
 * Маппинги между отображаемыми названиями и их значениями в системе
 * Используется для работы с кастомными селектами
 */

export const ValueMappings = {
    apps: {
        'Кинопоиск': 'YK',
        'Яндекс Пей': 'YP',
        'Яндекс Такси': 'YT',
        'Яндекс Видео': 'YV',
        'Яндекс Погода': 'YW'
    },

    creativeFormats: {
        'Видео': 'VIDEO',
        'Картинка': 'IMAGE',
        'Текст': 'TEXT'
    },

    regions: {
        'Казахстан': 'KZ-ALL-ALL',
        'Кыргызстан': 'KG-ALL-ALL',
        'Узбекистан': 'UZ-ALL-ALL'
    },

    languages: {
        'Русский': 'RU',
        'Казахский': 'KZ',
        'Узбекский': 'UZ'
    },

    channels: {
        'Meta': 'META',
        'Google': 'GOOGLE'
    },

} as const;

export type AppValue = typeof ValueMappings.apps[keyof typeof ValueMappings.apps];
export type CreativeFormatValue = typeof ValueMappings.creativeFormats[keyof typeof ValueMappings.creativeFormats];
export type RegionValue = typeof ValueMappings.regions[keyof typeof ValueMappings.regions];
export type LanguageValue = typeof ValueMappings.languages[keyof typeof ValueMappings.languages];
export type ChannelValue = typeof ValueMappings.channels[keyof typeof ValueMappings.channels];
