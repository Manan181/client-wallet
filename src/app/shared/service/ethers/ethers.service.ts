import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { GenerateKeysState } from 'src/app/models/ether.state';

@Injectable({
    providedIn: 'root'
})
export class EthersService {
    private wallet: ethers.Wallet;

    constructor() {}

    generateKeys = (seedPhrase: string = '', index: number = 0): GenerateKeysState => {
        // If the seed phrase is not provided, generate a random mnemonic using a CSPRNG
        if (seedPhrase === '') {
            seedPhrase = ethers.Wallet.createRandom().mnemonic.phrase;
        }

        this.wallet = seedPhrase.includes(' ') ? ethers.Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`) : new ethers.Wallet(seedPhrase);

        const { address } = this.wallet;
        const account = { address, privateKey: this.wallet.privateKey, balance: '0' };

        return { account, seedPhrase: seedPhrase.includes(' ') ? seedPhrase : '' };
    };

    convertToWei(etherAmount): string {
        return ethers.utils.parseEther(etherAmount).toString();
    }

    convertToEther(weiValue): string {
        return Number(ethers.utils.formatEther(weiValue)).toFixed(3);
    }
}
