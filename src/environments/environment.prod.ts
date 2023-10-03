import env from './.env';

export const environment = {
    production: true,
    version: env.npm_package_version,
    serverUrl: '/api',
    envName: 'PROD',
    etherscanApiUrl: 'https://api.etherscan.io/api',
    etherscanExplorerUrl: 'https://etherscan.io/',
    etherscanApiKey: 'YP8RH479GPCJUKFZ6T888NHRWKI7Y1FUK7',
    passwordSecret: env.password_secret,
    apiTimeout: 5000
};
