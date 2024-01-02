import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/ether.state';
import { StorageService } from 'src/app/shared/service/storage.service';

@Injectable()
export class AuthGuard {
    constructor(private router: Router, private storageService: StorageService) {}

    async canActivate(): Promise<boolean> {
        try {
            const accounts = await this.getAccountsFromStorage();
            const isLoggedIn = accounts.length > 0;

            if (isLoggedIn) {
                return true;
            } else {
                this.router.navigate(['/auth/register']);
                return false;
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

    private async getAccountsFromStorage(): Promise<Account[]> {
        return new Promise<Account[]>((resolve, reject) => {
            this.storageService.getAllObjects('accounts', objects => {
                resolve(objects);
            });
        });
    }
}
