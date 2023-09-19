import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators, ValidationErrors } from '@angular/forms';
import { EthersService } from '../../service/ethers/ethers.service';
import { StorageService } from '../../service/storage/storage.service';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.component.html',
    styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent {
    public createPasswordForm: UntypedFormGroup;
    public checkboxChecked = false;
    @Output() passwordCreated = new EventEmitter<Boolean>();
    @Input() page: String;

    constructor(private formBuilder: UntypedFormBuilder, private ethersService: EthersService, private storageService: StorageService) {
        console.log('page', this.page);
        function passwordMatchValidator(control: UntypedFormControl): ValidationErrors | null {
            const password = control.get('password');
            const confirmPassword = control.get('confirmPassword');
            if (password.value !== confirmPassword.value) {
                return { passwordMismatch: true };
            }
            return null;
        }
        this.createPasswordForm = this.formBuilder.group(
            {
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required],
                acceptTerms: [true, Validators.requiredTrue]
            },
            { validator: passwordMatchValidator }
        );
    }

    submitForm() {
        try {
            if (this.createPasswordForm.valid) {
                let params = {
                    password: this.createPasswordForm.controls['confirmPassword'].value
                };
                const hashedPassword = this.ethersService.hashPassword(params.password);
                this.storageService.addObject('auth', { token: hashedPassword });
                this.passwordCreated.emit(true);
            } else {
                console.log('Form is invalid');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
