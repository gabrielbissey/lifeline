import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../services/http/http.service';

import { Subscription } from 'rxjs';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.page.html',
    styleUrls: ['./create-account.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountPage implements OnInit, OnDestroy {
    subs = new Subscription();
    showLoader = false;
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder,
                private httpService: HttpService,
                private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.createAccountForm = this.fb.group({
            firstName: ['first', Validators.required],
            lastName: ['last', Validators.required],
            email: ['email', Validators.required],
            phoneNumber: ['555-555-5555', Validators.required],
            supporter: [false, Validators.required],
            password: ['pass', Validators.required],
            verifyPassword: ['pass']
        });
    }

    submitForm(form: FormGroup): void {
        this.showLoader = true;

        this.subs.add(
            this.httpService.post(form.value, 'create-account').subscribe(
                () => {
                    this.router.navigate(['login']);
                }
            )
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
