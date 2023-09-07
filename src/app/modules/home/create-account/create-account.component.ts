import { Component } from '@angular/core';
import { EthersService } from 'src/app/shared/service/ethers/ethers.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
    constructor(private etherService: EthersService) {}

    createAccount() {
        const result = this.etherService.generateKeys();
        console.log('🚀 ~ file: create-account.component.ts:14 ~ CreateAccountComponent ~ createAccount ~ result:', result);
    }

    recoverAccount(mnemonic: string) {
        const result = this.etherService.generateKeys(mnemonic);
        console.log('🚀 ~ file: create-account.component.ts:14 ~ CreateAccountComponent ~ createAccount ~ result:', result);
    }
}
