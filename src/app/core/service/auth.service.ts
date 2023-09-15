import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { EthersService } from 'src/app/shared/service/ethers/ethers.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

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
        let storedHashedPassword: string;

        // Retrieve stored authentication data from the storage service.
        this.storageService.getAllObjects('auth', objects => {
            storedHashedPassword = objects[0].token;
        });

        // Validate the provided password against the stored hashed password.
        const isDefaultUser = this.ethersService.validatePassword(loginContext.password, storedHashedPassword);

        // If the password is valid, return the default user.
        if (isDefaultUser) {
            return of(defaultUser);
        }

        // If the password is invalid, throw an error.
        return throwError('Invalid password');
    }

    /**
     * Logs the user out.
     * @returns An Observable<boolean> representing the success of the logout operation.
     */
    logout(): Observable<boolean> {
        return of(false);
    }
}
