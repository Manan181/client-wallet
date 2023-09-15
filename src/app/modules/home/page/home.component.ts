import { Component } from '@angular/core';

import { TransactionService } from 'src/app/data/service/transaction.service';
import { Transaction } from 'src/app/data/schema/transaction';
import { EthersService } from 'src/app/shared/service/ethers/ethers.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { CryptoService } from 'src/app/shared/service/crypto/crypto.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    transactions$: Transaction[] = [];
    transactionsListPage = 1;
    accountBalance: string | number = 0;
    account: string;
    selectedTabIndex: number = 0;

    constructor(private projectService: TransactionService, private ethersService: EthersService, private storageService: StorageService, private cryptoService: CryptoService) {
        this.storageService.getAllObjects('wallet', objects => {
            const encryptedWallet = objects[0].wallet;
            const wallet = this.cryptoService.decrypt(encryptedWallet);
            this.account = wallet['account'].address;
        });
        this.getAccountBalance();
        this.getAllTransactions();
    }

    onTabChange(milestoneIndex: number) {
        this.selectedTabIndex = milestoneIndex;
    }

    getAllTransactions() {
        const address = this.account;
        const params = {
            module: 'account',
            action: 'txlist',
            address: `${address}`,
            startblock: '0',
            endblock: '99999999',
            page: `${this.transactionsListPage}`,
            offset: '10',
            sort: 'desc'
        };
        this.transactionsListPage++;
        this.projectService.getAllTransactions(params).subscribe(response => {
            if (response.status === '1' && response.message === 'OK') {
                const newTransactions = response.result;
                const uniqueTransactions = newTransactions.filter(newTx => !this.transactions$.some(existingTx => existingTx.hash === newTx.hash));
                this.transactions$ = this.transactions$.concat(uniqueTransactions);
            }
        });
    }

    getAccountBalance() {
        const params = {
            module: 'account',
            action: 'balance',
            address: this.account,
            tag: 'latest'
        };
        this.projectService.getAccountBalance(params).subscribe(response => {
            if (response.status === '1' && response.message === 'OK') {
                this.accountBalance = this.ethersService.convertToEther(response.result);
            }
        });
    }
}
