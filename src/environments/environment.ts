import env from './.env';

export const environment = {
    production: false,
    version: env.npm_package_version + '-dev',
    serverUrl: '/api',
    envName: 'DEV',
    etherscanApiUrl: 'https://api-sepolia.etherscan.io/api',
    etherscanExplorerUrl: 'https://sepolia.etherscan.io/',
    etherscanApiKey: 'YP8RH479GPCJUKFZ6T888NHRWKI7Y1FUK7',
    passwordSecret: env.password_secret,
    apiTimeout: 5000
};
