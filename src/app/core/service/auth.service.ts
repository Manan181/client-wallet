import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { EthersService } from 'src/app/shared/service/ethers.service';
import { StorageService } from 'src/app/shared/service/storage.service';

// Define the interface for login context information.
interface LoginContextInterface {
    password: string;
    token: string;
}

// Define a default user for comparison.
const defaultUser = {
    password: '12345',
    token: '12345'
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private ethersService: EthersService, private storageService: StorageService) {}

    /**
     * Attempts to log in a user with the provided login context.
     * @param loginContext - The login context containing a password and token.
     * @returns An Observable<User> representing the logged-in user or an error if login fails.
     */
    login(loginContext: LoginContextInterface): Observable<User> {
        return new Observable<User>(observer => {
            this.storageService.getAllObjects('auth', (objects: any[]) => {
                if (objects && objects.length > 0) {
                    const storedHashedPassword = objects[0].token;
                    // Validate the provided password against the stored hashed password.
                    const isDefaultUser = this.ethersService.validatePassword(loginContext.password, storedHashedPassword);

                    if (isDefaultUser) {
                        observer.next(defaultUser);
                        observer.complete();
                    } else {
                        observer.error('Invalid password');
                    }
                } else {
                    observer.error('No authentication data found');
                }
            });
        }).pipe(catchError(error => throwError(error)));
    }

    /**
     * Logs the user out.
     * @returns An Observable<boolean> representing the success of the logout operation.
     */
    logout(): Observable<boolean> {
        return of(false);
    }
}
