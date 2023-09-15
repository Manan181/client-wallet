import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-confirm-wallet-recovery-phrase',
    templateUrl: './confirm-wallet-recovery-phrase.component.html',
    styleUrls: ['./confirm-wallet-recovery-phrase.component.css']
})
export class ConfirmWalletRecoveryPhraseComponent {
    rows: number[] = [0, 1, 2, 3];
    cols: number[] = [0, 1, 2];
    phraseArray: string[] = new Array(12).fill('');
    confirmPhraseArray;
    valid: boolean;

    constructor(private router: Router, private route: ActivatedRoute) {
        console.log(this.route.snapshot.paramMap.get('phraseArray'));
        this.confirmPhraseArray = this.route.snapshot.paramMap.get('phraseArray');
    }

    validateRecoveryPhrase(event) {
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
        }
    }

    confirmRecoveryPhrase() {
        const phrase = [];
        const inputs = document.querySelectorAll('input');
        for (let index = 0; index < inputs.length; index++) {
            phrase.push(inputs[index].value);
        }
        if (this.confirmPhraseArray === phrase.toString()) {
            this.router.navigate(['/auth/wallet-creation-success']);
        } else {
            this.valid = false;
        }
    }
}
