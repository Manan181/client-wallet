import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWalletRecoveryPhraseComponent } from './confirm-wallet-recovery-phrase.component';

describe('ConfirmWalletRecoveryPhraseComponent', () => {
    let component: ConfirmWalletRecoveryPhraseComponent;
    let fixture: ComponentFixture<ConfirmWalletRecoveryPhraseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmWalletRecoveryPhraseComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmWalletRecoveryPhraseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
