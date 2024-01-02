import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/data/service/data.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
    selector: 'app-add-token-modal',
    templateUrl: './add-token-modal.component.html',
    styleUrls: ['./add-token-modal.component.css']
})
export class AddTokenModalComponent {
    public addTokenForm: FormGroup;

    constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storageService: StorageService, private dataService: DataService) {
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
                    decimalPlaces: this.addTokenForm.controls['decimalPlaces'].value,
                    balance: 0
                };
                const selectedAccount = await firstValueFrom(this.dataService.selectedAccount$);
                this.storageService.addObject('tokens', {
                    symbol: params.tokenSymbol,
                    accountAddress: selectedAccount || '',
                    contractAddress: params.tokenAddress,
                    decimalPlaces: params.decimalPlaces,
                    balance: params.balance
                });
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
