import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCreationSuccessComponent } from './wallet-creation-success.component';

describe('WalletCreationSuccessComponent', () => {
    let component: WalletCreationSuccessComponent;
    let fixture: ComponentFixture<WalletCreationSuccessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletCreationSuccessComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(WalletCreationSuccessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
