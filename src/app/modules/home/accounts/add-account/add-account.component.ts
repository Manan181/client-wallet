import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data/service/data.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
    public addAccountForm: FormGroup;

    constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storageService: StorageService, private dataService: DataService) {
        this.addAccountForm = this.formBuilder.group({
            accountName: ['', Validators.required]
        });
    }

    async onSubmit() {
        try {
            const account = { accountName: '', address: '', privateKey: '', balance: 0 };
            if (this.addAccountForm.valid) {
                this.dataService.updateSelectedAccount(account);
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
