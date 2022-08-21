import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {
    baseUrl = `${environment.apiBaseUrl}/spotify`; // TODO: add interceptor

    constructor(public http: HttpClient) {}

    login(): Observable<void> {
        return this.http.get<void>(`${this.baseUrl}/login`);
    }
}
