interface Config {
    apiBaseUrl: string;
    vapidPublicKey: string;
    cronSecret: string;
}

const config: Config = {
    apiBaseUrl: 'https://ynon-ski-api.vercel.app',
    vapidPublicKey: 'BHPpAEPlTijXBRsEfimKOcx1yDt9lu7YCMK9MGHlN4pK3ITMgGlXZ0zVWRac4sD0lVzWMREd6gNoTiGqZHzSl_Y',
    cronSecret: process.env.NEXT_PUBLIC_CRON_SECRET || '',
};

export default config;