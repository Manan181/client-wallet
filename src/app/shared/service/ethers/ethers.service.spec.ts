import { TestBed } from '@angular/core/testing';
import { EthersService } from './ethers.service';
import { ethers } from 'ethers';
import { GenerateKeysState } from 'src/app/models/ether.state';

describe('EtherService', () => {
    let service: EthersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EthersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('generateKeys', () => {
        it('should generate keys with a random mnemonic when seedPhrase is not provided', () => {
            const result: GenerateKeysState = service.generateKeys();
            expect(result).toBeTruthy();
            expect(result.seedPhrase).toBeTruthy();
            expect(result.account).toBeTruthy();
        });

        it('should generate keys from provided seedPhrase', () => {
            const seedPhrase = ethers.Wallet.createRandom().mnemonic.phrase;
            const result: GenerateKeysState = service.generateKeys(seedPhrase);
            expect(result).toBeTruthy();
            expect(result.seedPhrase).toBe(seedPhrase);
            expect(result.account).toBeTruthy();
        });

        it('should generate keys with the correct address and balance', () => {
            const seedPhrase = ethers.Wallet.createRandom().mnemonic.phrase;
            const result: GenerateKeysState = service.generateKeys(seedPhrase);
            const wallet = seedPhrase.includes(' ') ? ethers.Wallet.fromMnemonic(seedPhrase, "m/44'/60'/0'/0/0") : new ethers.Wallet(seedPhrase);

            expect(result).toBeTruthy();
            expect(result.account.address).toBe(wallet.address);
            expect(result.account.balance).toBe('0');
        });

        it('should generate keys with the correct private key', () => {
            const seedPhrase = ethers.Wallet.createRandom().mnemonic.phrase;
            const result: GenerateKeysState = service.generateKeys(seedPhrase);
            const wallet = seedPhrase.includes(' ') ? ethers.Wallet.fromMnemonic(seedPhrase, "m/44'/60'/0'/0/0") : new ethers.Wallet(seedPhrase);

            expect(result).toBeTruthy();
            expect(result.account.privateKey).toBe(wallet.privateKey);
        });
    });
});
