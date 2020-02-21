import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from './../services/http.service';

import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    loginForm: FormGroup;
    private subs = new Subscription();

    constructor(private fb: FormBuilder,
                private router: Router,
                private httpService: HttpService) { }

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
                res => {
                    if (res.success) {
                        this.router.navigate(['/']);
                    }
                }
            )
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
