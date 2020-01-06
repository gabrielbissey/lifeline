import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    url = 'http://localhost:3000';
    headers = new HttpHeaders({
        'content-type': 'application/json'
    });

    constructor(private http: HttpClient) { }

    createAccount(user): Observable<any> {
        return this.http.get(`${this.url}`);
        // return this.http.post(`${this.url}/create-account`, user, {headers: this.headers});
    }
}
