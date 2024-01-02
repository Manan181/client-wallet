import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) {}

    open(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
        this.snackBar.open(message, action, {
            duration: 3000, // Adjust the duration as needed
            ...config
        });
    }
}
