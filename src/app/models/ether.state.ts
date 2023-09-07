export interface Account {
    privateKey: string;
    address: string;
    balance: string;
}

export interface GenerateKeysState {
    account: Account;
    seedPhrase: string;
}
