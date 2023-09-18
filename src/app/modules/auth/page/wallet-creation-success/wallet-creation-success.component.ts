import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
    selector: 'app-wallet-creation-success',
    templateUrl: './wallet-creation-success.component.html',
    styleUrls: ['./wallet-creation-success.component.css']
})
export class WalletCreationSuccessComponent {
    constructor(private router: Router, private storageService: StorageService) {}

    goToHome() {
        this.router.navigate(['/home']);
        this.storageService.addObject('walletCreated', { walletCreated: true });
    }
}
