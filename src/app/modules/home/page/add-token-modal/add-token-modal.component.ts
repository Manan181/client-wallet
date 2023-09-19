import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
    selector: 'app-add-token-modal',
    templateUrl: './add-token-modal.component.html',
    styleUrls: ['./add-token-modal.component.css']
})
export class AddTokenModalComponent {
    public addTokenForm: FormGroup;

    constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storageService: StorageService) {
        this.addTokenForm = this.formBuilder.group({
            tokenAddress: ['', Validators.required],
            tokenSymbol: ['', Validators.required],
            decimalPlaces: [0, Validators.required]
        });
    }

    async onSubmit() {
        try {
            if (this.addTokenForm.valid) {
                const params = {
                    tokenAddress: this.addTokenForm.controls['tokenAddress'].value,
                    tokenSymbol: this.addTokenForm.controls['tokenSymbol'].value,
                    decimalPlaces: this.addTokenForm.controls['decimalPlaces'].value
                };
                this.storageService.addObject('tokens', { symbol: params.tokenSymbol, contractAddress: params.tokenAddress, decimalPlaces: params.decimalPlaces });
                this.closeDialog();
            } else {
                console.log('Form is invalid');
            }
        } catch (error) {
            console.error(error);
        }
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
