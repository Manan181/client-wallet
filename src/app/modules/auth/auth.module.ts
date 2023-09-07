import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
