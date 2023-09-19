import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reset-wallet',
    templateUrl: './reset-wallet.component.html',
    styleUrls: ['./reset-wallet.component.css']
})
export class ResetWalletComponent {
    rows = [0, 1, 2, 3];
    cols = [0, 1, 2];
    visiblePasswordIndex = -1;
    phraseArray = new Array(12).fill('');

    constructor(private router: Router) {}

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

    async passwordCreatedFn(event) {
        if (event) {
            console.log(this.phraseArray);
            // const encryptedData = this.cryptoService.encrypt(result);
            // const encryptedAccount = this.cryptoService.encrypt(result.account);
            // this.storageService.addObject('accounts', { account: encryptedAccount });
            // this.storageService.addObject('wallet', { wallet: encryptedData });
            // this.storageService.addObject('tokens', { token: { symbol: 'ETH' } });
            this.router.navigate(['/home']);
        }
    }
}
