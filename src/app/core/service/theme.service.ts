import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private isDarkTheme: BehaviorSubject<boolean>;

    constructor() {
        // Initialize the BehaviorSubject with the value from local storage, defaulting to 'false'.
        this.isDarkTheme = new BehaviorSubject<boolean>(localStorage.getItem('isDarkTheme') === 'true');
    }

    /**
     * Sets the dark theme preference and updates it in local storage.
     * @param isDarkTheme - A boolean indicating whether to enable the dark theme.
     */
    setDarkTheme(isDarkTheme: boolean) {
        this.isDarkTheme.next(isDarkTheme);

        // Update the dark theme preference in local storage.
        localStorage.setItem('isDarkTheme', this.isDarkTheme.value.toString());
    }

    /**
     * Retrieves an observable representing the dark theme preference.
     * @returns An Observable<boolean> representing the dark theme preference.
     */
    getDarkTheme(): Observable<boolean> {
        return this.isDarkTheme;
    }
}
