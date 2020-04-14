import { Injectable } from '@angular/core';

import { User, SimpleUser } from 'src/app/shared/models/interfaces';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private _user$ = new BehaviorSubject<User>(null);
    private _personSupporting$ = new BehaviorSubject<string>(null);
    private _unclaimedRequests$ = new BehaviorSubject<number>(0);

    user$ = this._user$.asObservable();
    personSupporting$ = this._personSupporting$.asObservable();
    unclaimedRequests$ = this._unclaimedRequests$.asObservable();

    get user() {
        return this._user$.value;
    }

    set user(user: User) {
        this._user$.next(user);
    }

    get personSupporting() {
        return this._personSupporting$.value;
    }

    set personSupporting(user: string) {
        this._personSupporting$.next(user);
    }

    get unclaimedRequests() {
        return this._unclaimedRequests$.value;
    }

    set unclaimedRequests(requests: number) {
        this._unclaimedRequests$.next(requests);
    }
}
