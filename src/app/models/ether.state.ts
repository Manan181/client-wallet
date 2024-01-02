export interface Account {
    accountName: string;
    privateKey: string;
    address: string;
    balance: number;
}

export interface GenerateKeysState {
    account: Account;
    seedPhrase: string;
}
