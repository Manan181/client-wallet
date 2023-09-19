import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private fromModuleSubject = new BehaviorSubject<string>('');
    fromModule$ = this.fromModuleSubject.asObservable();

    updateFromModule(module: string) {
        this.fromModuleSubject.next(module);
    }
}
