import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {
    firstLand = true;

    constructor(private router: Router) {}

    canActivate() {
        if (this.firstLand) {
            this.firstLand = false;
            return this.router.createUrlTree(['/login']);
        }

        return true;
    }
}
