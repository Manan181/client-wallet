import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { tap, delay, finalize, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    error: string;
    isLoading: boolean;
    loginForm: UntypedFormGroup;

    private loginSubscription = new Subscription();

    constructor(private router: Router, private authService: AuthService) {
        this.buildForm();
    }

    get form() {
        return this.loginForm.controls;
    }

    login() {
        this.isLoading = true;
        const credentials = this.loginForm.value;
        this.loginSubscription = this.authService
            .login(credentials)
            .pipe(
                delay(1500),
                tap(() => this.router.navigate(['/home'])),
                finalize(() => (this.isLoading = false)),
                catchError(error => of((this.error = error)))
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.loginSubscription.unsubscribe();
    }

    private buildForm(): void {
        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl(''),
            password: new UntypedFormControl('')
        });
    }
}
