import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNftModalComponent } from './add-nft-modal.component';

describe('AddNftModalComponent', () => {
    let component: AddNftModalComponent;
    let fixture: ComponentFixture<AddNftModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddNftModalComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddNftModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
