import { Component } from '@angular/core';

import { TransactionService } from 'src/app/data/service/transaction.service';
import { Transaction } from 'src/app/data/schema/transaction';
import { EthersService } from 'src/app/shared/service/ethers/ethers.service';

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
    
    constructor(private projectService: TransactionService, private ethersService: EthersService) {
        this.account = '0x88588D081f41bB1e7C6357a00E98e402e6f27BC9';
        this.getAccountBalance();
        this.getAllTransactions();
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
