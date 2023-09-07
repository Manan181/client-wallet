import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';

import { User } from 'src/app/models/user';

interface LoginContextInterface {
    password: string;
    token: string;
}

const defaultUser = {
    password: '12345',
    token: '12345'
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    login(loginContext: LoginContextInterface): Observable<User> {
        const isDefaultUser = loginContext.password === defaultUser.password;

        if (isDefaultUser) {
            return of(defaultUser);
        }

        return throwError('Invalid password');
    }

    logout(): Observable<boolean> {
        return of(false);
    }
}
