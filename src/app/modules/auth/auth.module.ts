import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatePasswordComponent } from '../../shared/component/create-password/create-password.component';
import { ImportWalletComponent } from './page/import-wallet/import-wallet.component';
import { CreateWalletPasswordComponent } from './page/create-wallet-password/create-wallet-password.component';
import { CreateWalletRecoveryPhraseComponent } from './page/create-wallet-recovery-phrase/create-wallet-recovery-phrase.component';
import { ConfirmWalletRecoveryPhraseComponent } from './page/confirm-wallet-recovery-phrase/confirm-wallet-recovery-phrase.component';
import { WalletCreationSuccessComponent } from './page/wallet-creation-success/wallet-creation-success.component';
import { ResetWalletComponent } from './page/reset-wallet/reset-wallet.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        CreatePasswordComponent,
        ImportWalletComponent,
        CreateWalletPasswordComponent,
        CreateWalletRecoveryPhraseComponent,
        ConfirmWalletRecoveryPhraseComponent,
        WalletCreationSuccessComponent,
        ResetWalletComponent
    ],
    imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
