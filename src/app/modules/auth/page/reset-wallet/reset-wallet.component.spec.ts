import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetWalletComponent } from './reset-wallet.component';

describe('ResetWalletComponent', () => {
    let component: ResetWalletComponent;
    let fixture: ComponentFixture<ResetWalletComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResetWalletComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ResetWalletComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
