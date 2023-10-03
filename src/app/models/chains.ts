export type Chain = {
    chainId: string;
    networkName: string;
    blockExplorerUrl: string;
    rpcUrl: string;
    currencySymbol: string;
};

export const sepolia: Chain = {
    chainId: '11155111',
    networkName: 'Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: 'https://sepolia.infura.io/v3/3f0c7a19504c4d1fbe3c3e439d277f4a',
    currencySymbol: 'ETH'
};

export const mainnet: Chain = {
    chainId: '1',
    networkName: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io/',
    rpcUrl: 'https://mainnet.infura.io/v3/3f0c7a19504c4d1fbe3c3e439d277f4a',
    currencySymbol: 'ETH'
};

export const CHAINS_CONFIG = {
    [sepolia.chainId]: sepolia,
    [mainnet.chainId]: mainnet
};
