import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [
        AuthGuard,
        NoAuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
