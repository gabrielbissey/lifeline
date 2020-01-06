import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpService } from './../services/http.service';

import { Subscription } from 'rxjs';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.page.html',
    styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit, OnDestroy {
    subs = new Subscription();
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder,
                private httpService: HttpService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.createAccountForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            supporter: [false, Validators.required],
            password: ['', Validators.required],
            verifyPassword: ['']
        });
    }

    submitForm(form: FormGroup): void {
        this.subs.add(
            this.httpService.createAccount(form.value).subscribe(
                res => {
                    console.log(res);
                }
            )
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
