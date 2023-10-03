import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/data/service/data.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
    selector: 'app-add-nft-modal',
    templateUrl: './add-nft-modal.component.html',
    styleUrls: ['./add-nft-modal.component.css']
})
export class AddNftModalComponent {
    public addNftForm: FormGroup;

    constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storageService: StorageService, private dataService: DataService) {
        this.addNftForm = this.formBuilder.group({
            address: ['', Validators.required],
            tokenID: ['', Validators.required]
        });
    }

    async onSubmit() {
        try {
            if (this.addNftForm.valid) {
                const params = {
                    address: this.addNftForm.controls['address'].value,
                    tokenID: this.addNftForm.controls['tokenID'].value
                };
                const selectedAccount = await firstValueFrom(this.dataService.selectedAccount$);
                this.storageService.addObject('tokens', {
                    address: params.address,
                    accountAddress: selectedAccount || '',
                    tokenID: params.tokenID
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
