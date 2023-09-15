import { Component } from '@angular/core';

@Component({
    selector: 'app-import-wallet',
    templateUrl: './import-wallet.component.html',
    styleUrls: ['./import-wallet.component.css']
})
export class ImportWalletComponent {
    rows: number[] = [0, 1, 2, 3];
    cols: number[] = [0, 1, 2];
    visiblePasswordIndex: number = -1;
    phraseArray: string[];

    constructor() {}

    confirmSecretRecoveryPhrase() {}

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
