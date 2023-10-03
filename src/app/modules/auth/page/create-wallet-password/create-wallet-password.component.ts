import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data/service/data.service';
import { GenerateKeysState } from 'src/app/models/ether.state';
import { CryptoService } from 'src/app/shared/service/crypto/crypto.service';
import { EthersService } from 'src/app/shared/service/ethers/ethers.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
    selector: 'app-create-wallet-password',
    templateUrl: './create-wallet-password.component.html',
    styleUrls: ['./create-wallet-password.component.css']
})
export class CreateWalletPasswordComponent implements OnInit {
    fromModule = '';

    constructor(
        private router: Router,
        private ethersService: EthersService,
        private storageService: StorageService,
        private cryptoService: CryptoService,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.dataService.fromModule$.subscribe(module => {
            this.fromModule = module;
        });
    }

    async passwordCreatedFn(event) {
        if (event && this.fromModule === 'create') {
            const result: GenerateKeysState = this.ethersService.generateKeys();
            const encryptedData = this.cryptoService.encrypt(result);
            const encryptedAccount = this.cryptoService.encrypt(result.account);
            this.storageService.addObject('accounts', { account: encryptedAccount });
            this.storageService.addObject('wallet', { wallet: encryptedData });
            this.storageService.addObject('tokens', {
                symbol: 'ETH',
                accountAddress: result.account.address,
                contractAddress: '',
                decimalPlaces: 18,
                balance: 0
            });
            this.router.navigate(['/auth/create-wallet-recovery-phrase']);
        }
        if (event && this.fromModule === 'import') {
            this.router.navigate(['/auth/wallet-creation-success']);
        }
    }
}
