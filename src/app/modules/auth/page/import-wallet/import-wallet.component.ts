import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    valid: boolean = false;

    constructor(private router: Router) {}

    confirmSecretRecoveryPhrase() {
        // this.router.navigate(['/auth/create-wallet-password']);
        const phrase = [];
        const inputs = document.querySelectorAll('input');
        for (let index = 0; index < inputs.length; index++) {
            phrase.push(inputs[index].value);
        }
        // if (this.confirmPhraseArray === phrase.toString()) {
        //     this.router.navigate(['/auth/wallet-creation-success']);
        // } else {
        //     this.valid = false;
        // }
    }

    validateMnemonicPhrase(event) {
        const inputs = document.querySelectorAll('input');
        let inputArr = [];
        this.valid = true;
        if (event.inputType === 'insertFromPaste') {
            const arr = event.target.value.split(' ');
            if (arr.length > 1) {
                for (let index = 0; index < inputs.length; index++) {
                    const input = inputs[index];
                    inputArr.push(input.value);
                    if (arr[index]) {
                        inputs[index].value = arr[index];
                    }
                }
            }
        } else {
            for (let index = 0; index < inputs.length; index++) {
                const input = inputs[index];
                inputArr.push(input.value);
            }
        }
        console.log('inputArr', inputArr);
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
