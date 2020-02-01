import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router) { }

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
        console.log(form.value);

        this.router.navigate(['/dashboard']);


        // should eventually call the http service login method
        // and skip this class method entirely.
    }
}
