import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { CryptoService } from 'src/app/shared/service/crypto/crypto.service';
import { EthersService } from 'src/app/shared/service/ethers/ethers.service';
import { TransactionService } from 'src/app/data/service/transaction.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    wallet: any;
    accounts = [];

    constructor(
        private dialog: MatDialog,
        private storageService: StorageService,
        private cryptoService: CryptoService,
        private ethersService: EthersService,
        private transactionService: TransactionService
    ) {}

    async ngOnInit() {
        await new Promise<void>(resolve => {
            this.storageService.getAllObjects('wallet', objects => {
                const encryptedWallet = objects[0].wallet;
                const wallet = this.cryptoService.decrypt(encryptedWallet);
                this.wallet = wallet;
                resolve();
            });
        });
        await new Promise<void>(resolve => {
            this.storageService.getAllObjects('accounts', objects => {
                objects.forEach(async object => {
                    const decryptedAccount = this.cryptoService.decrypt(object.account);
                    const accountBalance = await firstValueFrom(
                        this.transactionService.getAccountBalance({
                            module: 'account',
                            action: 'balance',
                            address: decryptedAccount.address || '',
                            tag: 'latest'
                        })
                    );
                    const account = {
                        accountName: decryptedAccount.accountName || '',
                        address: decryptedAccount.address,
                        privateKey: decryptedAccount.privateKey,
                        balance: accountBalance.result
                    };
                    this.accounts.push(account);
                });
                resolve();
            });
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }

    addAccount() {
        const phrase = this.wallet.seedPhrase;
        if (phrase) {
            const result = this.ethersService.generateKeys(phrase, 1);
            const encryptedAccount = this.cryptoService.encrypt(result.account);
            this.storageService.addObject('accounts', { account: encryptedAccount });
        }

        const dialogRef = this.dialog.open(AccountsComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: false,
            data: {}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.dialog.closeAll();
        });
    }

    importAccount() {}
}
