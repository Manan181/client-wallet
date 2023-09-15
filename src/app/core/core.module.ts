import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { HttpClientModule } from '@angular/common/http';
import { PasswordCreatedGuard } from './guard/password-created.guard';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [AuthGuard, NoAuthGuard, PasswordCreatedGuard]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
