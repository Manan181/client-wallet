import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data/service/data.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    constructor(private router: Router, private dataService: DataService) {}

    openCreateWallet(flag: string) {
        this.dataService.updateFromModule('create');
        this.router.navigate(['/auth/create-wallet-password']);
    }

    openImportWallet(flag: string) {
        this.router.navigate(['/auth/import-wallet']);
    }
}
