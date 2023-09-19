import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EthersService } from '../../../../shared/service/ethers/ethers.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { CryptoService } from 'src/app/shared/service/crypto/crypto.service';

@Component({
    selector: 'app-create-wallet-recovery-phrase',
    templateUrl: './create-wallet-recovery-phrase.component.html',
    styleUrls: ['./create-wallet-recovery-phrase.component.css']
})
export class CreateWalletRecoveryPhraseComponent {
    rows = [0, 1, 2, 3];
    cols = [0, 1, 2];
    passwordCreated = false;
    recoveryPhraseCreated = false;
    recoveryPhrase = '';
    seedPhrase = '';
    phraseArray = new Array(12).fill('');
    isVisible = false;

    constructor(private router: Router, private ethersService: EthersService, private storageService: StorageService, private cryptoService: CryptoService) {
        this.storageService.getAllObjects('wallet', objects => {
            const encryptedWallet = objects[0].wallet;
            const wallet = this.cryptoService.decrypt(encryptedWallet);
            this.seedPhrase = wallet['seedPhrase'];
            const phraseArray = wallet['seedPhrase'].split(' ');
            if (phraseArray.length === 12) {
                this.phraseArray = phraseArray;
            }
        });
    }

    getRecoveryPhrase() {
        console.log('seedPhrase', this.seedPhrase);
        console.log('phraseArray', this.phraseArray);
        this.router.navigate(['/auth/confirm-wallet-recovery-phrase', { phraseArray: this.phraseArray }]);
    }

    copyToClipboard() {
        const copyButton = document.getElementById('copyButton');
        const textArea = document.createElement('textarea');
        textArea.value = this.phraseArray.join(' ');

        // Append the textarea to the document
        document.body.appendChild(textArea);

        // Select the text inside the textarea
        textArea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(textArea);

        // Change the button text temporarily to indicate success
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
            copyButton.innerText = 'Copy to clipboard';
        }, 1000);
    }
}
