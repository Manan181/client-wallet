export type Chain = {
    chainId: string;
    name: string;
    blockExplorerUrl: string;
    rpcUrl: string;
};

export const sepolia: Chain = {
    chainId: '11155111',
    name: 'Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: 'https://sepolia.infura.io/v3/3f0c7a19504c4d1fbe3c3e439d277f4a'
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io/',
    rpcUrl: 'https://mainnet.infura.io/v3/3f0c7a19504c4d1fbe3c3e439d277f4a'
};

export const CHAINS_CONFIG = {
    [sepolia.chainId]: sepolia,
    [mainnet.chainId]: mainnet
};
