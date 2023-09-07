import env from './.env';

export const environment = {
    production: true,
    version: env.npm_package_version,
    serverUrl: '/api',
    envName: 'PROD',
    etherscanApiUrl: 'https://api.etherscan.io/api',
    apiTimeout: 5000
};
