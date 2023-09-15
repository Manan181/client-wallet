import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWalletPasswordComponent } from './create-wallet-password.component';

describe('CreateWalletPasswordComponent', () => {
    let component: CreateWalletPasswordComponent;
    let fixture: ComponentFixture<CreateWalletPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateWalletPasswordComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateWalletPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
