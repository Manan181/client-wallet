import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ImportWalletComponent } from './page/import-wallet/import-wallet.component';
import { CreateWalletRecoveryPhraseComponent } from './page/create-wallet-recovery-phrase/create-wallet-recovery-phrase.component';
import { CreateWalletPasswordComponent } from './page/create-wallet-password/create-wallet-password.component';
import { ConfirmWalletRecoveryPhraseComponent } from './page/confirm-wallet-recovery-phrase/confirm-wallet-recovery-phrase.component';
import { WalletCreationSuccessComponent } from './page/wallet-creation-success/wallet-creation-success.component';
import { PasswordCreatedGuard } from 'src/app/core/guard/password-created.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [PasswordCreatedGuard]
            },
            {
                path: 'create-wallet-recovery-phrase',
                component: CreateWalletRecoveryPhraseComponent
            },
            {
                path: 'create-wallet-password',
                component: CreateWalletPasswordComponent,
                canActivate: [PasswordCreatedGuard]
            },
            {
                path: 'confirm-wallet-recovery-phrase',
                component: ConfirmWalletRecoveryPhraseComponent
            },
            {
                path: 'import-wallet',
                component: ImportWalletComponent
            },
            {
                path: 'wallet-creation-success',
                component: WalletCreationSuccessComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
