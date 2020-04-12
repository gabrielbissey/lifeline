import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    // url = 'http://10.0.0.88:3000';
    url = 'http://192.168.0.59:3000';
    headers = new HttpHeaders({
        'content-type': 'application/json'
    });
    options = {headers: this.headers};

    constructor(private http: HttpClient) { }

    /**
     * @param body post body
     * @param url api url
     *
     * Returns observable for post request to url.
     */
    post(body: any, url: string): Observable<any> {
        return this.http.post(`${this.url}/${url}`, body, this.options);
    }
}
