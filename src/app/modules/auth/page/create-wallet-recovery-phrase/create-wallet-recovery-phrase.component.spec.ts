import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWalletRecoveryPhraseComponent } from './create-wallet-recovery-phrase.component';

describe('CreateWalletRecoveryPhraseComponent', () => {
    let component: CreateWalletRecoveryPhraseComponent;
    let fixture: ComponentFixture<CreateWalletRecoveryPhraseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateWalletRecoveryPhraseComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateWalletRecoveryPhraseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
