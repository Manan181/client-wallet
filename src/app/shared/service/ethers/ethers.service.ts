import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { GenerateKeysState } from 'src/app/models/ether.state';
import { environment } from 'src/environments/environment';

/**
 * Service for managing Ethereum-related operations
 */
@Injectable({
    providedIn: 'root'
})
export class EthersService {
    public wallet: ethers.Wallet;

    constructor() {}

    /**
     * Generates Ethereum wallet keys using a provided seed phrase or a random mnemonic phrase.
     * @param seedPhrase - Optional seed phrase for key generation. If not provided, a random mnemonic is generated.
     * @param index - Optional index for key derivation. Default is 0.
     * @returns An object containing the Ethereum account information and the seed phrase (if generated).
     */
    generateKeys = (seedPhrase: string = '', index: number = 0): GenerateKeysState | any => {
        try {
            // If the seed phrase is not provided, generate a random mnemonic using a CSPRNG
            if (seedPhrase === '') {
                seedPhrase = ethers.Wallet.createRandom().mnemonic.phrase;
            }
            this.wallet = seedPhrase.includes(' ') ? ethers.Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`) : new ethers.Wallet(seedPhrase);
            const { address } = this.wallet;
            const account = { address, privateKey: this.wallet.privateKey, balance: '0' };
            return { account, seedPhrase: seedPhrase.includes(' ') ? seedPhrase : '' };
        } catch (error) {
            return error.message;
        }
    };

    /**
     * Converts an amount in Ethereum to its equivalent value in Wei.
     * @param etherAmount - The amount in Ethereum to convert to Wei.
     * @returns The amount in Wei as a string.
     */
    convertToWei(etherAmount: string): string {
        return ethers.utils.parseEther(etherAmount).toString();
    }

    /**
     * Converts an amount in Wei to its equivalent value in Ethereum.
     * @param weiValue - The amount in Wei to convert to Ethereum.
     * @returns The amount in Ethereum as a string with 3 decimal places.
     */
    convertToEther(weiValue: string): number {
        return Number(Number(ethers.utils.formatEther(weiValue)).toFixed(3));
    }

    /**
     * Generates a hash of a password combined with a secret for added security.
     * @param password - The password to hash.
     * @returns The hashed password as a string.
     */
    hashPassword(password: string): string {
        const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(password + environment.passwordSecret));
        return hash;
    }

    /**
     * Validates a password against a stored hashed password.
     * @param enteredPassword - The password entered by the user.
     * @param storedHashedPassword - The previously stored hashed password.
     * @returns True if the entered password matches the stored hashed password, otherwise false.
     */
    validatePassword(enteredPassword: string, storedHashedPassword: string): boolean {
        const enteredPasswordHash = this.hashPassword(enteredPassword);
        console.log('validatePassword', enteredPasswordHash, storedHashedPassword);
        return enteredPasswordHash === storedHashedPassword;
    }
}
