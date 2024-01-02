import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/data/service/data.service';
import { TransactionService } from 'src/app/data/service/transaction.service';
import { AccountBalanceParams } from 'src/app/models/transaction';
import { CryptoService } from 'src/app/shared/service/crypto.service';
import { EthersService } from 'src/app/shared/service/ethers.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
    selector: 'app-import-wallet',
    templateUrl: './import-wallet.component.html',
    styleUrls: ['./import-wallet.component.css']
})
export class ImportWalletComponent {
    rows = [0, 1, 2, 3];
    cols = [0, 1, 2];
    visiblePasswordIndex = -1;
    phraseArray = new Array(12).fill('');
    valid = true;

    constructor(
        private router: Router,
        private ethersService: EthersService,
        private cryptoService: CryptoService,
        private storageService: StorageService,
        private transactionService: TransactionService,
        private dataService: DataService
    ) {}

    async confirmSecretRecoveryPhrase() {
        try {
            const phrase = [];
            const inputs = document.querySelectorAll('input');
            for (let index = 0; index < inputs.length; index++) {
                phrase.push(inputs[index].value);
            }
            const result = this.ethersService.generateKeys(phrase.join(' '));
            if (result && result.account && result.seedPhrase) {
                let params: AccountBalanceParams = {
                    module: 'account',
                    action: 'balance',
                    address: result.account.address || '0x',
                    tag: 'latest'
                };
                let accountBalance = 0;
                const balanceResponse = await firstValueFrom(this.transactionService.getAccountBalance(params));
                if (balanceResponse && balanceResponse.status === '1' && balanceResponse.message === 'OK') {
                    accountBalance = Number(balanceResponse.result);
                }
                const encryptedData = this.cryptoService.encrypt(result);
                const encryptedAccount = this.cryptoService.encrypt(result.account);
                this.storageService.addObject('accounts', { account: encryptedAccount });
                this.storageService.addObject('wallet', { wallet: encryptedData });
                this.storageService.addObject('tokens', {
                    symbol: 'ETH',
                    accountAddress: params.address,
                    contractAddress: '',
                    decimalPlaces: 18,
                    balance: accountBalance
                });
                this.valid = true;
                this.dataService.updateFromModule('import');
                this.router.navigate(['/auth/create-wallet-password']);
            } else {
                this.valid = false;
            }
        } catch (error) {
            this.valid = false;
            console.error(error);
        }
    }

    handleMnemonicPhraseInput(event) {
        const inputs = document.querySelectorAll('input');
        this.valid = true;
        if (event.inputType === 'insertFromPaste') {
            const arr = event.target.value.split(' ');
            if (arr.length > 1) {
                for (let index = 0; index < inputs.length; index++) {
                    if (arr[index]) {
                        inputs[index].value = arr[index];
                    }
                }
            }
        }
    }

    togglePasswordVisibility(row: number, col: number): void {
        const index = row * this.cols.length + col;
        this.visiblePasswordIndex = this.visiblePasswordIndex === index ? -1 : index;
    }

    isPasswordVisible(row: number, col: number): boolean {
        return this.visiblePasswordIndex === row * this.cols.length + col;
    }

    getPasswordFieldType(row: number, col: number): string {
        return this.isPasswordVisible(row, col) ? 'text' : 'password';
    }
}
