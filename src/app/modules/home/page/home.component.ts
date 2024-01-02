import { Component, OnInit } from '@angular/core';

import { TransactionService } from 'src/app/data/service/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { EthersService } from 'src/app/shared/service/ethers.service';
import { StorageService } from 'src/app/shared/service/storage.service';
import { CryptoService } from 'src/app/shared/service/crypto.service';
// import { WalletConnectService } from 'src/app/shared/service/wallet-connect.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { WalletConnectComponent } from 'src/app/shared/component/wallet-connect/wallet-connect.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    transactions$: Transaction[] = [];
    transactionsListPage = 1;
    accountBalance: number = 0;
    account: string;
    selectedTabIndex: number = 0;

    constructor(
        private transactionService: TransactionService,
        private ethersService: EthersService,
        private storageService: StorageService,
        private cryptoService: CryptoService,
        // private walletConnectService: WalletConnectService,
        private toastService: ToastService,
        public dialog: MatDialog
    ) {}

    async ngOnInit() {
        await new Promise<void>(resolve => {
            this.storageService.getAllObjects('wallet', objects => {
                const encryptedWallet = objects[0].wallet;
                const wallet = this.cryptoService.decrypt(encryptedWallet);
                this.account = wallet['account'].address;
                resolve();
            });
        });
        this.getAccountBalance();
        setInterval(() => {
            this.getAccountBalance();
        }, 60000);
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
        this.transactionService.getAllTransactions(params).subscribe(response => {
            if (response.status === '1' && response.message === 'OK') {
                const newTransactions = response.result;
                const uniqueTransactions = newTransactions.filter(newTx => !this.transactions$.some(existingTx => existingTx.hash === newTx.hash));
                this.transactions$ = this.transactions$.concat(uniqueTransactions);
            }
        });
    }

    getAccountBalance() {
        try {
            const params = {
                module: 'account',
                action: 'balance',
                address: this.account,
                tag: 'latest'
            };
            this.transactionService.getAccountBalance(params).subscribe(response => {
                if (response.status === '1' && response.message === 'OK') {
                    this.accountBalance = this.ethersService.convertToEther(response.result);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    openConnectWalletModal(): void {
        const dialogRef = this.dialog.open(WalletConnectComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: false,
            data: {}
        });

        dialogRef.afterClosed().subscribe(() => {});
    }
}
