import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpService } from './../services/http.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.page.html',
    styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder,
                private httpService: HttpService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.createAccountForm = this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            password: [null, Validators.required],
            verifyPassword: [null]
        });
    }

    submitForm(form: FormGroup): void {
        console.log('submit form');

        this.httpService.createAccount(form.value).subscribe(
            res => {
                console.log(res);
            }
        );
    }

}
