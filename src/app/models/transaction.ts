export interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
    methodId: string;
    functionName: string;
}

export interface TransactionListResponse {
    message: string;
    result: Transaction[];
    status: string;
}

export interface TransactionParams {
    module: string;
    action: string;
    address: string;
    startblock: string;
    endblock: string;
    page?: string;
    offset?: string;
    sort: string;
}

export interface AccountBalanceParams {
    module: string;
    action: string;
    address: string;
    tag: string;
}

export interface AccountBalanceResponse {
    message: string;
    result: string;
    status: string;
}

export interface TokenBalanceParams {
    module: string;
    action: string;
    contractaddress: string;
    address: string;
    tag: string;
}
