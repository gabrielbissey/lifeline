import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable()
export class LoginGuard implements CanActivate {
    firstLand = true;

    constructor(private router: Router) {}

    canActivate() {
        if (environment.skipLogin) {
            return true;
        }

        if (this.firstLand) {
            this.firstLand = false;
            return this.router.createUrlTree(['/login']);
        }

        return true;
    }
}
