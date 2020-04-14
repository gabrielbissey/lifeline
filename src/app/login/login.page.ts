import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SimpleResponse } from 'src/app/models/interfaces';
import { StateService } from './../services/state/state.service';
import { HttpService } from '../services/http/http.service';

import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit, OnDestroy {
    loginForm: FormGroup;
    private subs = new Subscription();

    constructor(private fb: FormBuilder,
                private router: Router,
                private httpService: HttpService,
                private stateService: StateService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.loginForm = this.fb.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    submitForm(form: FormGroup): void {
        this.subs.add(
            this.httpService.post(form.value, 'login').subscribe(
                (res: SimpleResponse) => {
                    if (res.success) {
                        this.stateService.user = res.body.user;
                        this.stateService.personSupporting = res.body.user.personSupporting;
                        this.stateService.unclaimedRequests = res.body.unclaimedRequests;
                        this.router.navigate(['/tabs/dashboard']);
                      }
                }
            )
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
