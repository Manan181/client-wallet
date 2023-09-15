import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class PasswordCreatedGuard {
    private passwordCreated = false;

    constructor(private router: Router, private storageService: StorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.storageService.getAllObjects('wallet', objects => {
            if (objects[0].wallet.length > 0) {
                this.passwordCreated = true;
            } else {
                this.passwordCreated = false;
            }
        });
        console.log('this.passwordCreated', this.passwordCreated);
        if (this.passwordCreated === false) {
            return false;
        } else {
            return true;
        }
    }
}
