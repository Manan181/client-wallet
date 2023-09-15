import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    constructor(private router: Router) {}

    openCreateWallet(flag: string) {
        this.router.navigate(['/auth/create-wallet-password']);
    }

    openImportWallet(flag: string) {
        this.router.navigate(['/auth/import-wallet']);
    }
}
