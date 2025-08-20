export const Paths = {
    home: '/',
    campaigns: '/campaigns',
    creativities: '/creativities',
    reports: '/reports',

} as const;

export type PathKey = keyof typeof Paths;
